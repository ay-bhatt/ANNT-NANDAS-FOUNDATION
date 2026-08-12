import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.jpeg";
import type { SiteConfig, NavItem } from "@/lib/types";
import type { ImpactArea } from "@/lib/types";

const supportLinks = [
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/volunteer-registration" },
  { label: "Partner With Us", href: "/contact" },
  { label: "General Registration", href: "/general-registration" },
];

interface FooterProps {
  siteConfig: SiteConfig;
  navigationItems: NavItem[];
  impactAreas: ImpactArea[];
}

export default function Footer({ siteConfig, navigationItems, impactAreas }: FooterProps) {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-200 border-t border-white/10">
      <div className="container-premium py-14">
        {/* --- MAIN GRID --- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          
          {/* COLUMN 1: BRAND & CONTACT */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15 bg-white shrink-0 group-hover:scale-105 transition-transform">
                <Image
                  src={logoImg}
                  alt="ANNT NANDAS FOUNDATION logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-base font-bold uppercase tracking-[0.08em] text-white">
                  ANNT NANDAS
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-success-400">
                  Foundation
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.tagline}. We support children and communities through education, health, environment, sports, and opportunity.
            </p>

            {/* Contact Info */}
            <div className="space-y-1.5 pt-2 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <span className="text-success-400">✉</span> {siteConfig.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-success-400">📞</span> {siteConfig.phone1}
              </p>
              <p className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="text-success-400">📍</span> {siteConfig.address}
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/anntnandasfoundation/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-success-600 hover:text-white text-slate-300 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@ANNTNANDASFOUNDATION"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-success-600 hover:text-white text-slate-300 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/anita.bisht.549436/videos/anant-nanda-foundation-ki-team/1159831703008107/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-success-600 hover:text-white text-slate-300 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2: NAVIGATE */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-success-400 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: PROGRAMS */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {impactAreas.map((program) => (
                <li key={program.title}>
                  <Link
                    href="/programs"
                    className="transition hover:text-success-400 hover:underline"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: GET INVOLVED */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-success-400 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-6 text-xs text-slate-400">
            <Link href="/contact" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}