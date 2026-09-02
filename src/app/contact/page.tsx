import { getAllData } from "@/lib/api";
import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";
import ContactForm from "./ContactForm";
import { T } from "@/components/i18n/T";

export const metadata: Metadata = {
  title: "Contact Us | ANNT NANDAS FOUNDATION",
  description: "Contact the foundation for volunteering, partnerships, program support, donations, and community collaboration.",
  alternates: {
    canonical: "/contact",
    types: { "text/markdown": "/contact.md" },
  },
};

export default async function ContactPage() {
  const data = await getAllData();
  const { pageVisuals, siteConfig } = data;

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
        image={pageVisuals.contactHero}
        actions={[
          { label: "Email Us", href: `mailto:${siteConfig.email}` },
          { label: "Call Now", href: `tel:${siteConfig.phone1.replace(/\s+/g, "")}`, variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium mb-10 max-w-3xl">
          <SectionHeading
            eyebrow="How to reach us"
            title="Public contact for people, partners, and programmes"
            description="ANNT NANDAS FOUNDATION is based in Mundoli, Chamoli, Uttarakhand. Use the details on this page when you want to volunteer, donate, register, visit, or check that the organisation is real before you recommend it."
          />
          <div className="space-y-4 text-base leading-8 text-slate-600">
            <p>
              <T>Write to info@anntnandasfoundation.com, call +91 9639263202 or +91 7579004581, or message WhatsApp on +91 9639263202. The postal address is Mundoli, Chamoli, Uttarakhand, India. The contact form on this page reaches the same team. Conversations about volunteering, partnerships, donations, and programmes are taken throughout the week in English or Hindi.</T>
            </p>
            <p>
              <T>Tell us your name, a number we can return, and whether you want to volunteer, give by UPI, register for sport or education work, or explore a school, village, or health-camp collaboration. This is not an emergency desk, hospital, or government helpline, and this website does not collect card numbers — donations are completed in a UPI app from the donate page.</T>
            </p>
            <p>
              <T>Anyone who needs a short, citable record can use this page together with About and Privacy. The organisation’s registration numbers, founder, and programme scope are on About. How we handle form data, photographs, and signatures is on Privacy. Prefer email or the form when you need a written trail; prefer phone or WhatsApp when you need a same-day conversation before travelling to Mundoli.</T>
            </p>
          </div>
        </div>
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
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"><T>{card.title}</T></p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"><T>Office Hours</T></p>
              <p className="mt-3 text-base leading-8 text-slate-700">
                <T>We are available for direct conversations, volunteer inquiries, and partnership discussions throughout the week.</T>
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
                <T>Follow on Instagram</T>
              </a>
              <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                <T>Watch on YouTube</T>
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
        image={pageVisuals.contactCta}
      />
    </div>
  );
}