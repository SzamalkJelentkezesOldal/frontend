/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/html/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      body: ["Roboto", "sans-serif"],
    },
    container: {
      center: true,
    },
    extend: {
      screens: {
        xsm: "399px",
        sl: "1100px",
      },
      colors: {
        szPrimary: {
          DEFAULT: "#00848b",
          100: "#d0ede6",
          200: "#3ac1bd",
          300: "#00848b",
        },
        szSecondary: {
          100: "#ff675b",
          200: "#d63637",
        },
        grayBorder: "#ccced0",
        dark: "#5a5a5a",
        inputGray: {
          DEFAULT: "#8b8b8b",
          50: "#CFD8DC",
          100: "#8b8b8b",
        },
        disabledGray: "#ccc",
      },
    },
  },
  plugins: [],
});
