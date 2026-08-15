"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PageHero } from "@/components/site/SectionBlocks";

interface RegistrationFormProps {
  type: "volunteer" | "employee" | "running" | "general";
  title: string;
  description: string;
  heroImage: string;
  genderOptions: string[];
  occupationOptions: string[];
}

export default function RegistrationForm({ type, title, description, heroImage, genderOptions, occupationOptions }: RegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    gender: "",
    dob: "",
    address: "",
    emergencyContact: "",
    occupation: "",
    agreeTerms: false,
    skills: "",
    availability: "",
    category: "",
    experience: "",
    position: "",
    qualifications: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.agreeTerms) return;

  try {
    const response = await fetch("/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        ...formData,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Registration failed");
    }

    setSubmitted(true);
  } catch (error) {
    console.error("Registration error:", error);
    alert("Unable to submit registration. Please try again.");
  }
};

  if (submitted) {
    return (
      <section className="section-padding px-3 pt-32 sm:px-5 sm:pt-36">
        <div className="container-premium">
          <div className="surface-card mx-auto max-w-3xl p-8 text-center sm:p-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-blue-600 text-3xl text-white shadow-[0_24px_60px_rgba(37,99,235,0.25)]">
              ✓
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl">Registration Submitted</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Thank you for registering with us. We will reach out shortly at {formData.email || "your email address"}. In the meantime, feel free to explore our programmes and latest updates.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/" className="btn-primary">Back to Home</Link>
              <Link href="/programs" className="btn-outline-dark">View Programs</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="pb-8">
      <PageHero
        eyebrow="Registration"
        title={title}
        description={description}
        image={heroImage}
        actions={[
          { label: "Contact Us", href: "/contact" },
          { label: "Donate Now", href: "/donate", variant: "secondary" },
        ]}
      />

      <section className="section-padding px-3 sm:px-5">
        <div className="container-premium grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="surface-dark p-7 sm:p-8">
            <span className="section-label-dark">Why Register</span>
            <h2 className="text-3xl font-bold tracking-[-0.03em] text-white">Join the mission with intention</h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              This form helps the foundation understand your background, interests, and how best to involve you in meaningful opportunities.
            </p>
            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">• Volunteer, event, and general registrations are designed to feel integrated into the same premium experience as the rest of the site.</div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">• Your information is used only to coordinate relevant follow-up and participation.</div>
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">• If you have questions before submitting, use the contact page to connect directly.</div>
            </div>
          </div>

          <div className="surface-card p-6 sm:p-8 lg:p-10">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-800">Full Name</label>
                  <input id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">Email Address</label>
                  <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-800">Phone Number</label>
                  <input id="phone" type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full" />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-slate-800">WhatsApp Number</label>
                  <input id="whatsapp" type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Enter your WhatsApp number" className="w-full" />
                </div>
                <div>
                  <label htmlFor="gender" className="mb-2 block text-sm font-medium text-slate-800">Gender</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full">
                    <option value="">Select Gender</option>
                    {genderOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="dob" className="mb-2 block text-sm font-medium text-slate-800">Date of Birth</label>
                  <input id="dob" type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full" />
                </div>
                <div>
                  <label htmlFor="occupation" className="mb-2 block text-sm font-medium text-slate-800">Occupation</label>
                  <select id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full">
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="emergencyContact" className="mb-2 block text-sm font-medium text-slate-800">Emergency Contact</label>
                  <input id="emergencyContact" type="tel" name="emergencyContact" required value={formData.emergencyContact} onChange={handleChange} placeholder="Emergency contact number" className="w-full" />
                </div>

                {type === "volunteer" && (
                  <>
                    <div>
                      <label htmlFor="skills" className="mb-2 block text-sm font-medium text-slate-800">Skills / Expertise</label>
                      <input id="skills" type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Teaching, Coaching" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="availability" className="mb-2 block text-sm font-medium text-slate-800">Availability</label>
                      <select id="availability" name="availability" value={formData.availability} onChange={handleChange} className="w-full">
                        <option value="">Select Availability</option>
                        <option value="weekends">Weekends</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="full-time">Full Time</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </>
                )}

                {type === "running" && (
                  <>
                    <div>
                      <label htmlFor="category" className="mb-2 block text-sm font-medium text-slate-800">Running Category</label>
                      <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full">
                        <option value="">Select Category</option>
                        <option value="5k">5K Run</option>
                        <option value="10k">10K Run</option>
                        <option value="half">Half Marathon</option>
                        <option value="full">Full Marathon</option>
                        <option value="ultra">Ultra Trail</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="experience" className="mb-2 block text-sm font-medium text-slate-800">Previous Experience</label>
                      <input id="experience" type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g. Finished 3 marathons" className="w-full" />
                    </div>
                  </>
                )}

                {type === "employee" && (
                  <>
                    <div>
                      <label htmlFor="position" className="mb-2 block text-sm font-medium text-slate-800">Position Applied For</label>
                      <input id="position" type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position you're applying for" className="w-full" />
                    </div>
                    <div>
                      <label htmlFor="qualifications" className="mb-2 block text-sm font-medium text-slate-800">Qualifications</label>
                      <input id="qualifications" type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Your educational qualifications" className="w-full" />
                    </div>
                  </>
                )}
              </div>

              <div>
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-800">Address</label>
                <textarea id="address" name="address" required value={formData.address} onChange={handleChange} rows={4} placeholder="Enter your full address" className="w-full resize-none" />
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                <label className="flex gap-3 text-sm leading-6 text-slate-600">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    required
                    onChange={(e) => setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }))}
                    className="mt-1 h-5 w-5 rounded-xl border-slate-300 text-primary-600 shadow-sm focus:ring-primary-500"
                  />
                  <span>I agree to the terms and confirm the information provided is accurate.</span>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button type="submit" className="btn-primary w-full justify-center">Submit Registration</button>
                <Link href="/contact" className="btn-outline-dark w-full justify-center">Need Help? Contact Us</Link>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
