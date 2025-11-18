import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function Gallery() {
  const images = [
    { year: "2023", city: "Fortaleza, CE", query: "python conference audience attendees" },
    { year: "2024", city: "Recife, PE", query: "tech conference keynote speaker" },
    { year: "2022", city: "Natal, RN", query: "developers networking at conference" },
    { year: "2019", city: "Recife, PE", query: "python programming workshop" },
    { year: "2023", city: "Fortaleza, CE", query: "tech community meetup group photo" },
    { year: "2024", city: "Recife, PE", query: "conference exhibition booths" },
  ]

  return (
    <section id="galeria" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Galeria de Momentos</h2>
          <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty">
            Aqui uma pequena amostra dos momentos incríveis que vivemos juntos nas edições anteriores da Python Norte. Cada imagem conta uma história de aprendizado, conexão e celebração da comunidade Python na região Norte do Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-[4/3] bg-muted border-2 hover:shadow-xl transition-all"
            >
              <img
                src={`/.jpg?height=400&width=600&query=${image.query}`}
                alt={`${image.year} - ${image.city}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="font-bold text-lg">{image.year}</div>
                  <div className="text-sm opacity-90">{image.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-2 bg-transparent">
            <ExternalLink className="w-5 h-5 mr-2" />
            Ver mais fotos
          </Button>
        </div>
      </div>
    </section>
  )
}
