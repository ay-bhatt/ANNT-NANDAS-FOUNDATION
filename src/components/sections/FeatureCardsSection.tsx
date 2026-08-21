"use client";

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
    <section className="section-padding bg-white px-3 sm:px-5">
      <div className="container-premium">
        <SectionHeading
          eyebrow="What We Do"
          title="Creating opportunities. Changing lives."
          description="ANNT NANDAS FOUNDATION works across education, health, environment, sports, women empowerment, and community development with a strong local focus."
          centered
        />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="surface-card group min-w-0 overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={card.image}
                  alt={`${card.title} programme`}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-2xl transition group-hover:scale-105">{card.icon}</div>
                <h3 className="text-xl font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                <Link href={card.href} className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-emerald-700">
                  Explore {card.title} <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
