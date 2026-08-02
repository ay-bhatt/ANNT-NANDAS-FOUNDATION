"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { newsItems } from "@/lib/data";
import news01 from "@/assets/news/news-001.jpg.jpeg";
import news02 from "@/assets/news/news-002.jpg.jpeg";
import news03 from "@/assets/news/news-003.jpg.jpeg";

export default function NewsSection() {
  const items = newsItems.slice(0, 3);
  const newsImages = [news01, news02, news03];

  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            News & Updates
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Latest{" "}
            <span className="text-primary-500">News</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image src={newsImages[i]} alt={item.category} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs text-gray-400 font-inter mb-2">{item.date}</p>
                <h3 className="text-base font-bold font-poppins text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 font-inter line-clamp-2">{item.summary}</p>
                <Link
                  href="/news"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
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
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
          >
            View All News
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}