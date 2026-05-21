"use client";

import { Terminal, Users, Sprout } from "lucide-react";

export function About() {
  const pillars = [
    {
      icon: Terminal,
      title: "Processos e Python",
      description: "Aprenda sobre boas práticas, arquitetura, frameworks e tudo que há de mais moderno no ecossistema Python.",
      color: "text-green-deep",
      bg: "bg-green-deep/10",
    },
    {
      icon: Users,
      title: "Compartilhar Conhecimento",
      description: "Espaço para troca de experiências, networking e conexões reais entre profissionais, estudantes e entusiastas.",
      color: "text-orange",
      bg: "bg-orange/10",
    },
    {
      icon: Sprout,
      title: "Crescer a Comunidade",
      description: "Contribua para o fortalecimento do ecossistema de tecnologia da região Norte, gerando impacto social.",
      color: "text-green-light",
      bg: "bg-green-light/10",
    },
  ];

  return (
    <section id="sobre" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-green-deep" style={{ fontFamily: "var(--font-display)" }}>
              Sobre a Python Norte
            </h2>
            <div className="w-20 h-1 bg-orange mx-auto rounded-full" />
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-cream-card border border-yellow/20 rounded-2xl p-8 space-y-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`w-14 h-14 rounded-xl ${pillar.bg} flex items-center justify-center`}>
                  <pillar.icon className={`w-7 h-7 ${pillar.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Main context box */}
          <div className="bg-green-deep rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h3 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                O Maior Evento Python da Região Norte
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                A Python Norte é uma conferência sem fins lucrativos, organizada inteiramente
                por voluntários da comunidade Python. Nosso objetivo é democratizar o acesso ao
                conhecimento em tecnologia na região amazônica, promovendo inclusão, diversidade
                e inovação. Desde programadores iniciantes até especialistas em inteligência
                artificial, todos encontram espaço para aprender e contribuir.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <span className="bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full">🌿 Comunidade</span>
                <span className="bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full">🤖 Inteligência Artificial</span>
                <span className="bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full">♿ Acessibilidade</span>
                <span className="bg-white/15 text-white text-xs font-bold px-4 py-2 rounded-full">🐍 Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
