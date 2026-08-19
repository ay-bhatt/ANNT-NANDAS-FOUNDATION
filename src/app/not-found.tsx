import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding px-4">
      <div className="container-premium">
        <div className="surface-card mx-auto max-w-2xl p-8 text-center sm:p-12">
          <p className="section-label">Page not found</p>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950">This page is not available</h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600">
            The link may be outdated or the page may have moved. You can return home or continue with a registration.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link href="/register" className="btn-outline-dark">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
