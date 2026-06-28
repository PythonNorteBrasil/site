"use client";

import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KeynoteCard } from "./keynote-card";
import keynotesData from "@/data/keynotes.json";

export function Keynotes() {
  return (
    <section
      id="keynotes"
      className="relative min-h-[100vh] lg:min-h-[calc(100vh-3.5rem)] flex items-center py-10 md:py-10 bg-brand-bg text-brand-text scroll-mt-0"
      aria-label="Keynotes"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-10 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2">
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

          {/* Keynotes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {keynotesData.map((keynote) => (
              <KeynoteCard
                key={keynote.id}
                name={keynote.name}
                role={keynote.role}
                tag={keynote.tag}
                title={keynote.title}
                description={keynote.description}
                image={keynote.image}
                socials={keynote.socials}
              />
            ))}
          </div>

          {/* CTA to Full Schedule */}
          {/* <div className="rounded-2xl bg-brand-orange-light/10 border border-brand-orange/20 p-8 md:p-12 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center border border-brand-orange/20">
                  <Calendar className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-brand-orange-dark font-oferta">
                  Veja a programação completa
                </h3>
              </div>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                Explore todas as palestras, tutoriais e atividades dos três dias
                de evento. Crie sua agenda personalizada e não perca nada!
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/programacao"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/90 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Ver Programação <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
