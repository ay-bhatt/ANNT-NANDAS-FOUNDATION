import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | ANNT NANDAS FOUNDATION",
  description: "How ANNT NANDAS FOUNDATION collects, uses, and protects personal information submitted through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="This policy explains what personal information we collect through anntnandasfoundation.com and how we use it. It reflects the website’s current forms, donations, and records."
    >
      <LegalSection title="Who we are">
        <p>
          ANNT NANDAS FOUNDATION (“we”, “us”) is a Section 8 non-profit organisation registered in Uttarakhand, India, with its work based in Mundoli, Chamoli. For privacy questions, email{" "}
          <a className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="mailto:info@anntnandasfoundation.com">
            info@anntnandasfoundation.com
          </a>{" "}
          or call +91 9639263202 / +91 7579004581.
        </p>
      </LegalSection>

      <LegalSection title="Information we collect">
        <p>We collect only the information you choose to send us through this website:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Contact form:</strong> name, email address, subject, and message.
          </li>
          <li>
            <strong>Registration forms:</strong> personal details (including name, parent names, date of birth, age, gender, nationality, address, post office, tehsil, district, state, country, PIN code, phone, email, WhatsApp, education, occupation, blood group), emergency contact details, programme-specific information, a photograph, a signature image, and your declaration.
          </li>
          <li>
            <strong>Donations:</strong> this website helps you open a UPI payment to the foundation’s UPI ID. We do not collect card numbers or bank passwords on this site. Your payment app (such as Google Pay or another UPI app) processes the transfer.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>We use submitted information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>respond to enquiries and partnership requests;</li>
          <li>review volunteer, membership, sports, event, and team applications;</li>
          <li>keep an official registration record for the foundation;</li>
          <li>contact you about your application or a programme;</li>
          <li>acknowledge donations where we can identify the payer.</li>
        </ul>
        <p>We do not sell personal information. We do not use it for advertising networks.</p>
      </LegalSection>

      <LegalSection title="Photographs and signatures">
        <p>
          Registration photographs and signatures are stored as files on the foundation’s server and may be included in the printable/PDF record sent to the foundation by email. They are used only for identification and official records.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and tracking">
        <p>
          This website does not currently use advertising cookies or third-party analytics tags such as Google Analytics. The hosting and application platform may set strictly necessary technical cookies required to operate the site. See our Cookie Policy for details.
        </p>
      </LegalSection>

      <LegalSection title="Sharing">
        <p>
          Information may be seen by authorised foundation administrators and, where needed, by the email provider used to deliver registration or contact messages. Payment apps handle UPI donations under their own policies. We may disclose information if required by Indian law.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <p>
          Contact messages are kept long enough to respond. Registration records are kept for the foundation’s operational and legal needs. You may ask us to update or delete a record where the law allows.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We take reasonable technical and organisational steps to protect records. No internet transmission is completely secure. Please use official pages only when submitting forms.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          Our programmes involve children and youth. A registration for a minor should be completed with a parent or guardian. If you believe we have information about a child without appropriate consent, contact us and we will review it.
        </p>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          You may request access, correction, or deletion of personal information we hold, subject to legal record-keeping duties. Write to info@anntnandasfoundation.com with enough detail for us to identify the request.
        </p>
      </LegalSection>

      <LegalSection title="Updates">
        <p>
          We may update this policy when our forms, hosting, or legal duties change. The “Last updated” date at the top of this page will change when we do.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
