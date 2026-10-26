import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Navigation } from "@/components/navigation"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
})

// Add Host Grotesk font
const hostGrotesk = `
  @import url('https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap');
`

export const metadata: Metadata = {
  title: "Faris Gozi | Portfolio",
  description:
    "Portfolio Muhammad Faris Gozi — Google Student Ambassador Class of 2026, Beasiswa Unggulan UMB, software developer (AI & backend).",
    generator: 'gozi.my.id'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
