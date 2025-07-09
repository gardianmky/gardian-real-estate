"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 rounded-2xl",
        gradient: "teal-gradient-button shadow-md hover:shadow-lg transform hover:-translate-y-0.5 rounded-2xl text-white font-semibold",
        secondary: "bg-white text-teal-600 border-2 border-teal-600 hover:bg-teal-50 focus-visible:ring-teal-100 rounded-2xl",
        ghost: "text-gray-600 hover:text-teal-600 hover:bg-gray-50 focus-visible:ring-gray-300 rounded-xl",
        outline: "border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-gray-300 rounded-2xl",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-md hover:shadow-lg rounded-2xl",
        link: "underline-offset-4 hover:underline text-teal-600 hover:text-teal-700 p-0 h-auto",
        disabled: "bg-gray-200 text-gray-500 cursor-not-allowed rounded-2xl",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-5 py-2.5 text-sm",
        lg: "h-12 px-6 py-3 text-base",
        xl: "h-14 px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
