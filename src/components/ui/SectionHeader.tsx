"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
  light = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      className={cn("max-w-3xl mb-16 md:mb-20", alignClass, className)}
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full",
            light
              ? "text-primary-200 bg-white/10"
              : "text-primary-500 bg-primary-50"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold font-poppins leading-[1.1] tracking-tight",
          light ? "text-white" : "text-gray-900"
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="gradient-text">{highlight}</span>
          </>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-base md:text-lg leading-relaxed font-inter",
            light ? "text-white/70" : "text-gray-500",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
