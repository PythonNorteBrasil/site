"use client";

import Image from "next/image";
import { Calendar, MapPin, Users, Mic, Award } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24"
      style={{ background: "linear-gradient(135deg, #003018 0%, #004B23 40%, #006B2D 100%)" }}
    >
      {/* Grass/foliage texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/image.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-deep/30 to-green-deep/80 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="flex flex-col items-start space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              A MAIOR
              <br />
              <span className="text-yellow">CONFERÊNCIA</span>
              <br />
              PYTHON <span className="text-orange">DO NORTE</span>
            </h1>

            <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Três dias de imersão em tecnologia, inovação e conexão, reunindo
              desenvolvedores das mais diversas regiões para trocar experiências,
              compartilhar conhecimentos e fortalecer a comunidade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="https://www.even3.com.br/python-norte-2026-631670/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-orange-hover text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all text-center"
              >
                Garanta seu ingresso
              </a>
              <a
                href="#programacao"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-base px-8 py-4 rounded-full transition-all text-center"
              >
                Ver programação
              </a>
            </div>

            {/* Event details pills */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2.5 rounded-xl text-white text-sm">
                <Calendar className="w-4 h-4 text-orange" />
                <span className="font-semibold">03 a 05 de Julho 2026</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2.5 rounded-xl text-white text-sm">
                <MapPin className="w-4 h-4 text-yellow" />
                <span className="font-semibold">UNAMA - Ananindeua - PA</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-lg bg-orange/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange" />
                </div>
                <div>
                  <p className="text-lg font-bold">03</p>
                  <p className="text-xs text-white/60">Dias de imersão</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-lg bg-yellow/20 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-yellow" />
                </div>
                <div>
                  <p className="text-lg font-bold">10+</p>
                  <p className="text-xs text-white/60">Palestrantes</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-lg bg-green-light/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-light" />
                </div>
                <div>
                  <p className="text-lg font-bold">+1200</p>
                  <p className="text-xs text-white/60">Participantes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Photo collage */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-lg">
              {/* Main photo */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src="/54635610770_b2cbf396d6_b.jpg"
                  alt="Python Norte 2025"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Secondary photo */}
              <div className="absolute -bottom-8 -left-8 w-48 h-36 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                <Image
                  src="/54031670507_d1e7fb8bb9_b.jpg"
                  alt="Python Norte 2024"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Third photo */}
              <div className="absolute -top-6 -right-6 w-40 h-32 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                <Image
                  src="/53231441451_36d2be88e1_b.jpg"
                  alt="Python Norte 2023"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
