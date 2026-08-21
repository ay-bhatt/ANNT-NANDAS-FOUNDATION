import fs from "fs/promises";
import path from "path";
import type { RegistrationFormState, RegistrationType, SportKind } from "./types";

const DATA_ROOT = path.join(process.cwd(), "anntnandasfoundation", "data");
const PROJECT_DATA = path.join(process.cwd(), "data");

export type StorageFolder = "volunteer" | "membership" | "sports" | "running" | "cycling" | "employee" | "event";

export function storageFolder(type: RegistrationType, sport: SportKind | "" = ""): StorageFolder {
  if (type === "sports") {
    if (sport === "running") return "running";
    if (sport === "cycling") return "cycling";
    return "sports";
  }
  if (type === "volunteer" || type === "membership" || type === "employee" || type === "event") {
    return type;
  }
  return "event";
}

function parseDataUrl(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  const mime = match[1];
  const ext = mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : "jpg";
  return { buffer: Buffer.from(match[2], "base64"), ext };
}

export async function saveRegistrationRecord(options: {
  id: string;
  submittedAt: string;
  state: RegistrationFormState;
}): Promise<{ folder: StorageFolder; jsonPath: string; photographPath: string; signaturePath: string }> {
  const { id, submittedAt, state } = options;
  const type = state.type as RegistrationType;
  const folder = storageFolder(type, state.sports.sport);
  const recordDir = path.join(DATA_ROOT, "registrations", folder);
  const uploadDir = path.join(DATA_ROOT, "uploads", folder);
  const rootUploadDir = path.join(PROJECT_DATA, "uploads");

  await fs.mkdir(recordDir, { recursive: true });
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.mkdir(rootUploadDir, { recursive: true });

  let photographPath = "";
  let signaturePath = "";
  let rootPhotographPath = "";
  let rootSignaturePath = "";

  if (state.photograph?.dataUrl) {
    const parsed = parseDataUrl(state.photograph.dataUrl);
    if (parsed) {
      const filename = `${id}-photograph.${parsed.ext}`;
      await fs.writeFile(path.join(uploadDir, filename), parsed.buffer);
      await fs.writeFile(path.join(rootUploadDir, filename), parsed.buffer);
      photographPath = path.posix.join("uploads", folder, filename);
      rootPhotographPath = path.posix.join("uploads", filename);
    }
  }

  if (state.signature?.dataUrl) {
    const parsed = parseDataUrl(state.signature.dataUrl);
    if (parsed) {
      const filename = `${id}-signature.${parsed.ext}`;
      await fs.writeFile(path.join(uploadDir, filename), parsed.buffer);
      await fs.writeFile(path.join(rootUploadDir, filename), parsed.buffer);
      signaturePath = path.posix.join("uploads", folder, filename);
      rootSignaturePath = path.posix.join("uploads", filename);
    }
  }

  const record = {
    id,
    type,
    sport: type === "sports" ? state.sports.sport : undefined,
    submittedAt,
    personal: state.personal,
    volunteer: type === "volunteer" ? state.volunteer : undefined,
    membership: type === "membership" ? state.membership : undefined,
    sports: type === "sports" ? state.sports : undefined,
    employee: type === "employee" ? state.employee : undefined,
    event: type === "event" ? state.event : undefined,
    declaration: state.declaration,
    files: {
      photograph: photographPath || null,
      signature: signaturePath || null,
    },
  };

  const jsonPath = path.join(recordDir, `${id}.json`);
  await fs.writeFile(jsonPath, JSON.stringify(record, null, 2), "utf-8");

  await appendToMembersDatabase(record);
  await appendToRootRegistrations({
    ...record,
    files: {
      photograph: rootPhotographPath || null,
      signature: rootSignaturePath || null,
    },
  });

  return { folder, jsonPath, photographPath, signaturePath };
}

async function appendJsonArray(filePath: string, record: Record<string, unknown>) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  let items: Record<string, unknown>[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      items = parsed.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object");
    }
  } catch {
    items = [];
  }

  const nextIndex = items.findIndex((item) => item.id === record.id);
  if (nextIndex >= 0) {
    items[nextIndex] = record;
  } else {
    items.push(record);
  }

  await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
}

async function appendToMembersDatabase(record: Record<string, unknown>) {
  const personal = record.personal as { fullName?: string } | undefined;
  await appendJsonArray(path.join(DATA_ROOT, "members.json"), {
    ...record,
    name: personal?.fullName || "",
    joinedAs: record.type,
  });
}

async function appendToRootRegistrations(record: Record<string, unknown>) {
  const personal = (record.personal || {}) as Record<string, unknown>;
  const summary: Record<string, unknown> = {
    id: record.id,
    type: record.type,
    sport: record.sport,
    submittedAt: record.submittedAt,
    name: personal.fullName || "",
    fatherName: personal.fatherName || "",
    motherName: personal.motherName || "",
    dob: personal.dob || "",
    age: personal.age || "",
    gender: personal.gender || "",
    nationality: personal.nationality || "",
    address: personal.address || "",
    postOffice: personal.postOffice || "",
    tehsil: personal.tehsil || "",
    district: personal.district || "",
    state: personal.state || "",
    country: personal.country || "",
    pinCode: personal.pinCode || "",
    phone: personal.phone || "",
    email: personal.email || "",
    whatsapp: personal.whatsapp || "",
    bloodGroup: personal.bloodGroup || "",
    education: personal.education || "",
    occupation: personal.occupation || "",
    emergencyName: personal.emergencyName || "",
    emergencyRelation: personal.emergencyRelation || "",
    emergencyPhone: personal.emergencyPhone || "",
    volunteer: record.volunteer,
    membership: record.membership,
    sports: record.sports,
    employee: record.employee,
    event: record.event,
    declaration: record.declaration,
    files: record.files,
  };

  await appendJsonArray(path.join(PROJECT_DATA, "registrations.json"), summary);
}
