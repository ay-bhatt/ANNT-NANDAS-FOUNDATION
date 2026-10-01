import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

const eventName = "Agniveer Aspirant Physical & Written Prep Camp";

export const metadata: Metadata = {
  title: "Agniveer Aspirant Registration | ANNT NANDAS FOUNDATION",
  description:
    "Register for physical fitness and written examination preparation for Agniveer aspirants.",
  alternates: { canonical: "/agniveer-registration" },
};

export default function AgniveerRegistrationPage() {
  return (
    <RegistrationExperience
      initialType="event"
      initialEventInterest={eventName}
      heading={eventName}
      description="Register for guided physical endurance training, medical guidance, and written exam preparation for defence aspirants."
    />
  );
}