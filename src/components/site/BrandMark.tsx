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
      <p
        className={`whitespace-nowrap font-extrabold uppercase tracking-[0.04em] ${
          compact ? "text-[12px] sm:text-[13px] xl:text-sm 2xl:text-[15px]" : "text-base sm:text-lg"
        } ${inverted ? "text-white" : "text-slate-900"}`}
      >
        {ORG_NAME_EN}
      </p>
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
          compact ? "hidden sm:block" : ""
        } ${inverted ? "text-slate-300" : "text-slate-600"}`}
      >
        {ORG_NAME_HI}
      </p>
    </div>
  );
}
