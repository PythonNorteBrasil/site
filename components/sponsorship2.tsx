import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Eye,
  Users,
  Handshake,
  Heart,
  Briefcase,
  Check,
} from "lucide-react"

export function SponsorshipV2() {
  const benefits = [
    {
      icon: Eye,
      title: "Visibilidade regional",
      description: "Sua marca em destaque na região Norte do Brasil.",
    },
    {
      icon: Users,
      title: "Público qualificado",
      description: "Devs, arquitetos, gestores e líderes de comunidades.",
    },
    {
      icon: Handshake,
      title: "Networking",
      description:
        "Conexão direta com lideranças, profissionais e entusiastas.",
    },
    {
      icon: Heart,
      title: "Responsabilidade social",
      description: "Apoio à inclusão e diversidade em tecnologia.",
    },
    {
      icon: Briefcase,
      title: "Recrutamento",
      description: "Aproximação com talentos Python da região.",
    },
  ]

  const sponsorshipTiers = [
    {
      name: "Diamante 💎",
      color: "from-primary to-primary/90",
      featured: true,
      benefits: [
        "6 PyTickets* + 3 PyDiversity** + 4 PyAmazônida***",
        "Logotipo com maior destaque no site do evento com link",
        "4 posts em mídias sociais + 2 Reels + 2 vídeos",
        "Vídeo publicitário antes de keynote presencial (até 30s)",
        "Stand Premium (localização privilegiada)",
        "Material promocional no kit do participante",
        "Logo com maior destaque em materiais impressos e digitais",
        "Menção com maior destaque em redes sociais",
        "Agradecimento na abertura e encerramento",
        "3 sessões de feira de empregos",
        "Desconto em próximas edições da Python Norte",
      ],
    },
    {
      name: "Ouro 🥇",
      color: "from-secondary to-secondary/70",
      featured: false,
      benefits: [
        "4 PyTickets* + 2 PyDiversity** + 3 PyAmazônida***",
        "Logotipo com destaque no site do evento com link",
        "3 posts em mídias sociais + 2 Reels + 2 vídeos",
        "Stand privilegiado no salão de eventos",
        "Material promocional no kit do participante",
        "Logo com destaque em materiais impressos e digitais",
        "Menção com destaque em redes sociais",
        "Agradecimento na abertura e encerramento",
        "3 sessões de feira de empregos",
      ],
    },
    {
      name: "Prata 🥈",
      color: "from-accent to-accent/70",
      featured: false,
      benefits: [
        "2 PyTickets* + 1 PyDiversity** + 2 PyAmazônida***",
        "Logotipo no site do evento com link",
        "2 posts em mídias sociais + 2 Reels",
        "Logo em materiais impressos e digitais",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
        "2 sessões de feira de empregos",
      ],
    },
    {
      name: "Bronze 🥉",
      color: "from-amber-500 to-amber-600",
      featured: false,
      benefits: [
        "4 PyTickets*",
        "Logotipo no site do evento com link",
        "2 posts em mídias sociais",
        "Logo em materiais impressos e digitais",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
      ],
    },
    {
      name: "Apoio – Gratuito! 🙌",
      color: "from-sky-500 to-sky-600",
      featured: false,
      benefits: [
        "Logo no site do evento",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
      ],
    },
  ]

  return (
    <section
      id="apoiar"
      className="relative py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-background to-primary/10"
    >
      {/* fundo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/background_bottom.png')] bg-repeat opacity-10"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Cabeçalho em 2 colunas */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start mb-14">
            <div className="text-left lg:text-left">
              <p className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Patrocínio & apoio
              </p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary tracking-tight text-balance">
                Apoie a Python Norte!
              </h2>
              <p className="text-base md:text-lg text-muted-foreground text-pretty">
                Pessoas + tecnologia = muito suporte! Para que o evento aconteça
                com a qualidade que todos merecem, precisamos da colaboração de
                empresas como a sua. Se sua marca quer estar no topo do{" "}
                <span className="font-semibold text-foreground">
                  Python pot
                </span>{" "}
                e fazer parte de um evento impactante no Norte do país, temos um
                lugar especial no nosso <span className="font-semibold">Tacacá Stand</span>{" "}
                só para você.
              </p>
              <p className="mt-3 text-base text-muted-foreground">
                Venha ser um apoiador da Python Norte e ajude a fortalecer a
                comunidade tecnológica da região!
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#contato">Quero ser apoiador</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/40 text-primary hover:bg-primary/10"
                >
                  <a href="#planos">Ver planos de patrocínio</a>
                </Button>
              </div>
            </div>

            {/* Resumo rápido / destaque */}
            <Card className="relative overflow-hidden border-2 border-primary/40 bg-background/80 p-6 shadow-xl backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(to_right,#d65332,#f39a1b,#f7dd93,#7fa84c,#1180b5)]" />
              <h3 className="mt-4 mb-2 text-lg font-semibold text-primary">
                Por que apoiar?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mais do que um logo em um banner: sua empresa apoia a formação
                de uma comunidade diversa, conectada e com impacto real na
                região Norte.
              </p>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>• Alcance regional com foco em tecnologia.</li>
                <li>• Presença em atividades, conteúdos e networking.</li>
                <li>• Fortalecimento da marca junto à comunidade Python.</li>
              </ul>
            </Card>
          </div>

          {/* Benefícios */}
          <div className="mb-14">
            <h3 className="text-center text-2xl md:text-3xl font-bold text-primary tracking-tight mb-6">
              Benefícios para sua empresa
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 border-border/70 bg-background/80 p-6 shadow-md backdrop-blur-xl transition-all motion-safe:hover:-translate-y-1.5 motion-safe:hover:shadow-2xl motion-safe:hover:border-primary/50"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 via-secondary/60 to-accent/60 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/20 mb-4 shadow-sm group-hover:scale-105 transition-transform">
                    <benefit.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h4 className="text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Planos de Patrocínio */}
          <div id="planos">
            <Card className="p-7 md:p-9 bg-muted/40 border-2 shadow-lg">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                  Planos de apoio e patrocínio
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Cada nível oferece benefícios exclusivos para sua empresa,
                  garantindo visibilidade e conexão direta com a comunidade
                  Python do Norte. Escolha o plano que melhor se adapta à sua
                  estratégia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {sponsorshipTiers.map((tier, index) => {
                  const isFeatured = tier.featured
                  return (
                    <div
                      key={index}
                      className={`
                        relative flex h-full flex-col rounded-2xl border-2 bg-gradient-to-br ${tier.color}
                        text-primary-foreground shadow-xl overflow-hidden
                        ${isFeatured ? "md:col-span-2 xl:col-span-1 ring-2 ring-primary/70 scale-[1.01]" : ""}
                      `}
                    >
                      {isFeatured && (
                        <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary shadow-md">
                          Mais recomendado
                        </div>
                      )}
                      <div className="p-6 pb-5">
                        <h4 className="text-xl font-bold mb-1">{tier.name}</h4>
                        <p className="text-xs opacity-90">
                          Pacote completo de benefícios e máxima visibilidade.
                        </p>
                      </div>
                      <div className="bg-background/10 px-6 pb-6 pt-2 flex-1">
                        <ul className="space-y-2 text-sm">
                          {tier.benefits.map((benefit, bIndex) => (
                            <li key={bIndex} className="flex items-start gap-2">
                              <Check className="mt-[2px] h-4 w-4 flex-shrink-0 opacity-90" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-center text-xs md:text-sm text-muted-foreground mb-6">
                (*) PyTickets: ingressos gratuitos. <br />
                (**) PyDiversity: ingressos patrocinados para pessoas LGBTQIAPN+
                e pessoas negras. <br />
                (***) PyAmazônida: ingressos patrocinados para povos amazônicos
                que vivem em estados do interior da Região Norte.
              </p>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-10 py-6"
                >
                  <a href="#contato">Quero ser apoiador</a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
