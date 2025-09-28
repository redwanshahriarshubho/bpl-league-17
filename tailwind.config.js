/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bpl-green': '#1b4f2a',
        'bpl-red': '#d1121b'
      }
    }
  },
  plugins: [require('daisyui')],
};
