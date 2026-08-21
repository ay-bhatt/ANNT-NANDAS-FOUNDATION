const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anntnandasfoundation.com";

const organization = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${siteUrl}/#organization`,
  name: "ANNT NANDAS FOUNDATION",
  url: siteUrl,
  email: "info@anntnandasfoundation.com",
  telephone: "+91-9639263202",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mundoli",
    addressRegion: "Uttarakhand",
    addressCountry: "IN",
  },
  founder: { "@id": `${siteUrl}/#kalam-singh-bisht` },
  description:
    "Non-profit organisation empowering Himalayan communities through education, health, sports, environment, and sustainable development.",
};

const founder = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#kalam-singh-bisht`,
  name: "Kalam Singh Bisht",
  jobTitle: "Founder, Mentor & Ultra Trail Runner",
  affiliation: { "@id": `${siteUrl}/#organization` },
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

export default function JsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(founder) }} />
    </>
  );
}
