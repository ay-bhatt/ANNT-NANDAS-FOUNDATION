"use client";

import { motion } from "framer-motion";
import SectionBadge from "@/components/ui/SectionBadge";
import { journeyMilestones } from "@/lib/data";

export default function JourneySection() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-sky-light/20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <SectionBadge>Our Journey</SectionBadge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins text-gray-900 leading-tight mb-4">
            Milestones That{" "}
            <span className="gradient-text">Define Us</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-inter">
            From two bicycles and twelve children to a registered foundation transforming the Himalayas.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[52px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary-200 via-accent-sky to-nature-300" />

          <div className="grid grid-cols-4 gap-6">
            {journeyMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                className="relative text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <motion.div
                  className="w-[104px] h-[104px] mx-auto rounded-full bg-white border-2 border-primary-200 flex flex-col items-center justify-center shadow-soft group-hover:border-primary-500 group-hover:shadow-premium transition-all duration-500 relative z-10"
                  whileHover={{ scale: 1.08, borderColor: "#1D4ED8" }}
                >
                  <span className="text-2xl font-black font-poppins gradient-text">{milestone.year}</span>
                </motion.div>

                <div className="mt-8 card-premium p-6 text-left group-hover:border-primary-200 min-h-[140px]">
                  <h4 className="font-bold font-poppins text-gray-900 mb-2">{milestone.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed font-inter">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-6">
          {journeyMilestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              className="flex gap-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center shadow-soft flex-shrink-0">
                  <span className="text-lg font-black font-poppins gradient-text">{milestone.year.slice(2)}</span>
                </div>
                {i < journeyMilestones.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-200 to-transparent my-2" />
                )}
              </div>
              <div className="card-premium p-5 flex-1 mb-2">
                <span className="text-xs text-primary-500 font-semibold">{milestone.year}</span>
                <h4 className="font-bold font-poppins text-gray-900 mt-1 mb-2">{milestone.title}</h4>
                <p className="text-sm text-gray-500 font-inter">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}