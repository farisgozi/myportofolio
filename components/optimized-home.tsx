"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { memo } from "react"

// Memoize komponen untuk mengurangi re-render
const BackgroundElements = memo(() => (
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
))
BackgroundElements.displayName = "BackgroundElements"

const SocialLinks = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="flex justify-center gap-6"
  >
    {[
      { icon: Github, href: "https://github.com", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },  
      { icon: Mail, href: "mailto:hello@example.com", label: "Email" }
    ].map((social) => (
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
))
SocialLinks.displayName = "SocialLinks"

const HeroSection = memo(() => (
  <section className="min-h-screen flex items-center justify-center px-6">
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

      <SocialLinks />
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
  </section>
))
HeroSection.displayName = "HeroSection"

const AboutSection = memo(() => (
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
        ].map((skill) => (
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
))
AboutSection.displayName = "AboutSection"

const ProjectsSection = memo(() => (
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
            title: "AI Chat Application",
            description: "A modern chat application with AI integration built with Next.js and TypeScript",
            image: "/images/Bot-Absensi-Whatsapp.jpeg",
            tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS"],
            delay: 0
          },
          {
            title: "Portfolio Website",
            description: "Responsive portfolio website with modern animations and glassmorphism design",
            image: "/images/profile-photo.png", 
            tags: ["React", "Framer Motion", "Tailwind CSS"],
            delay: 0.2
          }
        ].map((project) => (
          <GlassCard key={project.title} delay={project.delay}>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-6 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
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
))
ProjectsSection.displayName = "ProjectsSection"

const ContactSection = memo(() => (
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
))
ContactSection.displayName = "ContactSection"

export default function OptimizedHomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundElements />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
