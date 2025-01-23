/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        xsm: "399px",
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
};
