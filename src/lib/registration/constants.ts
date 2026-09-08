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
    description: "Become a foundation member for ₹500, valid for 1 year from the activation date.",
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
  "talent-hunt": {
    label: "Runner Talent Hunt Registration",
    shortLabel: "Talent Hunt",
    code: "THN",
    description: "Runner Talent Hunt Program — search for future Olympic long-distance athletes, ages 11½ to 14½ years.",
    accent: "from-amber-500 to-orange-600",
  },
};

export const TALENT_HUNT_MIN_AGE = 11.5;
export const TALENT_HUNT_MAX_AGE = 14.5;
export const TALENT_HUNT_AGE_LABEL = "11½ to 14½ years";

export const TALENT_HUNT_PROGRAM = {
  hindiName: "रनर टैलेंट हंट प्रोग्राम",
  englishName: "Runner Talent Hunt Program",
  mottoHindi: "हमारा प्रयास, हुनर की तलाश",
  mottoEnglish: "Our effort, in search of talent",
  taglineHindi: "भविष्य के ओलंपिक खिलाड़ियों की तलाश",
  taglineEnglish: "Search for future Olympic athletes",
  goalHindi: "Olympic Long Distance Run के लिए खिलाड़ी तैयार करें",
  goalEnglish: "Prepare athletes for Olympic long-distance running",
  posterAge: "12–14 years",
  sloganHindi: "आज की मेहनत, कल आपका ओलंपिक मेडल!",
  sloganEnglish: "Today’s hard work, tomorrow your Olympic medal!",
  organizer: "ANNT NANDAS FOUNDATION",
  organizerHindi: "अनंत नन्दा फाउण्डेशन",
  benefits: [
    {
      title: "Free running shoes",
      titleHindi: "फ्री रनिंग शू",
      body: "Every selected athlete receives free running shoes from the foundation.",
    },
    {
      title: "Nutrition support",
      titleHindi: "न्यूट्रिशन",
      body: "Selected athletes receive nutrition guidance and nutrition support.",
    },
  ],
  steps: [
    {
      title: "Limited seats",
      titleHindi: "लिमिटेड सीटें",
      body: "Seats are limited. Apply early — this opportunity is limited.",
    },
    {
      title: "Practice at home",
      titleHindi: "प्रैक्टिस घर पर",
      body: "Train at home under the supervision of parents.",
    },
    {
      title: "Foundation test",
      titleHindi: "फाउंडेशन लेगा टेस्ट",
      body: "The foundation will conduct a test and select fit athletes.",
    },
    {
      title: "Advanced training",
      titleHindi: "एडवांस ट्रेनिंग",
      body: "Selected athletes receive high-level advanced training.",
    },
  ],
};

export const TALENT_CATEGORIES = [
  "Running / Long Distance",
  "Olympic Long Distance Run",
  "Trail Running",
  "Athletics",
  "Sports",
  "Other",
];

export const PARENT_RELATIONS = ["Mother", "Father", "Guardian"];

export const SCHOOL_CLASS_OPTIONS = [
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Other",
];

export const MEMBERSHIP_FEE_AMOUNT = 500;
export const MEMBERSHIP_VALIDITY_YEARS = 1;
export const MEMBERSHIP_VALIDITY_LABEL = "1 Year";
export const SPORTS_FEE_AMOUNT = 100;
export const VOLUNTEER_FEE_AMOUNT = 0;
/** Default paid fee for employee, event, and talent-hunt registrations. Prefer registrationFeeFor(type). */
export const REGISTRATION_FEE_AMOUNT = 100;
export const REGISTRATION_FEE_PAYEE = "ANNT NANDAS FOUNDATION";
export const REGISTRATION_FEE_PAYEE_NOTE = "Ananta / Anantananda Foundation";

export const REGISTRATION_FEE_BY_TYPE: Record<RegistrationType, number> = {
  volunteer: VOLUNTEER_FEE_AMOUNT,
  membership: MEMBERSHIP_FEE_AMOUNT,
  sports: SPORTS_FEE_AMOUNT,
  employee: REGISTRATION_FEE_AMOUNT,
  event: REGISTRATION_FEE_AMOUNT,
  "talent-hunt": REGISTRATION_FEE_AMOUNT,
};

export function registrationFeeFor(type: RegistrationType | ""): number {
  if (!type) return 0;
  return REGISTRATION_FEE_BY_TYPE[type];
}

export function registrationRequiresPayment(type: RegistrationType | ""): boolean {
  return registrationFeeFor(type) > 0;
}

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
  "Lifetime",
  "Specific duration",
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const EMERGENCY_RELATIONS = [
  "Father",
  "Mother",
  "Spouse",
  "Brother",
  "Sister",
  "Son",
  "Daughter",
  "Guardian",
  "Friend",
  "Relative",
  "Other",
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
  { id: "payment", label: "Fee" },
  { id: "declaration", label: "Declaration" },
];

export function wizardStepDefsFor(type: RegistrationType | "") {
  return WIZARD_STEPS.filter((step) => {
    if (step.id === "payment") return registrationRequiresPayment(type);
    return true;
  });
}

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
