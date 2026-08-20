import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/logo.webp";
import caumasLogo from "@/assets/Caumas Logo white bg.png";
import type { SiteConfig, NavItem, ImpactArea } from "@/lib/types";

const supportLinks = [
  { label: "Register Now", href: "/register" },
  { label: "Membership", href: "/membership-registration" },
  { label: "Sports", href: "/sports-registration" },
  { label: "Partner With Us", href: "/contact" },
];

interface FooterProps {
  siteConfig: SiteConfig;
  navigationItems: NavItem[];
  impactAreas: ImpactArea[];
}

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors duration-200 hover:text-white"
    >
      <span className="h-px w-0 bg-emerald-400 transition-all duration-200 group-hover:w-3" />
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">{label}</span>
    </Link>
  );
}

export default function Footer({ siteConfig, navigationItems, impactAreas }: FooterProps) {
  const navItems = [
    ...navigationItems,
    { label: "Events", href: "/events" },
    { label: "News", href: "/news" },
    { label: "Contact Us", href: "/contact" },
  ].filter((item, index, list) => list.findIndex((entry) => entry.href === item.href) === index);

  const socials = [
    {
      label: "Instagram",
      href: siteConfig.social.instagram,
      icon: (
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      ),
    },
    {
      label: "YouTube",
      href: siteConfig.social.youtube,
      icon: (
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      ),
    },
    {
      label: "Facebook",
      href: siteConfig.social.facebook,
      icon: (
        <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
      ),
    },
    {
      label: "WhatsApp",
      href: whatsappHref(siteConfig.phone1),
      icon: (
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      ),
    },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden bg-slate-950 text-slate-200">
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-sky-400 to-blue-600" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.10),transparent_42%),radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.10),transparent_46%)]" />

      <div className="container-premium relative py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.2fr] lg:gap-12">
          <div className="space-y-6">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15 bg-white shrink-0 transition duration-200 group-hover:scale-105 group-hover:shadow-[0_10px_24px_rgba(16,185,129,0.25)]">
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-400">
                  Foundation
                </p>
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              {siteConfig.tagline}. We support children and communities through education, health, environment, sports, and opportunity.
            </p>

            <div className="space-y-3 pt-1">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="truncate text-sm text-slate-200">{siteConfig.email}</span>
              </a>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition duration-200 hover:border-emerald-400/40 hover:bg-white/[0.07]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <span className="flex flex-col gap-0.5 text-sm text-slate-200">
                  <a href={toTelHref(siteConfig.phone1)} className="transition hover:text-white">
                    {siteConfig.phone1}
                  </a>
                  {siteConfig.phone2 ? (
                    <a href={toTelHref(siteConfig.phone2)} className="text-slate-400 transition hover:text-white">
                      {siteConfig.phone2}
                    </a>
                  ) : null}
                </span>
              </div>

              <a
                href={mapsHref(siteConfig.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500 group-hover:text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <span className="text-sm leading-5 text-slate-300">{siteConfig.address}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:scale-110 hover:border-emerald-400/40 hover:bg-emerald-500 hover:text-white hover:shadow-[0_10px_20px_rgba(16,185,129,0.28)]"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Navigate
            </h4>
            <ul className="space-y-3.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <FooterNavLink href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Programs
            </h4>
            <ul className="space-y-3.5">
              {impactAreas.map((program) => (
                <li key={program.title}>
                  <FooterNavLink href="/programs" label={program.title} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-white">
              Get Involved
            </h4>
            <div className="space-y-4">
              <Link
                href="/donate"
                className="btn-primary flex w-full items-center justify-center min-h-12 px-5 text-sm font-semibold"
              >
                Donate Now
              </Link>
              <Link
                href="/volunteer-registration"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-white/10"
              >
                Become a Volunteer
              </Link>
              <ul className="space-y-3.5 pt-4">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <FooterNavLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p className="text-sm text-slate-500 order-2 md:order-1">
            © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400 order-3 md:order-2">
            <Link href="/contact" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          <div className="flex items-center gap-3 order-1 md:order-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Developed by
            </p>
            <div
              className="group relative h-11 w-36 overflow-hidden rounded-lg bg-white ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(37,99,235,0.22)]"
              aria-label="Developed by Caumas"
            >
              <Image
                src={caumasLogo}
                alt="Caumas"
                fill
                sizes="144px"
                className="object-contain scale-110 transition duration-200 group-hover:scale-125"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}