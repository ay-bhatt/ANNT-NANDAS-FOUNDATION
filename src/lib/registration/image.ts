import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./constants";
import { inferImageMime, isAcceptedImageMime, MIN_IMAGE_BYTES } from "./image-bytes";
import type { UploadedImage } from "./types";

interface CompressOptions {
  maxWidth: number;
  maxHeight: number;
  quality?: number;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read this image."));
    reader.readAsDataURL(file);
  });
}

function loadHtmlImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read this image. Please try another file."));
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to process this image."));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Unable to read this image."));
    reader.readAsDataURL(blob);
  });
}

type DrawableImage = {
  width: number;
  height: number;
  draw: (context: CanvasRenderingContext2D, width: number, height: number) => void;
  close: () => void;
};

async function loadDrawable(file: File): Promise<DrawableImage> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
      if (bitmap.width >= 2 && bitmap.height >= 2) {
        return {
          width: bitmap.width,
          height: bitmap.height,
          draw: (context, width, height) => context.drawImage(bitmap, 0, 0, width, height),
          close: () => bitmap.close(),
        };
      }
      bitmap.close();
    } catch {
      // Fall through to the HTMLImageElement path used on older mobile browsers.
    }
  }

  const dataUrl = await readFileAsDataUrl(file);
  const image = await loadHtmlImage(dataUrl);
  if (typeof image.decode === "function") {
    await image.decode().catch(() => undefined);
  }
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (width < 2 || height < 2) {
    throw new Error("This image could not be read. Please try another photo.");
  }
  return {
    width,
    height,
    draw: (context, nextWidth, nextHeight) => context.drawImage(image, 0, 0, nextWidth, nextHeight),
    close: () => undefined,
  };
}

async function uploadedFromFile(file: File, mime: string): Promise<UploadedImage> {
  if (file.size < MIN_IMAGE_BYTES) {
    throw new Error("This image is empty or too small. Please upload a clearer photo.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }
  return {
    dataUrl: await readFileAsDataUrl(file),
    name: file.name || "upload.jpg",
    mime,
    size: file.size,
  };
}

export async function compressImageFile(file: File, options: CompressOptions): Promise<UploadedImage> {
  const mime = inferImageMime(file.name, file.type);
  if (!isAcceptedImageMime(mime) && !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, or WEBP image.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const source = await loadDrawable(file);
  try {
    const scale = Math.min(1, options.maxWidth / source.width, options.maxHeight / source.height);
    const width = Math.max(2, Math.round(source.width * scale));
    const height = Math.max(2, Math.round(source.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to process this image.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    source.draw(context, width, height);

    const outputType = "image/jpeg";
    const blob = await canvasToBlob(canvas, outputType, options.quality ?? 0.72);
    if (blob.size < MIN_IMAGE_BYTES) {
      return uploadedFromFile(file, mime.startsWith("image/heic") ? "image/jpeg" : mime);
    }
    const dataUrl = await blobToDataUrl(blob);
    return {
      dataUrl,
      name: file.name.replace(/\.[^.]+$/, "") + ".jpg",
      mime: outputType,
      size: blob.size,
    };
  } finally {
    source.close();
  }
}
