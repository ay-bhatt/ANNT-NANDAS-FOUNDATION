import { getAllData } from "@/lib/api";
import RegistrationForm from "@/components/RegistrationForm";

export default async function VolunteerRegistration() {
  const data = await getAllData();
  return (
    <RegistrationForm
      type="volunteer"
      title="Volunteer Registration"
      description="Join our mission to transform lives in the Himalayas. Your time and skills can create lasting change."
      heroImage={data.heroContent.supportingVisuals[1]}
      genderOptions={data.formOptions.genderOptions}
      occupationOptions={data.formOptions.occupationOptions}
    />
  );
}
