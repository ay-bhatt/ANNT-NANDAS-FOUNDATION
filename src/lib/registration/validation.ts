import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  registrationFeeFor,
  registrationRequiresPayment,
  TALENT_HUNT_AGE_LABEL,
  TALENT_HUNT_MAX_AGE,
  TALENT_HUNT_MIN_AGE,
} from "./constants";
import { inferImageMime, isAcceptedImageMime, MIN_IMAGE_BYTES } from "./image-bytes";
import type {
  DeclarationDetails,
  FieldErrors,
  PersonalInformation,
  RegistrationFormState,
  RegistrationType,
  SportsDetails,
  TalentHuntDetails,
  UploadedImage,
  VolunteerDetails,
} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;
const INTL_PHONE_PATTERN = /^\+?[0-9][0-9\s-]{8,16}$/;
const INDIAN_PIN_PATTERN = /^[1-9][0-9]{5}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  return PHONE_PATTERN.test(trimmed) || INTL_PHONE_PATTERN.test(trimmed);
}

export function parseDob(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (iso) {
    return calendarDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));
  }

  const dmy = /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/.exec(trimmed);
  if (dmy) {
    return calendarDate(Number(dmy[3]), Number(dmy[2]), Number(dmy[1]));
  }

  return null;
}

function calendarDate(year: number, month: number, day: number): Date | null {
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

export function formatDob(value: string): string {
  const date = parseDob(value);
  if (!date) return value.trim() || "Not provided";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

export function ageFromDob(dob: string, onDate = new Date()): number | null {
  const years = ageInYears(dob, onDate);
  if (years === null) return null;
  return Math.floor(years);
}

export function completedAgeMonths(dob: string, onDate = new Date()): number | null {
  const birth = parseDob(dob);
  if (!birth) return null;
  if (onDate.getTime() < birth.getTime()) return null;
  let months = (onDate.getFullYear() - birth.getFullYear()) * 12 + (onDate.getMonth() - birth.getMonth());
  if (onDate.getDate() < birth.getDate()) months -= 1;
  return months;
}

export function ageInYears(dob: string, onDate = new Date()): number | null {
  const months = completedAgeMonths(dob, onDate);
  if (months === null) return null;
  return months / 12;
}

export function dateAtAge(onDate: Date, ageYears: number): Date {
  const wholeYears = Math.floor(ageYears);
  const extraMonths = Math.round((ageYears - wholeYears) * 12);
  return new Date(onDate.getFullYear() - wholeYears, onDate.getMonth() - extraMonths, onDate.getDate());
}

export function dobRange(
  minAge: number,
  maxAge: number,
  onDate = new Date(),
): { earliest: Date; latest: Date } {
  return {
    latest: dateAtAge(onDate, minAge),
    earliest: dateAtAge(onDate, maxAge),
  };
}

export function isoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatAgeBound(value: number): string {
  const whole = Math.floor(value);
  const fraction = value - whole;
  if (Math.abs(fraction - 0.5) < 0.01) return `${whole}½`;
  if (Math.abs(fraction) < 0.01) return String(whole);
  return String(value);
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function formatAadhaarNumber(value: string): string {
  const digits = digitsOnly(value).slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

export function isValidAadhaarNumber(value: string): boolean {
  return /^\d{12}$/.test(digitsOnly(value));
}

export function validateImage(file: File): string | null {
  const mime = inferImageMime(file.name, file.type);
  if (!isAcceptedImageMime(mime) && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, or WEBP image.";
  }
  if (file.size < MIN_IMAGE_BYTES) {
    return "This image is empty or too small. Please upload a clearer photo.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

function required(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required.`;
  return undefined;
}

export function validatePersonal(
  personal: PersonalInformation,
  options?: { minAge?: number; maxAge?: number; onDate?: Date; skipProfileExtras?: boolean },
): FieldErrors {
  const errors: FieldErrors = {};
  const nameError = required(personal.fullName, "Full name");
  const fatherError = required(personal.fatherName, "Father’s name");
  const motherError = required(personal.motherName, "Mother’s name");
  const dobError = required(personal.dob, "Date of birth");
  const genderError = required(personal.gender, "Gender");
  const nationalityError = required(personal.nationality, "Nationality");
  const addressError = required(personal.address, "Address");
  const postOfficeError = required(personal.postOffice, "Post office");
  const tehsilError = required(personal.tehsil, "Tehsil");
  const districtError = required(personal.district, "District");
  const stateError = required(personal.state, "State");
  const countryError = required(personal.country, "Country");
  const pinError = required(personal.pinCode, "PIN code");
  const phoneError = required(personal.phone, "Phone number");
  const emailError = required(personal.email, "Email");
  const bloodError = required(personal.bloodGroup, "Blood group");
  const educationError = required(personal.education, "Education");
  const emergencyNameError = required(personal.emergencyName, "Emergency contact person’s name");
  const emergencyRelationError = required(personal.emergencyRelation, "Relation with the person");
  const emergencyPhoneError = required(personal.emergencyPhone, "Emergency contact number");

  if (nameError) errors.fullName = nameError;
  if (fatherError) errors.fatherName = fatherError;
  if (motherError) errors.motherName = motherError;
  if (dobError) errors.dob = dobError;
  if (genderError) errors.gender = genderError;
  if (!options?.skipProfileExtras && nationalityError) errors.nationality = nationalityError;
  if (addressError) errors.address = addressError;
  if (postOfficeError) errors.postOffice = postOfficeError;
  if (tehsilError) errors.tehsil = tehsilError;
  if (districtError) errors.district = districtError;
  if (stateError) errors.state = stateError;
  if (countryError) errors.country = countryError;
  if (pinError) errors.pinCode = pinError;
  if (phoneError) errors.phone = phoneError;
  if (emailError) errors.email = emailError;
  if (bloodError) errors.bloodGroup = bloodError;
  if (!options?.skipProfileExtras && educationError) errors.education = educationError;
  if (emergencyNameError) errors.emergencyName = emergencyNameError;
  if (emergencyRelationError) errors.emergencyRelation = emergencyRelationError;
  if (emergencyPhoneError) errors.emergencyPhone = emergencyPhoneError;

  if (personal.email && !isValidEmail(personal.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (personal.phone && !isValidPhone(personal.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (personal.whatsapp && !isValidPhone(personal.whatsapp)) {
    errors.whatsapp = "Enter a valid WhatsApp number.";
  }
  if (personal.emergencyPhone && !isValidPhone(personal.emergencyPhone)) {
    errors.emergencyPhone = "Enter a valid emergency contact number.";
  }
  if (personal.pinCode) {
    const pin = personal.pinCode.trim();
    const country = personal.country.trim().toLowerCase();
    if (country === "india" || country === "in") {
      if (!INDIAN_PIN_PATTERN.test(pin)) {
        errors.pinCode = "Enter a valid 6-digit PIN code.";
      }
    } else if (!/^[0-9A-Za-z][0-9A-Za-z\s-]{2,11}$/.test(pin)) {
      errors.pinCode = "Enter a valid PIN / postal code.";
    }
  }

  if (personal.dob) {
    const onDate = options?.onDate ?? new Date();
    const computed = ageFromDob(personal.dob, onDate);
    const precise = ageInYears(personal.dob, onDate);
    if (computed === null || precise === null) {
      errors.dob = "Enter a valid date of birth in DD/MM/YYYY format.";
    } else if (options?.minAge != null && precise < options.minAge) {
      errors.dob = `This competition is for children ${TALENT_HUNT_AGE_LABEL} (${formatAgeBound(options.minAge)}–${formatAgeBound(options.maxAge ?? options.minAge)}).`;
    } else if (options?.maxAge != null && precise > options.maxAge) {
      errors.dob = `This competition is for children ${TALENT_HUNT_AGE_LABEL} (${formatAgeBound(options.minAge ?? options.maxAge)}–${formatAgeBound(options.maxAge)}).`;
    } else if (computed < 8 || computed > 90) {
      errors.dob = "Please enter a realistic date of birth.";
    } else if (personal.age && Number(personal.age) !== computed) {
      errors.age = `Age should be ${computed} based on the date of birth.`;
    }
  }

  return errors;
}

export function validateVolunteer(details: VolunteerDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.volunteerName.trim()) errors.volunteerName = "Volunteer name is required.";
  if (!details.skills.trim()) errors.skills = "Please describe the skills you can contribute.";
  if (details.roles.length === 0) errors.roles = "Select at least one volunteer category.";
  if (details.roles.includes("Other") && !details.otherRole.trim()) {
    errors.otherRole = "Please describe your own skill or role.";
  }
  if (details.roles.includes("Teacher") && !details.subjects.trim()) {
    errors.subjects = "Please share the subjects you can teach.";
  }
  if (!details.motivation.trim()) errors.motivation = "Please tell us why you want to volunteer.";
  if (!details.preferredLocation.trim()) errors.preferredLocation = "Preferred location is required.";
  if (!details.duration) errors.duration = "Select a volunteering duration.";
  if (details.duration === "Specific duration" && !details.customDuration.trim()) {
    errors.customDuration = "Please specify the duration.";
  }
  return errors;
}

export function validateMembership(details: RegistrationFormState["membership"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.membershipType) errors.membershipType = "Select a membership type.";
  if (details.areasOfInterest.length === 0) {
    errors.areasOfInterest = "Select at least one area of interest.";
  }
  if (!details.contribution) errors.contribution = "Please tell us how you would like to contribute.";
  return errors;
}

export function validateSports(details: SportsDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.sport) errors.sport = "Select a sport.";
  if (details.sport === "other" && !details.otherSport.trim()) {
    errors.otherSport = "Please name the sport.";
  }
  if (!details.category) errors.category = "Select a sports category.";
  if (!details.experienceLevel) errors.experienceLevel = "Select your experience level.";
  if (!details.medicallyFit) {
    errors.medicallyFit = "Please confirm that you are medically fit to participate.";
  }
  return errors;
}

export function validateEmployee(details: RegistrationFormState["employee"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.position.trim()) errors.position = "Position applied for is required.";
  if (!details.qualifications.trim()) errors.qualifications = "Qualifications are required.";
  if (!details.whyJoin.trim()) errors.whyJoin = "Please tell us why you want to join.";
  return errors;
}

export function validateEvent(details: RegistrationFormState["event"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.eventInterest.trim()) errors.eventInterest = "Please share the event or activity.";
  if (!details.participationMode) errors.participationMode = "Select how you would like to participate.";
  return errors;
}

export function validateTalentHunt(details: TalentHuntDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.talentCategory) errors.talentCategory = "Select a talent category.";
  if (details.talentCategory === "Other" && !details.otherTalent.trim()) {
    errors.otherTalent = "Please describe the talent.";
  }
  if (!details.schoolName.trim()) errors.schoolName = "School name is required.";
  if (!details.classGrade) errors.classGrade = "Select the class the student currently studies in.";
  if (!details.parentName.trim()) errors.parentName = "Parent / consultant name is required.";
  if (!details.parentRelation) errors.parentRelation = "Select the relation.";
  if (!details.parentPhone.trim()) errors.parentPhone = "Parent contact number is required.";
  else if (!isValidPhone(details.parentPhone)) errors.parentPhone = "Enter a valid parent contact number.";
  if (details.parentEmail && !isValidEmail(details.parentEmail)) {
    errors.parentEmail = "Enter a valid parent email address.";
  }
  if (!details.whyParticipate.trim()) errors.whyParticipate = "Please tell us why you want to take part.";
  return errors;
}

export function validateDocuments(
  photograph: UploadedImage | null,
  signature: UploadedImage | null,
  options?: {
    aadhaar?: UploadedImage | null;
    aadhaarNumber?: string;
    requireAadhaar?: boolean;
    signatureLabel?: string;
  },
): FieldErrors {
  const errors: FieldErrors = {};
  if (!photograph || photograph.size < MIN_IMAGE_BYTES || !photograph.dataUrl.startsWith("data:image/")) {
    errors.photograph = "Please upload a recent photograph.";
  }
  if (!signature || signature.size < MIN_IMAGE_BYTES || !signature.dataUrl.startsWith("data:image/")) {
    errors.signature = options?.signatureLabel
      ? `Please provide the ${options.signatureLabel.toLowerCase()}. You can upload a photo or sign digitally.`
      : "Please provide your signature. You can upload a photo or sign digitally.";
  }
  if (options?.requireAadhaar) {
    if (!options.aadhaar || options.aadhaar.size < MIN_IMAGE_BYTES || !options.aadhaar.dataUrl.startsWith("data:image/")) {
      errors.aadhaar = "Please upload a clear picture of the Aadhaar card.";
    }
    if (!options.aadhaarNumber?.trim()) errors.aadhaarNumber = "Aadhaar number is required.";
    else if (!isValidAadhaarNumber(options.aadhaarNumber)) {
      errors.aadhaarNumber = "Enter a valid 12-digit Aadhaar number.";
    }
  }
  return errors;
}

export function validatePayment(
  proof: UploadedImage | null,
  options: { amount?: number; required?: boolean } = {},
): FieldErrors {
  const required = options.required ?? true;
  const amount = options.amount ?? 0;
  if (!required || amount <= 0) return {};
  const errors: FieldErrors = {};
  if (!proof || proof.size < MIN_IMAGE_BYTES || !proof.dataUrl.startsWith("data:image/")) {
    errors.paymentProof = `Please upload a screenshot of the ₹${amount} payment.`;
  }
  return errors;
}

export function validateDeclaration(declaration: DeclarationDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!declaration.accepted) {
    errors.accepted = "You must accept the declaration before submitting.";
  }
  if (!declaration.place.trim()) errors.place = "Place is required.";
  if (!declaration.date) errors.date = "Declaration date is required.";
  return errors;
}

export function validateStep(
  step: "personal" | "details" | "documents" | "payment" | "declaration",
  state: RegistrationFormState,
): FieldErrors {
  if (step === "personal") {
    return validatePersonal(
      state.personal,
      state.type === "talent-hunt"
        ? { minAge: TALENT_HUNT_MIN_AGE, maxAge: TALENT_HUNT_MAX_AGE, skipProfileExtras: true }
        : undefined,
    );
  }
  if (step === "documents") {
    return validateDocuments(state.photograph, state.signature, {
      aadhaar: state.aadhaar,
      aadhaarNumber: state.talentHunt.aadhaarNumber,
      requireAadhaar: state.type === "talent-hunt",
      signatureLabel: state.type === "talent-hunt" ? "parent / consultant signature" : undefined,
    });
  }
  if (step === "payment") {
    return validatePayment(state.paymentProof, {
      amount: registrationFeeFor(state.type),
      required: registrationRequiresPayment(state.type),
    });
  }
  if (step === "declaration") return validateDeclaration(state.declaration);
  if (!state.type) return { type: "Select a registration type." };
  if (state.type === "volunteer") return validateVolunteer(state.volunteer);
  if (state.type === "membership") return validateMembership(state.membership);
  if (state.type === "sports") return validateSports(state.sports);
  if (state.type === "employee") return validateEmployee(state.employee);
  if (state.type === "talent-hunt") return validateTalentHunt(state.talentHunt);
  return validateEvent(state.event);
}

export function typeLabel(type: RegistrationType): string {
  if (type === "volunteer") return "Volunteer";
  if (type === "membership") return "Membership";
  if (type === "sports") return "Sports";
  if (type === "employee") return "Team / Employee";
  if (type === "talent-hunt") return "Runner Talent Hunt";
  return "Event";
}
