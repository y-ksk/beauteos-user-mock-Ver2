// tailwind.config.js の中身

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'cream-yellow': '#FFFBEB',
        'warm-gray': {
          DEFAULT: '#57534E',
          '500': '#78716C',
        },
        'coral-pink': '#FF8A80',
      },
    },
  },
  plugins: [],
};