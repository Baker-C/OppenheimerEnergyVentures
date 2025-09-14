/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xsm: '480px',
        md: '820px',
        lg: '1080px',
      },
      fontFamily: {
        sans: ["Rubik", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
        heading: ["Josefin Sans", "Rubik", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
        subheading: ["Lekton", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
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
        white: "var(--color-white)",
        black: "var(--color-black)",
        "white-muted": "var(--color-white-muted)",
        "black-muted": "var(--color-black-muted)",
        accent: "var(--color-accent)",
        "black-shadow": "var(--color-black-shadow)",
        "white-shadow": "var(--color-white-shadow)",
        "black-shadow-rgb": "var(--color-black-shadow-rgb)",
        "white-shadow-rgb": "var(--color-white-shadow-rgb)",
      },
    },
  },
  plugins: [],
}

