import type { Metadata } from "next";
import AdminRegistrations from "@/components/admin/AdminRegistrations";

export const metadata: Metadata = {
  title: "Registration records | ANNT NANDAS FOUNDATION",
  robots: { index: false, follow: false },
};

export default function AdminRegistrationsPage() {
  return <AdminRegistrations />;
}
