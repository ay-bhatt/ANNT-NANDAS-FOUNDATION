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
      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-nature-500 flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold font-poppins text-gray-900">Registration Successful!</h1>
            <p className="text-gray-500 mt-2 mb-6 font-inter">Thank you for registering. We will contact you shortly at {formData.email}.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-300 shadow-sm"
            >
              Back to Home
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary-200 font-semibold text-sm tracking-wider uppercase mb-4 font-inter">Register</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-4">{title}</h1>
          <p className="text-primary-200 max-w-2xl mx-auto font-inter text-lg">{description}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">WhatsApp Number</label>
                  <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Enter your WhatsApp number" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm">
                    <option value="">Select Gender</option>
                    {genderOptions.map((g) => (<option key={g} value={g}>{g}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Date of Birth *</label>
                  <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Occupation</label>
                  <select name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm">
                    <option value="">Select Occupation</option>
                    {occupationOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Emergency Contact *</label>
                  <input type="tel" name="emergencyContact" required value={formData.emergencyContact} onChange={handleChange} placeholder="Emergency contact number" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                </div>
                {type === "volunteer" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Skills / Expertise</label>
                      <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., Teaching, Coaching" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Availability</label>
                      <select name="availability" value={formData.availability} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm">
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
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Running Category</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm">
                        <option value="">Select Category</option>
                        <option value="5k">5K Run</option>
                        <option value="10k">10K Run</option>
                        <option value="half">Half Marathon</option>
                        <option value="full">Full Marathon</option>
                        <option value="ultra">Ultra Trail</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Previous Experience</label>
                      <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., Finished 3 marathons" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                    </div>
                  </>
                )}
                {type === "employee" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Position Applied For</label>
                      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position you're applying for" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Qualifications</label>
                      <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="Your educational qualifications" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm" />
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5 font-inter">Address *</label>
                <textarea name="address" required value={formData.address} onChange={handleChange} rows={3} placeholder="Enter your full address" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter text-sm resize-none" />
              </div>

              <div className="mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={(e) => setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }))} className="mt-1 w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500" />
                  <span className="text-sm text-gray-600 font-inter">I agree to the terms and conditions and confirm that the information provided is accurate.</span>
                </label>
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full px-6 py-3.5 rounded-xl bg-primary-500 text-white font-semibold text-sm hover:bg-primary-600 transition-all duration-200 shadow-sm">
                  Submit Registration
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}