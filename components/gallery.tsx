"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink, X } from "lucide-react"

type ImageItem = {
  year: string
  city: string
  query: string
  src?: string
}

export function Gallery() {
  const images: ImageItem[] = [
    { year: "2023", city: "Fortaleza, CE", query: "python conference audience attendees", src: "/54031670507_d1e7fb8bb9_b.jpg" },
    { year: "2024", city: "Recife, PE", query: "tech conference keynote speaker", src: "/foto-2024-1.jpg" },
    { year: "2022", city: "Natal, RN", query: "developers networking at conference", src: "/foto-2022-1.jpg" },
    { year: "2019", city: "Recife, PE", query: "python programming workshop", src: "/foto-2019-1.jpg" },
    { year: "2023", city: "Fortaleza, CE", query: "tech community meetup group photo", src: "/foto-2023-2.jpg" },
    { year: "2024", city: "Recife, PE", query: "conference exhibition booths", src: "/foto-2024-2.jpg" },
  ]

  const [activeImage, setActiveImage] = useState<ImageItem | null>(null)

  // (Opcional) bloquear scroll quando o modal estiver aberto
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeImage])

  // (Opcional) fechar com ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveImage(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section id="galeria" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Galeria de Momentos</h2>
          <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty">
            Aqui uma pequena amostra dos momentos incríveis que vivemos juntos nas edições anteriores da Python Norte.
            Cada imagem conta uma história de aprendizado, conexão e celebração da comunidade Python na região Norte do
            Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => image.src && setActiveImage(image)}
              className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-muted border-2 hover:shadow-xl transition-all cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <img
                src={image.src}
                alt={`${image.year} - ${image.city}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="font-bold text-lg">{image.year}</div>
                  <div className="text-sm opacity-90">{image.city}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 bg-transparent">
            <ExternalLink className="w-5 h-5 mr-2" />
            Ver mais fotos
          </Button>
        </div>
      </div>

      {/* Modal de zoom */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // não fechar ao clicar na imagem
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/70 hover:bg-black text-white p-1.5 rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <img
              src={activeImage.src}
              alt={`${activeImage.year} - ${activeImage.city}`}
              className="w-full max-h-[90vh] object-contain rounded-lg"
            />

            <div className="mt-3 text-center text-sm text-muted-foreground">
              {activeImage.year} • {activeImage.city}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
