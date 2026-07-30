"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { genderOptions, occupationOptions } from "@/lib/data";

interface RegistrationFormProps {
  type: "volunteer" | "employee" | "running" | "general";
  title: string;
  description: string;
}

export default function RegistrationForm({ type, title, description }: RegistrationFormProps) {
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
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="container-premium">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-success-600 text-white shadow-soft">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold font-poppins text-slate-950">Registration Submitted</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600 font-inter">
              Thank you for registering with us. We will get in touch with you shortly at {formData.email}. Until then, feel free to explore our mission and upcoming programmes.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-primary-500/20 transition hover:bg-primary-600"
            >
              Back to Home
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="container-premium text-center">
          <p className="text-primary-200 text-sm font-semibold uppercase tracking-[0.32em] mb-4 font-inter">
            Register
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-poppins leading-tight">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-primary-200 font-inter">
            {description}
          </p>
        </div>
      </section>

      <section className="section-padding bg-slate-50">
        <div className="container-premium">
          <div className="mx-auto max-w-4xl rounded-[32px] bg-white p-6 shadow-soft ring-1 ring-slate-200/80 sm:p-10">
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Enter your WhatsApp number"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Gender
                  </label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full">
                    <option value="">Select Gender</option>
                    {genderOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Occupation
                  </label>
                  <select id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full">
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                    Emergency Contact
                  </label>
                  <input
                    id="emergencyContact"
                    type="tel"
                    name="emergencyContact"
                    required
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    placeholder="Emergency contact number"
                    className="w-full"
                  />
                </div>

                {type === "volunteer" && (
                  <>
                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                        Skills / Expertise
                      </label>
                      <input
                        id="skills"
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="e.g., Teaching, Coaching"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                        Availability
                      </label>
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
                      <label htmlFor="category" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                        Running Category
                      </label>
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
                      <label htmlFor="experience" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                        Previous Experience
                      </label>
                      <input
                        id="experience"
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="e.g., Finished 3 marathons"
                        className="w-full"
                      />
                    </div>
                  </>
                )}

                {type === "employee" && (
                  <>
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                        Position Applied For
                      </label>
                      <input
                        id="position"
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Position you're applying for"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="qualifications" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                        Qualifications
                      </label>
                      <input
                        id="qualifications"
                        type="text"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                        placeholder="Your educational qualifications"
                        className="w-full"
                      />
                    </div>
                  </>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-800 mb-2 font-inter">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your full address"
                  className="w-full resize-none"
                />
              </div>

              <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                <label className="flex gap-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }))}
                    className="mt-1 h-5 w-5 rounded-xl border-slate-300 text-primary-600 shadow-sm focus:ring-primary-500"
                  />
                  <span className="text-sm leading-6 text-slate-600 font-inter">
                    I agree to the terms and conditions and confirm that the information provided is accurate.
                  </span>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-primary-500/15 transition hover:bg-primary-600"
                >
                  Submit Registration
                </button>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 text-center transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Need Help? Contact Us
                </Link>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}
