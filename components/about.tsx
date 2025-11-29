import { Calendar, MapPinned, Heart } from "lucide-react"

export function About() {
  const highlights = [
    { icon: MapPinned, label: "Itinerante", description: "A cada nova edição, exploramos uma cidade diferente na região Norte para celebrar a diversidade e a inovação tecnológica." },
    { icon: Calendar, label: "3 dias", description: "Durante três dias, oferecemos uma programação diversificada com tutoriais, palestras, workshops e sessões de networking." },
    { icon: Heart, label: "100% voluntária", description: "A Python Norte é um evento 100% voluntário, feito pela comunidade e para a comunidade, promovendo a colaboração e o espírito de união e inclusão." },
  ]

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="relative overflow-hidden py-14 md:py-28 bg-gradient-to-br from-muted/20 via-muted/40 to-muted/20"
    >
      {/* background decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/background_bottom.png')] bg-repeat opacity-40"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2
            id="sobre-heading"
            className="text-balance text-center text-4xl md:text-6xl pb-40 font-bold text-primary tracking-tight"
          >
            O que é a Python Norte?
          </h2>

          <div className="rounded-3xl border border-border/70 bg-background/10 p-6 md:p-10 shadow-xl backdrop-blur-md transition-shadow motion-safe:hover:shadow-2xl mb-20">
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-pretty text-lg md:text-xl leading-relaxed text-foreground/100">
                <strong>Python Norte</strong> é a maior conferência sobre a linguagem de programação <strong>Python</strong> voltado para a região Norte do Brasil,
                apoiado pela <strong>Associação Python Brasil</strong> (ApyB) e pela <strong>Python Software Foundation</strong> (PSF).
              </p>
              <p className="text-pretty text-lg md:text-xl leading-relaxed text-foreground/90 mt-5">
                Nossa missão é clara: democratizar o acesso à tecnologia, fortalecer as comunidades locais e criar
                oportunidades reais de crescimento e conexão na região Norte. Acreditamos que o conhecimento
                compartilhado transforma vidas e impulsiona o desenvolvimento tecnológico em toda a região.
              </p>
              <p className="text-pretty text-lg md:text-xl leading-relaxed text-foreground/90 mt-5">
                O evento reúne entusiastas, profissionais, estudantes e especialistas de diversas áreas para
                compartilhar experiências, aprender novas habilidades e colaborar em projetos inovadores.
              </p>
              <p className="text-pretty text-lg md:text-xl leading-relaxed text-foreground/90 mt-5">
                A Python Norte é dividida em três dias repletos de atividades, incluindo tutoriais, palestras, lightlarks, workshops e muitas sessões de networking,
              </p>
            </div>
          </div>

          {/* Destaques */}
          <h3 className="sr-only">Destaques do evento</h3>
          <ul className="mt-28 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
            {highlights.map((item) => (
              <li
                key={item.label}
                className="group rounded-2xl border-2 border-border/60 bg-background/10 p-7 text-center shadow-lg backdrop-blur-xl transition-all motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-2xl motion-safe:hover:border-primary/50"
              >
                <div
                  aria-hidden="true"
                  className="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/15 shadow-md transition-transform motion-safe:group-hover:scale-105"
                >
                  <item.icon className="h-10 w-10 text-primary transition-colors group-hover:text-accent" />
                </div>
                <p className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                  {item.label}
                </p>
                <p className="mt-2 text-base text-muted-foreground transition-colors group-hover:text-foreground/85">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
