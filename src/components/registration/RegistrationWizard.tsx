"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { REGISTRATION_TYPE_META } from "@/lib/registration/constants";
import { createEmptyForm, toPayload } from "@/lib/registration/form-state";
import { ageFromDob, validateStep } from "@/lib/registration/validation";
import type {
  FieldErrors,
  RegistrationFormState,
  RegistrationSuccessResult,
  RegistrationType,
  SportKind,
  WizardStep,
} from "@/lib/registration/types";
import DeclarationSection from "./DeclarationSection";
import DocumentsForm from "./DocumentsForm";
import EmployeeForm from "./EmployeeForm";
import EventForm from "./EventForm";
import FormProgress from "./FormProgress";
import MembershipForm from "./MembershipForm";
import PersonalInformationForm from "./PersonalInformationForm";
import RegistrationSuccess from "./RegistrationSuccess";
import RegistrationTypeSelector from "./RegistrationTypeSelector";
import SportsForm from "./SportsForm";
import VolunteerForm from "./VolunteerForm";

const FLOW: WizardStep[] = ["type", "personal", "details", "documents", "declaration"];

function nextStep(step: WizardStep): WizardStep {
  return FLOW[Math.min(FLOW.indexOf(step) + 1, FLOW.length - 1)];
}

function prevStep(step: WizardStep): WizardStep {
  return FLOW[Math.max(FLOW.indexOf(step) - 1, 0)];
}

export default function RegistrationWizard({
  initialType = "",
  initialSport = "",
}: {
  initialType?: RegistrationType | "";
  initialSport?: SportKind | "";
}) {
  const [state, setState] = useState<RegistrationFormState>(() => createEmptyForm(initialType, initialSport));
  const [step, setStep] = useState<WizardStep>(initialType ? "personal" : "type");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<RegistrationSuccessResult | null>(null);

  const selectedMeta = state.type ? REGISTRATION_TYPE_META[state.type] : null;

  const update = (partial: Partial<RegistrationFormState>) => {
    setState((current) => ({ ...current, ...partial }));
  };

  const openType = (type: RegistrationType) => {
    setErrors({});
    setSubmitError("");
    setState((current) => ({
      ...current,
      type,
      volunteer: {
        ...current.volunteer,
        volunteerName: current.volunteer.volunteerName || current.personal.fullName,
      },
    }));
    setStep("personal");
  };

  const goNext = () => {
    if (step === "type") return;
    const currentErrors = validateStep(step, state);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setErrors({});
    if (step === "personal" && !state.volunteer.volunteerName) {
      setState((current) => ({
        ...current,
        volunteer: { ...current.volunteer, volunteerName: current.personal.fullName },
      }));
    }
    setStep(nextStep(step));
  };

  const goBack = () => {
    setErrors({});
    setSubmitError("");
    setStep(prevStep(step));
  };

  const handlePersonalChange = (personal: RegistrationFormState["personal"]) => {
    const computed = ageFromDob(personal.dob);
    const next = {
      ...personal,
      age: personal.dob && computed !== null ? String(computed) : personal.age,
    };
    update({ personal: next });
  };

  const handleSubmit = async () => {
    const declarationErrors = validateStep("declaration", state);
    if (Object.keys(declarationErrors).length > 0) {
      setErrors(declarationErrors);
      return;
    }
    const payload = toPayload(state);
    if (!payload) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        registrationId?: string;
        submittedAt?: string;
      };
      if (!response.ok || !data.success || !data.registrationId) {
        throw new Error(data.message || "Unable to submit registration. Please try again.");
      }
      setResult({
        registrationId: data.registrationId,
        type: payload.type,
        submittedAt: data.submittedAt || new Date().toISOString(),
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to submit registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <RegistrationSuccess
        type={result.type}
        registrationId={result.registrationId}
        submittedAt={result.submittedAt}
        state={state}
      />
    );
  }

  return (
    <div className={step === "type" ? "" : "pb-28 lg:pb-8"}>
      <FormProgress current={step} />

      {selectedMeta && step !== "type" ? (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white px-4 py-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Registering as</p>
            <p className="text-sm font-semibold text-slate-950">{selectedMeta.label}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep("type");
              setErrors({});
            }}
            className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
          >
            Change type
          </button>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22 }}
        >
          {step === "type" ? <RegistrationTypeSelector onSelectType={openType} /> : null}

          {step === "personal" ? (
            <PersonalInformationForm value={state.personal} errors={errors} onChange={handlePersonalChange} />
          ) : null}

          {step === "details" && state.type === "volunteer" ? (
            <VolunteerForm
              value={state.volunteer}
              errors={errors}
              onChange={(volunteer) => update({ volunteer })}
            />
          ) : null}
          {step === "details" && state.type === "membership" ? (
            <MembershipForm
              value={state.membership}
              errors={errors}
              onChange={(membership) => update({ membership })}
            />
          ) : null}
          {step === "details" && state.type === "sports" ? (
            <SportsForm value={state.sports} errors={errors} onChange={(sports) => update({ sports })} />
          ) : null}
          {step === "details" && state.type === "employee" ? (
            <EmployeeForm value={state.employee} errors={errors} onChange={(employee) => update({ employee })} />
          ) : null}
          {step === "details" && state.type === "event" ? (
            <EventForm value={state.event} errors={errors} onChange={(event) => update({ event })} />
          ) : null}

          {step === "documents" ? (
            <DocumentsForm
              photograph={state.photograph}
              signature={state.signature}
              errors={errors}
              onPhotographChange={(photograph) => update({ photograph })}
              onSignatureChange={(signature) => update({ signature })}
            />
          ) : null}

          {step === "declaration" ? (
            <DeclarationSection
              value={state.declaration}
              errors={errors}
              signature={state.signature}
              onChange={(declaration) => update({ declaration })}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      {submitError ? <p className="mt-4 text-sm font-medium text-rose-600">{submitError}</p> : null}

      {step !== "type" ? (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:static lg:mt-8 lg:border-0 lg:bg-transparent lg:p-0 lg:pb-0 lg:backdrop-blur-none">
        <div className="mx-auto flex max-w-[1240px] gap-3">
          <button type="button" onClick={goBack} className="btn-outline-dark flex-1 lg:flex-none">
            Back
          </button>
          {step !== "declaration" ? (
            <button type="button" onClick={goNext} className="btn-primary flex-[2] lg:flex-none">
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={submitting || !state.declaration.accepted}
              className="btn-primary flex-[2] disabled:cursor-not-allowed disabled:opacity-60 lg:flex-none"
            >
              {submitting ? "Submitting…" : "Submit Registration"}
            </button>
          )}
        </div>
      </div>
      ) : null}
    </div>
  );
}
