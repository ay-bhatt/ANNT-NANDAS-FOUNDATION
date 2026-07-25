"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const galleryItems = [
  { category: "All", label: "Sports Event", img: "Sports Event" },
  { category: "All", label: "Community Program", img: "Community Program" },
  { category: "All", label: "Education Camp", img: "Education Camp" },
  { category: "All", label: "Tree Plantation", img: "Tree Plantation" },
  { category: "All", label: "Health Camp", img: "Health Camp" },
  { category: "All", label: "Cultural Event", img: "Cultural Event" },
  { category: "All", label: "Sports Training", img: "Sports Training" },
  { category: "All", label: "Village Visit", img: "Village Visit" },
  { category: "All", label: "Women Empowerment", img: "Women Empowerment" },
  { category: "All", label: "Award Ceremony", img: "Award Ceremony" },
  { category: "All", label: "Marathon", img: "Marathon" },
  { category: "All", label: "Awareness Camp", img: "Awareness Camp" },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const tabs = ["All", "Videos", "Events"];

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            Gallery
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Our{" "}
            <span className="text-primary-500">Gallery</span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.slice(0, 8).map((item, i) => (
            <motion.div
              key={i}
              className="relative rounded-xl overflow-hidden cursor-pointer group shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => setSelectedImage(i)}
            >
              <ImagePlaceholder label={item.label} aspectRatio="square" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

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
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

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
            <button
              className="absolute top-6 right-6 text-white text-2xl hover:opacity-70"
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