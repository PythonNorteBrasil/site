"use client";

import React from "react";

export function CulturalBand() {
  const items = [
    "AMAZÔNIA",
    "TECNOLOGIA",
    "DIVERSIDADE",
    "COMPARTILHAMENTO",
    "AFETO",
    "PYTHON NORTE 2026",
    "ANANINDEUA",
    "PARÁ",
  ];

  return (
    <section className="w-full bg-brand-yellow py-4 overflow-hidden border-y-2 border-brand-green/20 select-none pointer-events-none z-10 relative">
      <div className="flex w-max gap-12 animate-marquee">
        {/* Render twice for seamless looping */}
        {[1, 2].map((loop) => (
          <div key={loop} className="flex gap-12 items-center justify-around">
            {items.map((item, idx) => (
              <span
                key={`${loop}-${idx}`}
                className="text-brand-green-darker font-bold tracking-widest text-sm md:text-base uppercase font-oferta flex items-center gap-12"
              >
                <span>{item}</span>
                <span className="text-brand-orange text-lg">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
