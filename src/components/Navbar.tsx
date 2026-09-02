"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import logoImg from "@/assets/logo.webp";
import type { NavItem } from "@/lib/types";
import LanguageToggle from "@/components/i18n/LanguageToggle";
import { useI18n } from "@/components/i18n/LanguageProvider";
import BrandMark from "@/components/site/BrandMark";
import { ORG_NAME_EN, ORG_NAME_HI } from "@/lib/i18n";

interface NavbarProps {
  navigationItems: NavItem[];
}

function isActivePath(pathname: string, href: string) {
  if (href.includes("#")) {
    const [path, hash] = href.split("#");
    if (pathname !== (path || "/")) return false;
    if (typeof window === "undefined") return false;
    return window.location.hash === `#${hash}`;
  }
  if (href === "/") return pathname === "/";
  if (href === "/register") {
    return pathname === "/register" || pathname.includes("registration");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ navigationItems }: NavbarProps) {
  const pathname = usePathname();
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-[70] w-full min-w-0 border-b bg-white px-4 transition-shadow duration-200 sm:px-6 lg:px-8 ${
          scrolled ? "border-slate-200/90 shadow-md" : "border-slate-200"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
        >
          {t("Skip to main content")}
        </a>

        <div className="mx-auto w-full min-w-0 max-w-[1240px]">
          <nav aria-label={t("Primary navigation")} className="flex h-[var(--nav-height)] min-w-0 items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="flex min-w-0 shrink items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:gap-3"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:h-[88px] sm:w-[88px]">
                <Image
                  src={logoImg}
                  alt={`${ORG_NAME_EN} / ${ORG_NAME_HI}`}
                  fill
                  priority
                  sizes="88px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="hidden min-w-0 min-[430px]:block">
                <BrandMark compact />
              </div>
            </Link>

            <div className="ml-auto hidden min-w-0 items-center gap-3 lg:flex">
              <div className="flex min-w-0 items-center overflow-x-auto rounded-full bg-slate-100/90 p-1 shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {navigationItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-200 xl:px-3.5 xl:text-xs 2xl:px-4 2xl:text-sm ${
                        active
                          ? "bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.28)]"
                          : "text-slate-500 hover:bg-white/80 hover:text-slate-800"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  );
                })}
              </div>
              <LanguageToggle />
              <Link
                href="/register"
                aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition xl:text-sm ${
                  isActivePath(pathname, "/register")
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:text-emerald-800"
                }`}
              >
                {t("Join Us")}
              </Link>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1.5 lg:hidden">
              <LanguageToggle compact />
              <button
                ref={menuButtonRef}
                type="button"
                aria-label={mobileOpen ? t("Close navigation menu") : t("Open navigation menu")}
                aria-expanded={mobileOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMobileOpen((value) => !value)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 active:scale-95"
              >
                <div className="relative flex h-4 w-5 flex-col justify-between">
                  <span
                    className={`h-0.5 w-full origin-center rounded-full bg-slate-900 transition-all duration-300 ${
                      mobileOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 w-full rounded-full bg-slate-900 transition-all duration-200 ${
                      mobileOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 w-full origin-center rounded-full bg-slate-900 transition-all duration-300 ${
                      mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
              <Link
                href="/register"
                aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
                className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 sm:px-4"
              >
                {t("Join Us")}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-navigation"
            id="mobile-navigation"
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.8 }}
            className="fixed inset-0 z-[65] bg-white lg:hidden"
          >
            <div className="h-[var(--nav-height)] shrink-0 bg-white" aria-hidden="true" />
            <nav
              aria-label={t("Mobile navigation")}
              className="h-[calc(100svh-var(--nav-height))] overflow-y-auto bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3"
            >
              <div className="space-y-1.5">
                {navigationItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                        active ? "bg-blue-950 text-white" : "text-slate-800 hover:bg-slate-100 active:bg-slate-100"
                      }`}
                    >
                      <span>{t(item.label)}</span>
                      <span aria-hidden="true" className="text-lg">
                        →
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href="/register"
                  aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
                  className={`mt-3 flex items-center justify-between rounded-xl border px-4 py-3.5 text-base font-semibold transition ${
                    isActivePath(pathname, "/register")
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  <span>{t("Join Us")}</span>
                  <span aria-hidden="true" className="text-lg">
                    →
                  </span>
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
