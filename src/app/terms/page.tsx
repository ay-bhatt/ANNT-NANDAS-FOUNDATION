import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | ANNT NANDAS FOUNDATION",
  description: "Terms of use for the ANNT NANDAS FOUNDATION website, registrations, and donations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="These terms govern use of this website, including browsing, registrations, enquiries, and UPI donations."
    >
      <LegalSection title="Agreement">
        <p>
          By using anntnandasfoundation.com you agree to these terms and to our Privacy Policy. If you do not agree, please do not use the site.
        </p>
      </LegalSection>

      <LegalSection title="About the organisation">
        <p>
          ANNT NANDAS FOUNDATION is a registered Section 8 non-profit in Uttarakhand, India. Content on this site describes our mission, programmes, events, and ways to take part. Submitting a form does not automatically confirm selection, membership, volunteering, or event participation.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>submit false, misleading, or another person’s information without authority;</li>
          <li>upload unlawful, harmful, or infringing content;</li>
          <li>attempt to disrupt, scrape excessively, or gain unauthorised access to the site;</li>
          <li>use the site for spam or commercial abuse.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Registrations and user content">
        <p>
          You are responsible for the accuracy of registration details, photographs, and signatures. You confirm that uploaded images belong to you (or you have the right to submit them) and may be used by the foundation for registration, verification, and official records.
        </p>
      </LegalSection>

      <LegalSection title="Donations">
        <p>
          Donations made through UPI leave this website and are completed in your payment application. The payee name should be ANNT NANDAS FOUNDATION. Keep your transaction reference. See the Refund Policy for unsuccessful or mistaken payments.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          Website text, branding, layout, and original photographs are owned by ANNT NANDAS FOUNDATION or used with permission. You may share links to public pages. You may not copy the site for commercial use without written consent.
        </p>
      </LegalSection>

      <LegalSection title="External links">
        <p>
          The site links to third parties such as social media, maps, UPI apps, and the Caumas website. We are not responsible for their content or practices.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer">
        <p>
          Information is provided in good faith for public awareness. Programme details, dates, and opportunities may change. The site is provided “as is” without warranties of uninterrupted access.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the extent permitted by Indian law, the foundation is not liable for indirect or consequential loss arising from use of the website. Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms, the website, or programmes at any time. Continued use after changes means you accept the updated terms.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of India. Courts in Uttarakhand have jurisdiction, without limiting any non-waivable consumer or donor protections.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          ANNT NANDAS FOUNDATION, Mundoli, Chamoli, Uttarakhand, India. Email: info@anntnandasfoundation.com. Phone: +91 9639263202, +91 7579004581.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
