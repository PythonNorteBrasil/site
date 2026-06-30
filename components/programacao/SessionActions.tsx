"use client";

import { Star, Trash2, X } from "lucide-react";

// ── Confirm-remove dialog ──────────────────────────────────────────────────────
export function RemoveConfirmDialog({
  title,
  onConfirm,
  onCancel,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#FFB800] fill-[#FFB800] shrink-0 mt-0.5" />
            <p className="text-sm font-bold text-[#1a1a1a] leading-snug">
              Remover da agenda?
            </p>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-[#4A5D4E] leading-relaxed">
          Tem certeza que quer remover{" "}
          <span className="font-semibold text-[#1a1a1a]">"{title}"</span>{" "}
          da sua agenda?
        </p>
        <div className="flex gap-3 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-full font-bold text-sm border-2 border-[#004B23]/20 text-[#004B23] hover:border-[#004B23]/50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-full font-bold text-sm bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}

// ── "Added to agenda" toast ────────────────────────────────────────────────────
export function AddedToAgendaToast() {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <div className="flex items-center gap-1.5 bg-[#004B23] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap animate-fade-in-up">
        <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
        Adicionado à agenda
      </div>
    </div>
  );
}
