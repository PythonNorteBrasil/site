"use client";

import { Star, BookOpen, Wrench, Zap } from "lucide-react";

export function Activities() {
  const activities = [
    {
      icon: Star,
      badge: "Palestra",
      badgeColor: "bg-green-deep text-white",
      title: "A Grande Estreia",
      description: "Apresentação das palestras principais, painéis e discussões com os maiores nomes da tecnologia.",
    },
    {
      icon: BookOpen,
      badge: "Workshops",
      badgeColor: "bg-orange text-white",
      title: "Compartilhando Saber",
      description: "Aprenda na prática com especialistas em workshops focados em desenvolvimento e muito mais.",
    },
    {
      icon: Wrench,
      badge: "Hackathon",
      badgeColor: "bg-yellow text-gray-900",
      title: "Mão na Massa",
      description: "Trabalhe em equipe e desenvolva projetos rápidos em sessões de hackathon e maratonas.",
    },
    {
      icon: Zap,
      badge: "Lightning Talks",
      badgeColor: "bg-green-deep text-white",
      title: "Palco de Ideias",
      description: "Apresente suas próprias ideias em palestras rápidas e dinâmicas na trilha de Lightning Talks.",
    },
  ];

  return (
    <section id="atividades" className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-green-deep" style={{ fontFamily: "var(--font-display)" }}>
              Sobre as Atividades
            </h2>
            <div className="w-20 h-1 bg-orange mx-auto rounded-full" />
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Entenda cada formato de atividade e o que esperar de cada uma durante os três dias de evento.
            </p>
          </div>

          {/* Activity cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="bg-cream-card border border-yellow/20 rounded-2xl p-6 space-y-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-green-deep/10 flex items-center justify-center">
                    <activity.icon className="w-6 h-6 text-green-deep" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${activity.badgeColor}`}>
                    {activity.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900">{activity.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
