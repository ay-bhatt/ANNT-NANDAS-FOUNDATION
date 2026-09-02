"use client";

import Image from "next/image";
import { HOME_OVERVIEW } from "@/lib/agent/pages";
import type { ImageSrc } from "@/lib/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function HomeOverviewSection({
  images,
}: {
  images: { src: ImageSrc; label: string }[];
}) {
  const { t } = useI18n();
  const primary = images[0];
  const secondary = images[1];

  return (
    <section className="section-padding bg-white px-3 sm:px-5">
      <div className="container-premium grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="min-w-0">
          <p className="section-label">{t(HOME_OVERVIEW.eyebrow)}</p>
          <h2 className="max-w-3xl text-balance text-3xl font-bold leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
            {t(HOME_OVERVIEW.title)}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
            {HOME_OVERVIEW.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{t(paragraph)}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {HOME_OVERVIEW.pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-base font-semibold text-slate-950">{t(pillar.title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t(pillar.body)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative min-h-[420px] pb-8">
          {primary ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
              <Image src={primary.src} alt={t(primary.label)} fill sizes="(max-width: 1023px) 100vw, 42vw" className="object-cover" />
            </div>
          ) : null}
          {secondary ? (
            <div className="absolute -bottom-6 right-0 hidden w-[58%] overflow-hidden rounded-[28px] border-4 border-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:block">
              <div className="relative aspect-[4/3]">
                <Image src={secondary.src} alt={t(secondary.label)} fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
