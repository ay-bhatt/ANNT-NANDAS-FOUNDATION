"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const amounts = [500, 1000, 2000, 5000];

export default function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-500 font-semibold text-sm tracking-wider uppercase mb-3 font-inter">
            Support Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 leading-tight">
            Make a{" "}
            <span className="text-primary-500">Donation</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto font-inter">
            Your contribution helps us transform lives across Himalayan communities.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* QR Code Section */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 inline-block">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-32 h-32 text-gray-300" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="20" height="20" rx="2" />
                    <rect x="75" y="5" width="20" height="20" rx="2" />
                    <rect x="5" y="75" width="20" height="20" rx="2" />
                    <rect x="75" y="75" width="20" height="20" rx="2" />
                    <rect x="30" y="5" width="10" height="10" />
                    <rect x="50" y="5" width="10" height="10" />
                    <rect x="5" y="30" width="10" height="10" />
                    <rect x="5" y="50" width="10" height="10" />
                    <rect x="75" y="30" width="10" height="10" />
                    <rect x="75" y="50" width="10" height="10" />
                    <rect x="30" y="75" width="10" height="10" />
                    <rect x="50" y="75" width="10" height="10" />
                    <rect x="30" y="30" width="15" height="15" rx="1" />
                    <rect x="55" y="55" width="15" height="15" rx="1" />
                    <rect x="55" y="30" width="15" height="15" rx="1" />
                    <rect x="30" y="55" width="15" height="15" rx="1" />
                  </svg>
                </div>
                <p className="text-sm font-bold font-poppins text-gray-800">Scan to Donate</p>
                <p className="text-xs text-gray-400 mt-1">UPI: annt-1@upi</p>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl inline-block">
                <p className="text-xs text-gray-500 font-inter">UPI ID: <span className="font-semibold text-gray-800">annt-1@upi</span></p>
              </div>

              <div className="mt-4 text-left">
                <h4 className="text-sm font-bold font-poppins text-gray-800 mb-2">Instructions:</h4>
                <ol className="text-xs text-gray-500 font-inter space-y-1 list-decimal list-inside">
                  <li>Open any UPI app (Google Pay, PhonePe, Paytm)</li>
                  <li>Scan the QR code or enter UPI ID</li>
                  <li>Enter your donation amount</li>
                  <li>Complete the payment</li>
                  <li>Share transaction ID with us for receipt</li>
                </ol>
              </div>
            </motion.div>

            {/* Donation Amount Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-bold font-poppins text-gray-900 mb-6">
                Select Donation Amount
              </h3>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {amounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-4 px-4 rounded-xl text-center font-semibold font-poppins transition-all duration-200 border-2 ${
                      selectedAmount === amount
                        ? "border-primary-500 bg-primary-50 text-primary-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-primary-300"
                    }`}
                  >
                    <span className="text-lg">₹{amount.toLocaleString()}</span>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 font-inter">Custom Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 font-inter"
                  />
                </div>
              </div>

              <button className="w-full py-3.5 rounded-xl bg-nature-500 text-white font-semibold text-sm hover:bg-nature-600 transition-all duration-200 shadow-sm">
                Donate ₹{selectedAmount ? selectedAmount.toLocaleString() : customAmount || "0"} via UPI
              </button>

              <p className="text-xs text-gray-400 mt-3 text-center font-inter">
                You will be redirected to your UPI app to complete the payment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}