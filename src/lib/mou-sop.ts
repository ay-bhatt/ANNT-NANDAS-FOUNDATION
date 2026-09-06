import "server-only";

export type MouSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export const mouDocument = {
  title: "MOU Standard Operating Procedure",
  subtitle: "Partnership agreements, implementation, and institutional accountability",
  version: "1.0",
  updated: "September 2026",
  sections: [
    {
      title: "Purpose",
      paragraphs: [
        "This Standard Operating Procedure (SOP) governs how ANNT NANDAS FOUNDATION prepares, reviews, executes, and monitors Memoranda of Understanding (MOUs) with governments, CSR partners, educational institutions, NGOs, sports bodies, and community organisations.",
        "The SOP exists to protect beneficiaries, donors, volunteers, and institutional partners by ensuring every agreement is lawful, transparent, and aligned with the foundation’s mission.",
      ],
    },
    {
      title: "Scope",
      paragraphs: [
        "This document applies to every written partnership, collaboration, sponsorship, or implementation agreement that commits the foundation’s name, programmes, staff, volunteers, funds, or community access.",
      ],
      bullets: [
        "CSR and corporate partnerships",
        "Government and district-level collaborations",
        "Educational, sports, and healthcare institutional agreements",
        "NGO-to-NGO implementation arrangements",
        "Volunteer, mentoring, and training partnerships with defined deliverables",
      ],
    },
    {
      title: "Guiding principles",
      paragraphs: [
        "Every MOU must strengthen communities rather than create dependency. Agreements are accepted only when they protect child safeguarding, financial accountability, and equal opportunity.",
      ],
      bullets: [
        "Mutual trust and written clarity of roles",
        "Transparency in planning, spending, and reporting",
        "Sustainable impact over one-time symbolic activity",
        "Zero tolerance for corruption, discrimination, exploitation, or abuse",
        "Compliance with applicable Indian laws for charitable organisations",
      ],
    },
    {
      title: "Proposal and due diligence",
      paragraphs: [
        "Before an MOU is drafted, the requesting team records the partner’s legal identity, proposed programme area, expected beneficiaries, duration, budget responsibility, and reporting obligations.",
        "Due diligence includes confirmation that the partner’s purpose aligns with education, sports, healthcare, environment, women empowerment, livelihood, or youth development work in Himalayan communities.",
      ],
    },
    {
      title: "Drafting and required clauses",
      paragraphs: [
        "An MOU must be written in plain language and must not leave implementation, safeguarding, or money handling implied.",
      ],
      bullets: [
        "Names, registered addresses, and authorised signatories of both parties",
        "Purpose, location, duration, and measurable outcomes",
        "Roles, resource contributions, and financial responsibility",
        "Child protection, data privacy, and community consent requirements",
        "Branding, communication, and public-use rules",
        "Monitoring, reporting calendar, and audit access",
        "Termination, dispute resolution, and return of unused resources",
      ],
    },
    {
      title: "Internal approval",
      paragraphs: [
        "No MOU is signed until it has been reviewed for programme fit, safeguarding, legal compliance, and financial exposure. Only an authorised office-bearer may execute the final document.",
        "If an agreement involves funds, assets, or statutory reporting, financial controls and bookkeeping requirements must be confirmed before signature.",
      ],
    },
    {
      title: "Execution and record-keeping",
      paragraphs: [
        "Signed originals, digital copies, annexures, and related correspondence are stored in the foundation’s confidential partnership file. Public pages must not host the executed document.",
        "A register entry is created with partner name, start and end dates, programme area, responsible coordinator, and next review date.",
      ],
    },
    {
      title: "Implementation and monitoring",
      paragraphs: [
        "The assigned coordinator tracks activities against the agreed work plan, community feedback, and safeguarding duties. Material changes require a written amendment, not an informal verbal change.",
      ],
      bullets: [
        "Field observations and progress notes",
        "Financial documentation of any shared expenditure",
        "Community and volunteer feedback",
        "Immediate escalation of safeguarding or integrity concerns",
      ],
    },
    {
      title: "Closure and review",
      paragraphs: [
        "At the end of the term, the coordinator confirms deliverables, unsettled obligations, return of materials, and a short lessons-learned note for future partnerships.",
        "Expired MOUs do not automatically renew. Continuation requires a fresh review and a new or extended instrument.",
      ],
    },
    {
      title: "Confidentiality",
      paragraphs: [
        "This SOP and related executed agreements are internal governance records. Access is limited to authorised administrators. The document is not for public download, redistribution, or publication without written approval from the foundation.",
      ],
    },
  ] satisfies MouSection[],
};
