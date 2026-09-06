"use client";

/**
 * Home news + gallery preview — Client Component.
 * The photos column stretches to match the news list so the layout stays even.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionBlocks";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import type { NewsItem, SlideshowPhoto } from "@/lib/types";

interface NewsGalleryPreviewSectionProps {
  newsItems: NewsItem[];
  slideshowPhotos: SlideshowPhoto[];
}

export default function NewsGalleryPreviewSection({
  newsItems,
  slideshowPhotos,
}: NewsGalleryPreviewSectionProps) {
  return (
    <section id="home-news" className="section-padding anchor-offset bg-slate-50 px-3 sm:px-5">
      <div className="container-premium grid gap-8 xl:grid-cols-2 xl:items-stretch">
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Latest News"
            title="Stay updated with our activities"
          />
          <div className="flex flex-1 flex-col gap-4">
            {newsItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={item.title}
                className="surface-card flex flex-1 flex-col overflow-hidden sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="relative h-44 sm:h-auto sm:w-44 sm:shrink-0">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 639px) 100vw, 176px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                    {item.date}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-950 sm:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                  <Link
                    href="/news"
                    className="mt-4 inline-flex text-sm font-semibold text-blue-700 hover:text-emerald-700"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Photos"
            title="Real moments from the field"
          />
          <div className="flex min-h-[28rem] flex-1 flex-col">
            <PhotoSlideshow photos={slideshowPhotos} fill showThumbs />
            <Link href="/gallery" className="btn-outline-dark mt-4 w-full sm:w-auto">
              View full gallery
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
