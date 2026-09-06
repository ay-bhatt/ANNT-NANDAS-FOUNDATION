import { ORG_FOUNDATION_EN, ORG_NAME_HI, ORG_SHORT_EN } from "@/lib/i18n";

export default function BrandMark({
  inverted = false,
  compact = false,
}: {
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p
        className={`truncate font-extrabold uppercase tracking-wide ${
          compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
        } ${inverted ? "text-white" : "text-slate-900"}`}
      >
        {ORG_SHORT_EN}
      </p>
      <p
        className={`truncate text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${
          inverted ? "text-emerald-400" : "text-emerald-700"
        }`}
      >
        {ORG_FOUNDATION_EN}
      </p>
      <p
        className={`truncate font-devanagari text-[11px] font-semibold leading-tight sm:text-sm ${
          compact ? "hidden sm:block" : ""
        } ${inverted ? "text-slate-300" : "text-slate-600"}`}
      >
        {ORG_NAME_HI}
      </p>
    </div>
  );
}
