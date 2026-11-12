"use client";

/**
 * Home news + gallery preview — Client Component.
 * The photos column stretches to match the news list so the layout stays even.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/site/SectionBlocks";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import NewsCardGrid from "@/components/news/NewsCardGrid";
import type { NewsItem, SlideshowPhoto } from "@/lib/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface NewsGalleryPreviewSectionProps {
  newsItems: NewsItem[];
  slideshowPhotos: SlideshowPhoto[];
}

export default function NewsGalleryPreviewSection({
  newsItems,
  slideshowPhotos,
}: NewsGalleryPreviewSectionProps) {
  const { t } = useI18n();
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
          <NewsCardGrid items={newsItems} variant="stacked" />
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
              {t("View full gallery")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
