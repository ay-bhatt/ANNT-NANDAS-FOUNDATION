import { getAllData } from "@/lib/api";
import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import ContactForm from "./ContactForm"; // Import the client component

export const metadata: Metadata = {
  title: "Contact Us | ANNT NANDAS FOUNDATION",
  description: "Contact the foundation for volunteering, partnerships, program support, donations, and community collaboration.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const data = await getAllData();
  const { heroContent, siteConfig } = data;

  const contactCards = [
    { title: "Address", value: siteConfig.address, href: undefined },
    { title: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { title: "Phone", value: siteConfig.phone1, href: `tel:${siteConfig.phone1.replace(/\s+/g, "")}` },
    { title: "WhatsApp", value: "+91 9639263202", href: "https://wa.me/919639263202" },
  ];

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Contact Us"
        title="Let’s build a kinder, brighter future together"
        description="Whether you want to volunteer, support a program, collaborate, or simply learn more, we’d love to hear from you."
        image={heroContent.supportingVisuals[0]}
        actions={[
          { label: "Email Us", href: `mailto:${siteConfig.email}` },
          { label: "Call Now", href: `tel:${siteConfig.phone1.replace(/\s+/g, "")}`, variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Get in Touch"
              title="We’d love to hear from you"
              description="Reach out for volunteering, partnerships, donations, program support, or community collaboration."
            />

            <div className="grid gap-4">
              {contactCards.map((card) => (
                <div key={card.title} className="surface-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">{card.title}</p>
                  {card.href ? (
                    <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined} className="mt-3 block text-base font-medium text-slate-900 transition hover:text-emerald-700">
                      {card.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-base font-medium text-slate-900">{card.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="surface-card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Office Hours</p>
              <p className="mt-3 text-base leading-8 text-slate-700">
                We are available for direct conversations, volunteer inquiries, and partnership discussions throughout the week.
              </p>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8 lg:p-10">
            <SectionHeading
              eyebrow="Send a Message"
              title="Start the conversation"
              description="Send a quick message and we’ll get back to you as soon as possible."
            />

            <ContactForm />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                Follow on Instagram
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to contribute to the mission?"
        description="Join the foundation as a volunteer, donor, or partner and help create lasting change for Himalayan communities."
        primary={{ label: "Volunteer with Us", href: "/volunteer-registration" }}
        secondary={{ label: "Donate Now", href: "/donate" }}
        image={heroContent.supportingVisuals[1]}
      />
    </div>
  );
}