/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swiftBlack: "#000000",
        swiftWhite: "#FFFFFF",
        swiftGold: "#FFD700",
        swiftGreen: "#006400",
        swiftBlue: "#1E90FF"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"]
      }
    }
  },
  plugins: []
};