"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "O que é a Python Norte?",
    answer:
      "A Python Norte é a maior conferência da linguagem de programação Python da região Norte do Brasil. Organizada por voluntários da comunidade, o evento reúne desenvolvedores, estudantes e entusiastas para três dias de palestras, workshops, hackathons e networking.",
  },
  {
    question: "Quando e onde será o evento?",
    answer:
      "A Python Norte 2026 acontecerá nos dias 03, 04 e 05 de julho de 2026, das 08:00 às 17:00 (GMT-3), de forma presencial na UNAMA - Campus Ananindeua, em Ananindeua - Pará - Brasil.",
  },
  {
    question: "Como compro meu ingresso?",
    answer:
      "Os ingressos estão disponíveis na plataforma Even3. Basta acessar o link de inscrição, escolher a modalidade desejada (meia-entrada ou inteira) e realizar o pagamento.",
  },
  {
    question: "O evento é presencial ou online?",
    answer:
      "O evento é 100% presencial. Não haverá transmissão online nesta edição.",
  },
  {
    question: "Posso submeter uma palestra?",
    answer:
      "Sim! A chamada de trabalhos (Call for Papers) será aberta em breve. Fique atento às nossas redes sociais para não perder o prazo de submissão.",
  },
  {
    question: "Há vagas para voluntários?",
    answer:
      "Sim! Precisamos de voluntários para ajudar na organização do evento. Se você tem interesse, entre em contato pelo e-mail contato@pythonnorte.org.",
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer:
      "A plataforma Even3 aceita cartão de crédito, boleto bancário e PIX para pagamento dos ingressos.",
  },
  {
    question: "Tem estacionamento no local?",
    answer:
      "Sim, a UNAMA Campus Ananindeua dispõe de estacionamento gratuito para os participantes do evento.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-green-deep"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Perguntas Frequentes
            </h2>
            <div className="w-14 md:w-16 h-1 bg-orange mx-auto rounded-full" />
          </div>

          {/* FAQ items */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-yellow/20 rounded-2xl overflow-hidden bg-cream-card"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-cream transition-colors"
                >
                  <span className="text-sm md:text-base font-bold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange flex-shrink-0 transition-transform duration-300 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
