"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { DonationCategory } from "@/lib/types";
import { SectionHeading } from "@/components/site/SectionBlocks";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface DonationCategoriesSectionProps {
  categories: DonationCategory[];
  paymentHref?: string;
}

export default function DonationCategoriesSection({
  categories,
  paymentHref = "#upi-donation-widget",
}: DonationCategoriesSectionProps) {
  const { t, localize } = useI18n();
  const localizedCategories = localize(categories);

  return (
    <section
      id="donation-categories"
      className="section-padding anchor-offset bg-slate-50/80 px-3 sm:px-5"
      aria-labelledby="purpose-donation-heading"
    >
      <div className="container-premium">
        <SectionHeading
          eyebrow="Purpose-Based Donation"
          title="See how your donation supports specific Foundation activities"
          description="Every contribution helps strengthen grassroots work across sports, education, mobility, environmental care, and community development."
          centered
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {localizedCategories.map((category, index) => {
            const spanClass =
              index < 3
                ? "lg:col-span-2"
                : index === 3
                  ? "lg:col-span-3"
                  : "md:col-span-2 lg:col-span-3";

            return (
              <motion.article
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className={`surface-card flex flex-col overflow-hidden ${spanClass}`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-950/75 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-sm">
                      {t("Category")} {category.code}
                    </span>
                  </div>
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold leading-snug text-white sm:text-2xl">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-sm leading-7 text-slate-600">{category.description}</p>

                  <div className="mt-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-800">
                      {t("Supported Activities")}
                    </p>
                    <ul className="mt-2.5 flex flex-wrap gap-2">
                      {category.activities.map((activity) => (
                        <li
                          key={activity}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/70 px-3 py-1 text-xs font-semibold text-slate-800"
                        >
                          <span className="text-emerald-600" aria-hidden="true">
                            ✓
                          </span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <Link href={paymentHref} className="btn-primary w-full sm:w-auto">
                      {category.ctaLabel} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
