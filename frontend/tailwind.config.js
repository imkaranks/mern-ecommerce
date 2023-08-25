/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        product: 'repeat(auto-fit, minmax(min(100%, 224px), 1fr))'
      },
      fontFamily: {
        primary: ['Open Sans', 'sans-serif'],
        accent: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}

