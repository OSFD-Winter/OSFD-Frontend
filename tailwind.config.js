/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "22vw": "22vw",
        "8vw": "8vw",
      },
      gridTemplateColumns: {
        "referral-row": "30% 50% 13%",
      },
    },
    colors: {
      // ...
      blue: {
        1000: "#060124",
        50: "#265cf0",
      },
      purple: {
        900: "#462b8e",
        700: "#621f9a",
      },
      indigo: {
        50: "#eef1ff",
      },
      gray: {
        300: "#a8a8a8",
        50: "#e8eaf2",
      },
      white: "white",
    },
  },
  plugins: [],
};
