"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Users, Handshake, Heart, Briefcase, Award } from "lucide-react";

export function Sponsorship() {
  const benefits = [
    {
      icon: Eye,
      title: "Visibilidade Regional",
      description: "Sua marca em destaque como apoiadora de tecnologia e inovação na Amazônia e em todo o Norte."
    },
    {
      icon: Users,
      title: "Público Qualificado",
      description: "Conexão com desenvolvedores juniores, seniores, líderes de tecnologia e formadores de opinião."
    },
    {
      icon: Handshake,
      title: "Networking Ativo",
      description: "Relacionamento direto com profissionais locais e palestrantes renomados de todo o país."
    },
    {
      icon: Heart,
      title: "Responsabilidade Social",
      description: "Associe sua marca à inclusão, diversidade e democratização da tecnologia fora dos eixos tradicionais."
    },
    {
      icon: Briefcase,
      title: "Recrutamento (Employer Branding)",
      description: "Acesso a talentos comprometidos da região para reforçar sua equipe com profissionais engajados."
    },
    {
      icon: Award,
      title: "Fomento à Inovação Local",
      description: "Investir na Python Norte é impulsionar a economia criativa e o empreendedorismo regional."
    }
  ];

  const mainTiers = [
    {
      name: "Diamante 💎",
      color: "border-brand-yellow bg-gradient-to-b from-brand-yellow/10 to-brand-bg/50 text-foreground",
      badge: "Cota Master",
      perks: [
        "6 PyTickets* + 3 PyDiversity** + 4 PyAmazônida***",
        "Logo Master no site e em todos os banners/crachás",
        "4 posts dedicados + 2 reels + 2 vídeos em redes sociais",
        "Vídeo publicitário na abertura de Keynotes (até 30s)",
        "Stand Premium em local estratégico",
        "Material físico inserido no kit dos participantes"
      ]
    },
    {
      name: "Ouro 🥇",
      color: "border-brand-orange/30 bg-gradient-to-b from-brand-orange/5 to-brand-bg/50 text-foreground",
      badge: "Destaque Alto",
      perks: [
        "4 PyTickets* + 2 PyDiversity** + 3 PyAmazônida***",
        "Logo Ouro no site e nos painéis do evento",
        "3 posts dedicados + 2 reels em redes sociais",
        "Stand no salão de exposições principal",
        "Material físico inserido no kit dos participantes"
      ]
    },
    {
      name: "Prata 🥈",
      color: "border-brand-green/30 bg-gradient-to-b from-brand-green/5 to-brand-bg/50 text-foreground",
      badge: "Média Exposição",
      perks: [
        "2 PyTickets* + 1 PyDiversity** + 2 PyAmazônida***",
        "Logo Prata no site e na área de credenciamento",
        "2 posts dedicados em redes sociais",
        "Espaço para banner físico na área de convivência",
        "Material no kit físico dos participantes"
      ]
    },
    {
      name: "Bronze 🥉",
      color: "border-black/5 bg-white text-foreground",
      badge: "Presença Inicial",
      perks: [
        "4 PyTickets*",
        "Logo Bronze no site oficial com link direto",
        "1 post coletivo em redes sociais",
        "Menção de agradecimento nos telões do evento"
      ]
    }
  ];

  return (
    <section
      id="patrocinio"
      className="relative py-20 md:py-32 bg-slate-50 text-brand-text overflow-hidden"
      aria-label="Patrocínio"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-5 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-oferta text-brand-green">
              Patrocínio & Apoio
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
            <p className="text-base md:text-lg max-w-2xl mx-auto text-foreground/80 font-medium pt-2">
              Junte-se à Python Norte 2026. Ajude-nos a tornar este evento inesquecível e posicione sua marca no ecossistema de tecnologia da Amazônia.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group relative rounded-3xl border border-black/5 bg-white p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="space-y-4 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-bg border border-black/5 text-foreground/75 transition-transform duration-300 group-hover:scale-110">
                    <benefit.icon className="h-6 w-6 text-brand-orange" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground font-oferta leading-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-medium">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Plans section */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-oferta">
                Nossas Cotas de Patrocínio
              </h3>
              <p className="text-xs md:text-sm text-foreground/60 font-medium mt-1">
                Escolha o plano que melhor atende aos objetivos estratégicos de sua empresa.
              </p>
            </div>

            {/* Grid of tiers */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {mainTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl border p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 ${tier.color}`}
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange">
                        {tier.badge}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold font-oferta text-foreground border-b border-black/5 pb-3">
                      {tier.name}
                    </h4>

                    <ul className="space-y-3.5">
                      {tier.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="text-xs font-medium text-foreground/80 flex items-start gap-2">
                          <span className="text-brand-orange font-bold mt-0.5">•</span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Button
                      variant="norte"
                      className="w-full font-bold text-xs"
                      asChild
                    >
                      <a href="#contato">Quero Patrocinar</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footnote / glossary */}
            <div className="rounded-3xl bg-white border border-black/5 p-6 space-y-4">
              <p className="text-[10px] md:text-xs text-foreground/60 leading-relaxed font-semibold">
                (*) <strong>PyTickets</strong>: ingressos padrão do evento.
                <br />
                (**) <strong>PyDiversity</strong>: ingressos de ação afirmativa doados para grupos sub-representados no setor de tecnologia.
                <br />
                (***) <strong>PyAmazônida</strong>: ingressos destinados especificamente a incentivar e apoiar a participação de estudantes e profissionais do interior da região Norte.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
