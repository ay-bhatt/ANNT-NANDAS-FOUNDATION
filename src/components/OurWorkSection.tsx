"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const workItems = [
  {
    title: "Sports Development",
    description: "Building champions through athletics, cycling, running, mountaineering, and adventure sports. Creating opportunities for rural children to compete at national levels.",
    image: "Sports Training",
  },
  {
    title: "Education",
    description: "Academic support, digital literacy, computer education, spoken English, career counselling, and competitive exam preparation for rural youth.",
    image: "Education Program",
  },
  {
    title: "Healthcare",
    description: "Free health camps, medical awareness, nutrition education, hygiene awareness, women's health programmes, and mental health support.",
    image: "Health Camp",
  },
  {
    title: "Environment",
    description: "Tree plantation drives, forest conservation, plastic-free campaigns, waste management, climate awareness, and eco-friendly practices.",
    image: "Environment",
  },
  {
    title: "Women Empowerment",
    description: "Women's empowerment programmes, self-defence training, leadership development, gender equality campaigns, and skill development initiatives.",
    image: "Women Empowerment",
  },
  {
    title: "Livelihood",
    description: "Skill development, employment readiness, entrepreneurship support, financial literacy, and rural enterprise promotion for self-reliance.",
    image: "Livelihood",
  },
];

export default function OurWorkSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Our{" "}
            <span className="text-primary-500">Work</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto font-inter">
            Creating lasting change through holistic community development across the Himalayas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="aspect-video overflow-hidden">
                <ImagePlaceholder label={item.image} aspectRatio="video" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 font-inter line-clamp-3">
                  {item.description}
                </p>
                <Link
                  href="/our-work"
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
      </div>
    </section>
  );
}