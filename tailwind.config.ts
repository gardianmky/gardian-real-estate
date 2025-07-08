import type { Config } from "tailwindcss"
const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#f0f6f7",
          100: "#d8e9ec",
          200: "#b4d3d9",
          300: "#83b5bf",
          400: "#4d919e",
          500: "#0c6473", // Gardian teal color as requested
          600: "#0a5460",
          700: "#0a4550",
          800: "#0a3842",
          900: "#092f38",
          950: "#051a20",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#fff7e6",
          100: "#ffefcc",
          200: "#ffdf99",
          300: "#ffcf66",
          400: "#ffbf33",
          500: "#f58220", // Gardian orange color
          600: "#cc8c00",
          700: "#996900",
          800: "#664600",
          900: "#332300",
          950: "#1a1200",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        gradientFlow: "gradientFlow 15s ease infinite",
        orbFloat: "orbFloat 20s infinite ease-in-out alternate",
        orbFloatAlt: "orbFloat 15s infinite ease-in-out alternate-reverse",
        textScrollSlow: "textScrollSlow 120s linear infinite",
        textScrollReverseSlow: "textScrollReverseSlow 150s linear infinite",
        // New enhanced microanimations
        fadeInUp: "fadeInUp 0.7s ease-out forwards",
        slideInUp: "slideInUp 0.6s ease-out forwards",
        floatGentle: "floatGentle 4s ease-in-out infinite",
        bounceClick: "bounceClick 0.2s ease-out",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        shimmerSlow: "shimmerSlow 3s ease-in-out infinite",
        iconFloat: "iconFloat 3s ease-in-out infinite",
        cardHover: "cardHover 0.3s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(50px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        bounceClick: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(12, 100, 115, 0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(12, 100, 115, 0.2), 0 0 40px rgba(12, 100, 115, 0.1)" },
        },
        shimmerSlow: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        iconFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateY(-3px) rotate(1deg)" },
          "75%": { transform: "translateY(-3px) rotate(-1deg)" },
        },
        cardHover: {
          "0%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(-8px) scale(1.02)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
