"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const items = [
  { icon: "📚", text: "Support Education" },
  { icon: "🌳", text: "Plant Trees" },
  { icon: "⚽", text: "Empower Youth" },
  { icon: "❤️", text: "Support Health" },
];

export default function DonationStrip() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <motion.div
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {items.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-primary-600 font-semibold text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Donate Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}