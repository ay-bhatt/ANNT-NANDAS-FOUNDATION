"use client";

import { wizardStepDefsFor } from "@/lib/registration/constants";
import type { RegistrationType, WizardStep } from "@/lib/registration/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function FormProgress({
  current,
  type,
}: {
  current: WizardStep;
  type: RegistrationType | "";
}) {
  const { t } = useI18n();
  const visible = current === "type" ? [] : wizardStepDefsFor(type).filter((step) => step.id !== "type");
  const currentIndex = visible.findIndex((step) => step.id === current);

  if (current === "type") return null;

  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
        <span>
          {t("Step")} {currentIndex + 1} {t("of")} {visible.length}
        </span>
        <span className="text-slate-800">{t(visible[currentIndex]?.label ?? "")}</span>
      </div>
      <ol
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${visible.length}, minmax(0, 1fr))` }}
      >
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
                {t(step.label)}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
