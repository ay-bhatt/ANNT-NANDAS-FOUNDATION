import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("src/assets");

const KEEP = [
  "hero/HERO.jpeg",
  "hero/HERO (1).jpeg",
  "hero/HERO (2).jpeg",
  "hero/HERO (3).jpeg",
  "hero/HERO (4).jpeg",
  "hero MOB/mob-hero (2).jpeg",
  "Kalam singh bisht/event-011.jpg.jpeg",
  "Kalam singh bisht/collage (4).jpeg",
  "Kalam singh bisht/collage (5).jpeg",
  "education/gallery-032.jpg.jpeg",
  "education/gallery-066.jpg.jpeg",
  "education/gallery-067.jpg.jpeg",
  "women empowerment/gallery-029.jpg.jpeg",
  "women empowerment/gallery-031.jpg.jpeg",
  "women empowerment/image.jpeg",
  "healthcare/event (4).jpeg",
  "environment/gallery-049.jpg.jpeg",
  "events/event (1).jpeg",
  "events/event (4).jpeg",
  "events/event (10).jpeg",
  "events/event (14).jpeg",
  "events/event (16).jpeg",
  "events/event-010.jpg.jpeg",
  "news/news.jpeg",
  "news/news (1).jpeg",
  "news/news (2).jpeg",
  "news/news (3).jpeg",
  "news/news (4).jpeg",
  "news/news (5).jpeg",
  "news/news (6).jpeg",
  "gallery/gallery (1).jpeg",
  "gallery/gallery (2).jpeg",
  "gallery/gallery (3).jpeg",
  "gallery/gallery (4).jpeg",
  "gallery/gallery-015.jpg.jpeg",
  "gallery/gallery-020.jpg.jpeg",
  "gallery/gallery-021.jpg.jpeg",
  "gallery/gallery-024.jpg.jpeg",
  "gallery/gallery-031.jpg.jpeg",
  "gallery/gallery-034.jpg.jpeg",
  "gallery/gallery-041.jpg.jpeg",
  "gallery/gallery-054.jpg.jpeg",
  "gallery/gallery-060.jpg.jpeg",
  "gallery/gallery-065.jpg.jpeg",
  "collage/collage (1).jpeg",
  "collage/collage (6).jpeg",
  "collage/collage (10).jpeg",
  "collage/gallery (1).jpeg",
  "collage/gallery (2).jpeg",
  "logo.jpeg",
];

function maxWidthFor(rel) {
  if (rel.includes("logo")) return 512;
  if (rel.startsWith("hero")) return 1920;
  return 1400;
}

async function walk(dir, files = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

const keepAbs = new Set(KEEP.map((rel) => path.join(ROOT, rel)));
const keepWebp = new Set();

for (const rel of KEEP) {
  const input = path.join(ROOT, rel);
  const output = input.replace(/\.(jpe?g|png)$/i, ".webp");
  const image = sharp(input, { failOn: "none" }).rotate().resize({
    width: maxWidthFor(rel),
    withoutEnlargement: true,
    fit: "inside",
  });
  await image.webp({ quality: 74, effort: 5 }).toFile(output);
  const from = (await fs.stat(input)).size;
  const to = (await fs.stat(output)).size;
  console.log(`${Math.round(from / 1024)}KB -> ${Math.round(to / 1024)}KB  ${rel.replace(/\.(jpe?g|png)$/i, ".webp")}`);
  keepWebp.add(output);
}

// Always keep the scannable QR as PNG.
keepAbs.add(path.join(ROOT, "qr.png"));

const all = await walk(ROOT);
let removed = 0;
for (const file of all) {
  if (keepWebp.has(file) || file.endsWith(`${path.sep}qr.png`)) continue;
  await fs.unlink(file);
  removed += 1;
}

console.log(`removed ${removed} unused or superseded image files`);
