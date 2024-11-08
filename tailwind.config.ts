import type { Config } from "tailwindcss";
import { twConfig } from "pigment-ui-test";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/pigment-ui-test/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [twConfig],
  darkMode: "class",
  theme: {
    extend: {
      container: { center: true, padding: "1rem", screens: { xl: "1280px" } },
    },
  },
};

export default config;
