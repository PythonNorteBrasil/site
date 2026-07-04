"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/design-system/components/Button";
import { colors } from "@/design-system/tokens/colors";

// Section ids that map to nav links (order matters for IntersectionObserver)
const SECTION_IDS = ["sobre", "keynotes", "patrocinadores", "localizacao"];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // ── Active section via IntersectionObserver (home page only) ─────────────────
  useEffect(() => {
    if (!isHomePage) return;

    const observers: IntersectionObserver[] = [];

    // Track which sections are currently intersecting and pick the topmost one
    const visible = new Set<string>();

    const pick = () => {
      // Prefer the section highest on the page among visible ones
      const ordered = SECTION_IDS.filter((id) => visible.has(id));
      setActiveSection(ordered[0] ?? "");
    };

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
          pick();
        },
        // Fire when at least 15% of the section is visible
        { rootMargin: "-10% 0px -60% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [isHomePage]);

  // ── Smooth scroll with header offset ─────────────────────────────────────────
  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return; // let regular links navigate normally
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const headerH = 56; // h-14
      const offset = headerH + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    [],
  );

  const navLinks = [
    /* { href: "#sobre", label: "Sobre" }, */
    /*   { href: "#keynotes", label: "Keynotes" }, */
    { href: "#localizacao", label: "Localização" },
    { href: "/programacao?agenda=1", label: "Minha Agenda" },
    { href: "#patrocinadores", label: "Patrocinadores" },
    { href: "/codigo-de-conduta", label: "Código de Conduta" },
  ];

  return (
    <header
      className="fixed top-0 z-50 w-full border-b"
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

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-5 xl:gap-6">
              {navLinks.map((link) => {
                const href =
                  !isHomePage && link.href.startsWith("#")
                    ? `/${link.href}`
                    : link.href;

                const sectionId = link.href.startsWith("#")
                  ? link.href.slice(1)
                  : null;
                // Route links: active when pathname matches (strip query)
                const routePath = !link.href.startsWith("#")
                  ? link.href.split("?")[0]
                  : null;
                const isActive =
                  (sectionId !== null &&
                    isHomePage &&
                    activeSection === sectionId) ||
                  (routePath !== null && pathname === routePath);

                return (
                  <a
                    key={link.href}
                    href={href}
                    onClick={(e) =>
                      isHomePage ? scrollToSection(e, link.href) : undefined
                    }
                    className={`text-sm font-medium transition-all duration-200 relative ${
                      isActive ? "opacity-100" : "hover:opacity-70 opacity-100"
                    }`}
                    style={{
                      color: isActive
                        ? colors.brand.orange[500]
                        : colors.semantic.navigation,
                    }}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    <span
                      className={`absolute -bottom-[19px] left-0 w-full h-[2px] rounded-full transition-all duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ backgroundColor: colors.brand.orange[500] }}
                    />
                  </a>
                );
              })}
            </nav>

            <ButtonLink href="/programacao" variant="primary" size="sm">
              Ver Programação
            </ButtonLink>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
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
              {navLinks.map((link) => {
                const href =
                  !isHomePage && link.href.startsWith("#")
                    ? `/${link.href}`
                    : link.href;
                const sectionId = link.href.startsWith("#")
                  ? link.href.slice(1)
                  : null;
                const routePath = !link.href.startsWith("#")
                  ? link.href.split("?")[0]
                  : null;
                const isActive =
                  (sectionId !== null &&
                    isHomePage &&
                    activeSection === sectionId) ||
                  (routePath !== null && pathname === routePath);

                return (
                  <a
                    key={link.href}
                    href={href}
                    onClick={(e) => {
                      if (isHomePage) scrollToSection(e, link.href);
                      else setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium py-1 transition-all duration-200"
                    style={{
                      color: isActive
                        ? colors.brand.orange[500]
                        : colors.semantic.navigation,
                      fontWeight: isActive ? 700 : undefined,
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <ButtonLink
              href="/programacao"
              variant="primary"
              size="sm"
              fullWidth
              className="mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ver Programação
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
