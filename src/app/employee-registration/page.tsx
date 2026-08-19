import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

export const metadata: Metadata = {
  title: "Team Registration | ANNT NANDAS FOUNDATION",
  description: "Apply to join the ANNT NANDAS FOUNDATION team and contribute professionally to the mission.",
  alternates: { canonical: "/employee-registration" },
};

export default function EmployeeRegistration() {
  return (
    <RegistrationExperience
      initialType="employee"
      heading="Team / Employee Registration"
      description="Join the ANNT NANDAS FOUNDATION team and be part of a movement creating lasting social impact."
    />
  );
}
