/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FF9800",
        light_bg: "#ffffff",
        dark_bg: "#111827"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

