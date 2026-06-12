"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ImageItem {
  src: string;
  alt: string;
}

interface Edition {
  year: string;
  title: string;
  location: string;
  images: ImageItem[];
}

const editionsData: Edition[] = [
  {
    year: "2023",
    title: "Python Norte 2023",
    location: "UniNorte - Manaus, AM",
    images: [
      {
        src: "/assets/gallery/2023/53230450217_d5389c2da7_b.jpg",
        alt: "Python Norte 2023 - Abertura do evento com palestrantes e participantes",
      },
      {
        src: "/assets/gallery/2023/53230498102_b4c637890a_b.jpg",
        alt: "Python Norte 2023 - Momento de palestra técnica na UniNorte",
      },
      {
        src: "/assets/gallery/2023/53231330506_247ebe2e89_b.jpg",
        alt: "Python Norte 2023 - Networking no credenciamento do evento",
      },
      {
        src: "/assets/gallery/2023/53231346631_1fe093b598_b.jpg",
        alt: "Python Norte 2023 - Auditório lotado com a comunidade engajada",
      },
      {
        src: "/assets/gallery/2023/53231412486_a64dbe8281_b.jpg",
        alt: "Python Norte 2023 - Palestrante compartilhando conhecimentos",
      },
      {
        src: "/assets/gallery/2023/53231652518_160a6c8306_b.jpg",
        alt: "Python Norte 2023 - Oficina prática de programação Python",
      },
      {
        src: "/assets/gallery/2023/53231714689_894bb89745_b.jpg",
        alt: "Python Norte 2023 - Foto oficial da equipe organizadora e voluntários",
      },
      {
        src: "/assets/gallery/2023/53231857045_0123ab17ed_b.jpg",
        alt: "Python Norte 2023 - Encontro das comunidades de tecnologia locais",
      },
      {
        src: "/assets/gallery/2023/53231941755_7c37d6e477_b.jpg",
        alt: "Python Norte 2023 - Encerramento festivo e agradecimentos",
      },
    ],
  },
  {
    year: "2024",
    title: "Python Norte 2024",
    location: "ICET/UFAM - Itacoatiara, AM",
    images: [
      {
        src: "/assets/gallery/2024/54032804453_cfef802556_b.jpg",
        alt: "Python Norte 2024 - Painel interativo com líderes de tecnologia",
      },
      {
        src: "/assets/gallery/2024/54032877279_5eaa5ea969_b.jpg",
        alt: "Python Norte 2024 - Comunidade participando de discussões e debates",
      },
      {
        src: "/assets/gallery/2024/54033003810_5a4fa2cd61_b.jpg",
        alt: "Python Norte 2024 - Keynote de encerramento no auditório da UFAM",
      },
    ],
  },
  {
    year: "2025",
    title: "Python Norte 2025",
    location: "Belém, PA",
    images: [
      {
        src: "/54635610770_b2cbf396d6_b.jpg",
        alt: "Python Norte 2025 - Registro geral da comunidade e participantes em Belém",
      },
      {
        src: "/54635537743_e3488aeb89_b.jpg",
        alt: "Python Norte 2025 - Palestrante convidado compartilhando insights",
      },
      {
        src: "/53231441451_36d2be88e1_b.jpg",
        alt: "Python Norte 2025 - Workshop e engajamento da comunidade",
      },
    ],
  },
];

export function Editions() {
  const [activeYear, setActiveYear] = useState<string>("2025");

  const activeEdition =
    editionsData.find((ed) => ed.year === activeYear) || editionsData[2];

  return (
    <section className="py-20 md:py-28 bg-[#F35E0C] text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 md:space-y-4">
            <h2
              className="text-2xl md:text-4xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Edições que marcaram a comunidade
            </h2>
            <div className="w-14 md:w-16 h-1 mx-auto rounded-full bg-white opacity-90" />
            <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Cada ano, a Python Norte cresce mais. Veja como nossas últimas edições reuniram a comunidade.
            </p>
          </div>

          {/* Year Tabs */}
          <div className="flex justify-center gap-3">
            {editionsData.map((edition) => (
              <button
                key={edition.year}
                onClick={() => setActiveYear(edition.year)}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                  activeYear === edition.year
                    ? "bg-[#1F5506] text-white shadow-[0_4px_12px_rgba(31,85,6,0.3)] border border-[#1F5506]"
                    : "border border-white/50 text-white hover:bg-white/10"
                }`}
              >
                {edition.year}
              </button>
            ))}
          </div>

          {/* Title and Location */}
          <div className="text-center space-y-1.5 animate-fade-in">
            <h3
              className="text-xl md:text-2xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {activeEdition.title}
            </h3>
            <p className="text-xs md:text-sm text-white/85 font-medium flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-yellow-500 shrink-0" />
              {activeEdition.location}
            </p>
          </div>

          {/* Gallery Carousel */}
          <div className="relative px-2 md:px-10">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {activeEdition.images.map((img, i) => (
                  <CarouselItem
                    key={i}
                    className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group border border-white/10">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={i < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-6 lg:-left-10 text-white border-white bg-transparent hover:bg-white/20 hover:text-white" />
              <CarouselNext className="hidden md:flex -right-6 lg:-right-10 text-white border-white bg-transparent hover:bg-white/20 hover:text-white" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
