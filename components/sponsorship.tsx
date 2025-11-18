import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Users, Handshake, Heart, Briefcase, Megaphone } from "lucide-react"

export function Sponsorship() {
  const benefits = [
    { icon: Eye, title: "Visibilidade Regional", description: "Deixe sua marca na região Norte do Brasil" },
    { icon: Users, title: "Público Qualificado", description: "Devs, arquitetos, gestores e líderes de comunidades" },
    { icon: Handshake, title: "Networking", description: "Contato com líderes de comunidade. profissionais e entusiastas" },
    { icon: Heart, title: "Responsabilidade Social", description: "Inclusão e diversidade" },
    { icon: Briefcase, title: "Recrutamento", description: "Talentos Python" },
  ]

  const sponsorshipTiers = [
    { name: "Diamante", color: "from-primary to-primary/70" },
    { name: "Ouro", color: "from-secondary to-secondary/70" },
    { name: "Prata", color: "from-accent to-accent/70" },
  ]

  return (
    <section id="apoiar" className="py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              Apoie a Python Norte!
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mx-auto text-pretty">
              A receita para o sucesso é simples: pessoas + tecnologia = muito suporte! <br/> Para que este evento aconteça com a qualidade que todos merecem, precisamos da colaboração de empresas como a sua! Se sua marca quer estar no topo da panela Python e fazer parte de um evento impactante no Norte do país, temos um lugar reservado na nossa banca de tacacá só para você!
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all bg-card border-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>

          {/* Sponsorship Tiers */}
          <Card className="p-8 md:p-10 bg-muted/30 border-2 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Planos de Patrocínio</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {sponsorshipTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg bg-gradient-to-br ${tier.color} text-primary-foreground text-center font-bold text-xl shadow-lg`}
                >
                  {tier.name}
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground text-sm">
              + Apoios específicos (coffee break, credenciamento, brindes, etc.)
            </p>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6"
            >
              <a href="#contato">Quero ser apoiador</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
