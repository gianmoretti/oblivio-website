import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        blue: {
          100: "#d3d0f7",
          200: "#bab5f7",
          300: "#a49cff",
          400: "#6F61FF",
          500: "#4635F3",
          600: "#321FF9",
          700: "#1905f2",
        },
        orange: {
          100: "#f5ebe4",
          200: "#f5dac6",
          300: "#f7c9a6",
          400: "#F5AC76",
          500: "#F87F26",
          600: "#FC6B00",
        },
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
