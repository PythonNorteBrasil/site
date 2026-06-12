"use client";

import { MapPin, ExternalLink } from "lucide-react";

export function Location() {
  return (
    <section id="localizacao" className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-green-deep"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Mapa de acesso à Python Norte 2026
            </h2>
            <div className="w-14 md:w-16 h-1 bg-orange mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-yellow/20 h-80 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.646468638551!2d-48.417078924361974!3d-1.3886986985981782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48ac3fd3b0361%3A0x6a489ad6fc3de18e!2sUNAMA%20-%20Ananindeua!5e0!3m2!1spt-BR!2sbr!4v1779635675756!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização UNAMA Ananindeua"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white border border-yellow/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-deep/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-green-deep" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      UNAMA - Campus Ananindeua
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Rodovia BR-316, Km 03 — Coqueiro,
                      <br />
                      Ananindeua - Pará - Brasil, 67113-901
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-yellow/20 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-gray-900">Como chegar</h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-orange font-bold">🚌</span>
                    <span>
                      Ônibus: Linhas que passam pela BR-316
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange font-bold">🚗</span>
                    <span>
                      Carro: Estacionamento gratuito disponível no campus
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange font-bold">🛩️</span>
                    <span>
                      Aeroporto: Aeroporto Internacional de Belém (25km)
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href="https://maps.app.goo.gl/8N5L7b1CYZutaGtB9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-deep hover:bg-green-medium text-white font-bold text-sm px-6 py-3 rounded-full shadow-md transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
