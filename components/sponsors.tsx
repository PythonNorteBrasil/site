"use client";

import Image from "next/image";
import {
  ArrowRight,
  Mail,
  UsersRound
} from "lucide-react";

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
        }
      ],
    },
  ];

  const smallTierStyles: Record<string, string> = {
    Ouro: "bg-[#f9de85] border-[#f2c34f]",
    Prata: "bg-[#f4f4f4] border-[#d6d6d6]",
    Bronze: "bg-[#fff8ee] border-[#f19a6e]",
  };

  const smallTierItems = tiers
    .filter((tier) => tier.name !== "Diamante")
    .flatMap((tier) =>
      tier.logos.map((logo) => ({
        tierName: tier.name,
        logo,
      }))
    );

  const diamondTier = tiers.find((tier) => tier.name === "Diamante");

  const pyeguaBadges: string[] = [
    // Placeholder data for PyEgua badges
  ];

  const communityBadges: CommunityBadge[] = [
    // Placeholder data for community badges
  ];

  return (
    <section id="patrocinadores" className="bg-[#f4efdd] py-20 md:py-28">
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
              Empresas e comunidades que tornam a Python Norte 2026 possivel
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-4 md:gap-5">
              {diamondTier?.logos.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.href}
                  target={logo.href ? "_blank" : undefined}
                  rel={logo.href ? "noopener noreferrer" : undefined}
                  className="w-full max-w-[300px] rounded-2xl border-2 border-[#ecb100] bg-[#ffc61e] p-4 shadow-[0_15px_28px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5"
                >
                  <div className="mb-3 flex items-center justify-center rounded-xl bg-[#ffd657] py-2">
                    {logo.src ? (
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={150}
                        height={42}
                        className="h-10 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-green-deep/70">
                        {logo.placeholder}
                      </span>
                    )}
                  </div>
                  <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.13em] text-green-deep">
                    Patrocinador {diamondTier.name}
                  </p>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {smallTierItems.map((item, idx) => (
                <a
                  key={`${item.tierName}-${item.logo.name}-${idx}`}
                  href={item.logo.href}
                  target={item.logo.href ? "_blank" : undefined}
                  rel={item.logo.href ? "noopener noreferrer" : undefined}
                  className={`flex min-w-[160px] items-center gap-2 rounded-xl border px-3 py-2 ${smallTierStyles[item.tierName] ?? "bg-[#f4f4f4] border-[#d6d6d6]"} ${item.logo.href ? "cursor-pointer transition-transform hover:-translate-y-0.5" : "pointer-events-none"}`}
                >
                  <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md bg-black/10 text-[10px] font-bold text-black/65">
                    {item.logo.src ? (
                      <Image
                        src={item.logo.src}
                        alt={item.logo.name}
                        width={28}
                        height={28}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      item.logo.name.slice(0, 1)
                    )}
                  </div>
                  <div className="leading-none">
                    <p className="text-[11px] font-bold text-black/70">
                      {item.logo.name}
                    </p>
                    <p className="mt-1 text-[9px] font-extrabold tracking-wide text-black/45">
                      {item.tierName.toUpperCase()}
                    </p>
                  </div>
                </a>
              ))}
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
          </div>

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
                href="#patrocinio"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#22a620] px-6 py-3 text-sm font-extrabold text-white shadow-[0_8px_15px_rgba(16,120,16,0.35)] transition-colors hover:bg-[#1b8e1b]"
              >
                Ver Plano de Patrocinio <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="mailto:patrocinio@pythonnorte.org"
                className="inline-flex items-center gap-2 rounded-lg border border-green-deep/40 px-6 py-3 text-sm font-bold text-green-deep transition-colors hover:bg-white/35"
              >
                <Mail className="h-4 w-4" /> patrocinio@pythonnorte.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
