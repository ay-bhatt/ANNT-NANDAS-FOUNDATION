"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { newsItems } from "@/lib/data";

export default function NewsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-200 font-semibold text-sm tracking-wider uppercase mb-4 font-inter">News & Updates</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-4">
            Latest{" "}
            <span className="text-nature-400">News</span>
          </h1>
          <p className="text-primary-200 max-w-2xl mx-auto font-inter text-lg">
            Stay updated with our latest stories and announcements.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ImagePlaceholder label={item.category} aspectRatio="video" />
                <div className="p-5">
                  <span className="text-xs text-primary-500 font-semibold bg-primary-50 px-3 py-1 rounded-full">{item.category}</span>
                  <p className="text-xs text-gray-400 font-inter mt-3 mb-2">{item.date}</p>
                  <h3 className="text-base font-bold font-poppins text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 font-inter">{item.summary}</p>
                  <Link href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors">
                    Read More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}