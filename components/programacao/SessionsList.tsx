import { Calendar } from "lucide-react";
import { SessionCard } from "@/components/programacao/SessionCard";
import { getSessionStyle } from "@/hooks/useProgramacao";
import type { Session, Speaker } from "@/hooks/useProgramacao";

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
}: Props) {
  if (sessions.length === 0) {
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

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          style={getSessionStyle(session.type)}
          isSaved={savedSessions.has(session.id)}
          getLevelStyle={getLevelStyle}
          speakersMap={speakersMap}
          onOpen={() => onOpenSession(session)}
          onToggleSave={() => onToggleSave(session.id)}
          onAddToCalendar={() => onAddToCalendar(session)}
          onOpenSpeaker={onOpenSpeaker}
        />
      ))}
    </div>
  );
}
