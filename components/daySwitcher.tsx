interface Day {
  name: string;
  date: string;
  dayNum: number;
}

interface Props {
  days: Day[];
  activeDay: number;
  onChange: (index: number) => void;
}

export function DaySwitcher({ days, activeDay, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {days.map((day, idx) => (
        <button
          key={day.dayNum}
          onClick={() => onChange(idx)}
          className={`px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all ${
            idx === activeDay
              ? "bg-[#004B23] text-white border-[#004B23]"
              : "bg-white text-[#004B23] border-[#004B23]/30"
          }`}
        >
          {day.name} - {day.date}
        </button>
      ))}
    </div>
  );
}
