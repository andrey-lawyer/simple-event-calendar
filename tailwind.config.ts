import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        open_sans: ["var(--font-open-sans)"],
        inter: ["var(--font-inter)"],
      },
      colors: {
        event: " #E2ECF5",
        border: "#6E9ECF",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          sm: "1.5rem",
          md: "5.25rem",
          xl: "2rem",
          xxl: "2rem",
        },
      },
    },
  },
  plugins: [],
};
export default config;
