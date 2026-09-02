"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "anf-news-notice-dismissed";

export default function NewsNotice({
  title,
  date,
  category,
}: {
  title: string;
  date: string;
  category: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/news") {
      setOpen(false);
      return;
    }
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === title) return;
    } catch {
      // ignore private-mode storage errors
    }

    const reveal = () => {
      if (window.scrollY < 220) return;
      setOpen(true);
      window.removeEventListener("scroll", reveal);
    };

    window.addEventListener("scroll", reveal, { passive: true });
    reveal();
    return () => window.removeEventListener("scroll", reveal);
  }, [pathname, title]);

  const dismiss = (event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, title);
    } catch {
      // ignore
    }
  };

  if (pathname === "/news") return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto fixed z-40 w-[min(calc(100vw-1.5rem),22rem)] left-3 right-3 bottom-[4.75rem] sm:left-auto sm:right-24 sm:bottom-6"
          aria-label="Latest news"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <Link href="/news" className="block p-4 pr-11 transition hover:bg-slate-50" onClick={() => setOpen(false)}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">Latest news</p>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                {category} · {date}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-950">{title}</p>
              <span className="mt-3 inline-flex text-sm font-semibold text-blue-700">
                Open news page →
              </span>
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss news notice"
              className="absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              ×
            </button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
