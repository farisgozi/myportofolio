import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface NeuralNetworkProps {
  className?: string
}

export default function NeuralNetwork({ className = '' }: NeuralNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Neural network nodes
    const nodes: { x: number; y: number; radius: number; connections: number[] }[] = []
    const nodeCount = 24
    
    // Create nodes in layers
    for (let i = 0; i < nodeCount; i++) {
      const layer = Math.floor(i / 6)
      const nodeInLayer = i % 6
      
      nodes.push({
        x: (canvas.width / 4) * (layer + 0.5),
        y: (canvas.height / 7) * (nodeInLayer + 1),
        radius: Math.random() * 4 + 3,
        connections: []
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      const layer = Math.floor(i / 6)
      if (layer < 3) {
        const nextLayerStart = (layer + 1) * 6
        const nextLayerEnd = Math.min(nextLayerStart + 6, nodeCount)
        
        for (let j = nextLayerStart; j < nextLayerEnd; j++) {
          if (Math.random() > 0.3) {
            node.connections.push(j)
          }
        }
      }
    })

    let animationId: number
    let pulseTime = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pulseTime += 0.02

      // Draw connections with animated pulse
      nodes.forEach((node, i) => {
        node.connections.forEach(connectionIndex => {
          const targetNode = nodes[connectionIndex]
          if (targetNode) {
            const pulse = (Math.sin(pulseTime + i * 0.2) + 1) * 0.5
            const alpha = 0.3 + pulse * 0.4
            
            ctx.strokeStyle = `rgba(106, 90, 205, ${alpha})`
            ctx.lineWidth = 1 + pulse * 2
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            
            // Curved connection
            const midX = (node.x + targetNode.x) / 2
            const midY = (node.y + targetNode.y) / 2 + Math.sin(pulseTime + i) * 20
            ctx.quadraticCurveTo(midX, midY, targetNode.x, targetNode.y)
            ctx.stroke()

            // Animated data packet
            if (Math.random() < 0.05) {
              const t = Math.random()
              const x = node.x + (targetNode.x - node.x) * t
              const y = node.y + (targetNode.y - node.y) * t
              
              ctx.fillStyle = `rgba(138, 43, 226, 0.8)`
              ctx.beginPath()
              ctx.arc(x, y, 2, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = (Math.sin(pulseTime + i * 0.3) + 1) * 0.5
        const glowSize = node.radius + pulse * 3
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowSize
        )
        gradient.addColorStop(0, 'rgba(106, 90, 205, 0.8)')
        gradient.addColorStop(0.7, 'rgba(72, 61, 139, 0.4)')
        gradient.addColorStop(1, 'rgba(25, 25, 112, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2)
        ctx.fill()
        
        // Core node
        ctx.fillStyle = `rgba(255, 255, 255, ${0.7 + pulse * 0.3})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`neural-network ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.6
        }}
      />
    </div>
  )
}
