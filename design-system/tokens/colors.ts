/**
 * Python Norte Design System - Color Tokens
 *
 * Baseado no Figma: https://www.figma.com/design/p9auUTByXEeyEOGjOgVD7e/Python-Norte
 *
 * Sistema de cores com variações de estado (light, normal, dark)
 * para cada cor principal da identidade visual.
 */

export const colors = {
  // Cores principais da marca Python Norte
  brand: {
    yellow: {
      50: "#FFFEF7", // Light
      100: "#FEF5E9", // Light Hover
      200: "#FDE7C2", // Light Active
      500: "#FFB000", // Normal (Base)
      600: "#F79E00", // Normal Hover
      700: "#E37700", // Normal Active
      800: "#C44A00", // Dark
      900: "#9E3200", // Dark Hover
      950: "#5B1E00", // Darker
    },
    orange: {
      50: "#FFF8F0", // Light
      100: "#FFF0E5", // Light Hover
      200: "#FFE0C8", // Light Active
      500: "#F35E0C", // Normal (Base) - CTA Principal
      600: "#E05509", // Normal Hover
      700: "#C94B08", // Normal Active
      800: "#A33D06", // Dark
      900: "#7D2F05", // Dark Hover
      950: "#4A1C03", // Darker
    },
    green: {
      50: "#F0FEF4", // Light
      100: "#E1FDE9", // Light Hover
      200: "#C1F9D1", // Light Active
      500: "#00D65F", // Normal (Base) - Destaque
      600: "#00C555", // Normal Hover
      700: "#1F5506", // Normal Active - Menu/Navigation
      800: "#1A4805", // Dark
      900: "#143A04", // Dark Hover
      950: "#0C2202", // Darker
    },
  },

  // Cores semânticas
  semantic: {
    primary: "#F35E0C", // Orange 500 - Ação principal
    secondary: "#00D65F", // Green 500 - Ação secundária
    accent: "#FFB000", // Yellow 500 - Destaque
    success: "#00D65F", // Green 500
    warning: "#FFB000", // Yellow 500
    error: "#F35E0C", // Orange 500
    info: "#00D65F", // Green 500
    navigation: "#1F5506", // Green 700 - Menu/Navigation
  },

  // Cores neutras
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0A0A0A",
    1000: "#000000",
  },

  // Cores de fundo
  background: {
    primary: "#FFFFFF",
    secondary: "#FAFAFA",
    tertiary: "#F5F5F5",
    header: "#FBF3DEF2", // Header background
    dark: "#0A0A0A",
    overlay: "rgba(0, 0, 0, 0.6)",
  },

  // Cores de superfície (cards, modais, etc)
  surface: {
    light: "#FFFFFF",
    default: "#FAFAFA",
    dark: "rgba(0, 0, 0, 0.6)",
    glass: "rgba(255, 255, 255, 0.1)",
  },

  // Cores de texto
  text: {
    primary: "#171717",
    secondary: "#525252",
    tertiary: "#A3A3A3",
    inverse: "#FFFFFF",
    disabled: "#D4D4D4",
  },

  // Cores de borda
  border: {
    light: "#E5E5E5",
    default: "#D4D4D4",
    dark: "#A3A3A3",
    focus: "#00D65F",
  },
} as const;

// Tipos TypeScript para autocompletar
export type ColorToken = typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type SemanticColor = keyof typeof colors.semantic;
export type NeutralColor = keyof typeof colors.neutral;

// Made with Bob
