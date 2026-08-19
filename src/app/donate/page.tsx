import type { Metadata } from "next";
import { getAllData } from "@/lib/api";
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import DonationWidget from "@/components/donation/DonationWidget";

export const metadata: Metadata = {
  title: "Donate | ANNT NANDAS FOUNDATION",
  description: "Support verified grassroots programs through UPI, Google Pay, or QR donation.",
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
        <div className="container-premium grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="surface-card p-6 sm:p-8">
            <SectionHeading
              eyebrow="UPI Donation"
              title={donationInfo.title}
              description={donationInfo.description}
            />
            <DonationWidget
              upiId={donationInfo.upiId}
              payeeName={donationInfo.payeeName}
              amounts={donationAmounts}
            />
            <ol className="mt-6 space-y-3 text-left text-sm leading-7 text-slate-600">
              {donationInfo.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3 rounded-[22px] bg-slate-50 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <SectionHeading
              eyebrow="Give With Purpose"
              title="Every amount can support meaningful change"
              description="Select an amount, then donate through Google Pay or any UPI app. If a payment app does not open, scan the QR or copy the UPI ID."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {donationImpacts.map((item) => (
                <div key={item.amount} className="surface-card p-5">
                  <p className="text-3xl font-bold tracking-[-0.03em] text-slate-950">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.impact}</p>
                </div>
              ))}
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
