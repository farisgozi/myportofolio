import React, { useEffect, u    // Initial scattered positions - set once for performance
    componentElements.forEach((el, index) => {
      const angle = (index / componentElements.length) * Math.PI * 2
      const radius = 150 + Math.random() * 100
      
      gsap.set(el, {
        x: window.innerWidth/2 + Math.cos(angle) * radius - 40,
        y: window.innerHeight/2 + Math.sin(angle) * radius - 40,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.4,
        opacity: 0.9
      })
    })

    // Efficient scroll-triggered transition - like Whimsical
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top", 
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress
          
          componentElements.forEach((el) => {
            if (progress < 0.4) {
              // Phase 1: Gentle convergence 
              const moveProgress = progress / 0.4
              gsap.to(el, {
                x: window.innerWidth/2 - 40,
                y: window.innerHeight/2 - 40,
                rotation: 360 * moveProgress,
                scale: 0.8 + moveProgress * 0.4,
                duration: 0.3,
                ease: "none"
              })
            } else if (progress < 0.8) {
              // Phase 2: Zoom and blur
              const zoomProgress = (progress - 0.4) / 0.4
              gsap.to(el, {
                scale: 1.2 + zoomProgress * 2,
                filter: `blur(${zoomProgress * 8}px)`,
                opacity: 0.9 - zoomProgress * 0.6,
                duration: 0.3,
                ease: "none"
              })
            } else {
              // Phase 3: Fade out
              const fadeProgress = (progress - 0.8) / 0.2
              gsap.to(el, {
                opacity: 0.3 - fadeProgress * 0.3,
                scale: 3 + fadeProgress,
                filter: `blur(${8 + fadeProgress * 12}px)`,
                duration: 0.3,
                ease: "none"
              })
            }
          })
        }
      })

    // Simple initialization
    const initAnimation = () => {'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ScrambledComponentsProps {
  className?: string
}

export default function ScrambledComponents({ className = '' }: ScrambledComponentsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const componentsRef = useRef<HTMLDivElement[]>([])

  // Minimal tech components for smooth transition
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

    // Create scrambled movement animation
    const createScrambledAnimation = () => {
      components.forEach((component, index) => {
        const element = component as HTMLElement

        // Initial random position
        const initialX = (Math.random() - 0.5) * window.innerWidth * 0.8
        const initialY = (Math.random() - 0.5) * window.innerHeight * 0.8
        const initialRotation = Math.random() * 360
        const initialScale = 0.8 + Math.random() * 0.4

        gsap.set(element, {
          x: initialX,
          y: initialY,
          rotation: initialRotation,
          scale: initialScale,
          opacity: 1,
          filter: 'blur(0px)'
        })

        // Create main scroll-triggered animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress
              
              // Phase 1: Scrambled movement (0-0.3)
              if (progress <= 0.3) {
                const scrambleProgress = progress / 0.3
                const newX = initialX + (Math.sin(scrambleProgress * Math.PI * 4) * 100)
                const newY = initialY + (Math.cos(scrambleProgress * Math.PI * 3) * 80)
                
                gsap.set(element, {
                  x: newX,
                  y: newY,
                  rotation: initialRotation + (scrambleProgress * 720),
                  scale: initialScale + (scrambleProgress * 0.2)
                })
              }
              
              // Phase 2: Zoom in effect (0.3-0.7)
              else if (progress > 0.3 && progress <= 0.7) {
                const zoomProgress = (progress - 0.3) / 0.4
                const zoomScale = initialScale + (zoomProgress * 2) // Scale up significantly
                const centerX = -initialX * zoomProgress * 0.5
                const centerY = -initialY * zoomProgress * 0.5
                
                gsap.set(element, {
                  x: initialX + centerX,
                  y: initialY + centerY,
                  scale: zoomScale,
                  rotation: initialRotation + (720 + zoomProgress * 180)
                })
              }
              
              // Phase 3: Blur and fade out (0.7-1.0)
              else {
                const fadeProgress = (progress - 0.7) / 0.3
                const blurAmount = fadeProgress * 20
                const opacity = 1 - fadeProgress
                const finalScale = (initialScale + 2) + (fadeProgress * 1.5)
                
                gsap.set(element, {
                  scale: finalScale,
                  opacity: opacity,
                  filter: `blur(${blurAmount}px)`,
                  rotation: initialRotation + 900 + (fadeProgress * 360)
                })
              }
            }
          }
        })

        // Add floating animation for idle state
        gsap.to(element, {
          x: `+=${(Math.random() - 0.5) * 50}`,
          y: `+=${(Math.random() - 0.5) * 30}`,
          rotation: `+=${(Math.random() - 0.5) * 20}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2
        })
      })
    }

    // Initialize animations
    setTimeout(createScrambledAnimation, 100)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Component data - tech stack icons
  const components = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'GraphQL', icon: '📊', color: '#E10098' },
    { name: 'Redis', icon: '🔴', color: '#DC382D' },
    { name: 'Kubernetes', icon: '⚙️', color: '#326CE5' },
    { name: 'TensorFlow', icon: '🤖', color: '#FF6F00' },
    { name: 'Git', icon: '📝', color: '#F05032' },
    { name: 'VS Code', icon: '💻', color: '#007ACC' },
    { name: 'Figma', icon: '🎨', color: '#F24E1E' },
    { name: 'Tailwind', icon: '💨', color: '#06B6D4' }
  ]

  return (
    <div 
      ref={containerRef} 
      className={`scrambled-components ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      {components.map((comp, index) => (
        <div
          key={comp.name}
          className="floating-component"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            background: `linear-gradient(135deg, ${comp.color}20, ${comp.color}40)`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: comp.color,
            border: `2px solid ${comp.color}60`,
            backdropFilter: 'blur(10px)',
            boxShadow: `0 8px 32px ${comp.color}30`,
            zIndex: components.length - index
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>{comp.icon}</span>
            <span style={{ 
              fontSize: '0.6rem', 
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              opacity: 0.8
            }}>
              {comp.name}
            </span>
          </div>
        </div>
      ))}

      <style jsx>{`
        .floating-component {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .floating-component:hover {
          transform: translate(-50%, -50%) scale(1.1) !important;
        }
      `}</style>
    </div>
  )
}
