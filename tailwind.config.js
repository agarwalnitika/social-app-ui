/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["bg-primary", "text-primary"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Add custom colors here
        secondary: "yellow",
        accent: "#F59E0B",
      },
    },
  },
  plugins: [],
};
