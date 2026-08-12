"use client";

/**
 * Home story-journey section — Client Component.
 * Renders the milestone timeline (story chapters) next to a
 * responsive visual image grid.
 *
 * Data is passed as props; no direct imports from lib/data.
 */

import { motion } from "framer-motion";
import { ImageCard, SectionHeading } from "@/components/site/SectionBlocks";
import type { StoryChapter, ImageSrc } from "@/lib/types";

interface StoryJourneySectionProps {
  storyChapters: StoryChapter[];
  homeVisualGrid: ImageSrc[];
}

export default function StoryJourneySection({
  storyChapters,
  homeVisualGrid,
}: StoryJourneySectionProps) {
  return (
    <section className="section-padding px-3 sm:px-5">
      <div className="container-premium grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Our Journey"
            title="Built step by step through service and consistency"
          />
          <div className="space-y-4">
            {storyChapters.map((chapter, index) => (
              <motion.div
                key={chapter.title}
                className="surface-card flex gap-4 p-5"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 font-bold text-emerald-700">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">{chapter.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {chapter.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {homeVisualGrid.map((image, index) => (
            <ImageCard
              key={index}
              image={image}
              title={`Impact story ${index + 1}`}
              className={index === 0 ? "sm:col-span-2" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
