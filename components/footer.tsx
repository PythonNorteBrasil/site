import { Instagram, Send } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#apoiar", label: "Apoiar" },
    { href: "#contato", label: "Contato" },
  ]

  return (
    <footer className="relative text-foreground bg-background pt-14 pb-8 mt-20 border-t border-border/30">
      {/* pattern de fundo mais sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/abstract-1.e4a9f9c0.svg')] bg-repeat opacity-15"
      />

      {/* Faixa superior */}
      <div
        aria-hidden="true"
        className="
          absolute top-0 left-0 right-0 h-[6px]
          bg-[linear-gradient(
            to_right,
            oklch(0.57_0.20_27)_0%,
            oklch(0.70_0.15_45)_25%,
            oklch(0.80_0.18_90)_50%,
            oklch(0.60_0.12_160)_75%,
            oklch(0.50_0.15_250)_100%
          )]
        "
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 mb-10 items-start">
          {/* LOGO + descrição + redes */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary">
              Python Norte
            </h3>
            <p className="text-sm md:text-base text-muted-foreground text-pretty mb-4 max-w-md">
              A conferência da comunidade Python no Norte do Brasil, organizada de forma
              voluntária e sem fins lucrativos.
            </p>

            <div className="flex gap-3">
              <a
                href="https://instagram.com/pythonnortebrasil"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>

              <a
                href="https://t.me/###"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Send className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* Navegação enxuta + contato */}
          <div className="flex flex-col gap-6 md:items-end md:text-right">
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Navegação
              </h4>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                Contato
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:contato@pythonnorte.org"
                    className="hover:text-primary transition-colors"
                  >
                    contato@pythonnorte.org
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/pythonnorte"
                    className="hover:text-primary transition-colors"
                  >
                    @pythonnorte
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rodapé final */}
        <div className="pt-4 border-t border-border/20 text-center text-xs md:text-sm text-muted-foreground">
          <p>
            © {currentYear} Python Norte — Organização voluntária, sem fins lucrativos.
          </p>
        </div>
      </div>
    </footer>
  )
}
