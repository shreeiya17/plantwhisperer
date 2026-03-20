import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Inter is a clean, modern font — professional choice
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlantWhisperer — Your AI Plant Expert",
  description: "Identify plants, diagnose symptoms, and become a better plant parent with AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode   // TypeScript: children must be React elements
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}