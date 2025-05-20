"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Award,
  Briefcase,
  School,
  Code,
  X,
  ExternalLink,
  ChevronRight,
  FileText,
  Menu,
  ArrowUpRight,
  MousePointer,
} from "lucide-react"
import { motion, useScroll, useSpring, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import ProfilePhoto from "../components/ProfilePhoto"

// Custom cursor component
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const mouseOver = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseover", mouseOver)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseover", mouseOver)
    }
  }, [])

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(75, 188, 215, 0.2)",
      border: "1px solid rgba(75, 188, 215, 0.5)",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(75, 188, 215, 0.3)",
      border: "1px solid rgba(75, 188, 215, 0.8)",
    },
  }

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50 hidden md:block"
      variants={cursorVariants}
      animate={isHovering ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  )
}

function ProjectCard({ title, thumbnail, videoUrl, index }) {
  const [showVideo, setShowVideo] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      },
    },
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  }

  const buttonVariants = {
    rest: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className="relative group h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 transition-all duration-300"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
      ></motion.div>
      <div className="relative h-full p-4 flex flex-col">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl mb-3">
          <motion.div variants={imageVariants} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Image src={`/images/${thumbnail}`} alt={title} fill className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end"
            variants={buttonVariants}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="p-4 w-full">
              <motion.button
                onClick={() => setShowVideo(true)}
                className="bg-[#4BBCD7] hover:bg-[#3a9ab0] text-white py-2 px-4 rounded-full text-sm font-medium flex items-center justify-center gap-2 w-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={16} />
                Watch Video
              </motion.button>
            </div>
          </motion.div>
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>

        <AnimatePresence>
          {showVideo && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="absolute top-4 right-4 z-10">
                  <motion.button
                    onClick={() => setShowVideo(false)}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 text-white transition-all"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="aspect-video w-full">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function CertificateCard({ title, issuer, date, image, index }) {
  const [showImage, setShowImage] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.1,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className="relative group h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 transition-all duration-300"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
      ></motion.div>
      <div className="relative h-full p-5 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
          <motion.button
            onClick={() => setShowImage(true)}
            className="text-[#4BBCD7] hover:text-[#3a9ab0] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpRight size={18} />
          </motion.button>
        </div>
        <p className="text-gray-600 text-sm">{issuer}</p>
        <p className="text-gray-500 text-xs mt-1">{date}</p>

        <AnimatePresence>
          {showImage && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-white rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="absolute top-4 right-4 z-10">
                  <motion.button
                    onClick={() => setShowImage(false)}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-2 text-white transition-all"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                <div className="p-4">
                  <Image src={`/images/${image}`} alt={title} width={800} height={600} className="w-full h-auto" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center mb-5">
      <div className="w-8 h-8 rounded-full bg-[#4BBCD7]/20 flex items-center justify-center mr-3">{icon}</div>
      <h3 className="text-xl font-bold text-[#4BBCD7]">{title}</h3>
    </div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const projects = [
    {
      title: "Bot Whatsapp Reminder Absensi PKL",
      thumbnail: "Bot-Absensi-Whatsapp.jpeg",
      videoUrl:
        "https://scontent.cdninstagram.com/o1/v/t2/f2/m78/AQPHBWE4KwNoQirGQMhT5IUOmhHJyZZ6yCnrQQbxFbcCLTJ4jZLxXpu_EVCQPVtgbszEiOi-DgekCfSr0RjaDQXvDwoup0U-8dSgZXU.mp4?_nc_cat=111&_nc_oc=AdnwN2jXoHO_n40nXg4nlrur1rGiLmoyzhx-cpJpqyqReG9W5bUomVKceKQLsd_rifE&_nc_sid=5e9851&_nc_ht=instagram.fcgk42-1.fna.fbcdn.net&_nc_ohc=23NrX1vPGLcQ7kNvgFV0zPn&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuMzYwLmRhc2hfYmFzZWxpbmVfM192MSIsInhwdl9hc3NldF9pZCI6MTAwMTE3NzgzODE0MDUwNywidmlfdXNlY2FzZV9pZCI6MTAxMDAsImR1cmF0aW9uX3MiOjQzLCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=a2f07c6b85d29027&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzI0NEI2NDg4OTkwMTk1N0E2RUVCRkM4QTQ1NkExQzlFX3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0l0QkN4dlMyajJaVkZzSEFQOXRZT2lWdTlrQmJwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmtvGxlpykxwMVAigCQzMsF0BFkQYk3S8bGBJkYXNoX2Jhc2VsaW5lXzNfdjERAHXoBwA&_nc_zt=28&oh=00_AYHbp8UPFzt2ukoFxp9VqwkKiz77jBJpp_AfA-JKYFkCoQ&oe=67E7BE34",
    },
    {
      title: "Basic AI Model Customer Service",
      thumbnail: "Model-Customer-Service.jpg",
      videoUrl:
        "https://scontent.cdninstagram.com/o1/v/t2/f2/m78/AQOVeBwxoRd-VCTwpnlcSSI9YedyBcaSR6wthdkOHQ3pA6WD3NxF9okNnnFCUDFGmJDMBbXJ5evfnJGHXXdGNcOzhAPyaq4lAAlNRsE.mp4?_nc_cat=109&_nc_oc=Adljjufejp4Gh0JinG_3t91FSk6M5lkTxbqJYjfIYDDha7ee-rUtnoLdklRHy0kex50&_nc_sid=5e9851&_nc_ht=instagram.fcgk42-1.fna.fbcdn.net&_nc_ohc=ama49Sc7oyYQ7kNvgH4WvIH&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuMzYwLmRhc2hfYmFzZWxpbmVfM192MSIsInhwdl9hc3NldF9pZCI6ODUyNjg5ODcwMTEzNDMzLCJ2aV91c2VjYXNlX2lkIjoxMDEwMCwiZHVyYXRpb25fcyI6NDAsInVybGdlbl9zb3VyY2UiOiJ3d3cifQ%3D%3D&ccb=17-1&vs=45b8424e71075e75&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyLzk0NEFGNTk5Q0M5OTc0NkZEQ0MxREVCMEVGOEY5MUE2X3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0hyX3Rob1pfdHBRd2lzQkFOR21falVmajdwLWJwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAmsqr-zIrhgwMVAigCQzMsF0BEHdLxqfvnGBJkYXNoX2Jhc2VsaW5lXzNfdjERAHXoBwA&_nc_zt=28&oh=00_AYGbw9yetjgRoC72XHvkur7iFsAaiXP02DEfzloPnlDowA&oe=67E7BE6A",
    },
    {
      title: "Temen Ngoding Kamu - AI VSCode Extension",
      thumbnail: "Temen-Ngoding-Kamu-Ai-Extension-Vscode.jpg",
      videoUrl:
        "https://scontent.cdninstagram.com/o1/v/t2/f2/m78/AQPdzb06jfKQguxUk085BQBlTdYC0Z_xfxXH2A_g4L2U-tKJ4_7sp3CghLCt7giPYmm7CYqIj3UcLu5vrIPA4mkklP0lug-IQKcBa5g.mp4?_nc_cat=103&_nc_oc=Adn4pg626SSaXDgE32cu_rqcxhApD76VDWbL2i4OvjWFo5uwt-66huKjoCdATg9cHeM&_nc_sid=5e9851&_nc_ht=instagram.fcgk42-1.fna.fbcdn.net&_nc_ohc=Ioq5VKee7KkQ7kNvgGzrOD9&efg=eyJ2ZW5jb2RlX3RhZyI6Inhwdl9wcm9ncmVzc2l2ZS5JTlNUQUdSQU0uU1RPUlkuQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSIsInhwdl9hc3NldF9pZCI6MjgxODE0ODk1MTY3NzQ4MiwidmlfdXNlY2FzZV9pZCI6MTAxMDAsImR1cmF0aW9uX3MiOjQ5LCJ1cmxnZW5fc291cmNlIjoid3d3In0%3D&ccb=17-1&vs=59b220af083be3b0&_nc_vs=HBksFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyL0VBNDI3M0ZFOTFEQUM3OEVGQ0I5MkEwMzRDMzAxNEFBX3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBABUCGDpwYXNzdGhyb3VnaF9ldmVyc3RvcmUvR0ZEX29odDBqZnBCVUpBR0FCc2QzWHpOZW5naWJwa3dBQUFGFQICyAEAKAAYABsCiAd1c2Vfb2lsATEScHJvZ3Jlc3NpdmVfcmVjaXBlATEVAAAm1OiC8-3FgQoVAigCQzMsF0BIxDlYEGJOGBJkYXNoX2Jhc2VsaW5lXzFfdjERAHXoBwA&_nc_zt=28&oh=00_AYGgbLvhy0gl56nAD6H9EP_rhTVamxMpTNR3PHNidHTRxg&oe=67E7A31C",
    },
  ]

  const certificates = [
    {
      title: "Piagam Olimpiade Bidang Bahasa Inggris",
      issuer: "OPN Certification",
      date: "2022",
      image: "opn.jpg",
    },
    {
      title: "Head of AI Division",
      issuer: "Organisasi Ekstrakurikuler Jurusan SMK Prestasi Prima",
      date: "2023",
      image: "orens.png",
    },
    {
      title: "Software Developer Internship",
      issuer: "PT. Implementasi Teknologi Digital",
      date: "2024",
      image: "magang.jpg",
    },
    {
      title: "OSIS Certification",
      issuer: "Organisasi Siswa Intra Sekolah SMK Prestasi Prima",
      date: "2022",
      image: "osis.png",
    },
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const navItems = [
    { name: "Profile", href: "#profile" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ]

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: delay,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  }

  return (
    <main className="min-h-screen bg-[#EAECC6] overflow-x-hidden">
      <CustomCursor />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#4BBCD7] origin-left z-50" style={{ scaleX }} />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-[#EAECC6]/80 backdrop-blur-sm py-4 px-6 md:px-10 mb-6"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold text-[#4BBCD7]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Muhammad Faris Gozi
          </motion.h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, i) => (
              <motion.div key={item.name} custom={i} variants={navItemVariants} initial="hidden" animate="visible">
                <Link href={item.href} className="text-gray-700 hover:text-[#4BBCD7] transition-colors relative group">
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4BBCD7]"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={menuRef}
              className="absolute top-16 right-4 z-50 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 w-48"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-[#4BBCD7] transition-colors block py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="max-w-6xl mx-auto px-4 md:px-10 pb-20">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <motion.div className="md:w-2/3" custom={0.2} variants={sectionVariants} initial="hidden" animate="visible">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">Software Developer</h2>
                <motion.h2
                  className="text-2xl md:text-4xl font-bold text-[#4BBCD7] mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Specializing in AI & Mobile Development
                </motion.h2>
                <motion.p
                  className="text-gray-600 text-lg max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  Saya adalah seorang pengembang perangkat lunak yang berfokus pada penguasaan dan pengembangan
                  keterampilan pemrograman. Tertarik dengan perkembangan Kecerdasan Buatan dan Backend Development.
                </motion.p>

                <motion.div
                  className="mt-8 flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <MousePointer className="text-[#4BBCD7] mr-2 animate-bounce" size={16} />
                  <span className="text-sm text-gray-500">Scroll to explore</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/3 relative aspect-square w-full max-w-[300px] md:max-w-none"
              custom={0.3}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Menggunakan komponen ProfilePhoto yang baru dengan animasi interaktif yang lebih realistis */}
              <ProfilePhoto />
            </motion.div>
          </div>
        </section>

        {/* Skills & Education Section */}
        <section id="profile" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <motion.div
              className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50"
              custom={0.4}
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              <SectionTitle icon={<Code size={16} className="text-[#4BBCD7]" />} title="KEAHLIAN" />

              <div className="space-y-6">
                {[
                  { title: "Programming", skills: ["Python", "Flutter", "Express", "Laravel"] },
                  { title: "AI & Data Science", skills: ["Computer Vision", "Automation", "NLP"] },
                  { title: "Sosial", skills: ["Adaptasi", "Teamwork"] },
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <h4 className="font-semibold text-gray-800 flex items-center mb-3">
                      <span className="w-2 h-2 rounded-full bg-[#4BBCD7] mr-2"></span>
                      {category.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 bg-[#4BBCD7]/10 text-[#4BBCD7] rounded-full text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false, amount: 0.3 }}
                          transition={{ delay: 0.1 * index + 0.05 * i, duration: 0.4 }}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(75, 188, 215, 0.2)" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education & Achievement */}
            <div className="space-y-6">
              <motion.div
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50"
                custom={0.5}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <SectionTitle icon={<School size={16} className="text-[#4BBCD7]" />} title="PENDIDIKAN" />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h4 className="font-semibold text-gray-800 text-lg">SMK Prestasi Prima</h4>
                  <p className="text-gray-700">Rekayasa Perangkat Lunak</p>
                  <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-600">Jakarta Timur</p>
                    <p className="text-sm text-gray-600">2022 - 2025</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/50"
                custom={0.6}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <SectionTitle icon={<Award size={16} className="text-[#4BBCD7]" />} title="PRESTASI" />

                <motion.div
                  className="bg-gradient-to-r from-[#4BBCD7]/10 to-transparent p-4 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Olimpiade Pelajar Nasional</h4>
                    <p className="text-gray-700">Peraih Medali Emas Bidang Bahasa Inggris</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">Jakarta</span>
                      <span className="text-sm text-gray-600">Oktober 2022</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-20">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50"
            custom={0.7}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <SectionTitle icon={<Briefcase size={16} className="text-[#4BBCD7]" />} title="PENGALAMAN" />

            <div className="space-y-10">
              {[
                {
                  company: "PT. Implementasi Teknologi Digital",
                  role: "Software Developer Internship",
                  location: "Bekasi",
                  period: "Juli 2024 - Desember 2024",
                  tasks: [
                    "Berfokus pada pengembangan aplikasi di bidang pariwisata berbasis seluler.",
                    "Familiar dengan bahasa pemrograman dasar Flutter, Express, dan Laravel.",
                  ],
                },
                {
                  company: "Kepala Divisi AI",
                  role: "Ekstrakurikuler",
                  location: "Jakarta",
                  period: "2023 - 2024",
                  tasks: [
                    "Memimpin dan mengorganisir Divisi AI dalam organisasi ekstrakurikuler.",
                    "Mengajar konsep dasar kecerdasan buatan dan implementasi logika AI menggunakan Python.",
                    "Membimbing anggota dalam penerapan AI pada bidang computer vision, otomasi, dan pemrosesan bahasa dasar.",
                    "Mengembangkan proyek berbasis AI untuk meningkatkan pemahaman dan keterampilan anggota dalam teknologi AI.",
                  ],
                },
                {
                  company: "ORGANISASI SEKOLAH (OSIS)",
                  role: "Anggota Komisi B",
                  location: "Jakarta",
                  period: "2022 - 2023",
                  tasks: [
                    "Dibekali dengan kerjasama tim dan juga cara membangun komunikasi yang baik, untuk mengelola dan mengawasi anggota OSIS.",
                    "Menjabat pada posisi ini selama 1 periode.",
                  ],
                },
              ].map((job, index) => (
                <motion.div
                  key={job.company}
                  className="relative pl-8 border-l-2 border-[#4BBCD7]/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="absolute w-4 h-4 bg-[#4BBCD7] rounded-full -left-[9px] top-0"></div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-800 text-xl">{job.company}</h4>
                    <motion.span
                      className="text-sm text-[#4BBCD7] font-medium px-3 py-1 bg-[#4BBCD7]/10 rounded-full"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(75, 188, 215, 0.2)" }}
                    >
                      {job.location}
                    </motion.span>
                  </div>
                  {job.role && <p className="text-gray-700 italic">{job.role}</p>}
                  <p className="text-sm text-gray-600 mb-4">{job.period}</p>
                  <ul className="space-y-3">
                    {job.tasks.map((task, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ delay: 0.2 * index + 0.1 * i, duration: 0.5 }}
                      >
                        <ChevronRight size={16} className="text-[#4BBCD7] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{task}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50"
            custom={0.8}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="flex justify-between items-center mb-8">
              <SectionTitle icon={<Code size={16} className="text-[#4BBCD7]" />} title="PROJECTS" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#" className="text-[#4BBCD7] hover:text-[#3a9ab0] text-sm flex items-center">
                  View all <ArrowUpRight size={14} className="ml-1" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  thumbnail={project.thumbnail}
                  videoUrl={project.videoUrl}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="mb-20">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50"
            custom={0.9}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="flex justify-between items-center mb-8">
              <SectionTitle icon={<FileText size={16} className="text-[#4BBCD7]" />} title="SERTIFIKAT" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#" className="text-[#4BBCD7] hover:text-[#3a9ab0] text-sm flex items-center">
                  View all <ArrowUpRight size={14} className="ml-1" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((certificate, index) => (
                <CertificateCard
                  key={index}
                  title={certificate.title}
                  issuer={certificate.issuer}
                  date={certificate.date}
                  image={certificate.image}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50"
            custom={1}
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <motion.h3
                  className="text-2xl font-bold text-[#4BBCD7] mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Contact me
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail size={18} />,
                      label: "Email",
                      value: "ojigoji5@gmail.com",
                      href: "mailto:ojigoji5@gmail.com",
                    },
                    { icon: <Phone size={18} />, label: "Phone", value: "081219769477", href: "tel:081219769477" },
                    {
                      icon: <MapPin size={18} />,
                      label: "Location",
                      value: "Jl. As – Syafi'iyah No.08, RT.002/RW.007. Jatiasih, Bekasi.",
                      href: null,
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={contact.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full bg-[#4BBCD7]/20 flex items-center justify-center"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(75, 188, 215, 0.3)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <span className="text-[#4BBCD7]">{contact.icon}</span>
                      </motion.div>
                      <div>
                        <p className="text-sm text-gray-500">{contact.label}</p>
                        {contact.href ? (
                          <a href={contact.href} className="text-gray-700 hover:text-[#4BBCD7] transition-colors">
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-gray-700">{contact.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2">
                <motion.div
                  className="bg-[#4BBCD7]/5 p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Connect with me</h4>
                  <p className="text-gray-600 mb-6">
                    Feel free to reach out for collaborations, questions, or just to say hello! I'm always open to
                    discussing new projects and opportunities.
                  </p>

                  <div className="flex gap-4">
                    {[
                      { icon: <Github size={20} />, href: "https://github.com/farisgozi", label: "GitHub" },
                      { icon: <Linkedin size={20} />, href: "www.linkedin.com/in/muhammad-faris-gozi-a297a62a1", label: "LinkedIn" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[#4BBCD7] hover:bg-[#4BBCD7] hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                        <span>{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-white/50 backdrop-blur-sm py-6 text-center text-gray-600 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <p>© 2025 Muhammad Faris Gozi. All rights reserved.</p>
        </div>
      </motion.footer>
    </main>
  )
}
