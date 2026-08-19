export type RegistrationType =
  | "volunteer"
  | "membership"
  | "sports"
  | "employee"
  | "event";

export type SportKind = "running" | "cycling" | "community" | "other";

export type SupportChoice = "" | "can_provide" | "require" | "not_needed";

export type WizardStep = "type" | "personal" | "details" | "documents" | "declaration";

export interface UploadedImage {
  dataUrl: string;
  name: string;
  mime: string;
  size: number;
}

export interface PersonalInformation {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  age: string;
  gender: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  bloodGroup: string;
  education: string;
  specialEducation: string;
  occupation: string;
}

export interface VolunteerDetails {
  volunteerName: string;
  skills: string;
  roles: string[];
  otherRole: string;
  subjects: string;
  experience: string;
  motivation: string;
  preferredTiming: string;
  customTiming: string;
  availability: string;
  preferredLocation: string;
  foodSupport: SupportChoice;
  staySupport: SupportChoice;
  travelSupport: SupportChoice;
  otherSupport: string;
  duration: string;
  customDuration: string;
  additionalComments: string;
}

export interface MembershipDetails {
  membershipType: string;
  areasOfInterest: string[];
  contribution: string;
  howHeard: string;
  emergencyName: string;
  emergencyPhone: string;
  additionalComments: string;
}

export interface SportsDetails {
  sport: SportKind | "";
  otherSport: string;
  category: string;
  experienceLevel: string;
  previousParticipation: string;
  emergencyName: string;
  emergencyPhone: string;
  medicalInfo: string;
  medicallyFit: boolean;
  tshirtSize: string;
  additionalComments: string;
}

export interface EmployeeDetails {
  position: string;
  qualifications: string;
  experience: string;
  availabilityToJoin: string;
  whyJoin: string;
  additionalComments: string;
}

export interface EventDetails {
  eventInterest: string;
  participationMode: string;
  emergencyName: string;
  emergencyPhone: string;
  additionalComments: string;
}

export interface DeclarationDetails {
  accepted: boolean;
  place: string;
  date: string;
}

export interface RegistrationFormState {
  type: RegistrationType | "";
  personal: PersonalInformation;
  volunteer: VolunteerDetails;
  membership: MembershipDetails;
  sports: SportsDetails;
  employee: EmployeeDetails;
  event: EventDetails;
  photograph: UploadedImage | null;
  signature: UploadedImage | null;
  declaration: DeclarationDetails;
}

export interface RegistrationPayload {
  type: RegistrationType;
  personal: PersonalInformation;
  volunteer?: VolunteerDetails;
  membership?: MembershipDetails;
  sports?: SportsDetails;
  employee?: EmployeeDetails;
  event?: EventDetails;
  photograph?: UploadedImage | null;
  signature?: UploadedImage | null;
  declaration: DeclarationDetails;
}

export interface RegistrationSuccessResult {
  registrationId: string;
  type: RegistrationType;
  submittedAt: string;
}

export type FieldErrors = Record<string, string>;
