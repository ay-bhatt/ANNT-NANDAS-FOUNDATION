"use client";

/**
 * Home Hero section — Client Component.
 * Uses framer-motion for small entrance animations. This file must be
 * a client component so motion components can run in the browser.
 */

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { HeroContent, ImpactStat } from "@/lib/types";
import mobileHero from "@/assets/hero MOB/mob-hero (2).jpeg";

interface HeroSectionProps {
  heroContent: HeroContent;
  impactStats: ImpactStat[];
}

export default function HeroSection({ heroContent, impactStats }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const { props: mobileImageProps } = getImageProps({
    src: mobileHero,
    alt: "",
    sizes: "100vw",
  });
  const reveal = (delay: number) => ({
    initial: false as const,
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : delay },
  });

  return (
    <section className="hero-section relative isolate min-h-[calc(100svh-72px)] overflow-hidden bg-blue-950 text-white">
      <div className="absolute inset-0 -z-20">
        <picture>
          <source media="(max-width: 639px)" srcSet={mobileImageProps.srcSet} />
          <Image
            src={heroContent.image}
            alt="Children and community members in the Himalayan landscape"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            data-critical-hero="true"
            className="object-cover object-[58%_center] sm:object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,15,40,0.92)_0%,rgba(5,25,56,0.70)_45%,rgba(5,25,56,0.16)_78%),linear-gradient(0deg,rgba(3,15,40,0.78)_0%,transparent_48%)] max-sm:bg-[linear-gradient(180deg,rgba(3,15,40,0.32)_0%,rgba(3,15,40,0.78)_52%,rgba(3,15,40,0.96)_100%)]" />
      </div>

      <div className="container-premium flex min-h-[calc(100svh-72px)] items-end pb-8 pt-28 sm:items-center sm:py-20 lg:py-24">
        <div className="w-full max-w-3xl">
        <motion.span
          className="section-label-dark"
          {...reveal(0.08)}
        >
          {heroContent.eyebrow}
        </motion.span>

        <motion.h1
          className="max-w-3xl text-balance text-[2.55rem] font-bold leading-[0.98] tracking-[-0.045em] text-white min-[390px]:text-5xl sm:text-6xl lg:text-7xl"
          {...reveal(0.16)}
        >
          Small Steps Today,
          <span className="mt-1 block bg-gradient-to-r from-lime-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
            Limitless Impact Tomorrow.
          </span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-2xl text-sm leading-7 text-blue-50/90 sm:mt-6 sm:text-lg sm:leading-8"
          {...reveal(0.24)}
        >
          {heroContent.subheading}
        </motion.p>

        <motion.div
          className="mt-7 flex flex-wrap gap-3 sm:mt-9"
          {...reveal(0.32)}
        >
          <Link href={heroContent.ctaPrimary.href} className="btn-primary group">
            {heroContent.ctaPrimary.label} <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
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
              <p className="text-lg font-bold text-white sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] leading-4 text-blue-100 sm:text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
}
