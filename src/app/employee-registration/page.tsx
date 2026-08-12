import { getAllData } from "@/lib/api";
import RegistrationForm from "@/components/RegistrationForm";

export default async function EmployeeRegistration() {
  const data = await getAllData();
  return (
    <RegistrationForm
      type="employee"
      title="Employee Registration"
      description="Join the ANNT NANDAS FOUNDATION team and be part of a movement creating lasting social impact."
      heroImage={data.heroContent.supportingVisuals[1]}
      genderOptions={data.formOptions.genderOptions}
      occupationOptions={data.formOptions.occupationOptions}
    />
  );
}
