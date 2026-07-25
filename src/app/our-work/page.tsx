"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const workItems = [
  {
    title: "Sports Development",
    description: "Building champions through athletics, cycling, running, mountaineering, and adventure sports. Creating opportunities for rural children to compete at national and international levels.",
    fullDesc: "We organize training camps, provide equipment, and facilitate exposure for young athletes. Our programs include athletics, cycling, marathon running, mountaineering, football, and traditional sports.",
  },
  {
    title: "Education",
    description: "Academic support, digital literacy, computer education, spoken English, career counselling, and competitive exam preparation for rural youth.",
    fullDesc: "We run learning centres, digital literacy programmes, spoken English classes, and career guidance sessions. Our goal is to bridge the educational gap between rural and urban India.",
  },
  {
    title: "Healthcare",
    description: "Free health camps, medical awareness, nutrition education, hygiene awareness, women's health programmes, and mental health support.",
    fullDesc: "Regular health check-up camps, awareness programmes on hygiene and nutrition, women's health initiatives, and mental health counselling sessions are conducted across villages.",
  },
  {
    title: "Environment",
    description: "Tree plantation drives, forest conservation, plastic-free campaigns, waste management, climate awareness, and eco-friendly community practices.",
    fullDesc: "We lead large-scale tree plantation drives, promote plastic-free villages, organize waste management training, and create awareness about climate change and conservation.",
  },
  {
    title: "Women Empowerment",
    description: "Women's empowerment programmes, self-defence training, leadership development, gender equality campaigns, and skill development initiatives.",
    fullDesc: "Self-defence workshops, leadership training, skill development programmes, and gender equality campaigns help women become self-reliant and confident.",
  },
  {
    title: "Agriculture & Livelihood",
    description: "Organic farming promotion, skill development, employment readiness, entrepreneurship support, and rural enterprise promotion.",
    fullDesc: "We promote organic farming, kitchen gardens, natural farming techniques, and provide skill training for livelihood generation and self-reliance.",
  },
];

export default function OurWorkPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-200 font-semibold text-sm tracking-wider uppercase mb-4 font-inter">
            Our Work
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-4">
            What We{" "}
            <span className="text-nature-400">Do</span>
          </h1>
          <p className="text-primary-200 max-w-2xl mx-auto font-inter text-lg">
            Creating lasting impact through comprehensive community development programs.
          </p>
        </div>
      </section>

      {/* Work Items */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workItems.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ImagePlaceholder label={item.title} aspectRatio="video" />
                <div className="p-6">
                  <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-inter">{item.fullDesc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
              Our Approach
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
              How We{" "}
              <span className="text-primary-500">Work</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Identify", desc: "We identify hidden talent and community needs through grassroots engagement and surveys." },
              { step: "02", title: "Empower", desc: "We provide resources, training, mentorship, and opportunities to nurture potential." },
              { step: "03", title: "Transform", desc: "We create lasting change through sustainable programs and community ownership." },
            ].map((item) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: parseInt(item.step) * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary-500 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-xl font-bold font-poppins">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold font-poppins text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm font-inter">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Want to Support Our Work?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto font-inter">Your contribution helps us reach more communities and create greater impact.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/volunteer-registration" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary-600 font-semibold text-sm hover:bg-gray-100 transition-all duration-300">
              Join as Volunteer
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/donate" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 transition-all duration-300 shadow-sm">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}