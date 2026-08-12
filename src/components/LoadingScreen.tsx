"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/logo.jpeg";

export default function LoadingScreen({ visible }: { visible: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[99999] grid place-items-center overflow-hidden bg-[#f8fbff] px-6"
          role="status"
          aria-live="polite"
          aria-label="Preparing the ANNT NANDAS FOUNDATION website"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.015 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="loader-aura" aria-hidden="true" />
          <div className="relative flex max-w-md flex-col items-center text-center">
            <motion.div
              className="loader-mark relative grid h-40 w-40 place-items-center rounded-full border border-blue-100 bg-white shadow-[0_24px_80px_rgba(30,64,175,0.15)] sm:h-48 sm:w-48"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-[76%] w-[76%] overflow-hidden rounded-full">
                <Image
                  src={logo}
                  alt="ANNT NANDAS FOUNDATION"
                  fill
                  priority
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.4 }}
            >
              <p className="mt-7 text-lg font-bold tracking-[0.08em] text-blue-950 sm:text-xl">
                ANNT NANDAS FOUNDATION
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700 sm:text-xs">
                From the heart of the Himalayas
              </p>
            </motion.div>

            <div className="mt-7 h-1 w-48 overflow-hidden rounded-full bg-blue-100" aria-hidden="true">
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-sky-500 to-emerald-500"
                animate={reduceMotion ? { x: "100%" } : { x: ["-100%", "200%"] }}
                transition={{
                  duration: reduceMotion ? 0.4 : 1.05,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <span className="sr-only">Loading critical page resources</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}