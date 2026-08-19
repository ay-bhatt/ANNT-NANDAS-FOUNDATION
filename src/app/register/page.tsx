import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

export const metadata: Metadata = {
  title: "Register Now | ANNT NANDAS FOUNDATION",
  description:
    "Register with ANNT NANDAS FOUNDATION as a volunteer, member, sports participant, event guest, or team applicant.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return <RegistrationExperience />;
}
