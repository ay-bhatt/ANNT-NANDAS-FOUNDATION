import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

export const metadata: Metadata = {
  title: "Membership Registration | ANNT NANDAS FOUNDATION",
  description: "Become a member of ANNT NANDAS FOUNDATION and stay connected with programmes and community action.",
  alternates: { canonical: "/membership-registration" },
};

export default function MembershipRegistrationPage() {
  return (
    <RegistrationExperience
      initialType="membership"
      heading="Membership Registration"
      description="Join the foundation as a member and stay connected with programmes, events, and community action."
    />
  );
}
