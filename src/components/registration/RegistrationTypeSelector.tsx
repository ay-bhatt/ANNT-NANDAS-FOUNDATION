"use client";

import { motion } from "framer-motion";
import { REGISTRATION_TYPE_META } from "@/lib/registration/constants";
import type { RegistrationType } from "@/lib/registration/types";

const PRIMARY_TYPES: RegistrationType[] = ["volunteer", "membership", "sports"];
const EXTRA_TYPES: RegistrationType[] = ["event", "employee"];

const ICONS: Record<RegistrationType, string> = {
  volunteer: "🌿",
  membership: "🤝",
  sports: "🏅",
  employee: "🗂️",
  event: "📅",
};

export default function RegistrationTypeSelector({
  onSelectType,
}: {
  onSelectType: (type: RegistrationType) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <p className="section-label">Choose a path</p>
        <h2 className="text-3xl font-bold tracking-[-0.04em] text-slate-950 sm:text-4xl">How would you like to register?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Tap a card to open that form immediately. Each path is a short, guided experience.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PRIMARY_TYPES.map((type, index) => {
          const meta = REGISTRATION_TYPE_META[type];
          return (
            <motion.button
              key={type}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectType(type)}
              className="group surface-card p-5 text-left sm:p-6"
            >
              <span className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-xl text-white`}>
                {ICONS[type]}
              </span>
              <h3 className="text-xl font-bold tracking-[-0.03em] text-slate-950">{meta.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{meta.description}</p>
              <p className="mt-5 text-sm font-semibold text-emerald-700">
                Begin {meta.shortLabel.toLowerCase()} <span aria-hidden="true">→</span>
              </p>
            </motion.button>
          );
        })}
      </div>

      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Also available</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {EXTRA_TYPES.map((type) => {
            const meta = REGISTRATION_TYPE_META[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => onSelectType(type)}
                className="group rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_14px_40px_rgba(15,23,42,0.08)]"
              >
                <p className="font-semibold text-slate-950">
                  {ICONS[type]} {meta.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{meta.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
