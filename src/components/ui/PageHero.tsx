"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  highlight?: string;
  description?: string;
  eyebrow?: string;
  variant?: "blue" | "green" | "light";
  className?: string;
}

const variants = {
  blue: "hero-atmosphere text-white",
  green: "bg-gradient-to-br from-nature-800 via-nature-700 to-primary-900 text-white",
  light: "bg-gradient-to-b from-sky-light/60 to-white text-gray-900",
};

export default function PageHero({
  title,
  highlight,
  description,
  eyebrow,
  variant = "blue",
  className,
}: PageHeroProps) {
  const isLight = variant === "light";

  return (
    <section
      className={cn(
        "relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden",
        variants[variant],
        className
      )}
    >
      {variant === "blue" && (
        <>
          <div className="absolute inset-0">
            <svg
              className="absolute bottom-0 w-full h-[40%] opacity-15"
              viewBox="0 0 1440 400"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 400L200 250L400 320L600 180L800 280L1000 150L1200 250L1440 200V400H0Z"
                fill="rgba(255,255,255,0.1)"
              />
            </svg>
          </div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary-400/15 rounded-full blur-[100px] animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-nature-400/10 rounded-full blur-[80px] animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
        </>
      )}

      <div className="container-premium relative z-10 text-center">
        {eyebrow && (
          <motion.span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase mb-6",
              isLight
                ? "text-primary-600 bg-primary-50"
                : "glass-dark text-white/90"
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!isLight && (
              <span className="w-1.5 h-1.5 rounded-full bg-nature-400 animate-pulse" />
            )}
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-poppins leading-[1.05] mb-6 text-balance",
            isLight ? "text-gray-900" : "text-white"
          )}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-300 to-nature-400">
                {highlight}
              </span>
            </>
          )}
        </motion.h1>

        {description && (
          <motion.p
            className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto font-inter leading-relaxed",
              isLight ? "text-gray-500" : "text-white/70"
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
