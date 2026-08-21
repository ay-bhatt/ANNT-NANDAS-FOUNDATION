import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "./constants";
import type {
  DeclarationDetails,
  FieldErrors,
  PersonalInformation,
  RegistrationFormState,
  RegistrationType,
  SportsDetails,
  UploadedImage,
  VolunteerDetails,
} from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^(?:\+91[\s-]?|0)?[6-9]\d{9}$/;
const INTL_PHONE_PATTERN = /^\+?[0-9][0-9\s-]{8,16}$/;
const INDIAN_PIN_PATTERN = /^[1-9][0-9]{5}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const trimmed = value.trim();
  return PHONE_PATTERN.test(trimmed) || INTL_PHONE_PATTERN.test(trimmed);
}

export function parseDob(value: string): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (iso) {
    return calendarDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));
  }

  const dmy = /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/.exec(trimmed);
  if (dmy) {
    return calendarDate(Number(dmy[3]), Number(dmy[2]), Number(dmy[1]));
  }

  return null;
}

function calendarDate(year: number, month: number, day: number): Date | null {
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

export function formatDob(value: string): string {
  const date = parseDob(value);
  if (!date) return value.trim() || "Not provided";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()}`;
}

export function ageFromDob(dob: string): number | null {
  const birth = parseDob(dob);
  if (!birth) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDelta = today.getMonth() - birth.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

export function validateImage(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Please upload a JPG, PNG, or WEBP image.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

function required(value: string, label: string): string | undefined {
  if (!value.trim()) return `${label} is required.`;
  return undefined;
}

export function validatePersonal(personal: PersonalInformation): FieldErrors {
  const errors: FieldErrors = {};
  const nameError = required(personal.fullName, "Full name");
  const fatherError = required(personal.fatherName, "Father’s name");
  const motherError = required(personal.motherName, "Mother’s name");
  const dobError = required(personal.dob, "Date of birth");
  const genderError = required(personal.gender, "Gender");
  const nationalityError = required(personal.nationality, "Nationality");
  const addressError = required(personal.address, "Address");
  const postOfficeError = required(personal.postOffice, "Post office");
  const tehsilError = required(personal.tehsil, "Tehsil");
  const districtError = required(personal.district, "District");
  const stateError = required(personal.state, "State");
  const countryError = required(personal.country, "Country");
  const pinError = required(personal.pinCode, "PIN code");
  const phoneError = required(personal.phone, "Phone number");
  const emailError = required(personal.email, "Email");
  const bloodError = required(personal.bloodGroup, "Blood group");
  const educationError = required(personal.education, "Education");
  const emergencyNameError = required(personal.emergencyName, "Emergency contact person’s name");
  const emergencyRelationError = required(personal.emergencyRelation, "Relation with the person");
  const emergencyPhoneError = required(personal.emergencyPhone, "Emergency contact number");

  if (nameError) errors.fullName = nameError;
  if (fatherError) errors.fatherName = fatherError;
  if (motherError) errors.motherName = motherError;
  if (dobError) errors.dob = dobError;
  if (genderError) errors.gender = genderError;
  if (nationalityError) errors.nationality = nationalityError;
  if (addressError) errors.address = addressError;
  if (postOfficeError) errors.postOffice = postOfficeError;
  if (tehsilError) errors.tehsil = tehsilError;
  if (districtError) errors.district = districtError;
  if (stateError) errors.state = stateError;
  if (countryError) errors.country = countryError;
  if (pinError) errors.pinCode = pinError;
  if (phoneError) errors.phone = phoneError;
  if (emailError) errors.email = emailError;
  if (bloodError) errors.bloodGroup = bloodError;
  if (educationError) errors.education = educationError;
  if (emergencyNameError) errors.emergencyName = emergencyNameError;
  if (emergencyRelationError) errors.emergencyRelation = emergencyRelationError;
  if (emergencyPhoneError) errors.emergencyPhone = emergencyPhoneError;

  if (personal.email && !isValidEmail(personal.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (personal.phone && !isValidPhone(personal.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (personal.whatsapp && !isValidPhone(personal.whatsapp)) {
    errors.whatsapp = "Enter a valid WhatsApp number.";
  }
  if (personal.emergencyPhone && !isValidPhone(personal.emergencyPhone)) {
    errors.emergencyPhone = "Enter a valid emergency contact number.";
  }
  if (personal.pinCode) {
    const pin = personal.pinCode.trim();
    const country = personal.country.trim().toLowerCase();
    if (country === "india" || country === "in") {
      if (!INDIAN_PIN_PATTERN.test(pin)) {
        errors.pinCode = "Enter a valid 6-digit PIN code.";
      }
    } else if (!/^[0-9A-Za-z][0-9A-Za-z\s-]{2,11}$/.test(pin)) {
      errors.pinCode = "Enter a valid PIN / postal code.";
    }
  }

  if (personal.dob) {
    const computed = ageFromDob(personal.dob);
    if (computed === null) {
      errors.dob = "Enter a valid date of birth in DD/MM/YYYY format.";
    } else if (computed < 8 || computed > 90) {
      errors.dob = "Please enter a realistic date of birth.";
    } else if (personal.age && Number(personal.age) !== computed) {
      errors.age = `Age should be ${computed} based on the date of birth.`;
    }
  }

  return errors;
}

export function validateVolunteer(details: VolunteerDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.volunteerName.trim()) errors.volunteerName = "Volunteer name is required.";
  if (!details.skills.trim()) errors.skills = "Please describe the skills you can contribute.";
  if (details.roles.length === 0) errors.roles = "Select at least one volunteer category.";
  if (details.roles.includes("Other") && !details.otherRole.trim()) {
    errors.otherRole = "Please describe your own skill or role.";
  }
  if (details.roles.includes("Teacher") && !details.subjects.trim()) {
    errors.subjects = "Please share the subjects you can teach.";
  }
  if (!details.motivation.trim()) errors.motivation = "Please tell us why you want to volunteer.";
  if (!details.preferredLocation.trim()) errors.preferredLocation = "Preferred location is required.";
  if (!details.duration) errors.duration = "Select a volunteering duration.";
  if (details.duration === "Specific duration" && !details.customDuration.trim()) {
    errors.customDuration = "Please specify the duration.";
  }
  return errors;
}

export function validateMembership(details: RegistrationFormState["membership"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.membershipType) errors.membershipType = "Select a membership type.";
  if (details.areasOfInterest.length === 0) {
    errors.areasOfInterest = "Select at least one area of interest.";
  }
  if (!details.contribution) errors.contribution = "Please tell us how you would like to contribute.";
  return errors;
}

export function validateSports(details: SportsDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.sport) errors.sport = "Select a sport.";
  if (details.sport === "other" && !details.otherSport.trim()) {
    errors.otherSport = "Please name the sport.";
  }
  if (!details.category) errors.category = "Select a sports category.";
  if (!details.experienceLevel) errors.experienceLevel = "Select your experience level.";
  if (!details.medicallyFit) {
    errors.medicallyFit = "Please confirm that you are medically fit to participate.";
  }
  return errors;
}

export function validateEmployee(details: RegistrationFormState["employee"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.position.trim()) errors.position = "Position applied for is required.";
  if (!details.qualifications.trim()) errors.qualifications = "Qualifications are required.";
  if (!details.whyJoin.trim()) errors.whyJoin = "Please tell us why you want to join.";
  return errors;
}

export function validateEvent(details: RegistrationFormState["event"]): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.eventInterest.trim()) errors.eventInterest = "Please share the event or activity.";
  if (!details.participationMode) errors.participationMode = "Select how you would like to participate.";
  return errors;
}

export function validateDocuments(photograph: UploadedImage | null, signature: UploadedImage | null): FieldErrors {
  const errors: FieldErrors = {};
  if (!photograph) errors.photograph = "Please upload a recent photograph.";
  if (!signature) errors.signature = "Please upload your signature.";
  return errors;
}

export function validateDeclaration(declaration: DeclarationDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!declaration.accepted) {
    errors.accepted = "You must accept the declaration before submitting.";
  }
  if (!declaration.place.trim()) errors.place = "Place is required.";
  if (!declaration.date) errors.date = "Declaration date is required.";
  return errors;
}

export function validateStep(step: "personal" | "details" | "documents" | "declaration", state: RegistrationFormState): FieldErrors {
  if (step === "personal") return validatePersonal(state.personal);
  if (step === "documents") return validateDocuments(state.photograph, state.signature);
  if (step === "declaration") return validateDeclaration(state.declaration);
  if (!state.type) return { type: "Select a registration type." };
  if (state.type === "volunteer") return validateVolunteer(state.volunteer);
  if (state.type === "membership") return validateMembership(state.membership);
  if (state.type === "sports") return validateSports(state.sports);
  if (state.type === "employee") return validateEmployee(state.employee);
  return validateEvent(state.event);
}

export function typeLabel(type: RegistrationType): string {
  if (type === "volunteer") return "Volunteer";
  if (type === "membership") return "Membership";
  if (type === "sports") return "Sports";
  if (type === "employee") return "Team / Employee";
  return "Event";
}
