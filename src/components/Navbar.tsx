"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Import your new logo
import logoImg from "@/assets/logo.jpeg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Work", href: "/our-work" },
    { label: "Programs", href: "/programs" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-md"
            : "bg-white"
        }`}
      >
        {/* Expanded width container with larger side paddings */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
          <nav className="flex items-center justify-between h-16 md:h-[80px]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow overflow-hidden relative">
                <Image 
                  src={logoImg} 
                  alt="Annt Nandas Foundation Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-base font-bold font-poppins text-gray-900 leading-tight">
                  ANNT NANDAS
                </p>
                <p className="text-[11px] font-medium text-gray-500 tracking-wider">
                  FOUNDATION
                </p>
              </div>
            </Link>

            {/* Desktop Nav - Increased gaps for better spacing */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? "text-primary-600 bg-primary-50"
                      : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <Link
                href="/volunteer-registration"
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-primary-500 text-primary-500 font-semibold text-sm hover:bg-primary-500 hover:text-white transition-all duration-200"
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 transition-all duration-200 shadow-sm"
              >
                Donate Now
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                  <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                  <span className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="w-full mx-auto px-4 sm:px-6">
              <div className="py-4 space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-primary-600 bg-primary-50"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="pb-4 space-y-3">
                <Link
                  href="/volunteer-registration"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-primary-500 text-primary-500 font-semibold text-sm"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-nature-500 text-white font-semibold text-sm"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}