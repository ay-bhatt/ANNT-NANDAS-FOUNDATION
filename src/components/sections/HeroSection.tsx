"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import type { HeroContent, ImpactStat } from "@/lib/types";
import { HOME_CONTENT_HIDE_MS, HOME_CONTENT_RESTORE_EVENT, ORG_NAME_EN } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/LanguageProvider";

const SLIDE_INTERVAL_MS = 3800;

const SLIDE_COPY = [
  {
    alt: "Community members and children gathered in a Himalayan village",
    caption: "Community gathering · Mundoli, Chamoli",
  },
  {
    alt: "Founder carrying the Indian flag after an ultra trail run",
    caption: "Carrying the Tricolour · Hajar Ultra Trail Run",
  },
  {
    alt: "Athletes and officials at the Niti Xtreme Ultra Run",
    caption: "Niti Xtreme Ultra Run · athletes and officials",
  },
  {
    alt: "Cyclists lining up at the National Mountain Bike Championships",
    caption: "National Mountain Bike Championships",
  },
  {
    alt: "Athletes and coach standing on a championship podium",
    caption: "Championship podium · athletes and coach",
  },
  {
    alt: "Founder celebrating at the Adi Kailash Parikrama Run",
    caption: "Adi Kailash Parikrama Run · finish in the high Himalaya",
  },
];

interface HeroSectionProps {
  heroContent: HeroContent;
  highlights?: ImpactStat[];
}

export default function HeroSection({ heroContent, highlights = [] }: HeroSectionProps) {
  const { t, localize } = useI18n();
  const copy = localize(heroContent);
  const slides = useMemo(() => {
    const sources = [heroContent.image, heroContent.backgroundImage, ...heroContent.supportingVisuals].filter(
      Boolean,
    );
    return sources.slice(0, 6).map((src, index) => ({
      src,
      alt: t(SLIDE_COPY[index]?.alt ?? "ANNT NANDAS FOUNDATION in the Himalayas"),
      caption: t(SLIDE_COPY[index]?.caption ?? ORG_NAME_EN),
    }));
  }, [heroContent.backgroundImage, heroContent.image, heroContent.supportingVisuals, t]);

  const [index, setIndex] = useState(0);
  const [detailsVisible, setDetailsVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [restartToken, setRestartToken] = useState(0);
  const [hideCycle, setHideCycle] = useState(0);

  const count = slides.length;
  const active = slides[index] ?? slides[0];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
      setRestartToken((token) => token + 1);
    },
    [count],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, count, restartToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => setDetailsVisible(false), HOME_CONTENT_HIDE_MS);
    return () => window.clearTimeout(timer);
  }, [hideCycle]);

  useEffect(() => {
    const restore = () => {
      setDetailsVisible(true);
      setHideCycle((cycle) => cycle + 1);
    };
    window.addEventListener(HOME_CONTENT_RESTORE_EVENT, restore);
    return () => window.removeEventListener(HOME_CONTENT_RESTORE_EVENT, restore);
  }, []);

  return (
    <section
      className="hero-section relative isolate min-h-[calc(100svh-var(--nav-height))] overflow-hidden bg-blue-950 text-white select-none"
      aria-roledescription="carousel"
      aria-label={t("Foundation highlights")}
    >
      <div className="absolute inset-0 -z-20">
        {slides.map((slide, slideIndex) => {
          const { props } = getImageProps({
            src: slide.src,
            alt: slide.alt,
            sizes: "100vw",
            quality: 90,
            width: 1920,
            height: 1080,
            priority: slideIndex === 0,
          });

          return (
            <img
              key={`${slide.src}-${slideIndex}`}
              {...props}
              alt={slide.alt}
              data-critical-hero={slideIndex === 0 ? "true" : undefined}
              fetchPriority={slideIndex === 0 ? "high" : "low"}
              decoding={slideIndex === 0 ? "sync" : "async"}
              loading="eager"
              className={`absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-center transition-opacity duration-700 ease-in-out ${
                slideIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
          );
        })}

        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            detailsVisible ? "opacity-100" : "opacity-0"
          } bg-[linear-gradient(90deg,rgba(3,15,40,0.58)_0%,rgba(5,25,56,0.28)_50%,rgba(5,25,56,0.12)_82%)] max-sm:bg-[linear-gradient(180deg,rgba(3,15,40,0.15)_0%,rgba(3,15,40,0.32)_42%,rgba(3,15,40,0.78)_100%)]`}
        />
      </div>

      <div className="container-premium flex min-h-[calc(100svh-var(--nav-height))] items-end pb-24 pt-24 sm:items-center sm:py-20 lg:py-24">
        <div
          className={`w-full max-w-3xl transform transition-all duration-1000 ease-in-out ${
            detailsVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <span className="section-label-dark inline-block mb-3 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur-md">
            {copy.eyebrow}
          </span>

          <h1 className="max-w-3xl text-balance text-[2.25rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(2,6,23,0.7)] min-[400px]:text-4xl sm:text-6xl lg:text-7xl">
            {copy.heading.includes(",") ? (
              <>
                {copy.heading.slice(0, copy.heading.indexOf(",") + 1)}
                <span className="mt-1.5 block bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                  {copy.heading.slice(copy.heading.indexOf(",") + 1).trim()}
                </span>
              </>
            ) : (
              copy.heading
            )}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-100 drop-shadow-[0_4px_12px_rgba(2,6,23,0.8)] sm:mt-6 sm:text-lg sm:leading-8 sm:text-blue-50">
            {copy.subheading}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link href={copy.ctaPrimary.href} className="btn-primary group inline-flex items-center gap-2">
              {copy.ctaPrimary.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/donate"
              className="btn-premium inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              {t("Donate Now")} <span aria-hidden="true">→</span>
            </Link>

            <Link href={copy.ctaSecondary.href} className="btn-secondary inline-flex items-center gap-2">
              <span aria-hidden="true">▶</span> {copy.ctaSecondary.label}
            </Link>
          </div>

          {highlights.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-2.5">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/20 bg-slate-950/45 px-4 py-2 backdrop-blur-md"
                >
                  <p className="text-sm font-bold text-white">{item.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">{t(item.label)}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-30 flex flex-col items-center gap-3 px-4 sm:bottom-6">
          {active ? (
            <p className="max-w-[90vw] truncate rounded-full border border-white/15 bg-slate-950/45 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md sm:text-xs">
              {active.caption}
            </p>
          ) : null}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-900/55 text-white/85 backdrop-blur-md transition hover:bg-slate-900/85 hover:text-white"
              aria-label={t("Previous slide")}
            >
              ‹
            </button>
            <div className="flex items-center gap-1.5" role="tablist" aria-label={t("Hero slides")}>
              {slides.map((slide, slideIndex) => {
                const selected = slideIndex === index;
                return (
                  <button
                    key={`${slide.src}-dot`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Show slide ${slideIndex + 1} of ${count}`}
                    onClick={() => goTo(slideIndex)}
                    className={`h-2.5 rounded-full transition-all ${
                      selected ? "w-8 bg-emerald-400" : "w-2.5 bg-white/45 hover:bg-white/80"
                    }`}
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-900/55 text-white/85 backdrop-blur-md transition hover:bg-slate-900/85 hover:text-white"
              aria-label={t("Next slide")}
            >
              ›
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setDetailsVisible((value) => !value)}
        className="absolute bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full border border-white/20 bg-slate-900/60 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:bg-slate-900/90 hover:text-white sm:inline-flex"
        aria-label={detailsVisible ? t("Hide hero details") : t("Show hero details")}
      >
        <span className={`h-2 w-2 rounded-full transition-colors ${detailsVisible ? "bg-emerald-400 animate-pulse" : "bg-white/40"}`} />
        {detailsVisible ? t("Clear View") : t("Show Details")}
      </button>
    </section>
  );
}
