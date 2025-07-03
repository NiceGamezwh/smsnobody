import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFC107", // 明亮黄色
        secondary: "#FFB300", // 辅助黄色
        background: "#F5F5F5", // 浅灰背景
        accent: "#333333", // 深灰色
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#333333",
        },
        border: "#E0E0E0",
        input: "#FFFFFF",
        ring: "#FFC107",
        destructive: "#F44336", // 红色用于拒绝按钮
      },
      fontFamily: {
        sans: ["Poppins", "Comic Sans MS", "sans-serif"],
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;