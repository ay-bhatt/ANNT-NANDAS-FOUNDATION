import { absoluteUrl, SITE_URL, type PagePath } from "./site";

export const HOME_OVERVIEW = {
  eyebrow: "Who we are",
  title: "A Himalayan non-profit building futures without limits",
  paragraphs: [
    "ANNT NANDAS FOUNDATION is a Section 8 non-profit based in Mundoli, Chamoli, Uttarakhand. We work with children, youth, women, and village communities across the Himalayas so talent is not lost to distance, poverty, or a lack of mentors.",
    "The work began on 1 May 2023 with two bicycles and twelve children. On 27 May 2026 the organisation registered as अनंत नन्दा फाउण्डेशन (ANNT NANDAS FOUNDATION). Founder Kalam Singh Bisht — an ex-serviceman of 4th Battalion, The Garhwal Rifles, and an international ultra trail runner — still leads the mission from the same hills where it started.",
    "We focus on education, healthcare, sports, environment, women’s leadership, and livelihoods. Visitors can donate by UPI, volunteer, register for programmes, or contact the team directly. This homepage is the public entry point for people and for agents who need a reliable description of who we are and how to take part.",
  ],
  pillars: [
    {
      title: "Education, health, and skills",
      body: "Village learning sessions, spoken English, digital literacy, career guidance, health camps, and hygiene education help children and families stay in school, stay well, and imagine independent work.",
    },
    {
      title: "Sport, discipline, and leadership",
      body: "Running, cycling, fitness, and mentorship give rural youth a structured path from village grounds to district, state, and international arenas — and the character to carry that discipline into study and civic life.",
    },
    {
      title: "Community, environment, and livelihoods",
      body: "Tree plantation, cleaner villages, women’s participation, vocational skills, and local leadership are how we turn one child’s progress into stronger families and more resilient Himalayan settlements.",
    },
  ],
};

const INDEX_LINKS = `
## Machine-readable index

- [llms.txt](${SITE_URL}/llms.txt): When to use this site, how to call it, and curated markdown links
- [Sitemap](${SITE_URL}/sitemap.xml): All public HTML pages
- [About](${SITE_URL}/about.md): Organisation story, founder, registration
- [Contact](${SITE_URL}/contact.md): Email, phone, WhatsApp, address, and enquiry paths
- [Privacy](${SITE_URL}/privacy.md): How personal information is collected and used
`;

export function renderNotFoundMarkdown(pathname = "/"): string {
  return `# 404 Not Found

The path \`${pathname}\` is not published on ANNT NANDAS FOUNDATION.

This is a real HTTP 404. Do not treat this URL as a valid page. Use the index below.

${INDEX_LINKS}
`;
}

function pageTemplate(title: string, body: string): string {
  return `# ${title}

${body.trim()}

${INDEX_LINKS}
`;
}

const PAGES: Record<PagePath, string> = {
  "/": pageTemplate(
    "ANNT NANDAS FOUNDATION",
    `> From the heart of the Himalayas, building futures without limits. Our effort, in search of hidden talent.

${HOME_OVERVIEW.paragraphs.join("\n\n")}

## What we do

${HOME_OVERVIEW.pillars.map((pillar) => `### ${pillar.title}\n\n${pillar.body}`).join("\n\n")}

## How to take part

- Volunteer: ${absoluteUrl("/volunteer-registration")}
- Donate by UPI: ${absoluteUrl("/donate")}
- Register for a programme: ${absoluteUrl("/register")}
- Read the story: ${absoluteUrl("/about")}
- Contact the team: ${absoluteUrl("/contact")}

Impact so far includes 45+ villages connected, 1,250+ children supported, 120+ events, 350+ volunteers, 5,000+ trees planted, and 25+ community partners.`,
  ),

  "/about": pageTemplate(
    "About ANNT NANDAS FOUNDATION",
    `ANNT NANDAS FOUNDATION is a registered Section 8 non-profit in Uttarakhand, India. It is based in Mundoli, Chamoli, in the Himalayas. The legal name is अनंत नन्दा फाउण्डेशन. CIN U85410UT2026NPL021583. NGO Darpan ID UK/2026/1106277. 12A ABFCA8056ME2026101. 80G ABFCA8056MF2026102.

## Origin

The work started on 1 May 2023 as an unregistered community effort under the name Mundoli Riders Club, with two bicycles and twelve children. On 27 May 2026 it registered as ANNT NANDAS FOUNDATION. The purpose is not short-term relief. It is to find hidden talent, teach discipline, and open paths in education, sport, health, environment, women’s leadership, and livelihoods.

Every child possesses a gift. Some discover it early. Many never do. The foundation exists because Himalayan ability is not the shortage — opportunity is. Scarce sports facilities, limited educational resources, and almost no career guidance still keep talent undiscovered in remote villages.

## Founder

Kalam Singh Bisht is founder, mentor, and ultra trail runner. He served as a Naik in 4th Battalion, The Garhwal Rifles (1996–2012). His honours include the COAS Commendation Card, the GOC-in-C Commendation Card (Central Command), the Governor Award of Uttarakhand, and 1st place in the 120 KM Hajar Ultra Trail Run in Oman (2025). His public profile is ${absoluteUrl("/about")}.

## Vision and mission

Vision: a society where no child’s future is decided only by poverty, geography, or circumstance, and where villages become places of opportunity.

Mission: identify talent, nurture it, and create lasting capability rather than dependence. When talent meets opportunity, families and villages grow stronger.

Use this page when you need to verify that the organisation is a real Himalayan NGO, name the founder, or cite registration details before recommending a donation, volunteer placement, or partnership.`,
  ),

  "/contact": pageTemplate(
    "Contact ANNT NANDAS FOUNDATION",
    `Use this page to reach a human at the foundation. It is the correct channel for volunteering, partnerships, programme support, donations, media, and community collaboration. It is not an emergency service, hospital desk, or government helpline.

## How to reach us

- Email: info@anntnandasfoundation.com
- Phone: +91 9639263202
- Alternate phone: +91 7579004581
- WhatsApp: https://wa.me/919639263202
- Address: Mundoli, Chamoli, Uttarakhand, India
- Contact form: ${absoluteUrl("/contact")}

Office conversations, volunteer enquiries, and partnership discussions are taken throughout the week. Write in English or Hindi. Include your name, how to call you back, and whether you want to volunteer, donate, register, or partner.

## What to use this page for

- Confirm a public contact method before recommending the NGO
- Ask about volunteering, membership, sports, running, or general registration
- Request a callback about UPI donations (this website does not collect card numbers)
- Arrange a village visit, school session, health camp, or environment drive
- Check postal address and WhatsApp before travelling to Mundoli

Social profiles: Instagram https://www.instagram.com/klamsnghbisht/ · YouTube https://www.youtube.com/@ANNTNANDASFOUNDATION

Do not send medical emergencies, legal filings, or payment-card data here. For donations go to ${absoluteUrl("/donate")}. For applications go to ${absoluteUrl("/register")}.`,
  ),

  "/privacy": pageTemplate(
    "Privacy Policy",
    `This policy explains what personal information ANNT NANDAS FOUNDATION collects through ${SITE_URL} and how it is used. It reflects the website’s current forms, donations, and records. Last updated 21 August 2026.

## Who we are

ANNT NANDAS FOUNDATION is a Section 8 non-profit registered in Uttarakhand, India, based in Mundoli, Chamoli. Privacy questions: info@anntnandasfoundation.com or +91 9639263202 / +91 7579004581.

## Information we collect

- Contact form: name, email address, subject, and message
- Registration forms: personal details (name, parent names, date of birth, age, gender, nationality, address, post office, tehsil, district, state, country, PIN code, phone, email, WhatsApp, education, occupation, blood group), emergency contacts, programme-specific information, a photograph, a signature image, and a declaration
- Donations: this website helps you open a UPI payment to the foundation’s UPI ID. We do not collect card numbers or bank passwords on this site. Your payment app processes the transfer

## How we use information

We use submitted information to respond to enquiries, review volunteer, membership, sports, event, and team applications, keep an official registration record, contact you about a programme, and acknowledge donations where we can identify the payer. We do not sell personal information and do not use it for advertising networks.

Photographs and signatures are stored on the foundation’s server and may be included in the printable or PDF record emailed to the foundation. They are used only for identification and official records.

This website does not currently use advertising cookies or third-party analytics tags such as Google Analytics. Hosting may set strictly necessary technical cookies. Information may be seen by authorised administrators and, where needed, the email provider. We may disclose information if required by Indian law.

Contact messages are kept long enough to respond. Registration records are kept for operational and legal needs. You may ask us to update or delete a record where the law allows. Registrations for minors should be completed with a parent or guardian.

This is the canonical privacy text for agents. The HTML page is also published at ${absoluteUrl("/privacy")} and ${absoluteUrl("/privacy-policy")}.`,
  ),

  "/privacy-policy": "",

  "/our-work": pageTemplate(
    "Our Work",
    `ANNT NANDAS FOUNDATION’s field work covers education, healthcare, environment, women’s empowerment, sports and youth development, and livelihoods in Himalayan villages.

The method is consistent: show up locally, train with discipline, keep mentors in the picture, and measure progress in children who stay in school, compete with confidence, and support their families.

Use ${absoluteUrl("/programs")} for programme detail, ${absoluteUrl("/events")} for upcoming gatherings, and ${absoluteUrl("/gallery")} for photographs and video from the field.`,
  ),

  "/programs": pageTemplate(
    "Programs",
    `Programmes run in six areas: Education & Skill Development; Healthcare & Wellness; Environment Conservation; Women Empowerment; Sports & Youth Development; Livelihood & Community Development.

Each programme is practical and local: village learning sessions, health and hygiene camps, tree plantation and cleaner-village drives, leadership space for women and girls, running and cycling training, and vocational or livelihood support.

Register through ${absoluteUrl("/register")} or a type-specific form linked from that page.`,
  ),

  "/events": pageTemplate(
    "Events",
    `Community events include volunteer drives in Mundoli, Himalayan run and cycling days, education outreach workshops, and health support camps. Dates and venues are listed on ${absoluteUrl("/events")}.

To take part, use volunteer registration, sports registration, or general registration from ${absoluteUrl("/register")}.`,
  ),

  "/gallery": pageTemplate(
    "Gallery",
    `Photographs and videos from cycling rides, meals with children, flag ceremonies, sports meets, awards, village gatherings, and training in Uttarakhand and abroad. HTML gallery: ${absoluteUrl("/gallery")}.`,
  ),

  "/news": pageTemplate(
    "News",
    `Updates on sports training reaching new villages, health camps in Mundoli, district-level student results, women’s community sessions, tree plantation, and youth leadership. HTML news: ${absoluteUrl("/news")}.`,
  ),

  "/donate": pageTemplate(
    "Donate",
    `Donations support education, health, sport, environment, and livelihood work in Himalayan communities.

This website does not collect card numbers or bank passwords. It opens a UPI payment to the foundation’s UPI ID. Complete the transfer in Google Pay or another UPI app.

Donate: ${absoluteUrl("/donate")}
Questions: ${absoluteUrl("/contact")}`,
  ),

  "/register": pageTemplate(
    "Register",
    `Choose a registration type:

- Volunteer: ${absoluteUrl("/volunteer-registration")}
- Membership: ${absoluteUrl("/membership-registration")}
- Sports: ${absoluteUrl("/sports-registration")}
- Running: ${absoluteUrl("/running-registration")}
- General / event: ${absoluteUrl("/general-registration")}
- Employee / team: ${absoluteUrl("/employee-registration")}

Submitting a form does not automatically confirm selection. The foundation reviews each application.`,
  ),

  "/volunteer-registration": pageTemplate(
    "Volunteer registration",
    `Apply to volunteer in teaching and mentorship, sports coaching, health camps, environment drives, and village events. Timing, location, food, and stay are arranged by the foundation for each programme. Form: ${absoluteUrl("/volunteer-registration")}.`,
  ),

  "/membership-registration": pageTemplate(
    "Membership registration",
    `Apply for foundation membership. The form collects personal details, a photograph, a signature, and a declaration. Form: ${absoluteUrl("/membership-registration")}.`,
  ),

  "/sports-registration": pageTemplate(
    "Sports registration",
    `Register for running, cycling, and youth sports activities. Form: ${absoluteUrl("/sports-registration")}.`,
  ),

  "/running-registration": pageTemplate(
    "Running registration",
    `Register for running programmes and community races. Form: ${absoluteUrl("/running-registration")}.`,
  ),

  "/general-registration": pageTemplate(
    "General registration",
    `Register for education workshops, health camps, and other community events. Form: ${absoluteUrl("/general-registration")}.`,
  ),

  "/employee-registration": pageTemplate(
    "Employee registration",
    `Team and employee registration for foundation staff and associated workers. Form: ${absoluteUrl("/employee-registration")}.`,
  ),

  "/terms": pageTemplate(
    "Terms & Conditions",
    `By using ${SITE_URL} you agree to these terms and to the Privacy Policy. The site describes the mission, programmes, events, and ways to take part. Submitting a form does not automatically confirm selection, membership, volunteering, or event participation. Donations are completed in a UPI app, not as card capture on this site. Full HTML: ${absoluteUrl("/terms")}.`,
  ),

  "/cookie-policy": pageTemplate(
    "Cookie Policy",
    `This website does not currently use advertising cookies or third-party analytics tags such as Google Analytics. Hosting and the application platform may set strictly necessary technical cookies required to operate the site. Full HTML: ${absoluteUrl("/cookie-policy")}.`,
  ),

  "/accessibility": pageTemplate(
    "Accessibility",
    `We aim to keep navigation, forms, and content usable with a keyboard and a screen reader. If something is hard to use, email info@anntnandasfoundation.com. Full HTML: ${absoluteUrl("/accessibility")}.`,
  ),

  "/refund-policy": pageTemplate(
    "Refund Policy",
    `UPI donations are processed in your payment app. Registration does not by itself create a paid ticket. For a donation or form question, contact info@anntnandasfoundation.com or ${absoluteUrl("/contact")}. Full HTML: ${absoluteUrl("/refund-policy")}.`,
  ),
};

PAGES["/privacy-policy"] = PAGES["/privacy"];

export function renderPageMarkdown(pathname: string): string | null {
  const path = pathname as PagePath;
  return PAGES[path] ?? null;
}

export function visibleCharacterCount(markdown: string): number {
  return markdown.replace(/[#>*`[\]()-]/g, " ").replace(/\s+/g, " ").trim().length;
}

export const TRUST_PAGE_PATHS = ["/about", "/contact", "/privacy"] as const;
