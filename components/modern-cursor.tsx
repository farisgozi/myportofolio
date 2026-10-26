"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ModernCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
      setIsVisible(true)
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    document.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseover", mouseOver)
    document.addEventListener("mouseenter", mouseEnter)
    document.addEventListener("mouseleave", mouseLeave)

    return () => {
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseover", mouseOver)
      document.removeEventListener("mouseenter", mouseEnter)
      document.removeEventListener("mouseleave", mouseLeave)
    }
  }, [])

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null // Don't show cursor on mobile
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 bg-white rounded-full" />
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          opacity: isVisible ? 0.3 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1
        }}
      >
        <div className="w-10 h-10 border-2 border-white/50 rounded-full" />
      </motion.div>
    </>
  )
}
