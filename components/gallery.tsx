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
    { year: "2022", city: "Manaus/AM", query: "Python Brasil 2022", src: "/assets/gallery/2022/52456365547_5231fc970d_o.png" },
    { year: "2022", city: "Manaus/AM", query: "Python Brasil 2022", src: "/assets/gallery/2022/52456380027_5e28d38fee_o.jpg" },

    { year: "2023", city: "Manaus/AM", query: "Python Norte 2023", src: "/assets/gallery/2023/53231412486_a64dbe8281_b.jpg" },
    { year: "2023", city: "Manaus/AM", query: "Python Norte 2023", src: "/assets/gallery/2023/53231714689_894bb89745_b.jpg" },
    { year: "2023", city: "Manaus/AM", query: "Python Norte 2023", src: "/assets/gallery/2023/53230498102_b4c637890a_b.jpg" },
    { year: "2023", city: "Manaus/AM", query: "Python Norte 2023", src: "/assets/gallery/2023/53231941755_7c37d6e477_b.jpg" },

    { year: "2024", city: "Itacoatiara/AM", query: "Python Norte 2024", src: "/assets/gallery/2024/54032804453_cfef802556_b.jpg" },
    { year: "2024", city: "Itacoatiara/AM", query: "Python Norte 2024", src: "/assets/gallery/2024/54032877279_5eaa5ea969_b.jpg" },
    { year: "2024", city: "Itacoatiara/AM", query: "Python Norte 2024", src: "/assets/gallery/2024/54033003810_5a4fa2cd61_b.jpg" },
  ]

  const [activeImage, setActiveImage] = useState<ImageItem | null>(null)
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  // (Opcional) bloquear scroll quando algum modal estiver aberto
  useEffect(() => {
    if (activeImage || isMoreOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeImage, isMoreOpen])

  // (Opcional) fechar com ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveImage(null)
        setIsMoreOpen(false)
      }
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
          <Button
            size="lg"
            variant="outline"
            className="border-2 bg-transparent"
            type="button"
            onClick={() => setIsMoreOpen(true)}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Ver mais fotos
          </Button>
        </div>
      </div>

      {/* Modal de zoom da imagem */}
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

      {/* Modal "Ver mais fotos" com links do Flickr */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-lg bg-background border shadow-xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()} // não fechar ao clicar dentro
          >
            <button
              type="button"
              onClick={() => setIsMoreOpen(false)}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/70 hover:bg-black text-white p-1.5 rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary text-center">
              Ver mais fotos no Flickr
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 text-center">
              Confira as galerias completas das edições da Python Norte no Flickr.
            </p>

            <div className="space-y-3">
              <a
                href="https://www.flickr.com/photos/pythonbrasil/albums/72177720303213577/" // TODO: substituir link real
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full rounded-md border px-4 py-3 text-sm md:text-base hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>Python Brasil 2022 – Manaus/AM</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://www.flickr.com/photos/199250629@N02/albums/72177720311661136/" // TODO: substituir link real
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full rounded-md border px-4 py-3 text-sm md:text-base hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>Python Norte 2023 – Manaus/AM</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://www.flickr.com/photos/199250629@N02/albums/72177720320720177" // TODO: substituir link real
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full rounded-md border px-4 py-3 text-sm md:text-base hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>Python Norte 2024 – Itacoatiara/AM</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://www.flickr.com/photos/203114989@N04/albums/72177720327337621/" // TODO: substituir link real
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between w-full rounded-md border px-4 py-3 text-sm md:text-base hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <span>Python Norte 2025 – Belém/PA</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
