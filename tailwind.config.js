/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        accent: "#FF7A59",
        surface: "#F8FAFC",
        ink: "#0F172A",
        muted: "#475569",
      },
    },
  },
  plugins: [],
};
