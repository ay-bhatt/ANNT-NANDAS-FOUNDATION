"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    title: "Empower Communities",
    desc: "Building self-reliant Himalayan villages"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Discover Talent",
    desc: "Finding hidden potential in every child"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Create Opportunities",
    desc: "Opening doors to education and sports"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Build Tomorrow",
    desc: "Sustainable development for generations"
  }
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image Collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <ImagePlaceholder label="Himalayan Community" aspectRatio="square" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <ImagePlaceholder label="Children Education" aspectRatio="video" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-xl overflow-hidden shadow-md">
                  <ImagePlaceholder label="Sports Training" aspectRatio="portrait" />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md">
                  <ImagePlaceholder label="Tree Plantation" aspectRatio="square" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight mb-4">
              A Movement for{" "}
              <span className="text-primary-500">Generations to Come</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 font-inter">
              ANNT NANDAS FOUNDATION is dedicated to transforming lives of children and communities 
              through education, sports, environment, health and self development.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8 font-inter">
              Founded on Kalam Singh Bisht's vision, we started with 2 bicycles and 12 children
              in Mundoli, Chamoli. Today, we reach over 1,300 children across 48+ villages,
              creating pathways towards self-reliance and excellence.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold font-poppins text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 font-inter">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
            >
              Know More About Us
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