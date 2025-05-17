/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": {
          light: "#A7F3D0", // emerald-200
          DEFAULT: "#34D399", // emerald-400
          dark: "#065F46", // emerald-800
          darker: "#04422F", // emerald-900
        },
        "brand-gray": {
          light: "#F3F4F6", // gray-100
          DEFAULT: "#6B7280", // gray-500
          dark: "#1F2937", // gray-800
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "subtle-pulse": "subtlePulse 2s infinite ease-in-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        subtlePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};
