/**
 * Python Norte - Tailwind CSS Configuration
 *
 * Configuração integrada com o Design System
 * Usa os tokens de design para garantir consistência
 */

import type { Config } from "tailwindcss";
import { colors } from "./design-system/tokens/colors";
import { typography } from "./design-system/tokens/typography";
import { spacing } from "./design-system/tokens/spacing";
import { radius } from "./design-system/tokens/radius";
import { shadows } from "./design-system/tokens/shadows";
import { breakpoints } from "./design-system/tokens/breakpoints";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Sobrescrever breakpoints com os do Design System
    screens: breakpoints,

    extend: {
      // Cores do Design System
      colors: {
        // Cores da marca
        "brand-yellow": colors.brand.yellow,
        "brand-orange": colors.brand.orange,
        "brand-green": colors.brand.green,

        // Cores semânticas
        primary: {
          DEFAULT: colors.semantic.primary,
          50: colors.brand.orange[50],
          100: colors.brand.orange[100],
          200: colors.brand.orange[200],
          500: colors.brand.orange[500],
          600: colors.brand.orange[600],
          700: colors.brand.orange[700],
          800: colors.brand.orange[800],
          900: colors.brand.orange[900],
          950: colors.brand.orange[950],
        },
        secondary: {
          DEFAULT: colors.semantic.secondary,
          50: colors.brand.green[50],
          100: colors.brand.green[100],
          200: colors.brand.green[200],
          500: colors.brand.green[500],
          600: colors.brand.green[600],
          700: colors.brand.green[700],
          800: colors.brand.green[800],
          900: colors.brand.green[900],
          950: colors.brand.green[950],
        },
        accent: {
          DEFAULT: colors.semantic.accent,
          50: colors.brand.yellow[50],
          100: colors.brand.yellow[100],
          200: colors.brand.yellow[200],
          500: colors.brand.yellow[500],
          600: colors.brand.yellow[600],
          700: colors.brand.yellow[700],
          800: colors.brand.yellow[800],
          900: colors.brand.yellow[900],
          950: colors.brand.yellow[950],
        },

        // Cores neutras
        neutral: colors.neutral,

        // Cores de fundo
        background: colors.background.primary,
        foreground: colors.text.primary,

        // Cores de superfície
        card: {
          DEFAULT: colors.surface.default,
          foreground: colors.text.primary,
        },
        popover: {
          DEFAULT: colors.surface.light,
          foreground: colors.text.primary,
        },

        // Cores de estado
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        error: colors.semantic.error,
        destructive: {
          DEFAULT: colors.semantic.error,
          foreground: colors.text.inverse,
        },

        // Cores de borda e input
        border: colors.border.default,
        input: colors.border.light,
        ring: colors.border.focus,

        // Muted
        muted: {
          DEFAULT: colors.neutral[100],
          foreground: colors.text.secondary,
        },
      },

      // Tipografia
      fontFamily: {
        display: typography.fontFamily.display.split(","),
        sans: typography.fontFamily.sans.split(","),
        mono: typography.fontFamily.mono.split(","),
      },
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,

      // Espaçamento
      spacing: spacing,

      // Border Radius
      borderRadius: {
        ...radius,
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Sombras
      boxShadow: {
        ...shadows,
        primary: "0 10px 24px rgba(217, 74, 26, 0.35)",
        "primary-hover": "0 14px 32px rgba(217, 74, 26, 0.45)",
        secondary: "0 10px 24px rgba(0, 214, 95, 0.35)",
        "secondary-hover": "0 14px 32px rgba(0, 214, 95, 0.45)",
        accent: "0 10px 24px rgba(255, 176, 0, 0.35)",
        "accent-hover": "0 14px 32px rgba(255, 176, 0, 0.45)",
      },

      // Animações
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
      },

      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

// Made with Bob
