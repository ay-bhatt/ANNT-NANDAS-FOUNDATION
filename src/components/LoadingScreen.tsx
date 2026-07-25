"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-hide after animations complete
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.08,
        transition: {
          duration: 0.8,
        },
      }}
    >
      {/* Glowing background orb */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-[120px]"
        animate={{
          scale: [0.8, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        <motion.div
          className="w-20 h-20 rounded-2xl bg-blue-700 flex items-center justify-center shadow-lg"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-white font-bold text-2xl font-poppins">AN</span>
        </motion.div>

        {/* Green leaf accent */}
        <motion.div
          className="absolute -top-2 -right-2 text-2xl"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 6-2 9-7 0 0-3 1-5 1s-4-1-4-1c2-4 6-5 9-5z" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="mt-8 text-4xl font-bold tracking-wide text-blue-700"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        ANNT NANDAS FOUNDATION
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="mt-2 text-green-600 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        हमारा प्रयास, हुनर की तलाश
      </motion.p>

      {/* Progress bar */}
      <div className="w-72 mt-12">
        <div className="h-2 rounded-full bg-blue-100 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}