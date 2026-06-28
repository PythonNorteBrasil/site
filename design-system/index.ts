/**
 * Python Norte Design System
 *
 * Sistema de design completo com tokens, tema e componentes
 *
 * @example
 * ```tsx
 * import { Button, theme, colors } from '@/design-system';
 *
 * // Usar componente
 * <Button variant="primary" size="lg">Click me</Button>
 *
 * // Usar tokens
 * const primaryColor = colors.semantic.primary;
 *
 * // Usar tema
 * const buttonStyles = theme.components.button.primary;
 * ```
 */

// Tokens
export * from "./tokens";

// Theme
export { theme, pythonNorteTheme } from "./theme/theme";
export type { Theme, PythonNorteTheme } from "./theme/theme";

// Components
export * from "./components";
