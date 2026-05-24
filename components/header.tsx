"use client";

import { useState, useEffect } from "react";
import { Menu, X, Clock } from "lucide-react";
import Link from "next/link";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const eventDate = new Date("2026-07-03T08:00:00-03:00");
  const countdown = useCountdown(eventDate);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#atividades", label: "Atividades" },
    { href: "#programacao", label: "Programação" },
    { href: "#patrocinadores", label: "Patrocinadores" },
    { href: "#localizacao", label: "Localização" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
      {/* Countdown banner */}
      <div className="bg-green-deep text-white py-2.5 shadow-sm border-b border-white/5">
        <div className="container mx-auto px-4 flex flex-row items-center justify-center gap-3 md:gap-5">
          <span className="text-xs md:text-sm font-semibold text-white/90">
            Faltam apenas:
          </span>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-green-medium rounded-xl h-8 w-11 md:h-10 md:w-14 shadow-sm">
                <span className="text-sm md:text-lg font-black text-white leading-none">
                  {String(countdown.days).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] text-white/80 lowercase mt-1 leading-none">
                dias
              </span>
            </div>
            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-green-medium rounded-xl h-8 w-11 md:h-10 md:w-14 shadow-sm">
                <span className="text-sm md:text-lg font-black text-white leading-none">
                  {String(countdown.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] text-white/80 lowercase mt-1 leading-none">
                horas
              </span>
            </div>
            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-green-medium rounded-xl h-8 w-11 md:h-10 md:w-14 shadow-sm">
                <span className="text-sm md:text-lg font-black text-white leading-none">
                  {String(countdown.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] text-white/80 lowercase mt-1 leading-none">
                min
              </span>
            </div>
            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center bg-green-medium rounded-xl h-8 w-11 md:h-10 md:w-14 shadow-sm">
                <span className="text-sm md:text-lg font-black text-white leading-none">
                  {String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[9px] md:text-[10px] text-white/80 lowercase mt-1 leading-none">
                seg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF6EE]/95 backdrop-blur-md shadow-md py-2.5"
            : "bg-[#FAF6EE]/90 backdrop-blur-sm py-3.5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img
              className="h-9 md:h-11 w-auto object-contain"
              src="/logo_desktop.png"
              alt="Python Norte Logo"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-700 hover:text-green-deep transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="https://www.even3.com.br/python-norte-2026-631670/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange hover:bg-orange-hover text-white font-bold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              Garanta sua vaga
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden w-full bg-[#FAF6EE] border-t border-gray-100 px-4 py-4 flex flex-col gap-2 shadow-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-gray-700 hover:text-green-deep py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-gray-100 my-2" />
            <a
              href="https://www.even3.com.br/python-norte-2026-631670/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-orange hover:bg-orange-hover text-white font-bold py-3 rounded-full shadow-md text-center text-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Garanta sua vaga
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
