"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpeg";

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | null = null;
    const timer = setTimeout(() => {
      setVisible(false);
      exitTimer = setTimeout(() => {
        onComplete?.();
      }, 450);
    }, 2600);

    return () => {
      clearTimeout(timer);
      if (exitTimer) {
        clearTimeout(exitTimer);
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden px-4"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.35 } }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-glow max-w-[420px] w-full">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
              <Image src={logo} alt="Foundation Logo" fill className="object-contain" />
            </div>
            <div className="space-y-2 text-center">
              <motion.h1
                className="text-3xl font-black tracking-tight text-white"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                ANNT NANDAS FOUNDATION
              </motion.h1>
              <motion.p
                className="text-sm text-slate-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
              >
                Building a seamless experience for every visitor.
              </motion.p>
            </div>

            <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-3 text-sm text-slate-200">
              <span className="h-3 w-3 rounded-full bg-success-400 animate-pulse" />
              Loading your community stories...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
