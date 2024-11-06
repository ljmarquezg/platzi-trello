/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        success: colors.green,
        primary: colors.blue,
        secondary: colors.gray,
      },
      container: {
        screens: {
          xl: '1024px',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
