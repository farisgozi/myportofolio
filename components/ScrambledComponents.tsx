'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrambledComponentsProps {
  className?: string
}

export default function ScrambledComponents({ className = '' }: ScrambledComponentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const componentsRef = useRef<HTMLDivElement[]>([])

  // Minimal tech components for transition only - no idle animations
  const components = [
    { icon: '⚛️', name: 'React', color: '#61DAFB' },
    { icon: '📱', name: 'Next.js', color: '#000000' },
    { icon: '🟦', name: 'TypeScript', color: '#3178C6' },
    { icon: '🎨', name: 'Tailwind', color: '#06B6D4' },
    { icon: '⚡', name: 'Node.js', color: '#68A063' },
    { icon: '🐍', name: 'Python', color: '#3776AB' }
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const componentElements = componentsRef.current.filter(Boolean)

    // Initial positions in circle formation
    componentElements.forEach((el, index) => {
      const angle = (index / componentElements.length) * Math.PI * 2
      const radius = 120 + Math.random() * 80
      
      gsap.set(el, {
        x: window.innerWidth/2 + Math.cos(angle) * radius - 40,
        y: window.innerHeight/2 + Math.sin(angle) * radius - 40,
        rotation: Math.random() * 360,
        scale: 0.7 + Math.random() * 0.3,
        opacity: 0.9
      })
    })

    // Whimsical-style transition: gather → zoom → blur → fade
    gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress
          
          componentElements.forEach((el) => {
            if (progress < 0.3) {
              // Phase 1: Gather to center
              const gatherProgress = progress / 0.3
              gsap.to(el, {
                x: window.innerWidth/2 - 40,
                y: window.innerHeight/2 - 40,
                rotation: 360 * gatherProgress,
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
              })
            } else if (progress < 0.7) {
              // Phase 2: Zoom in with slight blur
              const zoomProgress = (progress - 0.3) / 0.4
              gsap.to(el, {
                scale: 1 + zoomProgress * 2.5,
                filter: `blur(${zoomProgress * 6}px)`,
                opacity: 1 - zoomProgress * 0.4,
                duration: 0.2,
                ease: "none"
              })
            } else {
              // Phase 3: Heavy blur and fade out
              const fadeProgress = (progress - 0.7) / 0.3
              gsap.to(el, {
                opacity: 0.6 - fadeProgress * 0.6,
                scale: 3.5 + fadeProgress * 1.5,
                filter: `blur(${6 + fadeProgress * 15}px)`,
                duration: 0.2,
                ease: "power2.in"
              })
            }
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill()
      })
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`scrambled-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {components.map((comp, index) => (
        <div
          key={`${comp.name}-${index}`}
          ref={(el) => {
            if (el) componentsRef.current[index] = el
          }}
          className="tech-component"
          style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${comp.color}25, ${comp.color}15)`,
            border: `2px solid ${comp.color}50`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            boxShadow: `0 8px 24px ${comp.color}30`,
            fontSize: '20px',
            color: comp.color,
            fontWeight: '600'
          }}
        >
          <span style={{ fontSize: '24px', marginBottom: '4px' }}>
            {comp.icon}
          </span>
          <span style={{ fontSize: '9px', textAlign: 'center', opacity: 0.8 }}>
            {comp.name}
          </span>
        </div>
      ))}
    </div>
  )
}
