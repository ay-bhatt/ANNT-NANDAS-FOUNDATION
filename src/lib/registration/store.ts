import fs from "fs/promises";
import path from "path";
import { REGISTRATION_FEE_PAYEE, registrationFeeFor, registrationRequiresPayment } from "./constants";
import { parseImageDataUrl } from "./image-bytes";
import { attachMembershipValidity, withLiveMembershipStatus } from "./membership";
import type { RegistrationFormState, RegistrationType, SportKind, UploadedImage } from "./types";

export const DATA_ROOT = path.join(process.cwd(), "anntnandasfoundation", "data");
export const PROJECT_DATA = path.join(process.cwd(), "data");

export type StorageFolder =
  | "volunteer"
  | "membership"
  | "sports"
  | "running"
  | "cycling"
  | "employee"
  | "event"
  | "talent-hunt";

export type UploadKind = "photograph" | "signature" | "aadhaar" | "payment";

export const UPLOAD_KIND_FOLDERS: Record<UploadKind, string> = {
  photograph: "photographs",
  signature: "signatures",
  aadhaar: "aadhaar",
  payment: "payments",
};

export function storageFolder(type: RegistrationType, sport: SportKind | "" = ""): StorageFolder {
  if (type === "sports") {
    if (sport === "running") return "running";
    if (sport === "cycling") return "cycling";
    return "sports";
  }
  if (
    type === "volunteer" ||
    type === "membership" ||
    type === "employee" ||
    type === "event" ||
    type === "talent-hunt"
  ) {
    return type;
  }
  return "event";
}

export function safePersonSlug(name: string): string {
  const cleaned = String(name || "")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  return cleaned || "applicant";
}

export function buildUploadFileName(id: string, fullName: string, kind: UploadKind, ext: string): string {
  return `${id}_${safePersonSlug(fullName)}_${kind}.${ext}`;
}

export function uploadRelativePath(kind: UploadKind, typeFolder: StorageFolder, filename: string): string {
  return path.posix.join("uploads", UPLOAD_KIND_FOLDERS[kind], typeFolder, filename);
}

export function storageFolderFromType(type: string, sport = ""): StorageFolder {
  return storageFolder((type as RegistrationType) || "event", sport as SportKind | "");
}

async function writeUploadFile(relativePath: string, buffer: Buffer) {
  const destinations = [path.join(DATA_ROOT, relativePath), path.join(PROJECT_DATA, relativePath)];
  for (const destination of destinations) {
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, buffer);
  }
}

async function saveKindFile(options: {
  kind: UploadKind;
  id: string;
  fullName: string;
  typeFolder: StorageFolder;
  image: UploadedImage | null;
  invalidCode: string;
}): Promise<string> {
  const { kind, id, fullName, typeFolder, image, invalidCode } = options;
  if (!image?.dataUrl) return "";
  const parsed = parseImageDataUrl(image.dataUrl);
  if (!parsed) throw new Error(invalidCode);
  const filename = buildUploadFileName(id, fullName, kind, parsed.ext);
  const relativePath = uploadRelativePath(kind, typeFolder, filename);
  await writeUploadFile(relativePath, parsed.buffer);
  return relativePath;
}

export async function saveRegistrationRecord(options: {
  id: string;
  submittedAt: string;
  state: RegistrationFormState;
}): Promise<{
  folder: StorageFolder;
  jsonPath: string;
  photographPath: string;
  signaturePath: string;
  aadhaarPath: string;
  paymentProofPath: string;
}> {
  const { id, submittedAt, state } = options;
  const type = state.type as RegistrationType;
  const folder = storageFolder(type, state.sports.sport);
  const recordDir = path.join(DATA_ROOT, "registrations", folder);
  const fullName = state.personal.fullName;

  await fs.mkdir(recordDir, { recursive: true });

  const photographPath = await saveKindFile({
    kind: "photograph",
    id,
    fullName,
    typeFolder: folder,
    image: state.photograph,
    invalidCode: "INVALID_PHOTOGRAPH",
  });
  const aadhaarPath = await saveKindFile({
    kind: "aadhaar",
    id,
    fullName,
    typeFolder: folder,
    image: state.aadhaar,
    invalidCode: "INVALID_AADHAAR",
  });
  const signaturePath = await saveKindFile({
    kind: "signature",
    id,
    fullName,
    typeFolder: folder,
    image: state.signature,
    invalidCode: "INVALID_SIGNATURE",
  });
  const paymentProofPath = registrationRequiresPayment(type)
    ? await saveKindFile({
        kind: "payment",
        id,
        fullName,
        typeFolder: folder,
        image: state.paymentProof,
        invalidCode: "INVALID_PAYMENT_PROOF",
      })
    : "";

  const feeAmount = registrationFeeFor(type);
  const record = {
    id,
    type,
    sport: type === "sports" ? state.sports.sport : undefined,
    submittedAt,
    personal: state.personal,
    volunteer: type === "volunteer" ? state.volunteer : undefined,
    membership: type === "membership" ? attachMembershipValidity(state.membership, submittedAt) : undefined,
    sports: type === "sports" ? state.sports : undefined,
    employee: type === "employee" ? state.employee : undefined,
    event: type === "event" ? state.event : undefined,
    talentHunt: type === "talent-hunt" ? state.talentHunt : undefined,
    declaration: state.declaration,
    payment: {
      amount: feeAmount,
      currency: "INR",
      payee: registrationRequiresPayment(type) ? REGISTRATION_FEE_PAYEE : "",
      required: registrationRequiresPayment(type),
      status: registrationRequiresPayment(type) ? "paid" : "not_required",
    },
    files: {
      photograph: photographPath || null,
      signature: signaturePath || null,
      aadhaar: aadhaarPath || null,
      paymentProof: paymentProofPath || null,
    },
  };

  const jsonPath = path.join(recordDir, `${id}.json`);
  await fs.writeFile(jsonPath, JSON.stringify(record, null, 2), "utf-8");

  await appendToMembersDatabase(record);
  await appendToRootRegistrations({
    ...record,
    files: record.files,
  });

  return { folder, jsonPath, photographPath, signaturePath, aadhaarPath, paymentProofPath };
}

export async function listRegistrationRecords(): Promise<Record<string, unknown>[]> {
  const sources = [path.join(DATA_ROOT, "members.json"), path.join(PROJECT_DATA, "registrations.json")];
  const byId = new Map<string, Record<string, unknown>>();

  for (const filePath of sources) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(raw) as unknown;
      if (!Array.isArray(parsed)) continue;
      for (const item of parsed) {
        if (!item || typeof item !== "object") continue;
        const record = item as Record<string, unknown>;
        const id = String(record.id || "");
        if (!id) continue;
        const existing = byId.get(id) || {};
        byId.set(id, { ...existing, ...record });
      }
    } catch {
      // missing file is fine
    }
  }

  return [...byId.values()]
    .map((record) => withLiveMembershipStatus(record))
    .sort((a, b) => String(b.submittedAt || "").localeCompare(String(a.submittedAt || "")));
}

export async function resolveUploadFile(relativePath: string): Promise<{ absolutePath: string; mime: string } | null> {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!normalized.startsWith("uploads/") || normalized.includes("..")) return null;

  const candidates = [path.join(DATA_ROOT, normalized), path.join(PROJECT_DATA, normalized)];
  for (const candidate of candidates) {
    const resolvedCandidate = path.resolve(candidate);
    const root = resolvedCandidate.startsWith(path.resolve(DATA_ROOT)) ? path.resolve(DATA_ROOT) : path.resolve(PROJECT_DATA);
    if (resolvedCandidate !== root && !resolvedCandidate.startsWith(root + path.sep)) continue;
    try {
      const stat = await fs.stat(candidate);
      if (!stat.isFile()) continue;
      const ext = path.extname(candidate).toLowerCase();
      const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
      return { absolutePath: candidate, mime };
    } catch {
      // try next
    }
  }
  return null;
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
    talentHunt: record.talentHunt,
    payment: record.payment,
    declaration: record.declaration,
    files: record.files,
  };

  await appendJsonArray(path.join(PROJECT_DATA, "registrations.json"), summary);
}
