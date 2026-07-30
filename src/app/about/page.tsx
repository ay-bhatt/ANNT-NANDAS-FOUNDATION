"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { founderInfo, coreValues, journeyMilestones } from "@/lib/data";

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-200 font-semibold text-sm tracking-wider uppercase mb-4 font-inter">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-4">
            A Movement for{" "}
            <span className="text-nature-400">Generations to Come</span>
          </h1>
          <p className="text-primary-200 max-w-2xl mx-auto font-inter text-lg">
            From the Heart of the Himalayas, Building Futures Without Limits
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight mb-6">
                Born in the{" "}
                <span className="text-primary-500">Himalayas</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed font-inter">
                <p>
                  ANNT NANDAS FOUNDATION is a registered non-profit organization committed to creating lasting social impact through sports, education, skill development, environmental conservation, healthcare, and sustainable community development.
                </p>
                <p>
                  Our work is guided by one simple belief: Every child deserves an opportunity. Regardless of financial background, caste, religion, gender, or geographical location, every individual deserves access to education, mentorship, health, opportunity, and hope.
                </p>
                <p>
                  We work directly with children, youth, women, senior citizens, and rural communities to identify potential, nurture talent, and create pathways towards self-reliance.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <ImagePlaceholder label="Himalayan Community" aspectRatio="square" />
                  <ImagePlaceholder label="Children Education" aspectRatio="video" />
                </div>
                <div className="space-y-4 pt-8">
                  <ImagePlaceholder label="Sports Training" aspectRatio="portrait" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
              Our Journey
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
              Every Great Movement{" "}
              <span className="text-primary-500">Begins With a Step</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {journeyMilestones.map((item, i) => (
              <motion.div
                key={item.year}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-black font-poppins text-primary-500">{item.year.slice(2)}</span>
                  </div>
                  <div>
                    <span className="text-primary-500 font-bold text-sm font-poppins">{item.year}</span>
                    <h4 className="font-bold font-poppins text-gray-900 mt-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm font-inter mt-1">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
              Our Foundation
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
              Core{" "}
              <span className="text-primary-500">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {coreValues.map((value) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mb-2 block">{value.icon}</span>
                <h4 className="text-xs font-bold font-poppins text-gray-800">{value.title}</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-tight font-inter">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-primary-200 font-semibold text-xs tracking-wider uppercase mb-3 font-inter">
                  Meet Our Founder
                </p>
                <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-2">
                  {founderInfo.name}
                </h2>
                <p className="text-primary-200 font-medium mb-6 font-inter">{founderInfo.title}</p>
                <p className="text-white/75 leading-relaxed mb-4 font-inter">{founderInfo.fullBio}</p>
                <blockquote className="border-l-2 border-nature-400 pl-5 py-1 mb-6">
                  <p className="text-white/80 italic text-sm font-inter">
                    &ldquo;{founderInfo.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="flex flex-wrap gap-2">
                  {founderInfo.achievements.map((a) => (
                    <span key={a} className="px-3 py-1.5 rounded-full bg-white/10 text-xs font-inter">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <ImagePlaceholder label="Founder - Kalam Singh Bisht" aspectRatio="portrait" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold font-poppins text-gray-900 mb-4">
            Ready to Be Part of Our Story?
          </h3>
          <p className="text-gray-500 mb-8 font-inter max-w-xl mx-auto">
            Join us as a volunteer, donor, or partner and help build futures without limits.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/volunteer-registration"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
            >
              Become a Volunteer
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 transition-all duration-300 shadow-sm"
            >
              Donate Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}