"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Python Norte Button Variants
 * Reusable button components with consistent branding
 */
const pythonNorteButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-4 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary CTA - Orange/Red (main action button)
        primary: [
          "bg-[#D94A1A] hover:bg-[#C43F15] active:bg-[#B33810]",
          "text-white",
          "shadow-lg hover:shadow-xl active:shadow-md",
          "focus-visible:ring-[#D94A1A]/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Secondary CTA - Green outline (secondary action)
        secondary: [
          "border-2 border-[#00D65F] hover:border-[#00FF6F]",
          "text-[#00D65F] hover:text-[#00FF6F]",
          "bg-transparent hover:bg-[#00D65F]/10 active:bg-[#00D65F]/20",
          "focus-visible:ring-[#00D65F]/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Tertiary - Glass effect (subtle action)
        tertiary: [
          "bg-white/10 hover:bg-white/20 active:bg-white/15",
          "backdrop-blur-sm",
          "border-2 border-white/60 hover:border-white",
          "text-white",
          "shadow-lg hover:shadow-xl",
          "focus-visible:ring-white/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Yellow accent - for special highlights
        accent: [
          "bg-[#FFB800] hover:bg-[#FFC933] active:bg-[#E5A600]",
          "text-black",
          "shadow-lg hover:shadow-xl active:shadow-md",
          "focus-visible:ring-[#FFB800]/50",
          "transform hover:scale-[1.02] active:scale-[0.98]",
        ].join(" "),

        // Ghost - minimal style
        ghost: [
          "text-white hover:text-[#00D65F]",
          "hover:bg-white/5",
          "focus-visible:ring-white/30",
        ].join(" "),

        // Link style
        link: [
          "text-[#00D65F] hover:text-[#00FF6F]",
          "underline-offset-4 hover:underline",
          "focus-visible:ring-[#00D65F]/50",
        ].join(" "),
      },
      size: {
        sm: "text-sm px-4 py-2 rounded-md",
        default: "text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-lg",
        lg: "text-base md:text-lg px-8 md:px-10 py-4 md:py-4.5 rounded-xl",
        icon: "p-3 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface PythonNorteButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pythonNorteButtonVariants> {
  asChild?: boolean;
}

const PythonNorteButton = React.forwardRef<
  HTMLButtonElement,
  PythonNorteButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(pythonNorteButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
PythonNorteButton.displayName = "PythonNorteButton";

/**
 * Link variant that works with Next.js Link or anchor tags
 */
export interface PythonNorteLinkButtonProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof pythonNorteButtonVariants> {}

const PythonNorteLinkButton = React.forwardRef<
  HTMLAnchorElement,
  PythonNorteLinkButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <a
      className={cn(pythonNorteButtonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
PythonNorteLinkButton.displayName = "PythonNorteLinkButton";

export { PythonNorteButton, PythonNorteLinkButton, pythonNorteButtonVariants };

// Made with Bob
