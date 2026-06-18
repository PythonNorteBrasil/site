"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { Footer } from "@/components/footer";
import {
  Star,
  Bookmark,
  BookmarkCheck,
  Download,
  Filter,
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
} from "lucide-react";

interface Session {
  id: string;
  time: string;
  title: string;
  type: "Keynote" | "Palestra" | "Tutorial" | "Credenciamento" | "Intervalo";
  location?: string;
  target?: "Todos" | "Iniciante" | "Intermediário" | "Avançado";
  registrationRequired?: boolean;
  track?: string;
  learningOutcomes?: string;
  day: number;
}

export default function ProgramacaoPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeFilters, setActiveFilters] = useState<{
    type: string[];
    target: string[];
    track: string[];
  }>({
    type: [],
    target: [],
    track: [],
  });
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Load saved sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pythonNorteAgenda");
    if (saved) {
      setSavedSessions(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save to localStorage whenever savedSessions changes
  useEffect(() => {
    localStorage.setItem(
      "pythonNorteAgenda",
      JSON.stringify(Array.from(savedSessions)),
    );
  }, [savedSessions]);

  const allSessions: Session[] = [
    // Day 1
    {
      id: "d1-1",
      day: 1,
      time: "08:00 — 08:30",
      title: "Credenciamento e recepção",
      type: "Credenciamento",
    },
    {
      id: "d1-2",
      day: 1,
      time: "08:30 — 08:45",
      title: "Abertura Oficial do Evento",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d1-3",
      day: 1,
      time: "08:45 — 09:45",
      title: "Keynote I - Abertura",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d1-4",
      day: 1,
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
      id: "d1-5",
      day: 1,
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
      id: "d1-6",
      day: 1,
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
      id: "d1-7",
      day: 1,
      time: "10:15 — 10:45",
      title: "Palestra 02",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Avançado",
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão as melhores práticas de performance, concorrência e testes de carga em endpoints assíncronos.",
    },
    {
      id: "d1-8",
      day: 1,
      time: "10:45 — 11:00",
      title: "Coffee Break",
      type: "Intervalo",
    },
    {
      id: "d1-9",
      day: 1,
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
      id: "d1-10",
      day: 1,
      time: "11:30 — 12:00",
      title: "Palestra 04",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Iniciante",
      track: "Open Source, DevOps & Ecossistemas colaborativos",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a empacotar e rodar aplicações em containers isolados de forma simples e rápida.",
    },
    {
      id: "d1-11",
      day: 1,
      time: "12:00 — 13:00",
      title: "Almoço",
      type: "Intervalo",
    },
    {
      id: "d1-12",
      day: 1,
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
      id: "d1-13",
      day: 1,
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
      id: "d1-14",
      day: 1,
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
      id: "d1-15",
      day: 1,
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
      id: "d1-16",
      day: 1,
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
      id: "d1-17",
      day: 1,
      time: "14:30 — 15:00",
      title: "Palestra 08",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Iniciante",
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão os conceitos fundamentais de algoritmos de classificação e regressão de forma simples.",
    },
    {
      id: "d1-18",
      day: 1,
      time: "15:00 — 15:30",
      title: "Coffee Break",
      type: "Intervalo",
    },
    {
      id: "d1-19",
      day: 1,
      time: "15:30 — 16:30",
      title: "Keynote II - Encerramento do Dia 1",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d1-20",
      day: 1,
      time: "16:30 — 17:00",
      title: "Dinâmica de encerramento primeiro dia",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
    },
    // Day 2
    {
      id: "d2-1",
      day: 2,
      time: "08:00 — 08:30",
      title: "Credenciamento e recepção",
      type: "Credenciamento",
    },
    {
      id: "d2-2",
      day: 2,
      time: "08:30 — 09:30",
      title: "Keynote III - Abertura do Dia 2",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d2-3",
      day: 2,
      time: "12:15 — 14:00",
      title: "Intervalo (Almoço)",
      type: "Intervalo",
    },
    {
      id: "d2-4",
      day: 2,
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
      id: "d2-5",
      day: 2,
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
      id: "d2-6",
      day: 2,
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
      id: "d2-7",
      day: 2,
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
      id: "d2-8",
      day: 2,
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
      id: "d2-9",
      day: 2,
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
      id: "d2-10",
      day: 2,
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
      id: "d2-11",
      day: 2,
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
      id: "d2-12",
      day: 2,
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
      id: "d2-13",
      day: 2,
      time: "17:00 — 18:00",
      title: "Coffee Break & Networking",
      type: "Intervalo",
    },
    // Day 3
    {
      id: "d3-1",
      day: 3,
      time: "09:00 — 10:00",
      title: "Keynote IV - Abertura do Dia 3",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d3-2",
      day: 3,
      time: "10:00 — 10:30",
      title: "Coffee Break",
      type: "Intervalo",
    },
    {
      id: "d3-3",
      day: 3,
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
      id: "d3-4",
      day: 3,
      time: "12:00 — 13:00",
      title: "Encerramento Geral, Sorteios e Agradecimentos",
      type: "Credenciamento",
    },
  ];

  const days = [
    { name: "Dia 1", date: "03/07", dayNum: 1 },
    { name: "Dia 2", date: "04/07", dayNum: 2 },
    { name: "Dia 3", date: "05/07", dayNum: 3 },
  ];

  const filterOptions = {
    type: [
      { value: "Keynote", label: "Keynote", color: "bg-[#004B23]" },
      { value: "Palestra", label: "Palestra", color: "bg-[#FFB800]" },
      { value: "Tutorial", label: "Tutorial", color: "bg-[#FF6B00]" },
      {
        value: "Credenciamento",
        label: "Credenciamento",
        color: "bg-[#9E2A2B]",
      },
      { value: "Intervalo", label: "Intervalo", color: "bg-[#7F8C8D]" },
    ],
    target: [
      { value: "Todos", label: "Todos" },
      { value: "Iniciante", label: "Iniciante" },
      { value: "Intermediário", label: "Intermediário" },
      { value: "Avançado", label: "Avançado" },
    ],
    track: [
      { value: "Web, Cloud & plataforma digitais", label: "Web & Cloud" },
      {
        value: "Dados, inteligência artificial e machine learning",
        label: "IA & ML",
      },
      {
        value: "Open Source, DevOps & Ecossistemas colaborativos",
        label: "DevOps & Open Source",
      },
      {
        value: "Comunidades, carreira e liderança Tech",
        label: "Carreira & Liderança",
      },
    ],
  };

  const toggleFilter = (
    category: keyof typeof activeFilters,
    value: string,
  ) => {
    setActiveFilters((prev) => {
      const current = prev[category];
      const newFilters = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [category]: newFilters };
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({ type: [], target: [], track: [] });
  };

  const toggleSaveSession = (sessionId: string) => {
    setSavedSessions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sessionId)) {
        newSet.delete(sessionId);
      } else {
        newSet.add(sessionId);
      }
      return newSet;
    });
  };

  const exportAgenda = () => {
    const saved = allSessions.filter((s) => savedSessions.has(s.id));
    const text = saved
      .map(
        (s) =>
          `${days[s.day - 1].name} (${days[s.day - 1].date}) - ${s.time}\n${s.title}${s.location ? ` - ${s.location}` : ""}\n`,
      )
      .join("\n");

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "minha-agenda-python-norte-2026.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter sessions
  const filteredSessions = allSessions.filter((session) => {
    const dayMatch = session.day === days[activeDay].dayNum;

    const typeMatch =
      activeFilters.type.length === 0 ||
      activeFilters.type.includes(session.type);

    const targetMatch =
      activeFilters.target.length === 0 ||
      (session.target && activeFilters.target.includes(session.target));

    const trackMatch =
      activeFilters.track.length === 0 ||
      (session.track && activeFilters.track.includes(session.track));

    return dayMatch && typeMatch && targetMatch && trackMatch;
  });

  const hasActiveFilters =
    activeFilters.type.length > 0 ||
    activeFilters.target.length > 0 ||
    activeFilters.track.length > 0;

  const getSessionStyle = (type: Session["type"]) => {
    switch (type) {
      case "Keynote":
        return {
          bg: "bg-[#F4FAF5]",
          border: "border-l-[6px] border-[#004B23]",
          badge: "bg-[#004B23] text-white",
        };
      case "Palestra":
        return {
          bg: "bg-[#FFFDF0]",
          border: "border-l-[6px] border-[#FFB800]",
          badge: "bg-[#FFB800] text-white",
        };
      case "Tutorial":
        return {
          bg: "bg-[#FFF6F2]",
          border: "border-l-[6px] border-[#FF6B00]",
          badge: "bg-[#FF6B00] text-white",
        };
      case "Credenciamento":
        return {
          bg: "bg-[#FFF5F5]",
          border: "border-l-[6px] border-[#9E2A2B]",
          badge: "bg-[#9E2A2B] text-white",
        };
      case "Intervalo":
        return {
          bg: "bg-[#F5F7F8]",
          border: "border-l-[6px] border-[#7F8C8D]",
          badge: "bg-[#7F8C8D] text-white",
        };
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-[#FAF7F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <h1
                className="text-3xl md:text-5xl font-bold text-[#004B23]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Programação Completa
              </h1>
              <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
              <p className="text-[#4A5D4E] text-base md:text-lg max-w-3xl mx-auto">
                Explore todas as atividades dos três dias de evento e monte sua
                agenda personalizada
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-2xl font-bold text-[#004B23]">
                  {allSessions.filter((s) => s.type === "Keynote").length}
                </div>
                <div className="text-xs text-[#4A5D4E] mt-1">Keynotes</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-2xl font-bold text-[#FFB800]">
                  {allSessions.filter((s) => s.type === "Palestra").length}
                </div>
                <div className="text-xs text-[#4A5D4E] mt-1">Palestras</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-2xl font-bold text-[#FF6B00]">
                  {allSessions.filter((s) => s.type === "Tutorial").length}
                </div>
                <div className="text-xs text-[#4A5D4E] mt-1">Tutoriais</div>
              </div>
              <Link
                href="/minha-agenda"
                className="bg-gradient-to-br from-[#004B23] to-[#003318] rounded-xl p-4 text-center shadow-sm border border-[#004B23]/10 hover:shadow-md transition-all group"
              >
                <div className="text-2xl font-bold text-white">
                  {savedSessions.size}
                </div>
                <div className="text-xs text-white/80 mt-1 group-hover:text-[#FFB800] transition-colors">
                  Na Minha Agenda →
                </div>
              </Link>
            </div>

            {/* Day Switcher & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-3">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDay(idx)}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all duration-300 ${
                      idx === activeDay
                        ? "bg-[#004B23] text-white border-[#004B23] shadow-md"
                        : "bg-white text-[#004B23] border-[#004B23]/30 hover:border-[#004B23]"
                    }`}
                  >
                    {day.name} - {day.date}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${
                    hasActiveFilters
                      ? "bg-[#FF6B00] text-white border-[#FF6B00]"
                      : "bg-white text-[#004B23] border-[#004B23]/30 hover:border-[#004B23]"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  {hasActiveFilters && (
                    <span className="bg-white text-[#FF6B00] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {activeFilters.type.length +
                        activeFilters.target.length +
                        activeFilters.track.length}
                    </span>
                  )}
                </button>

                {savedSessions.size > 0 && (
                  <button
                    onClick={exportAgenda}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm bg-[#004B23] text-white border-2 border-[#004B23] hover:bg-[#003818] transition-all"
                  >
                    <Download className="w-4 h-4" />
                    Exportar Agenda
                  </button>
                )}
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#004B23]/10 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#004B23]">Filtros</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-[#FF6B00] hover:underline font-semibold flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Limpar todos
                    </button>
                  )}
                </div>

                {/* Type Filters */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-[#4A5D4E]">
                    Tipo de Atividade
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.type.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleFilter("type", option.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          activeFilters.type.includes(option.value)
                            ? `${option.color} text-white`
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Filters */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-[#4A5D4E]">
                    Nível
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.target.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleFilter("target", option.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          activeFilters.target.includes(option.value)
                            ? "bg-[#004B23] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Track Filters */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-[#4A5D4E]">
                    Trilha
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.track.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleFilter("track", option.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          activeFilters.track.includes(option.value)
                            ? "bg-[#FF6B00] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sessions List */}
            <div className="space-y-4">
              {filteredSessions.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#004B23]/10">
                  <Calendar className="w-12 h-12 text-[#004B23]/30 mx-auto mb-4" />
                  <p className="text-[#4A5D4E] text-lg">
                    Nenhuma atividade encontrada com os filtros selecionados
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 text-[#FF6B00] hover:underline font-semibold"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                filteredSessions.map((session) => {
                  const style = getSessionStyle(session.type);
                  const isSaved = savedSessions.has(session.id);

                  return (
                    <div
                      key={session.id}
                      className={`flex flex-col sm:flex-row justify-between p-5 rounded-2xl ${style.bg} ${style.border} shadow-sm border border-[#004B23]/5 transition-all duration-200 gap-4 group hover:shadow-md`}
                    >
                      {/* Left: Content */}
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 flex-grow">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-[#4A5D4E] min-w-[110px] flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 flex-grow">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}
                            >
                              {session.type}
                            </span>
                            <span className="text-base font-bold text-[#004B23] tracking-tight">
                              {session.title}
                            </span>
                          </div>

                          {session.location && (
                            <div className="flex items-center gap-1.5 text-xs text-[#4A5D4E]">
                              <MapPin className="w-3.5 h-3.5" />
                              {session.location}
                            </div>
                          )}

                          {session.track && (
                            <div className="text-[11px] font-semibold text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 self-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                              Trilha: {session.track}
                            </div>
                          )}

                          {session.learningOutcomes && (
                            <p className="text-xs text-[#5D6B60] leading-relaxed font-sans max-w-3xl">
                              <span className="font-semibold text-[#3D4C40]">
                                O que você vai aprender:
                              </span>{" "}
                              {session.learningOutcomes}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Metadata & Save Button */}
                      <div className="flex items-start gap-3 flex-wrap self-start sm:self-auto">
                        {session.target && (
                          <span
                            className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                              session.target === "Todos"
                                ? "bg-[#E2F0D9] text-[#385723]"
                                : session.target === "Iniciante"
                                  ? "bg-[#DDEBF7] text-[#1F4E79]"
                                  : session.target === "Intermediário"
                                    ? "bg-[#FCE4D6] text-[#C65911]"
                                    : "bg-[#E1D5E7] text-[#6C3483]"
                            }`}
                          >
                            <Users className="w-3 h-3" />
                            {session.target}
                          </span>
                        )}

                        {session.registrationRequired && (
                          <span className="text-[10px] font-bold text-[#C65911] border border-[#C65911]/30 px-2.5 py-1 rounded-full bg-[#FFF2EB]">
                            Inscrição obrigatória
                          </span>
                        )}

                        {session.type !== "Intervalo" &&
                          session.type !== "Credenciamento" && (
                            <button
                              onClick={() => toggleSaveSession(session.id)}
                              className={`p-2 rounded-full transition-all ${
                                isSaved
                                  ? "bg-[#FFB800] text-white hover:bg-[#E5A600]"
                                  : "bg-white/50 text-[#004B23] hover:bg-white border border-[#004B23]/20"
                              }`}
                              title={
                                isSaved
                                  ? "Remover da agenda"
                                  : "Adicionar à agenda"
                              }
                            >
                              {isSaved ? (
                                <BookmarkCheck className="w-5 h-5" />
                              ) : (
                                <Bookmark className="w-5 h-5" />
                              )}
                            </button>
                          )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Made with Bob
