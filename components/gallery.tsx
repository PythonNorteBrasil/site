"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, Image as ImageIcon } from "lucide-react";

type ImageItem = {
  year: string;
  city: string;
  query: string;
  src: string;
};

export function Gallery() {
  const images: ImageItem[] = [
    { year: "2025", city: "Belém/PA", query: "Python Norte 2025", src: "/54635610770_b2cbf396d6_b.jpg" },
    { year: "2024", city: "Itacoatiara/AM", query: "Python Norte 2024", src: "/54031670507_d1e7fb8bb9_b.jpg" },
    { year: "2023", city: "Manaus/AM", query: "Python Norte 2023", src: "/53231441451_36d2be88e1_b.jpg" },
    { year: "2022", city: "Manaus/AM", query: "Python Brasil 2022", src: "/diverse-tech-community-group-photo-at-conference.jpg" },
    { year: "2024", city: "Itacoatiara/AM", query: "Python Norte 2024", src: "/54032804453_cfef802556_b.jpg" },
    { year: "2024", city: "Itacoatiara/AM", query: "Python Norte 2024", src: "/54033003810_5a4fa2cd61_b.jpg" }
  ];

  const [activeImage, setActiveImage] = useState<ImageItem | null>(null);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    if (activeImage || isMoreOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeImage, isMoreOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveImage(null);
        setIsMoreOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="galeria"
      className="relative py-20 md:py-32 bg-slate-50 text-brand-text overflow-hidden"
      aria-label="Galeria de Momentos"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-5 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-oferta text-brand-green">
              Galeria de Momentos
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
            <p className="text-base md:text-lg max-w-xl mx-auto text-foreground/80 font-medium pt-2">
              Uma pequena amostra dos momentos inesquecíveis que construímos juntos nas edições anteriores.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(image)}
                className="relative group overflow-hidden rounded-3xl aspect-[4/3] bg-black/10 border border-black/5 hover:shadow-xl transition-all cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <Image
                  src={image.src}
                  alt={`${image.year} - ${image.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-left text-white space-y-1">
                    <div className="text-xl font-bold font-oferta leading-tight">{image.year}</div>
                    <div className="text-xs font-semibold opacity-90">{image.city}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Button More */}
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="py-6 px-8 rounded-2xl border-2 hover:bg-brand-orange hover:text-white hover:border-brand-orange font-bold text-sm shadow-md"
              onClick={() => setIsMoreOpen(true)}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Ver Álbum no Flickr
            </Button>
          </div>
        </div>
      </div>

      {/* Modal Zoom */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 md:-top-4 md:-right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full shadow-lg transition-colors border border-white/10"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-[4/3] max-h-[75vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={activeImage.src}
                alt={`${activeImage.year} - ${activeImage.city}`}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-4 text-center text-sm font-bold text-white/90">
              {activeImage.year} • {activeImage.city}
            </div>
          </div>
        </div>
      )}

      {/* Modal Flickr links */}
      {isMoreOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsMoreOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white border border-black/5 shadow-2xl p-6 md:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsMoreOpen(false)}
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full shadow-lg"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground font-oferta">
                Álbuns Completos no Flickr
              </h3>
              <p className="text-xs md:text-sm text-foreground/60 font-medium">
                Explore a cobertura fotográfica completa das edições da Python Norte.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { name: "Python Norte 2025 – Belém/PA", link: "https://www.flickr.com/photos/203114989@N04/albums/72177720327337621/" },
                { name: "Python Norte 2024 – Itacoatiara/AM", link: "https://www.flickr.com/photos/199250629@N02/albums/72177720320720177" },
                { name: "Python Norte 2023 – Manaus/AM", link: "https://www.flickr.com/photos/199250629@N02/albums/72177720311661136/" },
                { name: "Python Brasil 2022 – Manaus/AM", link: "https://www.flickr.com/photos/pythonbrasil/albums/72177720303213577/" }
              ].map((album, aIdx) => (
                <a
                  key={aIdx}
                  href={album.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between w-full rounded-2xl border border-black/5 px-5 py-4 text-xs md:text-sm font-bold text-foreground hover:bg-brand-orange-light/10 hover:text-brand-orange hover:border-brand-orange/30 transition-all shadow-sm"
                >
                  <span>{album.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
