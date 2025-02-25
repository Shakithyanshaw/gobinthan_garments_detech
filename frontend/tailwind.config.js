/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        ipad: '768px', // Define custom iPad size
      },
      colors: {
        customRed: '#950700',
      },
    },
  },
  plugins: [],
};
