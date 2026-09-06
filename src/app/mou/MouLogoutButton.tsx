"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MouLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await fetch("/api/mou/logout", { method: "POST" });
    } catch {
      // Continue to the login page even if the network call fails.
    }

    router.replace("/mou/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="btn-outline-dark disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Signing out..." : "Log out"}
    </button>
  );
}
