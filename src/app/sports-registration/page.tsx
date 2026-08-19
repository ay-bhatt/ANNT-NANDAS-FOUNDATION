import type { Metadata } from "next";
import RegistrationExperience from "@/components/registration/RegistrationExperience";
import type { SportKind } from "@/lib/registration/types";

export const metadata: Metadata = {
  title: "Sports Registration | ANNT NANDAS FOUNDATION",
  description: "Register for running, cycling, and other sports activities organised by ANNT NANDAS FOUNDATION.",
  alternates: { canonical: "/sports-registration" },
};

const SPORTS: SportKind[] = ["running", "cycling", "community", "other"];

export default async function SportsRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ sport?: string }>;
}) {
  const params = await searchParams;
  const sport = SPORTS.includes(params.sport as SportKind) ? (params.sport as SportKind) : undefined;

  return (
    <RegistrationExperience
      initialType="sports"
      initialSport={sport}
      heading="Sports Registration"
      description="Register for running, cycling, community sports, and other activities supported by the foundation."
    />
  );
}
