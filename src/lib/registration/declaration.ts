export const DECLARATION_TITLE = "Declaration & Responsibility";

export const DECLARATION_INTRO =
  "Please read this declaration carefully. Submission is not possible until you accept it and provide your place, date, and signature.";

export const DECLARATION_CLAUSES: { title: string; body: string }[] = [
  {
    title: "Accuracy of information",
    body: "I declare that all information submitted in this registration is true, complete, and accurate to the best of my knowledge. I understand that any false or misleading information may lead to rejection or cancellation of my application.",
  },
  {
    title: "Documents, photograph, and signature",
    body: "I accept full responsibility for every document, photograph, and signature submitted with this application. I confirm that they belong to me and may be used by ANNT NANDAS FOUNDATION for registration, verification, and official records.",
  },
  {
    title: "Personal belongings",
    body: "I understand that I am responsible for my personal belongings. The foundation shall not be liable for any loss, theft, or damage of personal items during any activity, event, travel, stay, or volunteering engagement.",
  },
  {
    title: "Volunteer and participation responsibility",
    body: "I understand that volunteering or participation is a responsibility. I will act with integrity, respect local communities, and follow the instructions of foundation coordinators at all times.",
  },
  {
    title: "Injury, accident, or unforeseen incident",
    body: "I participate / volunteer at my own risk. I shall not hold ANNT NANDAS FOUNDATION, its trustees, employees, volunteers, or partners responsible for any injury, accident, illness, or unforeseen incident that may occur during participation, travel, stay, or volunteering.",
  },
  {
    title: "Rules and instructions",
    body: "I agree to follow all foundation rules, safety guidance, codes of conduct, and coordinator instructions. I understand that failure to do so may result in my participation being discontinued.",
  },
  {
    title: "Arrangements may vary",
    body: "I acknowledge that volunteering opportunities, assigned role, location, and timings will be decided by the foundation according to the activity and operational requirements. Food and accommodation/stay will be provided according to the volunteering activity and location.",
  },
  {
    title: "Review of application",
    body: "I understand that submitting this form does not automatically confirm selection, placement, membership, or event participation. The foundation may review, accept, or decline applications as appropriate and may contact me for further information.",
  },
];

export const DECLARATION_ACCEPTANCE_LABEL =
  "I have read, understood, and accept this Declaration & Responsibility in full. I confirm that the information and documents I am submitting are accurate, and I accept personal responsibility as stated above.";

export function declarationPlainText(): string {
  const clauses = DECLARATION_CLAUSES.map((clause, index) => `${index + 1}. ${clause.title}\n${clause.body}`).join(
    "\n\n",
  );
  return [
    "ANNT NANDAS FOUNDATION",
    DECLARATION_TITLE,
    "",
    DECLARATION_INTRO,
    "",
    clauses,
    "",
    DECLARATION_ACCEPTANCE_LABEL,
  ].join("\n");
}
