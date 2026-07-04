"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import speakersData from "@/app/programacao/python-norte-2026_speakers.json";
import levelsData from "@/app/programacao/levels.json";
import fallbackData from "@/app/programacao/fallback-sessions.json";

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

const SCHEDULE_URL =
  "https://talks.python.org.br/python-norte-2026/schedule/export/schedule.json";

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

/** Converts "00:35" → 35 (minutes) */
function parseDuration(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/** Adds HH:MM + "00:35" → "HH:MM" end time */
function calcEndTime(start: string, durationHhmm: string): string {
  const [sh, sm] = start.split(":").map(Number);
  const totalMinutes = sh * 60 + sm + parseDuration(durationHhmm);
  const endH = Math.floor(totalMinutes / 60) % 24;
  const endM = totalMinutes % 60;
  return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}

/** Parses the Pretalx schedule.json and returns a flat array of Session */
function parseSchedule(json: any): Session[] {
  const levels = levelsData as Record<string, string>;
  const sessions: Session[] = [];

  const days: any[] = json?.schedule?.conference?.days ?? [];
  for (const day of days) {
    const date: string = day.date; // e.g. "2026-07-03"
    const dayNum = date === "2026-07-03" ? 1 : 2;
    const rooms: Record<string, any[]> = day.rooms ?? {};

    for (const [roomName, slots] of Object.entries(rooms)) {
      for (const slot of slots) {
        // Pretalx schedule.json: submission code is in `code` (e.g. "MKBYLD").
        // Fallback: extract it from the talk URL (".../talk/MKBYLD/").
        // levels.json keys are uppercase — normalise.
        const codeFromUrl: string =
          typeof slot.url === "string"
            ? (slot.url.match(/\/talk\/([^/]+)\/?$/) ?? [])[1] ?? ""
            : "";
        const slug: string = String(
          slot.code ?? codeFromUrl ?? slot.id ?? "",
        ).toUpperCase();
        const start: string = slot.start; // "10:35"
        const duration: string = slot.duration; // "00:35"
        const endTime = calcEndTime(start, duration);

        sessions.push({
          id: slug,
          time: `${start} — ${endTime}`,
          title: slot.title,
          type: slot.type ?? "Palestra",
          location: roomName || undefined,
          target: levels[slug] ?? undefined,
          track: slot.track ?? undefined,
          description: slot.abstract ?? undefined,
          day: dayNum,
          speakers: (slot.persons ?? []).map((p: any) => (p.name ?? p.public_name) as string),
          duration: parseDuration(duration),
        });
      }
    }
  }

  return sessions.sort((a, b) =>
    a.day !== b.day ? a.day - b.day : a.time.localeCompare(b.time),
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useProgramacao() {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>(EMPTY_FILTERS);
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [showAgenda, setShowAgenda] = useState(false);

  // Live sessions fetched from Pretalx (null = still loading)
  const [liveSessions, setLiveSessions] = useState<Session[] | null>(null);

  // Hydrate saved sessions from localStorage + open agenda if ?agenda=1
  useEffect(() => {
    const saved = localStorage.getItem("pythonNorteAgenda");
    if (saved) setSavedSessions(new Set(JSON.parse(saved)));
    if (searchParams.get("agenda") === "1") setShowAgenda(true);
    setIsMounted(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch live schedule from Pretalx
  useEffect(() => {
    let cancelled = false;
    fetch(SCHEDULE_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setLiveSessions(parseSchedule(json));
      })
      .catch(() => {
        // Fetch failed — use bundled fallback-sessions.json
        if (!cancelled) setLiveSessions(fallbackData as Session[]);
      });
    return () => { cancelled = true; };
  }, []);

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

  // All sessions: live data when available, fallback while loading (skeleton shows until resolved)
  const allSessions: Session[] = useMemo(
    () => liveSessions ?? [],
    [liveSessions],
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

  // isLoading: true until the fetch resolves (success or fallback)
  const isLoading = !isMounted || liveSessions === null;

  return {
    // state
    isMounted,
    isLoading,
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
