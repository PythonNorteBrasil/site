/**
 * Python Norte Design System - Shadow Tokens
 *
 * Sistema de sombras para profundidade e hierarquia visual
 */

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// Sombras coloridas para destaque
export const coloredShadows = {
  primary: "0 10px 24px rgba(217, 74, 26, 0.35)",
  primaryHover: "0 14px 32px rgba(217, 74, 26, 0.45)",
  secondary: "0 10px 24px rgba(0, 214, 95, 0.35)",
  secondaryHover: "0 14px 32px rgba(0, 214, 95, 0.45)",
  accent: "0 10px 24px rgba(255, 176, 0, 0.35)",
  accentHover: "0 14px 32px rgba(255, 176, 0, 0.45)",
} as const;

// Sombras de texto
export const textShadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.5)",
  DEFAULT: "0 2px 4px rgba(0, 0, 0, 0.6)",
  md: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)",
  lg: "0 2px 12px rgba(0, 0, 0, 0.9), 0 4px 24px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 0, 0, 0.5)",
  outline: "0 0 1px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.8)",
} as const;

// Sombras para componentes específicos
export const componentShadows = {
  button: {
    default: shadows.lg,
    hover: shadows.xl,
    active: shadows.md,
  },
  card: {
    default: shadows.md,
    hover: shadows.lg,
  },
  dropdown: shadows.xl,
  modal: shadows["2xl"],
  tooltip: shadows.lg,
} as const;

export type ShadowToken = typeof shadows;
export type ColoredShadowToken = typeof coloredShadows;
export type TextShadowToken = typeof textShadows;
export type ComponentShadowToken = typeof componentShadows;

// Made with Bob
