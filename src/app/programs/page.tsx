"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const programs = [
  {
    title: "Sports Development",
    icon: "🏆",
    image: "Sports Training",
    points: ["Athletics & Marathon Training", "Cycling & Mountaineering", "Football & Traditional Sports", "Sports Equipment Distribution", "National Level Competition Prep"],
  },
  {
    title: "Education",
    icon: "📚",
    image: "Education Program",
    points: ["Digital Literacy Classes", "Spoken English Training", "Computer Education", "Career Counselling", "Exam Preparation Support"],
  },
  {
    title: "Healthcare",
    icon: "❤️",
    image: "Health Camp",
    points: ["Free Health Check-up Camps", "Nutrition & Hygiene Awareness", "Women's Health Programs", "Mental Health Support", "Medical Camp Organization"],
  },
  {
    title: "Environment",
    icon: "🌱",
    image: "Environment",
    points: ["Tree Plantation Drives", "Plastic-Free Campaigns", "Waste Management Training", "Climate Change Awareness", "Forest Conservation"],
  },
  {
    title: "Women Empowerment",
    icon: "👩",
    image: "Women Empowerment",
    points: ["Self-Defence Training", "Leadership Development", "Skill Building Workshops", "Gender Equality Campaigns", "Entrepreneurship Support"],
  },
  {
    title: "Agriculture & Livelihood",
    icon: "🌾",
    image: "Livelihood",
    points: ["Organic Farming Promotion", "Kitchen Garden Initiative", "Skill Training Programs", "Employment Readiness", "Rural Enterprise Development"],
  },
];

export default function ProgramsPage() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-200 font-semibold text-sm tracking-wider uppercase mb-4 font-inter">Our Programs</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-4">
            Comprehensive{" "}
            <span className="text-nature-400">Development</span>
          </h1>
          <p className="text-primary-200 max-w-2xl mx-auto font-inter text-lg">
            Holistic programs designed to empower individuals and communities.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, i) => (
              <motion.div
                key={program.title}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="lg:w-1/2">
                  <ImagePlaceholder label={program.image} aspectRatio="landscape" />
                </div>
                <div className="lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{program.icon}</span>
                    <h2 className="text-2xl md:text-3xl font-bold font-poppins text-gray-900">{program.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {program.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-gray-600 font-inter">
                        <svg className="w-5 h-5 text-nature-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Support Our Programs</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto font-inter">Your contribution helps us run these programs effectively.</p>
          <Link href="/donate" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 transition-all duration-300 shadow-sm">
            Donate Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}