"use client";

import Image from "next/image";
import { ArrowRight, Mail, UsersRound, Gem, Trophy, Award } from "lucide-react";

type SponsorLogo = {
  name: string;
  src?: string;
  placeholder?: string;
  href?: string;
};

type SponsorTier = {
  name: string;
  logos: SponsorLogo[];
};

type CommunityBadge = {
  id: number;
  name: string;
  href?: string;
};

export function Sponsors() {
  const tiers: SponsorTier[] = [
    {
      name: "Diamante",
      logos: [
        {
          name: "Fly.io",
          src: "/assets/sponsors/flyio.png",
          href: "https://fly.io",
        },
      ],
    },
    {
      name: "Ouro",
      logos: [
        {
          name: "Inteceleri",
          src: "/assets/sponsors/inteceleri.png",
          href: "https://inteceleri.com.br",
        },
        {
          name: "NIC.br",
          src: "/assets/sponsors/nicbr.svg",
          href: "https://nic.br",
        },
      ],
    },
    {
      name: "Prata",
      logos: [
        {
          name: "Easygestor",
          src: "/assets/sponsors/easygestor.png",
          href: "https://easygestor.com",
        },
      ],
    },
  ];

  const pyeguaBadges: string[] = [
    // Placeholder data for PyEgua badges
  ];

  const communityBadges: CommunityBadge[] = [
    // Placeholder data for community badges
  ];

  return (
    <section
      id="patrocinadores"
      className="bg-[#f4efdd] py-20 md:py-12 scroll-mt-0"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl space-y-14">
          <div className="space-y-2 text-center md:space-y-3">
            <h2
              className="text-3xl font-extrabold text-green-deep md:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Patrocinadores
            </h2>
            <div className="w-14 md:w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
            <p className="mx-auto max-w-xl text-sm text-green-deep/70 md:text-base">
              Empresas e comunidades que tornam a Python Norte 2026 possível
            </p>
          </div>

          <div className="space-y-12">
            {tiers.map((tier) => {
              if (tier.logos.length === 0) return null;

              // Configurações específicas de estilo para cada nível de patrocínio
              let tierHeadingClass = "";
              let gridClass = "";
              let cardClass = "";
              let logoHeightClass = "";
              let logoContainerMinHeightClass = "";
              let badgeClass = "";
              let insigniaBgClass = "";
              let insigniaIconClass = "";
              let InsigniaIcon = Award;
              let imageWidth = 140;
              let imageHeight = 50;

              if (tier.name === "Diamante") {
                tierHeadingClass = "text-[#A33D06] dark:text-[#E37700]"; // Gold/Orange theme
                gridClass = "flex flex-wrap justify-center gap-8";
                cardClass =
                  "relative overflow-hidden w-full max-w-[380px] rounded-3xl border-2 border-[#FFB000] bg-white p-8 shadow-[0_16px_36px_rgba(255,176,0,0.18)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(255,176,0,0.28)] transition-all duration-300";
                logoHeightClass = "h-20 md:h-24";
                logoContainerMinHeightClass = "min-h-[110px]";
                badgeClass = "bg-[#FEF5E9] text-[#E37700] border-[#FDE7C2]";
                insigniaBgClass =
                  "bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-[#FFB000] shadow-[0_0_12px_rgba(255,176,0,0.6)]";
                insigniaIconClass = "text-[#E37700] animate-pulse";
                InsigniaIcon = Gem;
                imageWidth = 300;
                imageHeight = 110;
              } else if (tier.name === "Ouro") {
                tierHeadingClass = "text-[#C49A28]"; // Gold theme
                gridClass = "flex flex-wrap justify-center gap-6";
                cardClass =
                  "relative overflow-hidden w-full max-w-[300px] rounded-2xl border border-[#FDE7C2] bg-white p-6 shadow-[0_10px_24px_rgba(242,195,79,0.1)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(242,195,79,0.18)] transition-all duration-300";
                logoHeightClass = "h-14 md:h-16";
                logoContainerMinHeightClass = "min-h-[85px]";
                badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
                insigniaBgClass =
                  "bg-gradient-to-br from-amber-50 to-[#fffbeb] border border-[#FDE7C2] shadow-[0_0_10px_rgba(196,154,40,0.5)]";
                insigniaIconClass = "text-amber-600";
                InsigniaIcon = Trophy;
                imageWidth = 220;
                imageHeight = 80;
              } else {
                // Prata e outros
                tierHeadingClass = "text-neutral-500"; // Silver/Neutral theme
                gridClass = "flex flex-wrap justify-center gap-5";
                cardClass =
                  "relative overflow-hidden w-full max-w-[220px] rounded-xl border border-neutral-200 bg-white p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300";
                logoHeightClass = "h-10 md:h-11";
                logoContainerMinHeightClass = "min-h-[65px]";
                badgeClass =
                  "bg-neutral-50 text-neutral-600 border-neutral-200";
                insigniaBgClass =
                  "bg-neutral-50 border border-neutral-200 shadow-[0_0_8px_rgba(115,115,115,0.4)]";
                insigniaIconClass = "text-neutral-500";
                InsigniaIcon = Award;
                imageWidth = 160;
                imageHeight = 60;
              }

              return (
                <div key={tier.name} className="space-y-6">
                  {/* Divisor/Título do Nível */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-neutral-300" />
                    <span
                      className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${tierHeadingClass}`}
                    >
                      Patrocínio {tier.name}
                    </span>
                    <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-neutral-300" />
                  </div>

                  {/* Grid de Logos */}
                  <div className={gridClass}>
                    {tier.logos.map((logo) => (
                      <a
                        key={logo.name}
                        href={logo.href}
                        target={logo.href ? "_blank" : undefined}
                        rel={logo.href ? "noopener noreferrer" : undefined}
                        className={`flex flex-col items-center justify-center ${cardClass} ${
                          logo.href ? "cursor-pointer" : "pointer-events-none"
                        }`}
                      >
                        {/* Insígnia do Patrocinador */}
                        <div className="absolute top-3 right-3 flex items-center justify-center z-10">
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-full ${insigniaBgClass}`}
                          >
                            <InsigniaIcon
                              className={`h-4 w-4 ${insigniaIconClass}`}
                            />
                          </div>
                        </div>

                        <div
                          className={`flex flex-1 items-center justify-center w-full ${logoContainerMinHeightClass} mb-4`}
                        >
                          {logo.src ? (
                            <Image
                              src={logo.src}
                              alt={logo.name}
                              width={imageWidth}
                              height={imageHeight}
                              className={`${logoHeightClass} w-auto object-contain transition-transform duration-300 hover:scale-105`}
                            />
                          ) : (
                            <span className="text-sm md:text-base font-extrabold text-neutral-800">
                              {logo.name}
                            </span>
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-neutral-800 leading-tight">
                            {logo.name}
                          </p>
                          <span
                            className={`mt-1.5 inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}
                          >
                            {tier.name}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {pyeguaBadges.length > 0 && (
            <div className="mx-auto w-full max-w-[340px] rounded-xl border border-[#b6cc92] bg-[#d8e5bd] px-6 py-4 text-center">
              <p className="text-sm font-black text-green-deep">PyEgua</p>
              {pyeguaBadges.map((badge, idx) => (
                <p
                  key={`${badge}-${idx}`}
                  className="text-[10px] leading-tight text-green-deep/80"
                >
                  {badge}
                </p>
              ))}
            </div>
          )}

          {communityBadges.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-green-deep">
                <UsersRound className="h-3.5 w-3.5" />
                <h3
                  className="text-base font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Comunidades Apoiadoras
                </h3>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {communityBadges.map((badge) => (
                  <a
                    key={badge.id}
                    href={badge.href ?? "#"}
                    target={badge.href ? "_blank" : undefined}
                    rel={badge.href ? "noopener noreferrer" : undefined}
                    className="w-[148px] rounded-lg border border-[#d5dbcc] bg-[#f6f8f0] px-3 py-2.5 text-center"
                  >
                    <div className="mx-auto h-4 w-10 rounded bg-[#dbe2d4]" />
                    <p className="mt-1.5 text-[10px] font-semibold leading-tight text-green-deep/80">
                      {badge.name}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mx-auto max-w-4xl rounded-2xl border border-[#e3b11a] bg-[#ffc61e] p-7 text-center shadow-[0_20px_38px_rgba(0,0,0,0.24)] md:p-10">
            <h3
              className="text-3xl font-extrabold text-green-deep md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quer patrocinar a Python Norte 2026?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm font-medium text-green-deep/85 md:text-lg">
              Ao patrocinar o maior evento Python da regiao norte, sua empresa
              ganha visibilidade para mais de 200 participantes -
              desenvolvedores, estudantes e profissionais de tecnologia da
              Amazonia.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {[
                "Marcar presenca na comunidade",
                "Mostrar os principios da sua marca",
                "Apoiar a diversidade na tecnologia",
              ].map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-lg bg-[#fff1b4] px-3 py-1.5 text-[10px] font-bold text-green-deep md:text-xs"
                >
                  ✓ {benefit}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://2026.pythonnorte.org/patrocine"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#22a620] px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_15px_rgba(16,120,16,0.35)] transition-colors hover:bg-[#1b8e1b]"
              >
                Patrocine <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="mailto:norte@python.org.br"
                className="inline-flex items-center gap-2 rounded-lg border border-green-deep/40 px-6 py-3 text-sm font-bold text-green-deep transition-colors hover:bg-white/35"
              >
                <Mail className="h-4 w-4" /> norte@python.org.br
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
