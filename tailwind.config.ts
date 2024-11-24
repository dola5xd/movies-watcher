import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1E1E1E",
        primery: {
          "black-700": "#28262D",
          "black-800": "#0D0C0F",
          "black-900": "#08080A",
          grey: "#9CA4AB",
          white: "#FFFFFF",
          red: "#EB3F5E",
          green: "#00925D",
        },
      },
      animation: {
        scroll: "scroll 10s linear infinite",
      },

      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-108%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
