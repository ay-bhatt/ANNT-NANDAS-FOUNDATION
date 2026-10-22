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

        <div className="mx-auto w-full min-w-0 max-w-[1920px] px-3 sm:px-4 xl:px-5 2xl:px-8">
          <nav aria-label={t("Primary navigation")} className="flex h-[var(--site-nav-h)] min-w-0 items-center gap-2 sm:gap-3 xl:gap-4">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:gap-2.5"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white md:h-16 md:w-16">
                <Image
                  src={logoImg}
                  alt={`${ORG_NAME_EN} / ${ORG_NAME_HI}`}
                  fill
                  priority
                  sizes="64px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="min-w-0 max-w-[calc(100vw-13rem)] sm:max-w-[min(45vw,14rem)]">
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
                DONATION
              </Link>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:hidden">
              <LanguageToggle compact />
              <Link
                href="/donate"
                className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-900 sm:px-4"
              >
                DONATION
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <MobileBottomNav navigationItems={navigationItems} />
    </>
  );
}
