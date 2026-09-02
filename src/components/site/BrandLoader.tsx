import Image from "next/image";
import logoImg from "@/assets/logo.webp";

export default function BrandLoader({
  label = "Loading",
  overlay = false,
}: {
  label?: string;
  overlay?: boolean;
}) {
  return (
    <div
      className={overlay ? "brand-loader brand-loader-overlay" : "brand-loader"}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="loader-aura" />
      <div className="loader-mark relative h-24 w-24 overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
        <Image src={logoImg} alt="" fill sizes="96px" className="object-contain p-1.5" priority />
      </div>
      <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-600">{label}</p>
      <span className="loader-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
