import type { Config } from "tailwindcss";

/**
 * Design tokens — Mohammeda Sporting Club, Faridpur
 * Palette rationale documented in /docs/design-system.md (added in Step 2 — UI Design)
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#EAF3EE",
          100: "#CFE4D9",
          200: "#9FC9B3",
          300: "#6FAD8D",
          400: "#3F9268",
          500: "#1F6B47",
          600: "#155839", // primary dark green
          700: "#0F4530",
          800: "#0A3324", // deep club green
          900: "#06211A", // near-black green (dark mode base)
        },
        gold: {
          50: "#FBF6E7",
          100: "#F4E8BE",
          200: "#EBD892",
          300: "#E0C665",
          400: "#D4B347",
          500: "#C6A02F", // primary gold
          600: "#A9832A", // deep gold / bronze for text-on-light
          700: "#846425",
          800: "#5F481D",
          900: "#3B2C13",
        },
        cream: {
          DEFAULT: "#FAF8F2",
          soft: "#F3EFE4",
        },
        ink: "#132018",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        "display-bn": ["var(--font-display-bn)", "serif"],
        "body-bn": ["var(--font-body-bn)", "sans-serif"],
      },
      backgroundImage: {
        "emblem-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      boxShadow: {
        gold: "0 8px 30px -8px rgba(198, 160, 47, 0.35)",
        emblem: "0 0 0 1px rgba(198, 160, 47, 0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};

export default config;
