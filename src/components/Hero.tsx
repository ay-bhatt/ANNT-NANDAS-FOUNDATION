"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Import your specified background image
import heroBg from "@/src/assets/hero/hero1.png";

const stats = [
  { value: "45+", label: "Villages Connected", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { value: "120+", label: "Events Conducted", icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  { value: "350+", label: "Volunteers", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { value: "5,000+", label: "Trees Planted", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
];

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[100svh] w-full bg-slate-950 text-white flex flex-col justify-center items-center pt-28 pb-32 md:pt-36 md:pb-40 overflow-hidden"
    >
      {/* --- BACKGROUND IMAGE WITH DARK OVERLAY --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={heroBg}
            alt="Annt Nandas Foundation Background"
            fill
            priority
            className="object-cover object-center opacity-40"
            sizes="100vw"
          />
        </motion.div>
        
        {/* Darkening overlays to ensure high text contrast */}
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      {/* --- MAIN CENTERED CONTENT CONTAINER --- */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 md:px-8 flex flex-col items-center text-center gap-6 mt-6">
        
        {/* BADGE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm font-bold tracking-widest uppercase bg-slate-900/60 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full"
        >
          <span className="text-success-400">From the Heart</span> <span className="text-slate-200">of the Himalayas</span>
        </motion.div>

        {/* HEADLINE */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white drop-shadow-2xl max-w-3xl"
        >
          Small Steps Today, <br />
          <span className="text-success-400">Limitless Impact</span> Tomorrow.
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl font-medium leading-relaxed drop-shadow-md"
        >
          We empower children and communities through education, opportunities, and sustainable initiatives for a brighter, stronger tomorrow.
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2"
        >
          <Link href="/our-work" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto pl-2 pr-6 py-2.5 bg-success-500 hover:bg-success-600 text-slate-950 font-bold text-sm rounded-full transition-all hover:-translate-y-1 flex items-center justify-center gap-3 shadow-lg shadow-success-500/20">
              <div className="w-9 h-9 rounded-full bg-slate-950/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              Explore Our Journey
            </button>
          </Link>

          <button className="w-full sm:w-auto px-6 py-3 bg-slate-900/60 border border-white/20 hover:bg-slate-800/80 backdrop-blur-md text-white font-semibold text-sm rounded-full transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group">
            <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center group-hover:border-success-400 transition-colors">
              <svg className="w-3.5 h-3.5 ml-0.5 text-white group-hover:text-success-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            Watch Our Story
          </button>
        </motion.div>

        {/* STATS ROW (Horizontal layout replacing the right container) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-10 pt-8 border-t border-white/10"
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center hover:bg-slate-900/60 transition-colors shadow-lg"
            >
              <div className="w-9 h-9 rounded-full bg-success-500/20 text-success-400 flex items-center justify-center mb-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">{stat.value}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- BOTTOM WAVE DIVIDER --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none text-white">
        <svg 
          className="relative block w-full h-[60px] md:h-[120px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C7.72,1.35,15.45,2.71,23.18,4.06C122.9,20.26,224.2,46.1,321.39,56.44Z" 
            className="fill-current"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;