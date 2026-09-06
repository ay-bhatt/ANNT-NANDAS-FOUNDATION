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
import { PunchLine } from "@/components/site/SectionBlocks";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ORG_NAME_EN, ORG_NAME_HI } from "@/lib/i18n";

interface NavbarProps {
  navigationItems: NavItem[];
  motto: string;
  mottoHi: string;
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

export default function Navbar({ navigationItems, motto, mottoHi }: NavbarProps) {
  const pathname = usePathname();
  const { t } = useI18n();
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

        <div className="flex min-h-[var(--site-punchline-h)] items-center justify-center border-b border-white/10 bg-blue-950 px-3 py-1 text-center sm:py-1.5">
          <div className="max-w-[min(100%,40rem)] text-[10px] leading-snug text-emerald-100 min-[390px]:text-[11px] sm:text-xs">
            <PunchLine english={motto} hindi={mottoHi} align="center" tone="dark" />
          </div>
        </div>

        <div className="mx-auto w-full min-w-0 max-w-[1240px] px-3 sm:px-6 lg:px-8">
          <nav aria-label={t("Primary navigation")} className="flex h-[var(--site-nav-h)] min-w-0 items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="flex min-w-0 shrink items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:gap-3"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white sm:h-14 sm:w-14 xl:h-[72px] xl:w-[72px]">
                <Image
                  src={logoImg}
                  alt={`${ORG_NAME_EN} / ${ORG_NAME_HI}`}
                  fill
                  priority
                  sizes="72px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="hidden min-w-0 min-[430px]:block">
                <BrandMark compact />
              </div>
            </Link>

            <div className="ml-auto hidden min-w-0 items-center gap-3 xl:flex">
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
              <Link
                href="/donate"
                className="whitespace-nowrap rounded-full bg-blue-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-900 xl:text-sm"
              >
                {t("Donate Now")}
              </Link>
            </div>

            <div className="ml-auto flex shrink-0 items-center gap-1.5 xl:hidden">
              <LanguageToggle compact />
              <Link
                href="/donate"
                className="inline-flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-900 sm:px-4"
              >
                <span className="sm:hidden">{t("Donate")}</span>
                <span className="hidden sm:inline">{t("Donate Now")}</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <MobileBottomNav navigationItems={navigationItems} />
    </>
  );
}
