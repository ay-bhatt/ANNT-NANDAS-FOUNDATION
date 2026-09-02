import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("src/assets");
const DUMP_DIRS = [
  path.join(ROOT, "annt nandas assests"),
  path.join(ROOT, "collage image"),
];
const PUBLIC_PHOTOS = path.resolve("public/gallery/photos");
const PUBLIC_VIDEOS = path.resolve("public/gallery/videos");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".webm", ".mov"]);

const SKIP_NAME = /(screenshot|wedding|birthday|romantic|love story|fashion photo|music mix|youtube thumbnail|phone wallpaper|couple photo)/i;

const SPECIAL = [
  { match: /_raj2423/i, dest: path.join(ROOT, "hero", "HERO (5).webp"), width: 1920, theme: "sports" },
  { match: /mgu_2025-4140/i, dest: path.join(ROOT, "Kalam singh bisht", "mawla-ghaati-trophy.webp"), width: 1400, theme: "sports" },
  { match: /mgu_2025-4144/i, dest: path.join(ROOT, "Kalam singh bisht", "mawla-ghaati-finish.webp"), width: 1400, theme: "sports" },
  { match: /ssu 2025-3431/i, dest: path.join(ROOT, "events", "ultra-camp.webp"), width: 1600, theme: "sports" },
  { match: /ssu 2025-3435/i, dest: path.join(ROOT, "events", "ultra-camp-team.webp"), width: 1600, theme: "sports" },
  { match: /img20260602103506/i, dest: path.join(ROOT, "events", "ibex-bakri-team.webp"), width: 1920, theme: "events" },
  { match: /harela festival/i, dest: path.join(ROOT, "events", "harela-festival.webp"), width: 1400, theme: "events" },
  { match: /happy holi/i, dest: path.join(ROOT, "events", "holi-wishes.webp"), width: 1400, theme: "events" },
];

function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "photo";
}

function classify(name) {
  const n = name.toLowerCase();
  if (SKIP_NAME.test(n)) return "skip";
  if (/mgu_|ssu[\s_-]|ssu20|_raj|ultra|cycling|mtb|parikrama|championship/.test(n)) return "sports";
  if (/harela|holi|festival|independence|flag/.test(n)) return "events";
  if (/collage|instagram|thumbnail|document_/.test(n)) return "collage";
  return "community";
}

async function walk(dir, files = []) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function hashFile(file) {
  const buf = await fs.readFile(file);
  return { buf, hash: crypto.createHash("md5").update(buf).digest("hex") };
}

async function toWebp(buffer, dest, width) {
  await ensureDir(path.dirname(dest));
  await sharp(buffer, { failOn: "none" })
    .rotate()
    .resize({ width, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 74, effort: 4 })
    .toFile(dest);
}

const seen = new Set();
const gallery = [];
let converted = 0;
let skipped = 0;
let dupes = 0;
let videos = 0;

await ensureDir(PUBLIC_PHOTOS);
await ensureDir(PUBLIC_VIDEOS);

const existingVideos = (await fs.readdir(PUBLIC_VIDEOS).catch(() => [])).filter((n) => n.endsWith(".mp4"));
let videoIndex = existingVideos.length;

for (const dump of DUMP_DIRS) {
  const files = await walk(dump);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file);

    if (VIDEO_EXT.has(ext)) {
      videoIndex += 1;
      const dest = path.join(PUBLIC_VIDEOS, `${String(videoIndex).padStart(2, "0")}.mp4`);
      await fs.copyFile(file, dest);
      gallery.push({
        label: "Foundation field video",
        type: "video",
        videoSrc: `/gallery/videos/${path.basename(dest)}`,
        theme: "Events",
      });
      videos += 1;
      continue;
    }

    if (!IMAGE_EXT.has(ext)) {
      skipped += 1;
      continue;
    }

    const theme = classify(base);
    if (theme === "skip") {
      skipped += 1;
      continue;
    }

    const { buf, hash } = await hashFile(file);
    if (seen.has(hash)) {
      dupes += 1;
      continue;
    }
    seen.add(hash);

    const special = SPECIAL.find((item) => item.match.test(base));
    if (special) {
      await toWebp(buf, special.dest, special.width);
      converted += 1;
      console.log("special", path.relative(process.cwd(), special.dest));
    }

    const folder = path.join(PUBLIC_PHOTOS, theme);
    await ensureDir(folder);
    let destName = `${slugify(base)}.webp`;
    let dest = path.join(folder, destName);
    let n = 2;
    while (true) {
      try {
        await fs.access(dest);
        destName = `${slugify(base)}-${n}.webp`;
        dest = path.join(folder, destName);
        n += 1;
      } catch {
        break;
      }
    }

    await toWebp(buf, dest, theme === "collage" ? 1400 : 1600);
    converted += 1;
    gallery.push({
      label: slugify(base).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      type: "photo",
      imageSrc: `/gallery/photos/${theme}/${destName}`,
      theme: theme === "sports" ? "Sports" : theme === "events" ? "Events" : theme === "collage" ? "Community" : "Community",
    });
  }
}

const caumasPng = path.join(ROOT, "Caumas Logo white bg.png");
try {
  await fs.unlink(caumasPng);
  console.log("removed duplicate", path.relative(process.cwd(), caumasPng));
} catch {
  // already gone
}

const manifestPath = path.resolve("src/lib/generated-gallery.ts");
const photoItems = gallery.filter((item) => item.type === "photo").slice(0, 48);
const videoItems = gallery.filter((item) => item.type === "video");
const selected = [...photoItems, ...videoItems];
const source = `export const generatedGalleryItems = ${JSON.stringify(selected, null, 2)} as const;\n`;
await fs.writeFile(manifestPath, source, "utf8");

for (const dump of DUMP_DIRS) {
  await fs.rm(dump, { recursive: true, force: true });
  console.log("removed dump", path.relative(process.cwd(), dump));
}

console.log(
  JSON.stringify(
    { converted, skipped, dupes, videos, gallery: selected.length, manifest: path.relative(process.cwd(), manifestPath) },
    null,
    2,
  ),
);
