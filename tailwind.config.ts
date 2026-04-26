import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      screens: {
      sm: "640px",
      md: "940px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        stone: {
          charcoal:   "#2B2D2E",
          sandstone:  "#C4AD8F",
          amber:      "#D4922A",
          titanium:   "#F4F2ED",
          "sand-mid": "#B09A7A",
          "sand-lt":  "#DDD0BC",
          "sand-bg":  "#EDE5D8",
          "char-lt":  "#3D3F40",
          "char-xlt": "#555759",
          "amber-dk": "#B5771A",
          "amber-lt": "#E8B060",
        },
      },
      fontFamily: {
        serif:  ["'Cormorant Garamond'", "Georgia", "serif"],
        sans:   ["'DM Sans'", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
      },
      animation: {
        "fade-up":  "fadeUp 0.7s ease forwards",
        "fade-in":  "fadeIn 0.5s ease forwards",
        float:      "float 5s ease-in-out infinite",
        shimmer:    "shimmer 3s linear infinite",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
    
  },
  
  plugins: [],
};

export default config;
