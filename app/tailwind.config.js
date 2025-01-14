/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // This line should include your JSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

