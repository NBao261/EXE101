import * as React from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { cn } from "../../lib/utils"

interface CardProps extends HTMLMotionProps<"div"> {
  withGlow?: boolean
  glass?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, withGlow, glass, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm",
          glass && "bg-white/80 backdrop-blur-md",
          withGlow && "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
          className
        )}
        {...props}
      >
        <div className="relative z-10 h-full">{children as React.ReactNode}</div>
      </motion.div>
    )
  }
)
Card.displayName = "Card"
