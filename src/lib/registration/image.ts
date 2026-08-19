import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./constants";
import type { UploadedImage } from "./types";

interface CompressOptions {
  maxWidth: number;
  maxHeight: number;
  quality?: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
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

export async function compressImageFile(file: File, options: CompressOptions): Promise<UploadedImage> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, or WEBP image.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  const originalUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(originalUrl);
    const scale = Math.min(1, options.maxWidth / image.width, options.maxHeight / image.height);
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to process this image.");
    context.drawImage(image, 0, 0, width, height);

    const outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
    const blob = await canvasToBlob(canvas, outputType, options.quality ?? 0.82);
    const dataUrl = await blobToDataUrl(blob);

    return {
      dataUrl,
      name: file.name,
      mime: outputType,
      size: blob.size,
    };
  } finally {
    URL.revokeObjectURL(originalUrl);
  }
}


