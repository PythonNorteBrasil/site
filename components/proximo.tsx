"use client"

import { Calendar, MapPinned, Users, Ticket, Plane, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProximoEventoPage() {

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-muted/20 to-background pb-16 bg-[url('/image.png')] optimize-speed bg-cover bg-center bg-fixed">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background"
      />

      <div className="relative z-10">
        {/* HERO */}
        <section className="pt-20 md:pt-20 pb-10 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-semibold tracking-[0.22em] uppercase text-primary mb-2">
                Próximo evento
              </p>
              <h1 className="text-balance text-4xl md:text-6xl font-bold tracking-tight text-primary">
                Python Norte 2026
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
                A próxima edição da conferência que conecta a comunidade Python da região Norte
                chega em <span className="font-semibold text-foreground">2026</span>, com ainda mais
                diversidade, inclusão e impacto social.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-6 md:mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 text-sm border border-border/60 shadow-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>3 a 5 de julho de 2026</span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/70 text-sm border border-border/60 shadow-sm">
                  <MapPinned className="h-4 w-4 text-primary" />
                  <span>Ananindeua • Pará</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-1">
                <Button asChild size="lg">
                  <Link href="#detalhes">Ingressos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
