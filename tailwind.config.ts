import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: "#fdf6f3",
          100: "#fbeae4",
          200: "#f5d3c8",
          300: "#eab3a0",
          400: "#dd8b70",
          500: "#c96b4d",
        },
        ivory: "#faf7f2",
        sage: {
          100: "#eef1ea",
          300: "#c7d0bb",
          500: "#8a9a76",
          700: "#5b6a49",
        },
        ink: "#3a332e",
        gold: "#b08d57",
        // Hero palette from the approved "Option A: Parallax Courtyard" design —
        // kept separate from the tokens above so existing sections are untouched.
        cream: {
          50: "#fbeee5",
          100: "#f7e5db",
          200: "#f1d9cb",
          300: "#e8c8b4",
        },
        clay: {
          500: "#8b3f27",
          600: "#6e412e",
          700: "#663c2c",
          800: "#4a2318",
        },
        honey: "#a8703f",
      },
      fontFamily: {
        script: ["var(--font-heading)", "cursive"],
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "serif"],
        montecarlo: ["var(--font-heading)", "cursive"],
      },
      transitionTimingFunction: {
        "gentle-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;