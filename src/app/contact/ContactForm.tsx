"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  setStatus("loading");
  setErrorMessage("");

  const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const text = await response.text();

  console.log("API STATUS:", response.status);
  console.log("API RESPONSE:", text);

  if (response.ok) {
    setStatus("success");
    form.reset();
    return;
  }

  setStatus("error");
  setErrorMessage(text || "Something went wrong. Please try again.");
} catch (error) {
  console.error("CONTACT ERROR:", error);
  setStatus("error");
  setErrorMessage("Network error. Please try again later.");
}
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <h3 className="mb-2 text-lg font-semibold text-emerald-800">Message Sent!</h3>
        <p className="text-emerald-700">Thank you for reaching out. We’ll get back to you soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-emerald-700 hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-slate-800">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Your name" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" disabled={status === "loading"} />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-slate-800">Your email</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="Your email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" disabled={status === "loading"} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-slate-800">Subject</label>
        <input id="contact-subject" name="subject" type="text" required placeholder="Subject" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-800">Message</label>
        <textarea id="contact-message" name="message" required placeholder="Tell us how you’d like to connect" rows={7} className="w-full resize-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" disabled={status === "loading"} />
      </div>

      {status === "error" && <p className="text-sm font-medium text-red-600">{errorMessage}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70">
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}