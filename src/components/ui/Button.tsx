import * as React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cta"
  size?: "sm" | "md" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-brand text-white border-transparent hover:bg-brand/90 shadow-sm",
      secondary: "bg-slate-100 text-slate-900 border-transparent hover:bg-slate-200",
      outline: "bg-transparent text-slate-600 border-slate-200 hover:border-brand hover:text-brand",
      ghost: "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900 border-transparent",
      cta: "bg-cta text-white border-transparent hover:opacity-90 shadow-md",
    }

    const sizes = {
      sm: "px-4 py-3 text-[11px] min-h-[44px]",
      md: "px-6 py-3 text-sm min-h-[44px]",
      lg: "px-8 py-4 text-base min-h-[52px]",
      icon: "p-3 min-w-[44px] min-h-[44px]",
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ translateY: -1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-sm border transition-all focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
