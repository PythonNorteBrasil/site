import { Filter, Star } from "lucide-react";
import { DaySwitcher } from "@/components/daySwitcher";
import type { Day } from "@/hooks/useProgramacao";

interface Props {
  days: Day[];
  activeDay: number;
  onDayChange: (index: number) => void;
  showAgenda: boolean;
  onToggleAgenda: () => void;
  savedCount: number;
  hasActiveFilters: boolean;
  totalActiveFilters: number;
  onToggleFilters: () => void;
  agendaCount: number;
}

export function ScheduleToolbar({
  days,
  activeDay,
  onDayChange,
  showAgenda,
  onToggleAgenda,
  savedCount,
  hasActiveFilters,
  totalActiveFilters,
  onToggleFilters,
  agendaCount,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Left: day switcher */}
      <DaySwitcher days={days} activeDay={activeDay} onChange={onDayChange} />

      {/* Right: action buttons */}
      <div className="flex gap-3 items-center">
        {/* Filters button — always visible */}
        <button
          onClick={onToggleFilters}
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

        {/* Agenda toggle — icon only with badge */}
        <div className="relative">
          <button
            onClick={onToggleAgenda}
            title={showAgenda ? "Fechar minha agenda" : "Ver minha agenda"}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              showAgenda
                ? "bg-[#FFB800] border-[#FFB800] text-[#1a1a1a]"
                : "bg-white border-[#004B23]/30 text-[#004B23] hover:border-[#004B23]"
            }`}
          >
            <Star
              className="w-4 h-4"
              fill={showAgenda ? "currentColor" : "none"}
            />
          </button>
          {/* Badge: saved count when closed, filtered count when open */}
          {((!showAgenda && savedCount > 0) || showAgenda) && (
            <span
              className={`absolute -top-1.5 -right-1.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold px-1 leading-none pointer-events-none ${
                showAgenda
                  ? "bg-[#004B23] text-white"
                  : "bg-[#FFB800] text-[#1a1a1a]"
              }`}
            >
              {showAgenda ? agendaCount : savedCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
