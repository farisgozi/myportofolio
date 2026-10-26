"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export function AnimatedButton({ 
  children, 
  className, 
  onClick, 
  variant = "primary",
  size = "md" 
}: AnimatedButtonProps) {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    ghost: "text-white hover:bg-white/10"
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative rounded-full font-medium transition-all duration-300",
        "shadow-lg hover:shadow-xl overflow-hidden group",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}
