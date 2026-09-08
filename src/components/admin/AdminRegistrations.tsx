"use client";

import { useEffect, useMemo, useState } from "react";

type RegistrationRecord = {
  id: string;
  type?: string;
  name?: string;
  submittedAt?: string;
  phone?: string;
  email?: string;
  personal?: { fullName?: string; phone?: string; email?: string };
  talentHunt?: { aadhaarNumber?: string; classGrade?: string; schoolName?: string };
  payment?: { amount?: number; required?: boolean; status?: string };
  membership?: {
    membershipType?: string;
    feeAmount?: number;
    validityLabel?: string;
    startDate?: string;
    expiryDate?: string;
    status?: string;
  };
  files?: {
    photograph?: string | null;
    signature?: string | null;
    aadhaar?: string | null;
    paymentProof?: string | null;
  };
};

function formatAdminDate(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });
}

function fileUrl(relativePath?: string | null) {
  if (!relativePath) return "";
  return `/api/admin/files?path=${encodeURIComponent(relativePath)}`;
}

export default function AdminRegistrations() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [records, setRecords] = useState<RegistrationRecord[]>([]);
  const [openId, setOpenId] = useState("");

  const load = async () => {
    setError("");
    const response = await fetch("/api/admin/registrations", { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = (await response.json()) as { success?: boolean; records?: RegistrationRecord[]; message?: string };
    if (!response.ok || !data.success) {
      setError(data.message || "Unable to load registrations.");
      setLoading(false);
      return;
    }
    setRecords(data.records || []);
    setAuthed(true);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const signIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json()) as { success?: boolean; message?: string };
    if (!response.ok || !data.success) {
      setError(data.message || "Incorrect password.");
      setLoading(false);
      return;
    }
    setPassword("");
    await load();
  };

  const grouped = useMemo(() => {
    const map = new Map<string, RegistrationRecord[]>();
    for (const record of records) {
      const key = record.type || "other";
      const list = map.get(key) || [];
      list.push(record);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [records]);

  if (!authed) {
    return (
      <div className="container-premium px-4 py-16">
        <div className="mx-auto max-w-md rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.08)]">
          <p className="section-label">Admin</p>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950">Registration records</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Sign in to view photographs, signatures, Aadhaar cards, and payment screenshots.
          </p>
          <form onSubmit={(event) => void signIn(event)} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-slate-800">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-950"
                autoComplete="current-password"
                required
              />
            </label>
            {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Checking…" : "Open records"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container-premium px-4 py-10 sm:py-14">
      <p className="section-label">Admin</p>
      <h1 className="display-title text-3xl sm:text-5xl">Registration records</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
        Photographs, signatures, Aadhaar cards, and payment screenshots are stored in separate folders and can be opened
        here. Files on the server are also named with the applicant.
      </p>
      <p className="mt-2 text-sm font-medium text-slate-500">{records.length} records</p>

      {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}

      <div className="mt-8 space-y-8">
        {grouped.map(([type, items]) => (
          <section key={type}>
            <h2 className="text-xl font-bold capitalize text-slate-950">{type.replace("-", " ")}</h2>
            <div className="mt-4 grid gap-4">
              {items.map((record) => {
                const open = openId === record.id;
                const name = record.name || record.personal?.fullName || "Unnamed";
                const files = record.files || {};
                return (
                  <article key={record.id} className="rounded-[24px] border border-slate-200 bg-white p-4 sm:p-5">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 text-left"
                      onClick={() => setOpenId(open ? "" : record.id)}
                    >
                      <div>
                        <p className="font-bold text-slate-950">{name}</p>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {record.id} · {record.submittedAt ? new Date(record.submittedAt).toLocaleString("en-IN") : ""}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {record.phone || record.personal?.phone || ""} {record.email || record.personal?.email || ""}
                        </p>
                        {record.type === "membership" && record.membership ? (
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            Membership Fee: ₹{record.membership.feeAmount ?? record.payment?.amount ?? 500}
                            {" · "}
                            Validity: {record.membership.validityLabel || "1 Year"}
                            {" · "}
                            Status: {record.membership.status === "expired" ? "Expired" : "Active"}
                            <br />
                            Start: {formatAdminDate(record.membership.startDate)}
                            {" · "}
                            Expiry: {formatAdminDate(record.membership.expiryDate)}
                          </p>
                        ) : record.payment ? (
                          <p className="mt-2 text-sm text-slate-700">
                            {record.payment.required === false || record.payment.amount === 0
                              ? "Fee: Free"
                              : `Fee: ₹${record.payment.amount}`}
                          </p>
                        ) : null}
                      </div>
                      <span className="text-sm font-semibold text-blue-700">{open ? "Hide files" : "View files"}</span>
                    </button>
                    {open ? (
                      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {(
                          [
                            ["Photograph", files.photograph],
                            ["Signature", files.signature],
                            ["Aadhaar", files.aadhaar],
                            ["Payment", files.paymentProof],
                          ] as const
                        ).map(([label, path]) => (
                          <div key={label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                              {label}
                            </p>
                            {path ? (
                              <>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={fileUrl(path)} alt={`${name} ${label}`} className="h-48 w-full object-contain bg-white" />
                                <a
                                  href={fileUrl(path)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="block px-3 py-2 text-xs font-semibold text-blue-700"
                                >
                                  Open / download
                                </a>
                              </>
                            ) : (
                              <p className="px-3 pb-3 text-sm text-slate-500">Not uploaded</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
