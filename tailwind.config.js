/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        szPrimary: "#00848b",
        szSecondary: {
          100: "#ff675b",
          200: "#d63637",
        },
        dark: "#5a5a5a",
        inputGray: "#8b8b8b",
      },
    },
  },
  plugins: [],
};
