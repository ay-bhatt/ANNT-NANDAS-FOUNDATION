"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryItem } from "@/lib/types";

interface GalleryGridProps {
  items: GalleryItem[];
  categories: string[];
}

function PlayIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
    </svg>
  );
}

export default function GalleryGrid({ items, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    if (activeCategory === "Photos") return items.filter((item) => item.type === "photo");
    return items.filter((item) => item.type === "video");
  }, [activeCategory, items]);

  const selected = selectedIndex !== null ? filteredItems[selectedIndex] : null;
  const isVideo = Boolean(selected?.type === "video" && selected.videoSrc);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedIndex]);

  useEffect(() => {
    if (!isVideo) videoRef.current?.pause();
  }, [isVideo, selectedIndex]);

  return (
    <>
      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedIndex(null);
                }}
                aria-pressed={activeCategory === category}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-slate-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <motion.button
                key={`${item.label}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                onClick={() => setSelectedIndex(index)}
                aria-label={item.type === "video" ? `Play ${item.label}` : `Open ${item.label}`}
                className={`group relative overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] ${index % 7 === 0 ? "min-[390px]:col-span-2 md:col-span-2 md:row-span-2" : ""}`}
              >
                <div className={`relative ${index % 7 === 0 ? "aspect-[16/14] h-full min-h-[240px]" : "aspect-square"}`}>
                  {item.type === "video" && item.videoSrc ? (
                    <video
                      src={item.videoSrc}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : item.imageSrc ? (
                    <Image src={item.imageSrc} alt={item.label} fill sizes="(max-width: 389px) 100vw, (max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-80" />
                  {item.type === "video" ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-slate-950 shadow-lg transition duration-200 group-hover:scale-110">
                        <PlayIcon className="h-6 w-6 translate-x-0.5" />
                      </span>
                    </div>
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white">
                    <p className="text-xs uppercase tracking-[0.22em] text-emerald-200">
                      {item.type === "video" ? "Video" : item.theme}
                    </p>
                    <p className="mt-2 text-sm font-semibold sm:text-base">{item.label}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/88 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.label}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0.85 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo ? (
                <div className="relative aspect-video bg-black">
                  <video
                    ref={videoRef}
                    src={selected.videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-contain"
                  >
                    Your browser does not support this video.
                  </video>
                </div>
              ) : selected.imageSrc ? (
                <div className="relative aspect-[16/10]">
                  <Image
                    src={selected.imageSrc}
                    alt={selected.label}
                    fill
                    sizes="(max-width: 1023px) 100vw, 1024px"
                    className="object-contain"
                  />
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4 p-5 text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                    {selected.theme}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{selected.label}</h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="Close viewer"
                  onClick={() => setSelectedIndex(null)}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
