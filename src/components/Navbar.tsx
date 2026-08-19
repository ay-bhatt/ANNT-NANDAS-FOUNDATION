"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImg from "@/assets/logo.webp";
import type { NavItem } from "@/lib/types";

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
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 ${
        scrolled ? "border-slate-200/90 bg-white shadow-md" : "border-slate-200 bg-white"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
      >
        Skip to main content
      </a>

      <div className="container-premium mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Primary navigation" className="flex h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-12 sm:w-12">
              <Image
                src={logoImg}
                alt="ANNT NANDAS Foundation Logo"
                fill
                priority
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="hidden min-w-0 min-[380px]:block">
              <p className="truncate text-sm font-extrabold uppercase tracking-wide text-slate-900 sm:text-base">
                ANNT NANDAS
              </p>
              <p className="truncate text-[10px] font-semibold uppercase tracking-widest text-emerald-700 sm:text-xs">
                Foundation
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
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
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/register"
              aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition xl:text-sm ${
                isActivePath(pathname, "/register")
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:text-emerald-800"
              }`}
            >
              Get Involved
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/register"
              aria-current={isActivePath(pathname, "/register") ? "page" : undefined}
              className={`inline-flex min-h-10 items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                isActivePath(pathname, "/register")
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              }`}
            >
              Get Involved
            </Link>
            <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 active:scale-95"
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
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto bg-white px-4 py-6 shadow-2xl lg:hidden"
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
                  <span>{item.label}</span>
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
              <span>Get Involved</span>
              <span aria-hidden="true" className="text-lg">
                →
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
