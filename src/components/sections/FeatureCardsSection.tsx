"use client";

/**
 * Home feature cards section — Client Component.
 * Shows the four impact areas (Sports, Education, Healthcare, Environment)
 * as interactive cards with icons and links.
 *
 * Data is passed as props; no direct imports from lib/data.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionBlocks";
import type { FeatureCard } from "@/lib/types";

interface FeatureCardsSectionProps {
  featureCards: FeatureCard[];
}

export default function FeatureCardsSection({ featureCards }: FeatureCardsSectionProps) {
  return (
    <section className="section-padding overflow-hidden bg-white px-3 sm:px-5">
      <div className="container-premium">
        <SectionHeading
          eyebrow="What We Do"
          title="Creating opportunities. Changing lives."
          description={
            "ANNT NANDAS FOUNDATION works across education, health, environment, sports, women empowerment, and community development with a strong local focus."
          }
          centered
        />
        <div className="-mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 pb-5 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="surface-card group min-w-[84%] snap-center overflow-hidden min-[430px]:min-w-[72%] md:min-w-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={card.image} alt={`${card.title} programme`} fill sizes="(max-width: 767px) 84vw, (max-width: 1279px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-2xl transition group-hover:-rotate-3 group-hover:scale-105">{card.icon}</div>
                <h3 className="text-xl font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-emerald-700"
                >
                    Explore program <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
