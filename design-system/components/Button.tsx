"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Python Norte Design System - Button Component
 *
 * Componente de botão completo com todas as variantes e estados
 * Baseado no Figma: https://www.figma.com/design/p9auUTByXEeyEOGjOgVD7e/Python-Norte
 */

const buttonVariants = cva(
  [
    // Base styles
    "inline-flex items-center justify-center gap-2",
    "font-bold whitespace-nowrap",
    "transition-all duration-200",
    "outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    // Focus styles
    "focus-visible:ring-4 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        // Primary - Orange (CTA principal)
        primary: [
          "bg-primary hover:bg-primary-600 active:bg-primary-700",
          "text-white",
          "shadow-primary hover:shadow-primary-hover active:shadow-md",
          "focus-visible:ring-primary/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Secondary - Orange outline
        secondary: [
          "border-2 border-primary hover:border-primary-600",
          "text-primary hover:text-primary-600",
          "bg-transparent hover:bg-primary/10 active:bg-primary/20",
          "focus-visible:ring-primary/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Tertiary - Glass effect
        tertiary: [
          "bg-white/10 hover:bg-white/20 active:bg-white/15",
          "backdrop-blur-sm",
          "border-2 border-white/60 hover:border-white",
          "text-white",
          "shadow-lg hover:shadow-xl",
          "focus-visible:ring-white/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Accent - Yellow
        accent: [
          "bg-accent hover:bg-accent-600 active:bg-accent-700",
          "text-neutral-900",
          "shadow-accent hover:shadow-accent-hover active:shadow-md",
          "focus-visible:ring-accent/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Ghost - Minimal
        ghost: [
          "text-white hover:text-secondary",
          "hover:bg-white/5",
          "focus-visible:ring-white/30",
        ].join(" "),

        // Link - Text only
        link: [
          "text-secondary hover:text-secondary-600",
          "underline-offset-4 hover:underline",
          "focus-visible:ring-secondary/50",
        ].join(" "),

        // Destructive - Error state
        destructive: [
          "bg-error hover:bg-error/90 active:bg-error/80",
          "text-white",
          "shadow-lg hover:shadow-xl active:shadow-md",
          "focus-visible:ring-error/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Outline - Neutral
        outline: [
          "border-2 border-neutral-300 hover:border-neutral-400",
          "text-neutral-700 hover:text-neutral-900",
          "bg-transparent hover:bg-neutral-50",
          "focus-visible:ring-neutral-300",
        ].join(" "),
      },
      size: {
        sm: "text-sm px-4 py-2 rounded-md h-9",
        md: "text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-lg h-11",
        lg: "text-base md:text-lg px-6 md:px-10 py-3 md:py-4.5 rounded-xl h-14",
        // Tamanho específico do Figma para desktop - ajustado para ser mais visível
        figma:
          "text-lg font-bold px-10 py-5 h-[80px] min-w-[280px] rounded-[10px]",
        icon: "p-3 rounded-lg size-10",
        "icon-sm": "p-2 rounded-md size-8",
        "icon-lg": "p-4 rounded-xl size-12",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Se true, mostra um spinner de loading
   */
  loading?: boolean;
  /**
   * Ícone à esquerda do texto
   */
  leftIcon?: React.ReactNode;
  /**
   * Ícone à direita do texto
   */
  rightIcon?: React.ReactNode;
  /**
   * Usar como child de outro componente (ex: Link do Next.js)
   */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}

        {/* Left icon */}
        {!loading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text */}
        {children && <span>{children}</span>}

        {/* Right icon */}
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

/**
 * ButtonLink - Versão do botão para uso com links
 */
export interface ButtonLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <a
        className={cn(
          buttonVariants({ variant, size, fullWidth, className }),
          loading && "pointer-events-none opacity-50",
        )}
        ref={ref}
        {...props}
      >
        {loading && (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        )}

        {!loading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {children && <span>{children}</span>}

        {!loading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </a>
    );
  },
);

ButtonLink.displayName = "ButtonLink";

/**
 * ButtonGroup - Agrupa múltiplos botões
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "sm" | "md" | "lg";
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      className,
      orientation = "horizontal",
      spacing = "md",
      children,
      ...props
    },
    ref,
  ) => {
    const spacingClasses = {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === "horizontal" ? "flex-row" : "flex-col",
          spacingClasses[spacing],
          className,
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { Button, ButtonLink, ButtonGroup, buttonVariants };
