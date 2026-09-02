"use client";

import { useI18n } from "./LanguageProvider";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("Switch language")}
      className={`inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 ${
        compact ? "h-10" : "h-10"
      }`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`min-h-9 min-w-9 rounded-full px-2.5 text-[11px] font-bold tracking-wide transition sm:px-3 sm:text-xs ${
          locale === "en" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hi")}
        aria-pressed={locale === "hi"}
        className={`min-h-9 rounded-full px-2.5 font-devanagari text-[11px] font-bold transition sm:px-3 sm:text-xs ${
          locale === "hi" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}
