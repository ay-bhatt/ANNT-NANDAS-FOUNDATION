"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  location?: string;
  className?: string;
}

export default function MapPlaceholder({
  location = "Mundoli, Chamoli, Uttarakhand",
  className,
}: MapPlaceholderProps) {
  return (
    <motion.div
      className={cn("rounded-[20px] overflow-hidden shadow-soft", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-primary-50 via-sky-light to-nature-50 flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(29,78,216,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="text-center relative z-10 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl glass flex items-center justify-center shadow-soft">
            <svg
              className="w-8 h-8 text-primary-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <p className="text-base font-semibold text-gray-700 font-poppins">
            Future Map Embed
          </p>
          <p className="text-sm text-gray-500 mt-1 font-inter">{location}</p>
          <p className="text-xs text-gray-400 mt-2 font-inter">
            Google Maps integration ready · 1200 × 400
          </p>
        </div>
      </div>
    </motion.div>
  );
}
