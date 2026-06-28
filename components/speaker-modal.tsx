"use client";

import { useState } from "react";
import { X, User, Linkedin, Instagram } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SpeakerData {
  ID: string;
  Nome: string;
  Biografia: string;
  "E-mail": string;
  Imagem: string | null;
  "IDs de proposta": string[];
  "Títulos das propostas": string[];
  Instagram?: string | null;
  LinkedIn?: string | null;
}

// ─── Avatar with lazy-load skeleton ──────────────────────────────────────────

function SpeakerAvatar({
  src,
  alt,
  className,
  iconSize = "w-8 h-8",
}: {
  src: string | null;
  alt: string;
  className: string;
  iconSize?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`${className} bg-[#004B23]/10 flex items-center justify-center flex-shrink-0`}>
        <User className={`${iconSize} text-[#004B23]`} />
      </div>
    );
  }

  return (
    <div className={`${className} relative flex-shrink-0 overflow-hidden`}>
      {!loaded && <div className="absolute inset-0 bg-[#004B23]/10 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface Props {
  speaker: SpeakerData;
  onClose: () => void;
}

export function SpeakerModal({ speaker, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[55] p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#004B23]/10 p-4 sm:p-6 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <SpeakerAvatar
                src={speaker.Imagem}
                alt={speaker.Nome}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
                iconSize="w-8 h-8 sm:w-10 sm:h-10"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-[#004B23] mb-1 break-words">
                  {speaker.Nome}
                </h2>
                {speaker["Títulos das propostas"]?.length > 0 && (
                  <p className="text-xs sm:text-sm text-[#4A5D4E]">
                    {speaker["Títulos das propostas"].length}{" "}
                    {speaker["Títulos das propostas"].length === 1 ? "palestra" : "palestras"}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              <X className="w-5 h-5 text-[#4A5D4E]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {speaker.Biografia && (
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">Biografia</h3>
              <p className="text-xs sm:text-sm text-[#4A5D4E] leading-relaxed whitespace-pre-wrap">
                {speaker.Biografia}
              </p>
            </div>
          )}

          {speaker["Títulos das propostas"]?.length > 0 && (
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#004B23] mb-2">Palestras</h3>
              <div className="space-y-2">
                {speaker["Títulos das propostas"].map((title, idx) => (
                  <div
                    key={idx}
                    className="text-xs sm:text-sm bg-[#F4FAF5] text-[#004B23] px-3 py-2 rounded-lg border border-[#004B23]/10"
                  >
                    {title}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(speaker.LinkedIn || speaker.Instagram) && (
            <div className="flex flex-wrap gap-2">
              {speaker.LinkedIn && (
                <a
                  href={speaker.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#0A66C2] text-white hover:bg-[#0958a8] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
              {speaker.Instagram && (
                <a
                  href={speaker.Instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#E1306C] text-white hover:bg-[#c42860] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
              )}
            </div>
          )}

          {/* Close */}
          <div className="pt-4 border-t border-[#004B23]/10 sticky bottom-0 bg-white pb-safe">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
