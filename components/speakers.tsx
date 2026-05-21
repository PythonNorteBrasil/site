"use client";

import React from "react";
import Image from "next/image";
import { Github, Linkedin, Globe } from "lucide-react";

export function Speakers() {
  const speakers = [
    {
      name: "Ana Carolina Santos",
      role: "Engenheira de Machine Learning",
      company: "Google",
      talk: "Construindo o futuro com IA e Python de forma escalável",
      image: "/diverse-tech-community-group-photo-at-conference.jpg", // Fallback local image
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        web: "https://google.com"
      }
    },
    {
      name: "Carlos Eduardo Silva",
      role: "Core Developer Python",
      company: "Python Software Foundation",
      talk: "Por dentro do Python 3.14: Novidades, melhorias e performance",
      image: "/diverse-tech-community-group-photo-at-conference.jpg",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      name: "Mariana Souza",
      role: "Lead DevOps Engineer",
      company: "HashiCorp",
      talk: "Automatizando a nuvem na Amazônia: Desafios e soluções de latência",
      image: "/diverse-tech-community-group-photo-at-conference.jpg",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        web: "https://hashicorp.com"
      }
    },
    {
      name: "Tariq da Silva",
      role: "Cientista de Dados",
      company: "Instituto Mamirauá",
      talk: "Python aplicado ao monitoramento da biodiversidade na Floresta Amazônica",
      image: "/diverse-tech-community-group-photo-at-conference.jpg",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    }
  ];

  return (
    <section
      id="palestrantes"
      className="relative py-20 md:py-32 bg-brand-bg text-brand-text"
      aria-label="Palestrantes Convidados"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-10 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-oferta text-brand-green">
              Palestrantes Confirmados
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
            <p className="text-base md:text-lg max-w-2xl mx-auto text-foreground/80 font-medium pt-2">
              Grandes referências nacionais e internacionais compartilhando conhecimento diretamente na região Norte.
            </p>
          </div>

          {/* Speakers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="group relative rounded-3xl border border-black/5 bg-white p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="space-y-6">
                  {/* Photo with double border */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/10 border-2 border-brand-orange/20 group-hover:border-brand-orange transition-all duration-300">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 250px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      {/* Hover Info */}
                      <span className="text-white text-xs font-bold px-3 py-1 bg-brand-orange rounded-full">
                        Ver Palestra
                      </span>
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-foreground font-oferta leading-tight">
                      {speaker.name}
                    </h3>
                    <p className="text-xs font-semibold text-foreground/60 leading-none">
                      {speaker.role} @ <span className="text-brand-orange font-bold">{speaker.company}</span>
                    </p>
                  </div>

                  {/* Talk title */}
                  <p className="text-xs md:text-sm font-medium text-foreground/80 bg-brand-bg p-3.5 rounded-xl border border-black/5 min-h-[72px] line-clamp-3">
                    💬 <span className="italic font-semibold">&ldquo;{speaker.talk}&rdquo;</span>
                  </p>
                </div>

                {/* Social Links */}
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    {speaker.socials.github && (
                      <a
                        href={speaker.socials.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-brand-bg hover:bg-brand-orange/10 hover:text-brand-orange transition-colors text-foreground/60"
                        aria-label={`GitHub de ${speaker.name}`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {speaker.socials.linkedin && (
                      <a
                        href={speaker.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-brand-bg hover:bg-brand-orange/10 hover:text-brand-orange transition-colors text-foreground/60"
                        aria-label={`LinkedIn de ${speaker.name}`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {speaker.socials.web && (
                      <a
                        href={speaker.socials.web}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-brand-bg hover:bg-brand-orange/10 hover:text-brand-orange transition-colors text-foreground/60"
                        aria-label={`Website de ${speaker.name}`}
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-foreground/30">
                    Palestrante
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Submit Talk */}
          <div className="rounded-3xl bg-brand-orange-light/10 border border-brand-orange/20 p-8 md:p-12 shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-brand-orange-dark font-oferta">
                Quer compartilhar seu conhecimento?
              </h3>
              <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-medium">
                A submissão de propostas está aberta! Envie seu tutorial ou palestra técnica e ajude a construir a maior Python Norte da história.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                variant="norte"
                size="lg"
                className="py-6 px-8 rounded-2xl font-bold shadow-md transform hover:-translate-y-0.5 active:translate-y-0 transition-all"
                asChild
              >
                <a href="https://even3.com.br/python-norte-2026-631670?" target="_blank" rel="noreferrer">
                  Submeter Proposta (Call for Papers)
                </a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
