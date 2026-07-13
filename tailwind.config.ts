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
        ink: "#ffffff",
        body: "#cccccc",
        "body-strong": "#e6e6e6",
        muted: "#999999",
        "muted-soft": "#666666",
        "surface-soft": "#0d0d0d",
        "surface-card": "#141414",
        "surface-elevated": "#1f1f1f",
        "product-card": "#eaeaea",
        "product-image": "#f2f2f2",
        "product-ink": "#000000",
        hairline: "#262626",
        "hairline-strong": "#3a3a3a",
        link: "#c3d9f3",
        warning: "#d4a017",
        success: "#5fa657",
        "award-gold": "#FFD700",
      },
      fontFamily: {
        display: ['var(--font-saira-condensed)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        body: ['var(--font-garamond)', 'serif'],
        serif: ['var(--font-garamond)', 'serif'],
      },
      borderRadius: {
        none: "0px",
        pill: "9999px",
        full: "9999px",
      },
      spacing: {
        "ia-xxs": "4px",
        "ia-xs": "8px",
        "ia-sm": "12px",
        "ia-md": "16px",
        "ia-lg": "24px",
        "ia-xl": "40px",
        "ia-xxl": "64px",
        "ia-section": "120px",
      },
      maxWidth: {
        content: "1280px",
        wide: "1720px",
      },
      fontSize: {
        "display-xl": ["64px", { lineHeight: "1.1", letterSpacing: "4px" }],
        "display-lg": ["48px", { lineHeight: "1.15", letterSpacing: "3px" }],
        "display-md": ["32px", { lineHeight: "1.2", letterSpacing: "2px" }],
        "display-sm": ["24px", { lineHeight: "1.3", letterSpacing: "1.5px" }],
        wordmark: ["14px", { lineHeight: "1", letterSpacing: "6px" }],
        "title-md": ["20px", { lineHeight: "1.3", letterSpacing: "1px" }],
        "title-sm": ["16px", { lineHeight: "1.3", letterSpacing: "1.5px" }],
        "body-md": ["16px", { lineHeight: "1.5", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0" }],
        caption: ["11px", { lineHeight: "1.4", letterSpacing: "2px" }],
        button: ["14px", { lineHeight: "1", letterSpacing: "2.5px" }],
        nav: ["12px", { lineHeight: "1.4", letterSpacing: "2px" }],
      },
    },
  },
  plugins: [],
};

export default config;
