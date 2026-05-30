/**
 * Python Norte Design System - Typography Tokens
 *
 * Sistema de tipografia com escalas, pesos e estilos
 */

export const typography = {
  // Famílias de fonte
  fontFamily: {
    display: '"Oferta do Dia", system-ui, sans-serif',
    sans: "var(--font-inter), system-ui, -apple-system, sans-serif",
    mono: '"Geist Mono", monospace',
  },

  // Tamanhos de fonte (escala modular)
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
    "5xl": ["3rem", { lineHeight: "1" }], // 48px
    "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
    "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
    "8xl": ["6rem", { lineHeight: "1" }], // 96px
    "9xl": ["8rem", { lineHeight: "1" }], // 128px
  },

  // Pesos de fonte
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  // Altura de linha
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },

  // Espaçamento entre letras
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// Estilos de texto pré-definidos
export const textStyles = {
  // Títulos
  h1: {
    fontSize: typography.fontSize["6xl"],
    fontWeight: typography.fontWeight.black,
    fontFamily: typography.fontFamily.display,
    letterSpacing: typography.letterSpacing.tight,
  },
  h2: {
    fontSize: typography.fontSize["5xl"],
    fontWeight: typography.fontWeight.black,
    fontFamily: typography.fontFamily.display,
    letterSpacing: typography.letterSpacing.tight,
  },
  h3: {
    fontSize: typography.fontSize["4xl"],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.display,
  },
  h4: {
    fontSize: typography.fontSize["3xl"],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.sans,
  },
  h5: {
    fontSize: typography.fontSize["2xl"],
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
  },
  h6: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.sans,
  },

  // Corpo de texto
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
  },
  bodyLarge: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.relaxed,
  },
  bodySmall: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },

  // Utilitários
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.tight,
  },
  overline: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.widest,
    textTransform: "uppercase" as const,
  },
  button: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.wide,
  },
  code: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
  },
} as const;

export type TypographyToken = typeof typography;
export type TextStyle = keyof typeof textStyles;

// Made with Bob
