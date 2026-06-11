"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { ButtonLink } from "@/design-system";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100vh] lg:min-h-[calc(100vh-3.5rem)] w-full flex items-center overflow-x-hidden overflow-y-hidden pt-[136px] pb-8 lg:pt-[136px] lg:pb-12 scroll-mt-[128px] lg:px-10"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/forest.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Camada verde */}
      <div className="absolute inset-0 bg-green-900/45 lg:bg-green-900/55" />

      {/* Escurecimento geral */}
      <div className="absolute inset-0 bg-black/5 lg:bg-black/10" />

      {/* Mobile: escurece o topo */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.20) 0%, rgba(0,0,0,.12) 35%, rgba(0,0,0,.05) 65%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Desktop: escurece a esquerda */}
      <div
        className="absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.2) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 xl:px-16 relative z-10">
        <div className="grid lg:grid-cols-[1fr_600px] gap-0 lg:gap-10 items-center">
          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start justify-center w-full lg:max-w-2xl text-center lg:text-left pt-6 lg:pt-0">
            <h1
              className="text-[3rem] leading-[0.9] md:text-7xl lg:text-[3.5rem] xl:text-[5rem] lg:leading-[0.85] font-black text-white italic uppercase tracking-wider font-display mb-3 lg:mb-8"
              style={{
                textShadow:
                  "0 2px 15px rgba(0,0,0,.2), 0 4px 15px rgba(0,0,0,.5)",
              }}
            >
              A <span>MAIOR</span>
              <br />
              <span className="text-secondary">CONFERÊNCIA</span>
              <br />
              <span>PYTHON</span>
              <br />
              DO <span className="text-accent">NORTE</span>
            </h1>

            <p
              className="text-xs md:text-base lg:text-base text-white max-w-xl leading-relaxed font-medium mb-3 lg:mb-10"
              style={{
                textShadow:
                  "0 2px 12px rgba(0,0,0,.95), 0 4px 24px rgba(0,0,0,.8)",
              }}
            >
              Três dias de imersão em tecnologia, inovação e conexão, reunindo
              desenvolvedores da Região Norte e de todo o Brasil para aprender,
              compartilhar experiências e fortalecer a comunidade.
            </p>

            {/* Botões - Mobile: CTA em destaque, Desktop: todos juntos */}
            <div className="w-full lg:w-auto">
              {/* Mobile: Apenas CTA principal */}
              <ButtonLink
                href="https://www.even3.com.br/python-norte-2026-631670/"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
                className="w-full lg:hidden mb-4"
              >
                Garantir Ingressos
              </ButtonLink>

              {/* Desktop: Ambos os botões principais */}
              <div className="hidden lg:flex gap-4">
                <ButtonLink
                  href="https://www.even3.com.br/python-norte-2026-631670/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                >
                  Garantir Ingressos
                </ButtonLink>

                <ButtonLink
                  href="https://talks.python.org.br/python-norte-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="tertiary"
                  size="md"
                >
                  Submeter Proposta
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* RIGHT - Reorganizado para mobile */}
          <div
            className="flex flex-col gap-2 w-full lg:max-w-[520px]
xl:max-w-[600px] lg:ml-auto"
          >
            {/* Collage */}
            <div className="relative w-full max-w-[460px] lg:max-w-[420px] xl:max-w-[460px] aspect-square -mt-4 lg:mt-0 mb-2 mx-auto">
              <Image
                src="/collage.jpg"
                alt="Python Norte"
                fill
                priority
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Data e Local */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full -mt-10 lg:-mt-12">
              <div className="bg-black/35 backdrop-blur-sm border border-accent/50 rounded-lg p-3 lg:p-3.5 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-accent shrink-0" />

                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-[9px] uppercase font-bold text-accent tracking-wider">
                    QUANDO
                  </p>

                  <p className="text-sm lg:text-base text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    03–05 de Julho de 2026
                  </p>
                </div>

                {/* Ícone Salvar na Agenda - Compacto */}
                <button
                  onClick={() => {
                    const event = {
                      title: "Python Norte 2026",
                      description:
                        "Três dias de imersão em tecnologia, inovação e conexão",
                      location: "UNAMA Ananindeua - PA",
                      startDate: "20260703T080000",
                      endDate: "20260705T180000",
                    };

                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      event.title,
                    )}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(
                      event.description,
                    )}&location=${encodeURIComponent(event.location)}`;

                    window.open(googleCalendarUrl, "_blank");
                  }}
                  className="p-1.5 rounded-md bg-accent/10 hover:bg-accent/20 text-accent hover:text-accent-600 transition-all cursor-pointer group transform hover:scale-110 active:scale-95"
                  title="Adicionar à agenda"
                  aria-label="Adicionar à agenda"
                >
                  <svg
                    className="w-4 h-4 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-black/35 backdrop-blur-sm border border-accent/50 rounded-lg p-3 lg:p-3.5 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-accent shrink-0" />

                <div className="flex-1 min-w-0 overflow-hidden">
                  <p className="text-[9px] uppercase font-bold text-accent tracking-wider">
                    ONDE
                  </p>

                  <p className="text-sm lg:text-base text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                    UNAMA Ananindeua – PA
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-accent/40 ">
              <div className="bg-black/30 backdrop-blur-sm py-2 px-2 flex flex-col items-center justify-center border-r border-accent/30">
                <span className="text-xl md:text-2xl font-extrabold text-white leading-none">
                  09
                </span>

                <span className="text-[9px] uppercase text-accent font-bold tracking-wider">
                  Edições
                </span>
              </div>

              <div className="bg-black/30 backdrop-blur-sm py-2 px-2 flex flex-col items-center justify-center border-r border-accent/30">
                <span className="text-xl md:text-2xl font-extrabold text-white leading-none">
                  10+
                </span>

                <span className="text-[9px] uppercase text-accent font-bold tracking-wider">
                  Palestrantes
                </span>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-3 flex flex-col items-center justify-center">
                <span className="text-xl md:text-2xl font-extrabold text-white leading-none">
                  +1200
                </span>

                <span className="text-[9px] uppercase text-accent font-bold tracking-wider">
                  Participantes
                </span>
              </div>
            </div>

            {/* Botão secundário - Abaixo dos stats no mobile */}
            <div className="flex flex-col lg:hidden gap-2 w-full mt-2">
              <ButtonLink
                href="https://talks.python.org.br/python-norte-2026/"
                target="_blank"
                rel="noopener noreferrer"
                variant="tertiary"
                size="md"
                className="w-full shadow-xl"
              >
                Submeter Proposta
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
