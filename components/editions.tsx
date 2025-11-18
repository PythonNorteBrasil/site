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
    },
    {
      year: "2024",
      city: "Itacoatiara, AM",
      participants: 200,
      logo: "/logo_pyn2024_maior.png",
    },
    {
      year: "2023",
      city: "Manaus, AM",
      participants: 230,
      logo: "/logo_pn2023.svg",
    },
  ];

  return (
    <section id="edicoes" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              Nossa história
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty">
              Desde 2023, a Python Norte tem sido uma jornada incrível de
              aprendizado, conexão e crescimento para a comunidade Python na
              região Norte do Brasil. Cada edição do evento trouxe consigo novas
              experiências, desafios superados e, acima de tudo, uma paixão
              compartilhada pela linguagem Python e pela tecnologia.
            </p>
          </div>

          {/* Next Edition Banner */}
          <Card className="p-6 md:p-8 mb-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <Badge className="mb-3 bg-primary-foreground text-primary">
                  Próxima Edição
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Python Norte 2026
                </h3>
                <p className="text-lg opacity-90 flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-5 h-5" />
                  Anaindeua/PA
                  <span className="mx-2">•</span>
                  <Calendar className="w-5 h-5" />
                  de 3 a 5 de julho de 2026
                </p>
                <Button
                  asChild
                  className="mt-4 px-8 py-6 text-lg font-bold bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
                >
                  <a
                    href="https://www.even3.com.br/python-norte-2026-631670"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ingressos
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2" />

            <div className="space-y-8">
              {editions.map((edition, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Left/Right spacing */}
                  <div className="hidden md:block flex-1" />

                  {/* Center dot */}
                  <div className="hidden md:block relative z-10">
                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 w-full">
                    <Card className="p-6 hover:shadow-lg transition-all bg-card border-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="w-40 h-40">
                              {edition.logo && (
                                <img
                                  src={edition.logo}
                                  alt={`Logo Python Norte ${edition.year}`}
                                  className="w-full h-full object-contain"
                                />
                              )}
                            </div>
                          </div>{" "}
                          <div className="flex flex-col gap-2 py-2">
                            <a
                              href="#"
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <Bell className="w-4 h-4" />
                              Programação
                            </a>
                            <a
                              href="#"
                              className="flex items-center gap-2 text-primary hover:underline"
                            >
                              <Calendar className="w-4 h-4" />
                              Fotos
                            </a>
                          </div>{" "}
                          <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-foreground">
                            <MapPin className="w-5 h-5 text-accent" />
                            {edition.city}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {edition.participants} participantes
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
