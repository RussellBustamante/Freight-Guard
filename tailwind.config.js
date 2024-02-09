/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      ...colors,
      'pls-orange': '#D34415',
      'pls-green': '#016A3F',
      'pls-black': '#00052C',
      'text.default': '#1E2245',
      'accent.green': '#E7FBF2',
      'accent.gray': '#DADADA',
      'text.white': '#FFFFFF',
    },
    extend: {},
  },
  plugins: [],
}

