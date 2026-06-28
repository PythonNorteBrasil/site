import Link from "next/link";
import { Calendar } from "lucide-react";
import { StatsCard } from "./statsCards";

interface Props {
  keynote: number;
  talks: number;
  tutorials: number;
  saved: number;
}

export function ScheduleStats({ keynote, talks, tutorials, saved }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap max-w-3xl mx-auto">
      <StatsCard value={keynote} label="Keynotes" color="text-[#004B23]" />

      <StatsCard value={talks} label="Palestras" color="text-[#FFB800]" />

      <StatsCard value={tutorials} label="Tutoriais" color="text-[#FF6B00]" />

      <Link
        href="/minha-agenda"
        className="flex items-center gap-2 bg-gradient-to-br from-[#004B23] to-[#003318] rounded-lg px-3 py-2 shadow-sm hover:scale-105 transition-transform"
      >
        <Calendar className="w-5 h-5 text-[#FFB800]" />

        <div className="text-xl font-bold text-white">{saved}</div>

        <div className="text-xs text-white/80">Minha Agenda</div>
      </Link>
    </div>
  );
}
