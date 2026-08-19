import type { RegistrationType, SportKind, WizardStep } from "./types";

export const REGISTRATION_TYPE_META: Record<
  RegistrationType,
  { label: string; shortLabel: string; code: string; description: string; accent: string }
> = {
  volunteer: {
    label: "Volunteer Registration",
    shortLabel: "Volunteer",
    code: "VOL",
    description: "Offer your skills, time, and energy to education, community, and Himalayan development work.",
    accent: "from-emerald-500 to-teal-600",
  },
  membership: {
    label: "Membership Registration",
    shortLabel: "Membership",
    code: "MEM",
    description: "Become a foundation member and stay connected with programmes, events, and community action.",
    accent: "from-blue-600 to-indigo-700",
  },
  sports: {
    label: "Sports Registration",
    shortLabel: "Sports",
    code: "SPT",
    description: "Register for running, cycling, and other sports activities supported by the foundation.",
    accent: "from-orange-500 to-rose-600",
  },
  employee: {
    label: "Team / Employee Registration",
    shortLabel: "Team",
    code: "EMP",
    description: "Apply to work with ANNT NANDAS FOUNDATION and contribute professionally to the mission.",
    accent: "from-slate-700 to-slate-950",
  },
  event: {
    label: "Event Registration",
    shortLabel: "Event",
    code: "EVT",
    description: "Register for upcoming workshops, outreach camps, and community events.",
    accent: "from-cyan-500 to-blue-700",
  },
};

export const SPORT_OPTIONS: {
  id: SportKind;
  label: string;
  description: string;
}[] = [
  { id: "running", label: "Running", description: "AVIRALL Nannda Run, trail runs, and community running events." },
  { id: "cycling", label: "Cycling", description: "Himalayan cycling rides and endurance cycling programmes." },
  { id: "community", label: "Community Sports", description: "Training camps, youth sports, and village-level activities." },
  { id: "other", label: "Other Sport", description: "Tell us about another sports activity you want to join." },
];

export const VOLUNTEER_ROLES = [
  "Teacher",
  "Student",
  "Artist",
  "Botanist",
  "Mechanic",
  "Engineer",
  "Sports/fitness",
  "Technology",
  "Healthcare",
  "Agriculture",
  "Other",
] as const;

export const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

export const EDUCATION_OPTIONS = [
  "High School",
  "Intermediate / 12th",
  "Diploma",
  "Graduate",
  "Post Graduate",
  "Doctorate",
  "Professional Certification",
  "Other",
];

export const OCCUPATION_OPTIONS = [
  "Student",
  "Teacher",
  "Government Employee",
  "Private Employee",
  "Business Owner",
  "Farmer",
  "Athlete",
  "Healthcare Professional",
  "Retired",
  "Homemaker",
  "Unemployed",
  "Other",
];

export const MEMBERSHIP_TYPES = [
  "Individual",
  "Student",
  "Family",
  "Patron",
  "Lifetime",
];

export const INTEREST_AREAS = [
  "Education",
  "Sports & Youth",
  "Healthcare",
  "Environment",
  "Women Empowerment",
  "Agriculture & Livelihood",
  "Community Events",
];

export const CONTRIBUTION_OPTIONS = [
  "Time and volunteering",
  "Skills and mentorship",
  "Financial support",
  "Community outreach",
  "Not sure yet",
];

export const AVAILABILITY_OPTIONS = [
  "Weekends",
  "Weekdays",
  "Full-time",
  "Part-time",
  "Flexible",
  "Occasional / as needed",
];

export const TIMING_OPTIONS = [
  "Morning",
  "Afternoon",
  "Evening",
  "Weekends only",
  "Flexible",
  "Specific hours",
];

export const DURATION_OPTIONS = [
  "1 day",
  "1 week",
  "1 month",
  "3 months",
  "6 months",
  "Ongoing",
  "Specific duration",
];

export const RUNNING_CATEGORIES = [
  "3K Fun Run",
  "5K Run",
  "10K Run",
  "Half Marathon",
  "Full Marathon",
  "Ultra / Trail",
];

export const CYCLING_CATEGORIES = [
  "10 km",
  "25 km",
  "50 km",
  "80 km",
  "100 km+",
  "Hill / Endurance Ride",
];

export const COMMUNITY_SPORT_CATEGORIES = [
  "Youth Training Camp",
  "Village Sports Meet",
  "Fitness Session",
  "Coaching Support",
  "Other",
];

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Competitive"];

export const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "type", label: "Type" },
  { id: "personal", label: "Personal" },
  { id: "details", label: "Details" },
  { id: "documents", label: "Documents" },
  { id: "declaration", label: "Declaration" },
];

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const SUPPORT_CHOICES: { value: Exclude<import("./types").SupportChoice, "">; label: string }[] = [
  { value: "can_provide", label: "I can provide" },
  { value: "require", label: "I require" },
  { value: "not_needed", label: "Not needed" },
];

export function sportCategories(sport: SportKind | ""): string[] {
  if (sport === "running") return RUNNING_CATEGORIES;
  if (sport === "cycling") return CYCLING_CATEGORIES;
  return COMMUNITY_SPORT_CATEGORIES;
}

export function todayIsoDate(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}
