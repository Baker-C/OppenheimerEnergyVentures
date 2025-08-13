/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lekton", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
        heading: ["Rubik", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#1a1a1a", // deep charcoal
          muted: "#4a4a4a"
        },
        secondary: "#f3f4f6",
        accent: "#1a9",
        charcoal: "#1a1a1a"
      },
    },
  },
  plugins: [],
}

