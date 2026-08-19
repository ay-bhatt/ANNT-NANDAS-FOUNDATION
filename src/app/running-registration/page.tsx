import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

export const metadata: Metadata = {
  title: "Running Registration | ANNT NANDAS FOUNDATION",
  description: "Register for AVIRALL Nannda Run and community running events organised by the foundation.",
  alternates: { canonical: "/running-registration" },
};

export default function RunningRegistration() {
  return (
    <RegistrationExperience
      initialType="sports"
      initialSport="running"
      heading="Running Registration"
      description="Register for AVIRALL Nannda Run and be part of our flagship event promoting fitness and community spirit."
    />
  );
}
