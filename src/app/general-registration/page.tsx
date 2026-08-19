import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

export const metadata: Metadata = {
  title: "Event Registration | ANNT NANDAS FOUNDATION",
  description: "Register for upcoming events and activities organised by ANNT NANDAS FOUNDATION.",
  alternates: { canonical: "/general-registration" },
};

export default function GeneralRegistration() {
  return (
    <RegistrationExperience
      initialType="event"
      heading="Event Registration"
      description="Register for our upcoming events and activities. Participate in transforming communities."
    />
  );
}
