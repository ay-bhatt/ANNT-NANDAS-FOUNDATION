"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg font-poppins">AN</span>
              </div>
              <div>
                <p className="text-sm font-bold font-poppins leading-tight">अनंत नन्दा फाउंडेशन</p>
                <p className="text-[10px] text-primary-300 font-medium tracking-wider">ANNT NANDAS FOUNDATION</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-inter max-w-sm">
              From the Heart of the Himalayas, Building Futures Without Limits. Empowering communities through sports, education, and sustainable development.
            </p>
            <div className="flex gap-3">
              {[
                { name: "Facebook", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { name: "Instagram", icon: "M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z" },
                { name: "YouTube", icon: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={siteConfig.social[social.name.toLowerCase() as keyof typeof siteConfig.social]}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500/30 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-poppins mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Work", href: "/our-work" },
                { label: "Programs", href: "/programs" },
                { label: "Events", href: "/events" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors font-inter">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-poppins mb-5">Programs</h4>
            <ul className="space-y-3">
              {["Sports", "Education", "Healthcare", "Environment", "Women Empowerment", "Livelihood"].map((p) => (
                <li key={p}>
                  <Link href="/programs" className="text-gray-400 hover:text-white text-sm transition-colors font-inter">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-poppins mb-5">Support</h4>
            <ul className="space-y-3">
              {[
                { label: "Donate", href: "/donate" },
                { label: "Volunteer", href: "/volunteer-registration" },
                { label: "Partner With Us", href: "/contact" },
                { label: "FAQ", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors font-inter">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold font-poppins mb-5">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 font-inter">Stay updated on our latest news and events.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-xl bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-inter">
            © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors font-inter">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors font-inter">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}