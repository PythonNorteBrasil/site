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
    <footer className="bg-gradient-to-br from-foreground to-foreground/90 text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-secondary">Python Norte</h3>
            <p className="text-background/80 mb-4 text-pretty">
              A maior conferência da comunidade Python do Norte do Brasil. Organização voluntária e sem fins lucrativos.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/pythonnorte"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/pythonnorte"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Links Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-background/80 hover:text-background transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contato</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="mailto:contato@pythonnorte.org" className="hover:text-background transition-colors">
                  contato@pythonnorte.org
                </a>
              </li>
              <li>
                <a href="https://t.me/pythonnorte" className="hover:text-background transition-colors">
                  @pythonnorte
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 text-center text-background/70 text-sm">
          <p>
            © {currentYear} Python Norte. Todos os direitos reservados. Organização voluntária e sem fins lucrativos.
          </p>
        </div>
      </div>
    </footer>
  )
}
