import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/site/PrivacyPolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | ANNT NANDAS FOUNDATION",
  description: "How ANNT NANDAS FOUNDATION collects, uses, and protects personal information submitted through this website.",
  alternates: {
    canonical: "/privacy",
    types: { "text/markdown": "/privacy.md" },
  },
};

export default function PrivacyPage() {
  return <PrivacyPolicyContent />;
}
