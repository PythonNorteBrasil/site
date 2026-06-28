/**
 * Python Norte Design System - Theme Configuration
 *
 * Configuração centralizada do tema com todos os tokens
 * Permite fácil customização e troca de temas
 */

import {
  colors,
  typography,
  textStyles,
  spacing,
  componentSpacing,
  radius,
  componentRadius,
  shadows,
  coloredShadows,
  textShadows,
  componentShadows,
  breakpoints,
  mediaQueries,
} from "../tokens";

export const theme = {
  colors,
  typography,
  textStyles,
  spacing,
  componentSpacing,
  radius,
  componentRadius,
  shadows,
  coloredShadows,
  textShadows,
  componentShadows,
  breakpoints,
  mediaQueries,
} as const;

// Tema específico para Python Norte
export const pythonNorteTheme = {
  ...theme,

  // Configurações específicas do Python Norte
  brand: {
    name: "Python Norte",
    primaryColor: colors.brand.orange[500],
    secondaryColor: colors.brand.green[500],
    accentColor: colors.brand.yellow[500],
  },

  // Componentes com estilos específicos
  components: {
    button: {
      primary: {
        bg: colors.brand.orange[500],
        bgHover: colors.brand.orange[600],
        bgActive: colors.brand.orange[700],
        text: colors.text.inverse,
        shadow: coloredShadows.primary,
        shadowHover: coloredShadows.primaryHover,
      },
      secondary: {
        bg: "transparent",
        bgHover: `${colors.brand.green[500]}1A`, // 10% opacity
        bgActive: `${colors.brand.green[500]}33`, // 20% opacity
        border: colors.brand.green[500],
        borderHover: colors.brand.green[600],
        text: colors.brand.green[500],
        textHover: colors.brand.green[600],
      },
      tertiary: {
        bg: "rgba(255, 255, 255, 0.1)",
        bgHover: "rgba(255, 255, 255, 0.2)",
        bgActive: "rgba(255, 255, 255, 0.15)",
        border: "rgba(255, 255, 255, 0.6)",
        borderHover: "rgba(255, 255, 255, 1)",
        text: colors.text.inverse,
        backdropBlur: "blur(8px)",
      },
      accent: {
        bg: colors.brand.yellow[500],
        bgHover: colors.brand.yellow[600],
        bgActive: colors.brand.yellow[700],
        text: colors.neutral[900],
        shadow: coloredShadows.accent,
        shadowHover: coloredShadows.accentHover,
      },
    },

    hero: {
      backgroundOverlay:
        "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.65))",
      textShadow: textShadows.lg,
    },

    card: {
      background: "rgba(0, 0, 0, 0.6)",
      backdropBlur: "blur(12px)",
      border: `2px solid ${colors.brand.yellow[500]}99`, // 60% opacity
      borderHover: `2px solid ${colors.brand.yellow[500]}CC`, // 80% opacity
      shadow: shadows.xl,
      shadowHover: shadows["2xl"],
    },
  },
} as const;

// Tipo do tema para TypeScript
export type Theme = typeof theme;
export type PythonNorteTheme = typeof pythonNorteTheme;

// Export default para uso fácil
export default pythonNorteTheme;
