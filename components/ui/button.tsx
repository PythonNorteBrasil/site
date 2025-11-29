"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: [
          "relative overflow-hidden rounded-full border-none shadow-md",
          "bg-gradient-to-br from-primary to-secondary text-primary-foreground",
          "hover:shadow-lg hover:brightness-105 active:translate-y-[1px]",
          "btn-tribal",
        ].join(" "),

        // 🌿 novo botão simples com as cores do Norte
        norte: [
          "relative overflow-hidden rounded-full",
          "bg-[linear-gradient(135deg,#c86d71,#9a3e4c)]", // vermelho/terra do card
          "text-[rgba(250,245,237,0.96)]",                // quase o bege do fundo
          "border border-[rgba(137,61,72,0.55)]",
          "shadow-[0_14px_32px_rgba(137,61,72,0.45)]",
          "hover:shadow-[0_10px_24px_rgba(137,61,72,0.55)] hover:brightness-105",
          "active:translate-y-[1px] active:shadow-[0_6px_16px_rgba(137,61,72,0.65)]",
          "bg-[length:200%_200%] hover:bg-[position:100%_0] transition-[background-position,box-shadow,transform]",
        ].join(" "),

        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-5",
        sm: "h-8 rounded-full gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 rounded-full px-8 has-[>svg]:px-6",
        icon: "size-9 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
