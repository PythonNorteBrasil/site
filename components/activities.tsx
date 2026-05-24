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
      description: "Apresentações de alto impacto com palestrantes convidados de destaque na comunidade Python. As keynotes abrem os dias do evento e costumam ser os momentos mais marcantes, com visões inspiradoras sobre tecnologia e comunidade.",
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
      description: "Apresentações técnicas sobre os mais variados temas do ecossistema Python. Das palestras surgem os debates mais ricos, com espaço para Q&A ao final. Qualquer membro da comunidade pode submeter uma proposta!",
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
      description: "Workshops práticos e hands-on onde você aprende fazendo. Tutoriais requerem inscrição prévia e têm vagas limitadas para garantir atenção personalizada. Traga seu notebook!",
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
      description: "Apresentações relâmpago de apenas 5 minutos! Perfeitas para apresentar um projeto, compartilhar uma descoberta ou contar uma história. Se você tem algo valioso a dizer mas não sabe se tem assunto para 40 min, esta é sua chance!",
      borderClass: "border-[#C7DBB2]",
      bgClass: "bg-[#F3F7EE]",
      iconColorClass: "text-[#4CAF50]",
      titleColorClass: "text-[#153B18]",
      textColorClass: "text-[#4A5F4D]",
    },
  ];

  return (
    <section id="atividades" className="py-20 md:py-28 bg-[#FAF7F0]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#004B23]" style={{ fontFamily: "var(--font-display)" }}>
              Sobre as Atividades
            </h2>
            {/* Split color divider: green on left, orange on right */}
            <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
            <p className="text-[#004B23]/80 text-sm md:text-base max-w-2xl mx-auto whitespace-pre-line leading-relaxed font-sans">
              Entenda cada formato de atividade e o que esperar de cada uma{"\n"}
              durante os três dias de evento
            </p>
          </div>

          {/* Activity cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, i) => (
              <div
                key={i}
                className={`border ${activity.borderClass} ${activity.bgClass} rounded-[24px] p-6 md:p-8 flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
              >
                {/* Icon */}
                <activity.icon className={`w-8 h-8 ${activity.iconColorClass}`} strokeWidth={1.5} />
                
                {/* Badge Pill */}
                <span className={`text-[11px] font-bold px-4 py-1 rounded-full text-white ${activity.badgeBg}`}>
                  {activity.badge}
                </span>

                {/* Title */}
                <h3 className={`text-base md:text-lg font-bold ${activity.titleColorClass} leading-tight`}>
                  {activity.title}
                </h3>

                {/* Duration */}
                <div className={`flex items-center gap-1.5 text-xs font-semibold ${activity.textColorClass} opacity-80`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activity.duration}</span>
                </div>

                {/* Description */}
                <p className={`text-xs md:text-sm leading-relaxed ${activity.textColorClass}`}>
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
