"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={cn(
        "relative backdrop-blur-md bg-white/10 border border-white/20",
        "rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300",
        "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
        "before:bg-gradient-to-br before:from-white/30 before:to-transparent",
        "before:mask-composite-subtract before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        className
      )}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  )
}
