import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Users,
  Handshake,
  Heart,
  Briefcase,
  Megaphone,
} from "lucide-react";
import { title } from "process";

export function Sponsorship() {
  const benefits = [
    {
      icon: Eye,
      title: "Visibilidade Regional",
      description: "Deixe sua marca na região Norte do Brasil",
    },
    {
      icon: Users,
      title: "Público Qualificado",
      description: "Devs, arquitetos, gestores e líderes de comunidades",
    },
    {
      icon: Handshake,
      title: "Networking",
      description:
        "Contato com líderes de comunidade. profissionais e entusiastas",
    },
    {
      icon: Heart,
      title: "Responsabilidade Social",
      description: "Inclusão e diversidade",
    },
    { icon: Briefcase, title: "Recrutamento", description: "Talentos Python" },
  ];

  const sponsorshipTiers = [
    {
      name: "Diamante 💎",
      color: "from-primary to-primary/90",
      benefits: [
        "6 PyTickets* + 3 PyDiversity** + 4 PyAmazônida***",
        "Logotipo com maior destaque no site do evento com link para o site da empresa",
        "4 Posts em mídias sociais + 2 Reels + 2 vídeos",
        "Vídeo publicitário antes de keynote presencial (até 30s)",
        "Stand Premium (localização privilegiada)",
        "Material promocional no kit do participante",
        "Logo com maior destaque em materiais impressos e digitais, como banners, backdrops e crachás",
        "Menção com maior destaque em redes sociais",
        "Agradecimento na abertura e encerramento",
        "3 Sessões de feira de empregos",
        "Desconto nas proximas edições do evento, caso sua empresa queira continuar apoiando a Python Norte",
      ],
    },
    {
      name: "Ouro 🥇",
      color: "from-secondary to-secondary/70",
      benefits: [
        "4 PyTickets* + 2 PyDiversity** + 3 PyAmazônida***",
        "Logotipo com destaque no site do evento com link para o site da empresa",
        "3 Posts em mídias sociais + 2 Reels + 2 vídeos",
        "Stand privilegiado (no salão de eventos)",
        "Material promocional no kit do participante",
        "Logo com destaque em materiais impressos e digitais, como banners, backdrops e crachás",
        "Menção com destaque em redes sociais",
        "Agradecimento na abertura e encerramento",
        "3 Sessões de feira de empregos",
      ],
    },
    {
      name: "Prata 🥈",
      color: "from-accent to-accent/70",
      benefits: [
        "2 PyTickets* + 1 PyDiversity** + 2 PyAmazônida***",
        "Logotipo no site do evento com link para o site da empresa",
        "2 Posts em mídias sociais + 2 Reels",
        "Logo em materiais impressos e digitais, como banners, backdrops e crachás",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
        "2 Sessões de feira de empregos",
      ],
    },
    {
      name: "Bronze 🥉",
      color: "from-accent to-accent/70",
      benefits: [
        "4 PyTickets*",
        "Logotipo no site do evento com link para o site da empresa",
        "2 Posts em mídias sociais",
        "Logo em materiais impressos e digitais, como banners, backdrops e crachás",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
      ],
    },
    {
      name: "Apoio - Gratutito! 🙌",
      color: "from-accent to-accent/70",
      benefits: [
        "Logo no site do evento",
        "Menção nas redes sociais",
        "Agradecimento na abertura e encerramento",
      ],
    },
  ];

  return (
    <section
      id="apoiar"
      className="py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-background to-primary/10"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              Apoie a Python Norte!
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty">
              A receita para o sucesso é simples: pessoas + tecnologia = muito
              suporte! <br />
              Para que esse evento aconteça com a qualidade que todos merecem,
              precisamos da colaboração de empresas como a sua! Se sua marca
              quer estar no topo do Python pot e fazer parte de um evento
              impactante no Norte do país, temos um lugar no nosso Tacacá Stand
              só para você. <br />
              Venha ser um apoiador da Python Norte e ajude a fortalecer a
              comunidade tecnológica da região!
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all bg-card border-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Sponsorship Tiers */}
          <Card className="p-8 md:p-10 bg-muted/40 border-2 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
              Planos de apoio e Patrocínio
            </h3>
            <h4>Como funciona cada categoria de patrocínio?</h4>
            <p className="text-muted-foreground text-sm">
              Cada nível de patrocínio oferece uma série de benefícios
              exclusivos para sua empresa, garantindo máxima visibilidade e
              engajamento com a comunidade Python do Norte do Brasil. Escolha o
              plano que melhor se adapta às suas necessidades e faça parte deste
              evento incrível!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {sponsorshipTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg bg-gradient-to-br ${tier.color} text-primary-foreground text-center font-bold text-xl shadow-lg`}
                >
                  {tier.name}

                  <ul>
                    {tier.benefits?.map((benefit, bIndex) => (
                      <li key={bIndex} className="mt-4 text-sm font-normal">
                        • {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-sm">
              (*) PyTickets: Ingressos gratuitos. <br />
              (**) PyDiversity: Ingressos patrocinados para LGBTQIAPN+ e pessoas
              negras. <br />
              (***) PyAmazônida: Ingressos patrocinados para povos amazônicos
              que vivem em alguns estados do interior da Região Norte.
            </p>
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6"
              >
                <a href="#contato">Quero ser apoiador</a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
