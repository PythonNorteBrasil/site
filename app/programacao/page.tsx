"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import Link from "next/link";
import { Footer } from "@/components/footer";
import {
  Bookmark,
  BookmarkCheck,
  Filter,
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import sessionsData from "./python-norte-2026_sessions.json";
import speakersData from "./python-norte-2026_speakers.json";
import { SessionDetailModal } from "@/components/session-detail-modal";
import { SpeakerModal } from "@/components/speaker-modal";
import { SectionHeader } from "@/components/sectionHeader";
import { ScheduleStats } from "@/components/scheduleStats";
import { DaySwitcher } from "@/components/daySwitcher";

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
  Instagram?: string | null;
  LinkedIn?: string | null;
}

export default function ProgramacaoPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [activeFilters, setActiveFilters] = useState<{
    type: string[];
    target: string[];
    track: string[];
    location: string[];
  }>({
    type: [],
    target: [],
    track: [],
    location: [],
  });
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Mark client-side mount (enables localStorage hydration + removes skeleton)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent background scroll when any modal is open
  useEffect(() => {
    const isOpen = !!selectedSession || !!selectedSpeaker;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSession, selectedSpeaker]);

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

  // Load saved sessions from localStorage (sets isMounted=true when done)
  useEffect(() => {
    const saved = localStorage.getItem("pythonNorteAgenda");
    if (saved) {
      setSavedSessions(new Set(JSON.parse(saved)));
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage only after initial load to avoid overwriting with empty state
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(
      "pythonNorteAgenda",
      JSON.stringify(Array.from(savedSessions)),
    );
  }, [savedSessions, isMounted]);

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

  const getLevelStyle = (target: string) => {
    switch (target) {
      case "Todos":
        return { bg: "bg-[#E2F0D9]", text: "text-[#385723]" };
      case "Iniciante":
        return { bg: "bg-[#DDEBF7]", text: "text-[#1F4E79]" };
      case "Intermediário":
        return { bg: "bg-[#FCE4D6]", text: "text-[#C65911]" };
      default:
        return { bg: "bg-[#E1D5E7]", text: "text-[#6C3483]" };
    }
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
          ? "bg-[#FFB800]"
          : type === "Palestra"
            ? "bg-[#004B23]"
            : type === "Tutorial"
              ? "bg-[#FF6B00]"
              : "bg-[#7F8C8D]",
    })),
    target: Array.from(
      new Set(allSessions.map((s) => s.target).filter(Boolean)),
    ).map((target) => ({
      value: target!,
      label: target!,
      color: getLevelStyle(target!),
    })),
    track: Array.from(
      new Set(allSessions.map((s) => s.track).filter(Boolean)),
    ).map((track) => ({
      value: track!,
      label: track!.length > 30 ? track!.substring(0, 30) + "..." : track!,
    })),
    location: Array.from(
      new Set(allSessions.map((s) => s.location).filter(Boolean)),
    ).map((location) => ({
      value: location!,
      label: location!,
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
    setActiveFilters({ type: [], target: [], track: [], location: [] });
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

    const locationMatch =
      activeFilters.location.length === 0 ||
      (session.location && activeFilters.location.includes(session.location));

    return dayMatch && typeMatch && targetMatch && trackMatch && locationMatch;
  });

  const totalActiveFilters =
    activeFilters.type.length +
    activeFilters.target.length +
    activeFilters.track.length +
    activeFilters.location.length;

  const hasActiveFilters = totalActiveFilters > 0;

  const getSessionStyle = (type: string) => {
    switch (type) {
      case "Keynote":
        return {
          bg: "bg-[#FFFBF0]",
          border: "border-l-[5px] border-[#FFB800]",
          badge: "bg-[#FFB800] text-[#1a1a1a]",
          isKeynote: true,
        };
      case "Palestra":
        return {
          bg: "bg-[#F4FAF5]",
          border: "border-l-[5px] border-[#004B23]",
          badge: "bg-[#004B23] text-white",
          isKeynote: false,
        };
      case "Tutorial":
        return {
          bg: "bg-[#FFF6F2]",
          border: "border-l-[6px] border-[#FF6B00]",
          badge: "bg-[#FF6B00] text-white",
          isKeynote: false,
        };
      default:
        return {
          bg: "bg-[#F5F7F8]",
          border: "border-l-[6px] border-[#7F8C8D]",
          badge: "bg-[#7F8C8D] text-white",
          isKeynote: false,
        };
    }
  };

  const keynoteCount = allSessions.filter((s) => s.type === "Keynote").length;

  const talkCount = allSessions.filter((s) => s.type === "Palestra").length;

  const tutorialCount = allSessions.filter((s) => s.type === "Tutorial").length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-20 pb-16 bg-[#FAF7F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <SectionHeader
              title="Programação Python Norte 2026"
              description="Explore todas as atividades dos dois dias de evento e monte sua
                agenda personalizada"
            />

            {/* Stats - Compact */}
            <ScheduleStats
              keynote={keynoteCount}
              talks={talkCount}
              tutorials={tutorialCount}
              saved={savedSessions.size}
            />

            {/* Day Switcher & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <DaySwitcher
                days={days}
                activeDay={activeDay}
                onChange={setActiveDay}
              />

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
                      {totalActiveFilters}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white rounded-2xl shadow-lg border border-[#004B23]/10 overflow-hidden">
                {/* Panel Header */}
                <div className="flex justify-between items-center px-5 py-4 border-b border-[#004B23]/10 bg-[#F4FAF5]">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#004B23]" />
                    <h3 className="text-sm font-bold text-[#004B23]">
                      Filtros
                    </h3>
                    {hasActiveFilters && (
                      <span className="bg-[#FF6B00] text-white rounded-full px-2 py-0.5 text-[10px] font-bold">
                        {totalActiveFilters} ativos
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#FF6B00] text-white hover:bg-[#e05e00] transition-colors"
                      >
                        Limpar filtros
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1.5 rounded-lg hover:bg-[#004B23]/10 text-[#4A5D4E] transition-colors"
                      aria-label="Fechar filtros"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Filter Groups Grid */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Type Filters */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#004B23]" />
                      Tipo de Atividade
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {filterOptions.type.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleFilter("type", option.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeFilters.type.includes(option.value)
                              ? `${option.color} text-white border-transparent`
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Filters */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#004B23]" />
                      Nível
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {filterOptions.target.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleFilter("target", option.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeFilters.target.includes(option.value)
                              ? `${option.color.bg} ${option.color.text} border-transparent`
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Filters */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#004B23]" />
                      Local / Sala
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {filterOptions.location.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleFilter("location", option.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeFilters.location.includes(option.value)
                              ? "bg-[#3B82F6] text-white border-transparent"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Track Filters */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                      Trilha
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {filterOptions.track.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => toggleFilter("track", option.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                            activeFilters.track.includes(option.value!)
                              ? "bg-[#FF6B00] text-white border-transparent"
                              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                          }`}
                          title={option.value!}
                        >
                          {option.label!}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-[#004B23]/10 bg-[#F4FAF5] flex justify-end">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-5 py-2.5 rounded-full font-bold text-sm bg-[#004B23] text-white hover:bg-[#003318] transition-colors"
                  >
                    Mostrar resultados
                    {hasActiveFilters && (
                      <span className="ml-2 bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]">
                        {filteredSessions.length}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Sessions List */}
            <div className="space-y-4">
              {!isMounted ? (
                /* Loading skeleton — matches real card layout */
                <>
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="relative flex flex-col p-5 rounded-2xl bg-white border border-[#004B23]/5 shadow-sm gap-4"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {/* time */}
                      <div className="h-4 w-28 rounded-full bg-[#004B23]/10 animate-pulse" />
                      {/* type badge + title */}
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="h-5 w-16 rounded-full bg-[#004B23]/10 animate-pulse" />
                        <div className="h-5 w-5 rounded-full bg-[#004B23]/10 animate-pulse" />
                        <div
                          className="h-5 rounded-full bg-[#004B23]/10 animate-pulse"
                          style={{ width: `${180 + (i % 3) * 60}px` }}
                        />
                      </div>
                      {/* location */}
                      <div className="h-3.5 w-32 rounded-full bg-[#004B23]/10 animate-pulse" />
                      {/* track */}
                      <div className="h-4 w-48 rounded-md bg-[#004B23]/10 animate-pulse" />
                      {/* speakers */}
                      <div className="flex items-center gap-2">
                        <div className="h-3.5 w-3.5 rounded-full bg-[#004B23]/10 animate-pulse" />
                        <div className="h-3.5 w-20 rounded-full bg-[#004B23]/10 animate-pulse" />
                        <div className="h-3.5 w-24 rounded-full bg-[#004B23]/10 animate-pulse" />
                      </div>
                    </div>
                  ))}
                </>
              ) : filteredSessions.length === 0 ? (
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
              ) : !isMounted ? null : (
                filteredSessions.map((session) => {
                  const style = getSessionStyle(session.type);
                  const isSaved = savedSessions.has(session.id);

                  return (
                    <div
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      className={`relative flex flex-col p-5 rounded-2xl ${style.bg} ${style.border} border border-[#004B23]/8 shadow-sm transition-all duration-200 gap-3 group hover:shadow-md cursor-pointer hover:scale-[1.005]`}
                    >
                      {/* Action Buttons - Top Right */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaveSession(session.id);
                          }}
                          className={`p-1.5 rounded-lg transition-all pointer-events-auto active:scale-90 ${
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
                          className="p-1.5 rounded-lg transition-all pointer-events-auto active:scale-90 text-[#FFB800] hover:bg-[#FFB800]/10"
                          title="Adicionar ao Google Calendar"
                        >
                          <Calendar className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-3 pointer-events-none pr-16">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold flex items-center gap-2 text-[#4A5D4E]">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}
                          >
                            {session.type}
                          </span>
                          {session.target &&
                            (() => {
                              const ls = getLevelStyle(session.target);
                              return (
                                <span
                                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${ls.bg} ${ls.text}`}
                                >
                                  {session.target}
                                </span>
                              );
                            })()}
                          <span
                            className={`font-bold tracking-tight text-[#004B23] ${style.isKeynote ? "text-lg sm:text-xl" : "text-base"}`}
                          >
                            {session.title}
                          </span>
                        </div>

                        {session.location && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D3E31]">
                            <MapPin className="w-3.5 h-3.5" />
                            {session.location}
                          </div>
                        )}

                        {session.track && (
                          <div className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 self-start text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                            {session.track}
                          </div>
                        )}

                        {session.speakers && session.speakers.length > 0 && (
                          <div className="text-xs flex items-center gap-1.5 flex-wrap text-[#4A5D4E]">
                            <Users className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="font-semibold">
                              {session.speakers.length === 1
                                ? "Palestrante:"
                                : "Palestrantes:"}
                            </span>
                            <div className="flex flex-wrap gap-1 items-center">
                              {session.speakers.map((speakerName, idx) => {
                                const speaker = speakersMap.get(speakerName);
                                const total = session.speakers?.length ?? 0;
                                const isLast = idx === total - 1;
                                const isSecondToLast = idx === total - 2;
                                return (
                                  <span
                                    key={idx}
                                    className="flex items-center gap-1"
                                  >
                                    {speaker ? (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedSpeaker(speaker);
                                        }}
                                        className="hover:underline font-semibold pointer-events-auto text-[#FF6B00]"
                                      >
                                        {speakerName}
                                      </button>
                                    ) : (
                                      <span>{speakerName}</span>
                                    )}
                                    {!isLast && (
                                      <span>{isSecondToLast ? " e" : ","}</span>
                                    )}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
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

      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          isSaved={savedSessions.has(selectedSession.id)}
          onToggleSave={() => toggleSaveSession(selectedSession.id)}
          onAddToCalendar={() => addToGoogleCalendar(selectedSession)}
          speakers={(selectedSession.speakers ?? []).map((name) => {
            const sp = speakersMap.get(name);
            return {
              name,
              imagem: sp?.Imagem ?? null,
              onClick: sp ? () => setSelectedSpeaker(sp) : undefined,
            };
          })}
        />
      )}

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
}
