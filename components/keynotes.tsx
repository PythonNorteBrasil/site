"use client";

import { useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export function Keynotes() {
  const [activeKeynote, setActiveKeynote] = useState(0);

  const keynotes = [
    {
      id: 1,
      name: "Keynote I - Abertura",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 1 - 08:45",
      title: "Uma revelação inspiradora",
      description:
        "Uma grande referência nacional da tecnologia e inovação compartilhará uma reflexão profunda sobre o impacto da comunidade no desenvolvimento regional. Aguarde a revelação oficial!",
      image: "/secret_speaker.png",
    },
    {
      id: 2,
      name: "Keynote II - Encerramento do Dia 1",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 1 - 15:30",
      title: "Expandindo os limites do código",
      description:
        "Prepare-se para uma palestra técnica provocadora sobre as fronteiras do desenvolvimento de software e tendências emergentes. O segredo será desvendado nos próximos dias.",
      image: "/secret_speaker.png",
    },
    {
      id: 3,
      name: "Keynote III - Abertura do Dia 2",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 2 - 08:30",
      title: "O futuro da IA e dos dados",
      description:
        "Uma das mentes mais influentes no ecossistema global de Inteligência Artificial trará insights valiosos direto das fronteiras do mercado de tecnologia.",
      image: "/secret_speaker.png",
    },
    {
      id: 4,
      name: "Keynote IV - Abertura do Dia 3",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 3 - 09:00",
      title: "Liderança, Impacto e Sociedade",
      description:
        "Como a tecnologia e a computação em Python impulsionam a transformação e democratização digital na região Norte. Um fechamento com chave de ouro.",
      image: "/secret_speaker.png",
    },
  ];

  const handlePrevKeynote = () => {
    setActiveKeynote((prev) => (prev === 0 ? keynotes.length - 1 : prev - 1));
  };

  const handleNextKeynote = () => {
    setActiveKeynote((prev) => (prev === keynotes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="keynotes" className="py-20 md:py-28 bg-[#FAF7F0]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-[#004B23]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Keynotes
            </h2>
            <div className="w-14 md:w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
            <p className="text-[#4A5D4E] text-sm md:text-base max-w-2xl mx-auto">
              Conheça os palestrantes principais que vão inspirar e transformar
              o evento
            </p>
          </div>

          {/* Keynotes Carousel */}
          <div className="relative flex items-center justify-between gap-4">
            {/* Left arrow */}
            <button
              onClick={handlePrevKeynote}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-[#FF6B00]/30 hover:bg-[#FF6B00]/10 transition-colors flex-shrink-0"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-8 h-8 text-[#FF6B00]" />
            </button>

            {/* Carousel Container */}
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
              {keynotes.map((keynote, idx) => {
                const isActiveOnMobile = idx === activeKeynote;
                return (
                  <div
                    key={keynote.id}
                    className={`${
                      isActiveOnMobile ? "flex" : "hidden md:flex"
                    } relative flex-col h-[440px] w-full rounded-[24px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
                  >
                    {/* Background speaker image */}
                    <div className="absolute inset-0 bg-black/55 z-10 transition-colors group-hover:bg-black/45" />
                    <img
                      src={keynote.image}
                      alt={keynote.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark gradient bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-15" />

                    {/* Content */}
                    <div className="relative z-20 h-full p-6 flex flex-col justify-end space-y-3 text-white">
                      {/* Tag */}
                      <div>
                        <span className="inline-block bg-[#FFB800] text-black text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                          {keynote.tag}
                        </span>
                      </div>

                      {/* Name */}
                      <div>
                        <h4 className="text-lg md:text-xl font-bold leading-tight">
                          {keynote.name}
                        </h4>
                        <p className="text-[10px] text-[#FFB800] font-semibold tracking-wider uppercase">
                          {keynote.role}
                        </p>
                      </div>

                      {/* Title */}
                      <h5 className="text-sm font-semibold text-white/90 italic">
                        &ldquo;{keynote.title}&rdquo;
                      </h5>

                      {/* Description */}
                      <p className="text-xs text-white/80 leading-relaxed line-clamp-4">
                        {keynote.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNextKeynote}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-[#FF6B00]/30 hover:bg-[#FF6B00]/10 transition-colors flex-shrink-0"
              aria-label="Próximo"
            >
              <ChevronRight className="w-8 h-8 text-[#FF6B00]" />
            </button>
          </div>

          {/* Mobile Indicators */}
          <div className="flex md:hidden items-center justify-center gap-6 pt-2">
            <button
              onClick={handlePrevKeynote}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#FF6B00]/30 active:bg-[#FF6B00]/10"
            >
              <ChevronLeft className="w-6 h-6 text-[#FF6B00]" />
            </button>
            <div className="flex gap-2">
              {keynotes.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeKeynote
                      ? "bg-[#FF6B00] w-6"
                      : "bg-[#FF6B00]/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextKeynote}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#FF6B00]/30 active:bg-[#FF6B00]/10"
            >
              <ChevronRight className="w-6 h-6 text-[#FF6B00]" />
            </button>
          </div>

          {/* CTA to Full Schedule */}
          <div className="bg-gradient-to-br from-[#004B23] to-[#003318] rounded-[24px] p-8 md:p-12 text-white shadow-xl text-center space-y-6 flex flex-col items-center max-w-4xl mx-auto mt-12">
            <div className="w-14 h-14 bg-[#FFF8E7]/10 rounded-full flex items-center justify-center border border-[#FFB800]/20">
              <Calendar className="w-7 h-7 text-[#FFB800]" />
            </div>

            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Veja a programação completa
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                Explore todas as palestras, tutoriais e atividades dos três dias
                de evento. Crie sua agenda personalizada e não perca nada!
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/programacao"
                className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-bold py-3.5 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                Ver Programação Completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Made with Bob
