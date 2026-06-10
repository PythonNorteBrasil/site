"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Mic, ArrowRight } from "lucide-react";

interface Session {
  time: string;
  title: string;
  type: "Keynote" | "Palestra" | "Tutorial" | "Credenciamento" | "Intervalo";
  location?: string;
  target?: "Todos" | "Iniciante" | "Intermediário" | "Avançado";
  registrationRequired?: boolean;
  track?: string;
  learningOutcomes?: string;
}

interface DaySchedule {
  dayName: string;
  date: string;
  sessions: Session[];
}

export function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeKeynote, setActiveKeynote] = useState(0);

  const keynotes = [
    {
      id: 1,
      name: "Keynote I - Abertura",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 1 - 08:45",
      title: "Uma revelação inspiradora",
      description:
        "Uma grande referência nacional da tecnologia e inovação compartilhará uma reflexão profunda sobre o impacto da comunidade no desenvolvimento regional. Aguarde a revelação oficial!",
      image: "/secret_speaker.png",
    },
    {
      id: 2,
      name: "Keynote II - Encerramento do Dia 1",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 1 - 15:30",
      title: "Expandindo os limites do código",
      description:
        "Prepare-se para uma palestra técnica provocadora sobre as fronteiras do desenvolvimento de software e tendências emergentes. O segredo será desvendado nos próximos dias.",
      image: "/secret_speaker.png",
    },
    {
      id: 3,
      name: "Keynote III - Abertura do Dia 2",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 2 - 08:30",
      title: "O futuro da IA e dos dados",
      description:
        "Uma das mentes mais influentes no ecossistema global de Inteligência Artificial trará insights valiosos direto das fronteiras do mercado de tecnologia.",
      image: "/secret_speaker.png",
    },
    {
      id: 4,
      name: "Keynote IV - Abertura do Dia 3",
      role: "Palestrante Secreto",
      tag: "Keynote — Dia 3 - 09:00",
      title: "Liderança, Impacto e Sociedade",
      description:
        "Como a tecnologia e a computação em Python impulsionam a transformação e democratização digital na região Norte. Um fechamento com chave de ouro.",
      image: "/secret_speaker.png",
    },
  ];

  const scheduleData: DaySchedule[] = [
    {
      dayName: "Dia 1",
      date: "03/07",
      sessions: [
        {
          time: "08:00 — 08:30",
          title: "Credenciamento e recepção",
          type: "Credenciamento",
        },
        {
          time: "08:30 — 08:45",
          title: "Abertura Oficial do Evento",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Todos",
        },
        {
          time: "08:45 — 09:45",
          title: "Keynote I - Abertura",
          type: "Keynote",
          location: "Auditório Principal",
          target: "Todos",
        },
        {
          time: "09:45 — 12:00",
          title: "Atividade Prática 1",
          type: "Tutorial",
          location: "Lab 1",
          target: "Iniciante",
          registrationRequired: true,
          track: "Web, Cloud & plataforma digitais",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a criar do zero uma aplicação web completa com banco de dados utilizando Django.",
        },
        {
          time: "09:45 — 12:00",
          title: "Atividade Prática 2",
          type: "Tutorial",
          location: "Lab 2",
          target: "Iniciante",
          registrationRequired: true,
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a carregar, limpar, manipular e visualizar conjuntos de dados reais utilizando a biblioteca Pandas.",
        },
        {
          time: "09:45 — 10:15",
          title: "Palestra 01",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Intermediário",
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a estruturar prompts eficazes para otimização de tarefas de desenvolvimento com LLMs.",
        },
        {
          time: "10:15 — 10:45",
          title: "Palestra 02",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Avançado",
          track: "Web, Cloud & plataforma digitais",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão as melhores práticas de performance, concorrência e testes de carga em endpoints assíncronos.",
        },
        { time: "10:45 — 11:00", title: "Coffee Break", type: "Intervalo" },
        {
          time: "11:00 — 11:30",
          title: "Palestra 03",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Todos",
          track: "Comunidades, carreira e liderança Tech",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão estratégias para engajar pessoas, criar conexões duradouras e organizar eventos inclusivos locais.",
        },
        {
          time: "11:30 — 12:00",
          title: "Palestra 04",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Iniciante",
          track: "Open Source, DevOps & Ecossistemas colaborativos",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a empacotar e rodar aplicações em containers isolados de forma simples e rápida.",
        },
        { time: "12:00 — 13:00", title: "Almoço", type: "Intervalo" },
        {
          time: "13:00 — 15:00",
          title: "Atividade Prática 03",
          type: "Tutorial",
          location: "Lab 1",
          target: "Avançado",
          registrationRequired: true,
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a orquestrar múltiplos modelos de linguagem para executar ações automatizadas e tomadas de decisão.",
        },
        {
          time: "13:00 — 15:00",
          title: "Atividade Prática 04",
          type: "Tutorial",
          location: "Lab 2",
          target: "Intermediário",
          registrationRequired: true,
          track: "Open Source, DevOps & Ecossistemas colaborativos",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a estruturar pipelines de teste e deploy automáticos utilizando GitHub Actions.",
        },
        {
          time: "13:00 — 13:30",
          title: "Palestra 05",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Avançado",
          track: "Web, Cloud & plataforma digitais",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a separar responsabilidades, facilitando a manutenção e testes de grandes projetos de software.",
        },
        {
          time: "13:30 — 14:00",
          title: "Palestra 06",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Todos",
          track: "Open Source, DevOps & Ecossistemas colaborativos",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão como encontrar projetos, abrir issues, e submeter pull requests com confiança.",
        },
        {
          time: "14:00 — 14:30",
          title: "Palestra 07",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Todos",
          track: "Comunidades, carreira e liderança Tech",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão habilidades de mentoria, delegação de tarefas e planejamento de crescimento profissional.",
        },
        {
          time: "14:30 — 15:00",
          title: "Palestra 08",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Iniciante",
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão os conceitos fundamentais de algoritmos de classificação e regressão de forma simples.",
        },
        { time: "15:00 — 15:30", title: "Coffee Break", type: "Intervalo" },
        {
          time: "15:30 — 16:30",
          title: "Keynote II - Encerramento do Dia 1",
          type: "Keynote",
          location: "Auditório Principal",
          target: "Todos",
        },
        {
          time: "16:30 — 17:00",
          title: "Dinâmica de encerramento primeiro dia",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Todos",
        },
      ],
    },
    {
      dayName: "Dia 2",
      date: "04/07",
      sessions: [
        {
          time: "08:00 — 08:30",
          title: "Credenciamento e recepção",
          type: "Credenciamento",
        },
        {
          time: "08:30 — 09:30",
          title: "Keynote III - Abertura do Dia 2",
          type: "Keynote",
          location: "Auditório Principal",
          target: "Todos",
        },
        {
          time: "12:15 — 14:00",
          title: "Intervalo (Almoço)",
          type: "Intervalo",
        },
        {
          time: "14:00 — 14:45",
          title: "Palestra 09",
          type: "Palestra",
          location: "Sala 1",
          target: "Avançado",
          track: "Web, Cloud & plataforma digitais",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão estratégias de refatoração e migração segura de infraestrutura legada para provedores de nuvem.",
        },
        {
          time: "14:00 — 14:45",
          title: "Palestra 10",
          type: "Palestra",
          location: "Sala 2",
          target: "Intermediário",
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a pré-processar texto, remover ruídos e extrair sentimentos usando spaCy.",
        },
        {
          time: "14:45 — 15:45",
          title: "Minicurso 01",
          type: "Tutorial",
          location: "Lab 1",
          target: "Iniciante",
          registrationRequired: true,
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a criar seu primeiro modelo preditivo básico usando Scikit-Learn.",
        },
        {
          time: "14:45 — 15:45",
          title: "Minicurso 02",
          type: "Tutorial",
          location: "Lab 2",
          target: "Intermediário",
          registrationRequired: true,
          track: "Web, Cloud & plataforma digitais",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a implementar autenticação JWT e prevenir vulnerabilidades como injeção e CSRF.",
        },
        {
          time: "14:45 — 15:30",
          title: "Palestra 11",
          type: "Palestra",
          location: "Sala 1",
          target: "Iniciante",
          track: "Open Source, DevOps & Ecossistemas colaborativos",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a coletar e transmitir dados físicos usando MicroPython e placas de desenvolvimento.",
        },
        {
          time: "15:30 — 16:45",
          title: "Palestra 12",
          type: "Palestra",
          location: "Sala 1",
          target: "Intermediário",
          track: "Web, Cloud & plataforma digitais",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a construir e gerenciar funções serverless scaláveis integradas com gatilhos de nuvem.",
        },
        {
          time: "15:30 — 16:45",
          title: "Palestra 13",
          type: "Palestra",
          location: "Sala 2",
          target: "Todos",
          track: "Dados, inteligência artificial e machine learning",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão como o ecossistema Scipy/Numpy revolucionou as pesquisas científicas e computacionais.",
        },
        {
          time: "16:15 — 17:00",
          title: "Palestra 14",
          type: "Palestra",
          location: "Sala 1",
          target: "Avançado",
          track: "Open Source, DevOps & Ecossistemas colaborativos",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão a estruturar portais internos de desenvolvedor (IDPs) para simplificar a criação de serviços.",
        },
        {
          time: "16:15 — 17:00",
          title: "Palestra 15",
          type: "Palestra",
          location: "Sala 2",
          target: "Todos",
          track: "Comunidades, carreira e liderança Tech",
          learningOutcomes:
            "Ao final desta atividade, os participantes aprenderão os bastidores de logística, captação de patrocínios e gestão de voluntariado de eventos regionais.",
        },
        {
          time: "17:00 — 18:00",
          title: "Coffee Break & Networking",
          type: "Intervalo",
        },
      ],
    },
    {
      dayName: "Dia 3",
      date: "05/07",
      sessions: [
        {
          time: "09:00 — 10:00",
          title: "Keynote IV - Abertura do Dia 3",
          type: "Keynote",
          location: "Auditório Principal",
          target: "Todos",
        },
        { time: "10:00 — 10:30", title: "Coffee Break", type: "Intervalo" },
        {
          time: "10:30 — 12:00",
          title: "Mesa redonda",
          type: "Palestra",
          location: "Auditório Principal",
          target: "Todos",
          track: "Comunidades, carreira e liderança Tech",
          learningOutcomes:
            "Ao final desta atividade, os participantes compreenderão os desafios, potenciais e caminhos práticos para a transformação digital regional.",
        },
        {
          time: "12:00 — 13:00",
          title: "Encerramento Geral, Sorteios e Agradecimentos",
          type: "Credenciamento",
        },
      ],
    },
  ];

  const filterTypes = [
    {
      type: "Keynote",
      activeBg: "bg-[#004B23] text-white",
      inactiveBg: "bg-[#EAF5EC] text-[#004B23]",
    },
    {
      type: "Palestra",
      activeBg: "bg-[#FFB800] text-white",
      inactiveBg: "bg-[#FFF9E6] text-[#A67C00]",
    },
    {
      type: "Tutorial",
      activeBg: "bg-[#FF6B00] text-white",
      inactiveBg: "bg-[#FFF2EB] text-[#FF6B00]",
    },
    {
      type: "Credenciamento",
      activeBg: "bg-[#9E2A2B] text-white",
      inactiveBg: "bg-[#FFF0F0] text-[#9E2A2B]",
    },
  ];

  const handlePrevKeynote = () => {
    setActiveKeynote((prev) => (prev === 0 ? keynotes.length - 1 : prev - 1));
  };

  const handleNextKeynote = () => {
    setActiveKeynote((prev) => (prev === keynotes.length - 1 ? 0 : prev + 1));
  };

  const handleFilterToggle = (type: string) => {
    setActiveFilter((prev) => (prev === type ? null : type));
  };

  // Get current day's sessions
  const currentDaySessions = scheduleData[activeDay]?.sessions || [];

  // Filter them if activeFilter is set
  const filteredSessions = activeFilter
    ? currentDaySessions.filter((s) => s.type === activeFilter)
    : currentDaySessions;

  return (
    <section id="programacao" className="py-20 md:py-28 bg-[#FAF7F0]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-[#004B23]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Programação
            </h2>
            <div className="w-14 md:w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
            <p className="text-[#4A5D4E] text-sm md:text-base max-w-2xl mx-auto">
              Três dias intensos de aprendizado, networking e muito Python!
            </p>
          </div>

          {/* Keynotes Subtitle */}
          <div className="flex items-center gap-2 pt-8">
            <Star
              className="w-6 h-6 text-[#004B23] fill-none"
              strokeWidth={2}
            />
            <h3
              className="text-xl md:text-2xl font-bold text-[#004B23]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Keynotes
            </h3>
          </div>

          {/* Keynotes Carousel */}
          <div className="relative flex items-center justify-between gap-4">
            {/* Left arrow */}
            <button
              onClick={handlePrevKeynote}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-[#FF6B00]/30 hover:bg-[#FF6B00]/10 transition-colors flex-shrink-0"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-8 h-8 text-[#FF6B00]" />
            </button>

            {/* Carousel Container */}
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
              {keynotes.map((keynote, idx) => {
                const isActiveOnMobile = idx === activeKeynote;
                return (
                  <div
                    key={keynote.id}
                    className={`${
                      isActiveOnMobile ? "flex" : "hidden md:flex"
                    } relative flex-col h-[440px] w-full rounded-[24px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}
                  >
                    {/* Background speaker image */}
                    <div className="absolute inset-0 bg-black/55 z-10 transition-colors group-hover:bg-black/45" />
                    <img
                      src={keynote.image}
                      alt={keynote.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark gradient bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-15" />

                    {/* Content */}
                    <div className="relative z-20 h-full p-6 flex flex-col justify-end space-y-3 text-white">
                      {/* Tag */}
                      <div>
                        <span className="inline-block bg-[#FFB800] text-black text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                          {keynote.tag}
                        </span>
                      </div>

                      {/* Name */}
                      <div>
                        <h4 className="text-lg md:text-xl font-bold leading-tight">
                          {keynote.name}
                        </h4>
                        <p className="text-[10px] text-[#FFB800] font-semibold tracking-wider uppercase">
                          {keynote.role}
                        </p>
                      </div>

                      {/* Title */}
                      <h5 className="text-sm font-semibold text-white/90 italic">
                        &ldquo;{keynote.title}&rdquo;
                      </h5>

                      {/* Description */}
                      <p className="text-xs text-white/80 leading-relaxed line-clamp-4">
                        {keynote.description}
                      </p>

                      {/* Details Link */}
                      <div className="pt-2">
                        <a
                          href="#programacao"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFB800] hover:underline"
                        >
                          Ver cronograma <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right arrow */}
            <button
              onClick={handleNextKeynote}
              className="hidden md:flex w-12 h-12 items-center justify-center rounded-full border border-[#FF6B00]/30 hover:bg-[#FF6B00]/10 transition-colors flex-shrink-0"
              aria-label="Próximo"
            >
              <ChevronRight className="w-8 h-8 text-[#FF6B00]" />
            </button>
          </div>

          {/* Mobile Indicators */}
          <div className="flex md:hidden items-center justify-center gap-6 pt-2">
            <button
              onClick={handlePrevKeynote}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#FF6B00]/30 active:bg-[#FF6B00]/10"
            >
              <ChevronLeft className="w-6 h-6 text-[#FF6B00]" />
            </button>
            <div className="flex gap-2">
              {keynotes.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeKeynote
                      ? "bg-[#FF6B00] w-6"
                      : "bg-[#FF6B00]/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextKeynote}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[#FF6B00]/30 active:bg-[#FF6B00]/10"
            >
              <ChevronRight className="w-6 h-6 text-[#FF6B00]" />
            </button>
          </div>

          {/* Day Switcher */}
          <div className="flex justify-center gap-4 pt-12">
            {scheduleData.map((day, idx) => {
              const isActive = idx === activeDay;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveDay(idx);
                    setActiveFilter(null); // Clear filter when switching days
                  }}
                  className={`px-6 py-2 rounded-full font-bold text-xs sm:text-sm border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-[#004B23] text-white border-[#004B23] shadow-md"
                      : "bg-white text-[#004B23] border-[#004B23]/30 hover:border-[#004B23]"
                  }`}
                >
                  {day.dayName} - {day.date}
                </button>
              );
            })}
          </div>

          {/* Legend/Filter Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4 pb-8">
            {filterTypes.map((item) => {
              const isSelected = activeFilter === item.type;
              return (
                <button
                  key={item.type}
                  onClick={() => handleFilterToggle(item.type)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 border border-transparent shadow-sm ${
                    isSelected
                      ? item.activeBg
                      : `${item.inactiveBg} hover:opacity-90`
                  }`}
                >
                  {item.type}
                </button>
              );
            })}
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            {filteredSessions.map((session, index) => {
              let rowBg = "bg-white";
              let borderLeft = "border-l-4 border-gray-300";
              let badgeBg = "bg-gray-500 text-white";

              switch (session.type) {
                case "Keynote":
                  rowBg = "bg-[#F4FAF5]";
                  borderLeft = "border-l-[6px] border-[#004B23]";
                  badgeBg = "bg-[#004B23] text-white";
                  break;
                case "Palestra":
                  rowBg = "bg-[#FFFDF0]";
                  borderLeft = "border-l-[6px] border-[#FFB800]";
                  badgeBg = "bg-[#FFB800] text-white";
                  break;
                case "Tutorial":
                  rowBg = "bg-[#FFF6F2]";
                  borderLeft = "border-l-[6px] border-[#FF6B00]";
                  badgeBg = "bg-[#FF6B00] text-white";
                  break;
                case "Credenciamento":
                  rowBg = "bg-[#FFF5F5]";
                  borderLeft = "border-l-[6px] border-[#9E2A2B]";
                  badgeBg = "bg-[#9E2A2B] text-white";
                  break;
                case "Intervalo":
                  rowBg = "bg-[#F5F7F8]";
                  borderLeft = "border-l-[6px] border-[#7F8C8D]";
                  badgeBg = "bg-[#7F8C8D] text-white";
                  break;
              }

              return (
                <div
                  key={index}
                  className={`flex flex-col sm:flex-row sm:items-start justify-between p-4 sm:p-5 rounded-2xl ${rowBg} ${borderLeft} shadow-sm border border-[#004B23]/5 transition-all duration-200 gap-4`}
                >
                  {/* Left part: Time, Badge, Title, Track, Learning outcomes */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 flex-grow">
                    <span className="text-sm font-bold text-[#4A5D4E] min-w-[90px] pt-1">
                      {session.time}
                    </span>

                    <div className="flex flex-col gap-2 flex-grow">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${badgeBg}`}
                        >
                          {session.type}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-[#004B23] tracking-tight">
                          {session.title}
                        </span>
                      </div>

                      {session.track && (
                        <div className="text-[11px] font-semibold text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 self-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                          Trilha: {session.track}
                        </div>
                      )}

                      {session.learningOutcomes && (
                        <p className="text-xs text-[#5D6B60] leading-relaxed font-sans max-w-3xl">
                          <span className="font-semibold text-[#3D4C40]">
                            O que os participantes irão aprender ao final da
                            atividade:
                          </span>{" "}
                          {session.learningOutcomes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right part: Target, Location, Registration Status */}
                  <div className="flex items-center gap-3 flex-wrap self-start sm:self-auto pt-1">
                    {session.target && (
                      <span
                        className={`text-[10px] font-bold px-3 py-0.5 rounded-full ${
                          session.target === "Todos"
                            ? "bg-[#E2F0D9] text-[#385723]"
                            : session.target === "Iniciante"
                              ? "bg-[#DDEBF7] text-[#1F4E79]"
                              : session.target === "Intermediário"
                                ? "bg-[#FCE4D6] text-[#C65911]"
                                : "bg-[#E1D5E7] text-[#6C3483]"
                        }`}
                      >
                        {session.target}
                      </span>
                    )}

                    {session.location && (
                      <span className="text-xs text-[#4A5D4E] font-semibold bg-black/5 px-2.5 py-0.5 rounded-md">
                        {session.location}
                      </span>
                    )}

                    {session.registrationRequired && (
                      <span className="text-[10px] font-bold text-[#C65911] border border-[#C65911]/30 px-2.5 py-0.5 rounded-full bg-[#FFF2EB]">
                        Inscrição obrigatória
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Submit Talk */}
          <div className="bg-[#004B23] rounded-[24px] p-8 md:p-12 text-white shadow-xl text-center space-y-6 flex flex-col items-center max-w-4xl mx-auto pt-16 mt-8">
            <div className="w-14 h-14 bg-[#FFF8E7]/10 rounded-full flex items-center justify-center border border-[#FFB800]/20">
              <Mic className="w-7 h-7 text-[#FFB800]" />
            </div>

            <div className="space-y-3 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Quer palestrar na Python Norte 2026?
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans">
                Submeta sua proposta de palestra, tutorial ou lightning talk!
                Buscamos conteúdo diverso, de todos os níveis, sobre Python e
                tecnologia.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://talks.python.org.br/python-norte-2026/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-bold py-3.5 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
              >
                Submeter Proposta <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
