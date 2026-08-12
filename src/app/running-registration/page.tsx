import { getAllData } from "@/lib/api";
import RegistrationForm from "@/components/RegistrationForm";

export default async function RunningRegistration() {
  const data = await getAllData();
  return (
    <RegistrationForm
      type="running"
      title="Running Registration"
      description="Register for AVIRALL Nannda Run and be part of our flagship event promoting fitness and community spirit."
      heroImage={data.heroContent.supportingVisuals[1]}
      genderOptions={data.formOptions.genderOptions}
      occupationOptions={data.formOptions.occupationOptions}
    />
  );
}
