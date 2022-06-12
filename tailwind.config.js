/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        dotgothic: ['DotGothic16'],
        notosanjp: ['Noto+Sans+JP']
      },
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'), require('@tailwindcss/line-clamp'),],
};
