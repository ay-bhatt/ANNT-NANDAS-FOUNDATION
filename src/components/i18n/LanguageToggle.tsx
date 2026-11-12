"use client";

import { useI18n } from "./LanguageProvider";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("Switch language")}
      className={`inline-flex shrink-0 items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 ${
        compact ? "h-7 min-[480px]:h-9 xl:h-10" : "h-10"
      }`}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`rounded-full font-bold tracking-wide transition ${
          compact
            ? "min-h-6 px-2 text-[10px] min-[480px]:min-h-8 min-[480px]:px-2.5 min-[480px]:text-[11px] xl:min-h-9 xl:px-3 xl:text-xs"
            : "min-h-9 min-w-9 px-2.5 text-[11px] sm:px-3 sm:text-xs"
        } ${
          locale === "en" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hi")}
        aria-pressed={locale === "hi"}
        className={`rounded-full font-devanagari font-bold transition ${
          compact
            ? "min-h-6 px-2 text-[10px] min-[480px]:min-h-8 min-[480px]:px-2.5 min-[480px]:text-[11px] xl:min-h-9 xl:px-3 xl:text-xs"
            : "min-h-9 px-2.5 text-[11px] sm:px-3 sm:text-xs"
        } ${
          locale === "hi" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        हिन्दी
      </button>
    </div>
  );
}
