"use client";

/**
 * Shared UI building blocks — Client Components.
 *
 * `framer-motion` motion primitives hydrate client-side automatically.
 * Image props accept `string | StaticImageData`.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { StaticImageData } from "next/image";
import CountUp from "./CountUp";

type ImgSrc = string | StaticImageData;

export function PageHero({ eyebrow, title, description, image, actions }: { eyebrow: string; title: string; description: string; image: ImgSrc; actions?: { label: string; href: string; variant?: "primary" | "secondary" }[]; }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-3 pb-10 pt-12 text-white sm:px-5 sm:pb-12 sm:pt-16 lg:pt-20">
      <div className="container-premium">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="py-4 lg:py-8">
            <span className="section-label-dark">{eyebrow}</span>
            <h1 className="display-title-dark">{title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
            {actions && actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <Link key={action.href + action.label} href={action.href} className={action.variant === "secondary" ? "btn-secondary" : "btn-primary"}>
                    {action.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white/10 shadow-[0_18px_60px_rgba(2,6,23,0.28)]">
              <Image src={image} alt={title} fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, centered = false, dark = false }: { eyebrow: string; title: string; description?: string; centered?: boolean; dark?: boolean; }) {
  return (
    <div className={centered ? "mx-auto mb-8 max-w-3xl text-center" : "mb-6 max-w-3xl"}>
      <span className={dark ? "section-label-dark" : "section-label"}>{eyebrow}</span>
      <h2 className={`text-balance text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl ${dark ? "text-white" : "text-slate-950"}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-8 ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p> : null}
    </div>
  );
}

export function StatGrid({ stats, dark = false }: { stats: { label: string; value: string; icon?: string }[]; dark?: boolean; }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
          className={dark ? "rounded-[24px] border border-white/10 bg-white/5 p-5" : "surface-card p-5"}
        >
          <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${dark ? "bg-white/10" : "bg-emerald-50"}`}>
            {iconSymbol(stat.icon)}
          </div>
          <p className={`text-3xl font-bold tracking-[-0.03em] ${dark ? "text-white" : "text-slate-950"}`}>
            <CountUp value={stat.value} />
          </p>
          <p className={`mt-2 text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function ImageCard({ image, title, subtitle, alt, className = "" }: { image: ImgSrc; title?: string; subtitle?: string; alt?: string; className?: string; }) {
  const hasCaption = Boolean(title || subtitle);

  return (
    <div className={`group relative overflow-hidden rounded-[28px] shadow-[0_14px_40px_rgba(15,23,42,0.10)] ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
        <Image
          src={image}
          alt={alt || title || "ANNT NANDAS FOUNDATION"}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 40vw"
          className="object-cover object-center"
        />
        {hasCaption ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              {title ? <p className="text-lg font-semibold">{title}</p> : null}
              {subtitle ? <p className="mt-1 text-sm text-slate-200">{subtitle}</p> : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function CTASection({ title, description, primary, secondary, image }: { title: string; description: string; primary: { label: string; href: string }; secondary?: { label: string; href: string }; image: ImgSrc; }) {
  return (
    <section className="section-padding px-3 sm:px-5">
      <div className="container-premium">
        <div className="grid overflow-hidden rounded-[32px] bg-slate-950 text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <span className="section-label-dark">Join Us</span>
            <h2 className="text-balance text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primary.href} className="btn-primary">{primary.label}</Link>
              {secondary ? <Link href={secondary.href} className="btn-secondary">{secondary.label}</Link> : null}
            </div>
          </div>
          <div className="relative aspect-[16/10] min-h-[220px] lg:aspect-auto lg:min-h-full">
            <Image src={image} alt={title} fill sizes="(max-width: 1023px) 100vw, 45vw" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-950/40" />
          </div>
        </div>
      </div>
    </section>
  );
}

function iconSymbol(icon?: string) {
  switch (icon) {
    case "villages":
      return "🏘️";
    case "children":
      return "🧒";
    case "events":
      return "📅";
    case "volunteers":
      return "🤝";
    case "trees":
      return "🌿";
    case "partners":
      return "🌟";
    default:
      return "✨";
  }
}
