"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpeg";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const getGraphemes = (text: string) => {
  if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
    return Array.from(new (Intl as any).Segmenter("hi", { granularity: "grapheme" }).segment(text), (segment: any) => segment.segment);
  }
  return Array.from(text);
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Start / Background Glow (0ms)
    timers.push(setTimeout(() => setPhase(1), 100));
    // Phase 2: Outer Blue Circle Draw
    timers.push(setTimeout(() => setPhase(2), 400));
    // Phase 3: Inner Green Circle Draw
    timers.push(setTimeout(() => setPhase(3), 800));
    // Phase 4 & 5: Tree Trunk & Leaves Animation (Simplified as Logo Reveal start)
    timers.push(setTimeout(() => setPhase(5), 1200));
    // Phase 6 & 7: Hand & People (Logo continues revealing)
    timers.push(setTimeout(() => setPhase(7), 1600));
    // Phase 8: Stars Fade in (Full Logo revealed)
    timers.push(setTimeout(() => setPhase(8), 2000));
    // Phase 9: Ribbon & Base 
    timers.push(setTimeout(() => setPhase(9), 2300));
    // Phase 10: Foundation Name Fade In
    timers.push(setTimeout(() => setPhase(10), 2600));
    // Phase 11: Hindi Text Typewriter
    timers.push(setTimeout(() => setPhase(11), 3000));
    // Phase 12: Loading Bar Fill & Complete
    timers.push(setTimeout(() => setPhase(12), 3600));

    // Smooth Fade Out & Transition to Homepage
    const hideTimer = setTimeout(() => {
      setVisible(false);
      const completeTimer = setTimeout(() => onComplete?.(), 500);
      timers.push(completeTimer);
    }, 4200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  // Calculate progress based on the 12 phases
  const progressWidth = `${Math.min((phase / 12) * 100, 100)}%`;

  const hindiText = "हमारा   प्रयास, हुनर  की  तलाश";
  const hindiGraphemes = getGraphemes(hindiText);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* Phase 1: Background Glow */}
          <motion.div 
            className="absolute inset-0 z-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div className="h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[80px]" />
          </motion.div>

          <div className="relative z-10 flex w-full max-w-[500px] flex-col items-center gap-8">
            
            {/* Logo & Drawing Animation Container */}
            <div className="relative flex h-48 w-48 items-center justify-center">
              
              {/* Phase 2 & 3: Animated SVG Circles */}
              <svg className="absolute inset-0 h-full w-full rotate-[-90deg]" viewBox="0 0 200 200">
                {/* Outer Blue Circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="96"
                  fill="none"
                  stroke="#1d4ed8" // Blue-700
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="603"
                  initial={{ strokeDashoffset: 603 }}
                  animate={{ strokeDashoffset: phase >= 2 ? 0 : 603 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                {/* Inner Green Circle */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="86"
                  fill="none"
                  stroke="#16a34a" // Green-600
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="540"
                  initial={{ strokeDashoffset: 540 }}
                  animate={{ strokeDashoffset: phase >= 3 ? 0 : 540 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>

              {/* Phases 4-9: Actual Logo Reveal */}
              {/* We reveal the logo from bottom to top using clipPath to simulate the tree growing and hand appearing */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-6"
                initial={{ clipPath: "circle(0% at 50% 100%)", opacity: 0, scale: 0.9 }}
                animate={{ 
                  clipPath: phase >= 8 ? "circle(150% at 50% 100%)" : 
                            phase >= 6 ? "circle(60% at 50% 100%)" : 
                            phase >= 4 ? "circle(30% at 50% 100%)" : "circle(0% at 50% 100%)",
                  opacity: phase >= 4 ? 1 : 0,
                  scale: phase >= 8 ? 1 : 0.95
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white shadow-lg">
                  <Image 
                    src={logo} 
                    alt="Annt Nandas Foundation Logo" 
                    fill 
                    className="object-contain p-2" 
                    priority
                  />
                </div>
              </motion.div>
            </div>

            {/* Typography Section */}
            <div className="flex flex-col items-center justify-center space-y-2 text-center h-24">
              {/* Phase 10: Foundation Name */}
              <motion.h1
                className="text-2xl font-black tracking-wide text-blue-700 sm:text-3xl font-poppins"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: phase >= 10 ? 1 : 0, y: phase >= 10 ? 0 : 15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                ANNT NANDAS FOUNDATION
              </motion.h1>

              {/* Phase 11: Hindi Text Typewriter Effect */}
              <div className="h-6 overflow-hidden">
                <motion.p
                  className="text-base font-bold text-green-700 sm:text-lg font-devanagari"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase >= 11 ? 1 : 0 }}
                >
                  {hindiGraphemes.map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, display: "none" }}
                      animate={phase >= 11 ? { opacity: 1, display: "inline-block" } : {}}
                      transition={{ duration: 0.1, delay: index * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Blinking Cursor */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 11 && phase < 12 ? [0, 1, 0] : 0 }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    className="ml-1 inline-block h-4 w-[2px] bg-green-700 translate-y-0.5"
                  />
                </motion.p>
              </div>
            </div>

            {/* Phase 12: Loading Bar */}
            <div className="mt-4 w-full max-w-[280px]">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: progressWidth }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}