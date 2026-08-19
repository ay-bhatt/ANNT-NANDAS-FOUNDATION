"use client";

import { useRef, useState } from "react";
import { compressImageFile } from "@/lib/registration/image";
import { validateImage } from "@/lib/registration/validation";
import type { UploadedImage } from "@/lib/registration/types";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  id: string;
  label: string;
  hint: string;
  value: UploadedImage | null;
  onChange: (value: UploadedImage | null) => void;
  error?: string;
  variant?: "photo" | "signature";
}

export default function ImageUpload({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  variant = "photo",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const validation = validateImage(file);
    if (validation) {
      setLocalError(validation);
      return;
    }
    setBusy(true);
    setLocalError("");
    try {
      const compressed = await compressImageFile(file, {
        maxWidth: variant === "photo" ? 900 : 1200,
        maxHeight: variant === "photo" ? 1100 : 480,
        quality: 0.82,
      });
      onChange(compressed);
    } catch (caught) {
      setLocalError(caught instanceof Error ? caught.message : "Unable to process this image.");
    } finally {
      setBusy(false);
    }
  };

  const message = error || localError;

  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-800">
        <span>{label}</span>
        <span className="text-rose-500">*</span>
      </p>
      <div
        className={cn(
          "overflow-hidden rounded-[24px] border border-dashed bg-slate-50/80",
          message ? "border-rose-300" : "border-slate-300",
        )}
      >
        {value ? (
          <div className="p-4">
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl border border-slate-200 bg-white",
                variant === "photo" ? "aspect-[4/5] max-w-[220px]" : "aspect-[3/1] max-w-md",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value.dataUrl} alt={`${label} preview`} className="h-full w-full object-contain" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="btn-outline-dark !min-h-11 !px-4"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
                className="btn-premium !min-h-11 border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 px-5 py-8 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              {variant === "photo" ? "📷" : "✍️"}
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {busy ? "Preparing preview…" : `Tap to upload ${label.toLowerCase()}`}
            </span>
            <span className="max-w-xs text-xs leading-5 text-slate-500">{hint}</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
        }}
      />
      {message ? <p className="mt-1.5 text-xs font-medium text-rose-600">{message}</p> : null}
    </div>
  );
}

export function SignatureUpload(props: Omit<ImageUploadProps, "variant">) {
  return <ImageUpload {...props} variant="signature" />;
}
