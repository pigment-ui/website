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

      colors: {
        default: {
          DEFAULT: "rgb(var(--default-1000) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          0: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--default-50) / <alpha-value>)",
          100: "rgb(var(--default-100) / <alpha-value>)",
          200: "rgb(var(--default-200) / <alpha-value>)",
          300: "rgb(var(--default-300) / <alpha-value>)",
          400: "rgb(var(--default-400) / <alpha-value>)",
          500: "rgb(var(--default-500) / <alpha-value>)",
          600: "rgb(var(--default-600) / <alpha-value>)",
          700: "rgb(var(--default-700) / <alpha-value>)",
          800: "rgb(var(--default-800) / <alpha-value>)",
          900: "rgb(var(--default-900) / <alpha-value>)",
          950: "rgb(var(--default-950) / <alpha-value>)",
          1000: "rgb(var(--default-1000) / <alpha-value>)",
        },
        inverted: {
          DEFAULT: "rgb(var(--default-0) / <alpha-value>)",
          foreground: "rgb(var(--default-1000) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary-500) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          950: "rgb(var(--primary-950) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary-500) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--secondary-50) / <alpha-value>)",
          100: "rgb(var(--secondary-100) / <alpha-value>)",
          200: "rgb(var(--secondary-200) / <alpha-value>)",
          300: "rgb(var(--secondary-300) / <alpha-value>)",
          400: "rgb(var(--secondary-400) / <alpha-value>)",
          500: "rgb(var(--secondary-500) / <alpha-value>)",
          600: "rgb(var(--secondary-600) / <alpha-value>)",
          700: "rgb(var(--secondary-700) / <alpha-value>)",
          800: "rgb(var(--secondary-800) / <alpha-value>)",
          900: "rgb(var(--secondary-900) / <alpha-value>)",
          950: "rgb(var(--secondary-950) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info-500) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--info-50) / <alpha-value>)",
          100: "rgb(var(--info-100) / <alpha-value>)",
          200: "rgb(var(--info-200) / <alpha-value>)",
          300: "rgb(var(--info-300) / <alpha-value>)",
          400: "rgb(var(--info-400) / <alpha-value>)",
          500: "rgb(var(--info-500) / <alpha-value>)",
          600: "rgb(var(--info-600) / <alpha-value>)",
          700: "rgb(var(--info-700) / <alpha-value>)",
          800: "rgb(var(--info-800) / <alpha-value>)",
          900: "rgb(var(--info-900) / <alpha-value>)",
          950: "rgb(var(--info-950) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success-500) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--success-50) / <alpha-value>)",
          100: "rgb(var(--success-100) / <alpha-value>)",
          200: "rgb(var(--success-200) / <alpha-value>)",
          300: "rgb(var(--success-300) / <alpha-value>)",
          400: "rgb(var(--success-400) / <alpha-value>)",
          500: "rgb(var(--success-500) / <alpha-value>)",
          600: "rgb(var(--success-600) / <alpha-value>)",
          700: "rgb(var(--success-700) / <alpha-value>)",
          800: "rgb(var(--success-800) / <alpha-value>)",
          900: "rgb(var(--success-900) / <alpha-value>)",
          950: "rgb(var(--success-950) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning-500) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--warning-50) / <alpha-value>)",
          100: "rgb(var(--warning-100) / <alpha-value>)",
          200: "rgb(var(--warning-200) / <alpha-value>)",
          300: "rgb(var(--warning-300) / <alpha-value>)",
          400: "rgb(var(--warning-400) / <alpha-value>)",
          500: "rgb(var(--warning-500) / <alpha-value>)",
          600: "rgb(var(--warning-600) / <alpha-value>)",
          700: "rgb(var(--warning-700) / <alpha-value>)",
          800: "rgb(var(--warning-800) / <alpha-value>)",
          900: "rgb(var(--warning-900) / <alpha-value>)",
          950: "rgb(var(--warning-950) / <alpha-value>)",
        },
        error: {
          DEFAULT: "rgb(var(--error-500) / <alpha-value>)",
          foreground: "rgb(var(--default-0) / <alpha-value>)",
          50: "rgb(var(--error-50) / <alpha-value>)",
          100: "rgb(var(--error-100) / <alpha-value>)",
          200: "rgb(var(--error-200) / <alpha-value>)",
          300: "rgb(var(--error-300) / <alpha-value>)",
          400: "rgb(var(--error-400) / <alpha-value>)",
          500: "rgb(var(--error-500) / <alpha-value>)",
          600: "rgb(var(--error-600) / <alpha-value>)",
          700: "rgb(var(--error-700) / <alpha-value>)",
          800: "rgb(var(--error-800) / <alpha-value>)",
          900: "rgb(var(--error-900) / <alpha-value>)",
          950: "rgb(var(--error-950) / <alpha-value>)",
        },
        focus: "rgb(var(--default-1000) / <alpha-value>)",
      },
    },
  },
};

export default config;
