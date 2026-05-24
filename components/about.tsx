"use client";

import { Code, Users, Award } from "lucide-react";

export function About() {
  const pillars = [
    {
      icon: Code,
      title: "Promover o Python",
      description: "Fomentar a adoção e o uso da linguagem Python em contextos acadêmicos, profissionais e de pesquisa.",
    },
    {
      icon: Users,
      title: "Compartilhar Conhecimento",
      description: "Promover troca de experiências entre profissionais, estudantes e entusiastas de tecnologia da região.",
    },
    {
      icon: Award,
      title: "Crescer a Comunidade",
      description: "Impactar econômica e socialmente a Amazônia através do fortalecimento da comunidade Python local.",
    },
  ];

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#FAF7F0]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#004B23]" style={{ fontFamily: "var(--font-display)" }}>
              Sobre a Python Norte
            </h2>
            {/* Split color divider: green on left, orange on right */}
            <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="bg-[#FFF8E7] border border-[#FFB800]/30 rounded-[20px] p-8 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <pillar.icon className="w-8 h-8 text-[#FFB800]" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[#004B23]">{pillar.title}</h3>
                <p className="text-sm text-[#4A5D4E] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Main context box */}
          <div className="bg-[#004B23] rounded-[24px] p-8 md:p-12 text-white shadow-lg">
            <div className="max-w-4xl mx-auto space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                O Maior Evento Python da Região Norte
              </h3>
              <div className="space-y-4 text-white/90 text-sm md:text-base leading-relaxed font-sans">
                <p>
                  <strong>Python Norte</strong> é o evento sobre a linguagem de programação Python voltado para a região norte do Brasil, apoiado pela <strong>Python Brasil Association (ApyB)</strong> e pela <strong>PSF (Python Software Foundation)</strong>.
                </p>
                <p>
                  Este ano, o evento acontecerá entre os dias 03 e 05 de Julho na cidade de Ananindeua no Pará.
                </p>
                <p>
                  A Python Norte é uma conferência anual que reúne profissionais, estudantes e entusiastas de Python para três dias intensos de aprendizado, networking e troca de experiências. Com foco no desenvolvimento tecnológico da região amazônica, o evento apresenta as últimas tendências em desenvolvimento de software, ciência de dados, inteligência artificial e muito mais.
                </p>
                <p>
                  Seja você um desenvolvedor experiente ou esteja começando sua jornada em Python, a Python Norte oferece conteúdo relevante para todos os níveis e oportunidades únicas de crescimento profissional e pessoal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
