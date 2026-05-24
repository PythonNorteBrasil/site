"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const targetDate = new Date("2026-07-03T08:00:00-03:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="w-full bg-brand-green text-white py-3 px-4 text-center font-medium text-sm md:text-base flex items-center justify-center gap-2 animate-fade-in shadow-md">
        <Clock className="w-4 h-4 animate-pulse text-brand-yellow" />
        <span>🔥 A Python Norte 2026 já começou! Acompanhe a programação.</span>
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-brand-green-dark via-brand-green to-brand-green-dark text-white py-2.5 px-4 text-center font-medium text-sm md:text-base shadow-lg border-b border-white/10 z-50 relative flex flex-col sm:flex-row items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2 w-2 rounded-full bg-brand-yellow animate-ping" />
        <Clock className="w-4 h-4 text-brand-yellow" />
        <span>Faltam</span>
        <div className="flex items-center gap-1 font-mono font-bold text-brand-yellow bg-black/20 px-2 py-0.5 rounded">
          <span>{timeLeft.days}</span>
          <span className="text-[10px] font-sans font-medium text-white/70 uppercase">d</span>
        </div>
        <span>:</span>
        <div className="flex items-center gap-1 font-mono font-bold text-brand-yellow bg-black/20 px-2 py-0.5 rounded">
          <span>{formatNumber(timeLeft.hours)}</span>
          <span className="text-[10px] font-sans font-medium text-white/70 uppercase">h</span>
        </div>
        <span>:</span>
        <div className="flex items-center gap-1 font-mono font-bold text-brand-yellow bg-black/20 px-2 py-0.5 rounded">
          <span>{formatNumber(timeLeft.minutes)}</span>
          <span className="text-[10px] font-sans font-medium text-white/70 uppercase">m</span>
        </div>
        <span>:</span>
        <div className="flex items-center gap-1 font-mono font-bold text-brand-yellow bg-black/20 px-2 py-0.5 rounded">
          <span>{formatNumber(timeLeft.seconds)}</span>
          <span className="text-[10px] font-sans font-medium text-white/70 uppercase">s</span>
        </div>
      </div>
      <div className="hidden md:block w-[1px] h-4 bg-white/20" />
      <a 
        href="https://www.even3.com.br/python-norte-2026-631670/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-1 text-xs md:text-sm font-semibold text-brand-yellow hover:text-white transition-colors duration-200"
      >
        Garanta o seu ingresso com desconto
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}
