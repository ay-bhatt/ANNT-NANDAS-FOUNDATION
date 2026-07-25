"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const impactAreas = [
  {
    title: "Sports",
    icon: "🏆",
    description: "Building champions through athletics, cycling, running, and adventure sports.",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Education",
    icon: "📚",
    description: "Academic support, digital literacy, and career counselling for rural youth.",
    color: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    title: "Healthcare",
    icon: "❤️",
    description: "Free health camps, medical awareness, nutrition, and hygiene education.",
    color: "from-red-500 to-red-600",
    bgLight: "bg-red-50",
    textColor: "text-red-600",
  },
  {
    title: "Environment",
    icon: "🌱",
    description: "Tree plantation, forest conservation, plastic-free campaigns, and waste management.",
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Women Empowerment",
    icon: "👩",
    description: "Self-defence training, leadership development, and skill development initiatives.",
    color: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    title: "Livelihood",
    icon: "💼",
    description: "Skill development, employment readiness, and entrepreneurship support.",
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
  },
];

export default function ImpactSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            Our Impact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Areas Where We{" "}
            <span className="text-primary-500">Create Impact</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto font-inter">
            Creating lasting change through holistic community development across the Himalayas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactAreas.map((area, i) => (
            <motion.div
              key={area.title}
              className={`rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${area.bgLight}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                <span className="drop-shadow-sm">{area.icon}</span>
              </div>
              <h3 className={`text-lg font-bold font-poppins mb-2 ${area.textColor}`}>
                {area.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed font-inter">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
          >
            View All Programmes
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}