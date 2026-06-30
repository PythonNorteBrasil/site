"use client";

import { Filter, MapPin, X } from "lucide-react";
import type { ActiveFilters } from "@/hooks/useProgramacao";

interface FilterOption {
  value: string;
  label: string;
  color?: string | { bg: string; text: string };
}

interface FilterOptions {
  type: FilterOption[];
  target: (FilterOption & { color: { bg: string; text: string } })[];
  track: FilterOption[];
  location: FilterOption[];
}

interface Props {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  hasActiveFilters: boolean;
  totalActiveFilters: number;
  filteredCount: number;
  onToggle: (category: keyof ActiveFilters, value: string) => void;
  onClear: () => void;
  onClose: () => void;
}

export function FiltersPanel({
  filterOptions,
  activeFilters,
  hasActiveFilters,
  totalActiveFilters,
  filteredCount,
  onToggle,
  onClear,
  onClose,
}: Props) {
  return (
    /* ── Modal overlay ── */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Sheet / dialog */}
      <div
        className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-[#004B23]/10 bg-[#F4FAF5] rounded-t-3xl sm:rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#004B23]" />
            <h3 className="text-sm font-bold text-[#004B23]">Filtros</h3>
            {hasActiveFilters && (
              <span className="bg-[#FF6B00] text-white rounded-full px-2 py-0.5 text-[10px] font-bold">
                {totalActiveFilters} ativos
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#FF6B00] text-white hover:bg-[#e05e00] transition-colors"
              >
                Limpar
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#004B23]/10 text-[#4A5D4E] transition-colors"
              aria-label="Fechar filtros"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable filter groups */}
        <div className="overflow-y-auto flex-1">
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Type */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#004B23]" />
                Tipo de Atividade
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {filterOptions.type.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onToggle("type", opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      activeFilters.type.includes(opt.value)
                        ? `${opt.color as string} text-white border-transparent`
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#004B23]" />
                Nível
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {filterOptions.target.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onToggle("target", opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      activeFilters.target.includes(opt.value)
                        ? `${opt.color.bg} ${opt.color.text} border-transparent`
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#004B23]" />
                Local / Sala
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {filterOptions.location.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onToggle("location", opt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      activeFilters.location.includes(opt.value)
                        ? "bg-[#3B82F6] text-white border-transparent"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Track */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                Trilha
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {filterOptions.track.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onToggle("track", opt.value)}
                    title={opt.value}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      activeFilters.track.includes(opt.value)
                        ? "bg-[#FF6B00] text-white border-transparent"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer — sticky CTA */}
        <div className="px-5 py-4 border-t border-[#004B23]/10 bg-[#F4FAF5] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full font-bold text-sm bg-[#004B23] text-white hover:bg-[#003318] transition-colors"
          >
            Mostrar resultados
            {hasActiveFilters && (
              <span className="ml-2 bg-white/20 rounded-full px-1.5 py-0.5 text-[10px]">
                {filteredCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
