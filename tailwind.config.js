/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
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
      white: "white",
    },
  },
  plugins: [],
};
