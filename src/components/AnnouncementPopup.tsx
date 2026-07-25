"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("annt-announcement-seen");
    if (!hasSeen) {
      setTimeout(() => setIsVisible(true), 3000);
    }
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("annt-announcement-seen", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-nature-500 flex items-center justify-center mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold font-poppins text-gray-900">Welcome!</h3>
              <p className="text-gray-500 mt-2">Here's what's happening at ANNT NANDAS FOUNDATION</p>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { icon: "🏃", title: "Upcoming Events", desc: "AVIRALL Nannda Run 2026 - Register Now!" },
                { icon: "🤝", title: "Volunteer Registration", desc: "Join our mission in the Himalayas" },
                { icon: "👥", title: "Running Registration", desc: "Participate in our flagship marathon" },
                { icon: "💼", title: "Employee Registration", desc: "Career opportunities at ANF" },
                { icon: "📰", title: "Latest News", desc: "Foundation registered as Section 8 Company" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={dismiss}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-nature-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
            >
              Let's Explore
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}