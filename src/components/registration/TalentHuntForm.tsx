"use client";

import {
  PARENT_RELATIONS,
  SCHOOL_CLASS_OPTIONS,
  TALENT_CATEGORIES,
  TALENT_HUNT_AGE_LABEL,
  TALENT_HUNT_PROGRAM,
} from "@/lib/registration/constants";
import type { FieldErrors, TalentHuntDetails } from "@/lib/registration/types";
import { SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

export default function TalentHuntForm({
  value,
  errors,
  onChange,
}: {
  value: TalentHuntDetails;
  errors: FieldErrors;
  onChange: (next: TalentHuntDetails) => void;
}) {
  const set = <K extends keyof TalentHuntDetails>(key: K, next: TalentHuntDetails[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="space-y-5">
      <SectionCard
        eyebrow={TALENT_HUNT_PROGRAM.hindiName}
        title="Runner Talent Hunt details"
        description={`${TALENT_HUNT_PROGRAM.taglineEnglish}. Age group ${TALENT_HUNT_PROGRAM.posterAge}; registration is open for children ${TALENT_HUNT_AGE_LABEL}. A parent or guardian must complete the consent section.`}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id="talentCategory"
            label="Talent category"
            required
            value={value.talentCategory}
            error={errors.talentCategory}
            options={TALENT_CATEGORIES}
            onChange={(next) => set("talentCategory", next)}
          />
          {value.talentCategory === "Other" ? (
            <TextField
              id="otherTalent"
              label="Describe the talent"
              required
              value={value.otherTalent}
              error={errors.otherTalent}
              onChange={(next) => set("otherTalent", next)}
            />
          ) : null}
          <TextField
            id="schoolName"
            label="School name"
            required
            value={value.schoolName}
            error={errors.schoolName}
            onChange={(next) => set("schoolName", next)}
          />
          <SelectField
            id="classGrade"
            label="Class the student currently studies in"
            required
            value={value.classGrade}
            error={errors.classGrade}
            options={SCHOOL_CLASS_OPTIONS}
            hint="Select the class / grade the child is studying in now."
            onChange={(next) => set("classGrade", next)}
          />
          <TextAreaField
            id="previousAchievements"
            label="Previous achievements"
            value={value.previousAchievements}
            error={errors.previousAchievements}
            hint="Certificates, prizes, or performances — if any."
            onChange={(next) => set("previousAchievements", next)}
            className="sm:col-span-2"
          />
          <TextAreaField
            id="whyParticipate"
            label="Why do you want to take part?"
            required
            value={value.whyParticipate}
            error={errors.whyParticipate}
            onChange={(next) => set("whyParticipate", next)}
            className="sm:col-span-2"
          />
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Parent / consultant"
        title="Parent or guardian consent"
        description="A parent, father, mother, or guardian must provide their name, relation, and contact details."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="parentName"
            label="Name of parent / consultant"
            required
            value={value.parentName}
            error={errors.parentName}
            onChange={(next) => set("parentName", next)}
          />
          <SelectField
            id="parentRelation"
            label="Relation"
            required
            value={value.parentRelation}
            error={errors.parentRelation}
            options={PARENT_RELATIONS}
            placeholder="Mother, Father, or Guardian"
            onChange={(next) => set("parentRelation", next)}
          />
          <TextField
            id="parentPhone"
            label="Parent phone number"
            type="tel"
            required
            value={value.parentPhone}
            error={errors.parentPhone}
            inputMode="tel"
            onChange={(next) => set("parentPhone", next)}
          />
          <TextField
            id="parentEmail"
            label="Parent email"
            type="email"
            value={value.parentEmail}
            error={errors.parentEmail}
            onChange={(next) => set("parentEmail", next)}
          />
          <TextAreaField
            id="talentComments"
            label="Additional comments"
            value={value.additionalComments}
            error={errors.additionalComments}
            onChange={(next) => set("additionalComments", next)}
            className="sm:col-span-2"
          />
        </div>
      </SectionCard>
    </div>
  );
}
