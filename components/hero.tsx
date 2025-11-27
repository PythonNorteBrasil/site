"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

type Slide = {
  src: string;
  alt: string;
};

const SLIDESHOW_IMAGES: Slide[] = [
  {
    src: "/54635610770_b2cbf396d6_b.jpg",
    alt: "Python Norte 2025",
  },
  {
    src: "54031670507_d1e7fb8bb9_b.jpg",
    alt: "Python Norte 2024",
  },
  {
    src: "/53231441451_36d2be88e1_b.jpg",
    alt: "Python Norte 2023",
  },
];

// utilitário: detecta preferência por menos animação
const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
};

export function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const total = SLIDESHOW_IMAGES.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // autoplay com pausas quando a aba não está visível
  useEffect(() => {
    const start = () => {
      if (reducedMotion) return;
      stop();
      intervalRef.current = window.setInterval(() => {
        setCurrent((prev) => (prev + 1) % total);
      }, 5000);
    };
    const stop = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [total, reducedMotion]);

  // suporte a teclas ← / →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <section
      className="relative min-h-[92vh] w-full flex items-center justify-center overflow-hidden"
      aria-label="Seção principal: apresentação do evento"
    >
      {/* fundo com slideshow */}
      <div className="absolute inset-0">
        {SLIDESHOW_IMAGES.map((image, i) => (
          <div
            key={image.src}
            className={[
              "absolute inset-0",
              reducedMotion ? "opacity-0" : "transition-opacity duration-1000",
              i === current ? "opacity-100" : "opacity-0",
            ].join(" ")}
            aria-hidden={i !== current}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        {/* gradiente para legibilidade */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75"
          aria-hidden="true"
        />
      </div>

      {/* Controles do slideshow */}
      <nav
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-4 md:px-8 z-20"
        aria-label="Controles do slideshow"
      >
        <button
          onClick={prev}
          className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white p-3 rounded-full transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 shadow-lg border border-white/25"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={next}
          className="bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white p-3 rounded-full transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 shadow-lg border border-white/25"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </nav>

      {/* Indicadores */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20"
        role="tablist"
        aria-label="Navegação das imagens"
      >
        {SLIDESHOW_IMAGES.map((_, i) => {
          const active = i === current;
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              role="tab"
              aria-selected={active}
              aria-current={active ? "true" : undefined}
              aria-label={`Ir para foto ${i + 1}`}
              className={[
                "h-2 rounded-full transition-[width,opacity] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80",
                active ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/70",
              ].join(" ")}
            />
          );
        })}
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-white drop-shadow-xl">
            Python Norte
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/95 drop-shadow-md">
            O maior evento da comunidade Python do Norte do Brasil
          </p>

          <p className="text-base md:text-lg text-white/95 max-w-3xl mx-auto drop-shadow-md bg-black/50 px-5 py-3 rounded-lg border border-white/15">
            Próxima edição:{" "}
            <strong>Anaindeua/PA, de 3 a 5 de julho de 2026</strong>.
          </p>

          <p className="text-base md:text-lg text-white/95 max-w-3xl mx-auto drop-shadow-md bg-black/50 px-5 py-3 rounded-lg border border-white/15">
            Desde 2017: conectando desenvolvedores, compartilhando conhecimento
            e celebrando a comunidade Python Amazônida e Nortista
            <br />
            <span className="font-semibold text-white">
              Um evento feito pela comunidade e para a comunidade 💙🏳️‍🌈
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            <Button
              asChild
              size="lg"
              className="text-base md:text-lg px-7 md:px-8 py-5 bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl border border-white/20 focus-visible:ring-2 focus-visible:ring-white/80"
            >
              <a
                href="https://www.even3.com.br/python-norte-2026-631670?cp=pybr2025"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ingressos Python Norte 2026 com desconto!
              </a>
            </Button>
          </div>
          <iframe
            src="https://open.spotify.com/embed/playlist/5NVFaRIQ6MzLpwYSA29ptm?autoplay=1"
            width="80%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy" />
        </div>
      </div>
    </section>
  );
}
