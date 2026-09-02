import type { Metadata } from "next";
import Link from "next/link";
import { renderNotFoundMarkdown } from "@/lib/agent/pages";
import { SITE_URL } from "@/lib/agent/site";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Page not found | ANNT NANDAS FOUNDATION",
  description: "The page you requested is not available on the ANNT NANDAS FOUNDATION website.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="container-premium">
        <div className="surface-card mx-auto max-w-2xl p-8 sm:p-12">
          <p className="section-label text-center">404</p>
          <h1 className="text-center text-4xl font-bold tracking-[-0.04em] text-slate-950"><T>Page not found</T></h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-base leading-8 text-slate-600">
            <T>This address is not on our website. The link may be old, or the page may have moved. You can return home, browse programmes, or contact the team.</T>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              <T>Return Home</T>
            </Link>
            <Link href="/programs" className="btn-outline-dark">
              <T>View Programs</T>
            </Link>
            <Link href="/contact" className="btn-outline-dark">
              <T>Contact Us</T>
            </Link>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">For AI agents</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This response is HTTP 404. Use the machine-readable index rather than guessing URLs.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <a className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="/llms.txt">
                  {SITE_URL}/llms.txt
                </a>
              </li>
              <li>
                <a className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="/sitemap.xml">
                  {SITE_URL}/sitemap.xml
                </a>
              </li>
              <li>
                <Link className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="/about">
                  About
                </Link>
                {", "}
                <Link className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="/contact">
                  Contact
                </Link>
                {", "}
                <Link className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="/privacy">
                  Privacy
                </Link>
              </li>
            </ul>
            <pre className="mt-5 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-left text-xs leading-6 text-slate-100">
              {renderNotFoundMarkdown()}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
