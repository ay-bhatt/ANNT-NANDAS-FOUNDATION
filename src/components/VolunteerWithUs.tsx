"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const benefits = [
  { icon: "🌟", title: "Make a Difference", desc: "Directly impact lives of children and communities in the Himalayas." },
  { icon: "🤝", title: "Build Connections", desc: "Join a growing network of passionate changemakers and mentors." },
  { icon: "📚", title: "Learn & Grow", desc: "Develop leadership, communication, and community development skills." },
  { icon: "🏔️", title: "Himalayan Experience", desc: "Immerse yourself in the culture and beauty of the mountains." },
];

export default function VolunteerWithUs() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
              Join Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight mb-4">
              Volunteer{" "}
              <span className="text-primary-500">With Us</span>
            </h2>
            <p className="text-gray-500 mb-8 font-inter">
              Your time and skills can create lasting change. Join us in transforming lives across the Himalayas.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{benefit.icon}</span>
                  <div>
                    <h4 className="font-bold font-poppins text-gray-900 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-500 font-inter">{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/volunteer-registration"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
            >
              Register as Volunteer
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <ImagePlaceholder label="Volunteer with Us" aspectRatio="portrait" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}