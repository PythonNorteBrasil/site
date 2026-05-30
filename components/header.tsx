"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/design-system/components/Button";
import { colors } from "@/design-system/tokens/colors";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#atividades", label: "Atividades" },
    { href: "#programacao", label: "Programação" },
    { href: "#patrocinadores", label: "Patrocinadores" },
    { href: "#localizacao", label: "Localização" },
  ];

  return (
    <header
      className="fixed top-[60px] z-50 w-full border-b"
      style={{
        backgroundColor: colors.background.header,
        borderColor: colors.border.light,
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img
              src="/logo_desktop.png"
              alt="Python Norte"
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: colors.semantic.navigation }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <ButtonLink
              href="https://www.even3.com.br/python-norte-2026-631670/"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              Garanta sua vaga
            </ButtonLink>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden p-2"
            style={{ color: colors.semantic.navigation }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="absolute left-0 top-full w-full border-b shadow-lg lg:hidden"
          style={{
            backgroundColor: colors.background.header,
            borderColor: colors.border.light,
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 xl:px-16 py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-1"
                  style={{ color: colors.semantic.navigation }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <ButtonLink
              href="https://www.even3.com.br/python-norte-2026-631670/"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
              fullWidth
              className="mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Garanta sua vaga
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
