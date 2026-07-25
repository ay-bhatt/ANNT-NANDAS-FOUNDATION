"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";
import { partners } from "@/lib/data";

export default function PartnersSection() {
  return (
    <section className="section-padding bg-white" id="partners">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionBadge>Partners</SectionBadge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-gray-900 leading-tight mb-4">
            Together We{" "}
            <span className="gradient-text">Create Change</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-inter">
            Collaborating with organizations that share our vision for Himalayan community development.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              className="glass-card p-6 flex flex-col items-center justify-center text-center h-full min-h-[140px] group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-3 group-hover:from-primary-50 group-hover:to-nature-50 transition-colors duration-300">
                <svg className="w-7 h-7 text-gray-300 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Future Partner Logo
              </p>
              <p className="text-xs text-gray-500 font-inter">{partner.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}