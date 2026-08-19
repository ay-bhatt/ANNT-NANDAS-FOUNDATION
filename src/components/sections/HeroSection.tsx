import { getImageProps } from "next/image";
import Link from "next/link";
import type { HeroContent, ImpactStat } from "@/lib/types";
import mobileHero from "@/assets/hero MOB/mob-hero (2).webp";

interface HeroSectionProps {
  heroContent: HeroContent;
  impactStats: ImpactStat[];
}

export default function HeroSection({ heroContent, impactStats }: HeroSectionProps) {
  const common = {
    alt: "Children and community members in the Himalayan landscape",
    sizes: "100vw",
    quality: 75,
    width: 1920,
    height: 1080,
    priority: true,
  };
  const { props: mobileProps } = getImageProps({ ...common, src: mobileHero });
  const { props: desktopProps } = getImageProps({ ...common, src: heroContent.image });

  return (
    <section className="hero-section relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-blue-950 text-white">
      <div className="absolute inset-0 -z-20">
        <picture>
          <source media="(max-width: 639px)" srcSet={mobileProps.srcSet} sizes="100vw" />
          <img
            {...desktopProps}
            alt={common.alt}
            data-critical-hero="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,15,40,0.92)_0%,rgba(5,25,56,0.70)_45%,rgba(5,25,56,0.16)_78%),linear-gradient(0deg,rgba(3,15,40,0.78)_0%,transparent_48%)] max-sm:bg-[linear-gradient(180deg,rgba(3,15,40,0.32)_0%,rgba(3,15,40,0.78)_52%,rgba(3,15,40,0.96)_100%)]" />
      </div>

      <div className="container-premium flex min-h-[calc(100svh-72px)] items-end pb-8 pt-28 sm:items-center sm:py-20 lg:py-24">
        <div className="w-full max-w-3xl">
          <span className="section-label-dark">{heroContent.eyebrow}</span>

          <h1 className="max-w-3xl text-balance text-[2.55rem] font-bold leading-[0.98] tracking-[-0.045em] text-white min-[390px]:text-5xl sm:text-6xl lg:text-7xl">
            Small Steps Today,
            <span className="mt-1 block text-emerald-300">Limitless Impact Tomorrow.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-50 sm:mt-6 sm:text-lg sm:leading-8">
            {heroContent.subheading}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <Link href={heroContent.ctaPrimary.href} className="btn-primary group">
              {heroContent.ctaPrimary.label}{" "}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/donate"
              className="btn-premium border border-white/40 bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              Donate Now <span aria-hidden="true">→</span>
            </Link>
            <Link href={heroContent.ctaSecondary.href} className="btn-secondary">
              <span aria-hidden="true">▶</span> {heroContent.ctaSecondary.label}
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:max-w-2xl sm:gap-3">
            {impactStats.slice(0, 3).map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/20 bg-white/15 px-2 py-3 text-center shadow-lg backdrop-blur-md sm:rounded-[22px] sm:p-4"
              >
                <p className="text-lg font-bold text-white sm:text-2xl">{stat.value}</p>
                <p className="mt-1 text-[10px] leading-4 text-blue-50 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
}
