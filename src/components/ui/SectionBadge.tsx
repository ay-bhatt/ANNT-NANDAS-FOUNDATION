"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100/50 text-primary-600 text-xs font-semibold tracking-[0.12em] uppercase mb-5",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
      {children}
    </motion.div>
  );
}