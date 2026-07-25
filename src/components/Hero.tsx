"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { impactStats } from "@/lib/data";

const stats = impactStats.slice(0, 5);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Himalayan Background Image */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80')] bg-cover bg-center bg-no-repeat" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Tiny label */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-semibold tracking-[0.15em] uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-nature-400" />
              From the Heart of the Himalayas
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-poppins text-white leading-[1.1] mb-6">
              Building Futures{" "}
              <span className="text-nature-400">Without Limits</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white/70 font-inter leading-relaxed mb-4 max-w-lg">
              Empowering Communities | Discovering Talent | Creating Opportunities
            </p>
            <p className="text-sm text-white/50 font-inter leading-relaxed mb-8 max-w-lg">
              Transforming lives through education, sports, environment, health and self-development across Himalayan communities.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/volunteer-registration"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary-600 font-semibold text-sm hover:bg-white/90 hover:shadow-lg transition-all duration-300"
              >
                Become Volunteer
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 hover:shadow-lg transition-all duration-300"
              >
                Donate Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-20 h-20 mx-auto mb-4 text-primary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-primary-400 font-medium text-lg font-poppins">Himalayan Community</p>
                    <p className="text-primary-300 text-sm mt-1">Hero Image</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Statistics Bar - Below hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold font-poppins text-primary-600">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 font-inter mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}