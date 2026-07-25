"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hover?: "lift" | "glow" | "border" | "none";
  glass?: boolean;
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const paddings = {
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

export default function PremiumCard({
  children,
  className,
  hover = "lift",
  glass = false,
  padding = "md",
  onClick,
}: PremiumCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-[20px] transition-all duration-500",
        glass ? "glass-card" : "card-premium",
        paddings[padding],
        onClick && "cursor-pointer",
        className
      )}
      whileHover={
        hover === "lift"
          ? { y: -8, boxShadow: "0 20px 60px rgba(29, 78, 216, 0.12)" }
          : hover === "glow"
          ? { boxShadow: "0 0 40px rgba(29, 78, 216, 0.15)" }
          : hover === "border"
          ? { borderColor: "rgba(29, 78, 216, 0.3)" }
          : {}
      }
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}