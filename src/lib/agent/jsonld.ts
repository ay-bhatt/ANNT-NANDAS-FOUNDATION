import { SITE_URL } from "./site";

export const ORGANIZATION_SAME_AS = [
  "https://www.youtube.com/@ANNTNANDASFOUNDATION",
  "https://www.instagram.com/klamsnghbisht/",
  "https://www.facebook.com/anita.bisht.549436/",
] as const;

export const FOUNDER_SAME_AS = [
  "https://www.instagram.com/klamsnghbisht/",
  "https://www.youtube.com/@ANNTNANDASFOUNDATION",
] as const;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE_URL}/#organization`,
  name: "ANNT NANDAS FOUNDATION",
  legalName: "अनंत नन्दा फाउण्डेशन",
  url: SITE_URL,
  email: "info@anntnandasfoundation.com",
  telephone: "+91-9639263202",
  foundingDate: "2023-05-01",
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/icon.png`,
  sameAs: [...ORGANIZATION_SAME_AS],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mundoli",
    addressLocality: "Mundoli",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Chamoli, Uttarakhand, India",
  },
  founder: { "@id": `${SITE_URL}/#kalam-singh-bisht` },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9639263202",
    email: "info@anntnandasfoundation.com",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["en", "hi"],
  },
  identifier: [
    { "@type": "PropertyValue", name: "CIN", value: "U85410UT2026NPL021583" },
    { "@type": "PropertyValue", name: "NGO Darpan", value: "UK/2026/1106277" },
  ],
  description:
    "Non-profit organisation empowering Himalayan communities through education, health, sports, environment, and sustainable development.",
};

export const founderJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#kalam-singh-bisht`,
  name: "Kalam Singh Bisht",
  url: `${SITE_URL}/about`,
  jobTitle: "Founder, Mentor & Ultra Trail Runner",
  sameAs: [...FOUNDER_SAME_AS],
  affiliation: { "@id": `${SITE_URL}/#organization` },
  worksFor: { "@id": `${SITE_URL}/#organization` },
  nationality: "Indian",
  award: [
    "COAS Commendation Card",
    "GOC-in-C Commendation Card",
    "Governor Award, Government of Uttarakhand",
    "1st Place, 120 KM Hajar Ultra Trail Run, Oman (2025)",
  ],
  description:
    "Ex-serviceman of 4th Battalion, The Garhwal Rifles, international ultra trail runner, and founder of ANNT NANDAS FOUNDATION.",
};

export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, founderJsonLd],
};
