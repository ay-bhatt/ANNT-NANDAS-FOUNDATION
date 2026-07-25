/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#1D4ED8",
          600: "#1e40af",
          700: "#1e3a8a",
          800: "#172554",
          900: "#0f172a",
          950: "#020617",
        },
        nature: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#16A34A",
          600: "#15803d",
          700: "#166534",
          800: "#14532d",
          900: "#052e16",
        },
        accent: {
          orange: "#f97316",
          red: "#ef4444",
          purple: "#a855f7",
          teal: "#14b8a6",
          amber: "#d97706",
          pink: "#ec4899",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
        soft: "0 4px 20px rgba(0, 0, 0, 0.06)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-left": "fadeLeft 0.6s ease-out forwards",
        "fade-right": "fadeRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "ring-expand": "ringExpand 2s ease-out infinite",
        "leaf-sway": "leafSway 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        ringExpand: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
        leafSway: {
          "0%, 100%": { transform: "rotate(-8deg) scale(1)" },
          "50%": { transform: "rotate(8deg) scale(1.1)" },
        },
      },
    },
  },
  plugins: [],
};