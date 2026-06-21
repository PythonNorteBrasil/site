"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { ButtonLink } from "@/design-system/components/Button";

export function Tickets() {
  const [ticketType, setTicketType] = useState<"meia" | "inteira">("meia");

  const tickets = [
    {
      name: "Individual",
      prices: {
        meia: "R$ 70",
        inteira: "R$ 135",
      },
      description: "Ideal para quem deseja participar sozinho.",
      details: ["1 ingresso", "Acesso completo ao evento"],

      popular: false,
    },
    {
      name: "Dupla Pythonica",
      prices: {
        meia: "R$ 109",
        inteira: "R$ 213",
      },
      description: "Leve alguém com você e economize.",
      details: ["2 ingressos", "20% de desconto por ingresso"],
      popular: true,
    },
    {
      name: "PySquad",
      prices: {
        meia: "R$ 187",
        inteira: "R$ 369",
      },
      description: "Monte um squad com 4 pessoas.",
      details: ["4 ingressos", "30% de desconto por ingresso"],
      popular: false,
    },
  ];

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
    <section id="ingressos" className="py-12 md:py-14 bg-cream scroll-mt-2">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#1F5506]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Garanta sua Vaga
            </h2>

            <div className="w-12 h-1 bg-primary mx-auto rounded-full mt-2 mb-3" />

            <p className="text-sm md:text-base text-neutral-600 max-w-xl mx-auto">
              Escolha a modalidade ideal para participar da Python Norte.
            </p>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-2xl bg-white p-1 shadow-md border border-neutral-200">
              <button
                onClick={() => setTicketType("meia")}
                className={`px-4 md:px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  ticketType === "meia"
                    ? "bg-[#1F5506] text-white"
                    : "text-neutral-600"
                }`}
              >
                Meia Entrada
              </button>

              <button
                onClick={() => setTicketType("inteira")}
                className={`px-4 md:px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  ticketType === "inteira"
                    ? "bg-[#1F5506] text-white"
                    : "text-neutral-600"
                }`}
              >
                Inteira
              </button>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-5 flex flex-col shadow-lg transition-all ${
                  ticket.popular
                    ? "bg-white border-2 border-primary shadow-xl scale-[1.02]"
                    : "bg-[#1F5506] text-white"
                }`}
              >
                {ticket.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wide px-4 py-1 rounded-full">
                    Mais Popular
                  </span>
                )}

                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2 gap-2">
                    <h3
                      className={`text-lg font-bold ${
                        ticket.popular ? "text-[#1F5506]" : "text-white"
                      }`}
                    >
                      {ticket.name}
                    </h3>
                    {ticket.popular && (
                      <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-[0_0_12px_rgba(239,68,68,0.5)] border border-red-500 animate-pulse shrink-0">
                        Últimas Vagas
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-sm mb-4 ${
                      ticket.popular ? "text-neutral-600" : "text-white/80"
                    }`}
                  >
                    {ticket.description}
                  </p>

                  <div className="mb-4 flex items-end gap-1">
                    <span
                      className={`text-3xl md:text-4xl font-black ${
                        ticket.popular ? "text-[#1F5506]" : "text-white"
                      }`}
                    >
                      {ticket.prices[ticketType]}
                    </span>

                    <span
                      className={`text-xs mb-1 ${
                        ticket.popular ? "text-neutral-500" : "text-white/60"
                      }`}
                    >
                      / único
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {ticket.details.map((item) => (
                      <li
                        key={item}
                        className={`flex items-start gap-2 text-sm ${
                          ticket.popular ? "text-neutral-700" : "text-white/90"
                        }`}
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            ticket.popular ? "text-[#1F5506]" : "text-accent"
                          }`}
                        />

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Benefícios */}
          <div className="mt-5 text-center">
            <p className="text-sm text-neutral-500 mb-2">
              Todos os ingressos incluem:
            </p>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {benefits.map((benefit) => (
                <span
                  key={benefit}
                  className="text-sm text-[#1F5506] font-medium"
                >
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-6">
            <ButtonLink
              href="https://www.even3.com.br/python-norte-2026-631670/"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              Garantir meu ingresso
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
