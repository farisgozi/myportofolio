"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"

// Register ScrollTrigger plugin - ScrollTrigger sudah included dalam GSAP
if (typeof window !== "undefined") {
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger)
  })
}

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animationType?: "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate" | "wave"
  triggerOnce?: boolean
}

export function AnimatedSection({ 
  children, 
  className = "",
  animationType = "slideUp",
  triggerOnce = true 
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const element = sectionRef.current
    let ctx: gsap.Context

    ctx = gsap.context(() => {
      switch (animationType) {
        case "slideUp":
          gsap.fromTo(element, 
            { y: 100, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse"
              }
            }
          )
          break

        case "slideLeft":
          gsap.fromTo(element,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse"
              }
            }
          )
          break

        case "slideRight":
          gsap.fromTo(element,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse"
              }
            }
          )
          break

        case "scale":
          gsap.fromTo(element,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse"
              }
            }
          )
          break

        case "rotate":
          gsap.fromTo(element,
            { rotation: -45, opacity: 0, scale: 0.8 },
            {
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse"
              }
            }
          )
          break

        case "wave":
          // Wave animation untuk children elements
          const children = element.children
          gsap.fromTo(children,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse"
              }
            }
          )
          break
      }
    })

    return () => ctx.revert()
  }, [animationType, triggerOnce])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

// Komponen untuk text animation yang advanced
export function AnimatedText({ 
  text, 
  className = "",
  animationType = "typewriter" 
}: {
  text: string
  className?: string
  animationType?: "typewriter" | "wave" | "glow"
}) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    let ctx: gsap.Context

    ctx = gsap.context(() => {
      if (animationType === "typewriter") {
        // Split text into characters
        const chars = text.split("")
        element.innerHTML = chars.map(char => 
          `<span style="opacity: 0">${char === " " ? "&nbsp;" : char}</span>`
        ).join("")

        const spans = element.querySelectorAll("span")
        
        gsap.to(spans, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        })
      }

      if (animationType === "wave") {
        const chars = text.split("")
        element.innerHTML = chars.map(char => 
          `<span style="display: inline-block; transform: translateY(20px); opacity: 0">${char === " " ? "&nbsp;" : char}</span>`
        ).join("")

        const spans = element.querySelectorAll("span")
        
        gsap.to(spans, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.02,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        })
      }

      if (animationType === "glow") {
        gsap.fromTo(element,
          { opacity: 0, textShadow: "0 0 0px rgba(255,255,255,0)" },
          {
            opacity: 1,
            textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)",
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [text, animationType])

  return <div ref={textRef} className={className}>{text}</div>
}
