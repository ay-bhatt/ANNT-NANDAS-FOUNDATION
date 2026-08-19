import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { REGISTRATION_TYPE_META } from "@/lib/registration/constants";
import { createEmptyForm } from "@/lib/registration/form-state";
import { buildPrintableHtml } from "@/lib/registration/printable";
import { saveRegistrationRecord } from "@/lib/registration/store";
import type {
  PersonalInformation,
  RegistrationFormState,
  RegistrationPayload,
  RegistrationType,
  SportKind,
  UploadedImage,
} from "@/lib/registration/types";
import {
  typeLabel,
  validateDeclaration,
  validateDocuments,
  validateEmployee,
  validateEvent,
  validateMembership,
  validatePersonal,
  validateSports,
  validateVolunteer,
} from "@/lib/registration/validation";

export const runtime = "nodejs";
export const maxDuration = 60;

const VALID_TYPES: RegistrationType[] = ["volunteer", "membership", "sports", "employee", "event"];

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
  if (!value.dataUrl.startsWith("data:image/")) return null;
  if (value.dataUrl.length > 2_500_000) return null;
  return {
    dataUrl: value.dataUrl,
    name: asString(value.name) || "upload.jpg",
    mime: asString(value.mime) || "image/jpeg",
    size: typeof value.size === "number" ? value.size : 0,
  };
}

function parseDataUrl(dataUrl: string): { mime: string; buffer: Buffer; ext: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  const mime = match[1];
  const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
  return { mime, buffer: Buffer.from(match[2], "base64"), ext };
}

async function fileToImage(entry: FormDataEntryValue | null): Promise<UploadedImage | null> {
  if (!entry || typeof entry === "string") return null;
  const file = entry as File;
  if (!file.size) return null;
  if (file.size > 1_200_000) return null;
  const mime = file.type && file.type.startsWith("image/") ? file.type : "image/jpeg";
  const buffer = Buffer.from(await file.arrayBuffer());
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

  const personal: PersonalInformation = {
    fullName: asString(incomingPersonal.fullName || incomingPersonal.name),
    fatherName: asString(incomingPersonal.fatherName),
    motherName: asString(incomingPersonal.motherName),
    dob: asString(incomingPersonal.dob),
    age: asString(incomingPersonal.age),
    gender: asString(incomingPersonal.gender),
    nationality: asString(incomingPersonal.nationality) || "Indian",
    address: asString(incomingPersonal.address),
    phone: asString(incomingPersonal.phone),
    email: asString(incomingPersonal.email),
    whatsapp: asString(incomingPersonal.whatsapp),
    bloodGroup: asString(incomingPersonal.bloodGroup),
    education: asString(incomingPersonal.education),
    specialEducation: asString(incomingPersonal.specialEducation),
    occupation: asString(incomingPersonal.occupation),
  };

  const volunteerRaw = isRecord(raw.volunteer) ? raw.volunteer : raw;
  const membershipRaw = isRecord(raw.membership) ? raw.membership : {};
  const sportsRaw = isRecord(raw.sports) ? raw.sports : raw;
  const employeeRaw = isRecord(raw.employee) ? raw.employee : raw;
  const eventRaw = isRecord(raw.event) ? raw.event : raw;
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
      emergencyName: asString(membershipRaw.emergencyName),
      emergencyPhone: asString(membershipRaw.emergencyPhone),
      additionalComments: asString(membershipRaw.additionalComments),
    },
    sports: {
      ...state.sports,
      sport,
      otherSport: asString(sportsRaw.otherSport),
      category: asString(sportsRaw.category || raw.category),
      experienceLevel: asString(sportsRaw.experienceLevel || raw.experience),
      previousParticipation: asString(sportsRaw.previousParticipation || raw.experience),
      emergencyName: asString(sportsRaw.emergencyName),
      emergencyPhone: asString(sportsRaw.emergencyPhone || raw.emergencyContact),
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
      emergencyName: asString(eventRaw.emergencyName),
      emergencyPhone: asString(eventRaw.emergencyPhone || raw.emergencyContact),
      additionalComments: asString(eventRaw.additionalComments),
    },
    photograph: parseImage(raw.photograph),
    signature: parseImage(raw.signature),
    declaration: {
      accepted: asBoolean(declarationRaw.accepted || raw.agreeTerms),
      place: asString(declarationRaw.place),
      date: asString(declarationRaw.date) || new Date().toISOString().slice(0, 10),
    },
  };
}

function collectErrors(state: RegistrationFormState): string[] {
  const buckets = [
    validatePersonal(state.personal),
    state.type === "volunteer" ? validateVolunteer(state.volunteer) : {},
    state.type === "membership" ? validateMembership(state.membership) : {},
    state.type === "sports" ? validateSports(state.sports) : {},
    state.type === "employee" ? validateEmployee(state.employee) : {},
    state.type === "event" ? validateEvent(state.event) : {},
    validateDocuments(state.photograph, state.signature),
    validateDeclaration(state.declaration),
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
    submittedAt,
    hasPhotograph: Boolean(state.photograph),
    hasSignature: Boolean(state.signature),
    photographName: state.photograph?.name || "",
    signatureName: state.signature?.name || "",
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
    } catch (storeError) {
      console.error("REGISTRATION STORE WARNING:", storeError);
    }

    const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    if (smtpReady) {
      try {
        const photoParsed = state.photograph ? parseDataUrl(state.photograph.dataUrl) : null;
        const signatureParsed = state.signature ? parseDataUrl(state.signature.dataUrl) : null;
        const photoCid = "photograph@registration";
        const signatureCid = "signature@registration";

        const emailHtml = buildPrintableHtml({
          state,
          registrationId,
          submittedAt,
          photoSrc: photoParsed ? `cid:${photoCid}` : undefined,
          signatureSrc: signatureParsed ? `cid:${signatureCid}` : undefined,
          mode: "email",
        });

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 465),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        let pdfBuffer: Buffer | null = null;
        try {
          const { buildRegistrationPdf } = await import("@/lib/registration/pdf");
          pdfBuffer = await buildRegistrationPdf({ state, registrationId, submittedAt });
        } catch (pdfError) {
          console.error("REGISTRATION PDF WARNING:", pdfError);
        }

        const attachments = [
          photoParsed
            ? {
                filename: `${registrationId}-photograph.${photoParsed.ext}`,
                content: photoParsed.buffer,
                contentType: photoParsed.mime,
                cid: photoCid,
              }
            : null,
          signatureParsed
            ? {
                filename: `${registrationId}-signature.${signatureParsed.ext}`,
                content: signatureParsed.buffer,
                contentType: signatureParsed.mime,
                cid: signatureCid,
              }
            : null,
          pdfBuffer
            ? {
                filename: `${registrationId}.pdf`,
                content: pdfBuffer,
                contentType: "application/pdf",
              }
            : {
                filename: `${registrationId}.html`,
                content: buildPrintableHtml({
                  state,
                  registrationId,
                  submittedAt,
                  photoSrc: state.photograph?.dataUrl,
                  signatureSrc: state.signature?.dataUrl,
                  mode: "document",
                }),
                contentType: "text/html",
              },
        ].filter(Boolean);

        await transporter.sendMail({
          from: `"ANNT NANDAS FOUNDATION" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
          replyTo: state.personal.email,
          subject: `New ${typeLabel(state.type)} Registration · ${registrationId} · ANNT NANDAS FOUNDATION`,
          html: emailHtml,
          attachments: attachments as nodemailer.SendMailOptions["attachments"],
        });
      } catch (emailError) {
        console.error("REGISTRATION EMAIL WARNING:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully.",
      registrationId,
      submittedAt,
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
