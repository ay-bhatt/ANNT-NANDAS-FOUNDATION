"use client";

import type { FieldErrors, UploadedImage } from "@/lib/registration/types";
import { formatAadhaarNumber } from "@/lib/registration/validation";
import { SectionCard, TextField } from "./FormField";
import ImageUpload, { SignatureUpload } from "./ImageUpload";

export default function DocumentsForm({
  photograph,
  signature,
  aadhaar,
  aadhaarNumber,
  errors,
  onPhotographChange,
  onSignatureChange,
  onAadhaarChange,
  onAadhaarNumberChange,
  variant = "standard",
}: {
  photograph: UploadedImage | null;
  signature: UploadedImage | null;
  aadhaar?: UploadedImage | null;
  aadhaarNumber?: string;
  errors: FieldErrors;
  onPhotographChange: (value: UploadedImage | null) => void;
  onSignatureChange: (value: UploadedImage | null) => void;
  onAadhaarChange?: (value: UploadedImage | null) => void;
  onAadhaarNumberChange?: (value: string) => void;
  variant?: "standard" | "talent-hunt";
}) {
  const talentHunt = variant === "talent-hunt";

  return (
    <SectionCard
      eyebrow="Official record"
      title={talentHunt ? "Photograph, Aadhaar & parent signature" : "Photograph & signature"}
      description={
        talentHunt
          ? "Upload the child’s photograph and Aadhaar card, then add the parent or consultant signature by uploading a photo or signing digitally. Only the Aadhaar number is printed on the form — the Aadhaar photo is stored privately."
          : "Upload a clear recent photograph and add your signature. You can upload a photo of your signature or sign digitally on this page. Both are included in the printable registration record sent to the foundation."
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ImageUpload
          id="photograph"
          label={talentHunt ? "Child photograph" : "Photograph"}
          hint="JPG, PNG or WEBP. Max 5 MB. A clear face photo works best."
          value={photograph}
          error={errors.photograph}
          onChange={onPhotographChange}
        />
        {talentHunt && onAadhaarChange ? (
          <div className="space-y-5">
            <TextField
              id="aadhaarNumber"
              label="Aadhaar number"
              required
              value={aadhaarNumber || ""}
              error={errors.aadhaarNumber}
              inputMode="numeric"
              maxLength={14}
              placeholder="XXXX XXXX XXXX"
              hint="This number is shown on the form. The Aadhaar photo is not."
              onChange={(next) => onAadhaarNumberChange?.(formatAadhaarNumber(next))}
            />
            <ImageUpload
              id="aadhaar"
              label="Aadhaar card upload"
              hint="Upload a clear photo of the child’s Aadhaar card. It is saved on the backend and emailed to the foundation, but it is not shown on the form."
              value={aadhaar ?? null}
              error={errors.aadhaar}
              variant="document"
              showPreview={false}
              uploadedLabel="Aadhaar card uploaded"
              onChange={onAadhaarChange}
            />
          </div>
        ) : null}
      </div>
      <div className="mt-6">
        <SignatureUpload
          id="signature"
          label={talentHunt ? "Parent / consultant signature" : "Signature"}
          hint={
            talentHunt
              ? "Upload a photo of the signature on a white page, or tap Digital signature to draw it here."
              : "Upload a photo or scan of your signature, or tap Digital signature to draw it with your finger or mouse."
          }
          value={signature}
          error={errors.signature}
          onChange={onSignatureChange}
        />
      </div>
    </SectionCard>
  );
}
