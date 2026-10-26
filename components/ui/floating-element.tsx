"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  distance?: number
}

export function FloatingElement({ 
  children, 
  className, 
  direction = "up", 
  duration = 3,
  distance = 10 
}: FloatingElementProps) {
  const directionMap = {
    up: { y: [-distance, distance] },
    down: { y: [distance, -distance] },
    left: { x: [-distance, distance] },
    right: { x: [distance, -distance] }
  }

  return (
    <motion.div
      animate={directionMap[direction]}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  )
}
