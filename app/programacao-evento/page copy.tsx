"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PretalxWidget } from "@/components/pretalx-widget";
import { Calendar } from "lucide-react";

export default function ProgramacaoPretalxPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-[74px] md:pt-[74px] pb-12 md:pb-16 bg-[#FAF7F0]">
        <div className="container mx-auto px-3 sm:px-4 md:px-6">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            {/* Header */}
            <div className="text-center space-y-2 md:space-y-3 px-2">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#004B23] leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Programação
              </h1>
              <div className="w-12 md:w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
              <p className="text-sm md:text-base lg:text-lg text-[#4A5D4E] max-w-3xl mx-auto leading-relaxed">
                Confira a programação completa da Python Norte 2026
              </p>

              {/* CTA — programação detalhada */}
              <div className="pt-2">
                <a
                  href="/programacao"
                  className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-95 text-sm md:text-base"
                >
                  <Calendar className="w-4 h-4" /> Monte sua programação
                </a>
              </div>
            </div>

            {/* Widget Pretalx */}
            <div className="bg-white rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-[#004B23]/10 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#004B23]/10">
                <Calendar className="w-5 h-5 text-[#004B23]" />
                <h2 className="text-base md:text-lg font-bold text-[#004B23]">
                  Grade de Programação
                </h2>
              </div>

              <PretalxWidget
                eventUrl="https://talks.python.org.br/python-norte-2026/"
                locale="pt-br"
                format="grid"
                primaryColor="#de7130"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
