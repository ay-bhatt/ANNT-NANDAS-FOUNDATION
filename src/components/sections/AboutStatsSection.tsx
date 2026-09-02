"use client";

import { ImageCard, SectionHeading } from "@/components/site/SectionBlocks";
import type { HeroContent, FounderInfo, ImpactStat, ImageSrc } from "@/lib/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface AboutStatsSectionProps {
  heroContent: HeroContent;
  founderInfo: FounderInfo;
  impactStats: ImpactStat[];
  collageImages: ImageSrc[];
  communityImage?: ImageSrc;
}

export default function AboutStatsSection({
  heroContent,
  founderInfo,
  impactStats,
  collageImages,
  communityImage,
}: AboutStatsSectionProps) {
  const { t, localize } = useI18n();
  const stats = localize(impactStats);
  const quote = t(founderInfo.quote);
  return (
    <section className="section-padding bg-slate-50 px-3 sm:px-5">
      <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="A movement for generations to come"
            description={t(heroContent.description)}
          />
          <blockquote className="rounded-[28px] border border-emerald-100 bg-white p-6 text-slate-700 shadow-sm">
            <p className="text-lg italic leading-8">“{quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-emerald-700">— {founderInfo.name}</footer>
          </blockquote>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.slice(0, 4).map((stat) => (
            <div key={stat.label} className="surface-card p-6">
              <p className="text-4xl font-bold tracking-[-0.03em] text-slate-950">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
            </div>
          ))}
          <div className="sm:col-span-2">
            <ImageCard
              image={communityImage || collageImages[0]}
              title="Rooted in the community"
              subtitle="A village classroom — discovering the gift in every child."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
