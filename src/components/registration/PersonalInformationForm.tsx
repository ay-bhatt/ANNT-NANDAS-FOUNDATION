"use client";

import {
  BLOOD_GROUPS,
  EDUCATION_OPTIONS,
  EMERGENCY_RELATIONS,
  GENDER_OPTIONS,
  INDIAN_STATES,
  OCCUPATION_OPTIONS,
} from "@/lib/registration/constants";
import type { FieldErrors, PersonalInformation } from "@/lib/registration/types";
import { DateOfBirthField, SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

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
    <div className="space-y-5">
      <SectionCard
        eyebrow="Shared details"
        title="Personal information"
        description="These details appear on your official registration record. Please enter them exactly as they should be printed."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="fullName" label="Full Name" required value={value.fullName} error={errors.fullName} autoComplete="name" onChange={(next) => set("fullName", next)} />
          <TextField id="fatherName" label="Father’s Name" required value={value.fatherName} error={errors.fatherName} onChange={(next) => set("fatherName", next)} />
          <TextField id="motherName" label="Mother’s Name" required value={value.motherName} error={errors.motherName} onChange={(next) => set("motherName", next)} />
          <DateOfBirthField
            id="dob"
            label="Date of Birth"
            required
            value={value.dob}
            error={errors.dob}
            hint="Date / Month / Year (DD/MM/YYYY)"
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
            rows={3}
            hint="House / street / village or locality."
            onChange={(next) => set("address", next)}
          />
          <TextField
            id="postOffice"
            label="Post Office"
            required
            value={value.postOffice}
            error={errors.postOffice}
            autoComplete="address-line2"
            onChange={(next) => set("postOffice", next)}
          />
          <TextField
            id="tehsil"
            label="Tehsil"
            required
            value={value.tehsil}
            error={errors.tehsil}
            onChange={(next) => set("tehsil", next)}
          />
          <TextField
            id="district"
            label="District"
            required
            value={value.district}
            error={errors.district}
            autoComplete="address-level2"
            onChange={(next) => set("district", next)}
          />
          <SelectField
            id="state"
            label="State"
            required
            value={value.state}
            error={errors.state}
            options={INDIAN_STATES}
            onChange={(next) => set("state", next)}
          />
          <TextField
            id="country"
            label="Country"
            required
            value={value.country}
            error={errors.country}
            autoComplete="country-name"
            onChange={(next) => set("country", next)}
          />
          <TextField
            id="pinCode"
            label="PIN Code"
            required
            value={value.pinCode}
            error={errors.pinCode}
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit PIN"
            autoComplete="postal-code"
            onChange={(next) => set("pinCode", next.replace(/[^\d]/g, "").slice(0, 6))}
          />
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="In case of need"
        title="Emergency contact"
        description="Share a person we can reach if there is an emergency during any activity, stay, or travel."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="emergencyName"
            label="Emergency Contact Person’s Name"
            required
            className="sm:col-span-2"
            value={value.emergencyName}
            error={errors.emergencyName}
            autoComplete="off"
            onChange={(next) => set("emergencyName", next)}
          />
          <SelectField
            id="emergencyRelation"
            label="Relation with the Person"
            required
            value={value.emergencyRelation}
            error={errors.emergencyRelation}
            options={EMERGENCY_RELATIONS}
            onChange={(next) => set("emergencyRelation", next)}
          />
          <TextField
            id="emergencyPhone"
            label="Emergency Contact Number"
            type="tel"
            required
            value={value.emergencyPhone}
            error={errors.emergencyPhone}
            inputMode="tel"
            autoComplete="tel"
            onChange={(next) => set("emergencyPhone", next)}
          />
        </div>
      </SectionCard>
    </div>
  );
}
