"use client";

import type { RegistrationType, SportKind } from "@/lib/registration/types";
import { REGISTRATION_TYPE_META } from "@/lib/registration/constants";
import RegistrationWizard from "./RegistrationWizard";

export default function RegistrationExperience({
  initialType = "",
  initialSport = "",
  heading,
  description,
}: {
  initialType?: RegistrationType | "";
  initialSport?: SportKind | "";
  heading?: string;
  description?: string;
}) {
  const meta = initialType ? REGISTRATION_TYPE_META[initialType] : null;

  return (
    <div className="relative overflow-hidden bg-slate-50 pb-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(219,234,254,0.55)_0%,rgba(236,253,245,0.35)_48%,transparent_100%)]" />
      <div className="container-premium relative z-10 px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="section-label">Get Involved</p>
          <h1 className="display-title text-3xl sm:text-5xl">{heading || meta?.label || "Join the foundation"}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {description ||
              meta?.description ||
              "Choose how you would like to take part — as a volunteer, member, sports participant, event guest, or team applicant."}
          </p>
        </div>
        <RegistrationWizard initialType={initialType} initialSport={initialSport} />
      </div>
    </div>
  );
}
