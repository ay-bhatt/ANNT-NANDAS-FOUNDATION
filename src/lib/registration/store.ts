import fs from "fs/promises";
import path from "path";
import type { RegistrationFormState, RegistrationType, SportKind } from "./types";

const DATA_ROOT = path.join(process.cwd(), "anntnandasfoundation", "data");

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

  await fs.mkdir(recordDir, { recursive: true });
  await fs.mkdir(uploadDir, { recursive: true });

  let photographPath = "";
  let signaturePath = "";

  if (state.photograph?.dataUrl) {
    const parsed = parseDataUrl(state.photograph.dataUrl);
    if (parsed) {
      const filename = `${id}-photograph.${parsed.ext}`;
      await fs.writeFile(path.join(uploadDir, filename), parsed.buffer);
      photographPath = path.posix.join("uploads", folder, filename);
    }
  }

  if (state.signature?.dataUrl) {
    const parsed = parseDataUrl(state.signature.dataUrl);
    if (parsed) {
      const filename = `${id}-signature.${parsed.ext}`;
      await fs.writeFile(path.join(uploadDir, filename), parsed.buffer);
      signaturePath = path.posix.join("uploads", folder, filename);
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

  return { folder, jsonPath, photographPath, signaturePath };
}
