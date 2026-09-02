"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { VisualMoment } from "@/lib/types";

export default function HomeMomentsSection({ moments }: { moments: VisualMoment[] }) {
  const items = moments.slice(0, 6);

  return (
    <section className="bg-slate-950 px-3 py-10 sm:px-5 sm:py-14">
      <div className="container-premium">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label-dark">From the field</p>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
              Every photograph is a different story
            </h2>
          </div>
          <Link href="/gallery" className="btn-secondary">
            Open the gallery
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {items.map((moment, index) => {
            const featured = index === 0;
            return (
              <motion.figure
                key={moment.src + moment.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-[24px] ${
                  featured ? "col-span-2 aspect-[16/11] md:row-span-2 md:aspect-auto md:min-h-[420px]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={moment.src}
                  alt={moment.label}
                  fill
                  sizes={featured ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 767px) 50vw, 25vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 text-sm font-semibold text-white sm:text-base">
                  {moment.label}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
