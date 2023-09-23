/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#444350",
        lightgrey: "#ffffff66",
        bluish: "#00E0FF",
        creme:'#7C96A0',
        lightergrey: "rgba(206, 206, 206, 0.7)",
        darkpurple: "#933FFF",
        lightpink: "#FFF1F1B2",
        indigoish: "#5F68B6",
        pink:"#FFEBEA",
        peach: "#FFEBEA"
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'jua': ['Jua', 'Roboto', 'sans-serif'],
        'helvetica': ['Helvetica', 'sans-serif']
      }
    },
  },
  plugins: [],
};
