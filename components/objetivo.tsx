import { Code2, Users, TrendingUp } from "lucide-react"

export function Objetivo() {
  const objetivos = [
    {
      icon: Code2,
      label: "Promover o uso da linguagem Python",
      description:
        "Divulgar a linguagem, boas práticas de uso e suas aplicações em diversas áreas. Além de ajudar a fortalecer as comunidades locais na região Norte do Brasil.",
    },
    {
      icon: Users,
      label: "Compartilhar conhecimento e experiências",
      description:
        "Conhecimento é liberdade! As comunidades devem ser pontes e não muros. Buscamos sempre promover a troca de experiências entre os participantes.",
    },
    {
      icon: TrendingUp,
      label:
        "Incentivar e crescer junto com a comunidade local",
      description:
        "Acreditamos no crescimento conjunto. Nosso objetivo é fortalecer a comunidade Python na região Norte do Brasil, promovendo o compartilhamento de conhecimento, networking e o crescimento profissional dos participantes.",
    },
  ]

  return (
    <section
      id="objetivo"
      aria-labelledby="objetivo-heading"
      className="relative overflow-hidden py-14 md:py-28 bg-gradient-to-br from-muted/60 via-muted/40 to-muted/20"
    >
      {/* background decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/quadradinho.png')] bg-repeat opacity-60"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2
            id="objetivo-heading"
            className="text-balance text-center text-4xl md:text-6xl font-bold text-primary tracking-tight"
          >
            Objetivo
          </h2>

          <h3 className="mt-6 text-center text-lg md:text-xl text-foreground/90">
            Nosso objetivo é fortalecer a comunidade Python na região Norte do Brasil,
            promovendo o compartilhamento de conhecimento, networking e o crescimento
            profissional dos participantes.
          </h3>

          {/* Lista de objetivos */}
          <h3 className="sr-only">Objetivos do evento</h3>
          <ul className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
            {objetivos.map((item) => (
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
                <p className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {item.label}
                </p>
                <p className="mt-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground/85">
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
