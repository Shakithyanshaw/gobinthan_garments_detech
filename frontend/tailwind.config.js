/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src//*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        ipad: '768px', // Define custom iPad size
      },
      colors: {
        customRed: '#801001',
      },
    },
  },
  plugins: [],
};
