"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { UpcomingEvent } from "@/lib/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface UpcomingEventCardsProps {
  events: UpcomingEvent[];
  variant?: "grid" | "compact";
}

export default function UpcomingEventCards({
  events,
  variant = "grid",
}: UpcomingEventCardsProps) {
  const { t, localize } = useI18n();
  const localizedEvents = localize(events);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpandedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-4">
        {localizedEvents.map((event, index) => {
          const key = event.id ?? event.title;
          const isOpen = Boolean(expandedMap[key]);
          const periodLabel = event.period || event.date || t("Upcoming");

          return (
            <motion.article
              key={key}
              className="group relative overflow-hidden rounded-[26px] border border-slate-800/80 bg-[linear-gradient(135deg,#071a3c_0%,#0f294a_58%,#064e3b_100%)] text-white shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition duration-300 hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" />
              <div className="flex flex-col min-[480px]:flex-row">
                <div className="relative h-48 min-[480px]:h-auto min-[480px]:w-44 min-[480px]:shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 479px) 100vw, 176px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-emerald-300/40 bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
                    {event.status || t("Planned Event")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]">
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-emerald-300">
                      {event.type}
                    </span>
                    <span className="text-sky-200">
                      {event.period ? `${t("Expected")}: ${event.period}` : periodLabel}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
                    {event.title}
                  </h3>

                  {event.location ? (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-200">
                      <span aria-hidden="true">📍</span> {event.location}
                    </p>
                  ) : null}

                  <p className="mt-2 text-sm leading-6 text-blue-100/90">{event.description}</p>

                  {isOpen && event.details ? (
                    <p className="mt-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-xs leading-6 text-blue-50">
                      {event.details}
                    </p>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
                    >
                      {isOpen ? t("Show Less") : t("Learn More")}
                      <span aria-hidden="true">{isOpen ? "↑" : "→"}</span>
                    </button>
                    {event.href ? (
                      <Link
                        href={event.href}
                        className="inline-flex min-h-9 items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                      >
                        {event.ctaLabel ? t(event.ctaLabel) : t("Register")}
                      </Link>
                    ) : (
                      <Link
                        href="/events"
                        className="inline-flex min-h-9 items-center rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-blue-100 transition hover:border-white/40 hover:text-white"
                      >
                        {t("View Events")}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {localizedEvents.map((event, index) => {
        const key = event.id ?? event.title;
        const isOpen = Boolean(expandedMap[key]);
        const periodLabel = event.period || event.date || t("Upcoming");

        return (
          <motion.article
            key={key}
            id={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group flex flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[linear-gradient(160deg,#071a3c_0%,#0f294a_62%,#064e3b_100%)] text-white shadow-[0_20px_55px_rgba(15,23,42,0.18)]"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" />
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 1023px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full border border-emerald-300/40 bg-slate-950/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 backdrop-blur-sm">
                  {event.status || t("Planned Event")}
                </span>
                <span className="rounded-full bg-blue-600/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  {event.type}
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-950 shadow">
                  <span aria-hidden="true">🗓️</span>
                  {event.period ? `${t("Expected")}: ${event.period}` : periodLabel}
                </span>
                {event.location ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-slate-950 shadow">
                    <span aria-hidden="true">📍</span>
                    {event.location}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-white sm:text-2xl">
                {event.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-100/90">{event.description}</p>

              {event.time ? (
                <p className="mt-3 text-xs font-semibold text-emerald-200">🕒 {event.time}</p>
              ) : null}

              {isOpen && event.details ? (
                <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm leading-6 text-blue-50">
                  {event.details}
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-emerald-400 px-5 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-300 sm:text-sm"
                >
                  {isOpen ? t("Show Less") : t("Learn More")}
                  <span aria-hidden="true">{isOpen ? "↑" : "→"}</span>
                </button>
                {event.href ? (
                  <Link
                    href={event.href}
                    className="btn-secondary !min-h-10 !px-5 text-xs sm:text-sm"
                  >
                    {event.ctaLabel ? t(event.ctaLabel) : t("Register")}
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="btn-secondary !min-h-10 !px-5 text-xs sm:text-sm"
                  >
                    {t("Enquire")}
                  </Link>
                )}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
