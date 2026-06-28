interface StatsCardProps {
  value: number;
  label: string;
  color: string;
}

export function StatsCard({ value, label, color }: StatsCardProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border border-[#004B23]/10">
      <div className={`text-xl font-bold ${color}`}>{value}</div>

      <div className="text-xs text-[#4A5D4E]">{label}</div>
    </div>
  );
}
