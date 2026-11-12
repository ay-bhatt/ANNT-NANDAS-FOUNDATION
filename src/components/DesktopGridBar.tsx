"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n/LanguageProvider";

interface GridNode {
  code: string;
  label: string;
  href: string;
  sectionId?: string;
}

const HOME_GRID_NODES: GridNode[] = [
  { code: "01", label: "Overview", href: "/#home-overview", sectionId: "home-overview" },
  { code: "02", label: "Events", href: "/#home-events", sectionId: "home-events" },
  { code: "03", label: "News", href: "/#home-news", sectionId: "home-news" },
  { code: "04", label: "Donation", href: "/#donation-categories", sectionId: "donation-categories" },
  { code: "05", label: "₹1 Cr Impact", href: "/#crore-impact", sectionId: "crore-impact" },
  { code: "06", label: "UPI Payment", href: "/#upi-donation-widget", sectionId: "upi-donation-widget" },
];

const ROUTE_GRID_NODES: GridNode[] = [
  { code: "01", label: "Home", href: "/" },
  { code: "02", label: "Programs", href: "/programs" },
  { code: "03", label: "Events", href: "/events" },
  { code: "04", label: "News", href: "/news" },
  { code: "05", label: "Donation", href: "/donate" },
  { code: "06", label: "₹1 Cr Impact", href: "/donate#crore-impact" },
];

export default function DesktopGridBar() {
  const pathname = usePathname();
  const { t } = useI18n();
  const isHome = pathname === "/";
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("home-overview");

  const nodes = useMemo(() => (isHome ? HOME_GRID_NODES : ROUTE_GRID_NODES), [isHome]);

  useEffect(() => {
    const updateScroll = () => {
      const doc = document.documentElement;
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setProgress(Math.round(ratio * 100));

      if (isHome) {
        const offset = 150;
        let current = HOME_GRID_NODES[0]?.sectionId ?? "home-overview";
        for (const node of HOME_GRID_NODES) {
          if (!node.sectionId) continue;
          const el = document.getElementById(node.sectionId);
          if (!el) continue;
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            current = node.sectionId;
          }
        }
        setActiveSection(current);
      }
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [isHome, pathname]);

  return (
    <div
      aria-label="Desktop section navigation and reading progress"
      className="relative hidden border-t border-slate-200/80 bg-slate-50/90 backdrop-blur-sm xl:block"
    >
      <div className="mx-auto flex h-8 max-w-[1920px] items-stretch justify-between divide-x divide-slate-200/80 px-5 2xl:px-8">
        <div className="flex items-center gap-2 pr-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>{isHome ? t("Overview") : t("Navigation")}</span>
        </div>

        <nav aria-label="Section grid bar" className="flex flex-1 items-stretch divide-x divide-slate-200/70">
          {nodes.map((node) => {
            const active = isHome
              ? activeSection === node.sectionId
              : pathname === node.href;

            return (
              <Link
                key={node.href}
                href={node.href}
                className={`group flex flex-1 items-center justify-center gap-1.5 px-3 text-[11px] font-semibold tracking-wide transition-colors duration-200 ${
                  active
                    ? "bg-white text-blue-800 shadow-[inset_0_-2px_0_0_#2563eb]"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
                }`}
              >
                <span
                  className={`font-mono text-[10px] transition-colors ${
                    active ? "text-emerald-600" : "text-slate-400 group-hover:text-blue-600"
                  }`}
                >
                  {node.code}
                </span>
                <span className="truncate">{t(node.label)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 pl-4 text-[11px] font-semibold tabular-nums text-slate-500">
          <span className="h-1.5 w-12 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </span>
          <span className="w-8 text-right text-slate-700">{progress}%</span>
        </div>
      </div>

      {/* Razor-thin full-width architectural progress rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-slate-200/60" aria-hidden="true">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
