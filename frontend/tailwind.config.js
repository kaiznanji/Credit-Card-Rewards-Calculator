/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "co-blue":'#004879',
        "co-red": '#D22E1E'
      }
    },
  }, 
  plugins: [],
}

