"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { DONATION_AMOUNTS, formatRupees, googlePayUri, upiPaymentUri } from "@/lib/donation";

interface DonationWidgetProps {
  upiId: string;
  payeeName: string;
  amounts?: number[];
  variant?: "light" | "dark";
}

export default function DonationWidget({
  upiId,
  payeeName,
  amounts = [...DONATION_AMOUNTS],
  variant = "light",
}: DonationWidgetProps) {
  const [amount, setAmount] = useState(amounts[0] ?? 500);
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  const uri = useMemo(() => upiPaymentUri(amount, payeeName, upiId), [amount, payeeName, upiId]);
  const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent);
  const dark = variant === "dark";

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
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const donate = () => {
    setStatus("If a payment app does not open, scan the QR or copy the UPI ID below.");
    if (!isMobile) return;
    if (isAndroid) {
      window.location.href = googlePayUri(amount, payeeName, upiId);
      window.setTimeout(() => {
        window.location.href = uri;
      }, 900);
      return;
    }
    window.location.href = uri;
  };

  return (
    <div className={dark ? "text-white" : "text-slate-950"}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${dark ? "text-emerald-200" : "text-emerald-700"}`}>
        Select amount
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {amounts.map((value) => {
          const selected = value === amount;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setAmount(value);
                setStatus("");
              }}
              className={`min-h-16 rounded-[22px] border px-3 py-4 text-left transition ${
                selected
                  ? "border-emerald-400 bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)]"
                  : dark
                    ? "border-white/15 bg-white/10 text-white hover:border-white/30"
                    : "border-slate-200 bg-white text-slate-900 hover:border-blue-200"
              }`}
            >
              <span className="block text-xl font-bold tracking-[-0.03em]">{formatRupees(value)}</span>
              <span className={`mt-1 block text-[11px] ${selected ? "text-emerald-50" : dark ? "text-blue-100" : "text-slate-500"}`}>
                {selected ? "Selected" : "Tap to choose"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={donate} className="btn-primary min-h-12 flex-1 sm:flex-none">
          Donate Now {formatRupees(amount)} <span aria-hidden="true">→</span>
        </button>
        {isMobile ? (
          <p className={`text-xs leading-5 ${dark ? "text-blue-100" : "text-slate-500"}`}>
            Opens Google Pay or another UPI app when available.
          </p>
        ) : (
          <p className={`text-xs leading-5 ${dark ? "text-blue-100" : "text-slate-500"}`}>
            On a phone, Donate Now opens UPI. On desktop, scan the QR.
          </p>
        )}
      </div>

      {status ? <p className={`mt-3 text-sm ${dark ? "text-emerald-100" : "text-slate-600"}`}>{status}</p> : null}

      <div className={`mt-6 grid gap-4 rounded-[24px] p-4 sm:grid-cols-[160px_1fr] ${dark ? "bg-white/10" : "bg-slate-50"}`}>
        <div className="mx-auto w-[148px] overflow-hidden rounded-2xl bg-white p-2">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt={`UPI QR code for ${formatRupees(amount)}`} className="h-full w-full" />
          ) : (
            <div className="flex aspect-square items-center justify-center text-xs text-slate-500">Preparing QR</div>
          )}
        </div>
        <div>
          <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-emerald-200" : "text-emerald-700"}`}>
            UPI ID
          </p>
          <p className={`mt-1 break-all text-sm font-bold ${dark ? "text-white" : "text-slate-950"}`}>{upiId}</p>
          <p className={`mt-2 text-sm ${dark ? "text-blue-100" : "text-slate-600"}`}>
            Payee: {payeeName} · Amount: {formatRupees(amount)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void copyUpi()}
              className={dark ? "btn-secondary !min-h-10 !px-4 text-xs" : "btn-outline-dark !min-h-10 !px-4 text-xs"}
            >
              {copied ? "UPI ID copied" : "Copy UPI ID"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
