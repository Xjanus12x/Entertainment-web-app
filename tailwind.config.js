/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vividRed: "#FC4747",
        midnightBlue: "#10141E",
        slateBlue: "#5A698F",
        deepNavy: "#161D2F",
        crispWhite: "#FFFFFF",
      },
      fontSize: {
        "2.5xl": "2rem",
        "3.2xl": "2rem",
      },
      space: {
        6.1: "1.563rem",
        8.2: "2.125rem",
      },
      minHeight: {
        33: "8.75rem", // Add a custom height of 2rem
      },
      gap: {
        2.1: "0.563rem",
        3.6: "0.938rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
