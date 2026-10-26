"use client"

import { GSAPFloatingElement, FloatingShape, FloatingImage } from "./gsap-floating"
import { memo } from "react"

export const AdvancedBackgroundElements = memo(() => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating Shapes dengan berbagai animasi */}
      <FloatingShape 
        shape="circle" 
        size="lg" 
        color="blue" 
        animationType="gentle"
        className="absolute top-20 left-10"
      />
      
      <FloatingShape 
        shape="square" 
        size="md" 
        color="purple" 
        animationType="dynamic"
        className="absolute top-40 right-20"
      />
      
      <FloatingShape 
        shape="circle" 
        size="xl" 
        color="pink" 
        animationType="orbit"
        className="absolute bottom-32 left-1/4"
      />
      
      <FloatingShape 
        shape="triangle" 
        size="sm" 
        color="green" 
        animationType="gentle"
        className="absolute top-1/2 right-1/4"
      />
      
      <FloatingShape 
        shape="star" 
        size="md" 
        color="orange" 
        animationType="dynamic"
        className="absolute bottom-20 right-10"
      />

      {/* Floating Technology Icons */}
      <FloatingImage
        src="/images/profile-photo.png"
        alt="Profile"
        size="sm"
        animationType="gentle"
        className="absolute top-60 left-1/3"
      />

      {/* Custom floating elements dengan GSAP */}
      <GSAPFloatingElement 
        animationType="complex"
        className="absolute top-1/3 left-20"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center">
          <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse" />
        </div>
      </GSAPFloatingElement>

      <GSAPFloatingElement 
        animationType="orbit"
        className="absolute bottom-1/3 right-1/3"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400/30 to-pink-600/30 rounded-lg backdrop-blur-md border border-white/20 rotate-45">
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-lg" />
        </div>
      </GSAPFloatingElement>

      {/* Floating particles */}
      {Array.from({ length: 6 }, (_, i) => (
        <FloatingShape
          key={i}
          shape="circle"
          size="sm"
          color={["blue", "purple", "pink", "green", "orange"][i % 5] as any}
          animationType={["gentle", "dynamic"][i % 2] as any}
          className={`absolute ${getRandomPosition()}`}
        />
      ))}
    </div>
  )
})

AdvancedBackgroundElements.displayName = "AdvancedBackgroundElements"

// Helper function untuk posisi random
function getRandomPosition() {
  const positions = [
    "top-1/4 left-1/6",
    "top-3/4 left-1/6", 
    "top-1/6 right-1/4",
    "top-2/3 right-1/6",
    "top-1/2 left-3/4",
    "bottom-1/4 left-1/2"
  ]
  return positions[Math.floor(Math.random() * positions.length)]
}
