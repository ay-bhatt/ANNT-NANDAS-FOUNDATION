"use client";

import type { EventDetails, FieldErrors } from "@/lib/registration/types";
import { SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

const PARTICIPATION_MODES = ["Participant", "Volunteer support", "Guest / visitor", "Partner organisation"];

export default function EventForm({
  value,
  errors,
  onChange,
}: {
  value: EventDetails;
  errors: FieldErrors;
  onChange: (next: EventDetails) => void;
}) {
  const set = <K extends keyof EventDetails>(key: K, next: EventDetails[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <SectionCard
      eyebrow="Join an activity"
      title="Event registration"
      description="Register for workshops, outreach camps, and community events organised by the foundation."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="eventInterest"
          label="Event / activity of interest"
          required
          className="sm:col-span-2"
          value={value.eventInterest}
          error={errors.eventInterest}
          onChange={(next) => set("eventInterest", next)}
        />
        <SelectField
          id="participationMode"
          label="How would you like to participate?"
          required
          value={value.participationMode}
          error={errors.participationMode}
          options={PARTICIPATION_MODES}
          onChange={(next) => set("participationMode", next)}
        />
        <TextAreaField
          id="eventComments"
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
