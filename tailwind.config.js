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
      },
      minHeight: {
        33: "8.75rem", // Add a custom height of 2rem
      },
    },
  },
  plugins: [require("daisyui")],
};
