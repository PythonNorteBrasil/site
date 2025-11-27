import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Python Norte — A maior conferência da comunidade Python do Norte do Brasil",
  description:
    "desde 2017: conectando desenvolvedores, compartilhando conhecimento e celebrando a comunidade Python Amazônida e nortista.",
  generator: "v0.app",
  keywords: ["Python", "conferência", "Norte", "Brasil", "programação", "desenvolvimento", "comunidade"],
  openGraph: {
    title: "Python Norte — A maior conferência Python do Norte do Brasil",
    description:
      "desde 2017: conectando desenvolvedores, compartilhando conhecimento e celebrando a comunidade Python Amazônida e nortista.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/favico.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favico.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favico.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/favico.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
