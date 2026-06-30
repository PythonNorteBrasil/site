"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/sectionHeader";
import { ScheduleToolbar } from "@/components/programacao/ScheduleToolbar";
import { FiltersPanel } from "@/components/programacao/FiltersPanel";
import { SessionsList } from "@/components/programacao/SessionsList";
import { AgendaView } from "@/components/programacao/AgendaView";
import { SessionDetailModal } from "@/components/session-detail-modal";
import { SpeakerModal } from "@/components/speaker-modal";
import {
  useProgramacao,
  getLevelStyle,
  addToGoogleCalendar,
  DAYS,
} from "@/hooks/useProgramacao";
import type { Session, Speaker } from "@/hooks/useProgramacao";

// Loading skeleton
function SessionsSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="relative flex flex-col p-5 rounded-2xl bg-white border border-[#004B23]/5 shadow-sm gap-4"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="h-4 w-28 rounded-full bg-[#004B23]/10 animate-pulse" />
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-5 w-16 rounded-full bg-[#004B23]/10 animate-pulse" />
            <div className="h-5 w-5 rounded-full bg-[#004B23]/10 animate-pulse" />
            <div
              className="h-5 rounded-full bg-[#004B23]/10 animate-pulse"
              style={{ width: `${180 + (i % 3) * 60}px` }}
            />
          </div>
          <div className="h-3.5 w-32 rounded-full bg-[#004B23]/10 animate-pulse" />
          <div className="h-4 w-48 rounded-md bg-[#004B23]/10 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 rounded-full bg-[#004B23]/10 animate-pulse" />
            <div className="h-3.5 w-20 rounded-full bg-[#004B23]/10 animate-pulse" />
            <div className="h-3.5 w-24 rounded-full bg-[#004B23]/10 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgramacaoInner() {
  const {
    isMounted,
    activeDay,
    setActiveDay,
    activeFilters,
    showFilters,
    setShowFilters,
    showAgenda,
    toggleAgenda,
    allSessions,
    speakersMap,
    filterOptions,
    filteredSessions,
    savedSessions,
    agendaSessions,
    filteredAgendaSessions,
    agendaByDay,
    totalActiveFilters,
    hasActiveFilters,
    toggleFilter,
    clearAllFilters,
    toggleSaveSession,
  } = useProgramacao();

  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Prevent background scroll when any overlay is open
  const anyOverlayOpen = !!selectedSession || !!selectedSpeaker || showFilters;
  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [anyOverlayOpen]);

  const keynoteCount = allSessions.filter((s) => s.type === "Keynote").length;
  const talkCount = allSessions.filter((s) => s.type === "Palestra").length;
  const tutorialCount = allSessions.filter((s) => s.type === "Tutorial").length;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-20 pb-16 bg-[#FAF7F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <SectionHeader
              title="Programação"
              description="Explore todas as atividades dos dois dias de evento e monte sua agenda personalizada"
            />

            {/*   <ScheduleStats
              keynote={keynoteCount}
              talks={talkCount}
              tutorials={tutorialCount}
            /> */}

            <ScheduleToolbar
              days={DAYS}
              activeDay={activeDay}
              onDayChange={setActiveDay}
              showAgenda={showAgenda}
              onToggleAgenda={toggleAgenda}
              savedCount={savedSessions.size}
              hasActiveFilters={hasActiveFilters}
              totalActiveFilters={totalActiveFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
              agendaCount={agendaSessions.length}
            />

            {/* Filters panel — both views */}
            {showFilters && (
              <FiltersPanel
                filterOptions={filterOptions}
                activeFilters={activeFilters}
                hasActiveFilters={hasActiveFilters}
                totalActiveFilters={totalActiveFilters}
                filteredCount={
                  showAgenda
                    ? filteredAgendaSessions.length
                    : filteredSessions.length
                }
                onToggle={toggleFilter}
                onClear={clearAllFilters}
                onClose={() => setShowFilters(false)}
              />
            )}

            {/* Content */}
            {!isMounted ? (
              <SessionsSkeleton />
            ) : showAgenda ? (
              <AgendaView
                agendaByDay={agendaByDay}
                agendaCount={agendaSessions.length}
                filteredCount={filteredAgendaSessions.length}
                hasActiveFilters={hasActiveFilters}
                savedSessions={savedSessions}
                speakersMap={speakersMap}
                getLevelStyle={getLevelStyle}
                onOpenSession={setSelectedSession}
                onToggleSave={toggleSaveSession}
                onAddToCalendar={addToGoogleCalendar}
                onOpenSpeaker={setSelectedSpeaker}
                onExitAgenda={toggleAgenda}
                onClearFilters={clearAllFilters}
              />
            ) : (
              <SessionsList
                sessions={filteredSessions}
                savedSessions={savedSessions}
                speakersMap={speakersMap}
                getLevelStyle={getLevelStyle}
                onOpenSession={setSelectedSession}
                onToggleSave={toggleSaveSession}
                onAddToCalendar={addToGoogleCalendar}
                onOpenSpeaker={setSelectedSpeaker}
                onClearFilters={clearAllFilters}
              />
            )}
          </div>
        </div>
      </main>

      <Footer />

      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          isSaved={savedSessions.has(selectedSession.id)}
          onToggleSave={() => toggleSaveSession(selectedSession.id)}
          onAddToCalendar={() => addToGoogleCalendar(selectedSession)}
          speakers={(selectedSession.speakers ?? []).map((name) => {
            const sp = speakersMap.get(name);
            return {
              name,
              imagem: sp?.Imagem ?? null,
              onClick: sp ? () => setSelectedSpeaker(sp) : undefined,
            };
          })}
        />
      )}

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
}

export default function ProgramacaoPage() {
  return (
    <Suspense>
      <ProgramacaoInner />
    </Suspense>
  );
}
