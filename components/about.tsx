"use client";

import { Code, Users, Award } from "lucide-react";

export function About() {
  const pillars = [
    {
      icon: Code,
      title: "Promover o Python",
      mobileDescription:
        "Incentivar o uso de Python na academia, mercado e pesquisa.",
      desktopDescription:
        "Fomentar a adoção e o uso da linguagem Python em contextos acadêmicos, profissionais e de pesquisa.",
    },
    {
      icon: Users,
      title: "Compartilhar Conhecimento",
      mobileDescription:
        "Conectar profissionais, estudantes e entusiastas da região.",
      desktopDescription:
        "Promover troca de experiências entre profissionais, estudantes e entusiastas de tecnologia da região.",
    },
    {
      icon: Award,
      title: "Crescer a Comunidade",
      mobileDescription:
        "Fortalecer a comunidade Python e a tecnologia na Amazônia.",
      desktopDescription:
        "Impactar econômica e socialmente a Amazônia através do fortalecimento da comunidade Python local.",
    },
  ];

  return (
    <section
      id="sobre"
      className="py-10 md:py-20 bg-[#FAF7F0] scroll-mt-[40px] md:scroll-mt-[20px]"
    >
      <div className="container mx-auto px-5 md:px-4">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-[#004B23]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sobre a Python Norte
            </h2>

            <div className="w-14 md:w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className="
                  bg-[#FFF8E7]
                  border border-[#FFB800]/30
                  rounded-xl
                  px-4 py-3 md:p-5
                  flex items-center md:flex-col md:items-center
                  gap-3 md:gap-3
                  shadow-sm
                  hover:shadow-md
                  transition-all
                "
              >
                <pillar.icon className="w-5 h-5 md:w-7 md:h-7 text-[#FFB800]" />

                <div className="flex-1 md:flex-none text-left md:text-center">
                  <h3 className="text-sm md:text-base font-bold text-[#004B23] leading-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs md:text-sm text-[#4A5D4E] leading-snug mt-0.5">
                    <span className="md:hidden">
                      {pillar.mobileDescription}
                    </span>
                    <span className="hidden md:inline">
                      {pillar.desktopDescription}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN BOX (compactado desktop) */}
          <div className="bg-[#004B23] rounded-2xl md:rounded-2xl p-6 md:p-8 text-white shadow-lg">
            <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-2xl font-bold leading-tight">
                O Maior Evento Python da Região Norte
              </h3>

              <div className="space-y-3 text-white/90 text-xs md:text-sm leading-snug md:leading-relaxed">
                <p>
                  A Python Norte é o principal encontro da comunidade Python da
                  Região Norte, reunindo estudantes, profissionais e entusiastas
                  de tecnologia em um ambiente de aprendizado, colaboração e
                  networking.
                </p>
                <p>
                  Durante <strong>3 dias de programação</strong>, os
                  participantes exploram temas como{" "}
                  <strong>desenvolvimento de software</strong>,
                  <strong> ciência de dados</strong> e{" "}
                  <strong>inteligência artificial</strong>, fortalecendo a
                  comunidade tecnológica da Amazônia e impulsionando novas
                  conexões e oportunidades.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
