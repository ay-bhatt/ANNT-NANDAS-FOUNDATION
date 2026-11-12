"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImg from "@/assets/logo.webp";
import type { NavItem } from "@/lib/types";
import LanguageToggle from "@/components/i18n/LanguageToggle";
import { useI18n } from "@/components/i18n/LanguageProvider";
import BrandMark from "@/components/site/BrandMark";
import MobileBottomNav from "@/components/MobileBottomNav";
import DesktopGridBar from "@/components/DesktopGridBar";
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
  const { t, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-[70] w-full min-w-0 border-b bg-white transition-shadow duration-200 ${
          scrolled ? "border-slate-200/90 shadow-md" : "border-slate-200"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
        >
          {t("Skip to main content")}
        </a>

        <div className="mx-auto w-full min-w-0 max-w-[1920px] px-2.5 sm:px-4 xl:px-5 2xl:px-8">
          <nav aria-label={t("Primary navigation")} className="flex min-h-[var(--site-nav-h)] min-w-0 items-center gap-2 py-1.5 sm:gap-3 xl:h-[var(--site-nav-h)] xl:gap-4 xl:py-0">
            <Link
              href="/"
              className="flex min-w-0 flex-1 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:gap-2.5 xl:flex-none"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm min-[375px]:h-[60px] min-[375px]:w-[60px] md:h-16 md:w-16 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14">
                <Image
                  src={logoImg}
                  alt={`${ORG_NAME_EN} / ${ORG_NAME_HI}`}
                  fill
                  priority
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1 xl:flex-none">
                <BrandMark compact inline />
              </div>
            </Link>

            <div className="ml-auto hidden min-w-0 flex-1 items-center justify-end gap-2 xl:flex 2xl:gap-3">
              <div className="flex min-w-0 flex-nowrap items-center justify-end gap-0.5 2xl:gap-1">
                {navigationItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1.5 font-semibold transition-all duration-200 2xl:px-3 ${
                        locale === "hi" ? "text-[11px] 2xl:text-xs" : "text-xs 2xl:text-[13px]"
                      } ${
                        active
                          ? "bg-blue-600 text-white shadow-[0_8px_18px_rgba(37,99,235,0.28)]"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                    >
                      {t(item.label)}
                    </Link>
                  );
                })}
              </div>
              <LanguageToggle compact />
              <Link
                href="/register"
                aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition 2xl:px-4 2xl:text-sm ${
                  isActivePath(pathname, "/register")
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:text-emerald-800"
                }`}
              >
                {t("Join Us")}
              </Link>
              <Link
                href="/donate"
                className="shrink-0 whitespace-nowrap rounded-full bg-blue-950 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-900 2xl:px-4 2xl:text-sm"
              >
                {t("DONATION")}
              </Link>
            </div>

            <div className="ml-auto flex shrink-0 flex-col items-end gap-1 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-2 xl:hidden">
              <LanguageToggle compact />
              <Link
                href="/donate"
                className="inline-flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-950 px-3 text-[11px] font-bold tracking-wide text-white transition hover:bg-blue-900 min-[480px]:h-9 min-[480px]:px-4 min-[480px]:text-xs"
              >
                {t("DONATION")}
              </Link>
            </div>
          </nav>
        </div>
        <DesktopGridBar />
      </header>
      <MobileBottomNav navigationItems={navigationItems} />
    </>
  );
}
