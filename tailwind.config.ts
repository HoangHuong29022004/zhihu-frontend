import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F472B6", // Softer, lighter pink for a modern comic website
          light: "#FBCFE8", // Very light pink for hover states
          dark: "#ff7bb2", // Slightly deeper pink for active states
          active: "#FDF2F8", // Extremely light pink for backgrounds
        },
        accent: {
          DEFAULT: "#f1f5f9", // Modern lavender purple
          foreground: "#333333", // Darker purple that contrasts with the default lavender
        },
        success: {
          DEFAULT: "#10B981", // Modern green for success
          light: "#D1FAE5", // Lighter green for success highlights
          dark: "#059669", // Darker green for success emphasis
        },
        error: {
          DEFAULT: "#EF4444", // Vivid red for errors
          light: "#FCA5A5", // Lighter red for error highlights
          dark: "#B91C1C", // Darker red for error emphasis
        },
        warning: {
          DEFAULT: "#F59E0B", // Vivid yellow for warnings
          light: "#FDE68A", // Lighter yellow for warning highlights
          dark: "#B45309", // Darker yellow for warning emphasis
        },
        text: {
          main: "#1F2937", // Dark gray for primary text
          secondary: "#6B7280", // Lighter gray for secondary text
          light: "#F3F4F6", // Light gray for text on dark backgrounds
          dark: "#111827", // Near-black for text on light backgrounds
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "#8B5CF6", // Vibrant purple for secondary elements
          foreground: "#2D1B4E", // Dark purple for secondary text
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "#F9A8D4", // Lighter pink shade for charts
          "2": "#FBBF24", // Yellow for contrast in charts
          "3": "#34D399", // Teal for variety
          "4": "#60A5FA", // Blue for balance
          "5": "#A78BFA", // Purple for vibrancy
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
