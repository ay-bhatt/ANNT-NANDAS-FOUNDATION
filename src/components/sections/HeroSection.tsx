"use client";

/**
 * Home Hero section — Client Component.
 * 10-photo slideshow with the existing hero context overlay.
 * Context stays visible for the first two slides, then hides.
 * A corner button lets visitors show or hide the context again.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { HeroContent, ImpactStat, SlideshowPhoto } from "@/lib/types";
import { PunchLine } from "@/components/site/SectionBlocks";

const SLIDE_INTERVAL_MS = 3000;
const AUTO_HIDE_AFTER_SLIDES = 2;

interface HeroSectionProps {
  heroContent: HeroContent;
  impactStats: ImpactStat[];
  motto: string;
  mottoHi: string;
  slideshowPhotos: SlideshowPhoto[];
}

export default function HeroSection({
  heroContent,
  impactStats,
  motto,
  mottoHi,
  slideshowPhotos,
}: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [autoHidden, setAutoHidden] = useState(false);
  const [manualVisible, setManualVisible] = useState<boolean | null>(null);
  const timerRef = useRef<number | null>(null);
  const total = slideshowPhotos.length;
  const showContext = manualVisible ?? !autoHidden;
  const current = slideshowPhotos[index] ?? slideshowPhotos[0];

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (total <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % total);
    }, SLIDE_INTERVAL_MS);
  }, [clearTimer, total]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      setIndex(((nextIndex % total) + total) % total);
      startTimer();
    },
    [startTimer, total],
  );

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [clearTimer, startTimer]);

  useEffect(() => {
    if (index >= AUTO_HIDE_AFTER_SLIDES) {
      setAutoHidden(true);
    }
  }, [index]);

  const reveal = (delay: number) => ({
    initial: false as const,
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay },
  });

  if (!current) return null;

  return (
    <section className="hero-section relative isolate min-h-[calc(100svh-var(--site-header-h)-var(--site-bottom-nav-h))] overflow-hidden bg-blue-950 text-white xl:min-h-[calc(100svh-var(--site-header-h))]">
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src + index}
            className="absolute inset-0"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeInOut" }}
          >
            <Image
              src={current.src}
              alt={current.label}
              fill
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
              data-critical-hero={index === 0 ? "true" : undefined}
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            showContext
              ? "bg-[linear-gradient(90deg,rgba(3,15,40,0.92)_0%,rgba(5,25,56,0.70)_45%,rgba(5,25,56,0.16)_78%),linear-gradient(0deg,rgba(3,15,40,0.78)_0%,transparent_48%)] max-sm:bg-[linear-gradient(180deg,rgba(3,15,40,0.32)_0%,rgba(3,15,40,0.78)_52%,rgba(3,15,40,0.96)_100%)]"
              : "bg-[linear-gradient(180deg,rgba(3,15,40,0.28)_0%,rgba(3,15,40,0.12)_42%,rgba(3,15,40,0.45)_100%)]"
          }`}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {total}: {current.label}
      </p>

      <AnimatePresence initial={false}>
        {showContext ? (
          <motion.div
            key="hero-context"
            className="container-premium flex min-h-[calc(100svh-var(--site-header-h)-var(--site-bottom-nav-h))] items-end pb-16 pt-16 min-[390px]:pb-20 sm:items-center sm:py-20 xl:min-h-[calc(100svh-var(--site-header-h))] lg:py-24"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.4 }}
          >
            <div className="w-full max-w-3xl pl-8 min-[390px]:pl-10 sm:pl-12 xl:pl-0">
              <motion.span className="section-label-dark" {...reveal(0.08)}>
                {heroContent.eyebrow}
              </motion.span>

              <motion.h1
                className="max-w-3xl text-balance text-[2rem] font-bold leading-[1.02] tracking-[-0.045em] text-white min-[390px]:text-[2.35rem] sm:text-5xl md:text-6xl xl:text-7xl"
                {...reveal(0.16)}
              >
                Small Steps Today,
                <span className="mt-1 block bg-gradient-to-r from-lime-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
                  Limitless Impact Tomorrow.
                </span>
              </motion.h1>

              <motion.div className="mt-4" {...reveal(0.2)}>
                <PunchLine english={motto} hindi={mottoHi} tone="dark" />
              </motion.div>

              <motion.p
                className="mt-5 max-w-2xl text-sm leading-7 text-blue-50/90 sm:mt-6 sm:text-lg sm:leading-8"
                {...reveal(0.24)}
              >
                {heroContent.subheading}
              </motion.p>

              <motion.div className="mt-7 flex flex-wrap gap-3 sm:mt-9" {...reveal(0.32)}>
                <Link href={heroContent.ctaPrimary.href} className="btn-primary group">
                  {heroContent.ctaPrimary.label}{" "}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link href={heroContent.ctaSecondary.href} className="btn-secondary">
                  <span aria-hidden="true">▶</span> {heroContent.ctaSecondary.label}
                </Link>
              </motion.div>

              <motion.div
                className="mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:max-w-2xl sm:gap-3"
                {...reveal(0.4)}
              >
                {impactStats.slice(0, 3).map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 text-center shadow-lg backdrop-blur-md sm:rounded-[22px] sm:p-4"
                  >
                    <p className="text-lg font-bold text-white sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] leading-4 text-blue-100 sm:text-xs">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="min-h-[calc(100svh-var(--site-header-h)-var(--site-bottom-nav-h))] xl:min-h-[calc(100svh-var(--site-header-h))]" aria-hidden="true" />
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setManualVisible((currentValue) => !(currentValue ?? !autoHidden))}
        aria-pressed={showContext}
        aria-label={showContext ? "Hide hero text" : "Show hero text"}
        className="absolute right-3 top-3 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-slate-950/75 sm:right-6 sm:top-6"
      >
        <span aria-hidden="true">{showContext ? "✕" : "☰"}</span>
        {showContext ? "Hide text" : "Show text"}
      </button>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-1.5 px-4 sm:bottom-5">
        {slideshowPhotos.map((photo, photoIndex) => (
          <button
            key={`${photo.label}-${photoIndex}`}
            type="button"
            aria-label={`Show slide ${photoIndex + 1}: ${photo.label}`}
            aria-current={photoIndex === index ? true : undefined}
            onClick={() => goTo(photoIndex)}
            className={`h-2 rounded-full transition-all ${
              photoIndex === index ? "w-6 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
}
