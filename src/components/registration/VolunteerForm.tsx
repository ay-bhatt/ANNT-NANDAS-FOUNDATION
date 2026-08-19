"use client";

import { DURATION_OPTIONS, VOLUNTEER_ROLES } from "@/lib/registration/constants";
import type { FieldErrors, VolunteerDetails } from "@/lib/registration/types";
import { ChipSelect, SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

export default function VolunteerForm({
  value,
  errors,
  onChange,
}: {
  value: VolunteerDetails;
  errors: FieldErrors;
  onChange: (next: VolunteerDetails) => void;
}) {
  const set = <K extends keyof VolunteerDetails>(key: K, next: VolunteerDetails[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-950">
        Please tell us what you can contribute. The foundation will match your skills to an activity and share the
        assigned location and schedule.
      </div>

      <SectionCard
        eyebrow="What you can contribute"
        title="Volunteer details"
        description="Share your skills freely. You are not limited to a single predefined volunteer type."
      >
        <div className="grid gap-5">
          <TextField
            id="volunteerName"
            label="Volunteer Name"
            required
            value={value.volunteerName}
            error={errors.volunteerName}
            hint="Usually the same as your full name."
            onChange={(next) => set("volunteerName", next)}
          />
          <TextAreaField
            id="skills"
            label="Skills / Expertise"
            required
            value={value.skills}
            error={errors.skills}
            hint="Describe what you can contribute — teaching, repair work, coaching, technology, healthcare, farming, art, or anything else."
            onChange={(next) => set("skills", next)}
          />
          <ChipSelect
            label="Volunteer Category / Role"
            required
            options={[...VOLUNTEER_ROLES]}
            value={value.roles}
            error={errors.roles}
            onChange={(next) => set("roles", next)}
          />
          {value.roles.includes("Other") ? (
            <TextField
              id="otherRole"
              label="Your own skill / role"
              required
              value={value.otherRole}
              error={errors.otherRole}
              onChange={(next) => set("otherRole", next)}
            />
          ) : null}
          <TextField
            id="subjects"
            label="Subjects you can teach"
            required={value.roles.includes("Teacher")}
            value={value.subjects}
            error={errors.subjects}
            hint="Required if you selected Teacher. Optional for other roles."
            onChange={(next) => set("subjects", next)}
          />
          <TextAreaField
            id="experience"
            label="Experience"
            value={value.experience}
            error={errors.experience}
            onChange={(next) => set("experience", next)}
          />
          <TextAreaField
            id="motivation"
            label="Why do you want to volunteer?"
            required
            value={value.motivation}
            error={errors.motivation}
            onChange={(next) => set("motivation", next)}
          />
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="Participation"
        title="Duration & location"
        description="Share how long you can participate and where you would prefer to be based. Timing is assigned by the foundation."
      >
        <div className="mb-5 grid gap-4">
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Food & Stay Provided</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Food and accommodation/stay will be provided to volunteers by the foundation according to the volunteering
              activity and location.
            </p>
          </div>
          <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Volunteer Timing</p>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              Volunteering timings will be assigned/provided by the foundation according to the activity, location, and
              operational requirements.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            id="preferredLocation"
            label="Preferred location / place"
            required
            value={value.preferredLocation}
            error={errors.preferredLocation}
            onChange={(next) => set("preferredLocation", next)}
          />
          <SelectField
            id="duration"
            label="Preferred duration / period"
            required
            value={value.duration}
            error={errors.duration}
            options={DURATION_OPTIONS}
            onChange={(next) => set("duration", next)}
          />
          {value.duration === "Specific duration" ? (
            <TextField
              id="customDuration"
              label="Specific duration"
              required
              className="sm:col-span-2"
              value={value.customDuration}
              error={errors.customDuration}
              onChange={(next) => set("customDuration", next)}
            />
          ) : null}
          <TextAreaField
            id="otherSupport"
            label="Additional requirements / comments"
            className="sm:col-span-2"
            value={value.otherSupport}
            error={errors.otherSupport}
            onChange={(next) => set("otherSupport", next)}
          />
          <TextAreaField
            id="additionalComments"
            label="Anything else we should know"
            className="sm:col-span-2"
            value={value.additionalComments}
            error={errors.additionalComments}
            onChange={(next) => set("additionalComments", next)}
          />
        </div>
      </SectionCard>
    </div>
  );
}
