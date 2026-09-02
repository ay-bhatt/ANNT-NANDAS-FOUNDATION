"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteNotice } from "@/lib/types";
import { dispatchHomeContentRestore, HOME_CONTENT_HIDE_MS } from "@/lib/i18n";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { playNoticeSound, unlockNoticeSound } from "@/lib/notice-sound";

function noticeIcon(kind: SiteNotice["kind"]) {
  if (kind === "news") return "📰";
  if (kind === "volunteer") return "🤝";
  return "🏃";
}

function noticeTone(kind: SiteNotice["kind"]) {
  if (kind === "news") return "from-amber-400 to-emerald-500";
  if (kind === "volunteer") return "from-sky-500 to-emerald-500";
  return "from-emerald-500 to-blue-600";
}

const dockClass =
  "pointer-events-none fixed z-[90] right-3 w-[min(17.25rem,calc(100%-1.5rem))] bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] sm:right-6 sm:bottom-8 sm:w-[min(20.5rem,calc(100%-3rem))]";

export default function SiteNotices({ notices }: { notices: SiteNotice[] }) {
  const pathname = usePathname();
  const { t, localize } = useI18n();
  const isHome = pathname === "/" || pathname === "";
  const items = useMemo(() => localize(notices), [notices, localize]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const lastSoundId = useRef<string | null>(null);

  const current = open && isHome ? items[index] : undefined;
  const currentId = current?.id;
  const waitingForUser = isHome && items.length > 0 && !open;

  const clearTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const pauseUntilViewAgain = (nextIndex: number) => {
    clearTimer();
    setExpanded(false);
    setOpen(false);
    setIndex(nextIndex >= items.length ? 0 : nextIndex);
  };

  const cutToNext = () => {
    const nextIndex = index + 1;
    if (nextIndex >= items.length) {
      pauseUntilViewAgain(0);
      return;
    }
    setExpanded(false);
    setIndex(nextIndex);
  };

  useEffect(() => {
    const unlock = () => {
      void unlockNoticeSound();
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

  useEffect(() => {
    if (!isHome) {
      clearTimer();
      setOpen(false);
      setExpanded(false);
      lastSoundId.current = null;
      return;
    }
    setIndex(0);
    setOpen(true);
    setExpanded(false);
    lastSoundId.current = null;
    return clearTimer;
  }, [isHome]);

  useEffect(() => {
    if (!currentId || expanded) {
      clearTimer();
      return;
    }
    hideTimer.current = window.setTimeout(() => {
      pauseUntilViewAgain(index + 1);
    }, HOME_CONTENT_HIDE_MS);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, expanded, index]);

  useEffect(() => {
    if (!currentId) return;
    if (lastSoundId.current === currentId) return;
    lastSoundId.current = currentId;
    const timer = window.setTimeout(() => playNoticeSound(), 60);
    return () => window.clearTimeout(timer);
  }, [currentId]);

  const restore = () => {
    const next = items[index] ?? items[0];
    lastSoundId.current = null;
    setOpen(true);
    setExpanded(false);
    dispatchHomeContentRestore();
    if (next) {
      lastSoundId.current = next.id;
      playNoticeSound();
    }
  };

  const dismiss = (event?: React.MouseEvent) => {
    event?.preventDefault();
    event?.stopPropagation();
    cutToNext();
  };

  if (!isHome || items.length === 0) return null;

  return (
    <>
      <div className={dockClass}>
        <AnimatePresence mode="wait">
          {current ? (
            <motion.aside
              key={current.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto max-h-[min(70svh,28rem)] origin-bottom-right overflow-y-auto"
              aria-live="polite"
              aria-label={`${current.eyebrow} ${t("Notifications")}`}
            >
              {expanded ? (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.18)]">
                  <div className={`h-1 w-full bg-gradient-to-r ${noticeTone(current.kind)}`} />
                  <Link
                    href={current.href}
                    aria-label={`${t("Open")} ${current.title}`}
                    className="block p-3.5 pr-11 sm:p-4 sm:pr-12"
                  >
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                      <span aria-hidden="true">{noticeIcon(current.kind)}</span>
                      {current.eyebrow}
                    </span>
                    <h2 className="mt-2 text-[15px] font-bold leading-5 tracking-[-0.03em] text-slate-950 sm:text-base">
                      {current.title}
                    </h2>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">{current.meta}</p>
                    <p className="mt-1.5 text-sm leading-6 text-slate-600">{current.summary}</p>
                    <span className="mt-3 inline-flex min-h-9 items-center text-sm font-semibold text-blue-700">
                      {current.cta} →
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={dismiss}
                    aria-label={t("Dismiss")}
                    className="absolute right-2 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label={`${t("Open notification")}: ${current.title}`}
                    className="flex min-h-12 w-full items-center gap-2.5 rounded-full border border-slate-200/90 bg-white py-2 pl-3 pr-12 text-left shadow-[0_12px_32px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 active:scale-[0.99]"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm text-white ${noticeTone(current.kind)}`}
                      aria-hidden="true"
                    >
                      {noticeIcon(current.kind)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                        {current.eyebrow}
                      </span>
                      <span className="block truncate text-sm font-semibold text-slate-900">{current.title}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={dismiss}
                    aria-label={t("Dismiss")}
                    className="absolute right-1.5 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    ×
                  </button>
                </div>
              )}
            </motion.aside>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {waitingForUser ? (
          <motion.button
            key="restore-content"
            type="button"
            onClick={restore}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[90] inline-flex min-h-11 max-w-[calc(100%-1.5rem)] items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-[0_12px_30px_rgba(15,23,42,0.16)] right-3 bottom-[calc(6.25rem+env(safe-area-inset-bottom,0px))] sm:right-6 sm:bottom-8"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            {t("View Content Again")}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
