"use client"

import { useEffect, useState } from "react"
import { Calendar, MapPinned } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const slides = [
  "https://www.ananindeua.pa.gov.br/midias/2024/grandes/up_ag_7095_eaa423a0-5164-7b04-2884-7d6233fa8d64.jpg",
  "/image.png",
]

export function ProximoEventoPage() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000) // troca a cada 6 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* SLIDESHOW DE FUNDO */}
      <div className="absolute inset-0">
        {slides.map((src, index) => (
          <div
            key={src}
            className={`
              absolute inset-0 bg-cover bg-center bg-fixed
              transition-opacity duration-1000
              ${index === current ? "opacity-100" : "opacity-0"}
            `}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* overlay leve por cima das imagens para dar contraste ao conteúdo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/80 via-background/30 to-background/80"
      />

      <div className="relative z-10 w-full px-4">
        {/* HERO */}
        <section className="py-0">
          <div className="container mx-auto">
            <div className="relative mx-auto max-w-7xl">
              {/* blur centralizado atrás da caixa */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-10 rounded-[40px] bg-background/40 blur-4xl"
              />

              {/* CAIXA COM CONTEÚDO */}
              <div className="relative rounded-2xl border-2 border-border/70 bg-background/40 p-8 md:p-10 text-center shadow-xl backdrop-blur-2xl">
                <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary mb-2">
                  Próximo evento
                </p>

                <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-tight text-primary">
                  Python Norte 2026
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mt-4 mb-6 md:mb-8">
                  O encontro da comunidade Python na região Norte do Brasil.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mb-6 md:mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 text-sm border border-border/60 shadow-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3>3 a 5 de julho de 2026</h3>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/40 text-sm border border-border/60 shadow-sm">
                    <MapPinned className="h-4 w-4 text-primary" />
                    <span>Ananindeua • Pará</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-1">
                  <Button variant="norte" asChild size="lg">
                    <Link href="http://even3.com.br/python-norte-2026-631670?">Ingressos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
