import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { upiPaymentUri } from "../donation";
import {
  MEMBERSHIP_FEE_AMOUNT,
  REGISTRATION_FEE_AMOUNT,
  SPORTS_FEE_AMOUNT,
  registrationFeeFor,
  registrationRequiresPayment,
  wizardStepDefsFor,
} from "./constants";
import { createEmptyForm } from "./form-state";
import { addCalendarYears, membershipPeriodFrom, membershipStatusAt } from "./membership";
import { buildUploadFileName, safePersonSlug, uploadRelativePath } from "./store";
import { buildPrintableHtml } from "./printable";
import {
  ageFromDob,
  dobRange,
  formatAadhaarNumber,
  isoDate,
  isValidAadhaarNumber,
  validateDocuments,
  validatePayment,
  validatePersonal,
  validateStep,
} from "./validation";

const ON_DATE = new Date("2026-09-01T12:00:00");

function personal(dob: string) {
  const age = ageFromDob(dob, ON_DATE);
  return {
    ...createEmptyForm("talent-hunt").personal,
    fullName: "Aarav Bisht",
    fatherName: "Father",
    motherName: "Mother",
    dob,
    age: age === null ? "" : String(age),
    gender: "Male",
    nationality: "Indian",
    address: "Mundoli",
    postOffice: "Mundoli",
    tehsil: "Tharali",
    district: "Chamoli",
    state: "Uttarakhand",
    country: "India",
    pinCode: "246443",
    phone: "9876543210",
    email: "parent@example.com",
    bloodGroup: "O+",
    education: "High School",
    emergencyName: "Parent",
    emergencyRelation: "Father",
    emergencyPhone: "9876543211",
  };
}

describe("talent hunt age window", () => {
  it("accepts 11.5 to 14.5 years", () => {
    const young = validatePersonal(personal("2015-03-01"), { minAge: 11.5, maxAge: 14.5, onDate: ON_DATE });
    const old = validatePersonal(personal("2012-03-01"), { minAge: 11.5, maxAge: 14.5, onDate: ON_DATE });
    assert.equal(young.dob, undefined);
    assert.equal(old.dob, undefined);
  });

  it("rejects children younger than 11.5 or older than 14.5", () => {
    const tooYoung = validatePersonal(personal("2015-03-02"), { minAge: 11.5, maxAge: 14.5, onDate: ON_DATE });
    const tooOld = validatePersonal(personal("2012-02-01"), { minAge: 11.5, maxAge: 14.5, onDate: ON_DATE });
    assert.ok(tooYoung.dob);
    assert.ok(tooOld.dob);
  });

  it("limits the date of birth picker to 11.5–14.5 years", () => {
    const { earliest, latest } = dobRange(11.5, 14.5, ON_DATE);
    assert.equal(isoDate(latest), "2015-03-01");
    assert.equal(isoDate(earliest), "2012-03-01");
    assert.ok(latest.getFullYear() === 2015);
    assert.ok(earliest.getFullYear() === 2012);
  });
});

describe("admin upload folders", () => {
  it("names files with the applicant and stores them in kind folders", () => {
    assert.equal(safePersonSlug("ayush bhatt"), "ayush-bhatt");
    assert.equal(
      buildUploadFileName("ANF-THN-260901-ON38", "ayush bhatt", "photograph", "jpg"),
      "ANF-THN-260901-ON38_ayush-bhatt_photograph.jpg",
    );
    assert.equal(
      uploadRelativePath("aadhaar", "talent-hunt", "ANF-THN-260901-ON38_ayush-bhatt_aadhaar.jpg"),
      "uploads/aadhaar/talent-hunt/ANF-THN-260901-ON38_ayush-bhatt_aadhaar.jpg",
    );
  });
});

describe("aadhaar number on the form", () => {
  it("formats and validates a 12-digit Aadhaar number", () => {
    assert.equal(formatAadhaarNumber("123412341234"), "1234 1234 1234");
    assert.equal(isValidAadhaarNumber("1234 1234 1234"), true);
    assert.equal(isValidAadhaarNumber("12345"), false);
  });

  it("requires Aadhaar number and upload for talent hunt documents", () => {
    const errors = validateDocuments(
      { dataUrl: "data:image/jpeg;base64,aaaa", name: "p.jpg", mime: "image/jpeg", size: 1200 },
      { dataUrl: "data:image/jpeg;base64,bbbb", name: "s.jpg", mime: "image/jpeg", size: 1200 },
      { requireAadhaar: true, aadhaar: null, aadhaarNumber: "" },
    );
    assert.ok(errors.aadhaar);
    assert.ok(errors.aadhaarNumber);
  });
});

describe("registration fee", () => {
  it("uses ₹500 for membership, ₹100 for sports, and free volunteer registration", () => {
    assert.equal(registrationFeeFor("membership"), 500);
    assert.equal(registrationFeeFor("sports"), 100);
    assert.equal(registrationFeeFor("volunteer"), 0);
    assert.equal(registrationRequiresPayment("membership"), true);
    assert.equal(registrationRequiresPayment("sports"), true);
    assert.equal(registrationRequiresPayment("volunteer"), false);
  });

  it("requires a payment screenshot only when a fee is due", () => {
    const paidErrors = validatePayment(null, { amount: SPORTS_FEE_AMOUNT, required: true });
    assert.ok(paidErrors.paymentProof);
    const freeErrors = validatePayment(null, { amount: 0, required: false });
    assert.equal(freeErrors.paymentProof, undefined);
  });

  it("does not require payment for volunteer registration", () => {
    const state = createEmptyForm("volunteer");
    const errors = validateStep("payment", state);
    assert.equal(errors.paymentProof, undefined);
    assert.equal(
      wizardStepDefsFor("volunteer").some((step) => step.id === "payment"),
      false,
    );
  });

  it("requires payment for membership and sports", () => {
    assert.ok(validateStep("payment", createEmptyForm("membership")).paymentProof);
    assert.ok(validateStep("payment", createEmptyForm("sports")).paymentProof);
    assert.equal(
      wizardStepDefsFor("membership").some((step) => step.id === "payment"),
      true,
    );
  });

  it("encodes type-specific UPI QR payloads", () => {
    const membershipUri = upiPaymentUri(registrationFeeFor("membership"));
    const sportsUri = upiPaymentUri(registrationFeeFor("sports"));
    const defaultUri = upiPaymentUri(REGISTRATION_FEE_AMOUNT);
    assert.ok(membershipUri.includes(`am=${MEMBERSHIP_FEE_AMOUNT}`));
    assert.ok(sportsUri.includes(`am=${SPORTS_FEE_AMOUNT}`));
    assert.ok(defaultUri.includes("am=100"));
    assert.ok(sportsUri.includes("cu=INR"));
    assert.ok(sportsUri.includes("ANNT%20NANDAS%20FOUNDATION"));
  });
});

describe("membership validity", () => {
  it("stores a 1-year expiry from the activation date", () => {
    const start = "2026-09-08T10:30:00.000Z";
    const period = membershipPeriodFrom(start);
    assert.equal(period.feeAmount, 500);
    assert.equal(period.validityYears, 1);
    assert.equal(period.validityLabel, "1 Year");
    assert.equal(period.startDate, start);
    assert.equal(period.expiryDate, "2027-09-08T10:30:00.000Z");
    assert.equal(addCalendarYears(start, 1), "2027-09-08T10:30:00.000Z");
    assert.equal(membershipStatusAt(period.expiryDate, new Date("2026-09-08T10:30:00.000Z")), "active");
    assert.equal(membershipStatusAt(period.expiryDate, new Date("2027-09-08T10:29:59.000Z")), "active");
    assert.equal(membershipStatusAt(period.expiryDate, new Date("2027-09-08T10:30:00.000Z")), "expired");
  });
});

describe("one-page printable record", () => {
  it("shows Aadhaar number and class, and never prints Aadhaar or payment photos", () => {
    const state = createEmptyForm("talent-hunt");
    state.talentHunt = {
      ...state.talentHunt,
      talentCategory: "Singing",
      schoolName: "Village School",
      classGrade: "Class 8",
      aadhaarNumber: "123412341234",
      parentName: "Parent",
      parentRelation: "Father",
      parentPhone: "9876543210",
      whyParticipate: "To learn",
    };
    state.aadhaar = {
      dataUrl: "data:image/jpeg;base64,SECRET_AADHAAR_PHOTO",
      name: "aadhaar.jpg",
      mime: "image/jpeg",
      size: 1200,
    };
    state.paymentProof = {
      dataUrl: "data:image/jpeg;base64,SECRET_PAYMENT_PHOTO",
      name: "payment.jpg",
      mime: "image/jpeg",
      size: 1200,
    };

    const html = buildPrintableHtml({
      state,
      registrationId: "ANF-THN-TEST",
      submittedAt: "2026-09-01T12:00:00.000Z",
      photoSrc: "cid:photograph@registration",
      signatureSrc: "cid:signature@registration",
      mode: "email",
    });

    assert.ok(html.includes("1234 1234 1234"));
    assert.ok(html.includes("Class 8"));
    assert.ok(html.includes("₹100") || html.includes("100"));
    assert.equal(html.includes("SECRET_AADHAAR_PHOTO"), false);
    assert.equal(html.includes("SECRET_PAYMENT_PHOTO"), false);
    assert.ok(html.includes("One page") || html.includes("one page") || html.includes("One-page"));
  });

  it("shows membership fee, 1-year validity, and start/expiry dates", () => {
    const state = createEmptyForm("membership");
    state.membership = {
      ...state.membership,
      membershipType: "Individual",
      areasOfInterest: ["Education"],
      contribution: "Donate",
    };
    const html = buildPrintableHtml({
      state,
      registrationId: "ANF-MEM-TEST",
      submittedAt: "2026-09-08T10:30:00.000Z",
      mode: "document",
    });
    assert.ok(html.includes("₹500") || html.includes("500"));
    assert.ok(html.includes("1 Year"));
    assert.ok(html.includes("Membership Start Date"));
    assert.ok(html.includes("Membership Expiry Date"));
  });

  it("shows volunteer registration as free and does not request payment", () => {
    const state = createEmptyForm("volunteer");
    const html = buildPrintableHtml({
      state,
      registrationId: "ANF-VOL-TEST",
      submittedAt: "2026-09-08T10:30:00.000Z",
      mode: "document",
    });
    assert.ok(html.includes("Free"));
    assert.equal(html.includes("₹100"), false);
    assert.equal(html.includes("₹500"), false);
  });
});
