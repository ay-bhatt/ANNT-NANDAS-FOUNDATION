"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MEMBERSHIP_VALIDITY_LABEL, REGISTRATION_TYPE_META, registrationFeeFor, registrationRequiresPayment } from "@/lib/registration/constants";
import { formatRupees } from "@/lib/donation";
import { formatMembershipDate, membershipPeriodFrom, membershipStatusAt, membershipStatusLabel } from "@/lib/registration/membership";
import { buildPrintableHtml } from "@/lib/registration/printable";
import type { RegistrationFormState, RegistrationType } from "@/lib/registration/types";

function openPrintable(state: RegistrationFormState, registrationId: string, submittedAt: string) {
  const html = buildPrintableHtml({
    state,
    registrationId,
    submittedAt,
    photoSrc: state.photograph?.dataUrl,
    signatureSrc: state.signature?.dataUrl,
    mode: "document",
  });
  const popup = window.open("", "_blank", "noopener,noreferrer,width=980,height=860");
  if (!popup) {
    downloadPrintable(state, registrationId, submittedAt);
    return;
  }
  popup.document.open();
  popup.document.write(html);
  popup.document.close();
  popup.focus();
  window.setTimeout(() => popup.print(), 400);
}

function downloadPrintable(state: RegistrationFormState, registrationId: string, submittedAt: string) {
  const html = buildPrintableHtml({
    state,
    registrationId,
    submittedAt,
    photoSrc: state.photograph?.dataUrl,
    signatureSrc: state.signature?.dataUrl,
    mode: "document",
  });
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${registrationId}.html`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function RegistrationSuccess({
  type,
  registrationId,
  submittedAt,
  state,
  emailSent,
  applicantEmailSent,
  pdfAttached,
}: {
  type: RegistrationType;
  registrationId: string;
  submittedAt: string;
  state: RegistrationFormState;
  emailSent?: boolean;
  applicantEmailSent?: boolean;
  pdfAttached?: boolean;
}) {
  const meta = REGISTRATION_TYPE_META[type];
  const feeAmount = registrationFeeFor(type);
  const paid = registrationRequiresPayment(type);
  const membership = type === "membership" ? membershipPeriodFrom(submittedAt) : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white p-6 text-center shadow-[0_24px_70px_rgba(2,6,23,0.25)] sm:p-10"
    >
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 text-3xl text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)]">
        ✓
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Application received</p>
      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">Registration submitted successfully</h1>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
        Thank you. Your {meta.shortLabel.toLowerCase()} application has been received. The foundation will review it and
        contact you if needed. Please keep your reference number for future correspondence.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
        {applicantEmailSent
          ? `A ${pdfAttached === false ? "copy" : "PDF copy"} of this form has been sent to ${state.personal.email}.`
          : emailSent
            ? "The foundation has received this registration by email, including the form PDF."
            : "If you need a copy immediately, use Download / Print Application below."}
      </p>

      <div className="mx-auto mt-7 grid max-w-lg gap-3 sm:grid-cols-2">
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Reference number</p>
          <p className="mt-1 text-lg font-bold text-blue-800">{registrationId}</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Registration type</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{meta.shortLabel}</p>
        </div>
        <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4 sm:col-span-2">
          {type === "membership" && membership ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Membership Fee</p>
              <p className="mt-1 text-lg font-bold text-slate-950">{formatRupees(membership.feeAmount)}</p>
              <p className="mt-2 text-sm font-semibold text-emerald-800">Validity: {MEMBERSHIP_VALIDITY_LABEL}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Membership Start Date: {formatMembershipDate(membership.startDate)}
                <br />
                Membership Expiry Date: {formatMembershipDate(membership.expiryDate)}
                <br />
                Status: {membershipStatusLabel(membershipStatusAt(membership.expiryDate))}
              </p>
            </>
          ) : paid ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Registration fee</p>
              <p className="mt-1 text-lg font-bold text-slate-950">{formatRupees(feeAmount)}</p>
            </>
          ) : (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Registration fee</p>
              <p className="mt-1 text-lg font-bold text-emerald-800">Free</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" onClick={() => openPrintable(state, registrationId, submittedAt)} className="btn-primary w-full sm:w-auto">
          Download / Print Application
        </button>
        <Link href="/" className="btn-outline-dark w-full sm:w-auto">
          Return Home
        </Link>
        <Link href="/register" className="text-sm font-semibold text-slate-600 underline-offset-4 hover:underline">
          Submit another registration
        </Link>
      </div>
    </motion.section>
  );
}
