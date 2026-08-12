import Image from "next/image";
import type { Metadata } from "next";
import { getAllData } from "@/lib/api";
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";

export const metadata: Metadata = {
  title: "Donate | ANNT NANDAS FOUNDATION",
  description: "Support verified grassroots programs through the foundation’s UPI donation channel.",
  alternates: { canonical: "/donate" },
};

export default async function DonatePage() {
  const data = await getAllData();
  const { donationImpacts, donationInfo, donationAmounts, heroContent } = data;
  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Support Us"
        title="Make a donation that reaches real communities"
        description="Your contribution supports grassroots programmes across education, healthcare, environment, sports, youth development, and women empowerment."
        image={heroContent.image}
        actions={[
          { label: "Contact for Partnership", href: "/contact" },
          { label: "Become a Volunteer", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="surface-card p-6 text-center sm:p-8">
            <SectionHeading
              eyebrow="UPI Donation"
              title={donationInfo.title}
              description={donationInfo.description}
            />
            <div className="mx-auto max-w-xs rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
              <div className="relative mx-auto aspect-square overflow-hidden rounded-[24px] bg-slate-50">
                <Image
                  src={donationInfo.qrImage}
                  alt={`UPI donation QR code for ${donationInfo.upiId}`}
                  fill
                  sizes="320px"
                  className="object-contain p-4"
                />
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">UPI ID</p>
              <p className="mt-2 text-lg font-bold text-slate-950">{donationInfo.upiId}</p>
            </div>
            <ol className="mt-6 space-y-3 text-left text-sm leading-7 text-slate-600">
              {donationInfo.instructions.map((instruction, index) => (
                <li key={instruction} className="surface-card flex gap-3 p-4 shadow-none">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">{index + 1}</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading
              eyebrow="Give With Purpose"
              title="Every amount can support meaningful change"
              description="Use the QR code to donate directly through your UPI app. Below are sample giving levels and their likely impact."
            />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {donationImpacts.map((item) => (
                <div key={item.amount} className="surface-card p-5">
                  <p className="text-3xl font-bold tracking-[-0.03em] text-slate-950">₹{item.amount.toLocaleString()}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.impact}</p>
                </div>
              ))}
            </div>
            <div className="surface-card mt-6 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-950">Suggested donation levels</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {donationAmounts.map((amount) => (
                  <span key={amount} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700">
                    ₹{amount.toLocaleString()}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-600">
                If you need receipts, partnership information, or support for institutional giving, please reach out through the contact page after completing your contribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Support the mission beyond a one-time donation"
        description="You can also volunteer, partner with the team, or help expand the foundation’s reach in your network and community."
        primary={{ label: "Contact the Team", href: "/contact" }}
        secondary={{ label: "Volunteer Registration", href: "/volunteer-registration" }}
        image={heroContent.supportingVisuals[0]}
      />
    </div>
  );
}
