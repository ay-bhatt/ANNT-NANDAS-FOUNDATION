import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("src/assets");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const SKIP_NAMES = new Set(["qr.png", "qr.svg"]);

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else if (IMAGE_EXT.has(path.extname(entry.name).toLowerCase())) files.push(full);
  }
  return files;
}

function maxWidthFor(file) {
  const rel = file.toLowerCase();
  if (rel.includes(`${path.sep}logo`) || path.basename(rel).startsWith("logo")) return 640;
  if (rel.includes(`${path.sep}hero`) || rel.includes("mob-hero")) return 1920;
  return 1600;
}

async function optimize(file) {
  const name = path.basename(file).toLowerCase();
  if (SKIP_NAMES.has(name) || name.startsWith("qr")) return { file, skipped: true, reason: "qr" };

  const input = await fs.readFile(file);
  const original = input.length;
  if (original < 180_000) return { file, skipped: true, reason: "small" };

  const image = sharp(input, { failOn: "none" }).rotate();
  const meta = await image.metadata();
  const width = maxWidthFor(file);
  const ext = path.extname(file).toLowerCase();
  const isPng = ext === ".png";

  let pipeline = image.resize({
    width,
    withoutEnlargement: true,
    fit: "inside",
  });

  if (isPng && meta.hasAlpha) {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 80 });
  } else {
    pipeline = pipeline.jpeg({ quality: 72, mozjpeg: true, progressive: true, chromaSubsampling: "4:2:0" });
  }

  const output = await pipeline.toBuffer();
  if (output.length >= original * 0.92) {
    return { file, skipped: true, reason: "no-gain", original, next: output.length };
  }

  const target = isPng && !meta.hasAlpha ? file.replace(/\.png$/i, ".jpeg") : file;
  await fs.writeFile(target, output);
  if (target !== file) await fs.unlink(file);
  return { file: target, original, next: output.length };
}

const files = await walk(ROOT);
let saved = 0;
let processed = 0;
for (const file of files) {
  try {
    const result = await optimize(file);
    if (result.skipped) continue;
    processed += 1;
    saved += result.original - result.next;
    const from = Math.round(result.original / 1024);
    const to = Math.round(result.next / 1024);
    console.log(`${from}KB -> ${to}KB  ${path.relative(process.cwd(), result.file)}`);
  } catch (error) {
    console.error("FAIL", file, error instanceof Error ? error.message : error);
  }
}
console.log(`optimized ${processed} files, saved ${(saved / 1024 / 1024).toFixed(1)} MB`);
