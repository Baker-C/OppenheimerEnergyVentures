/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0a0a0a",
          muted: "#5a5a5a"
        },
  secondary: "#f3f4f6",
        accent: "#1a9",
      },
    },
  },
  plugins: [],
}

