import type { Config } from "tailwindcss";
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import typography from "@tailwindcss/typography";

/**
 * Recreates the Chatwoot Help Center portal design system 1:1.
 * - `n-slate-*` map to the Radix slate scale via CSS vars (see globals.css)
 * - `n-portal*` map to the dynamic portal-color vars driven by #2881F6
 * - `n-weak` / `n-alpha-*` are the portal border / alpha tokens
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.json",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: [
          "Inter",
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Tahoma",
          "Arial",
          "sans-serif",
        ],
      },
      fontWeight: {
        "420": "420",
        "620": "620",
      },
      colors: {
        n: {
          "slate-1": "rgb(var(--slate-1) / <alpha-value>)",
          "slate-2": "rgb(var(--slate-2) / <alpha-value>)",
          "slate-3": "rgb(var(--slate-3) / <alpha-value>)",
          "slate-4": "rgb(var(--slate-4) / <alpha-value>)",
          "slate-5": "rgb(var(--slate-5) / <alpha-value>)",
          "slate-6": "rgb(var(--slate-6) / <alpha-value>)",
          "slate-7": "rgb(var(--slate-7) / <alpha-value>)",
          "slate-8": "rgb(var(--slate-8) / <alpha-value>)",
          "slate-9": "rgb(var(--slate-9) / <alpha-value>)",
          "slate-10": "rgb(var(--slate-10) / <alpha-value>)",
          "slate-11": "rgb(var(--slate-11) / <alpha-value>)",
          "slate-12": "rgb(var(--slate-12) / <alpha-value>)",
          weak: "rgb(var(--border-weak) / <alpha-value>)",
          "alpha-1": "rgba(var(--alpha-1))",
          "alpha-2": "rgba(var(--alpha-2))",
          "alpha-3": "rgba(var(--alpha-3))",
          portal: "var(--dynamic-portal-color)",
          "portal-soft": "var(--dynamic-portal-color-soft)",
          "portal-faint": "var(--dynamic-portal-color-faint)",
        },
      },
      maxWidth: {
        "screen-2xl": "1536px",
      },
    },
  },
  plugins: [
    typography,
    iconsPlugin({
      collections: getIconCollections(["lucide", "ri"]),
    }),
  ],
};

export default config;
