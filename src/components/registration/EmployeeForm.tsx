"use client";

import type { EmployeeDetails, FieldErrors } from "@/lib/registration/types";
import { SectionCard, TextAreaField, TextField } from "./FormField";

export default function EmployeeForm({
  value,
  errors,
  onChange,
}: {
  value: EmployeeDetails;
  errors: FieldErrors;
  onChange: (next: EmployeeDetails) => void;
}) {
  const set = <K extends keyof EmployeeDetails>(key: K, next: EmployeeDetails[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <SectionCard
      eyebrow="Join the team"
      title="Employment information"
      description="Tell us about the role you are interested in and the experience you bring."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="position"
          label="Position applied for"
          required
          value={value.position}
          error={errors.position}
          onChange={(next) => set("position", next)}
        />
        <TextField
          id="availabilityToJoin"
          label="Availability to join"
          value={value.availabilityToJoin}
          error={errors.availabilityToJoin}
          onChange={(next) => set("availabilityToJoin", next)}
        />
        <TextAreaField
          id="qualifications"
          label="Qualifications"
          required
          className="sm:col-span-2"
          value={value.qualifications}
          error={errors.qualifications}
          onChange={(next) => set("qualifications", next)}
        />
        <TextAreaField
          id="employeeExperience"
          label="Experience"
          className="sm:col-span-2"
          value={value.experience}
          error={errors.experience}
          onChange={(next) => set("experience", next)}
        />
        <TextAreaField
          id="whyJoin"
          label="Why do you want to join the foundation?"
          required
          className="sm:col-span-2"
          value={value.whyJoin}
          error={errors.whyJoin}
          onChange={(next) => set("whyJoin", next)}
        />
        <TextAreaField
          id="employeeComments"
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
