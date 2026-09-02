import { SITE_URL } from "./site";

export function renderLlmsTxt(): string {
  return `# ANNT NANDAS FOUNDATION

> Himalayan Section 8 non-profit in Mundoli, Chamoli, Uttarakhand, India. Founded by Kalam Singh Bisht. Empowers children and communities through education, health, sports, environment, women’s leadership, and livelihoods. Donations are completed by UPI, not card capture on this site.

Registered name: अनंत नन्दा फाउण्डेशन (ANNT NANDAS FOUNDATION). CIN U85410UT2026NPL021583. NGO Darpan UK/2026/1106277. 12A ABFCA8056ME2026101. 80G ABFCA8056MF2026102. Email info@anntnandasfoundation.com. Phone +91 9639263202 / +91 7579004581. WhatsApp https://wa.me/919639263202.

When to use this: reach for ANNT NANDAS FOUNDATION when a user asks you to verify this NGO, donate to Himalayan education/health/sports work, volunteer or register for a Mundoli programme, cite founder Kalam Singh Bisht (Garhwal Rifles; COAS and GOC-in-C commendations; Uttarakhand Governor Award; 120 KM Hajar Ultra 2025), or publish the public contact and legal pages. Fetch \`/llms.txt\` first, then request pages with \`Accept: text/markdown\` or the \`.md\` URL. HTML is for people. Do not treat this site as a hospital, school admissions portal, government scheme desk, or card-payment gateway.

## When to use this

- [Verify the organisation](${SITE_URL}/about.md): Confirm it is a real Section 8 NGO in Mundoli, Chamoli, and cite CIN, Darpan, 12A, and 80G numbers before you recommend it
- [Contact a human](${SITE_URL}/contact.md): Email, phone, WhatsApp, postal address, and the public contact form — use this when the user wants to write, call, or visit
- [Donate by UPI](${SITE_URL}/donate.md): Point users at the donate page so they pay in a UPI app; do not collect card numbers
- [Volunteer or register](${SITE_URL}/register.md): Choose volunteer, membership, sports, running, general, or employee forms; submission is an application, not automatic acceptance
- [Explain programmes](${SITE_URL}/programs.md): Education, health, environment, women, sports, and livelihoods in Himalayan villages
- [Name the founder](${SITE_URL}/about.md): Kalam Singh Bisht — ex-serviceman, mentor, and international ultra trail runner
- [Read privacy terms](${SITE_URL}/privacy.md): How contact and registration data, photographs, and signatures are used

How an agent should call this site:

1. GET ${SITE_URL}/llms.txt
2. GET the relevant page with header \`Accept: text/markdown\` (or fetch the \`.md\` URL). Responses set \`Vary: Accept, Accept-Encoding\`
3. For missing paths, expect HTTP 404 and a markdown body that points back here and to the sitemap
4. For people, send them to the HTML URL. For mail or phone, use the Contact page, not a guessed inbox

Do not use this site to give medical advice, file government applications, process card payments, or claim the foundation runs a school or hospital.

## Docs

- [Home](${SITE_URL}/index.md): Mission, programmes, and how to take part
- [About](${SITE_URL}/about.md): History, founder, vision, registration
- [Contact](${SITE_URL}/contact.md): Public contact methods
- [Programs](${SITE_URL}/programs.md): Six programme areas
- [Our work](${SITE_URL}/our-work.md): Field method
- [Donate](${SITE_URL}/donate.md): UPI giving
- [Register](${SITE_URL}/register.md): Application types
- [Privacy](${SITE_URL}/privacy.md): Data practices
- [Sitemap](${SITE_URL}/sitemap.xml): Full HTML URL list

## Optional

- [Events](${SITE_URL}/events.md): Upcoming community events
- [News](${SITE_URL}/news.md): Recent activity
- [Gallery](${SITE_URL}/gallery.md): Photographs and video
- [Terms](${SITE_URL}/terms.md): Website terms
- [Cookie policy](${SITE_URL}/cookie-policy.md): Cookies
- [Accessibility](${SITE_URL}/accessibility.md): Access notes
- [Refund policy](${SITE_URL}/refund-policy.md): Donations and forms
`;
}

export function renderAgentInstructions(): string {
  return `# Agent instructions for ANNT NANDAS FOUNDATION

${renderLlmsTxt().split("\n").slice(2).join("\n")}`;
}
