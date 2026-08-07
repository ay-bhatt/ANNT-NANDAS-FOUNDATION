"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { impactStats } from "@/lib/data";

// 1. Import all images directly from your src/assets/hero folder
// Make sure the file names match exactly what is in your folder (including spaces and parentheses)
import img1 from "../assets/hero/gallery (3).jpeg";
import img2 from "../assets/hero/hero-002.png";
import img3 from "../assets/hero/HERO ().png";
import img4 from "../assets/hero/HERO (1).jpeg";
import img5 from "../assets/hero/HERO (4).jpeg";
import img6 from "../assets/hero/HERO.jpeg";
import img7 from "../assets/hero/HERO (2).jpeg";
import img8 from "../assets/hero/HERO (3).jpeg";

const stats = impactStats.slice(0, 5);

// 2. Extract the .src property from the imported Next.js image objects
const backgroundImages = [
  img1.src,
  img2.src,
  img3.src,
  img4.src,
  img5.src,
  img6.src,
  img7.src,
  img8.src,
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to handle the 3-second slide transition
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-end overflow-hidden bg-slate-950 text-white">
      {/* --- Background Slideshow --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImages[currentImageIndex]}')`,
            }}
          />
        </AnimatePresence>
        
        {/* Overlays for text readability and blending */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* --- Hero Content --- */}
      <div className="container-premium relative z-10 pb-12 pt-24 lg:pb-16 lg:pt-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 shadow-lg backdrop-blur-md">
              <span className="shadow-glow block h-2.5 w-2.5 rounded-full bg-success-400" />
              From the Heart of the Himalayas
            </div>
            <h1 className="mt-8 text-4xl font-black leading-[0.95] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
              Building Futures <span className="text-success-400 drop-shadow-md">Without Limits</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 drop-shadow-md sm:text-lg">
              Empowering communities through sports, education, healthcare, and environment initiatives that help every talent thrive.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/volunteer-registration"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Become a Volunteer
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-success-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-success-600/20 transition hover:-translate-y-0.5 hover:bg-success-700"
              >
                Donate Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="relative hidden lg:block"
          >

          </motion.div>
        </div>
      </div>

      {/* --- Stats Section --- */}
      <div className="container-premium relative z-10 pb-12">
        <motion.div
          className="mx-auto grid max-w-5xl gap-4 rounded-[28px] border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-slate-100 p-4 text-center transition hover:bg-slate-200">
                <p className="text-2xl font-bold text-slate-950 sm:text-3xl">{stat.value.toLocaleString()}{stat.suffix}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}