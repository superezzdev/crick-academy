import type { Config } from "tailwindcss";
import * as path from "path";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(path.dirname(require.resolve("@crick-academy/ui/package.json")), "src/**/*.{js,ts,jsx,tsx}")
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        // Cricket Academy Custom Design Tokens (mapped to CSS variables)
        "pitch-green": {
          DEFAULT: "var(--pitch-green)",
          50: "#eaf5f0",
          100: "#cce8dc",
          200: "#9fd3bd",
          300: "#6cb99a",
          400: "#419e79",
          500: "#22825f",
          600: "#13674a",
          700: "#0b4d37",
          800: "#0B3D2E", // #0B3D2E
          900: "#07291f",
          950: "#031510"
        },
        chalk: {
          DEFAULT: "var(--chalk)",
          50: "#fdfcfb",
          100: "#faf8f4",
          200: "#F5F1E6", // #F5F1E6
          300: "#ebe4d0",
          400: "#ded2b3",
          500: "#cdbd94",
          600: "#b5a377",
          700: "#91815d",
          800: "#75694d",
          900: "#605641"
        },
        "leather-red": {
          DEFAULT: "var(--leather-red)",
          50: "#fdf2f2",
          100: "#fbe2e4",
          200: "#f7cacd",
          300: "#f0a4aa",
          400: "#e5727b",
          500: "#d64652",
          600: "#C1121F", // #C1121F
          700: "#a31d27",
          800: "#881c25",
          900: "#721c23",
          950: "#3f0a0e"
        },
        ink: {
          DEFAULT: "var(--ink)",
          50: "#f6f6f6",
          100: "#e7e7e7",
          200: "#d1d1d1",
          300: "#b0b0b0",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#4f4f4f",
          800: "#454545",
          900: "#3d3d3d",
          950: "#1A1A1A" // #1A1A1A
        },
        "stump-gold": {
          DEFAULT: "var(--stump-gold)",
          50: "#fdfbf3",
          100: "#faf4e2",
          200: "#f4e6bf",
          300: "#eed596",
          400: "#E8C468", // #E8C468
          500: "#d4a946",
          600: "#b88a31",
          700: "#936728",
          800: "#795226",
          900: "#654324"
        },

        // shadcn standard semantic mapping
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-oswald)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      }
    }
  },
  plugins: []
};

export default config;
