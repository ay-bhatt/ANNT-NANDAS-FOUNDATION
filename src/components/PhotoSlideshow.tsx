"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SlideshowPhoto } from "@/lib/types";

const SLIDE_INTERVAL_MS = 3000;

interface PhotoSlideshowProps {
  photos: SlideshowPhoto[];
  fill?: boolean;
  showThumbs?: boolean;
}

export default function PhotoSlideshow({ photos, fill = false, showThumbs = false }: PhotoSlideshowProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [timerEpoch, setTimerEpoch] = useState(0);
  const total = photos.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      setIndex(((nextIndex % total) + total) % total);
      setTimerEpoch((value) => value + 1);
    },
    [total],
  );

  useEffect(() => {
    if (total <= 1) return;

    const timerId = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, SLIDE_INTERVAL_MS);

    return () => {
      window.clearInterval(timerId);
    };
  }, [total, timerEpoch]);

  if (total === 0) return null;

  const current = photos[index];

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] ${
        fill ? "flex h-full min-h-[22rem] flex-col" : ""
      }`}
    >
      <div className={fill ? "relative min-h-[18rem] flex-1" : "relative aspect-[16/10] w-full"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src + index}
            className="absolute inset-0"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeInOut" }}
          >
            <Image
              src={current.src}
              alt={current.label}
              fill
              sizes="(max-width: 1279px) 100vw, 52vw"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-200">Photos</p>
              <p className="mt-2 text-sm font-semibold sm:text-base">{current.label}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="sr-only" aria-live="polite">
          Photo {index + 1} of {total}: {current.label}
        </p>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur-sm transition hover:bg-slate-950/75"
        >
          <span aria-hidden="true">‹</span>
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/55 text-white backdrop-blur-sm transition hover:bg-slate-950/75"
        >
          <span aria-hidden="true">›</span>
        </button>

        <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5 px-4">
          {photos.map((photo, photoIndex) => (
            <button
              key={`${photo.label}-${photoIndex}`}
              type="button"
              aria-label={`Show photo ${photoIndex + 1}: ${photo.label}`}
              aria-current={photoIndex === index ? true : undefined}
              onClick={() => goTo(photoIndex)}
              className={`h-2 rounded-full transition-all ${
                photoIndex === index ? "w-6 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {showThumbs ? (
        <div className="grid grid-cols-3 gap-2 bg-white p-3">
          {photos.slice(0, 6).map((photo, photoIndex) => (
            <button
              key={`${photo.label}-thumb-${photoIndex}`}
              type="button"
              aria-label={`Show photo ${photoIndex + 1}: ${photo.label}`}
              aria-current={photoIndex === index ? true : undefined}
              onClick={() => goTo(photoIndex)}
              className={`relative aspect-[5/3] overflow-hidden rounded-xl border-2 transition ${
                photoIndex === index ? "border-emerald-500" : "border-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={photo.src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
