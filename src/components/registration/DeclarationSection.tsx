"use client";

import { DECLARATION_ACCEPTANCE_LABEL, DECLARATION_CLAUSES, DECLARATION_INTRO, DECLARATION_TITLE } from "@/lib/registration/declaration";
import { buildDeclarationHtml } from "@/lib/registration/printable";
import type { DeclarationDetails, FieldErrors, UploadedImage } from "@/lib/registration/types";
import { SectionCard, TextField } from "./FormField";

function downloadDeclaration() {
  const html = buildDeclarationHtml();
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "ANNT-NANDAS-FOUNDATION-declaration.html";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function printDeclaration() {
  const html = buildDeclarationHtml();
  const popup = window.open("", "_blank", "noopener,noreferrer,width=900,height=800");
  if (!popup) {
    downloadDeclaration();
    return;
  }
  popup.document.open();
  popup.document.write(html);
  popup.document.close();
  popup.focus();
  window.setTimeout(() => popup.print(), 350);
}

export default function DeclarationSection({
  value,
  errors,
  signature,
  onChange,
}: {
  value: DeclarationDetails;
  errors: FieldErrors;
  signature: UploadedImage | null;
  onChange: (next: DeclarationDetails) => void;
}) {
  return (
    <SectionCard
      eyebrow="Required"
      title={DECLARATION_TITLE}
      description={DECLARATION_INTRO}
    >
      <div className="mb-5 flex flex-wrap gap-2">
        <button type="button" onClick={downloadDeclaration} className="btn-outline-dark !min-h-11 !px-4">
          Download Declaration
        </button>
        <button type="button" onClick={printDeclaration} className="btn-outline-dark !min-h-11 !px-4">
          Print Declaration
        </button>
      </div>

      <div className="max-h-[360px] space-y-3 overflow-y-auto rounded-[24px] border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        {DECLARATION_CLAUSES.map((clause, index) => (
          <article key={clause.title} className="rounded-2xl border border-white bg-white p-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-950">
              {index + 1}. {clause.title}
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">{clause.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
        <label className="flex gap-3 text-sm leading-7 text-slate-700">
          <input
            type="checkbox"
            checked={value.accepted}
            onChange={(event) => onChange({ ...value, accepted: event.target.checked })}
            className="mt-1 h-5 w-5 shrink-0 rounded-md border-slate-300 text-emerald-600"
          />
          <span>
            {DECLARATION_ACCEPTANCE_LABEL} <span className="text-rose-500">*</span>
          </span>
        </label>
        {errors.accepted ? <p className="mt-2 text-xs font-medium text-rose-600">{errors.accepted}</p> : null}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <TextField
          id="declarationPlace"
          label="Place"
          required
          autoComplete="address-level2"
          value={value.place}
          error={errors.place}
          onChange={(next) => onChange({ ...value, place: next })}
        />
        <TextField
          id="declarationDate"
          label="Date"
          type="date"
          required
          value={value.date}
          error={errors.date}
          onChange={(next) => onChange({ ...value, date: next })}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-800">Applicant signature</p>
        {signature ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={signature.dataUrl} alt="Uploaded signature" className="mt-3 h-20 w-auto max-w-full object-contain" />
        ) : (
          <p className="mt-2 text-sm text-rose-600">Please go back to Documents and upload your signature.</p>
        )}
      </div>
    </SectionCard>
  );
}
