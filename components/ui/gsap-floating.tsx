"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"

interface GSAPFloatingElementProps {
  children: React.ReactNode
  className?: string
  animationType?: "gentle" | "dynamic" | "complex" | "orbit"
  duration?: number
}

export function GSAPFloatingElement({ 
  children, 
  className = "",
  animationType = "gentle",
  duration = 20 
}: GSAPFloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    let tl: gsap.core.Timeline

    switch (animationType) {
      case "gentle":
        // Simple gentle floating like your can example but smoother
        tl = gsap.timeline({ repeat: -1 })
        tl.to(element, { 
          y: -30, 
          x: 20, 
          rotation: -5, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: 30, 
          x: -20, 
          rotation: -10, 
          duration: 2, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: -20, 
          rotation: 5, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: 20, 
          rotation: 10, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: -50, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: 50, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: -30, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        .to(element, { 
          y: 0, 
          x: 0, 
          rotation: 0, 
          duration: 3, 
          ease: "power1.inOut" 
        })
        break

      case "dynamic":
        // More dynamic movement with scaling
        tl = gsap.timeline({ repeat: -1 })
        tl.to(element, { 
          y: -40, 
          x: 30, 
          rotation: 15, 
          scale: 1.1,
          duration: 2, 
          ease: "power2.inOut" 
        })
        .to(element, { 
          y: 40, 
          x: -30, 
          rotation: -15, 
          scale: 0.9,
          duration: 2, 
          ease: "power2.inOut" 
        })
        .to(element, { 
          y: -20, 
          x: 20, 
          rotation: 10, 
          scale: 1.05,
          duration: 1.5, 
          ease: "elastic.inOut(1, 0.3)" 
        })
        .to(element, { 
          y: 20, 
          x: -20, 
          rotation: -10, 
          scale: 0.95,
          duration: 1.5, 
          ease: "elastic.inOut(1, 0.3)" 
        })
        .to(element, { 
          y: 0, 
          x: 0, 
          rotation: 0, 
          scale: 1,
          duration: 2, 
          ease: "back.inOut(1.7)" 
        })
        break

      case "complex":
        // Complex multi-directional movement
        tl = gsap.timeline({ repeat: -1 })
        tl.to(element, { 
          motionPath: {
            path: "M0,0 Q50,-50 100,0 T200,0",
            autoRotate: true,
          },
          duration: 4,
          ease: "none"
        })
        .to(element, { 
          motionPath: {
            path: "M200,0 Q150,50 100,0 T0,0",
            autoRotate: true,
          },
          duration: 4,
          ease: "none"
        })
        break

      case "orbit":
        // Orbital movement
        tl = gsap.timeline({ repeat: -1 })
        tl.to(element, {
          rotation: 360,
          transformOrigin: "150px 0px",
          duration: duration,
          ease: "none"
        })
        break
    }

    return () => {
      if (tl) tl.kill()
    }
  }, [animationType, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Komponen khusus untuk floating objects dengan bentuk berbeda
export function FloatingShape({ 
  shape = "circle", 
  size = "md", 
  color = "blue", 
  animationType = "gentle",
  className = "" 
}: {
  shape?: "circle" | "square" | "triangle" | "star"
  size?: "sm" | "md" | "lg" | "xl"
  color?: "blue" | "purple" | "pink" | "green" | "orange"
  animationType?: "gentle" | "dynamic" | "complex" | "orbit"
  className?: string
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  }

  const colors = {
    blue: "bg-blue-500/20",
    purple: "bg-purple-500/20",
    pink: "bg-pink-500/20", 
    green: "bg-green-500/20",
    orange: "bg-orange-500/20"
  }

  const shapes = {
    circle: "rounded-full",
    square: "rounded-lg",
    triangle: "rounded-none",
    star: "rounded-sm"
  }

  return (
    <GSAPFloatingElement animationType={animationType} className={className}>
      <div className={`
        ${sizes[size]} 
        ${colors[color]} 
        ${shapes[shape]}
        backdrop-blur-md border border-white/10
        shadow-lg
      `} />
    </GSAPFloatingElement>
  )
}

// Komponen untuk floating images/icons
export function FloatingImage({ 
  src, 
  alt, 
  size = "md", 
  animationType = "gentle",
  className = "" 
}: {
  src: string
  alt: string
  size?: "sm" | "md" | "lg" | "xl"
  animationType?: "gentle" | "dynamic" | "complex" | "orbit"
  className?: string
}) {
  const sizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32", 
    xl: "w-40 h-40"
  }

  return (
    <GSAPFloatingElement animationType={animationType} className={className}>
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`
          ${sizes[size]} 
          rounded-xl overflow-hidden
          shadow-xl backdrop-blur-md bg-white/10 
          border border-white/20 p-2
        `}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>
    </GSAPFloatingElement>
  )
}
