"use client";

import {
  CONTRIBUTION_OPTIONS,
  INTEREST_AREAS,
  MEMBERSHIP_FEE_AMOUNT,
  MEMBERSHIP_TYPES,
  MEMBERSHIP_VALIDITY_LABEL,
} from "@/lib/registration/constants";
import { formatRupees } from "@/lib/donation";
import type { FieldErrors, MembershipDetails } from "@/lib/registration/types";
import { ChipSelect, SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

export default function MembershipForm({
  value,
  errors,
  onChange,
}: {
  value: MembershipDetails;
  errors: FieldErrors;
  onChange: (next: MembershipDetails) => void;
}) {
  const set = <K extends keyof MembershipDetails>(key: K, next: MembershipDetails[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <SectionCard
      eyebrow="Stay connected"
      title="Membership information"
      description="Membership helps the foundation keep you informed about programmes, events, and ways to contribute."
    >
      <div className="mb-5 rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4 sm:px-5">
        <p className="text-sm font-bold text-slate-950">Membership Fee: {formatRupees(MEMBERSHIP_FEE_AMOUNT)}</p>
        <p className="mt-1 text-sm font-semibold text-emerald-800">Validity: {MEMBERSHIP_VALIDITY_LABEL}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This is a yearly membership. After successful payment it stays active for 1 year from the activation date, then
          expires unless a new ₹{MEMBERSHIP_FEE_AMOUNT} payment is made.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="membershipType"
          label="Membership type"
          required
          className="sm:col-span-2"
          value={value.membershipType}
          error={errors.membershipType}
          options={MEMBERSHIP_TYPES}
          onChange={(next) => set("membershipType", next)}
        />
        <div className="sm:col-span-2">
          <ChipSelect
            label="Areas of interest"
            required
            options={INTEREST_AREAS}
            value={value.areasOfInterest}
            error={errors.areasOfInterest}
            onChange={(next) => set("areasOfInterest", next)}
          />
        </div>
        <SelectField
          id="contribution"
          label="How would you like to contribute?"
          required
          value={value.contribution}
          error={errors.contribution}
          options={CONTRIBUTION_OPTIONS}
          onChange={(next) => set("contribution", next)}
        />
        <TextField
          id="howHeard"
          label="How did you hear about us?"
          value={value.howHeard}
          error={errors.howHeard}
          onChange={(next) => set("howHeard", next)}
        />
        <TextAreaField
          id="membershipComments"
          label="Additional comments"
          className="sm:col-span-2"
          value={value.additionalComments}
          error={errors.additionalComments}
          onChange={(next) => set("additionalComments", next)}
        />
      </div>
    </SectionCard>
  );
}
