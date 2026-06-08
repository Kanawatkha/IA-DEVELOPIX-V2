import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#000000",
        primary: "#ffffff",
        muted: "#999999",
        "muted-soft": "#666666",
        "surface-soft": "#0d0d0d",
        "surface-card": "#141414",
        "surface-elevated": "#1f1f1f",
        hairline: "#262626",
        "hairline-strong": "#3a3a3a",
        link: "#c3d9f3",
      },
      fontFamily: {
        display: ['var(--font-saira-condensed)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        body: ['var(--font-garamond)', 'serif'],
        serif: ['var(--font-garamond)', 'serif'],
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
