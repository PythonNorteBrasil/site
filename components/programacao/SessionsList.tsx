import { Calendar } from "lucide-react";
import { SessionCard } from "@/components/programacao/SessionCard";
import { FixedEventCard } from "@/components/programacao/FixedEventCard";
import type { FixedEvent } from "@/components/programacao/FixedEventCard";
import { getSessionStyle, DAYS } from "@/hooks/useProgramacao";
import type { Session, Speaker } from "@/hooks/useProgramacao";

// ── Eventos fixos (credenciamento, abertura, pausas, etc.) ────────────────────
// O horário de início ("HH:MM") é usado para ordenação com as sessões do Pretalx.
const FIXED_EVENTS: FixedEvent[] = [
  {
    id: "fixed-credenciamento",
    kind: "credenciamento",
    title: "Credenciamento",
    time: "08:00 — 08:40",
    location: "Auditório 1 - Principal",
    day: 2,
  },
  {
    id: "fixed-abertura",
    kind: "abertura",
    title: "Abertura",
    time: "08:40 — 08:55",
    location: "Auditório 1 - Principal",
    day: 2,
  },
  {
    id: "fixed-coffee-1",
    kind: "coffee",
    title: "☕ Coffee Break & Networking",
    time: "11:00 — 11:20",
    day: 2,
  },
  {
    id: "fixed-almoco",
    kind: "almoco",
    title: "Almoço",
    time: "12:20 — 13:40",
    day: 2,
  },
  {
    id: "fixed-lightning",
    kind: "lightning",
    title: "⚡ Lightning Talks",
    time: "14:00 — 14:20",
    location: "Auditório 1 - Principal",
    day: 2,
  },
  {
    id: "fixed-coffee-2",
    kind: "coffee",
    title: "☕ Coffee Break & Networking",
    time: "16:00 — 16:20",
    day: 2,
  },
  {
    id: "fixed-encerramento",
    kind: "encerramento",
    title: "Encerramento do Evento",
    time: "17:20",
    location: "Auditório 1 - Principal",
    day: 2,
  },
];

/** Extrai "HH:MM" de início de um slot "HH:MM — HH:MM" */
function startOf(time: string): string {
  return time.split(" — ")[0] ?? time;
}

interface Props {
  sessions: Session[];
  savedSessions: Set<string>;
  speakersMap: Map<string, Speaker>;
  getLevelStyle: (target: string) => { bg: string; text: string };
  onOpenSession: (session: Session) => void;
  onToggleSave: (id: string) => void;
  onAddToCalendar: (session: Session) => void;
  onOpenSpeaker: (speaker: Speaker) => void;
  onClearFilters: () => void;
  /** Dia ativo (índice de DAYS, 0-based) para saber qual dia mostrar */
  activeDay?: number;
}

export function SessionsList({
  sessions,
  savedSessions,
  speakersMap,
  getLevelStyle,
  onOpenSession,
  onToggleSave,
  onAddToCalendar,
  onOpenSpeaker,
  onClearFilters,
  activeDay = 0,
}: Props) {
  // Dia numérico atual (1 = sexta, 2 = sábado)
  const currentDayNum = DAYS[activeDay]?.dayNum ?? 1;

  // Eventos fixos para o dia atual
  const fixedForDay = FIXED_EVENTS.filter((e) => e.day === currentDayNum);

  // Mescla sessões reais + eventos fixos ordenados por horário de início
  type Item =
    | { kind: "session"; session: Session }
    | { kind: "fixed"; event: FixedEvent };

  const merged: Item[] = [
    ...sessions.map((s): Item => ({ kind: "session", session: s })),
    ...fixedForDay.map((e): Item => ({ kind: "fixed", event: e })),
  ].sort((a, b) => {
    const ta = startOf(a.kind === "session" ? a.session.time : a.event.time);
    const tb = startOf(b.kind === "session" ? b.session.time : b.event.time);
    return ta.localeCompare(tb);
  });

  if (sessions.length === 0 && fixedForDay.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#004B23]/10">
        <Calendar className="w-12 h-12 text-[#004B23]/30 mx-auto mb-4" />
        <p className="text-[#4A5D4E] text-lg">
          Nenhuma atividade encontrada com os filtros selecionados
        </p>
        <button
          onClick={onClearFilters}
          className="mt-4 text-[#FF6B00] hover:underline font-semibold"
        >
          Limpar filtros
        </button>
      </div>
    );
  }

  // Se sessões estão vazias mas há eventos fixos, exibe só os fixos + aviso de filtro
  if (sessions.length === 0) {
    return (
      <div className="space-y-4">
        {fixedForDay.map((e) => (
          <FixedEventCard key={e.id} event={e} />
        ))}
        <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-[#004B23]/10">
          <p className="text-[#4A5D4E]">
            Nenhuma palestra encontrada com os filtros selecionados
          </p>
          <button
            onClick={onClearFilters}
            className="mt-3 text-[#FF6B00] hover:underline font-semibold"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {merged.map((item) =>
        item.kind === "fixed" ? (
          <FixedEventCard key={item.event.id} event={item.event} />
        ) : (
          <SessionCard
            key={item.session.id}
            session={item.session}
            style={getSessionStyle(item.session.type)}
            isSaved={savedSessions.has(item.session.id)}
            getLevelStyle={getLevelStyle}
            speakersMap={speakersMap}
            onOpen={() => onOpenSession(item.session)}
            onToggleSave={() => onToggleSave(item.session.id)}
            onAddToCalendar={() => onAddToCalendar(item.session)}
            onOpenSpeaker={onOpenSpeaker}
          />
        ),
      )}
    </div>
  );
}
