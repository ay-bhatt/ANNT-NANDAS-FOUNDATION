"use client";

import {
  BLOOD_GROUPS,
  EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  OCCUPATION_OPTIONS,
} from "@/lib/registration/constants";
import type { FieldErrors, PersonalInformation } from "@/lib/registration/types";
import { SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

export default function PersonalInformationForm({
  value,
  errors,
  onChange,
}: {
  value: PersonalInformation;
  errors: FieldErrors;
  onChange: (next: PersonalInformation) => void;
}) {
  const set = <K extends keyof PersonalInformation>(key: K, next: PersonalInformation[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <SectionCard
      eyebrow="Shared details"
      title="Personal information"
      description="These details appear on your official registration record. Please enter them exactly as they should be printed."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="fullName" label="Full Name" required value={value.fullName} error={errors.fullName} autoComplete="name" onChange={(next) => set("fullName", next)} />
        <TextField id="fatherName" label="Father’s Name" required value={value.fatherName} error={errors.fatherName} onChange={(next) => set("fatherName", next)} />
        <TextField id="motherName" label="Mother’s Name" required value={value.motherName} error={errors.motherName} onChange={(next) => set("motherName", next)} />
        <TextField
          id="dob"
          label="Date of Birth"
          type="date"
          required
          value={value.dob}
          error={errors.dob}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(next) => set("dob", next)}
        />
        <TextField
          id="age"
          label="Age"
          type="number"
          required
          value={value.age}
          error={errors.age}
          hint="Calculated automatically from the date of birth."
          min="8"
          max="90"
          readOnly={Boolean(value.dob)}
          onChange={(next) => set("age", next)}
        />
        <SelectField id="gender" label="Gender" required value={value.gender} error={errors.gender} options={GENDER_OPTIONS} onChange={(next) => set("gender", next)} />
        <TextField id="nationality" label="Nationality" required value={value.nationality} error={errors.nationality} onChange={(next) => set("nationality", next)} />
        <SelectField id="bloodGroup" label="Blood Group" required value={value.bloodGroup} error={errors.bloodGroup} options={BLOOD_GROUPS} onChange={(next) => set("bloodGroup", next)} />
        <SelectField id="education" label="Education" required value={value.education} error={errors.education} options={EDUCATION_OPTIONS} onChange={(next) => set("education", next)} />
        <TextField
          id="specialEducation"
          label="Special Education / Qualification"
          value={value.specialEducation}
          error={errors.specialEducation}
          hint="Certifications, vocational training, or specialised study."
          onChange={(next) => set("specialEducation", next)}
        />
        <SelectField id="occupation" label="Occupation" value={value.occupation} error={errors.occupation} options={OCCUPATION_OPTIONS} onChange={(next) => set("occupation", next)} />
        <TextField id="phone" label="Phone Number" type="tel" required value={value.phone} error={errors.phone} autoComplete="tel" inputMode="tel" onChange={(next) => set("phone", next)} />
        <TextField id="email" label="Email" type="email" required value={value.email} error={errors.email} autoComplete="email" onChange={(next) => set("email", next)} />
        <TextField id="whatsapp" label="WhatsApp Number" type="tel" value={value.whatsapp} error={errors.whatsapp} inputMode="tel" onChange={(next) => set("whatsapp", next)} />
        <TextAreaField
          id="address"
          label="Address"
          required
          value={value.address}
          error={errors.address}
          className="sm:col-span-2"
          rows={4}
          onChange={(next) => set("address", next)}
        />
      </div>
    </SectionCard>
  );
}
