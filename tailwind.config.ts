import type { Config } from "tailwindcss";

/**
 * Design System GCStudio.
 * Paleta derivada de gc-studio-identidad-visual.md:
 * base charcoal/negro, dorado champagne, blush y bordó/vino.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1C1815", // Espresso profundo cálido en lugar de negro plano frío
          900: "#14110F",
          800: "#221C18",
          700: "#2F2722",
          600: "#443932",
        },
        gold: {
          DEFAULT: "#C9A45C",
          light: "#EAD7B0",
          champagne: "#F4EBD9",
          dark: "#8A6C2F",
          rich: "#A37A2F",
        },
        blush: {
          DEFAULT: "#E9B8C4",
          soft: "#F8E7EC",
          deep: "#D99AA9",
          tint: "#FCF3F5",
        },
        wine: {
          DEFAULT: "#8A2F4A",
          dark: "#5E1F33",
          velvet: "#74223A",
          tint: "#FAF0F2",
        },
        cream: {
          DEFAULT: "#FAF6F0",
          50: "#FCFAF7",
          100: "#F7F2EC",
          200: "#F0E7DC",
          300: "#E5D9C8",
        },
        silver: "#C9C9CE",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "serif"],
        script: ["var(--font-script)", "Parisienne", "cursive"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "1440px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "rail-scroll": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.52s ease-out both",
        rail: "rail-scroll 44s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
