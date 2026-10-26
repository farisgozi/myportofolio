"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollAnimationPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroHeaderRef = useRef<HTMLDivElement>(null)
  const animatedIconsRef = useRef<HTMLDivElement>(null)
  const animatedTextRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const duplicateIconsRef = useRef<HTMLDivElement[]>([])
  const [textAnimationOrder, setTextAnimationOrder] = useState<{ segment: Element, originalIndex: number }[]>([])

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Lenis scroll integration
    lenisRef.current.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Main scroll animation
    if (heroRef.current) {
      const heroSection = heroRef.current
      const heroHeader = heroHeaderRef.current
      const animatedIcons = animatedIconsRef.current
      const animatedText = animatedTextRef.current
      const iconElements = animatedIcons?.querySelectorAll(".animated-icon")
      const textSegments = animatedText?.querySelectorAll(".text-segment")
      const placeholders = animatedText?.querySelectorAll(".placeholder-icon")

      const isMobile = window.innerWidth <= 1000
      const headerIconSize = isMobile ? 30 : 60

      ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: `+=${window.innerHeight * 8}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress

          // Hide all text segments initially
          textSegments?.forEach((segment) => {
            gsap.set(segment, { opacity: 0 })
          })

          if (progress <= 0.3) {
            // Phase 1: Move container up
            const moveProgress = progress / 0.3
            const containerMoveY = -window.innerHeight * 0.3 * moveProgress

            // Fade out header
            if (progress <= 0.15) {
              const headerProgress = progress / 0.15
              const headerMoveY = -50 * headerProgress
              const headerOpacity = 1 - headerProgress

              gsap.set(heroHeader, {
                transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
                opacity: headerOpacity,
              })
            } else {
              gsap.set(heroHeader, {
                transform: `translate(-50%, calc(-50% + -50px))`,
                opacity: 0,
              })
            }

            gsap.set(animatedIcons, {
              x: 0,
              y: containerMoveY,
              scale: 1,
              opacity: 1,
            })

            // Stagger icon movement
            iconElements?.forEach((icon, index) => {
              const staggerDelay = index * 0.1
              const iconStart = staggerDelay
              const iconEnd = staggerDelay + 0.5

              const iconProgress = gsap.utils.mapRange(
                iconStart,
                iconEnd,
                0,
                1,
                moveProgress
              )
              const clampedProgress = Math.max(0, Math.min(1, iconProgress))

              const startOffset = -containerMoveY
              const individualY = startOffset * (1 - clampedProgress)

              gsap.set(icon, {
                x: 0,
                y: individualY,
              })
            })
          } else if (progress <= 0.6) {
            // Phase 2: Scale and center icons
            const scaleProgress = (progress - 0.3) / 0.3

            // Change background color
            if (scaleProgress >= 0.5) {
              heroSection.style.backgroundColor = "#e3e3db"
            } else {
              heroSection.style.backgroundColor = "#141414"
            }

            // Center and scale icons
            const targetCenterY = window.innerHeight / 2
            const targetCenterX = window.innerWidth / 2
            const containerRect = animatedIcons?.getBoundingClientRect()

            if (containerRect) {
              const currentCenterX = containerRect.left + containerRect.width / 2
              const currentCenterY = containerRect.top + containerRect.height / 2
              const deltaX = (targetCenterX - currentCenterX) * scaleProgress
              const deltaY = (targetCenterY - currentCenterY) * scaleProgress
              const baseY = -window.innerHeight * 0.3

              const currentIconSize = iconElements?.[0]?.getBoundingClientRect().width || 50
              const exactScale = headerIconSize / currentIconSize
              const currentScale = 1 + (exactScale - 1) * scaleProgress

              gsap.set(animatedIcons, {
                x: deltaX,
                y: baseY + deltaY,
                scale: currentScale,
                opacity: 1,
              })
            }

            iconElements?.forEach((icon) => {
              gsap.set(icon, { x: 0, y: 0 })
            })
          } else if (progress <= 0.75) {
            // Phase 3: Move icons to placeholders
            const moveProgress = (progress - 0.6) / 0.15

            heroSection.style.backgroundColor = "#e3e3db"
            gsap.set(animatedIcons, { opacity: 0 })

            // Create and animate duplicate icons
            iconElements?.forEach((icon, index) => {
              if (placeholders && placeholders[index]) {
                const iconRect = icon.getBoundingClientRect()
                const targetRect = placeholders[index].getBoundingClientRect()

                // This would need more complex DOM manipulation
                // For now, we'll just fade the original icons
              }
            })
          } else {
            // Phase 4: Show text with stagger
            heroSection.style.backgroundColor = "#e3e3db"
            gsap.set(animatedIcons, { opacity: 0 })

            // Animate text segments
            const textAnimationOrder = Array.from(textSegments || [])

            textAnimationOrder.forEach((segment, index) => {
              const segmentStart = 0.75 + index * 0.03
              const segmentEnd = segmentStart + 0.015

              const segmentProgress = gsap.utils.mapRange(
                segmentStart,
                segmentEnd,
                0,
                1,
                progress
              )
              const clampedProgress = Math.max(0, Math.min(1, segmentProgress))

              gsap.set(segment, {
                opacity: clampedProgress,
              })
            })
          }
        },
      })
    }

    return () => {
      lenisRef.current?.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="scroll-animation-container">
      <section ref={heroRef} className="hero-section">
        <div ref={heroHeaderRef} className="hero-header">
          <h1>Faris Gozi</h1>
          <p>Welcome to my portfolio website</p>
        </div>

        <div ref={animatedIconsRef} className="animated-icons">
          <div className="animated-icon icon-1">
            <img src="/images/github-mark.svg" alt="GitHub Icon" />
          </div>
          <div className="animated-icon icon-2">
            <img src="/images/github-mark.svg" alt="GitHub Icon" />
          </div>
          <div className="animated-icon icon-3">
            <img src="/images/github-mark.svg" alt="GitHub Icon" />
          </div>
          <div className="animated-icon icon-4">
            <img src="/images/github-mark.svg" alt="GitHub Icon" />
          </div>
          <div className="animated-icon icon-5">
            <img src="/images/profile-photo.png" alt="Profile" />
          </div>
        </div>

        <h1 ref={animatedTextRef} className="animated-text">
          <div className="placeholder-icon"></div>
          <span className="text-segment">Delve into coding</span>
          <div className="placeholder-icon"></div>
          <span className="text-segment">without clutter.</span>
          <span className="text-segment">Unlock source code </span>
          <div className="placeholder-icon"></div>
          <span className="text-segment">for every tutorial</span>
          <div className="placeholder-icon"></div>
          <span className="text-segment">published on the Codegrid</span>
          <div className="placeholder-icon"></div>
          <span className="text-segment">YouTube channel.</span>
        </h1>
      </section>

      <section className="outro-section">
        <h1>Link in Description!</h1>
      </section>

      <style jsx>{`
        .scroll-animation-container {
          font-family: "Host Grotesk", sans-serif;
        }

        .hero-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #141414;
          color: #e3e3db;
          overflow: hidden;
          flex-direction: column;
          transition: background-color 0.3s ease;
        }

        .hero-header {
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          will-change: transform, opacity;
        }

        .hero-header h1 {
          font-size: 7vw;
          font-weight: 800;
          line-height: 1;
          margin: 0;
        }

        .hero-header p {
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0;
        }

        .animated-icons {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          will-change: transform;
          z-index: 2;
        }

        .animated-icon {
          flex: 1;
          aspect-ratio: 1;
          will-change: transform;
          max-width: 80px;
          max-height: 80px;
        }

        .animated-icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
        }

        .animated-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          max-width: 1000px;
          width: 90%;
          text-align: center;
          color: #141414;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.2;
          margin: 0;
          padding: 0 1rem;
        }

        .text-segment {
          opacity: 0;
        }

        .placeholder-icon {
          margin-top: -10px;
          width: 60px;
          height: 60px;
          display: inline-block;
          vertical-align: middle;
          will-change: transform;
          visibility: hidden;
        }

        .outro-section {
          position: relative;
          width: 100vw;
          height: 100vh;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e3e3db;
          color: #141414;
        }

        .outro-section h1 {
          font-size: 7vw;
          font-weight: 800;
          line-height: 1;
          margin: 0;
        }

        @media (max-width: 1000px) {
          .hero-header h1 {
            font-size: 12vw;
          }

          .hero-header p {
            font-size: 1.1rem;
          }

          .hero-header {
            width: 100%;
            top: 45%;
          }

          .placeholder-icon {
            margin-top: -4px;
            width: 30px;
            height: 30px;
          }

          .animated-icons {
            bottom: 0.5rem;
            left: 0.5rem;
            right: 0.5rem;
            gap: 0.5rem;
          }

          .animated-icon {
            aspect-ratio: auto;
            height: 50px;
            max-height: 50px;
          }

          .animated-text {
            font-size: clamp(1.5rem, 6vw, 3rem);
          }

          .outro-section h1 {
            font-size: 12vw;
          }
        }
      `}</style>
    </div>
  )
}
