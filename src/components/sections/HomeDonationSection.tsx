import type { DonationInfo } from "@/lib/types";
import DonationWidget from "@/components/donation/DonationWidget";

export default function HomeDonationSection({
  donation,
  amounts,
}: {
  donation: DonationInfo;
  amounts: number[];
}) {
  return (
    <section className="section-padding px-3 sm:px-5" aria-labelledby="home-donation-title">
      <div className="container-premium">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#071a3c_0%,#0d3b73_58%,#08775b_100%)] text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.95fr_1.05fr] lg:p-12">
            <div className="max-w-xl">
              <span className="section-label-dark">Give With Purpose</span>
              <h2 id="home-donation-title" className="text-balance text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Your support becomes opportunity.
              </h2>
              <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                {donation.description}
              </p>
            </div>
            <DonationWidget upiId={donation.upiId} payeeName={donation.payeeName} amounts={amounts} variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
