import Image from "next/image";
import type { Metadata } from "next";
import { getAllData } from "@/lib/api";

export const metadata: Metadata = {
  title: "About Us | ANNT NANDAS FOUNDATION",
  description:
    "Meet founder Kalam Singh Bisht — ex-serviceman, COAS and GOC-in-C commendation awardee, Governor Award recipient, and 120 KM Hajar Ultra champion — and the Himalayan mission of ANNT NANDAS FOUNDATION.",
  alternates: { canonical: "/about" },
};
import { CTASection, PageHero, SectionHeading } from "@/components/site/SectionBlocks";

export default async function AboutPage() {
  const data = await getAllData();

  const {
    siteConfig,
    foundersGallery,
    founderInfo,
    coreValues,
    journeyMilestones,
  } = data;

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="About Us"
        title="A movement for generations to come"
        description="Founded in Mundoli, ANNT NANDAS FOUNDATION is rooted in service, discipline, and the belief that every child deserves a genuine opportunity to grow."
        image={foundersGallery[0]}
        actions={[
          { label: "Explore Programs", href: "/programs" },
          { label: "Support the Mission", href: "/donate", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="Born in the Himalayas, built with purpose"
              description="The foundation works with children, youth, women, and underserved communities through programmes that strengthen confidence, opportunity, health, and resilience."
            />
            <div className="space-y-4 text-base leading-8 text-slate-600">
              <p>
                Nestled in the Himalayan village of Mundoli, Chamoli, Uttarakhand, ANNT NANDAS FOUNDATION is more than a non-profit organisation — it is a movement dedicated to transforming lives through opportunity, compassion, and purpose.
              </p>
              <p>
                Founded on 1st May 2023 as an unregistered community effort under the name Mundoli Riders Club, the work began with an extraordinary dream and the simplest of resources: two bicycles and twelve children. On 27 May 2026 the organisation was registered as अनंत नन्दा फाउण्डेशन (ANNT NANDAS FOUNDATION), a Section 8 non-profit.
              </p>
              <p>
                Every child possesses a gift. Some discover it early. Many never do. We believe talent is not determined by wealth, geography, or social status. It exists in every village, every home, and every child waiting for someone to believe in them.
              </p>
              <p>
                Whether that journey leads to becoming a national athlete, a skilled professional, an entrepreneur, a government officer, or a responsible citizen, we stand beside every child throughout the journey. We are not simply creating athletes. We are building confident leaders and transforming generations.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="surface-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Founded</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{siteConfig.founded}</p>
              </div>
              <div className="surface-card p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Registered</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">{siteConfig.registered}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {foundersGallery.map((image, index) => (
              <div key={index} className={`relative overflow-hidden rounded-[28px] ${index === 0 ? "sm:col-span-2 aspect-[16/10]" : "aspect-[4/5]"}`}>
                <Image src={image} alt={`Foundation community story ${index + 1}`} fill sizes="(max-width: 767px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/70 px-3 sm:px-5">
        <div className="container-premium grid gap-8 lg:grid-cols-3">
          {[
            {
              eyebrow: "Why we exist",
              title: "The problem is not ability. It is opportunity.",
              body: "The Himalayan region is home to extraordinary resilience and remarkable human potential. Yet thousands of children in remote villages still face scarce sports facilities, limited educational resources, and almost no career guidance. Hidden talent remains undiscovered, and poverty continues across generations. We exist to change that reality — by empowering people with knowledge, skills, discipline, confidence, and lifelong independence.",
            },
            {
              eyebrow: "Our vision",
              title: "A future where every child has the chance to rise",
              body: "We envision a society where no child’s future is determined by poverty, geography, or circumstance. Every village should become a place of opportunity. Every young person should have the confidence, knowledge, and skills to build an independent life — and to represent their community with pride at district, state, national, and international levels.",
            },
            {
              eyebrow: "Our mission",
              title: "Transforming potential into purpose",
              body: "Rather than providing temporary relief, we focus on building lifelong capabilities. We identify hidden talent, nurture it with dedication, and create pathways in education, sports, leadership, entrepreneurship, skill development, environmental awareness, and community participation. When talent meets opportunity, lives change. When lives change, families grow stronger. When families grow stronger, villages prosper.",
            },
          ].map((block) => (
            <article key={block.title} className="surface-card p-6 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">{block.eyebrow}</p>
              <h2 className="mt-3 text-xl font-bold tracking-[-0.03em] text-slate-950">{block.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{block.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Our Journey"
            title="Every great movement begins with a step"
            description="A brief timeline of how a local effort evolved into a wider mission for Himalayan communities."
            centered
          />
          <div className="mx-auto max-w-4xl space-y-4">
            {journeyMilestones.map((item) => (
              <div key={item.year} className="surface-card flex gap-4 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 font-bold text-emerald-700">
                  {item.year}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="surface-dark relative overflow-hidden p-8 sm:p-10">
            <div className="absolute inset-0">
              <Image src={founderInfo.image} alt={`${founderInfo.name}, founder of ANNT NANDAS FOUNDATION`} fill sizes="100vw" className="object-cover opacity-20" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.95),rgba(15,23,42,0.78),rgba(30,64,175,0.34))]" />
            </div>
            <div className="relative z-10">
              <span className="section-label-dark">Founder</span>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">{founderInfo.name}</h2>
              <p className="mt-2 text-emerald-200">{founderInfo.title}</p>
              <p className="mt-6 text-base leading-8 text-slate-200">{founderInfo.fullBio}</p>
              <blockquote className="mt-6 border-l-2 border-emerald-300 pl-4 text-lg italic leading-8 text-white/90">
                “{founderInfo.quote}”
              </blockquote>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Leadership &amp; Vision"
              title="Grounded in experience, driven by service"
              description={founderInfo.description}
            />
            <div className="grid gap-3">
              {founderInfo.achievements.map((achievement) => (
                <div key={achievement} className="surface-card flex items-start gap-3 p-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</div>
                  <p className="text-sm leading-7 text-slate-600">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white/70 px-3 sm:px-5">
        <div className="container-premium">
          <SectionHeading eyebrow="Core Values" title="The principles behind every initiative" centered />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {coreValues.map((value) => (
              <div key={value.title} className="surface-card p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-400/15 to-blue-500/15 text-3xl">
                  {value.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to become part of our story?"
        description="Join the foundation as a volunteer, donor, or supporter and help create meaningful change across Himalayan communities."
        primary={{ label: "Become a Volunteer", href: "/volunteer-registration" }}
        secondary={{ label: "Donate Now", href: "/donate" }}
        image={founderInfo.image}
      />
    </div>
  );
}
