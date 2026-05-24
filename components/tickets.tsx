"use client";

import { Check } from "lucide-react";

export function Tickets() {
  const tickets = [
    {
      name: "Meia-Entrada",
      price: "R$ 60",
      period: "/ único",
      description: "Estudantes, professores, PCDs, idosos e doadores de sangue.",
      features: [
        "Acesso aos 3 dias de evento",
        "Todas as palestras e keynotes",
        "Workshops (vagas limitadas)",
        "Kit de boas-vindas",
        "Certificado digital",
        "Coffee break incluso",
      ],
      popular: false,
      buttonStyle: "bg-green-deep hover:bg-green-medium text-white",
      cardStyle: "bg-green-deep text-white",
      checkColor: "text-yellow",
      textColor: "text-white/80",
    },
    {
      name: "Ingresso Social",
      price: "R$ 80",
      period: "/ único",
      description: "Mediante entrega de 1kg de alimento não perecível no credenciamento.",
      features: [
        "Acesso aos 3 dias de evento",
        "Todas as palestras e keynotes",
        "Workshops (vagas limitadas)",
        "Kit de boas-vindas",
        "Certificado digital",
        "Coffee break incluso",
        "Ação solidária para Ananindeua",
      ],
      popular: true,
      buttonStyle: "bg-orange hover:bg-orange-hover text-white",
      cardStyle: "bg-white text-gray-900 border-2 border-orange",
      checkColor: "text-green-deep",
      textColor: "text-gray-600",
    },
    {
      name: "Inteira",
      price: "R$ 120",
      period: "/ único",
      description: "Para profissionais e empresas que desejam apoiar o evento.",
      features: [
        "Acesso aos 3 dias de evento",
        "Todas as palestras e keynotes",
        "Workshops (vagas limitadas)",
        "Kit de boas-vindas",
        "Certificado digital",
        "Coffee break incluso",
        "Apoio à comunidade local",
      ],
      popular: false,
      buttonStyle: "bg-green-deep hover:bg-green-medium text-white",
      cardStyle: "bg-green-deep text-white",
      checkColor: "text-yellow",
      textColor: "text-white/80",
    },
  ];

  return (
    <section id="ingressos" className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-green-deep" style={{ fontFamily: "var(--font-display)" }}>
              Corrente Sem Igual
            </h2>
            <div className="w-20 h-1 bg-orange mx-auto rounded-full" />
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Escolha o ingresso ideal para você. A Python Norte é um evento sem fins lucrativos feito 100% por voluntários.
            </p>
          </div>

          {/* Ticket cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {tickets.map((ticket, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 flex flex-col justify-between shadow-lg ${ticket.cardStyle} ${
                  ticket.popular ? "md:scale-105 md:z-10" : ""
                }`}
              >
                {ticket.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Mais Popular
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{ticket.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${ticket.popular ? "text-green-deep" : "text-white"}`}>
                        {ticket.price}
                      </span>
                      <span className={`text-xs ${ticket.textColor}`}>{ticket.period}</span>
                    </div>
                    <p className={`text-xs ${ticket.textColor}`}>{ticket.description}</p>
                  </div>

                  <div className={`w-full h-px ${ticket.popular ? "bg-gray-200" : "bg-white/15"}`} />

                  <ul className="space-y-3">
                    {ticket.features.map((feat, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <Check className={`w-5 h-5 flex-shrink-0 ${ticket.checkColor}`} />
                        <span className={ticket.textColor}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="https://www.even3.com.br/python-norte-2026-631670/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full py-4 rounded-2xl font-bold text-sm text-center shadow-md transition-all ${ticket.buttonStyle}`}
                  >
                    Comprar Ingresso
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
