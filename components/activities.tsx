"use client";

import { Star, Mic, BookOpen, Zap, Clock } from "lucide-react";

export function Activities() {
  const activities = [
    {
      icon: Star,
      badge: "Keynote",
      badgeBg: "bg-[#2C6E49]",
      title: "A Grande Estrela",
      duration: "~50 minutos",
      description:
        "Apresentações de alto impacto com palestrantes convidados de destaque na comunidade Python. As keynotes abrem os dias do evento e costumam ser os momentos mais marcantes, com visões inspiradoras sobre tecnologia e comunidade.",
      borderClass: "border-[#A9C2A6]",
      bgClass: "bg-[#F2F5EF]",
      iconColorClass: "text-[#2C6E49]",
      titleColorClass: "text-[#0A361C]",
      textColorClass: "text-[#4A5D4E]",
    },
    {
      icon: Mic,
      badge: "Palestra",
      badgeBg: "bg-[#FFB800]",
      title: "Compartilhando Saber",
      duration: "~40 minutos",
      description:
        "Apresentações técnicas sobre os mais variados temas do ecossistema Python. Das palestras surgem os debates mais ricos, com espaço para Q&A ao final. Qualquer membro da comunidade pode submeter uma proposta!",
      borderClass: "border-[#EDD5A6]",
      bgClass: "bg-[#FAF4E8]",
      iconColorClass: "text-[#D48C00]",
      titleColorClass: "text-[#3C2F12]",
      textColorClass: "text-[#6B5C3F]",
    },
    {
      icon: BookOpen,
      badge: "Tutorial",
      badgeBg: "bg-[#FF6B00]",
      title: "Mão na Massa",
      duration: "~60-80 minutos",
      description:
        "Workshops práticos e hands-on onde você aprende fazendo. Tutoriais requerem inscrição prévia e têm vagas limitadas para garantir atenção personalizada. Traga seu notebook!",
      borderClass: "border-[#F2C4B1]",
      bgClass: "bg-[#FDF5F0]",
      iconColorClass: "text-[#D95A2B]",
      titleColorClass: "text-[#401D0E]",
      textColorClass: "text-[#6D4F42]",
    },
    {
      icon: Zap,
      badge: "Lightning Talk",
      badgeBg: "bg-[#00A63E]",
      title: "Faísca de Ideias",
      duration: "~5 minutos",
      description:
        "Apresentações relâmpago de apenas 5 minutos! Perfeitas para apresentar um projeto, compartilhar uma descoberta ou contar uma história. Se você tem algo valioso a dizer mas não sabe se tem assunto para 40 min, esta é sua chance!",
      borderClass: "border-[#C7DBB2]",
      bgClass: "bg-[#F3F7EE]",
      iconColorClass: "text-[#4CAF50]",
      titleColorClass: "text-[#153B18]",
      textColorClass: "text-[#4A5F4D]",
    },
  ];

  return (
    <section
      id="atividades"
      className="py-8 md:py-10 bg-[#FAF7F0] scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-10">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-[#004B23]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sobre as Atividades
            </h2>

            <div className="w-14 md:w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />

            <p className="text-[#004B23]/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Entenda cada formato de atividade e o que esperar de cada uma
              durante os três dias de evento
            </p>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4">
            {activities.map((activity, i) => (
              <div
                key={i}
                className={`
                  border
                  ${activity.borderClass}
                  ${activity.bgClass}
                  rounded-2xl
                  p-4
                  shadow-sm
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <activity.icon
                      className={`w-6 h-6 ${activity.iconColorClass}`}
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-white ${activity.badgeBg}`}
                      >
                        {activity.badge}
                      </span>

                      <div
                        className={`flex items-center gap-1 text-[11px] font-semibold ${activity.textColorClass} opacity-80`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{activity.duration}</span>
                      </div>
                    </div>

                    <h3
                      className={`text-base font-bold ${activity.titleColorClass} mb-2`}
                    >
                      {activity.title}
                    </h3>

                    <p
                      className={`text-xs leading-relaxed ${activity.textColorClass}`}
                    >
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          {/* Desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {activities.map((activity, i) => (
              <div
                key={i}
                className={`
        border
        ${activity.borderClass}
        ${activity.bgClass}
        rounded-[20px]
        p-5
        flex flex-col items-center
        text-center
        space-y-3
        shadow-sm
        hover:shadow-md
        hover:-translate-y-1
        transition-all duration-300
      `}
              >
                <activity.icon
                  className={`w-7 h-7 ${activity.iconColorClass}`}
                  strokeWidth={1.5}
                />

                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full text-white ${activity.badgeBg}`}
                >
                  {activity.badge}
                </span>

                <h3
                  className={`text-base font-bold ${activity.titleColorClass} leading-tight`}
                >
                  {activity.title}
                </h3>

                <div
                  className={`flex items-center gap-1 text-[11px] font-semibold ${activity.textColorClass} opacity-80`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{activity.duration}</span>
                </div>

                <p
                  className={`text-[13px] leading-6 ${activity.textColorClass}`}
                >
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
