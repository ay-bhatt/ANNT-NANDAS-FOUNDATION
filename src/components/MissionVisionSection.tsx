"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";

export default function MissionVisionSection() {
  return (
    <section className="section-padding bg-gradient-premium">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionBadge>Our Purpose</SectionBadge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-gray-900 leading-tight mb-4">
            Driven by{" "}
            <span className="gradient-text">Mission & Vision</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-inter">
            Guided by a clear purpose to transform lives across the Himalayan region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-primary-600/10 rounded-[24px] group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
            <div className="relative p-8 md:p-10 rounded-[24px] border border-gray-100 bg-white/50 backdrop-blur-sm h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-primary-500/20">
                🎯
              </div>
              <h3 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed font-inter">
                To identify hidden talent, nurture it with dedication, and create pathways that
                empower underprivileged children and communities to achieve lasting independence.
                We are committed to removing poverty from its roots by creating opportunities 
                for education, sports, leadership, entrepreneurship, skill development, 
                environmental awareness, and community participation.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-nature-500/5 to-nature-600/10 rounded-[24px] group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
            <div className="relative p-8 md:p-10 rounded-[24px] border border-gray-100 bg-white/50 backdrop-blur-sm h-full">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nature-500 to-nature-600 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-nature-500/20">
                👁️
              </div>
              <h3 className="text-2xl font-bold font-poppins text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed font-inter">
                A society where no child's future is determined by poverty, geography, or circumstance.
                We envision a generation of physically strong, mentally resilient, socially responsible, 
                and economically independent citizens who proudly represent their communities at 
                district, state, national, and international levels.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}