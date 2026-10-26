"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AdvancedBackgroundElements } from "@/components/ui/advanced-background"
import { AnimatedSection, AnimatedText } from "@/components/ui/gsap-animations"
import { GSAPFloatingElement } from "@/components/ui/gsap-floating"
import { memo } from "react"

const SocialLinks = memo(() => (
  <AnimatedSection animationType="scale" className="flex justify-center gap-6">
    {[
      { icon: Github, href: "https://github.com", label: "GitHub" },
      { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },  
      { icon: Mail, href: "mailto:hello@example.com", label: "Email" }
    ].map((social, index) => (
      <motion.a
        key={social.label}
        href={social.href}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <social.icon className="w-6 h-6" />
      </motion.a>
    ))}
  </AnimatedSection>
))
SocialLinks.displayName = "SocialLinks"

const HeroSection = memo(() => (
  <section className="min-h-screen flex items-center justify-center px-6 relative">
    <div className="max-w-4xl mx-auto text-center">
      {/* Animated Name dengan GSAP */}
      <AnimatedSection animationType="slideUp" className="mb-8">
        <AnimatedText 
          text="Faris Gozi"
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
          animationType="wave"
        />
        <AnimatedText 
          text="Crafting digital experiences with modern technologies and creative solutions"
          className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
          animationType="typewriter"
        />
      </AnimatedSection>

      {/* Animated Buttons */}
      <AnimatedSection animationType="slideUp" className="flex flex-wrap gap-4 justify-center mb-12">
        <AnimatedButton variant="primary" size="lg">
          View My Work
        </AnimatedButton>
        <AnimatedButton variant="secondary" size="lg">
          Get In Touch
        </AnimatedButton>
      </AnimatedSection>

      <SocialLinks />
    </div>

    {/* Floating Scroll Indicator dengan GSAP */}
    <GSAPFloatingElement 
      animationType="gentle"
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
        <ArrowDown className="w-5 h-5" />
      </div>
    </GSAPFloatingElement>
  </section>
))
HeroSection.displayName = "HeroSection"

const AboutSection = memo(() => (
  <AnimatedSection animationType="slideLeft">
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedText 
            text="About Me"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            animationType="glow"
          />
          <AnimatedText 
            text="I'm a passionate developer who loves creating beautiful, functional, and user-friendly applications"
            className="text-xl text-white/80 max-w-3xl mx-auto"
            animationType="typewriter"
          />
        </div>

        <AnimatedSection animationType="wave">
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
        </AnimatedSection>
      </div>
    </section>
  </AnimatedSection>
))
AboutSection.displayName = "AboutSection"

const ProjectsSection = memo(() => (
  <AnimatedSection animationType="slideRight">
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AnimatedText 
            text="Featured Projects"
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
            animationType="glow"
          />
          <AnimatedText 
            text="Here are some of my recent projects that showcase my skills and creativity"
            className="text-xl text-white/80 max-w-3xl mx-auto"
            animationType="typewriter"
          />
        </div>

        <AnimatedSection animationType="wave">
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
                tags: ["React", "Framer Motion", "GSAP", "Tailwind CSS"],
                delay: 0.2
              }
            ].map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard delay={project.delay}>
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
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  </AnimatedSection>
))
ProjectsSection.displayName = "ProjectsSection"

const ContactSection = memo(() => (
  <AnimatedSection animationType="scale">
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedText 
          text="Let's Work Together"
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent"
          animationType="glow"
        />
        <AnimatedText 
          text="Ready to bring your ideas to life? Let's discuss your next project and create something amazing together."
          className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          animationType="typewriter"
        />
        <AnimatedButton variant="primary" size="lg">
          Start a Conversation
        </AnimatedButton>
      </div>
    </section>
  </AnimatedSection>
))
ContactSection.displayName = "ContactSection"

export default function GSAPHomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AdvancedBackgroundElements />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  )
}
