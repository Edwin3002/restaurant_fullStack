/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#F2E098",
        },
        secondary: {
          main: "#3E4533",
          light: "#485C28"
        },
        tertiary: {
          main: "#fcf0d0"
        },
      }
    },
  },
  plugins: [],
}

