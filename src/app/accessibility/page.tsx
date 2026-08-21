import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility | ANNT NANDAS FOUNDATION",
  description: "Accessibility commitment for the ANNT NANDAS FOUNDATION website.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      description="We want people of all abilities to be able to learn about the foundation, register, donate, and contact us."
    >
      <LegalSection title="Our commitment">
        <p>
          We aim to meet commonly used web accessibility practices, including readable text, keyboard access, visible focus states, and alternative text for meaningful images.
        </p>
      </LegalSection>

      <LegalSection title="What you should be able to do">
        <ul className="list-disc space-y-2 pl-5">
          <li>move through navigation, forms, and buttons with a keyboard;</li>
          <li>use a screen reader to hear page titles, headings, and form labels;</li>
          <li>enlarge text in the browser;</li>
          <li>reach Home, Contact, and registration pages without a mouse.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Known limits">
        <p>
          Some photographs are decorative or tightly cropped for layout. Complex award collages may not have a full text equivalent of every word in the image. We continue to improve contrast, forms, and mobile layouts.
        </p>
      </LegalSection>

      <LegalSection title="Tell us if something is hard to use">
        <p>
          Email{" "}
          <a className="font-semibold text-blue-700 underline-offset-2 hover:underline" href="mailto:info@anntnandasfoundation.com">
            info@anntnandasfoundation.com
          </a>{" "}
          with the page address and what went wrong. We will try to provide the information in another format where we can.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
