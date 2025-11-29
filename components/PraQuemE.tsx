import { Calendar, MapPinned, Heart } from "lucide-react";

export function PraQuemE() {
  const highlights = [
    {
      icon: MapPinned,
      label: "Itinerante",
      description:
        "A cada nova edição, exploramos uma cidade diferente na região Norte",
    },
    {
      icon: Calendar,
      label: "3 dias",
      description:
        "Tutoriais, palestras, workshops e um ambiente de aprendizado colaborativo",
    },
    {
      icon: Heart,
      label: "100% voluntária",
      description: "Feito pela comunidade e para a comunidade 💙🏳️‍🌈",
    },
  ];

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="relative overflow-hidden py-40 md:py-40 bg-gradient-to-br from-muted/20 via-muted/40 to-muted/20"
    >
      {/* background decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/gallery/2024/54033003810_5a4fa2cd61_b.jpg')] optimize-speed bg-cover bg-center opacity-70"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h2
            id="sobre-heading"
            className="text-balance text-center text-4xl md:text-6xl pb-40 font-bold text-primary tracking-tight"
          >
            Quem pode participar da Python Norte?
          </h2>

          <div className="mt-8 md:mt-10 rounded-3xl border border-border/70 bg-background/50 p-6 md:p-10 shadow-xl backdrop-blur-md transition-shadow motion-safe:hover:shadow-7xl">
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-pretty text-lg md:text-xl leading-relaxed text-foreground/90">
                Qualquer pessoa pode participar da Python Norte! Seja você um iniciante curioso, um
                desenvolvedor experiente, um estudante, um profissional de tecnologia ou alguém
                simplesmente interessado em aprender mais sobre a linguagem Python, open source e tecnologia, este
                é o lugar para você. Nossa conferência é inclusiva e acolhedora, promovendo a
                diversidade e a colaboração entre todos os participantes. <br />
                O único requisito é ter paixão por aprender e compartilhar conhecimento em um ambiente
                amigável e respeitoso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
