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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Esconde o banner quando rolar mais de 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
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
      <div
        className={`fixed top-0 left-0 right-0 z-[60] w-full bg-green-900 text-white py-2 px-4 text-center font-medium text-sm flex items-center justify-center gap-2 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Clock className="w-4 h-4 animate-pulse text-yellow-400" />
        <span>🔥 A Python Norte 2026 já começou! Acompanhe a programação.</span>
      </div>
    );
  }

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] w-full bg-green-900 text-white py-1 px-3 border-b border-green-800 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-4">
        <span className="text-xs md:text-sm font-medium text-white/90">
          Faltam apenas:
        </span>

        <div className="flex items-center gap-2 md:gap-2.5">
          {/* Days */}
          <div className="flex flex-col items-center">
            <div className="bg-green-800 rounded px-2 py-1 min-w-[32px] md:min-w-[40px] flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-white tabular-nums">
                {timeLeft.days}
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] text-white/70 mt-0.5 font-medium">
              dias
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="bg-green-800 rounded px-2 py-1 min-w-[32px] md:min-w-[40px] flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-white tabular-nums">
                {formatNumber(timeLeft.hours)}
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] text-white/70 mt-0.5 font-medium">
              horas
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="bg-green-800 rounded px-2 py-1 min-w-[32px] md:min-w-[40px] flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-white tabular-nums">
                {formatNumber(timeLeft.minutes)}
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] text-white/70 mt-0.5 font-medium">
              min
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center">
            <div className="bg-green-800 rounded px-2 py-1 min-w-[32px] md:min-w-[40px] flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold text-white tabular-nums">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
            <span className="text-[9px] md:text-[10px] text-white/70 mt-0.5 font-medium">
              seg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
