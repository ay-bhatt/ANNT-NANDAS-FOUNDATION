"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function MouLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    if (!password.trim()) {
      setStatus("error");
      setErrorMessage("Please enter the access password.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/mou/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (result.success) {
        setPassword("");
        router.replace("/mou");
        router.refresh();
        return;
      }

      setStatus("error");
      setErrorMessage(result.message || "Access denied. Please try again.");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div>
        <label htmlFor="mou-password" className="mb-2 block text-sm font-medium text-slate-800">
          Administrator password
        </label>
        <input
          id="mou-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={status === "loading"}
          placeholder="Enter password"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {status === "error" ? <p className="text-sm font-medium text-red-600">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? "Checking..." : "Access MOU"}
      </button>
    </form>
  );
}
