"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import {
  REGISTRATION_FEE_AMOUNT,
  REGISTRATION_FEE_PAYEE,
  REGISTRATION_FEE_PAYEE_NOTE,
} from "@/lib/registration/constants";
import { formatRupees, googlePayUri, upiPaymentUri, UPI_ID } from "@/lib/donation";
import type { UploadedImage } from "@/lib/registration/types";
import ImageUpload from "./ImageUpload";

export default function PaymentFeeForm({
  value,
  error,
  onChange,
}: {
  value: UploadedImage | null;
  error?: string;
  onChange: (value: UploadedImage | null) => void;
}) {
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const uri = useMemo(
    () => upiPaymentUri(REGISTRATION_FEE_AMOUNT, REGISTRATION_FEE_PAYEE, UPI_ID),
    [],
  );
  const canOpenUpiApp = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const platform = navigator.platform || "";
    if (/Win|MacIntel|Linux x86|Linux amd64|Linux x86_64/i.test(platform)) return false;
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
  }, []);
  const isAndroid = canOpenUpiApp && /Android/i.test(navigator.userAgent || "");

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(uri, { margin: 1, width: 280, color: { dark: "#0f172a", light: "#ffffff" } })
      .then((url) => {
        if (active) setQr(url);
      })
      .catch(() => {
        if (active) setQr("");
      });
    return () => {
      active = false;
    };
  }, [uri]);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const payNow = () => {
    setStatus("If a payment app does not open, scan the QR or copy the UPI ID below.");
    if (!canOpenUpiApp) return;
    try {
      if (isAndroid) {
        window.location.assign(googlePayUri(REGISTRATION_FEE_AMOUNT, REGISTRATION_FEE_PAYEE, UPI_ID));
        return;
      }
      window.location.assign(uri);
    } catch {
      setStatus("Scan the QR or copy the UPI ID to complete payment.");
    }
  };

  return (
    <aside className="overflow-hidden rounded-[28px] border border-emerald-200/80 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-5 sm:px-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-50">Registration fee</p>
        <h2 className="mt-1 text-2xl font-bold tracking-[-0.03em] text-white">Pay {formatRupees(REGISTRATION_FEE_AMOUNT)}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50">
          This fee is paid separately to {REGISTRATION_FEE_PAYEE} ({REGISTRATION_FEE_PAYEE_NOTE}). Scan the QR, pay{" "}
          {formatRupees(REGISTRATION_FEE_AMOUNT)}, then upload the payment screenshot. The screenshot is saved and emailed
          with your application — it is not printed on the form.
        </p>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,220px)_1fr]">
        <div className="mx-auto w-full max-w-[200px]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt={`UPI QR code for ${formatRupees(REGISTRATION_FEE_AMOUNT)}`} className="h-full w-full" />
            ) : (
              <div className="flex aspect-square items-center justify-center text-xs text-slate-500">Preparing QR</div>
            )}
          </div>
          <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
            {formatRupees(REGISTRATION_FEE_AMOUNT)} · UPI
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Pay to</p>
          <p className="mt-1 text-lg font-bold text-slate-950">{REGISTRATION_FEE_PAYEE}</p>
          <p className="text-sm text-slate-600">{REGISTRATION_FEE_PAYEE_NOTE}</p>
          <p className="mt-3 break-all text-sm font-semibold text-slate-950">{UPI_ID}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Amount is fixed at {formatRupees(REGISTRATION_FEE_AMOUNT)}. Confirm the payee name before paying.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={payNow} className="btn-primary !min-h-11 !px-4 text-sm">
              Pay {formatRupees(REGISTRATION_FEE_AMOUNT)}
            </button>
            <button type="button" onClick={() => void copyUpi()} className="btn-outline-dark !min-h-11 !px-4 text-sm">
              {copied ? "UPI ID copied" : "Copy UPI ID"}
            </button>
          </div>
          {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}

          <div className="mt-6">
            <ImageUpload
              id="paymentProof"
              label="Payment screenshot"
              hint="Upload a clear screenshot of the ₹100 payment. JPG, PNG or WEBP. Max 5 MB."
              value={value}
              error={error}
              variant="document"
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
