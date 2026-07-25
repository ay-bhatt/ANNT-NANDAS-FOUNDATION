"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const galleryItems = [
  { label: "Sports Event", category: "Sports" },
  { label: "Community Program", category: "Community" },
  { label: "Education Camp", category: "Education" },
  { label: "Tree Plantation", category: "Environment" },
  { label: "Health Camp", category: "Events" },
  { label: "Cultural Event", category: "Events" },
  { label: "Sports Training", category: "Sports" },
  { label: "Village Visit", category: "Community" },
  { label: "Women Empowerment", category: "Education" },
  { label: "Award Ceremony", category: "Events" },
  { label: "Marathon", category: "Sports" },
  { label: "Awareness Camp", category: "Environment" },
];

const categories = ["All", "Sports", "Events", "Community", "Environment", "Education"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const visibleItems = filtered.slice(0, visibleCount);

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-200 font-semibold text-sm tracking-wider uppercase mb-4 font-inter">Gallery</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-4">
            Our{" "}
            <span className="text-nature-400">Gallery</span>
          </h1>
          <p className="text-primary-200 max-w-2xl mx-auto font-inter text-lg">
            Capturing moments of impact and transformation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(8); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary-500 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleItems.map((item, i) => (
              <motion.div
                key={`${item.label}-${i}`}
                className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setSelectedImage(i)}
              >
                <ImagePlaceholder label={item.label} aspectRatio="square" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filtered.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filtered.length))}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
              >
                Load More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="max-w-3xl w-full rounded-2xl overflow-hidden"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ImagePlaceholder label={galleryItems[selectedImage]?.label || "Gallery"} aspectRatio="landscape" />
            </motion.div>
            <button className="absolute top-6 right-6 text-white text-2xl hover:opacity-70" onClick={() => setSelectedImage(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}