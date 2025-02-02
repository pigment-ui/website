import { twConfig } from "pigment-ui";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/pigment-ui/dist/**/*.{js,ts,jsx,tsx,mdx}",
    "./packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [twConfig],
  darkMode: "class",
  theme: {
    extend: {
      container: { center: true, padding: "1rem", screens: { xl: "1280px" } },
    },
  },
};

export default config;
