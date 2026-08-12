"use client";

/**
 * Home news + gallery preview — Client Component.
 * Left column: latest 3 news items with image, date, summary.
 * Right column: responsive image grid + “View full gallery” link.
 *
 * Data is passed as props; no direct imports from lib/data.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionBlocks";
import type { NewsItem, ImageSrc } from "@/lib/types";

interface NewsGalleryPreviewSectionProps {
  newsItems: NewsItem[];
  collageImages: ImageSrc[];
  homeVisualGrid: ImageSrc[];
}

export default function NewsGalleryPreviewSection({
  newsItems,
  collageImages,
  homeVisualGrid,
}: NewsGalleryPreviewSectionProps) {
  const galleryImages = [...homeVisualGrid, ...collageImages.slice(0, 2)];

  return (
    <section className="section-padding bg-slate-50 px-3 sm:px-5">
      <div className="container-premium grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
        {/* ── News ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Latest News"
            title="Stay updated with our activities"
          />
          <div className="space-y-4">
            {newsItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.title}
                className="surface-card flex flex-col gap-4 overflow-hidden sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="relative h-56 sm:h-auto sm:w-56 sm:shrink-0">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 639px) 100vw, 224px" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {item.date}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.summary}</p>
                  <Link
                    href="/news"
                    className="mt-5 inline-flex text-sm font-semibold text-blue-700 hover:text-emerald-700"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Gallery ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Gallery"
            title="Real moments from the field"
          />
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-[24px] ${
                  index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                <Image src={image} alt={`Foundation field activity ${index + 1}`} fill sizes={index === 0 ? "(max-width: 1279px) 100vw, 52vw" : "(max-width: 1279px) 50vw, 26vw"} className="object-cover transition duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
          <Link href="/gallery" className="btn-outline-dark mt-6">
            View full gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
