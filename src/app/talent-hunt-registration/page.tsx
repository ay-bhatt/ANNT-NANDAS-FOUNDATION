import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";
import TalentHuntProgramInfo from "@/components/registration/TalentHuntProgramInfo";
import { TALENT_HUNT_AGE_LABEL, TALENT_HUNT_PROGRAM } from "@/lib/registration/constants";

export const metadata: Metadata = {
  title: "Runner Talent Hunt Registration | ANNT NANDAS FOUNDATION",
  description: `Register for the ${TALENT_HUNT_PROGRAM.englishName}: ${TALENT_HUNT_PROGRAM.goalEnglish}. Age group ${TALENT_HUNT_PROGRAM.posterAge}; registration is open for children ${TALENT_HUNT_AGE_LABEL}. Free running shoes and nutrition support for selected athletes.`,
  alternates: { canonical: "/talent-hunt-registration" },
};

export default function TalentHuntRegistration() {
  return (
    <div>
      <TalentHuntProgramInfo />
      <RegistrationExperience
        initialType="talent-hunt"
        showHeader={false}
        heading="Complete the registration form"
        description={`This program is for children in the ${TALENT_HUNT_PROGRAM.posterAge} age group. Registration is accepted for ages ${TALENT_HUNT_AGE_LABEL}. Complete the child’s details, the class they study in, parent or guardian consent, Aadhaar number, Aadhaar upload, and a signature on a white page.`}
      />
    </div>
  );
}
