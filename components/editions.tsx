import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Bell } from "lucide-react";

export function Editions() {
  const editions = [
    {
      year: "2025",
      city: "Belém, PA",
      participants: 246,
      logo: "/logo_pn2025_maior.svg",
      title: "Python Norte 2025",
    },
    {
      year: "2024",
      city: "Itacoatiara, AM",
      participants: 200,
      logo: "/logo_pyn2024_maior.png",
      title: "Python Norte 2024",
    },
    {
      year: "2023",
      city: "Manaus, AM",
      participants: 230,
      logo: "/logo_pn2023.svg",
      title: "Python Norte 2023",
    },
    {
      year: "2022",
      city: "Manaus, AM",
      participants: 230,
      logo: "/logo_pn2023.svg",
      title: "Python Brasil 2022",
    },
  ];

  return (
    <section id="edicoes" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className=" mb-12">
            <h2 className="text-center text-5xl md:text-5xl font-bold mb-4 text-secondary py-4">
              Nossa história
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty mb-3">
              A trajetória do evento Python Norte se inicia em 2017 com a PyCon
              Amazônia. Evento que pretendia unificar a Amazônia Legal em prol
              da criação de uma comunida internacional.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty mb-3">
              Em 2022 a comunidade resurge como Python Norte e realiza a Python
              Brasil na cidade de Manaus/AM. A maior conferência da comunidade
              Python de toda a América Latina, a primeira Python Brasil na
              região norte do país.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty mb-3">
              Em 2023 a comunidade Python Norte se consolida como referência
              regional da comunidade Python no Norte do Brasil. A realização da
              Python Norte em 2023 formentou no surgimento de novas comunidades
              e mais visibilidade nacional para a região norte do país,
              iniciando eventos de tecnologia fora do eixo sul-sudeste
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty mb-3">
              Em 2024 o evento chega ao interior do estado do Amazonas, na
              cidade de Itacoatiara/AM. Mostrando a fibra e a coragem de toda a
              comunidade Python do Norte e com apoio da comunidade Python Brasil
              o evento leva para o interior do estado o lema de inclusão,
              diversidade e acolhimento até nos locais mais distantes das
              capitais.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty mb-3">
              Em 2025 a Python Norte chega em Belém do Pará. Mostrando para o
              Brasil e o para o mundo a imensa riquesa e potencial das
              comunidades paraenses de tecnologia, fortelecendo a trajetória
              iniciada em 2022 com a primeira Python Brasil no norte do país.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* Linha vertical */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/40 to-accent/50 -translate-x-1/2" />

            <div className="space-y-10">
              {editions.map((edition, index) => (
                <div
                  key={index}
                  className={`
          group relative flex flex-col md:flex-row items-center gap-6 md:gap-10
          ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
        `}
                >
                  {/* Espaço lateral para alinhar com a linha central (somente desktop) */}
                  <div className="hidden md:block flex-1" />

                  {/* Ponto central */}
                  <div className="hidden md:flex items-center justify-center relative z-10">
                    <div className="w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg transition-transform duration-200 group-hover:scale-110" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 w-full">
                    <Card className="relative p-6 md:p-7 rounded-2xl border border-border/60 bg-background/90 backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                      {/* Chip do ano */}
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
                        {edition.title}
                      </span>

                      <div className="flex flex-col md:flex-row gap-5 md:gap-6 items-start">
                        {/* Logo */}
                        <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center rounded-xl bg-muted/60 border border-border/60 overflow-hidden">
                          {edition.logo && (
                            <img
                              src={edition.logo}
                              alt={`Logo Python Norte ${edition.year}`}
                              className="w-full h-full object-contain"
                            />
                          )}
                        </div>

                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap gap-3">
                            <a
                              href="#"
                              className="inline-flex items-center gap-2 text-xs md:text-sm rounded-full bg-primary/5 px-3 py-1 text-primary hover:bg-primary/10 hover:underline transition-colors"
                            >
                              <Bell className="w-4 h-4" />
                              Programação
                            </a>
                            <a
                              href="#"
                              className="inline-flex items-center gap-2 text-xs md:text-sm rounded-full bg-accent/5 px-3 py-1 text-primary hover:bg-accent/10 hover:underline transition-colors"
                            >
                              <Calendar className="w-4 h-4" />
                              Fotos
                            </a>
                          </div>

                          {/* Local */}
                          <div className="flex items-center gap-2 text-base md:text-lg font-semibold text-foreground mt-2">
                            <MapPin className="w-5 h-5 text-accent" />
                            <span>{edition.city}</span>
                          </div>

                          {/* Participantes */}
                          <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>{edition.participants} participantes</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
