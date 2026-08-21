import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy | ANNT NANDAS FOUNDATION",
  description: "How cookies are used on the ANNT NANDAS FOUNDATION website.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="This page describes the cookies this website actually uses. We do not currently run advertising or analytics cookie banners because we do not load those services."
    >
      <LegalSection title="What cookies are">
        <p>
          Cookies are small text files stored on your device by a website. They can be essential for the site to work, or optional for analytics and marketing.
        </p>
      </LegalSection>

      <LegalSection title="What this website uses">
        <p>
          This website does <strong>not</strong> currently embed Google Analytics, Meta Pixel, advertising networks, or other third-party tracking scripts.
        </p>
        <p>
          The hosting platform and the Next.js application may set <strong>strictly necessary technical cookies or similar storage</strong> so the site can load, keep a session secure, or remember a basic preference. These are not used to profile you for advertising.
        </p>
      </LegalSection>

      <LegalSection title="Forms and local files">
        <p>
          Contact and registration data is sent to our servers when you submit a form. That is not a marketing cookie. Photographs and signatures are uploaded as files for the registration record.
        </p>
      </LegalSection>

      <LegalSection title="How you can manage cookies">
        <p>
          You can block or delete cookies in your browser settings. Blocking all cookies may affect how some websites function. Because we do not run an optional analytics suite, there is no separate cookie-preference centre on this site at present.
        </p>
      </LegalSection>

      <LegalSection title="Updates">
        <p>
          If we later add analytics or other optional cookies, we will update this policy and, where required, ask for consent. Questions: info@anntnandasfoundation.com.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
