"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/types";
import { useI18n } from "@/components/i18n/LanguageProvider";

const PRIMARY_HREFS = ["/", "/programs", "/events", "/donate"];

interface MobileBottomNavProps {
  navigationItems: NavItem[];
}

export default function MobileBottomNav({ navigationItems }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const moreItems = navigationItems.filter((item) => !PRIMARY_HREFS.includes(item.href));
  const moreActive = moreItems.some((item) => pathname === item.href) || moreOpen;

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
        moreButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  const tabs = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/programs", label: "Programs", icon: ProgramsIcon },
    { href: "/events", label: "Events", icon: EventsIcon },
    { href: "/donate", label: "Donate", icon: DonateIcon },
  ];

  return (
    <div className="xl:hidden">
      {moreOpen ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close more menu"
            className="absolute inset-0 bg-slate-950/40"
            onClick={() => setMoreOpen(false)}
          />
          <div
            id="mobile-more-menu"
            className="absolute inset-x-0 bottom-[calc(var(--site-bottom-nav-h)+env(safe-area-inset-bottom))] max-h-[min(70svh,34rem)] overflow-y-auto rounded-t-3xl bg-white px-4 pb-4 pt-3 shadow-[0_-12px_40px_rgba(15,23,42,0.16)]"
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-200" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{t("More")}</p>
            <div className="mt-3 space-y-1.5">
              {moreItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                      active ? "bg-blue-950 text-white" : "text-slate-800 active:bg-slate-100"
                    }`}
                  >
                    <span>{t(item.label)}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/volunteer-registration"
              className="mt-4 flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800"
            >
              {t("Become a Volunteer")}
            </Link>
          </div>
        </div>
      ) : null}

      <nav
        aria-label={t("Mobile primary navigation")}
        className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md"
      >
        <div className="mx-auto grid h-[var(--site-bottom-nav-h)] max-w-[44rem] grid-cols-5">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
                  active ? "text-blue-950" : "text-slate-500"
                }`}
              >
                <tab.icon active={active} />
                {t(tab.label)}
              </Link>
            );
          })}
          <button
            ref={moreButtonRef}
            type="button"
            aria-label={moreOpen ? "Close more menu" : "Open more menu"}
            aria-expanded={moreOpen}
            aria-controls="mobile-more-menu"
            onClick={() => setMoreOpen((value) => !value)}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${
              moreActive ? "text-blue-950" : "text-slate-500"
            }`}
          >
            <MoreIcon active={moreActive} />
            {t("More")}
          </button>
        </div>
      </nav>
    </div>
  );
}

function iconClass(active: boolean) {
  return `h-5 w-5 ${active ? "text-blue-950" : "text-slate-500"}`;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)} aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProgramsIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)} aria-hidden="true">
      <path
        d="M5 7h14M5 12h14M5 17h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EventsIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)} aria-hidden="true">
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DonateIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)} aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.8C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(active)} aria-hidden="true">
      <circle cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}
