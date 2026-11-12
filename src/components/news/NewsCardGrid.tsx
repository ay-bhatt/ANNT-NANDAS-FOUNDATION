"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { NewsItem } from "@/lib/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface NewsCardGridProps {
  items: NewsItem[];
  variant?: "grid" | "stacked";
}

function categoryTone(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes("cycling")) return "border-sky-200 bg-sky-50 text-sky-800";
  if (lower.includes("running") || lower.includes("sports")) return "border-blue-200 bg-blue-50 text-blue-800";
  if (lower.includes("talent")) return "border-emerald-200 bg-emerald-50 text-emerald-800";
  return "border-teal-200 bg-teal-50 text-teal-800";
}

export default function NewsCardGrid({ items, variant = "grid" }: NewsCardGridProps) {
  const { t, localize } = useI18n();
  const localizedItems = localize(items);
  const [expandedMap, setExpandedMap] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpandedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (variant === "stacked") {
    return (
      <div className="flex flex-1 flex-col gap-4">
        {localizedItems.map((item, index) => {
          const key = item.id ?? item.title;
          const isOpen = Boolean(expandedMap[key]);
          return (
            <motion.article
              key={key}
              className="surface-card flex flex-col overflow-hidden sm:flex-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <div className="relative h-48 sm:h-auto sm:w-44 sm:shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 639px) 100vw, 176px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] ${categoryTone(
                      item.category,
                    )}`}
                  >
                    {item.category}
                  </span>
                  {item.date ? (
                    <span className="text-xs font-medium text-slate-400">{item.date}</span>
                  ) : null}
                </div>
                <h3 className="mt-2.5 text-lg font-bold tracking-[-0.02em] text-slate-950 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.summary}</p>
                {isOpen && item.details ? (
                  <p className="mt-3 rounded-2xl border border-slate-200/80 bg-slate-50 p-3.5 text-sm leading-6 text-slate-700">
                    {item.details}
                  </p>
                ) : null}
                <div className="mt-3.5 flex flex-wrap items-center gap-3">
                  {item.details ? (
                    <button
                      type="button"
                      onClick={() => toggle(key)}
                      aria-expanded={isOpen}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition hover:text-emerald-700"
                    >
                      {isOpen ? t("Show Less") : t("Read More")}
                      <span aria-hidden="true">{isOpen ? "↑" : "→"}</span>
                    </button>
                  ) : (
                    <Link
                      href="/news"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition hover:text-emerald-700"
                    >
                      {t("Read More")} <span aria-hidden="true">→</span>
                    </Link>
                  )}
                  <Link
                    href="/news"
                    className="text-xs font-semibold text-slate-500 underline-offset-4 hover:text-slate-800 hover:underline"
                  >
                    {t("All News")}
                  </Link>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {localizedItems.map((item, index) => {
        const key = item.id ?? item.title;
        const isOpen = Boolean(expandedMap[key]);
        return (
          <motion.article
            key={key}
            id={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="surface-card flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover transition duration-500 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] shadow-sm ${categoryTone(
                    item.category,
                  )}`}
                >
                  {item.category}
                </span>
                {item.date ? (
                  <span className="rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {item.date}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-slate-950 sm:text-2xl">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{item.summary}</p>

              {isOpen && item.details ? (
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 text-sm leading-7 text-slate-700">
                  {item.details}
                  {item.href ? (
                    <div className="mt-3">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        {t("Explore related registration")} →
                      </Link>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                {item.details ? (
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    className="btn-outline-dark !min-h-10 !px-4 text-xs sm:text-sm"
                  >
                    {isOpen ? t("Show Less") : t("Read More")}
                    <span aria-hidden="true">{isOpen ? "↑" : "→"}</span>
                  </button>
                ) : null}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-blue-700 transition hover:text-emerald-700"
                  >
                    {t("Learn more")} →
                  </Link>
                ) : null}
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
