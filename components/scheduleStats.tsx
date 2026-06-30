import { StatsCard } from "./statsCards";

interface Props {
  keynote: number;
  talks: number;
  tutorials: number;
}

export function ScheduleStats({ keynote, talks, tutorials }: Props) {
  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap max-w-3xl mx-auto">
      <StatsCard value={keynote} label="Keynotes" color="text-[#004B23]" />
      <StatsCard value={talks} label="Palestras" color="text-[#FFB800]" />
      <StatsCard value={tutorials} label="Tutoriais" color="text-[#FF6B00]" />
    </div>
  );
}
