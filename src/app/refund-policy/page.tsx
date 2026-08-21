import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy | ANNT NANDAS FOUNDATION",
  description: "Refund and cancellation information for donations made to ANNT NANDAS FOUNDATION.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      description="This policy applies to donations initiated from this website through UPI. The foundation does not sell physical goods, so there is no shipping or delivery policy."
    >
      <LegalSection title="How donations work">
        <p>
          You choose an amount on the Donate page and complete payment in Google Pay or another UPI app. The website does not charge cards on our own checkout page.
        </p>
      </LegalSection>

      <LegalSection title="Voluntary donations">
        <p>
          Donations are voluntary gifts to support the foundation’s charitable work. Successful UPI transfers are generally final. We do not offer cancellation of a completed donation in the ordinary course.
        </p>
      </LegalSection>

      <LegalSection title="Mistaken or failed payments">
        <p>
          If you paid the wrong amount, paid twice, or the app showed success but the foundation did not receive the funds, email info@anntnandasfoundation.com with the UPI reference, date, amount, and a screenshot if available. We will review bank/UPI records. Any refund of a genuine duplicate or error is made only after verification and may take time depending on the payment system.
        </p>
      </LegalSection>

      <LegalSection title="Tax receipts">
        <p>
          The foundation is registered under 12A and 80G. Receipts, where applicable, depend on us being able to identify the donor. Keep your UPI reference.
        </p>
      </LegalSection>

      <LegalSection title="Registrations">
        <p>
          Submitting a registration form does not involve a website fee. There is nothing to refund for a form submission itself.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          ANNT NANDAS FOUNDATION, Mundoli, Chamoli, Uttarakhand. Email: info@anntnandasfoundation.com. Phone: +91 9639263202, +91 7579004581.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
