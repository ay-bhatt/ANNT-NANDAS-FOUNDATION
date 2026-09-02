export const MIN_IMAGE_BYTES = 512;

export function inferImageMime(fileName: string, mime = ""): string {
  const normalized = mime.toLowerCase().trim();
  if (normalized === "image/jpg") return "image/jpeg";
  if (
    normalized === "image/jpeg" ||
    normalized === "image/png" ||
    normalized === "image/webp" ||
    normalized === "image/heic" ||
    normalized === "image/heif"
  ) {
    return normalized;
  }
  const name = fileName.toLowerCase();
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".heic") || name.endsWith(".heif")) return "image/heic";
  return "image/jpeg";
}

export function extensionForMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  return "jpg";
}

export function isAcceptedImageMime(mime: string): boolean {
  return ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"].includes(mime);
}

export function isPlausibleImageBuffer(buffer: Uint8Array): boolean {
  if (buffer.length < MIN_IMAGE_BYTES) return false;
  const jpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  const png = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  const riff = buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;
  const webp = riff && buffer.length > 11 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;
  return jpeg || png || webp;
}

export function parseImageDataUrl(dataUrl: string): { mime: string; buffer: Buffer; ext: string } | null {
  const match = /^data:([^;]+);base64,(.+)$/i.exec(dataUrl.trim());
  if (!match) return null;
  const mime = inferImageMime("upload", match[1]);
  let buffer: Buffer;
  try {
    buffer = Buffer.from(match[2], "base64");
  } catch {
    return null;
  }
  if (!isPlausibleImageBuffer(buffer)) return null;
  return { mime, buffer, ext: extensionForMime(mime) };
}
