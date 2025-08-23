/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xsm: '480px',
      },
      fontFamily: {
        sans: ["Lekton", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
        heading: ["Josefin Sans", "Rubik", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontWeight: {
        extraLight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        primary: {
          DEFAULT: "#1a1a1a", // deep charcoal
          muted: "#4a4a4a"
        },
  // Updated secondary background color
  secondary: "#EEEEEE",
        accent: "#1a9",
        charcoal: "#1a1a1a"
      },
    },
  },
  plugins: [],
}

