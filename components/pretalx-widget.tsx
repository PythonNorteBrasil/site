"use client";

/// <reference path="../types/pretalx.d.ts" />

import { useEffect, useState } from "react";

interface PretalxWidgetProps {
  eventUrl?: string;
  locale?: string;
  format?: "grid" | "list";
  primaryColor?: string;
  className?: string;
}

export function PretalxWidget({
  eventUrl = "https://talks.python.org.br/python-norte-2026/",
  locale = "pt-br",
  format = "grid",
  primaryColor = "#de7130",
  className = "",
}: PretalxWidgetProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Verificar se o script já foi carregado
    const existingScript = document.querySelector(
      'script[src*="pretalx"][src*="schedule.js"]',
    );

    const onScriptReady = () => {
      // Espera o custom element ser registrado pelo script do pretalx
      customElements.whenDefined("pretalx-schedule").then(() => {
        // Pequeno delay para o elemento renderizar o conteúdo
        setTimeout(() => setIsLoaded(true), 600);
      });
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `${eventUrl}widgets/schedule.js`;
      script.async = true;
      script.defer = true;
      script.onload = onScriptReady;
      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    } else {
      // Script já estava na página — verifica se o elemento já foi definido
      if (customElements.get("pretalx-schedule")) {
        setTimeout(() => setIsLoaded(true), 600);
      } else {
        onScriptReady();
      }
    }
  }, [eventUrl]);

  const widgetHtml = `
    <pretalx-schedule 
      event-url="${eventUrl}" 
      locale="${locale}" 
      format="${format}" 
      style="--pretalx-clr-primary: ${primaryColor}">
    </pretalx-schedule>
    <noscript>
      <div class="pretalx-widget">
        <div class="pretalx-widget-info-message p-4 md:p-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg">
          <p class="text-sm md:text-base text-gray-700 mb-4">
            JavaScript está desabilitado no seu navegador. Para acessar a programação sem JavaScript, 
            por favor <a target="_blank" href="${eventUrl}schedule/" class="text-[#FF6B00] hover:underline font-semibold">clique aqui</a>.
          </p>
        </div>
      </div>
    </noscript>
  `;

  return (
    <>
      {/* Loading skeleton — shown until the widget script defines the custom element */}
      {!isLoaded && (
        <div className="w-full py-6 px-2 space-y-4">
          {/* Pulse bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-5 w-5 rounded-full bg-[#004B23]/10 animate-pulse" />
            <div className="h-4 w-48 rounded-full bg-[#004B23]/10 animate-pulse" />
          </div>
          {/* Day tabs skeleton */}
          <div className="flex gap-2 mb-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-8 w-32 rounded-full bg-[#004B23]/10 animate-pulse" />
            ))}
          </div>
          {/* Grid skeleton rows */}
          {[1, 2, 3, 4].map((row) => (
            <div key={row} className="grid grid-cols-3 gap-3">
              <div className="h-6 w-16 rounded bg-[#004B23]/10 animate-pulse" />
              {[1, 2].map((col) => (
                <div
                  key={col}
                  className="h-20 rounded-xl bg-[#004B23]/10 animate-pulse"
                  style={{ animationDelay: `${(row + col) * 80}ms` }}
                />
              ))}
            </div>
          ))}
          <p className="text-center text-sm text-[#4A5D4E] pt-2 animate-pulse">
            Carregando programação…
          </p>
        </div>
      )}

      <div
        className={`w-full max-w-full overflow-x-auto ${className} ${!isLoaded ? "hidden" : ""}`}
        dangerouslySetInnerHTML={{ __html: widgetHtml }}
      />
      <style jsx global>{`
        /* Container principal do widget */
        pretalx-schedule {
          display: block;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        /* Wrapper do Pretalx */
        .pretalx-widget,
        .pretalx-schedule-wrapper {
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch; /* Smooth scrolling no iOS */
        }

        /* Tabelas e grids */
        pretalx-schedule table,
        pretalx-schedule .schedule-grid,
        pretalx-schedule .schedule-table {
          width: 100%;
          max-width: 100%;
          table-layout: auto;
        }

        /* Células da tabela */
        pretalx-schedule td,
        pretalx-schedule th {
          padding: 0.5rem;
          font-size: 0.875rem;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        /* Links e botões */
        pretalx-schedule a,
        pretalx-schedule button {
          touch-action: manipulation; /* Melhor resposta ao toque */
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        }

        /* Scrollbar customizada para melhor UX */
        .pretalx-widget::-webkit-scrollbar {
          height: 8px;
        }

        .pretalx-widget::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        .pretalx-widget::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .pretalx-widget::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Mobile - Telas pequenas */
        @media (max-width: 640px) {
          pretalx-schedule {
            font-size: 0.75rem;
          }

          pretalx-schedule td,
          pretalx-schedule th {
            padding: 0.375rem;
            font-size: 0.75rem;
          }

          pretalx-schedule h1,
          pretalx-schedule h2,
          pretalx-schedule h3 {
            font-size: 1rem;
          }

          /* Reduzir espaçamentos em mobile */
          pretalx-schedule .schedule-grid {
            gap: 0.5rem;
          }
        }

        /* Tablet */
        @media (min-width: 641px) and (max-width: 1024px) {
          pretalx-schedule {
            font-size: 0.875rem;
          }

          pretalx-schedule td,
          pretalx-schedule th {
            padding: 0.5rem;
          }
        }

        /* Desktop */
        @media (min-width: 1025px) {
          pretalx-schedule {
            font-size: 1rem;
          }

          pretalx-schedule td,
          pretalx-schedule th {
            padding: 0.75rem;
          }
        }

        /* Acessibilidade - Foco visível */
        pretalx-schedule a:focus,
        pretalx-schedule button:focus {
          outline: 2px solid ${primaryColor};
          outline-offset: 2px;
        }


        /* ===== MODAL FIXES FOR MOBILE ===== */

        /* Modal overlay do Pretalx */
        pretalx-schedule .modal-overlay,
        pretalx-schedule [class*="modal"],
        pretalx-schedule [class*="dialog"],
        pretalx-schedule [role="dialog"] {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          z-index: 9999 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(4px) !important;
          padding: 1rem !important;
        }

        /* Conteúdo do modal */
        pretalx-schedule .modal-content,
        pretalx-schedule [class*="modal"] > div,
        pretalx-schedule [class*="dialog"] > div,
        pretalx-schedule [role="dialog"] > div {
          position: relative !important;
          max-width: 90vw !important;
          max-height: 85vh !important;
          width: 100% !important;
          margin: auto !important;
          background: white !important;
          border-radius: 1rem !important;
          overflow-y: auto !important;
          box-shadow:
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        }

        /* Mobile específico para modais */
        @media (max-width: 640px) {
          pretalx-schedule .modal-overlay,
          pretalx-schedule [class*="modal"],
          pretalx-schedule [class*="dialog"],
          pretalx-schedule [role="dialog"] {
            align-items: flex-end !important;
            padding: 0 !important;
          }

          pretalx-schedule .modal-content,
          pretalx-schedule [class*="modal"] > div,
          pretalx-schedule [class*="dialog"] > div,
          pretalx-schedule [role="dialog"] > div {
            max-width: 100vw !important;
            max-height: 90vh !important;
            width: 100% !important;
            border-radius: 1.5rem 1.5rem 0 0 !important;
            margin: 0 !important;
          }
        }

        /* Tablet */
        @media (min-width: 641px) and (max-width: 1024px) {
          pretalx-schedule .modal-content,
          pretalx-schedule [class*="modal"] > div,
          pretalx-schedule [class*="dialog"] > div,
          pretalx-schedule [role="dialog"] > div {
            max-width: 80vw !important;
            max-height: 80vh !important;
          }
        }

        /* Desktop */
        @media (min-width: 1025px) {
          pretalx-schedule .modal-content,
          pretalx-schedule [class*="modal"] > div,
          pretalx-schedule [class*="dialog"] > div,
          pretalx-schedule [role="dialog"] > div {
            max-width: 60vw !important;
            max-height: 85vh !important;
          }
        }

        /* Botão de fechar do modal */
        pretalx-schedule .modal-close,
        pretalx-schedule [class*="close"],
        pretalx-schedule button[aria-label*="close"],
        pretalx-schedule button[aria-label*="Close"] {
          position: sticky !important;
          top: 0.5rem !important;
          right: 0.5rem !important;
          z-index: 10 !important;
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 50% !important;
          padding: 0.5rem !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
        }

        /* Conteúdo interno do modal com padding adequado */
        pretalx-schedule .modal-body,
        pretalx-schedule [class*="modal-body"],
        pretalx-schedule [class*="dialog-body"] {
          padding: 1rem !important;
        }

        @media (min-width: 641px) {
          pretalx-schedule .modal-body,
          pretalx-schedule [class*="modal-body"],
          pretalx-schedule [class*="dialog-body"] {
            padding: 1.5rem !important;
          }
        }

        /* Prevenir scroll do body quando modal está aberto */
        body:has(pretalx-schedule [role="dialog"]),
        body:has(pretalx-schedule [class*="modal"]) {
          overflow: hidden !important;
        }
      `}</style>
    </>
  );
}

// Made with Bob
