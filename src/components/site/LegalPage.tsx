import type { ReactNode } from "react";

export function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="pb-8">
      <section className="bg-slate-950 px-4 py-12 text-white sm:py-16">
        <div className="container-premium max-w-3xl">
          <p className="section-label-dark">Legal</p>
          <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
          <p className="mt-3 text-xs text-slate-400">Last updated: 21 August 2026</p>
        </div>
      </section>
      <section className="px-4 py-10 sm:py-12">
        <div className="container-premium max-w-3xl space-y-8 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          {children}
        </div>
      </section>
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-[-0.03em] text-slate-950">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
