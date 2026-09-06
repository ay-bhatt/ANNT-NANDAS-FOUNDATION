import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import { getAllData } from "@/lib/api";
import { mouDocument } from "@/lib/mou-sop";
import { MOU_COOKIE_NAME, verifyMouSessionToken } from "@/lib/mou-session";
import MouLogoutButton from "./MouLogoutButton";

export const metadata: Metadata = {
  title: "MOU Standard Operating Procedure | ANNT NANDAS FOUNDATION",
  description: "Internal MOU Standard Operating Procedure for authorised administrators.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/mou" },
};

export const dynamic = "force-dynamic";

export default async function MouPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(MOU_COOKIE_NAME)?.value;

  if (!(await verifyMouSessionToken(token))) {
    redirect("/mou/login");
  }

  const { heroContent } = await getAllData();

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Internal Document"
        title={mouDocument.title}
        description={`${mouDocument.subtitle}. Version ${mouDocument.version} · Updated ${mouDocument.updated}.`}
        image={heroContent.supportingVisuals[2]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Protected SOP"
              title="Use this procedure for every partnership agreement"
              description="This document is visible only after a valid administrator session is created."
            />
            <MouLogoutButton />
          </div>

          <div className="space-y-5">
            {mouDocument.sections.map((section) => (
              <article key={section.title} className="surface-card p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm leading-7 text-slate-600">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
