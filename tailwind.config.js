/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": {
          lightest: "#ECFDF5", // emerald-50
          lighter: "#A7F3D0", // emerald-200
          light: "#6EE7B7", // emerald-300
          DEFAULT: "#34D399", // emerald-400
          dark: "#10B981", // emerald-500
          darker: "#059669", // emerald-600
          darkest: "#047857", // emerald-700
          deep: "#065F46", // emerald-800
          deepest: "#064E3B", // emerald-900
        },
        "brand-gray": {
          lightest: "#F9FAFB", // gray-50
          light: "#F3F4F6", // gray-100
          DEFAULT: "#6B7280", // gray-500
          dark: "#374151", // gray-700
          darker: "#1F2937", // gray-800
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "fade-in-down": "fadeInDown 0.8s ease-out forwards",
        "fade-in-left": "fadeInLeft 0.8s ease-out forwards",
        "fade-in-right": "fadeInRight 0.8s ease-out forwards",
        "subtle-pulse": "subtlePulse 2.5s infinite ease-in-out",
        "hero-text-pop":
          "heroTextPop 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s forwards",
        "gradient-shift": "gradientShift 15s ease infinite",
        "slide-up-reveal":
          "slideUpReveal 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        shimmer: "shimmer 2s infinite linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        subtlePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        heroTextPop: {
          "0%": { transform: "translateY(20px) scale(0.95)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideUpReveal: {
          "0%": { transform: "translateY(100%)", opacity: "0.5" },
          "100%": { transform: "translateY(0%)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-100% 0" },
          "100%": { backgroundPosition: "100% 0" },
        },
      },
    },
  },
  plugins: [],
};
