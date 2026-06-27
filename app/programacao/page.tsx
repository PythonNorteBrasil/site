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
  ExternalLink,
  Info,
  User,
} from "lucide-react";
import sessionsData from "./python-norte-2026_sessions.json";
import speakersData from "./python-norte-2026_speakers.json";

interface Session {
  id: string;
  time: string;
  title: string;
  type: string;
  location?: string;
  target?: string;
  registrationRequired?: boolean;
  track?: string;
  description?: string;
  day: number;
  speakers?: string[];
  duration?: number;
}

interface Speaker {
  ID: string;
  Nome: string;
  Biografia: string;
  "E-mail": string;
  Imagem: string | null;
  "IDs de proposta": string[];
  "Títulos das propostas": string[];
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
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Create a map of speaker names to speaker data
  const speakersMap = new Map<string, Speaker>();
  speakersData.forEach((speaker: any) => {
    speakersMap.set(speaker.Nome, speaker);
  });

  // Process JSON data
  const allSessions: Session[] = sessionsData
    .filter(
      (s: any) => s["Início (data)"] && s["Estado da proposta"] === "confirmed",
    )
    .map((s: any) => {
      const startDate = s["Início (data)"];
      const startTime = s["Início (hora)"]?.substring(0, 5) || "";
      const endTime = s["Término (hora)"]?.substring(0, 5) || "";

      // Determine day (1 = 03/07, 2 = 04/07)
      const day = startDate === "2026-07-03" ? 1 : 2;

      return {
        id: s.ID,
        time: `${startTime} — ${endTime}`,
        title: s["Título da proposta"],
        type: s["Tipo de sessão"]["pt-br"],
        location: s.Sala?.["pt-br"] || undefined,
        target: s["Nível da atividade"] || "Todos",
        track: s.Trilha["pt-br"],
        description: s.Resumo,
        day,
        speakers: s["Nomes de palestrantes"],
        duration: s.Duração,
      };
    })
    .sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return a.time.localeCompare(b.time);
    });

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

  // Add session to Google Calendar
  const addToGoogleCalendar = (session: Session) => {
    // Parse date and time
    const [startTime, endTime] = session.time.split(" — ");
    const dateStr = session.day === 1 ? "2026-07-03" : "2026-07-04";

    // Format: YYYYMMDDTHHmmss
    const startDateTime = `${dateStr.replace(/-/g, "")}T${startTime.replace(":", "")}00`;
    const endDateTime = `${dateStr.replace(/-/g, "")}T${endTime.replace(":", "")}00`;

    // Build Google Calendar URL
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: session.title,
      dates: `${startDateTime}/${endDateTime}`,
      details: `${session.description || ""}\n\nTipo: ${session.type}\nTrilha: ${session.track || ""}\nPalestrantes: ${session.speakers?.join(", ") || ""}`,
      location: session.location || "Python Norte 2026 - Manaus, AM",
      ctz: "America/Manaus",
    });

    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, "_blank");
  };

  const days = [
    { name: "Sexta-feira", date: "03/07", dayNum: 1 },
    { name: "Sábado", date: "04/07", dayNum: 2 },
  ];

  const filterOptions = {
    type: Array.from(new Set(allSessions.map((s) => s.type))).map((type) => ({
      value: type,
      label: type,
      color:
        type === "Keynote"
          ? "bg-[#004B23]"
          : type === "Palestra"
            ? "bg-[#FFB800]"
            : type === "Tutorial"
              ? "bg-[#FF6B00]"
              : "bg-[#7F8C8D]",
    })),
    target: Array.from(
      new Set(allSessions.map((s) => s.target).filter(Boolean)),
    ).map((target) => ({
      value: target!,
      label: target!,
    })),
    track: Array.from(
      new Set(allSessions.map((s) => s.track).filter(Boolean)),
    ).map((track) => ({
      value: track!,
      label: track!.length > 30 ? track!.substring(0, 30) + "..." : track!,
    })),
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

  const getSessionStyle = (type: string) => {
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
      default:
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

      <main className="flex-grow pt-14 pb-16 bg-[#FAF7F0]">
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
                Explore todas as atividades dos dois dias de evento e monte sua
                agenda personalizada
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-3 md:p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-xl md:text-2xl font-bold text-[#004B23]">
                  {allSessions.filter((s) => s.type === "Keynote").length}
                </div>
                <div className="text-[10px] md:text-xs text-[#4A5D4E] mt-0.5 md:mt-1">
                  Keynotes
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 md:p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-xl md:text-2xl font-bold text-[#FFB800]">
                  {allSessions.filter((s) => s.type === "Palestra").length}
                </div>
                <div className="text-[10px] md:text-xs text-[#4A5D4E] mt-0.5 md:mt-1">
                  Palestras
                </div>
              </div>
              <div className="bg-white rounded-xl p-3 md:p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-xl md:text-2xl font-bold text-[#FF6B00]">
                  {allSessions.filter((s) => s.type === "Tutorial").length}
                </div>
                <div className="text-[10px] md:text-xs text-[#4A5D4E] mt-0.5 md:mt-1">
                  Tutoriais
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#004B23] to-[#003318] rounded-xl p-3 md:p-4 text-center shadow-sm border border-[#004B23]/10">
                <div className="text-xl md:text-2xl font-bold text-white mb-2">
                  {savedSessions.size}
                </div>
                <div className="text-[10px] md:text-xs text-white/80 mb-2">
                  Sessões Favoritas
                </div>
                {savedSessions.size > 0 && (
                  <Link
                    href="/minha-agenda"
                    className="inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-[#FFB800] hover:text-[#FF6B00] transition-colors"
                  >
                    Ver Agenda →
                  </Link>
                )}
              </div>
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
                          activeFilters.track.includes(option.value!)
                            ? "bg-[#FF6B00] text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        title={option.value!}
                      >
                        {option.label!}
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
                      onClick={() => setSelectedSession(session)}
                      className={`relative flex flex-col p-5 rounded-2xl ${style.bg} ${style.border} shadow-sm border border-[#004B23]/5 transition-all duration-200 gap-4 group hover:shadow-md cursor-pointer hover:scale-[1.01]`}
                    >
                      {/* Action Buttons - Top Right */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveSession(session.id);
                          }}
                          className={`p-1.5 rounded-lg transition-all pointer-events-auto ${
                            isSaved
                              ? "text-[#FFB800] hover:bg-[#FFB800]/10"
                              : "text-gray-400 hover:bg-gray-100 hover:text-[#004B23]"
                          }`}
                          title={
                            isSaved
                              ? "Remover dos favoritos"
                              : "Adicionar aos favoritos"
                          }
                        >
                          {isSaved ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToGoogleCalendar(session);
                          }}
                          className="p-1.5 rounded-lg hover:bg-[#FFB800]/10 text-[#FFB800] transition-all pointer-events-auto"
                          title="Adicionar ao Google Calendar"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-3 pointer-events-none pr-16">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#4A5D4E] flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </span>
                        </div>

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

                        {session.speakers && session.speakers.length > 0 && (
                          <div className="text-xs text-[#4A5D4E] flex items-center gap-1.5 flex-wrap">
                            <Users className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="font-semibold">Palestrantes:</span>
                            <div className="flex flex-wrap gap-1">
                              {session.speakers.map((speakerName, idx) => {
                                const speaker = speakersMap.get(speakerName);
                                return (
                                  <span key={idx}>
                                    {speaker ? (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedSpeaker(speaker);
                                        }}
                                        className="text-[#FF6B00] hover:underline font-semibold pointer-events-auto"
                                      >
                                        {speakerName}
                                      </button>
                                    ) : (
                                      <span>{speakerName}</span>
                                    )}
                                    {idx <
                                      (session.speakers?.length ?? 0) - 1 &&
                                      ", "}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {session.target && (
                          <span
                            className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 self-start ${
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

      {/* Session Details Modal - Optimized for Mobile */}
      {selectedSession && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={() => setSelectedSession(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl max-w-3xl w-full shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`p-4 sm:p-6 rounded-t-3xl sm:rounded-t-2xl ${getSessionStyle(selectedSession.type).bg} ${getSessionStyle(selectedSession.type).border} border-t-0 sticky top-0 z-10`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider ${getSessionStyle(selectedSession.type).badge}`}
                    >
                      {selectedSession.type}
                    </span>
                    {selectedSession.target && (
                      <span
                        className={`text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1 ${
                          selectedSession.target === "Todos"
                            ? "bg-[#E2F0D9] text-[#385723]"
                            : selectedSession.target === "Iniciante"
                              ? "bg-[#DDEBF7] text-[#1F4E79]"
                              : selectedSession.target === "Intermediário"
                                ? "bg-[#FCE4D6] text-[#C65911]"
                                : "bg-[#E1D5E7] text-[#6C3483]"
                        }`}
                      >
                        <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {selectedSession.target}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold text-[#004B23] mb-2 leading-tight">
                    {selectedSession.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-[#4A5D4E]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{selectedSession.time}</span>
                    </div>
                    {selectedSession.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">
                          {selectedSession.location}
                        </span>
                      </div>
                    )}
                    {selectedSession.duration && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>{selectedSession.duration} min</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5 text-[#4A5D4E]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {selectedSession.track && (
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                    Trilha
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10 px-3 py-2 rounded-lg inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8B5E3C] flex-shrink-0" />
                    <span className="break-words">{selectedSession.track}</span>
                  </div>
                </div>
              )}

              {selectedSession.speakers &&
                selectedSession.speakers.length > 0 && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                      Palestrantes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSession.speakers.map((speakerName, idx) => {
                        const speaker = speakersMap.get(speakerName);
                        return speaker ? (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSpeaker(speaker);
                            }}
                            className="text-xs sm:text-sm bg-[#F4FAF5] text-[#FF6B00] px-3 py-1.5 rounded-lg border border-[#FF6B00]/20 hover:bg-[#FF6B00]/10 transition-all font-semibold"
                          >
                            {speakerName}
                          </button>
                        ) : (
                          <span
                            key={idx}
                            className="text-xs sm:text-sm bg-[#F4FAF5] text-[#004B23] px-3 py-1.5 rounded-lg border border-[#004B23]/10"
                          >
                            {speakerName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

              {selectedSession.description && (
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                    Resumo
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5D4E] leading-relaxed">
                    {selectedSession.description}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#004B23]/10 sticky bottom-0 bg-white pb-safe">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      toggleSaveSession(selectedSession.id);
                    }}
                    className={`p-3 rounded-xl transition-all ${
                      savedSessions.has(selectedSession.id)
                        ? "text-[#FFB800] hover:bg-[#FFB800]/10"
                        : "text-gray-400 hover:bg-gray-100 hover:text-[#004B23]"
                    }`}
                    title={
                      savedSessions.has(selectedSession.id)
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                  >
                    {savedSessions.has(selectedSession.id) ? (
                      <BookmarkCheck className="w-5 h-5" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => addToGoogleCalendar(selectedSession)}
                    className="p-3 rounded-xl hover:bg-[#FFB800]/10 text-[#FFB800] transition-all"
                    title="Adicionar ao Google Calendar"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="px-4 py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Speaker Modal */}
      {selectedSpeaker && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
          onClick={() => setSelectedSpeaker(null)}
        >
          <div
            className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-[#004B23]/10 p-4 sm:p-6 z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {selectedSpeaker.Imagem ? (
                    <img
                      src={selectedSpeaker.Imagem}
                      alt={selectedSpeaker.Nome}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#004B23]/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-[#004B23]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#004B23] mb-1 break-words">
                      {selectedSpeaker.Nome}
                    </h2>
                    {selectedSpeaker["Títulos das propostas"] &&
                      selectedSpeaker["Títulos das propostas"].length > 0 && (
                        <p className="text-xs sm:text-sm text-[#4A5D4E]">
                          {selectedSpeaker["Títulos das propostas"].length}{" "}
                          {selectedSpeaker["Títulos das propostas"].length === 1
                            ? "palestra"
                            : "palestras"}
                        </p>
                      )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSpeaker(null)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5 text-[#4A5D4E]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {selectedSpeaker.Biografia && (
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                    Biografia
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5D4E] leading-relaxed whitespace-pre-wrap">
                    {selectedSpeaker.Biografia}
                  </p>
                </div>
              )}

              {selectedSpeaker["Títulos das propostas"] &&
                selectedSpeaker["Títulos das propostas"].length > 0 && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                      Palestras
                    </h3>
                    <div className="space-y-2">
                      {selectedSpeaker["Títulos das propostas"].map(
                        (title, idx) => (
                          <div
                            key={idx}
                            className="text-xs sm:text-sm bg-[#F4FAF5] text-[#004B23] px-3 py-2 rounded-lg border border-[#004B23]/10"
                          >
                            {title}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {/* Close Button */}
              <div className="pt-4 border-t border-[#004B23]/10 sticky bottom-0 bg-white pb-safe">
                <button
                  onClick={() => setSelectedSpeaker(null)}
                  className="w-full px-4 py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
