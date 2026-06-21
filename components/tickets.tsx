"use client";

import { Check } from "lucide-react";
import { ButtonLink } from "@/design-system/components/Button";

export function Tickets() {
  const benefits = [
    "3 dias de evento",
    "Palestras e keynotes",
    "Workshops",
    "Acesso completo ao evento",
    "Certificado digital",
    "Kit de boas-vindas",
    "Coffee break",
  ];

  return (
    <section id="ingressos" className="py-12 md:py-12 bg-cream scroll-mt-0">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1F5506]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Últimos Ingressos Disponíveis
            </h2>

            <div className="w-12 h-1 bg-primary mx-auto rounded-full mt-2 mb-3" />

            <p className="text-sm md:text-base text-neutral-600 max-w-xl mx-auto">
              O último lote já está disponível. Garanta sua participação antes
              que os ingressos se esgotem.
            </p>
          </div>

          {/* Card Principal */}
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-primary shadow-xl">
              {/* Badge Desktop */}
              <span className="hidden md:block absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full animate-pulse z-10">
                Últimos Ingressos
              </span>

              <div className="grid md:grid-cols-2">
                {/* Lado esquerdo */}
                <div className="bg-[#1F5506] text-white p-4 md:p-10 flex flex-col justify-center">
                  <span className="text-xs md:text-sm uppercase tracking-widest font-bold text-accent mb-2 md:mb-3">
                    Último Lote
                  </span>

                  <h3 className="text-2xl md:text-4xl font-black mb-3 md:mb-4">
                    Python Norte 2026
                  </h3>

                  <p className="hidden md:block text-lg text-white/80 leading-relaxed">
                    Última oportunidade para garantir sua participação no maior
                    evento de Python da região Norte.
                  </p>
                </div>

                {/* Lado direito */}
                <div className="p-4 md:p-10 flex flex-col justify-center">
                  <div className="mb-5 md:mb-6">
                    <p className="text-xs md:text-sm uppercase tracking-wider text-neutral-500 font-semibold">
                      Preço único
                    </p>

                    <div className="text-4xl md:text-6xl font-black text-[#1F5506] mt-1 md:mt-2">
                      R$ 100
                    </div>

                    {/* Badge Mobile */}
                    <div className="md:hidden mt-2">
                      <span className="inline-flex bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse">
                        Últimos Ingressos
                      </span>
                    </div>

                    <p className="text-sm text-neutral-500 mt-2">
                      mesmo valor para meia entrada e inteira
                    </p>
                  </div>

                  <ul className="grid gap-2 md:gap-3 md:grid-cols-2 mb-6 md:mb-8">
                    {benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-2 text-sm text-neutral-700"
                      >
                        <Check className="w-4 h-4 shrink-0 text-[#1F5506]" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href="https://www.even3.com.br/python-norte-2026-631670/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                    size="md"
                    className="w-full md:w-auto"
                  >
                    Garantir meu ingresso
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso */}
          <div className="mt-6 text-center">
            <p className="text-sm font-medium text-red-600">
              ⚠️ Último lote disponível. As inscrições serão encerradas quando
              os ingressos acabarem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
