"use client";

import { WIZARD_STEPS } from "@/lib/registration/constants";
import type { WizardStep } from "@/lib/registration/types";
import { cn } from "@/lib/utils";

const FLOW_STEPS = WIZARD_STEPS.filter((step) => step.id !== "type");

export default function FormProgress({ current }: { current: WizardStep }) {
  const visible = current === "type" ? [] : FLOW_STEPS;
  const currentIndex = visible.findIndex((step) => step.id === current);

  if (current === "type") return null;

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        <span>
          Step {currentIndex + 1} of {visible.length}
        </span>
        <span className="text-slate-800">{visible[currentIndex]?.label}</span>
      </div>
      <ol className="grid grid-cols-4 gap-2">
        {visible.map((step, index) => {
          const complete = index < currentIndex;
          const active = index === currentIndex;
          return (
            <li key={step.id} className="min-w-0">
              <div
                className={cn(
                  "h-1.5 rounded-full transition-colors",
                  complete || active ? "bg-gradient-to-r from-emerald-500 to-blue-600" : "bg-slate-200",
                )}
              />
              <p
                className={cn(
                  "mt-2 hidden truncate text-[11px] font-semibold uppercase tracking-[0.14em] sm:block",
                  active ? "text-slate-950" : complete ? "text-emerald-700" : "text-slate-400",
                )}
              >
                {step.label}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
