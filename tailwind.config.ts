import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        jcs: {
          dark: "#0F0F11",
          gray: "#1A1A1E",
          metallic: "#33333A",
          light: "#E2E2E2",
          red: "#C22424",
          redHover: "#9c1b1b"
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)'],
        mono: ['var(--font-space-mono)'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
