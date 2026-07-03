"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, Calendar, Clock, Laptop, MapPin, Star, Users } from "lucide-react";
import type { Session, Speaker } from "@/hooks/useProgramacao";
import { RemoveConfirmDialog, AddedToAgendaToast } from "@/components/programacao/SessionActions";

interface SessionStyle {
  bg: string;
  border: string;
  badge: string;
  isKeynote: boolean;
}

interface Props {
  session: Session;
  style: SessionStyle;
  isSaved: boolean;
  hasConflict?: boolean;
  getLevelStyle: (target: string) => { bg: string; text: string };
  speakersMap: Map<string, Speaker>;
  onOpen: () => void;
  onToggleSave: () => void;
  onAddToCalendar: () => void;
  onOpenSpeaker: (speaker: Speaker) => void;
}

export function SessionCard({
  session,
  style,
  isSaved,
  hasConflict = false,
  getLevelStyle,
  speakersMap,
  onOpen,
  onToggleSave,
  onAddToCalendar,
  onOpenSpeaker,
}: Props) {
  const [showToast, setShowToast] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStarClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isSaved) {
        setShowConfirm(true);
      } else {
        onToggleSave();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    },
    [isSaved, onToggleSave],
  );

  const handleConfirmRemove = useCallback(() => {
    setShowConfirm(false);
    onToggleSave();
  }, [onToggleSave]);

  return (
    <>
      <div
        onClick={onOpen}
        className={`relative flex flex-col p-5 rounded-2xl ${style.bg} ${style.border} border border-[#004B23]/8 shadow-sm transition-all duration-200 gap-3 group hover:shadow-md cursor-pointer hover:scale-[1.005]`}
      >
        {/* "Added" toast */}
        {showToast && <AddedToAgendaToast />}

        {/* Conflict warning */}
        {hasConflict && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-300/60 pointer-events-none">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="text-[11px] font-bold text-amber-700">
              Conflito de horário com outra atividade da sua agenda
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-3">
          {/* Time row — shares line with action buttons */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold flex items-center gap-2 text-[#4A5D4E] pointer-events-none">
              <Clock className="w-4 h-4" />
              {session.time}
            </span>

            {/* Action buttons — inline with time */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Star — save / remove */}
              <button
                onClick={handleStarClick}
                className={`p-1.5 rounded-lg transition-all active:scale-90 ${
                  isSaved
                    ? "text-[#FFB800] hover:bg-[#FFB800]/10"
                    : "text-gray-400 hover:bg-gray-100 hover:text-[#FFB800]"
                }`}
                title={isSaved ? "Remover da agenda" : "Salvar na agenda"}
              >
                <Star className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
              </button>

              {/* Google Agenda — icon + label */}
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCalendar(); }}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold text-[#4A5D4E] hover:bg-gray-100 transition-all active:scale-90 whitespace-nowrap"
                title="Salvar no Google Agenda"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
                <span className="hidden sm:inline">Google Agenda</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pointer-events-none">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}>
              {session.type}
            </span>
            {session.target && (() => {
              const ls = getLevelStyle(session.target);
              return (
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${ls.bg} ${ls.text}`}>
                  {session.target}
                </span>
              );
            })()}
            <span className={`font-bold tracking-tight text-[#004B23] ${style.isKeynote ? "text-lg sm:text-xl" : "text-base"}`}>
              {session.title}
            </span>
          </div>

          {session.location && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D3E31] pointer-events-none">
              <MapPin className="w-3.5 h-3.5" />
              {session.location}
            </div>
          )}

          {/* Tutorial notice chips */}
          {session.type === "Tutorial" && (
            <div className="flex flex-wrap gap-1.5 pointer-events-none">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFF6F2] text-[#FF6B00] border border-[#FF6B00]/20">
                <AlertTriangle className="w-3 h-3" />
                30 vagas
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFF6F2] text-[#FF6B00] border border-[#FF6B00]/20">
                <Laptop className="w-3 h-3" />
                Traga seu notebook
              </span>
            </div>
          )}

          {session.track && (
            <div className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 self-start text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
              {session.track}
            </div>
          )}

          {session.speakers && session.speakers.length > 0 && (
            <div className="text-xs flex items-center gap-1.5 flex-wrap text-[#4A5D4E] pointer-events-none">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="font-semibold">
                {session.speakers.length === 1 ? "Palestrante:" : "Palestrantes:"}
              </span>
              <div className="flex flex-wrap gap-1 items-center">
                {session.speakers.map((speakerName, idx) => {
                  const speaker = speakersMap.get(speakerName);
                  const total = session.speakers!.length;
                  const isLast = idx === total - 1;
                  const isSecondToLast = idx === total - 2;
                  return (
                    <span key={idx} className="flex items-center gap-1">
                      {speaker ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); onOpenSpeaker(speaker); }}
                          className="hover:underline font-semibold pointer-events-auto text-[#FF6B00]"
                        >
                          {speakerName}
                        </button>
                      ) : (
                        <span>{speakerName}</span>
                      )}
                      {!isLast && <span>{isSecondToLast ? " e" : ","}</span>}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {showConfirm && (
        <RemoveConfirmDialog
          title={session.title}
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
