"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { ParallaxContainer } from "@/components/ui/parallax-container"

export default function ModernHomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <FloatingElement direction="up" duration={4} distance={20} className="absolute top-20 left-10">
          <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-md" />
        </FloatingElement>
        <FloatingElement direction="down" duration={5} distance={30} className="absolute top-40 right-20">
          <div className="w-24 h-24 rounded-full bg-purple-500/20 backdrop-blur-md" />
        </FloatingElement>
        <FloatingElement direction="left" duration={6} distance={25} className="absolute bottom-32 left-1/4">
          <div className="w-20 h-20 rounded-full bg-blue-500/20 backdrop-blur-md" />
        </FloatingElement>
      </div>

      {/* Hero Section */}
      <motion.section 
        style={{ y, opacity }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Faris Gozi
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
              Crafting digital experiences with modern technologies and creative solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <AnimatedButton variant="primary" size="lg">
              View My Work
            </AnimatedButton>
            <AnimatedButton variant="secondary" size="lg">
              Get In Touch
            </AnimatedButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center gap-6"
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <ParallaxContainer speed={0.3}>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Frontend Development",
                  description: "Creating responsive and interactive user interfaces with modern frameworks",
                  delay: 0
                },
                {
                  title: "Backend Development", 
                  description: "Building robust and scalable server-side applications and APIs",
                  delay: 0.2
                },
                {
                  title: "Mobile Development",
                  description: "Developing cross-platform mobile applications for iOS and Android",
                  delay: 0.4
                }
              ].map((skill, index) => (
                <GlassCard key={skill.title} delay={skill.delay}>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {skill.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {skill.description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </ParallaxContainer>

      {/* Projects Section */}
      <ParallaxContainer speed={0.5}>
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Here are some of my recent projects that showcase my skills and creativity
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Project One",
                  description: "A modern web application built with Next.js and TypeScript",
                  image: "/placeholder.jpg",
                  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
                  delay: 0
                },
                {
                  title: "Project Two",
                  description: "Mobile application for task management and productivity",
                  image: "/placeholder.jpg", 
                  tags: ["React Native", "Node.js", "MongoDB"],
                  delay: 0.2
                }
              ].map((project, index) => (
                <GlassCard key={project.title} delay={project.delay}>
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-6" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    {project.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <AnimatedButton variant="secondary" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </AnimatedButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </ParallaxContainer>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>
            <AnimatedButton variant="primary" size="lg">
              Start a Conversation
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
