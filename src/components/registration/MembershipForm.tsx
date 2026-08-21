"use client";

import { CONTRIBUTION_OPTIONS, INTEREST_AREAS, MEMBERSHIP_TYPES } from "@/lib/registration/constants";
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
