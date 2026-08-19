import { todayIsoDate } from "./constants";
import type {
  RegistrationFormState,
  RegistrationPayload,
  RegistrationType,
  SportKind,
} from "./types";

export function createEmptyForm(
  type: RegistrationType | "" = "",
  sport: SportKind | "" = "",
): RegistrationFormState {
  return {
    type,
    personal: {
      fullName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      age: "",
      gender: "",
      nationality: "Indian",
      address: "",
      phone: "",
      email: "",
      whatsapp: "",
      bloodGroup: "",
      education: "",
      specialEducation: "",
      occupation: "",
    },
    volunteer: {
      volunteerName: "",
      skills: "",
      roles: [],
      otherRole: "",
      subjects: "",
      experience: "",
      motivation: "",
      preferredTiming: "",
      customTiming: "",
      availability: "",
      preferredLocation: "",
      foodSupport: "",
      staySupport: "",
      travelSupport: "",
      otherSupport: "",
      duration: "",
      customDuration: "",
      additionalComments: "",
    },
    membership: {
      membershipType: "",
      areasOfInterest: [],
      contribution: "",
      howHeard: "",
      emergencyName: "",
      emergencyPhone: "",
      additionalComments: "",
    },
    sports: {
      sport,
      otherSport: "",
      category: "",
      experienceLevel: "",
      previousParticipation: "",
      emergencyName: "",
      emergencyPhone: "",
      medicalInfo: "",
      medicallyFit: false,
      tshirtSize: "",
      additionalComments: "",
    },
    employee: {
      position: "",
      qualifications: "",
      experience: "",
      availabilityToJoin: "",
      whyJoin: "",
      additionalComments: "",
    },
    event: {
      eventInterest: "",
      participationMode: "",
      emergencyName: "",
      emergencyPhone: "",
      additionalComments: "",
    },
    photograph: null,
    signature: null,
    declaration: {
      accepted: false,
      place: "",
      date: todayIsoDate(),
    },
  };
}

export function toPayload(state: RegistrationFormState): RegistrationPayload | null {
  if (!state.type) return null;
  return {
    type: state.type,
    personal: state.personal,
    volunteer: state.type === "volunteer" ? state.volunteer : undefined,
    membership: state.type === "membership" ? state.membership : undefined,
    sports: state.type === "sports" ? state.sports : undefined,
    employee: state.type === "employee" ? state.employee : undefined,
    event: state.type === "event" ? state.event : undefined,
    photograph: state.photograph,
    signature: state.signature,
    declaration: state.declaration,
  };
}
