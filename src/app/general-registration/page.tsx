import { getAllData } from "@/lib/api";
import RegistrationForm from "@/components/RegistrationForm";

export default async function GeneralRegistration() {
  const data = await getAllData();
  return (
    <RegistrationForm
      type="general"
      title="Event Registration"
      description="Register for our upcoming events and activities. Participate in transforming communities."
      heroImage={data.heroContent.supportingVisuals[1]}
      genderOptions={data.formOptions.genderOptions}
      occupationOptions={data.formOptions.occupationOptions}
    />
  );
}
