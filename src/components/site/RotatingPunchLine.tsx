"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface RotatingPunchLineProps {
  english: string;
  hindi: string;
  className?: string;
}

export default function RotatingPunchLine({
  english,
  hindi,
  className = "",
}: RotatingPunchLineProps) {
  const [showHindi, setShowHindi] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowHindi((current) => !current);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className={className}>
      <span className="sr-only">
        {english} · {hindi}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={showHindi ? "hindi" : "english"}
          aria-hidden="true"
          className={showHindi ? "font-devanagari" : ""}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
        >
          {showHindi ? hindi : english}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
