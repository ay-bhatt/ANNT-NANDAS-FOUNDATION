"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logoImg from "@/assets/logo.jpeg";
import type { NavItem } from "@/lib/types";

interface NavbarProps {
  navigationItems: NavItem[];
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

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle ESC key to close mobile menu
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
        scrolled
          ? "border-slate-200/90 bg-white shadow-md"
          : "border-slate-200 bg-white"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
      >
        Skip to main content
      </a>

      <div className="container-premium mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Primary navigation"
          className="flex h-[72px] items-center justify-between gap-4"
        >
          {/* Logo & Brand Name */}
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

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-150 xl:px-4 xl:text-sm ${
                    active
                      ? "bg-blue-950 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-950"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Volunteer Button */}
            <Link
              href="/volunteer-registration"
              className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition hover:bg-slate-50 active:scale-95 sm:inline-flex sm:px-4 sm:text-sm lg:inline-flex"
            >
              Volunteer
            </Link>

            {/* Donate Button */}
            <Link
              href="/donate"
              className="rounded-full bg-blue-950 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-900 active:scale-95 sm:px-5 sm:text-sm"
            >
              Donate Now
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 active:scale-95 lg:hidden"
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

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 top-[72px] z-50 flex flex-col justify-between overflow-y-auto bg-white px-4 py-6 shadow-2xl lg:hidden"
        >
          <div className="space-y-1.5">
            {navigationItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                    active
                      ? "bg-blue-950 text-white"
                      : "text-slate-800 hover:bg-slate-100 active:bg-slate-100"
                  }`}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true" className="text-lg">
                    →
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/volunteer-registration"
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Become a Volunteer
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 text-xs text-slate-600">
              <p className="font-bold text-slate-900">
                From the heart of the Himalayas
              </p>
              <p className="mt-1 leading-5">
                Creating opportunity through education, health, sports,
                environment, and community action.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}