import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const DATA_ROOT = path.join(ROOT, "anntnandasfoundation", "data");
const PROJECT_DATA = path.join(ROOT, "data");

const KIND_FOLDERS = {
  photograph: "photographs",
  signature: "signatures",
  aadhaar: "aadhaar",
  payment: "payments",
};

function safePersonSlug(name) {
  const cleaned = String(name || "")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  return cleaned || "applicant";
}

function typeFolder(type, sport = "") {
  if (type === "sports") {
    if (sport === "running") return "running";
    if (sport === "cycling") return "cycling";
    return "sports";
  }
  if (["volunteer", "membership", "employee", "event", "talent-hunt"].includes(type)) return type;
  return "event";
}

function kindFromName(name) {
  if (name.includes("photograph")) return "photograph";
  if (name.includes("signature")) return "signature";
  if (name.includes("aadhaar")) return "aadhaar";
  if (name.includes("payment")) return "payment";
  return "";
}

async function readJsonArray(filePath) {
  try {
    const parsed = JSON.parse(await fs.readFile(filePath, "utf-8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function exists(filePath) {
  try {
    await fs.stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findExisting(id, kind, type) {
  const extCandidates = ["jpg", "jpeg", "png", "webp"];
  const names = extCandidates.flatMap((ext) => [
    path.join(PROJECT_DATA, "uploads", `${id}-${kind}.${ext}`),
    path.join(DATA_ROOT, "uploads", type, `${id}-${kind}.${ext}`),
    path.join(PROJECT_DATA, "uploads", type, `${id}-${kind}.${ext}`),
  ]);
  for (const candidate of names) {
    if (await exists(candidate)) return candidate;
  }
  return "";
}

async function copyNamed(source, destination) {
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.copyFile(source, destination);
}

async function main() {
  const members = await readJsonArray(path.join(DATA_ROOT, "members.json"));
  const registrations = await readJsonArray(path.join(PROJECT_DATA, "registrations.json"));
  const byId = new Map();
  for (const record of [...members, ...registrations]) {
    if (record?.id) byId.set(record.id, { ...(byId.get(record.id) || {}), ...record });
  }

  for (const record of byId.values()) {
    const id = record.id;
    const name = record.name || record.personal?.fullName || "applicant";
    const type = typeFolder(record.type, record.sport || record.sports?.sport || "");
    const files = record.files || {};
    const nextFiles = { ...files };

    for (const kind of Object.keys(KIND_FOLDERS)) {
      const source =
        (files[kind === "payment" ? "paymentProof" : kind]
          ? [
              path.join(DATA_ROOT, files[kind === "payment" ? "paymentProof" : kind]),
              path.join(PROJECT_DATA, files[kind === "payment" ? "paymentProof" : kind]),
            ]
          : []
        ).find(Boolean) || (await findExisting(id, kind, type));

      let found = "";
      const guesses = [];
      if (files[kind === "payment" ? "paymentProof" : kind]) {
        const rel = files[kind === "payment" ? "paymentProof" : kind];
        guesses.push(path.join(DATA_ROOT, rel), path.join(PROJECT_DATA, rel));
      }
      guesses.push(await findExisting(id, kind, type));
      for (const guess of guesses) {
        if (guess && (await exists(guess))) {
          found = guess;
          break;
        }
      }
      if (!found) continue;

      const ext = path.extname(found).replace(".", "") || "jpg";
      const filename = `${id}_${safePersonSlug(name)}_${kind}.${ext}`;
      const relative = path.posix.join("uploads", KIND_FOLDERS[kind], type, filename);
      await copyNamed(found, path.join(DATA_ROOT, relative));
      await copyNamed(found, path.join(PROJECT_DATA, relative));
      if (kind === "payment") nextFiles.paymentProof = relative;
      else nextFiles[kind] = relative;
    }

    record.files = nextFiles;
    byId.set(id, record);
  }

  const updated = [...byId.values()];
  const updateList = (list) =>
    list.map((item) => {
      const next = byId.get(item.id);
      return next ? { ...item, files: next.files } : item;
    });

  if (members.length) {
    await fs.writeFile(path.join(DATA_ROOT, "members.json"), JSON.stringify(updateList(members), null, 2));
  }
  if (registrations.length) {
    await fs.writeFile(path.join(PROJECT_DATA, "registrations.json"), JSON.stringify(updateList(registrations), null, 2));
  }

  const registrationsDir = path.join(DATA_ROOT, "registrations");
  let typeDirs = [];
  try {
    typeDirs = await fs.readdir(registrationsDir);
  } catch {
    typeDirs = [];
  }
  for (const type of typeDirs) {
    const dir = path.join(registrationsDir, type);
    let files = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const file of files.filter((name) => name.endsWith(".json"))) {
      const filePath = path.join(dir, file);
      const record = JSON.parse(await fs.readFile(filePath, "utf-8"));
      const next = byId.get(record.id);
      if (next?.files) {
        record.files = next.files;
        await fs.writeFile(filePath, JSON.stringify(record, null, 2));
      }
    }
  }

  console.log(`Reorganized uploads for ${updated.length} registration records.`);
}

await main();
