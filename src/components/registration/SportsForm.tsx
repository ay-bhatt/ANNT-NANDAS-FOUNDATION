"use client";

import { EXPERIENCE_LEVELS, SPORT_OPTIONS, TSHIRT_SIZES, sportCategories } from "@/lib/registration/constants";
import type { FieldErrors, SportKind, SportsDetails } from "@/lib/registration/types";
import { SectionCard, SelectField, TextAreaField, TextField } from "./FormField";

export default function SportsForm({
  value,
  errors,
  onChange,
}: {
  value: SportsDetails;
  errors: FieldErrors;
  onChange: (next: SportsDetails) => void;
}) {
  const set = <K extends keyof SportsDetails>(key: K, next: SportsDetails[K]) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <SectionCard
      eyebrow="Play with purpose"
      title="Sports registration"
      description="Register for running, cycling, or other sports activities supported by ANNT NANDAS FOUNDATION."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-semibold text-slate-800">
            Sport <span className="text-rose-500">*</span>
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {SPORT_OPTIONS.map((sport) => {
              const active = value.sport === sport.id;
              return (
                <button
                  key={sport.id}
                  type="button"
                  onClick={() =>
                    set("sport", sport.id as SportKind)
                  }
                  className={`rounded-2xl border px-4 py-4 text-left transition ${
                    active
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:border-blue-300"
                  }`}
                >
                  <p className="font-semibold">{sport.label}</p>
                  <p className={`mt-1 text-xs leading-5 ${active ? "text-slate-300" : "text-slate-500"}`}>{sport.description}</p>
                </button>
              );
            })}
          </div>
          {errors.sport ? <p className="mt-1.5 text-xs font-medium text-rose-600">{errors.sport}</p> : null}
        </div>

        {value.sport === "other" ? (
          <TextField
            id="otherSport"
            label="Other sport"
            required
            value={value.otherSport}
            error={errors.otherSport}
            className="sm:col-span-2"
            onChange={(next) => set("otherSport", next)}
          />
        ) : null}

        <SelectField
          id="sportsCategory"
          label="Sports category"
          required
          value={value.category}
          error={errors.category}
          options={sportCategories(value.sport)}
          onChange={(next) => set("category", next)}
        />
        <SelectField
          id="experienceLevel"
          label="Experience level"
          required
          value={value.experienceLevel}
          error={errors.experienceLevel}
          options={EXPERIENCE_LEVELS}
          onChange={(next) => set("experienceLevel", next)}
        />
        <TextAreaField
          id="previousParticipation"
          label="Previous participation"
          className="sm:col-span-2"
          value={value.previousParticipation}
          error={errors.previousParticipation}
          hint="Share races, rides, or community sports you have taken part in."
          onChange={(next) => set("previousParticipation", next)}
        />
        <TextField
          id="sportsEmergencyName"
          label="Emergency contact name"
          required
          value={value.emergencyName}
          error={errors.emergencyName}
          onChange={(next) => set("emergencyName", next)}
        />
        <TextField
          id="sportsEmergencyPhone"
          label="Emergency contact number"
          type="tel"
          required
          inputMode="tel"
          value={value.emergencyPhone}
          error={errors.emergencyPhone}
          onChange={(next) => set("emergencyPhone", next)}
        />
        <TextAreaField
          id="medicalInfo"
          label="Medical / basic information"
          className="sm:col-span-2"
          value={value.medicalInfo}
          error={errors.medicalInfo}
          hint="Share any condition, allergy, or medication the organisers should know."
          onChange={(next) => set("medicalInfo", next)}
        />
        <SelectField
          id="tshirtSize"
          label="T-shirt size"
          value={value.tshirtSize}
          error={errors.tshirtSize}
          options={TSHIRT_SIZES}
          onChange={(next) => set("tshirtSize", next)}
        />
        <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          <label className="flex gap-3 text-sm leading-6 text-slate-700">
            <input
              type="checkbox"
              checked={value.medicallyFit}
              onChange={(event) => set("medicallyFit", event.target.checked)}
              className="mt-1 h-5 w-5 rounded-md border-slate-300 text-emerald-600"
            />
            <span>
              I confirm that I am medically fit to participate and will follow all event safety instructions.{" "}
              <span className="text-rose-500">*</span>
            </span>
          </label>
          {errors.medicallyFit ? <p className="mt-2 text-xs font-medium text-rose-600">{errors.medicallyFit}</p> : null}
        </div>
        <TextAreaField
          id="sportsComments"
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
