"use client";

export function Sponsors() {
  const tiers = [
    {
      name: "Diamante",
      color: "text-green-deep",
      borderColor: "border-green-deep/20",
      logos: [{ name: "UNAMA", placeholder: "UNAMA" }],
    },
    {
      name: "Ouro",
      color: "text-orange",
      borderColor: "border-orange/20",
      logos: [
        { name: "Sponsor 1", placeholder: "Sua marca aqui" },
        { name: "Sponsor 2", placeholder: "Sua marca aqui" },
      ],
    },
    {
      name: "Prata",
      color: "text-gray-500",
      borderColor: "border-gray-200",
      logos: [
        { name: "Sponsor 3", placeholder: "Sua marca aqui" },
        { name: "Sponsor 4", placeholder: "Sua marca aqui" },
        { name: "Sponsor 5", placeholder: "Sua marca aqui" },
      ],
    },
  ];

  const supporters = [
    "Python Brasil",
    "PSF",
    "APyB",
    "PyLadies Norte",
    "GruPy Pará",
    "Python Amazonas",
  ];

  return (
    <section id="patrocinadores" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-2 md:space-y-3">
            <h2
              className="text-2xl md:text-4xl font-bold text-green-deep"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Patrocinadores
            </h2>
            <div className="w-14 md:w-16 h-1 bg-orange mx-auto rounded-full" />
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              A Python Norte só existe graças ao apoio de patrocinadores,
              apoiadores e comunidades parceiras.
            </p>
          </div>

          {/* Tiers */}
          {tiers.map((tier, i) => (
            <div key={i} className="space-y-4">
              <h3
                className={`text-center text-lg font-bold ${tier.color}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {tier.name}
              </h3>
              <div className={`flex flex-wrap justify-center gap-6`}>
                {tier.logos.map((logo, j) => (
                  <div
                    key={j}
                    className={`flex items-center justify-center border-2 ${tier.borderColor} rounded-2xl px-12 py-8 bg-cream-card min-w-[200px]`}
                  >
                    <span className="text-sm text-gray-400 font-medium">
                      {logo.placeholder}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="bg-green-deep rounded-3xl p-8 md:p-12 text-center text-white space-y-4">
            <h3
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Quer patrocinar a Python Norte 2026?
            </h3>
            <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto">
              Entre em contato com nossa equipe para conhecer os planos de
              patrocínio e ter sua marca associada ao maior evento Python do
              Norte.
            </p>
            <a
              href="mailto:contato@pythonnorte.org?subject=Patrocínio Python Norte 2026"
              className="inline-block bg-orange hover:bg-orange-hover text-white font-bold text-sm px-8 py-3 rounded-full shadow-md transition-all"
            >
              Solicitar proposta comercial
            </a>
          </div>

          {/* Supporters */}
          <div className="space-y-6">
            <h3
              className="text-center text-lg font-bold text-green-deep"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Comunidades e Apoiadores
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {supporters.map((name, i) => (
                <span
                  key={i}
                  className="bg-cream border border-yellow/20 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-full"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
