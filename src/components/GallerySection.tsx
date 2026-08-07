"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Statically importing images
import gallery01 from "@/assets/gallery/gallery-014.jpg.jpeg";
import gallery02 from "@/assets/gallery/gallery-015.jpg.jpeg";
import gallery03 from "@/assets/gallery/gallery-016.jpg.jpeg";
import gallery04 from "@/assets/gallery/gallery-017.jpg.jpeg";
import gallery05 from "@/assets/gallery/gallery-018.jpg.jpeg";
import gallery06 from "@/assets/gallery/gallery-019.jpg.jpeg";
import gallery07 from "@/assets/gallery/gallery-020.jpg.jpeg";
import gallery08 from "@/assets/gallery/gallery-021.jpg.jpeg";

const galleryItems = [
  { category: "Events", label: "Sports Event", img: gallery01 },
  { category: "Community", label: "Community Program", img: gallery02 },
  { category: "Events", label: "Education Camp", img: gallery03 },
  { category: "Community", label: "Tree Plantation", img: gallery04 },
  { category: "Community", label: "Health Camp", img: gallery05 },
  { category: "Events", label: "Cultural Event", img: gallery06 },
  { category: "Events", label: "Sports Training", img: gallery07 },
  { category: "Community", label: "Village Visit", img: gallery08 },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const tabs = ["All", "Events", "Community"];

  // Filtering logic based on the active tab
  const filteredItems =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  return (
    <section className="section-padding bg-gray-50 py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            Gallery
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Our <span className="text-primary-500">Gallery</span>
          </h2>
        </div>

        {/* --- Tabs --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Gallery Grid --- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.slice(0, 8).map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedImage(i)}
              >
                <div className="relative aspect-square overflow-hidden bg-gray-200">
                  <Image
                    // Using .src safely extracts the string URL if the object wrapper causes issues
                    src={typeof item.img === "object" ? item.img.src : item.img}
                    alt={item.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- View Full Gallery Button --- */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
          >
            View Full Gallery
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* --- Lightbox --- */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="max-w-4xl w-full rounded-2xl overflow-hidden relative aspect-video bg-black/50"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={
                  typeof filteredItems[selectedImage]?.img === "object"
                    ? filteredItems[selectedImage].img.src
                    : filteredItems[selectedImage]?.img
                }
                alt={filteredItems[selectedImage]?.label || "Gallery Image"}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
            <button
              className="absolute top-6 right-6 text-white text-3xl hover:opacity-70 transition-opacity"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}