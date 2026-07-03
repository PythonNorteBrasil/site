import { Bookmark, BookmarkCheck, Calendar, ChevronLeft, Filter } from "lucide-react";
import { SessionCard } from "@/components/programacao/SessionCard";
import { getSessionStyle, DAYS } from "@/hooks/useProgramacao";
import type { Session, Speaker } from "@/hooks/useProgramacao";

/** Returns true if two sessions overlap in time (HH:MM string comparison) */
function timesOverlap(a: Session, b: Session): boolean {
  if (a.id === b.id) return false;
  // time format: "10:00 — 10:35"
  const [startA, endA] = a.time.split(" — ");
  const [startB, endB] = b.time.split(" — ");
  if (!startA || !endA || !startB || !endB) return false;
  // Overlap: A starts before B ends AND B starts before A ends
  return startA < endB && startB < endA;
}

interface Props {
  agendaByDay: { day: (typeof DAYS)[number]; sessions: Session[] }[];
  agendaCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
  savedSessions: Set<string>;
  speakersMap: Map<string, Speaker>;
  getLevelStyle: (target: string) => { bg: string; text: string };
  onOpenSession: (session: Session) => void;
  onToggleSave: (id: string) => void;
  onAddToCalendar: (session: Session) => void;
  onOpenSpeaker: (speaker: Speaker) => void;
  onExitAgenda: () => void;
  onClearFilters: () => void;
}

export function AgendaView({
  agendaByDay,
  agendaCount,
  filteredCount,
  hasActiveFilters,
  savedSessions,
  speakersMap,
  getLevelStyle,
  onOpenSession,
  onToggleSave,
  onAddToCalendar,
  onOpenSpeaker,
  onExitAgenda,
  onClearFilters,
}: Props) {
  // Empty agenda (no saved sessions at all)
  if (agendaCount === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#004B23]/10">
        <Bookmark className="w-12 h-12 text-[#FFB800]/50 mx-auto mb-4" />
        <p className="text-[#4A5D4E] text-lg font-semibold">Sua agenda está vazia</p>
        <p className="text-[#4A5D4E]/70 text-sm mt-1 mb-6">
          Salve atividades clicando no{" "}
          <BookmarkCheck className="w-3.5 h-3.5 inline text-[#FFB800]" />{" "}
          em qualquer sessão
        </p>
        <button
          onClick={onExitAgenda}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-[#004B23] text-white hover:bg-[#003318] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Ver programação completa
        </button>
      </div>
    );
  }

  // Has saved sessions but filters hide them all
  if (filteredCount === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#004B23]/10">
        <Filter className="w-12 h-12 text-[#FF6B00]/40 mx-auto mb-4" />
        <p className="text-[#4A5D4E] text-lg font-semibold">
          Nenhuma atividade da agenda corresponde aos filtros
        </p>
        <p className="text-[#4A5D4E]/70 text-sm mt-1 mb-6">
          Você tem {agendaCount}{" "}
          {agendaCount === 1 ? "atividade salva" : "atividades salvas"}, mas os filtros ativos
          não mostram nenhuma delas.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-[#FF6B00] text-white hover:bg-[#e05e00] transition-colors"
          >
            Limpar filtros
          </button>
          <button
            onClick={onExitAgenda}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 border-[#004B23]/30 text-[#004B23] bg-white hover:border-[#004B23] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Ver programação
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {agendaByDay
        .filter((group) => group.sessions.length > 0)
        .map((group) => (
          <div key={group.day.dayNum} className="space-y-3">
            {/* Day group header */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#004B23] text-white px-4 py-1.5 rounded-full">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {group.day.name} · {group.day.date}
                </span>
              </div>
              <div className="flex-1 h-px bg-[#004B23]/15" />
              <span className="text-xs text-[#4A5D4E] font-semibold">
                {group.sessions.length}{" "}
                {group.sessions.length === 1 ? "atividade" : "atividades"}
              </span>
            </div>

            {group.sessions.map((session) => {
              const hasConflict = group.sessions.some(
                (other) => timesOverlap(session, other),
              );
              return (
                <SessionCard
                  key={session.id}
                  session={session}
                  style={getSessionStyle(session.type)}
                  isSaved={savedSessions.has(session.id)}
                  hasConflict={hasConflict}
                  getLevelStyle={getLevelStyle}
                  speakersMap={speakersMap}
                  onOpen={() => onOpenSession(session)}
                  onToggleSave={() => onToggleSave(session.id)}
                  onAddToCalendar={() => onAddToCalendar(session)}
                  onOpenSpeaker={onOpenSpeaker}
                />
              );
            })}
          </div>
        ))}

      {/* Add more CTA */}
      <div className="flex items-center justify-center pt-2">
        <button
          onClick={onExitAgenda}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 border-[#004B23]/30 text-[#004B23] bg-white hover:border-[#004B23] hover:bg-[#F4FAF5] transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Adicionar mais atividades
        </button>
      </div>
    </div>
  );
}
