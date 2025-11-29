"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Users, Handshake, Heart, Briefcase } from "lucide-react";

export function Sponsorship() {
  const benefits = [
    {
      icon: Eye,
      title: "Visibilidade Regional",
      description:
        "Exposição da marca como apoiadora de tecnologia na Amazônia e na regirão Norte do Brasil.",
    },
    {
      icon: Users,
      title: "Público Qualificado",
      description:
        "Além de pessoas mais iniciantes, alcançamos desenvolvedores experientes e líderes de comunidade.",
    },
    {
      icon: Handshake,
      title: "Networking",
      description:
        "Conexão direta com profissionais, entusiastas e líderes da comunidade Python, criadores de conteúdo, e influenciadores locais, regionais e nacionais.",
    },
    {
      icon: Heart,
      title: "Responsabilidade Social",
      description:
        "Sua marca ficará associada a um evento que promove a inclusão, diversidade e o crescimento tecnológico na região Norte.",
    },
    {
      icon: Briefcase,
      title: "Recrutamento",
      description:
        "Oportunidade de atrair talentos locais para sua empresa, fortalecendo sua equipe com profissionais engajados e capacitados.",
    },
    {
      icon: Users,
      title: "Formentador de inovação e tecnologia local",
      description:
        "Apoiar a Python Norte é investir no desenvolvimento tecnológico da região Norte do Brasil, fomentando a inovação e o crescimento econômico local.",
    },
  ];

  const sponsorshipTiers = [
    {
      name: "Diamante 💎",
      highlight: "Maior visibilidade",
      color: "from-primary to-primary/90",
      benefits: [
        "6 PyTickets* + 3 PyDiversity** + 4 PyAmazônida***",
        "Logotipo com maior destaque no site do evento com link para o site da empresa",
        "4 posts em mídias sociais + 2 reels + 2 vídeos",
        "Vídeo publicitário antes de keynote presencial (até 30s)",
        "Stand Premium (localização privilegiada)",
        "Material promocional no kit do participante",
        "Logo com maior destaque em materiais impressos e digitais (banners, backdrops, crachás)",
        "Menção com maior destaque em redes sociais",
        "Agradecimento na abertura e encerramento",
        "3 sessões de feira de empregos",
        "Desconto nas próximas edições do evento",
      ],
    },
    {
      name: "Ouro 🥇",
      highlight: "Destaque garantido",
      color: "from-secondary to-secondary/80",
      benefits: [
        "4 PyTickets* + 2 PyDiversity** + 3 PyAmazônida***",
        "Logotipo com destaque no site do evento com link para o site da empresa",
        "3 posts em mídias sociais + 2 reels + 2 vídeos",
        "Stand privilegiado (no salão de eventos)",
        "Material promocional no kit do participante",
        "Logo com destaque em materiais impressos e digitais (banners, backdrops, crachás)",
        "Menção com destaque em redes sociais",
        "Agradecimento na abertura e encerramento",
        "3 sessões de feira de empregos",
      ],
    },
    {
      name: "Prata 🥈",
      highlight: "Boa exposição",
      color: "from-accent to-accent/70",
      benefits: [
        "2 PyTickets* + 1 PyDiversity** + 2 PyAmazônida***",
        "Logotipo no site do evento com link para o site da empresa",
        "2 posts em mídias sociais + 2 reels",
        "Logo em materiais impressos e digitais (banners, backdrops, crachás)",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
        "2 sessões de feira de empregos",
      ],
    },
    {
      name: "Bronze 🥉",
      highlight: "Entrada no ecossistema",
      color: "from-muted to-muted/80",
      benefits: [
        "4 PyTickets*",
        "Logotipo no site do evento com link para o site da empresa",
        "2 posts em mídias sociais",
        "Logo em materiais impressos e digitais (banners, backdrops, crachás)",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
      ],
    },
    {
      name: "Apoio - Gratuito! 🙌",
      color: "from-background to-muted/60",
      benefits: [
        "Logo no site do evento",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
      ],
    },
  ];

  const mainTiers = sponsorshipTiers.slice(0, 4);
  const supportTier = sponsorshipTiers[4];

  return (
    <section id="apoiar" className="relative py-20 md:py-28">
      {/* Imagem de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/54635610770_b2cbf396d6_b.jpg')] bg-cover bg-center"
      />
      {/* Overlay com gradiente + leve blur para legibilidade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/10 via-background/10 to-background/0 "
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-10xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-6xl md:text-6xl font-bold mb-4 tracking-tight">
              Apoie a Python Norte!
            </h2>
            <p className="text-lg md:text-xl mx-auto text-pretty max-w-7xl leading-relaxed">
              Pessoas + tecnologia = muito suporte!
              <br />
              Para que esse evento aconteça com a qualidade que todos merecem,
              contamos com empresas que acreditam no potencial da região Norte.
              Venha fazer parte desse movimento e fortalecer a comunidade Python
              na Amazônia.
            </p>
          </div>

          {/* Benefícios gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 h-full border-border/70 bg-background/85 backdrop-blur-sm shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg text-center font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-center leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Planos principais com elevação */}
          <div className="relative">
            {/* Glow / sombra suave atrás do card principal */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 -inset-y-4 rounded-[32px] bg-black/20 blur-3xl"
            />

            <Card className="relative p-8 md:p-10 bg-background/95 border-border/70 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl mb-8 rounded-3xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-foreground">
                    Planos de apoio e patrocínio
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
                    Escolha a categoria que melhor se conecta com a estratégia
                    da sua empresa e garanta presença em um dos maiores
                    encontros de Python da região Norte.
                  </p>
                </div>
                <div className="text-sm md:text-base text-muted-foreground md:text-right">
                  <p>
                    Todos os planos oferecem visibilidade, conexão com a
                    comunidade e oportunidades de negócio.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                {mainTiers.map((tier, index) => (
                  <div
                    key={tier.name}
                    className={`
                      relative flex flex-col h-full rounded-2xl overflow-hidden
                      bg-gradient-to-br ${tier.color}
                      text-primary-foreground shadow-xl
                    `}
                  >
                    {/* selo destaque */}
                    {index === 0 && (
                      <div className="absolute right-3 top-3 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold">
                        Mais completo
                      </div>
                    )}

                    <div className="p-6 flex flex-col gap-4 h-full bg-black/15">
                      <div>
                        <h4 className="text-lg font-bold leading-tight">
                          {tier.name}
                        </h4>
                        {tier.highlight && (
                          <p className="text-xs mt-1 text-primary-foreground/90 text-4xl">
                            {tier.highlight}
                          </p>
                        )}
                      </div>

                      <ul className="mt-2 space-y-2  leading-relaxed">
                        {tier.benefits.map((benefit, bIndex) => (
                          <li key={bIndex} className="flex gap-1">
                            <span className="mt-1 text-[10px]">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-border/70 bg-muted/40 p-5 md:p-6">
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  {supportTier.name}
                </h4>
                <p className="text-sm mb-3">
                  Para marcas e comunidades que querem começar a apoiar a
                  comunidade de forma simples e acessível.
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {supportTier.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 space-y-4">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  (*) <strong>PyTickets</strong>: ingressos gratuitos.
                  <br />
                  (**) <strong>PyDiversity</strong>: ingressos patrocinados para
                  pessoas LGBTQIAPN+ e pessoas negras.
                  <br />
                  (***) <strong>PyAmazônida</strong>: ingressos patrocinados
                  para povos amazônicos que vivem em estados do interior da
                  Região Norte.
                </p>

                <div className="text-center">
                  <Button
                    variant="norte"
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 mt-3"
                  >
                    <a href="#contato">Quero ser apoiador</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
