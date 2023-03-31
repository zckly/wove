/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        tasman: {
          DEFAULT: "#CED4CB",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#F8F9F8",
          400: "#E3E6E1",
          500: "#CED4CB",
          600: "#B1BBAC",
          700: "#94A18E",
          800: "#778770",
          900: "#5C6856",
        },
        "outer-space": {
          DEFAULT: "#2E383D",
          50: "#B0BDC4",
          100: "#A5B4BB",
          200: "#8EA0A9",
          300: "#768D98",
          400: "#637883",
          500: "#51636C",
          600: "#404D54",
          700: "#2E383D",
          800: "#161B1D",
          900: "#000000",
        },
        gigas: {
          DEFAULT: "#4540AF",
          50: "#DEDDF3",
          100: "#CFCEED",
          200: "#B2B0E2",
          300: "#9592D7",
          400: "#7874CC",
          500: "#5B56C1",
          600: "#4540AF",
          700: "#353186",
          800: "#25225D",
          900: "#141334",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        "2xl": "40rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/typography"),
  ],
};
