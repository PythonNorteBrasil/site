"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#sobre", label: "O que é a Python Norte?" },
    { href: "#impacto", label: "Impacto e transformação" },
    { href: "#comunidades", label: "Comunidades Apoiadoras" },
    { href: "#apoiar", label: "Apoie a Python Norte!" },
    { href: "#edicoes", label: "Nossa história" },
    { href: "#galeria", label: "Galeria de Momentos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/40 transition-all duration-200 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-2"
          : "bg-background/85 backdrop-blur-sm py-3"
      }`}
    >
      {/* imagem de fundo com opacidade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/abstract-2.24517530.svg')] bg-repeat opacity-25"
      />

      {/* faixa colorida superior */}
      <div
        aria-hidden="true"
        className="
          absolute top-0 left-0 right-0 h-[4px]
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
        <div className="flex items-center justify-between gap-4">
          {/* Logo menor */}
          <Link href="/" className="flex items-center gap-2">
            <img
              className="h-8 w-8 md:h-9 md:w-9"
              src="/favico.png"
              alt="Python Norte"
            />
            <span className="hidden sm:inline text-xl md:text-lg  font-bold text-secondary tracking-tight">
              Python Norte
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-medium hover:text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 mt-3" variant="norte"
            >
              <a href="#contato">Quero ser apoiador</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-background/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Alternar menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pt-3 pb-2 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-10 py-6 mt-3" variant="norte">
              <a href="#contato" onClick={() => setIsMobileMenuOpen(false)}>
                Quero ser apoiador
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
