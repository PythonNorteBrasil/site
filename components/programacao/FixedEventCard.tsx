import { Clock, Coffee, UtensilsCrossed, Zap, ClipboardList, Mic, Flag, MapPin } from "lucide-react";

export type FixedEventKind =
  | "credenciamento"
  | "abertura"
  | "coffee"
  | "almoco"
  | "lightning"
  | "encerramento"

export interface FixedEvent {
  id: string;
  kind: FixedEventKind;
  title: string;
  time: string;        // "08:00 — 08:40"
  location?: string;
  day: number;
}

const KIND_CONFIG: Record<
  FixedEventKind,
  { icon: React.ElementType; bg: string; border: string; badge: string; badgeText: string }
> = {
  encerramento: {
    icon: Flag,
    bg: "bg-[#F5F0FF]",
    border: "border-l-[5px] border-[#7C3AED]",
    badge: "bg-[#7C3AED] text-white",
    badgeText: "Encerramento",
  },
  credenciamento: {
    icon: ClipboardList,
    bg: "bg-[#F0F4FF]",
    border: "border-l-[5px] border-[#4A6FA5]",
    badge: "bg-[#4A6FA5] text-white",
    badgeText: "Credenciamento",
  },
  abertura: {
    icon: Mic,
    bg: "bg-[#FFF8F0]",
    border: "border-l-[5px] border-[#FF6B00]",
    badge: "bg-[#FF6B00] text-white",
    badgeText: "Abertura",
  },
  coffee: {
    icon: Coffee,
    bg: "bg-[#FDF6EC]",
    border: "border-l-[5px] border-[#C8872A]",
    badge: "bg-[#C8872A] text-white",
    badgeText: "Coffee Break",
  },
  almoco: {
    icon: UtensilsCrossed,
    bg: "bg-[#F0FBF4]",
    border: "border-l-[5px] border-[#2E8B57]",
    badge: "bg-[#2E8B57] text-white",
    badgeText: "Almoço",
  },
  lightning: {
    icon: Zap,
    bg: "bg-[#FDFAF0]",
    border: "border-l-[5px] border-[#D4AC0D]",
    badge: "bg-[#D4AC0D] text-[#1a1a1a]",
    badgeText: "Lightning Talks",
  },
};

interface Props {
  event: FixedEvent;
}

export function FixedEventCard({ event }: Props) {
  const cfg = KIND_CONFIG[event.kind];
  const Icon = cfg.icon;

  return (
    <div
      className={`flex items-center gap-4 px-4 py-5 rounded-2xl border border-[#004B23]/5 shadow-sm ${cfg.bg} ${cfg.border}`}
    >
      {/* Icon */}
      <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 shadow-sm">
        <Icon className="w-4 h-4 text-[#4A5D4E]" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span
            className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge}`}
          >
            {cfg.badgeText}
          </span>
          <span className="text-xs text-[#4A5D4E]/70 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {event.time}
          </span>
        </div>
        <p className="text-sm font-semibold text-[#1f2328] truncate">{event.title}</p>
        {event.location && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#2D3E31] mt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {event.location}
          </div>
        )}
      </div>
    </div>
  );
}
