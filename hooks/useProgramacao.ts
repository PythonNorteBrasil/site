"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import sessionsData from "@/app/programacao/python-norte-2026_sessions.json";
import speakersData from "@/app/programacao/python-norte-2026_speakers.json";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Session {
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

export interface Speaker {
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

export interface Day {
  name: string;
  date: string;
  dayNum: number;
}

export type ActiveFilters = {
  type: string[];
  target: string[];
  track: string[];
  location: string[];
};

// ── Constants ─────────────────────────────────────────────────────────────────

export const DAYS: Day[] = [
  { name: "Sexta-feira", date: "03/07", dayNum: 1 },
  { name: "Sábado", date: "04/07", dayNum: 2 },
];

const EMPTY_FILTERS: ActiveFilters = {
  type: [],
  target: [],
  track: [],
  location: [],
};

// ── Helpers ───────────────────────────────────────────────────────────────────

export function getLevelStyle(target: string): { bg: string; text: string } {
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
}

export function getSessionStyle(type: string) {
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
}

export function addToGoogleCalendar(session: Session) {
  const [startTime, endTime] = session.time.split(" — ");
  const dateStr = session.day === 1 ? "2026-07-03" : "2026-07-04";
  const startDateTime = `${dateStr.replace(/-/g, "")}T${startTime.replace(":", "")}00`;
  const endDateTime = `${dateStr.replace(/-/g, "")}T${endTime.replace(":", "")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: session.title,
    dates: `${startDateTime}/${endDateTime}`,
    details: `${session.description || ""}\n\nTipo: ${session.type}\nTrilha: ${session.track || ""}\nPalestrantes: ${session.speakers?.join(", ") || ""}`,
    location: session.location || "Python Norte 2026 - Manaus, AM",
    ctz: "America/Manaus",
  });
  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank");
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useProgramacao() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [activeDay, setActiveDay] = useState(0);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(EMPTY_FILTERS);
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);

  // Hydrate saved sessions from localStorage + open agenda if ?agenda=1
  useEffect(() => {
    const saved = localStorage.getItem("pythonNorteAgenda");
    if (saved) setSavedSessions(new Set(JSON.parse(saved)));
    if (searchParams.get("agenda") === "1") setShowAgenda(true);
    setIsMounted(true);
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // Persist to localStorage
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("pythonNorteAgenda", JSON.stringify(Array.from(savedSessions)));
  }, [savedSessions, isMounted]);

  // Speaker map
  const speakersMap = useMemo(() => {
    const map = new Map<string, Speaker>();
    speakersData.forEach((s: any) => map.set(s.Nome, s as Speaker));
    return map;
  }, []);

  // All sessions parsed + sorted
  const allSessions: Session[] = useMemo(
    () =>
      (sessionsData as any[])
        .filter((s) => s["Início (data)"] && s["Estado da proposta"] === "confirmed")
        .map((s) => ({
          id: s.ID,
          time: `${s["Início (hora)"]?.substring(0, 5) || ""} — ${s["Término (hora)"]?.substring(0, 5) || ""}`,
          title: s["Título da proposta"],
          type: s["Tipo de sessão"]["pt-br"],
          location: s.Sala?.["pt-br"] || undefined,
          target: s["Nível da atividade"] || undefined,
          track: s.Trilha?.["pt-br"] || undefined,
          description: s.Resumo,
          day: s["Início (data)"] === "2026-07-03" ? 1 : 2,
          speakers: s["Nomes de palestrantes"],
          duration: s.Duração,
        }))
        .sort((a, b) => a.day !== b.day ? a.day - b.day : a.time.localeCompare(b.time)),
    [],
  );

  // Filter options derived from all sessions
  const filterOptions = useMemo(
    () => ({
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
      target: Array.from(new Set(allSessions.map((s) => s.target).filter(Boolean))).map(
        (target) => ({ value: target!, label: target!, color: getLevelStyle(target!) }),
      ),
      track: Array.from(new Set(allSessions.map((s) => s.track).filter(Boolean))).map(
        (track) => ({
          value: track!,
          label: track!.length > 30 ? track!.substring(0, 30) + "..." : track!,
        }),
      ),
      location: Array.from(new Set(allSessions.map((s) => s.location).filter(Boolean))).map(
        (location) => ({ value: location!, label: location! }),
      ),
    }),
    [allSessions],
  );

  // Filtered sessions for the normal (non-agenda) view
  const filteredSessions = useMemo(
    () =>
      allSessions.filter((s) => {
        const dayMatch = s.day === DAYS[activeDay].dayNum;
        const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(s.type);
        const targetMatch =
          activeFilters.target.length === 0 ||
          (s.target != null && activeFilters.target.includes(s.target));
        const trackMatch =
          activeFilters.track.length === 0 ||
          (s.track != null && activeFilters.track.includes(s.track));
        const locationMatch =
          activeFilters.location.length === 0 ||
          (s.location != null && activeFilters.location.includes(s.location));
        return dayMatch && typeMatch && targetMatch && trackMatch && locationMatch;
      }),
    [allSessions, activeDay, activeFilters],
  );

  // Agenda: saved sessions — also filtered by activeFilters + activeDay
  const agendaSessions = useMemo(
    () => allSessions.filter((s) => savedSessions.has(s.id)),
    [allSessions, savedSessions],
  );

  const filteredAgendaSessions = useMemo(
    () =>
      agendaSessions.filter((s) => {
        const dayMatch = s.day === DAYS[activeDay].dayNum;
        const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(s.type);
        const targetMatch =
          activeFilters.target.length === 0 ||
          (s.target != null && activeFilters.target.includes(s.target));
        const trackMatch =
          activeFilters.track.length === 0 ||
          (s.track != null && activeFilters.track.includes(s.track));
        const locationMatch =
          activeFilters.location.length === 0 ||
          (s.location != null && activeFilters.location.includes(s.location));
        return dayMatch && typeMatch && targetMatch && trackMatch && locationMatch;
      }),
    [agendaSessions, activeDay, activeFilters],
  );

  const agendaByDay = useMemo(
    () =>
      DAYS.map((day) => ({
        day,
        sessions: filteredAgendaSessions.filter((s) => s.day === day.dayNum),
      })),
    [filteredAgendaSessions],
  );

  const totalActiveFilters =
    activeFilters.type.length +
    activeFilters.target.length +
    activeFilters.track.length +
    activeFilters.location.length;

  const hasActiveFilters = totalActiveFilters > 0;

  function toggleFilter(category: keyof ActiveFilters, value: string) {
    setActiveFilters((prev) => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }

  function clearAllFilters() {
    setActiveFilters(EMPTY_FILTERS);
  }

  function toggleSaveSession(sessionId: string) {
    setSavedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(sessionId)) next.delete(sessionId);
      else next.add(sessionId);
      return next;
    });
  }

  function toggleAgenda() {
    setShowAgenda((v) => !v);
  }

  return {
    // state
    isMounted,
    activeDay,
    setActiveDay,
    activeFilters,
    showFilters,
    setShowFilters,
    showAgenda,
    toggleAgenda,
    // data
    allSessions,
    speakersMap,
    filterOptions,
    filteredSessions,
    savedSessions,
    agendaSessions,
    filteredAgendaSessions,
    agendaByDay,
    // computed
    totalActiveFilters,
    hasActiveFilters,
    // actions
    toggleFilter,
    clearAllFilters,
    toggleSaveSession,
  };
}
