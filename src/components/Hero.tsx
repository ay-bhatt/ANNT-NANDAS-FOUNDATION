"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { impactStats } from "@/lib/data";

const stats = impactStats.slice(0, 5);

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_33%),radial-gradient(circle_at_35%_20%,_rgba(22,163,74,0.16),_transparent_25%),linear-gradient(180deg,_rgba(15,23,42,0.95)_0%,_rgba(15,23,42,0.92)_35%,_rgba(15,23,42,0.8)_100%)]" />
      <div className="relative z-10 container-premium pt-24 pb-28 lg:pt-32 lg:pb-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 shadow-lg shadow-slate-950/10 backdrop-blur-sm">
              <span className="block h-2.5 w-2.5 rounded-full bg-success-400 shadow-glow" />
              From the Heart of the Himalayas
            </div>
            <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
              Building Futures <span className="text-success-400">Without Limits</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Empowering communities through sports, education, healthcare, and environment initiatives that help every talent thrive.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/volunteer-registration"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Become a Volunteer
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-success-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-success-600/20 transition hover:-translate-y-0.5 hover:bg-success-700"
              >
                Donate Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-2 shadow-glow">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-600 via-slate-900 to-slate-800">
                <div className="flex h-full w-full items-center justify-center px-8">
                  <div className="text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white shadow-lg shadow-slate-950/20">
                      <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-lg font-bold text-white">Himalayan Vision</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">A premium narrative for a movement that believes in every child's potential.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container-premium">
        <motion.div
          className="mx-auto grid max-w-5xl gap-4 rounded-[28px] border border-white/10 bg-white/95 p-6 shadow-xl shadow-slate-950/10 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl bg-slate-950/5 p-4 text-center">
                <p className="text-2xl font-bold text-slate-950 sm:text-3xl">{stat.value.toLocaleString()}{stat.suffix}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
