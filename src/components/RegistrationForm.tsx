"use client";

import RegistrationExperience from "@/components/registration/RegistrationExperience";
import type { RegistrationType, SportKind } from "@/lib/registration/types";

interface RegistrationFormProps {
  type: "volunteer" | "employee" | "running" | "general" | "membership" | "sports";
  title: string;
  description: string;
  heroImage?: string;
  genderOptions?: string[];
  occupationOptions?: string[];
}

function mapType(type: RegistrationFormProps["type"]): { type: RegistrationType; sport?: SportKind } {
  if (type === "running") return { type: "sports", sport: "running" };
  if (type === "general") return { type: "event" };
  return { type };
}

export default function RegistrationForm({ type, title, description }: RegistrationFormProps) {
  const mapped = mapType(type);
  return (
    <RegistrationExperience
      initialType={mapped.type}
      initialSport={mapped.sport}
      heading={title}
      description={description}
    />
  );
}
