"use client";

import { useState, useCallback } from "react";
import { X, Clock, MapPin, Users, Calendar, Star, User } from "lucide-react";
import speakersData from "@/app/programacao/python-norte-2026_speakers.json";
import {
  RemoveConfirmDialog,
  AddedToAgendaToast,
} from "@/components/programacao/SessionActions";

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface SessionModalData {
  id: string;
  time: string;
  title: string;
  type: string;
  location?: string;
  target?: string;
  track?: string;
  description?: string;
  day: number;
  /** Only available on minha-agenda sessions */
  dayName?: string;
  /** Only available on minha-agenda sessions */
  date?: string;
  speakers?: string[];
  duration?: number;
}

export interface SpeakerChip {
  name: string;
  imagem?: string | null;
  onClick?: () => void;
}

// Build a map once at module level so every modal instance shares it
const speakersMap = new Map<string, string | null>(
  (speakersData as any[]).map((s) => [
    s.Nome as string,
    s.Imagem as string | null,
  ]),
);

interface Props {
  session: SessionModalData;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave?: () => void;
  onAddToCalendar: () => void;
  speakers?: SpeakerChip[];
}

// ─── Helpers (local, keeps component self-contained) ─────────────────────────

function getSessionStyle(type: string) {
  switch (type) {
    case "Keynote":
      return {
        bg: "bg-[#FFFBF0]",
        border: "border-l-[5px] border-[#FFB800]",
        badge: "bg-[#FFB800] text-[#1a1a1a]",
      };
    case "Palestra":
      return {
        bg: "bg-[#F4FAF5]",
        border: "border-l-[5px] border-[#004B23]",
        badge: "bg-[#004B23] text-white",
      };
    case "Tutorial":
      return {
        bg: "bg-[#FFF6F2]",
        border: "border-l-[5px] border-[#FF6B00]",
        badge: "bg-[#FF6B00] text-white",
      };
    default:
      return {
        bg: "bg-[#F5F7F8]",
        border: "border-l-[5px] border-[#7F8C8D]",
        badge: "bg-[#7F8C8D] text-white",
      };
  }
}

function getLevelStyle(target: string) {
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

// ─── Avatar with lazy-load skeleton ──────────────────────────────────────────

function Avatar({ src, alt }: { src: string | null; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-9 h-9 rounded-full bg-[#004B23]/10 flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 text-[#004B23]" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full relative flex-shrink-0 overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 bg-[#004B23]/10 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

export function SessionDetailModal({
  session,
  onClose,
  isSaved,
  onToggleSave,
  onAddToCalendar,
  speakers = [],
}: Props) {
  const [showToast, setShowToast] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const style = getSessionStyle(session.type);

  const handleStarClick = useCallback(() => {
    if (!onToggleSave) return;
    if (isSaved) {
      setShowConfirm(true);
    } else {
      onToggleSave();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [isSaved, onToggleSave]);

  const handleConfirmRemove = useCallback(() => {
    setShowConfirm(false);
    onToggleSave?.();
    onClose();
  }, [onToggleSave, onClose]);

  // Date/time line — agenda shows day name + date, programacao shows time only
  const timeLabel =
    session.dayName && session.date
      ? `${session.dayName}, ${session.date} · ${session.time}`
      : session.time;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-t-3xl sm:rounded-2xl max-w-3xl w-full shadow-2xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Header ── */}
          <div
            className={`p-4 sm:p-6 rounded-t-3xl sm:rounded-t-2xl ${style.bg} ${style.border} border-t-0 sticky top-0 z-10`}
          >
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}
                  >
                    {session.type}
                  </span>
                  {session.target &&
                    (() => {
                      const ls = getLevelStyle(session.target);
                      return (
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-full flex items-center gap-1 ${ls.bg} ${ls.text}`}
                        >
                          <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {session.target}
                        </span>
                      );
                    })()}
                </div>
                <h2 className="text-lg sm:text-2xl font-bold text-[#004B23] mb-2 leading-tight">
                  {session.title}
                </h2>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-[#4A5D4E]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{timeLabel}</span>
                  </div>
                  {session.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{session.location}</span>
                    </div>
                  )}
                  {session.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>{session.duration} min</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 text-[#4A5D4E]" />
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {session.track && (
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                  Trilha
                </h3>
                <div className="text-xs sm:text-sm font-semibold text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10 px-3 py-2 rounded-lg inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5E3C] flex-shrink-0" />
                  <span className="break-words">{session.track}</span>
                </div>
              </div>
            )}

            {speakers.length > 0 && (
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                  {speakers.length === 1 ? "Palestrante" : "Palestrantes"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {speakers.map((s, idx) => {
                    const img =
                      s.imagem !== undefined
                        ? s.imagem
                        : (speakersMap.get(s.name) ?? null);
                    return s.onClick ? (
                      <button
                        key={idx}
                        onClick={s.onClick}
                        className="flex items-center gap-3 bg-[#F4FAF5] border border-[#004B23]/10 rounded-xl px-3 py-2 hover:bg-[#FF6B00]/5 hover:border-[#FF6B00]/30 transition-all group text-left"
                      >
                        <Avatar src={img} alt={s.name} />
                        <span className="text-xs sm:text-sm font-semibold text-[#FF6B00] group-hover:underline">
                          {s.name}
                        </span>
                      </button>
                    ) : (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-[#F4FAF5] border border-[#004B23]/10 rounded-xl px-3 py-2"
                      >
                        <Avatar src={img} alt={s.name} />
                        <span className="text-xs sm:text-sm text-[#004B23]">
                          {s.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {session.description && (
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">
                  Resumo
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5D4E] leading-relaxed">
                  {session.description}
                </p>
              </div>
            )}

            {/* ── Actions ── */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#004B23]/10 sticky bottom-0 bg-white pb-safe flex-wrap">
              <div className="flex items-center gap-2">
                {/* Star — save / remove (relative so toast works) */}
                {onToggleSave && (
                  <div className="relative">
                    <button
                      onClick={handleStarClick}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all font-semibold text-sm ${
                        isSaved
                          ? "text-[#FFB800] hover:bg-[#FFB800]/10"
                          : "text-gray-400 hover:bg-gray-100 hover:text-[#FFB800]"
                      }`}
                      title={isSaved ? "Remover da agenda" : "Salvar na agenda"}
                    >
                      <Star
                        className="w-5 h-5"
                        fill={isSaved ? "currentColor" : "none"}
                      />
                      <span className="text-xs">
                        {isSaved ? "Salvo" : "Salvar"}
                      </span>
                    </button>
                  </div>
                )}

                {/* Google Agenda — icon + label */}
                <button
                  onClick={onAddToCalendar}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[#FFB800]/10 text-[#4A5D4E] hover:text-[#4A5D4E] transition-all font-semibold text-sm"
                  title="Salvar no Google Agenda"
                >
                  <Calendar className="w-5 h-5 text-[#FFB800]" />
                  <span className="text-xs">Google Agenda</span>
                </button>
              </div>
              {showToast && <AddedToAgendaToast />}

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
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
