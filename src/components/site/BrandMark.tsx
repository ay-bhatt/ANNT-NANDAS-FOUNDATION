import { ORG_FOUNDATION_EN, ORG_NAME_EN, ORG_NAME_HI, ORG_SHORT_EN } from "@/lib/i18n";

export default function BrandMark({
  inverted = false,
  compact = false,
  inline = false,
}: {
  inverted?: boolean;
  compact?: boolean;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <div className="min-w-0 leading-tight">
        <p
          className={`font-extrabold uppercase tracking-[0.04em] ${
            compact ? "text-[9px] sm:text-[11px] xl:text-xs 2xl:text-[13px]" : "text-base sm:text-lg"
          } ${inverted ? "text-white" : "text-slate-900"}`}
        >
          {ORG_NAME_EN}
        </p>
        <p
          className={`mt-0.5 break-words font-devanagari font-semibold ${
            compact ? "text-[9px] sm:text-[11px]" : "text-xs sm:text-sm"
          } ${inverted ? "text-slate-300" : "text-slate-600"}`}
        >
          {ORG_NAME_HI}
        </p>
      </div>
    );
  }

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
          inverted ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {ORG_NAME_HI}
      </p>
    </div>
  );
}
