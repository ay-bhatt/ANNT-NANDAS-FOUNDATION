"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem, UpcomingEvent } from "@/lib/types";

type PeekPanel = "events" | "news";

interface SidePeekRailProps {
  events: UpcomingEvent[];
  newsItems: NewsItem[];
}

export default function SidePeekRail({ events, newsItems }: SidePeekRailProps) {
  const [open, setOpen] = useState<PeekPanel | null>(null);
  const [canHover, setCanHover] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const eventsId = useId();
  const newsId = useId();

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openPanel = (panel: PeekPanel) => {
    cancelClose();
    setOpen(panel);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 160);
  };

  const tabProps = (panel: PeekPanel) => ({
    type: "button" as const,
    "aria-expanded": open === panel,
    "aria-controls": panel === "events" ? eventsId : newsId,
    onClick: () => {
      if (canHover) {
        openPanel(panel);
        return;
      }
      setOpen((current) => (current === panel ? null : panel));
    },
    onMouseEnter: canHover ? () => openPanel(panel) : undefined,
    onFocus: canHover ? () => openPanel(panel) : undefined,
  });

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed left-0 z-40 flex items-start max-md:bottom-[calc(var(--site-bottom-nav-h)+5.5rem)] max-md:top-auto md:top-[calc(var(--site-header-h)+12px)]"
      onMouseLeave={canHover ? scheduleClose : undefined}
    >
      <div className="pointer-events-auto flex flex-col gap-2">
        <button
          {...tabProps("events")}
          className={`rounded-r-xl border border-l-0 px-2 py-3 text-[10px] font-bold uppercase tracking-[0.16em] shadow-lg transition sm:px-2.5 sm:py-4 sm:text-[11px] ${
            open === "events"
              ? "border-emerald-200 bg-emerald-600 text-white"
              : "border-slate-200 bg-white/95 text-slate-800 backdrop-blur-sm hover:bg-emerald-50"
          }`}
        >
          <span className="block [writing-mode:vertical-rl] rotate-180">Upcoming Events</span>
        </button>
        <button
          {...tabProps("news")}
          className={`rounded-r-xl border border-l-0 px-2 py-3 text-[10px] font-bold uppercase tracking-[0.16em] shadow-lg transition sm:px-2.5 sm:py-4 sm:text-[11px] ${
            open === "news"
              ? "border-blue-200 bg-blue-950 text-white"
              : "border-slate-200 bg-white/95 text-slate-800 backdrop-blur-sm hover:bg-slate-50"
          }`}
        >
          <span className="block [writing-mode:vertical-rl] rotate-180">Current News</span>
        </button>
      </div>

      {open ? (
        <aside
          id={open === "events" ? eventsId : newsId}
          className="pointer-events-auto ml-0 max-h-[min(72vh,34rem)] w-[min(calc(100vw-3.25rem),22rem)] overflow-y-auto rounded-r-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
          onMouseEnter={canHover ? cancelClose : undefined}
        >
          {open === "events" ? (
            <PeekList
              eyebrow="Upcoming Events"
              title="Join the next initiative"
              href="/events"
              actionLabel="Open events page"
              items={events.slice(0, 3).map((event) => ({
                key: event.title,
                image: event.image,
                eyebrow: event.date,
                title: event.title,
                detail: `${event.location} · ${event.time}`,
                href: event.href,
              }))}
            />
          ) : (
            <PeekList
              eyebrow="Current News"
              title="Latest from the field"
              href="/news"
              actionLabel="Open news page"
              items={newsItems.slice(0, 3).map((item) => ({
                key: item.title,
                image: item.image,
                eyebrow: item.date,
                title: item.title,
                detail: item.summary,
                href: "/news",
              }))}
            />
          )}
        </aside>
      ) : null}
    </div>
  );
}

function PeekList({
  eyebrow,
  title,
  href,
  actionLabel,
  items,
}: {
  eyebrow: string;
  title: string;
  href: string;
  actionLabel: string;
  items: { key: string; image: string; eyebrow: string; title: string; detail: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="flex gap-3 rounded-2xl border border-slate-200 p-2 transition hover:border-blue-200 hover:bg-slate-50"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
              <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">{item.eyebrow}</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-950">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{item.detail}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link href={href} className="btn-primary mt-4 w-full">
        {actionLabel}
      </Link>
    </div>
  );
}
