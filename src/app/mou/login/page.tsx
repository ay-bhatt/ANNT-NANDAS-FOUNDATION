import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import { getAllData } from "@/lib/api";
import MouLoginForm from "./MouLoginForm";

export const metadata: Metadata = {
  title: "MOU Access | ANNT NANDAS FOUNDATION",
  description: "Password-protected access to the foundation’s MOU Standard Operating Procedure.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/mou/login" },
};

export default async function MouLoginPage() {
  const { heroContent } = await getAllData();

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Internal Access"
        title="MOU Standard Operating Procedure"
        description="This section is restricted to authorised administrators. Enter the access password to continue."
        image={heroContent.supportingVisuals[1]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <div className="mx-auto max-w-xl surface-card p-6 sm:p-8">
            <SectionHeading
              eyebrow="Secure Access"
              title="MOU Standard Operating Procedure"
              description="Enter the administrator password to view the protected operating procedure."
            />
            <MouLoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}
