import Image from "next/image";
import Link from "next/link";
import type { DonationInfo } from "@/lib/types";

export default function HomeDonationSection({ donation }: { donation: DonationInfo }) {
  return (
    <section className="section-padding px-3 sm:px-5" aria-labelledby="home-donation-title">
      <div className="container-premium">
        <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#071a3c_0%,#0d3b73_58%,#08775b_100%)] text-white shadow-[0_28px_80px_rgba(15,23,42,0.18)]">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" aria-hidden="true" />
          <div className="grid items-center gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:p-12">
            <div className="relative max-w-2xl">
              <span className="section-label-dark">Give With Purpose</span>
              <h2 id="home-donation-title" className="text-balance text-3xl font-bold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Your support becomes opportunity.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">
                Scan the verified foundation QR with any UPI app. Every contribution helps extend education, health, sport, environment, and livelihood initiatives in Himalayan communities.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/donate" className="btn-primary">
                  Donation details <span aria-hidden="true">→</span>
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Request a receipt
                </Link>
              </div>
              <p className="mt-5 text-xs leading-5 text-blue-200">
                Confirm the UPI ID <strong className="text-white">{donation.upiId}</strong> before completing payment. Keep your transaction reference for acknowledgement.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-[260px] rounded-[26px] bg-white p-4 text-center shadow-2xl lg:w-[260px]">
              <div className="relative aspect-square w-full">
                <Image
                  src={donation.qrImage}
                  alt={`UPI donation QR code for ${donation.upiId}`}
                  fill
                  sizes="260px"
                  className="object-contain"
                />
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Scan to support</p>
              <p className="mt-1 text-sm font-bold text-blue-950">{donation.upiId}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
