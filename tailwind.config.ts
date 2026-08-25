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
      },
      fontFamily: {
        script: ["var(--font-fleur)", "cursive"],
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-dmserif)", "serif"],
      },
      transitionTimingFunction: {
        "gentle-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "flap-wing": {
          "0%, 100%": { transform: "scaleX(1)" },
          "50%": { transform: "scaleX(0.55)" },
        },
        "drift": {
          "0%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(10px,-14px) rotate(4deg)" },
          "100%": { transform: "translate(0,0) rotate(0deg)" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "flap-wing": "flap-wing 1.6s ease-in-out infinite",
        "drift": "drift 6s ease-in-out infinite",
        "slow-spin": "slow-spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
