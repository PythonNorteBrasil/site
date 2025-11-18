import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Python Norte — A maior conferência da comunidade Python do Norte do Brasil",
  description:
    "Desde 2015: conectando desenvolvedores, compartilhando conhecimento e celebrando a comunidade Python Nortista. Feito pela comunidade e para a comunidade.",
  generator: "v0.app",
  keywords: ["Python", "conferência", "Norte", "Brasil", "programação", "desenvolvimento", "comunidade"],
  openGraph: {
    title: "Python Norte — A maior conferência Python do Norte",
    description:
      "Desde 2015: conectando desenvolvedores, compartilhando conhecimento e celebrando a comunidade Python Nortista.",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
