"use client";

import { useState, useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import type { HeroContent } from "@/lib/types";
import mobileHero from "@/assets/hero MOB/mob-hero (2).webp";

interface HeroSectionProps {
  heroContent: HeroContent;
}

export default function HeroSection({ heroContent }: HeroSectionProps) {
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const common = {
    alt: "Children and community members in the Himalayan landscape",
    sizes: "100vw",
    quality: 90, // Reverted to 90 to fix the Next.js config error
    width: 1920,
    height: 1080,
    priority: true,
  };

  const { props: mobileProps } = getImageProps({ ...common, src: mobileHero });
  const { props: desktopProps } = getImageProps({ ...common, src: heroContent.image });

  // Reset and restart the 5-second fade timer
  const resetTimer = () => {
    setIsVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section 
      onMouseMove={resetTimer}
      onTouchStart={resetTimer}
      className="hero-section relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-blue-950 text-white select-none"
    >
      {/* ── Background Image & Dynamic Overlay ── */}
      <div className="absolute inset-0 -z-20">
        <picture>
          <source media="(max-width: 639px)" srcSet={mobileProps.srcSet} sizes="100vw" />
          <img
            {...desktopProps}
            alt={common.alt}
            data-critical-hero="true"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-center transition-transform duration-1000 ease-out"
          />
        </picture>

        {/* Dynamic Dark Gradient: Fades away to 0% opacity to display the pure image */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isVisible ? "opacity-100" : "opacity-0"
          } bg-[linear-gradient(90deg,rgba(3,15,40,0.7)_0%,rgba(5,25,56,0.4)_48%,rgba(5,25,56,0.1)_82%)] max-sm:bg-[linear-gradient(180deg,rgba(3,15,40,0.2)_0%,rgba(3,15,40,0.45)_40%,rgba(3,15,40,0.85)_100%)]`} 
        />
      </div>

      {/* ── Hero Text & Actions Content ── */}
      <div className="container-premium flex min-h-[calc(100svh-72px)] items-end pb-12 pt-24 sm:items-center sm:py-20 lg:py-24">
        <div 
          className={`w-full max-w-3xl transform transition-all duration-1000 ease-in-out ${
            isVisible 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <span className="section-label-dark inline-block mb-3 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur-md">
            {heroContent.eyebrow}
          </span>

          <h1 className="max-w-3xl text-balance text-[2.25rem] font-black leading-[1.08] tracking-tight text-white drop-shadow-[0_8px_24px_rgba(2,6,23,0.7)] min-[400px]:text-4xl sm:text-6xl lg:text-7xl">
            Small Steps Today,
            <span className="mt-1.5 block bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
              Limitless Impact Tomorrow.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-100 drop-shadow-[0_4px_12px_rgba(2,6,23,0.8)] sm:mt-6 sm:text-lg sm:leading-8 sm:text-blue-50">
            {heroContent.subheading}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
            <Link href={heroContent.ctaPrimary.href} className="btn-primary group inline-flex items-center gap-2">
              {heroContent.ctaPrimary.label}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>

            <Link
              href="/donate"
              className="btn-premium inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              Donate Now <span aria-hidden="true">→</span>
            </Link>

            <Link href={heroContent.ctaSecondary.href} className="btn-secondary inline-flex items-center gap-2">
              <span aria-hidden="true">▶</span> {heroContent.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ── Floating View Controls (Bottom-Right) ── */}
      <button
        onClick={() => {
          if (isVisible) {
            setIsVisible(false);
            if (timerRef.current) clearTimeout(timerRef.current);
          } else {
            resetTimer();
          }
        }}
        className="absolute bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-900/60 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:bg-slate-900/90 hover:text-white"
        aria-label="Toggle clear background view"
      >
        <span className={`h-2 w-2 rounded-full transition-colors ${isVisible ? "bg-emerald-400 animate-pulse" : "bg-white/40"}`} />
        {isVisible ? "Clear View" : "Show Details"}
      </button>
    </section>
  );
}