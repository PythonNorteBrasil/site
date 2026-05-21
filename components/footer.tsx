"use client";

import { Instagram, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-deep text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <img src="/favico.png" alt="Python Norte" className="w-8 h-8" />
                <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  PYTHON<span className="text-orange">NORTE</span>
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                A maior conferência Python da região Norte do Brasil, organizada pela comunidade, para a comunidade.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/40">Evento</h4>
              <nav className="flex flex-col gap-2">
                <a href="#sobre" className="text-sm text-white/70 hover:text-white transition-colors">Sobre</a>
                <a href="#atividades" className="text-sm text-white/70 hover:text-white transition-colors">Atividades</a>
                <a href="#programacao" className="text-sm text-white/70 hover:text-white transition-colors">Programação</a>
                <a href="#ingressos" className="text-sm text-white/70 hover:text-white transition-colors">Ingressos</a>
              </nav>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/40">Institucional</h4>
              <nav className="flex flex-col gap-2">
                <a href="#patrocinadores" className="text-sm text-white/70 hover:text-white transition-colors">Patrocinadores</a>
                <a href="#localizacao" className="text-sm text-white/70 hover:text-white transition-colors">Localização</a>
                <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</a>
                <a href="https://pythonnorte.org" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">pythonnorte.org</a>
              </nav>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white/40">Contato</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contato@pythonnorte.org"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  contato@pythonnorte.org
                </a>
                <a
                  href="https://instagram.com/pythonnorte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @pythonnorte
                </a>
                <a
                  href="https://t.me/pythonnorte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {currentYear} Python Norte. Todos os direitos reservados.
            </p>
            <p className="text-xs text-white/40">
              Feito com 🐍 pela comunidade Python do Norte
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
