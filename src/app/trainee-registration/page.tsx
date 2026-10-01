import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";

const eventName = "Foundation Registration Trainees Enrollment";

export const metadata: Metadata = {
  title: "Trainee Enrollment | ANNT NANDAS FOUNDATION",
  description:
    "Enroll in foundation training batches for sports, cycling, skill development, computer literacy, and youth leadership.",
  alternates: { canonical: "/trainee-registration" },
};

export default function TraineeRegistrationPage() {
  return (
    <RegistrationExperience
      initialType="event"
      initialEventInterest={eventName}
      heading={eventName}
      description="Apply to join regular foundation batches in athletics, cycling, skill development, computer literacy, and youth leadership."
    />
  );
}