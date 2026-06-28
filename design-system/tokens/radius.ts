/**
 * Python Norte Design System - Border Radius Tokens
 *
 * Sistema de arredondamento de bordas
 */

export const radius = {
  none: "0px",
  sm: "0.375rem", // 6px
  DEFAULT: "0.5rem", // 8px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.25rem", // 20px
  "3xl": "1.5rem", // 24px
  full: "9999px", // Círculo/pílula
} as const;

// Radius semânticos para componentes
export const componentRadius = {
  button: {
    sm: radius.md,
    md: radius.lg,
    lg: radius.xl,
  },
  card: radius.xl,
  input: radius.lg,
  badge: radius.full,
  avatar: radius.full,
  modal: radius["2xl"],
  dropdown: radius.lg,
} as const;

export type RadiusToken = typeof radius;
export type ComponentRadiusToken = typeof componentRadius;
