"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Users, MapPin } from "lucide-react";

export function Communities() {
  const communities = [
    { name: "Python Pará", city: "Belém, PA", label: "PyPA" },
    { name: "Python Amazonas", city: "Manaus, AM", label: "PyAM" },
    { name: "Python Rondônia", city: "Porto Velho, RO", label: "PyRO" },
    { name: "Python Tocantins", city: "Palmas, TO", label: "PyTO" },
    { name: "Python Acre", city: "Rio Branco, AC", label: "PyAC" },
    { name: "Python Roraima", city: "Boa Vista, RR", label: "PyRR" },
    { name: "Python Amapá", city: "Macapá, AP", label: "PyAP" },
    { name: "PyLadies Norte", city: "Regional Norte", label: "PyLadies" }
  ];

  return (
    <section
      id="comunidades"
      className="relative py-20 md:py-32 bg-slate-50 text-brand-text overflow-hidden"
      aria-label="Comunidades Apoiadoras"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-5 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-oferta text-brand-orange">
              Comunidades Locais
            </h2>
            <div className="w-24 h-1.5 bg-brand-green mx-auto rounded-full" />
            <p className="text-base md:text-lg max-w-2xl mx-auto text-foreground/80 font-medium pt-2">
              <strong>Comunidades são pontes, não muros.</strong> Conheça as comunidades locais que apoiam a Python Norte e constroem esse movimento todos os dias.
            </p>
          </div>

          {/* Communities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communities.map((community, index) => (
              <Card
                key={index}
                className="group relative rounded-3xl border border-black/5 bg-white p-6 flex flex-col items-center justify-between text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="space-y-4 flex flex-col items-center">
                  {/* Badge Circle placeholder */}
                  <div className="h-16 w-16 rounded-full bg-brand-bg border border-black/5 flex items-center justify-center text-brand-green font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                    {community.label}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-bold text-foreground font-oferta leading-tight">
                      {community.name}
                    </h3>
                    <p className="text-xs text-foreground/50 font-bold flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3 text-brand-orange" />
                      {community.city}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-black/5 w-full flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-foreground/30">
                  <Users className="w-3.5 h-3.5 text-brand-green" />
                  <span>Apoiadora</span>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
