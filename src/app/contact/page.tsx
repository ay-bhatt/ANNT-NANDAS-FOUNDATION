import { getAllData } from "@/lib/api";
import type { Metadata } from "next";
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";

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
        title="Let’s connect and build something meaningful"
        description="Reach out for partnerships, volunteering, programme support, or any questions about the foundation’s work."
        image={heroContent.supportingVisuals[0]}
        actions={[
          { label: "Donate Today", href: "/donate" },
          { label: "Volunteer", href: "/volunteer-registration", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Get In Touch"
              title="We’d love to hear from you"
              description="Whether you are a supporter, volunteer, institution, or community member, there are many ways to connect with the team."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {contactCards.map((card) => (
                <div key={card.title} className="surface-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">{card.title}</p>
                  {card.href ? (
                    <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="mt-3 block text-base leading-7 text-slate-700 hover:text-blue-700">
                      {card.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-base leading-7 text-slate-700">{card.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="surface-card mt-6 overflow-hidden p-2">
              <iframe
                title="ANNT NANDAS FOUNDATION location"
                src="https://www.google.com/maps?q=Mundoli%2C%20Chamoli%2C%20Uttarakhand%2C%20India&z=11&output=embed"
                width="100%"
                height="340"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[24px]"
              />
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8 lg:p-10">
            <SectionHeading
              eyebrow="Send a Message"
              title="Start the conversation"
              description="Send an email using your device’s mail app, or use the direct contact details alongside."
            />
            <form action={`mailto:${siteConfig.email}`} method="post" encType="text/plain" className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-800">Your name</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" className="w-full" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-800">Your email</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="Your email" className="w-full" />
                </div>
              </div>
              <label htmlFor="contact-subject" className="mb-[-8px] block text-sm font-medium text-slate-800">Subject</label>
              <input id="contact-subject" name="subject" type="text" required placeholder="Subject" />
              <label htmlFor="contact-message" className="mb-[-8px] block text-sm font-medium text-slate-800">Message</label>
              <textarea id="contact-message" name="message" required placeholder="Tell us how you’d like to connect" rows={7} className="resize-none" />
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send message
              </button>
            </form>
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
        title="Ready to support the mission directly?"
        description="You can partner, volunteer, donate, or simply start a conversation with the foundation team today."
        primary={{ label: "Donate Now", href: "/donate" }}
        secondary={{ label: "Volunteer Registration", href: "/volunteer-registration" }}
        image={heroContent.supportingVisuals[2]}
      />
    </div>
  );
}
