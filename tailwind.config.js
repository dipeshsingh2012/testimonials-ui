/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@dipesh.singh/**/*.{js,mjs,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roastery: {
          dark: '#181614',
          espresso: '#231f1c',
          cream: '#FFFDF7',
          amber: '#d97706',
        }
      }
    },
  },
  plugins: [],
}

