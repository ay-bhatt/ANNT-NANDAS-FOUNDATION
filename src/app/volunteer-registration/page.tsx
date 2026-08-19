import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

export const metadata: Metadata = {
  title: "Volunteer Registration | ANNT NANDAS FOUNDATION",
  description: "Join our mission to transform lives in the Himalayas. Share the skills you can contribute.",
  alternates: { canonical: "/volunteer-registration" },
};

export default function VolunteerRegistration() {
  return (
    <RegistrationExperience
      initialType="volunteer"
      heading="Volunteer Registration"
      description="Join our mission to transform lives in the Himalayas. Tell us what you can contribute — your time, skills, and energy can create lasting change."
    />
  );
}
