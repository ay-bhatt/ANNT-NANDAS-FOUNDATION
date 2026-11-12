"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CroreImpactPlan } from "@/lib/types";
import { formatRupees } from "@/lib/donation";
import { SectionHeading } from "@/components/site/SectionBlocks";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface CroreImpactSectionProps {
  plan: CroreImpactPlan;
  paymentHref?: string;
}

export default function CroreImpactSection({
  plan,
  paymentHref = "#upi-donation-widget",
}: CroreImpactSectionProps) {
  const { t, localize } = useI18n();
  const localizedPlan = localize(plan);
  const [selectedScenario, setSelectedScenario] = useState<string>("all");

  const scenarioTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const scenario of localizedPlan.scenarios) {
      totals[scenario.id] = localizedPlan.rows.reduce(
        (sum, row) => sum + (row.allocations[scenario.id] ?? 0),
        0,
      );
    }
    return totals;
  }, [localizedPlan]);

  const pct = (amount: number, scenarioId: string) => {
    const total = scenarioTotals[scenarioId] || localizedPlan.targetTotal || 1;
    return Math.round((amount / total) * 100);
  };

  return (
    <section
      id="crore-impact"
      className="section-padding anchor-offset bg-white px-3 sm:px-5"
      aria-labelledby="crore-impact-heading"
    >
      <div className="container-premium">
        <SectionHeading
          eyebrow="Donation Planning Scenarios"
          title={localizedPlan.title}
          description="Explore three illustrative planning scenarios showing how ₹1 Crore in community support could be distributed across core Foundation areas."
          centered
        />

        {/* Clear illustrative planning disclaimer */}
        <div className="mx-auto mb-8 max-w-4xl rounded-2xl border border-blue-200/80 bg-blue-50/70 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-900 sm:text-sm">
            {localizedPlan.disclaimer}
          </p>
        </div>

        {/* Scenario Interactive Selector */}
        <div
          role="tablist"
          aria-label={t("Select allocation scenario")}
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedScenario === "all"}
            onClick={() => setSelectedScenario("all")}
            className={`min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
              selectedScenario === "all"
                ? "border-blue-700 bg-blue-950 text-white shadow-md"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
            }`}
          >
            {t("Compare All Scenarios")}
          </button>
          {localizedPlan.scenarios.map((scenario) => {
            const active = selectedScenario === scenario.id;
            return (
              <button
                key={scenario.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedScenario(scenario.id)}
                className={`min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? "border-emerald-500 bg-gradient-to-r from-emerald-600 to-blue-700 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                }`}
              >
                {scenario.label} · {scenario.subtitle}
              </button>
            );
          })}
        </div>

        {/* Visual Scenario Comparison Stacked Bars */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 rounded-[28px] border border-slate-200/90 bg-slate-50/70 p-5 shadow-sm sm:p-7"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-slate-950 sm:text-lg">
              {t("Visual Allocation Comparison")}
            </h3>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              {t("Total per scenario")}: {formatRupees(localizedPlan.targetTotal)}
            </span>
          </div>

          <div className="space-y-4">
            {localizedPlan.scenarios.map((scenario) => {
              const total = scenarioTotals[scenario.id] || 1;
              const dimmed = selectedScenario !== "all" && selectedScenario !== scenario.id;

              return (
                <div
                  key={scenario.id}
                  className={`transition-opacity duration-200 ${dimmed ? "opacity-45" : "opacity-100"}`}
                >
                  <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-bold text-slate-900">
                      {scenario.label}{" "}
                      <span className="font-medium text-slate-500">— {scenario.subtitle}</span>
                    </span>
                    <span className="font-bold tabular-nums text-blue-900">
                      {formatRupees(total)}
                    </span>
                  </div>
                  <div
                    className="flex h-7 w-full overflow-hidden rounded-full bg-slate-200/80 shadow-inner sm:h-8"
                    role="img"
                    aria-label={`${scenario.label} allocation distribution totaling ${formatRupees(total)}`}
                  >
                    {localizedPlan.rows.map((row) => {
                      const val = row.allocations[scenario.id] ?? 0;
                      const share = Math.round((val / total) * 100);
                      return (
                        <div
                          key={row.id}
                          title={`${row.category}: ${formatRupees(val)} (${share}%)`}
                          style={{
                            width: `${(val / total) * 100}%`,
                            backgroundColor: row.color,
                          }}
                          className="flex items-center justify-center border-r border-white/40 text-[10px] font-bold text-white transition-all duration-300 last:border-r-0 sm:text-xs"
                        >
                          {share >= 10 ? `${share}%` : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category Color Legend */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200/80 pt-4">
            {localizedPlan.rows.map((row) => (
              <div key={row.id} className="inline-flex items-center gap-2 text-xs font-medium text-slate-700">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: row.color }}
                  aria-hidden="true"
                />
                <span>{row.category}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Desktop & Tablet Premium Comparison Table */}
        <div className="hidden overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-[linear-gradient(135deg,#071a3c_0%,#0d3b73_60%,#065f46_100%)] text-white">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.16em]">
                    {t("Category")}
                  </th>
                  {localizedPlan.scenarios.map((scenario) => {
                    const isHighlighted = selectedScenario === scenario.id;
                    return (
                      <th
                        key={scenario.id}
                        className={`px-6 py-4 text-right transition-colors ${
                          isHighlighted ? "bg-white/15" : ""
                        }`}
                      >
                        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
                          {scenario.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-medium text-blue-100/85">
                          {scenario.subtitle}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {localizedPlan.rows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-slate-50/90">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: row.color }}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold text-slate-900">{row.category}</span>
                      </div>
                    </td>
                    {localizedPlan.scenarios.map((scenario) => {
                      const amount = row.allocations[scenario.id] ?? 0;
                      const share = pct(amount, scenario.id);
                      const isHighlighted = selectedScenario === scenario.id;
                      const dimmed = selectedScenario !== "all" && !isHighlighted;

                      return (
                        <td
                          key={scenario.id}
                          className={`px-6 py-4 text-right align-middle transition-all ${
                            isHighlighted ? "bg-blue-50/60" : ""
                          } ${dimmed ? "opacity-45" : "opacity-100"}`}
                        >
                          <div className="flex flex-col items-end gap-1.5">
                            <div className="flex items-baseline gap-2">
                              <span className="text-sm font-bold tabular-nums text-slate-950">
                                {formatRupees(amount)}
                              </span>
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold tabular-nums text-slate-700">
                                {share}%
                              </span>
                            </div>
                            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${share}%`,
                                  backgroundColor: row.color,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-emerald-500/40 bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50">
                  <td className="px-6 py-5 text-sm font-extrabold uppercase tracking-[0.14em] text-slate-950">
                    {t("TOTAL")}
                  </td>
                  {localizedPlan.scenarios.map((scenario) => {
                    const total = scenarioTotals[scenario.id] ?? 0;
                    const dimmed = selectedScenario !== "all" && selectedScenario !== scenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`px-6 py-5 text-right transition-opacity ${
                          dimmed ? "opacity-50" : "opacity-100"
                        }`}
                      >
                        <span className="block text-base font-extrabold tabular-nums text-blue-950 sm:text-lg">
                          {formatRupees(total)}
                        </span>
                        <span className="inline-block rounded-full bg-emerald-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                          100%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Mobile Responsive Cards (no category or figure hidden) */}
        <div className="space-y-4 md:hidden">
          {localizedPlan.rows.map((row) => (
            <article
              key={row.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: row.color }}
                  aria-hidden="true"
                />
                <h4 className="text-sm font-bold text-slate-950">{row.category}</h4>
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2.5 min-[375px]:grid-cols-3">
                {localizedPlan.scenarios.map((scenario) => {
                  const amount = row.allocations[scenario.id] ?? 0;
                  const share = pct(amount, scenario.id);
                  const isHighlighted = selectedScenario === scenario.id;
                  return (
                    <div
                      key={scenario.id}
                      className={`rounded-xl border p-2.5 ${
                        isHighlighted
                          ? "border-blue-400 bg-blue-50/70"
                          : "border-slate-100 bg-slate-50"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                        {scenario.label}
                      </p>
                      <p className="mt-1 text-xs font-extrabold tabular-nums text-slate-950">
                        {formatRupees(amount)}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${share}%`, backgroundColor: row.color }}
                          />
                        </div>
                        <span className="text-[10px] font-bold tabular-nums text-slate-700">
                          {share}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}

          {/* Mobile Highlighted TOTAL Card */}
          <div className="rounded-2xl border-2 border-emerald-500/40 bg-[linear-gradient(135deg,#071a3c_0%,#0d3b73_60%,#065f46_100%)] p-4 text-white shadow-md">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-300">
              {t("TOTAL ALLOCATION")}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 min-[375px]:grid-cols-3">
              {localizedPlan.scenarios.map((scenario) => (
                <div key={scenario.id} className="rounded-xl bg-white/10 p-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100">
                    {scenario.label}
                  </p>
                  <p className="mt-1 text-xs font-extrabold tabular-nums text-white">
                    {formatRupees(scenarioTotals[scenario.id] ?? 0)}
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold text-emerald-300">100%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50 px-5 py-4 sm:flex-row">
          <p className="text-center text-xs leading-6 text-slate-600 sm:text-left sm:text-sm">
            {localizedPlan.disclaimer}
          </p>
          <Link href={paymentHref} className="btn-primary shrink-0">
            {t("Make a Donation")} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
