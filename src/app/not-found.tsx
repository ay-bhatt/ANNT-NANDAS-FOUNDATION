import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | ANNT NANDAS FOUNDATION",
  description: "The page you requested is not available on the ANNT NANDAS FOUNDATION website.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="container-premium">
        <div className="surface-card mx-auto max-w-2xl p-8 text-center sm:p-12">
          <p className="section-label">404</p>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950">Page not found</h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600">
            This address is not on our website. The link may be old, or the page may have moved. You can return home, browse programmes, or contact the team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link href="/programs" className="btn-outline-dark">
              View Programs
            </Link>
            <Link href="/contact" className="btn-outline-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
