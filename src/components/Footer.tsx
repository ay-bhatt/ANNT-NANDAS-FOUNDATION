"use client";

import Link from "next/link";
import Image from "next/image"; // Import Next.js Image
import { siteConfig, navigationItems } from "@/lib/data";

// Import your new logo
import logoImg from "@/assets/logo.jpeg";

const supportLinks = [
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/volunteer-registration" },
  { label: "Partner With Us", href: "/contact" },
  { label: "FAQ", href: "/contact" },
];

const programs = [
  "Sports",
  "Education",
  "Healthcare",
  "Environment",
  "Women Empowerment",
  "Livelihood",
];

const socialLinks = [
  { name: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { name: "Instagram", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
  { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="container-premium py-16">
        <div className="grid gap-10 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              {/* Logo Container updated with Image component */}
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white shadow-lg overflow-hidden relative">
                <Image
                  src={logoImg}
                  alt="Annt Nandas Foundation Logo"
                  className="w-full h-full object-cover"
                  placeholder="blur" // Optional: gives a nice blur-up effect
                />
              </div>
              <div>
                <p className="text-sm font-bold font-poppins text-white leading-tight">अनंत नन्दा फाउंडेशन</p>
                <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">ANNT NANDAS FOUNDATION</p>
              </div>
            </Link>
            <p className="max-w-md text-sm leading-7 text-slate-400 font-inter">
              From the Heart of the Himalayas, Building Futures Without Limits. Empowering communities through sports, education, healthcare, and sustainable development.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={siteConfig.social[social.name.toLowerCase() as keyof typeof siteConfig.social]}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200 transition hover:bg-primary-500 hover:text-white"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 font-poppins">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-inter">
              {navigationItems.slice(1, 7).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 font-poppins">Programs</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-inter">
              {programs.map((program) => (
                <li key={program}>
                  <Link href="/programs" className="transition hover:text-white">
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 font-poppins">Support</h4>
            <ul className="space-y-3 text-sm text-slate-400 font-inter">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-premium flex flex-col gap-4 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="#" className="transition hover:text-white">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}