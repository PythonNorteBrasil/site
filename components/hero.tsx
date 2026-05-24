"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24 bg-[#061306]"
    >
      {/* Forest background */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        style={{
          backgroundImage: "url('/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left column - 7 cols wide on lg */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8 lg:col-span-7">
            <h1
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.95] md:leading-[0.85] italic uppercase tracking-wider"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A MAIOR
              <br />
              <span className="text-green-light">CONFERÊNCIA</span>
              <br />
              PYTHON
              <br />
              DO <span className="text-yellow">NORTE</span>
            </h1>

            <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed">
              Três dias de imersão em tecnologia, inovação e conexão, reunindo
              desenvolvedores da Região Norte e de todo o Brasil para aprender,
              compartilhar experiências e fortalecer a comunidade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="https://www.even3.com.br/python-norte-2026-631670/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-orange-hover text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all text-center flex items-center justify-center whitespace-nowrap"
              >
                Garantir Ingresso
              </a>
              <a
                href="#programacao"
                className="border border-yellow/50 hover:border-yellow text-yellow hover:bg-yellow/5 font-bold text-sm px-6 py-3 rounded-lg transition-all text-center flex items-center justify-center whitespace-nowrap"
              >
                Ver programação
              </a>
              <button
                onClick={() => {
                  const event = {
                    title: "Python Norte 2026",
                    description: "Três dias de imersão em tecnologia, inovação e conexão",
                    location: "UNAMA - Ananindeua - PA",
                    startDate: "20260703T080000",
                    endDate: "20260705T180000",
                  };
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startDate}/${event.endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
                  window.open(googleCalendarUrl, "_blank");
                }}
                className="border border-green-light/40 hover:border-green-light text-green-light hover:bg-green-light/5 font-bold text-sm px-6 py-3 rounded-lg transition-all text-center flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Salvar na Agenda
              </button>
            </div>
          </div>

          {/* Right column - 5 cols wide on lg */}
          <div className="flex flex-col gap-6 w-full max-w-xl mx-auto lg:col-span-5">
            {/* Collage Image */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/collage.jpg"
                alt="Python Norte Collage"
                fill
                className="object-contain"
                style={{ mixBlendMode: "screen" }}
                priority
              />
            </div>

            {/* Info Cards (When/Where) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {/* QUANDO card */}
              <div className="bg-black/35 backdrop-blur-sm border border-green-light/20 p-4 rounded-xl flex items-start gap-3 shadow-md">
                <Calendar className="w-5 h-5 text-green-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-yellow tracking-wider uppercase leading-none">QUANDO</p>
                  <p className="text-xs md:text-sm font-semibold text-white mt-1.5 leading-snug">03 – 05 de Julho de 2026</p>
                </div>
              </div>

              {/* ONDE card */}
              <div className="bg-black/35 backdrop-blur-sm border border-green-light/20 p-4 rounded-xl flex items-start gap-3 shadow-md">
                <MapPin className="w-5 h-5 text-green-light shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-yellow tracking-wider uppercase leading-none">ONDE</p>
                  <p className="text-xs md:text-sm font-semibold text-white mt-1.5 leading-snug">UNAMA Ananindeua - PA</p>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-black/35 backdrop-blur-sm border border-green-light/20 p-5 rounded-xl w-full flex items-center justify-between divide-x divide-green-light/10 shadow-md">
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                <p className="text-2xl md:text-3xl font-extrabold text-white leading-none">09</p>
                <p className="text-[9px] md:text-[10px] font-bold text-yellow tracking-wider uppercase mt-2">EDIÇÕES</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                <p className="text-2xl md:text-3xl font-extrabold text-white leading-none">10+</p>
                <p className="text-[9px] md:text-[10px] font-bold text-yellow tracking-wider uppercase mt-2">PALESTRANTES</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1">
                <p className="text-2xl md:text-3xl font-extrabold text-white leading-none">+1200</p>
                <p className="text-[9px] md:text-[10px] font-bold text-yellow tracking-wider uppercase mt-2">PARTICIPANTES</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
