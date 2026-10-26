"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

// Register plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AccurateScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenisRef.current?.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Variables for cleanup (declared at useEffect scope)
    const floatingIconsArray: HTMLElement[] = []
    let initTimeout: NodeJS.Timeout | undefined
    let resizeTimeout: NodeJS.Timeout | undefined
    let handleResize: (() => void) | undefined

    // COMPLETELY NEW APPROACH - Simple and Natural
    if (containerRef.current) {
      const container = containerRef.current
      const hero = heroRef.current!
      const icons = iconsRef.current!
      const text = textRef.current!

      // Simple scroll timeline with natural motion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: hero,
          pinSpacing: true
        }
      })

      // Natural sequence - like the original reference
      tl
        // 1. Hero content fades out
        .to(".hero-title", { opacity: 0, y: -50, duration: 0.3 })
        .to(".hero-subtitle", { opacity: 0, y: -30, duration: 0.3 }, "<0.1")

        // 2. Background changes
        .to(hero, { backgroundColor: "#e3e3db", duration: 0.5 }, "<0.2")

        // 3. Icons animate upward with stagger
        .to(".tech-icon", {
          y: -200,
          scale: 0.8,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out"
        }, "<0.3")

        // 4. Text appears with icons in placeholders
        .to(".main-text", { opacity: 1, duration: 0.4 })
        .to(".text-word, .icon-placeholder", {
          opacity: 1,
          stagger: 0.1,
          duration: 0.3
        }, "<0.2")

      // Create floating icon elements that move to text positions
      const createFloatingIcons = () => {
        // Clean up existing floating icons first
        floatingIconsArray.forEach(icon => icon.remove())
        floatingIconsArray.length = 0

        const iconElements = icons.querySelectorAll('.tech-icon')
        const placeholders = text.querySelectorAll('.icon-placeholder')

        iconElements.forEach((icon, index) => {
          if (placeholders[index]) {
            const clone = icon.cloneNode(true) as HTMLElement
            clone.className = 'floating-icon'
            clone.style.position = 'fixed'
            clone.style.opacity = '0'
            clone.style.zIndex = '100'
            clone.style.pointerEvents = 'none'
            document.body.appendChild(clone)
            floatingIconsArray.push(clone)

            // Animate to placeholder position
            const placeholderSize = Math.max(32, Math.min(48, window.innerWidth * 0.04))
            const iconRect = icon.getBoundingClientRect()
            const placeholderRect = placeholders[index].getBoundingClientRect()

            gsap.set(clone, {
              x: iconRect.left,
              y: iconRect.top,
              width: placeholderSize,
              height: placeholderSize
            })

            gsap.to(clone, {
              x: placeholderRect.left,
              y: placeholderRect.top,
              opacity: 1,
              duration: 1,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "50% center",
                end: "80% center",
                scrub: 1
              }
            })
          }
        })
      }

      // Initialize floating icons - animate from bottom to inline positions
      initTimeout = setTimeout(createFloatingIcons, 100)

      // Handle window resize - recreate icons with updated positions
      handleResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(createFloatingIcons, 300)
      }
      window.addEventListener('resize', handleResize!)
    }

    return () => {
      // Clean up event listeners
      if (handleResize) {
        window.removeEventListener('resize', handleResize)
      }

      // Clear timeouts
      clearTimeout(initTimeout)
      clearTimeout(resizeTimeout)

      // Clean up Lenis and ScrollTrigger
      lenisRef.current?.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      // Clean up floating icons
      floatingIconsArray.forEach(icon => icon.remove())
      document.querySelectorAll('.floating-icon').forEach(el => el.remove())
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="scroll-container">
        {/* Hero Section */}
        <section ref={heroRef} className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Faris Gozi</h1>
            <p className="hero-subtitle">Welcome to my portfolio website</p>
          </div>

          {/* Tech Icons */}
          <div ref={iconsRef} className="tech-icons">
            <div className="tech-icon">
              <img src="/images/python.svg" alt="Python" />
            </div>
            <div className="tech-icon">
              <img src="/images/javascript.svg" alt="JavaScript" />
            </div>
            <div className="tech-icon">
              <img src="/images/nestjs.svg" alt="NestJS" />
            </div>
            <div className="tech-icon">
              <img src="/images/laravel.svg" alt="Laravel" />
            </div>
            <div className="tech-icon">
              <img src="/images/postgresql.svg" alt="PostgreSQL" />
            </div>
          </div>

          {/* Main Text with Icon Placeholders */}
          <div ref={textRef} className="main-text">
            <span className="text-word">Passionate</span>
            <div className="icon-placeholder" data-icon="0"></div>
            <span className="text-word">developer</span>
            <span className="text-word">crafting</span>
            <div className="icon-placeholder" data-icon="1"></div>
            <span className="text-word">modern</span>
            <span className="text-word">web</span>
            <div className="icon-placeholder" data-icon="2"></div>
            <span className="text-word">experiences.</span>
            <span className="text-word">Explore</span>
            <div className="icon-placeholder" data-icon="3"></div>
            <span className="text-word">my</span>
            <span className="text-word">work</span>
            <div className="icon-placeholder" data-icon="4"></div>
            <span className="text-word">and</span>
            <span className="text-word">connect!</span>
          </div>
        </section>

        {/* Outro */}
        <section className="outro">
          <h1>Explore My Work!</h1>
          <p>Scroll back up to see the animation again</p>
        </section>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Host Grotesk", sans-serif;
          overflow-x: hidden;
        }

        .scroll-container {
          height: 500vh;
          font-family: "Host Grotesk", sans-serif;
        }

        .hero {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: #141414;
          color: #e3e3db;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2rem;
        }

        .hero-content {
          text-align: center;
          z-index: 10;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 1200px;
        }

        .hero-title {
          font-size: clamp(4rem, 8vw, 8rem);
          font-weight: 800;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.5rem);
          opacity: 0.8;
          font-weight: 300;
        }

        .tech-icons {
          position: absolute;
          bottom: 3rem;
          display: flex;
          gap: 2rem;
          z-index: 5;
        }

        .tech-icon {
          width: 4rem;
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .tech-icon:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.2);
        }

        .tech-icon img {
          width: 2.5rem;
          height: 2.5rem;
          object-fit: contain;
        }

        .main-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(1.8rem, 4vw, 4rem);
          font-weight: 800;
          text-align: center;
          line-height: 1.4;
          color: #141414;
          opacity: 0;
          max-width: 90%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: clamp(0.3rem, 1vw, 0.8rem);
          padding: 2rem;
        }

        .text-word {
          opacity: 0;
          display: inline-block;
        }

        .icon-placeholder {
          width: clamp(2rem, 4vw, 3rem);
          height: clamp(2rem, 4vw, 3rem);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin: 0 clamp(0.2rem, 0.5vw, 0.5rem);
          flex-shrink: 0;
          opacity: 0;
          visibility: hidden;
        }

        .icon-placeholder img {
          width: clamp(1.2rem, 2.5vw, 2rem);
          height: clamp(1.2rem, 2.5vw, 2rem);
          object-fit: contain;
        }

        .floating-icon {
          width: clamp(2rem, 4vw, 3rem) !important;
          height: clamp(2rem, 4vw, 3rem) !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
        }

        .floating-icon img {
          width: clamp(1.2rem, 2.5vw, 2rem) !important;
          height: clamp(1.2rem, 2.5vw, 2rem) !important;
          object-fit: contain !important;
        }

        .outro {
          height: 100vh;
          background: #e3e3db;
          color: #141414;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .outro h1 {
          font-size: clamp(3rem, 6vw, 6rem);
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .outro p {
          font-size: 1.2rem;
          opacity: 0.7;
        }

        @media (max-width: 1024px) {
          .main-text {
            font-size: clamp(1.5rem, 3.5vw, 3rem);
            line-height: 1.5;
            gap: clamp(0.2rem, 0.8vw, 0.6rem);
            padding: 1.5rem;
          }

          .hero-content {
            padding: 0 1rem;
          }
        }

        @media (max-width: 768px) {
          .tech-icons {
            gap: 1rem;
            bottom: 1.5rem;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 90%;
          }

          .tech-icon {
            width: 3rem;
            height: 3rem;
          }

          .tech-icon img {
            width: 2rem;
            height: 2rem;
          }

          .main-text {
            font-size: clamp(1.3rem, 3vw, 2.5rem);
            line-height: 1.6;
            gap: clamp(0.15rem, 0.6vw, 0.4rem);
            padding: 1rem;
            max-width: 95%;
          }

          .hero-title {
            font-size: clamp(3rem, 6vw, 6rem) !important;
          }

          .hero-subtitle {
            font-size: clamp(0.9rem, 1.5vw, 1.2rem) !important;
          }
        }

        @media (max-width: 480px) {
          .main-text {
            font-size: clamp(1.1rem, 2.8vw, 2rem);
            line-height: 1.8;
            gap: 0.1rem;
            padding: 0.5rem;
          }

          .tech-icons {
            bottom: 1rem;
            gap: 0.8rem;
          }

          .tech-icon {
            width: 2.5rem;
            height: 2.5rem;
          }

          .tech-icon img {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      `}</style>
    </>
  )
}
