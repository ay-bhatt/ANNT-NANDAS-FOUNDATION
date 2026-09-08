import { NextResponse } from "next/server";
import { REGISTRATION_TYPE_META, registrationRequiresPayment } from "@/lib/registration/constants";
import { createEmptyForm } from "@/lib/registration/form-state";
import { sendRegistrationEmails } from "@/lib/registration/notify";
import { saveRegistrationRecord } from "@/lib/registration/store";
import type {
  PersonalInformation,
  RegistrationFormState,
  RegistrationPayload,
  RegistrationType,
  SportKind,
  TalentHuntDetails,
  UploadedImage,
} from "@/lib/registration/types";
import { inferImageMime, isPlausibleImageBuffer, parseImageDataUrl } from "@/lib/registration/image-bytes";
import { validateStep } from "@/lib/registration/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

const VALID_TYPES: RegistrationType[] = ["volunteer", "membership", "sports", "employee", "event", "talent-hunt"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBoolean(value: unknown): boolean {
  return value === true || value === "true";
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function parseImage(value: unknown): UploadedImage | null {
  if (!isRecord(value) || typeof value.dataUrl !== "string") return null;
  const parsed = parseImageDataUrl(value.dataUrl);
  if (!parsed) return null;
  return {
    dataUrl: value.dataUrl,
    name: asString(value.name) || "upload.jpg",
    mime: parsed.mime,
    size: parsed.buffer.length,
  };
}

async function fileToImage(entry: FormDataEntryValue | null): Promise<UploadedImage | null> {
  if (!entry || typeof entry === "string") return null;
  const file = entry as File;
  if (!file.size || file.size > 5_000_000) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  if (!isPlausibleImageBuffer(buffer)) return null;
  const mime = inferImageMime(file.name, file.type);
  return {
    dataUrl: `data:${mime};base64,${buffer.toString("base64")}`,
    name: file.name || "upload.jpg",
    mime,
    size: buffer.length,
  };
}

async function readIncoming(request: Request): Promise<unknown> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const payloadText = String(form.get("payload") || "{}");
    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(payloadText) as Record<string, unknown>;
    } catch {
      payload = {};
    }
    payload.photograph = await fileToImage(form.get("photograph"));
    payload.signature = await fileToImage(form.get("signature"));
    payload.aadhaar = await fileToImage(form.get("aadhaar"));
    payload.paymentProof = await fileToImage(form.get("paymentProof"));
    return payload;
  }
  return request.json();
}

function createRegistrationId(type: RegistrationType): string {
  const code = REGISTRATION_TYPE_META[type].code;
  const stamp = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ANF-${code}-${stamp}-${rand}`;
}

function normalizeType(value: unknown): RegistrationType | "" {
  const type = asString(value);
  if (type === "running") return "sports";
  if (type === "general") return "event";
  if (type === "talentHunt" || type === "talent_hunt") return "talent-hunt";
  if (VALID_TYPES.includes(type as RegistrationType)) return type as RegistrationType;
  return "";
}

function normalizePayload(raw: unknown): RegistrationFormState | null {
  if (!isRecord(raw)) return null;
  const type = normalizeType(raw.type);
  if (!type) return null;

  const incomingSport = isRecord(raw.sports) ? asString(raw.sports.sport) : asString(raw.type) === "running" ? "running" : "";
  const sport: SportKind | "" =
    incomingSport === "running" || incomingSport === "cycling" || incomingSport === "community" || incomingSport === "other"
      ? incomingSport
      : "";
  const state = createEmptyForm(type, sport);
  const incomingPersonal = isRecord(raw.personal) ? raw.personal : raw;

  const membershipRaw = isRecord(raw.membership) ? raw.membership : {};
  const sportsRaw = isRecord(raw.sports) ? raw.sports : raw;
  const eventRaw = isRecord(raw.event) ? raw.event : raw;

  const personal: PersonalInformation = {
    fullName: asString(incomingPersonal.fullName || incomingPersonal.name),
    fatherName: asString(incomingPersonal.fatherName),
    motherName: asString(incomingPersonal.motherName),
    dob: asString(incomingPersonal.dob),
    age: asString(incomingPersonal.age),
    gender: asString(incomingPersonal.gender),
    nationality: asString(incomingPersonal.nationality) || "Indian",
    address: asString(incomingPersonal.address),
    postOffice: asString(incomingPersonal.postOffice),
    tehsil: asString(incomingPersonal.tehsil),
    district: asString(incomingPersonal.district),
    state: asString(incomingPersonal.state),
    country: asString(incomingPersonal.country) || "India",
    pinCode: asString(incomingPersonal.pinCode),
    phone: asString(incomingPersonal.phone),
    email: asString(incomingPersonal.email),
    whatsapp: asString(incomingPersonal.whatsapp),
    bloodGroup: asString(incomingPersonal.bloodGroup),
    education: asString(incomingPersonal.education),
    specialEducation: asString(incomingPersonal.specialEducation),
    occupation: asString(incomingPersonal.occupation),
    emergencyName: asString(
      incomingPersonal.emergencyName || membershipRaw.emergencyName || sportsRaw.emergencyName || eventRaw.emergencyName,
    ),
    emergencyRelation: asString(incomingPersonal.emergencyRelation),
    emergencyPhone: asString(
      incomingPersonal.emergencyPhone ||
        membershipRaw.emergencyPhone ||
        sportsRaw.emergencyPhone ||
        eventRaw.emergencyPhone ||
        raw.emergencyContact,
    ),
  };

  const volunteerRaw = isRecord(raw.volunteer) ? raw.volunteer : raw;
  const employeeRaw = isRecord(raw.employee) ? raw.employee : raw;
  const declarationRaw = isRecord(raw.declaration) ? raw.declaration : raw;

  return {
    ...state,
    type,
    personal,
    volunteer: {
      ...state.volunteer,
      volunteerName: asString(volunteerRaw.volunteerName) || personal.fullName,
      skills: asString(volunteerRaw.skills),
      roles: asStringArray(volunteerRaw.roles),
      otherRole: asString(volunteerRaw.otherRole),
      subjects: asString(volunteerRaw.subjects),
      experience: asString(volunteerRaw.experience),
      motivation: asString(volunteerRaw.motivation),
      preferredTiming: asString(volunteerRaw.preferredTiming),
      customTiming: asString(volunteerRaw.customTiming),
      availability: asString(volunteerRaw.availability),
      preferredLocation: asString(volunteerRaw.preferredLocation),
      foodSupport: (asString(volunteerRaw.foodSupport) || "") as RegistrationFormState["volunteer"]["foodSupport"],
      staySupport: (asString(volunteerRaw.staySupport) || "") as RegistrationFormState["volunteer"]["staySupport"],
      travelSupport: (asString(volunteerRaw.travelSupport) || "") as RegistrationFormState["volunteer"]["travelSupport"],
      otherSupport: asString(volunteerRaw.otherSupport),
      duration: asString(volunteerRaw.duration),
      customDuration: asString(volunteerRaw.customDuration),
      additionalComments: asString(volunteerRaw.additionalComments),
    },
    membership: {
      ...state.membership,
      membershipType: asString(membershipRaw.membershipType),
      areasOfInterest: asStringArray(membershipRaw.areasOfInterest),
      contribution: asString(membershipRaw.contribution),
      howHeard: asString(membershipRaw.howHeard),
      additionalComments: asString(membershipRaw.additionalComments),
    },
    sports: {
      ...state.sports,
      sport,
      otherSport: asString(sportsRaw.otherSport),
      category: asString(sportsRaw.category || raw.category),
      experienceLevel: asString(sportsRaw.experienceLevel || raw.experience),
      previousParticipation: asString(sportsRaw.previousParticipation || raw.experience),
      medicalInfo: asString(sportsRaw.medicalInfo),
      medicallyFit: asBoolean(sportsRaw.medicallyFit),
      tshirtSize: asString(sportsRaw.tshirtSize),
      additionalComments: asString(sportsRaw.additionalComments),
    },
    employee: {
      ...state.employee,
      position: asString(employeeRaw.position),
      qualifications: asString(employeeRaw.qualifications),
      experience: asString(employeeRaw.experience),
      availabilityToJoin: asString(employeeRaw.availabilityToJoin),
      whyJoin: asString(employeeRaw.whyJoin),
      additionalComments: asString(employeeRaw.additionalComments),
    },
    event: {
      ...state.event,
      eventInterest: asString(eventRaw.eventInterest),
      participationMode: asString(eventRaw.participationMode),
      additionalComments: asString(eventRaw.additionalComments),
    },
    talentHunt: {
      ...state.talentHunt,
      ...normalizeTalentHunt(raw),
    },
    photograph: parseImage(raw.photograph),
    signature: parseImage(raw.signature),
    aadhaar: parseImage(raw.aadhaar),
    paymentProof: parseImage(raw.paymentProof),
    declaration: {
      accepted: asBoolean(declarationRaw.accepted || raw.agreeTerms),
      place: asString(declarationRaw.place),
      date: asString(declarationRaw.date) || new Date().toISOString().slice(0, 10),
    },
  };
}

function normalizeTalentHunt(raw: Record<string, unknown>): TalentHuntDetails {
  const source = isRecord(raw.talentHunt) ? raw.talentHunt : raw;
  return {
    talentCategory: asString(source.talentCategory),
    otherTalent: asString(source.otherTalent),
    schoolName: asString(source.schoolName),
    classGrade: asString(source.classGrade),
    aadhaarNumber: asString(source.aadhaarNumber),
    previousAchievements: asString(source.previousAchievements),
    parentName: asString(source.parentName),
    parentRelation: asString(source.parentRelation),
    parentPhone: asString(source.parentPhone),
    parentEmail: asString(source.parentEmail),
    whyParticipate: asString(source.whyParticipate),
    additionalComments: asString(source.additionalComments),
  };
}

function collectErrors(state: RegistrationFormState): string[] {
  const buckets = [
    validateStep("personal", state),
    validateStep("details", state),
    validateStep("documents", state),
    validateStep("payment", state),
    validateStep("declaration", state),
  ];
  return buckets.flatMap((bucket) => Object.values(bucket));
}

function recordWithoutImages(state: RegistrationFormState, id: string, submittedAt: string) {
  const payload: RegistrationPayload = {
    type: state.type as RegistrationType,
    personal: state.personal,
    volunteer: state.type === "volunteer" ? state.volunteer : undefined,
    membership: state.type === "membership" ? state.membership : undefined,
    sports: state.type === "sports" ? state.sports : undefined,
    employee: state.type === "employee" ? state.employee : undefined,
    event: state.type === "event" ? state.event : undefined,
    talentHunt: state.type === "talent-hunt" ? state.talentHunt : undefined,
    declaration: state.declaration,
  };

  return {
    id,
    type: state.type,
    name: state.personal.fullName,
    email: state.personal.email,
    phone: state.personal.phone,
    whatsapp: state.personal.whatsapp,
    gender: state.personal.gender,
    dob: state.personal.dob,
    address: state.personal.address,
    postOffice: state.personal.postOffice,
    tehsil: state.personal.tehsil,
    district: state.personal.district,
    stateName: state.personal.state,
    country: state.personal.country,
    pinCode: state.personal.pinCode,
    emergencyName: state.personal.emergencyName,
    emergencyRelation: state.personal.emergencyRelation,
    emergencyPhone: state.personal.emergencyPhone,
    submittedAt,
    hasPhotograph: Boolean(state.photograph),
    hasSignature: Boolean(state.signature),
    hasAadhaar: Boolean(state.aadhaar),
    hasPaymentProof: Boolean(state.paymentProof),
    aadhaarNumber: state.type === "talent-hunt" ? state.talentHunt.aadhaarNumber : "",
    photographName: state.photograph?.name || "",
    signatureName: state.signature?.name || "",
    aadhaarName: state.aadhaar?.name || "",
    paymentProofName: state.paymentProof?.name || "",
    payload,
  };
}

export async function POST(request: Request) {
  try {
    const raw = await readIncoming(request);
    const state = normalizePayload(raw);

    if (!state || !state.type) {
      return NextResponse.json(
        { success: false, message: "Please choose a valid registration type." },
        { status: 400 },
      );
    }

    if (!registrationRequiresPayment(state.type)) {
      state.paymentProof = null;
    }

    const errors = collectErrors(state);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors[0] },
        { status: 400 },
      );
    }

    const registrationId = createRegistrationId(state.type);
    const submittedAt = new Date().toISOString();
    const record = recordWithoutImages(state, registrationId, submittedAt);

    try {
      const stored = await saveRegistrationRecord({
        id: registrationId,
        submittedAt,
        state,
      });
      record.photographName = stored.photographPath;
      record.signatureName = stored.signaturePath;
      record.aadhaarName = stored.aadhaarPath;
      record.paymentProofName = stored.paymentProofPath;
    } catch (storeError) {
      const message = storeError instanceof Error ? storeError.message : "";
      if (
        message === "INVALID_PHOTOGRAPH" ||
        message === "INVALID_SIGNATURE" ||
        message === "INVALID_AADHAAR" ||
        message === "INVALID_PAYMENT_PROOF"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "A photograph, Aadhaar, signature, or payment screenshot could not be saved. Please upload a clearer JPG or PNG and try again.",
          },
          { status: 400 },
        );
      }
      console.error("REGISTRATION STORE WARNING:", storeError);
    }

    const emailResult = await sendRegistrationEmails({
      state,
      registrationId,
      submittedAt,
    });
    if (emailResult.error) {
      console.error("REGISTRATION EMAIL WARNING:", emailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: emailResult.sentToOffice
        ? "Registration submitted successfully. A copy has been emailed."
        : "Registration submitted successfully.",
      registrationId,
      submittedAt,
      emailSent: emailResult.sentToOffice,
      applicantEmailSent: emailResult.sentToApplicant,
      pdfAttached: emailResult.pdfAttached,
    });
  } catch (error) {
    console.error("REGISTRATION ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit registration. Please try again later.",
      },
      { status: 500 },
    );
  }
}
