"use client";

import { buildPrintableHtml } from "@/lib/registration/printable";
import type { RegistrationFormState } from "@/lib/registration/types";

export default function PrintableRegistration({
  state,
  registrationId,
  submittedAt,
}: {
  state: RegistrationFormState;
  registrationId: string;
  submittedAt: string;
}) {
  const html = buildPrintableHtml({
    state,
    registrationId,
    submittedAt,
    photoSrc: state.photograph?.dataUrl,
    signatureSrc: state.signature?.dataUrl,
    mode: "document",
  });

  return (
    <iframe
      title="Printable registration"
      className="hidden print:block h-0 w-0"
      srcDoc={html}
    />
  );
}
