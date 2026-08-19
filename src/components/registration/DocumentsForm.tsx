"use client";

import type { FieldErrors, UploadedImage } from "@/lib/registration/types";
import { SectionCard } from "./FormField";
import ImageUpload, { SignatureUpload } from "./ImageUpload";

export default function DocumentsForm({
  photograph,
  signature,
  errors,
  onPhotographChange,
  onSignatureChange,
}: {
  photograph: UploadedImage | null;
  signature: UploadedImage | null;
  errors: FieldErrors;
  onPhotographChange: (value: UploadedImage | null) => void;
  onSignatureChange: (value: UploadedImage | null) => void;
}) {
  return (
    <SectionCard
      eyebrow="Official record"
      title="Photograph & signature"
      description="Upload a clear recent photograph and your signature. Both are included in the printable registration record sent to the foundation."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ImageUpload
          id="photograph"
          label="Photograph"
          hint="JPG, PNG or WEBP. Max 5 MB. A clear face photo works best."
          value={photograph}
          error={errors.photograph}
          onChange={onPhotographChange}
        />
        <SignatureUpload
          id="signature"
          label="Signature"
          hint="Upload a photo or scan of your signature on a plain background."
          value={signature}
          error={errors.signature}
          onChange={onSignatureChange}
        />
      </div>
    </SectionCard>
  );
}
