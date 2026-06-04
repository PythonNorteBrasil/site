"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function Media() {
  const articles = [
    {
      title: "Python Norte 2025 reuniu centenas de desenvolvedores em Belém",
      source: "Diário do Pará",
      url: "#",
      image: "/54635610770_b2cbf396d6_b.jpg",
    },
    {
      title: "Comunidade Python cresce na região amazônica com eventos anuais",
      source: "O Liberal",
      url: "#",
      image: "/54031670507_d1e7fb8bb9_b.jpg",
    },
    {
      title:
        "Evento de tecnologia em Ananindeua atrai desenvolvedores de todo o Norte",
      source: "Portal Amazônia",
      url: "#",
      image: "/53231441451_36d2be88e1_b.jpg",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-green-deep"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Saiu na Mídia
            </h2>
            <div className="w-14 md:w-16 h-1 bg-orange mx-auto rounded-full" />
          </div>

          {/* Media cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <a
                key={i}
                href={article.url}
                className="group bg-cream-card border border-yellow/20 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-xs font-bold text-orange">
                    {article.source}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-green-deep transition-colors">
                    {article.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-green-deep font-semibold">
                    Ler mais <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
