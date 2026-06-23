"use client";

import { useState } from "react";
import Image from "next/image";

const editions = {
  "2024": [
    {
      src: "/assets/gallery/2024/54032804453_cfef802556_b.jpg",
      alt: "Python Norte 2024 - 1",
    },
    {
      src: "/assets/gallery/2024/54032877279_5eaa5ea969_b.jpg",
      alt: "Python Norte 2024 - 2",
    },
    {
      src: "/assets/gallery/2024/54033003810_5a4fa2cd61_b.jpg",
      alt: "Python Norte 2024 - 3",
    },
  ],
  "2025": [
    { src: "/54635610770_b2cbf396d6_b.jpg", alt: "Python Norte 2025 - 1" },
    { src: "/54635537743_e3488aeb89_b.jpg", alt: "Python Norte 2025 - 2" },
    { src: "/53231441451_36d2be88e1_b.jpg", alt: "Python Norte 2025 - 3" },
  ],
};

export function Editions() {
  const [activeYear, setActiveYear] = useState<"2024" | "2025">("2025");

  return (
    <section className="min-h-[100vh] lg:min-h-[calc(100vh-3.5rem)] flex items-center py-20 md:py-28 bg-orange">
      <div className="container mx-auto px-4 w-full">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Edições que marcaram a comunidade
            </h2>
          </div>

          {/* Year tabs */}
          <div className="flex justify-center gap-3">
            {(["2024", "2025"] as const).map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  activeYear === year
                    ? "bg-green-deep text-white"
                    : "border-2 border-white text-white hover:bg-white/20"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {editions[activeYear].map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
