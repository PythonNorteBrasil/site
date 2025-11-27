import { Instagram, Send } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#impacto", label: "Impacto" },
    { href: "#comunidades", label: "Comunidades" },
    { href: "#apoiar", label: "Apoiar" },
    { href: "#edicoes", label: "Edições" },
    { href: "#contato", label: "Contato" },
  ]

  return (
    <footer className="relative text-foreground bg-background pt-16 pb-10 mt-20 border-t border-border/40">
      {/* imagem de fundo com opacidade, atrás de tudo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/abstract-1.e4a9f9c0.svg')] bg-repeat opacity-30"
      />

      {/* Faixa superior com cores da identidade */}
      <div
        aria-hidden="true"
        className="
          absolute top-0 left-0 right-0 h-[10px]
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
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* LOGO */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-primary drop-shadow-sm">
              Python Norte
            </h3>
            <p className="text-muted-foreground text-pretty mb-5">
              A maior conferência da comunidade Python no Norte do Brasil.
              Organização totalmente voluntária e sem fins lucrativos.
            </p>

            <div className="flex gap-4">
              <a
                href="https://instagram.com/pythonnorte"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>

              <a
                href="https://t.me/pythonnorte"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <Send className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>

          {/* LINKS RÁPIDOS */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-foreground">
              Links rápidos
            </h4>
            <ul className="space-y-2">
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

          {/* CONTATO */}
          <div>
            <h4 className="font-bold mb-4 text-lg text-foreground">Contato</h4>
            <ul className="space-y-2 text-muted-foreground">
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

        {/* Rodapé final */}
        <div className="pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Python Norte — Organização voluntária, sem fins
            lucrativos. Construído com 💙 pela comunidade.
          </p>
        </div>
      </div>
    </footer>
  )
}
