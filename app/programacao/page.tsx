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

// Widths to vary the title bar per card
const TITLE_WIDTHS = ["w-64", "w-80", "w-52", "w-72", "w-56", "w-60", "w-48"];

function SessionCardSkeleton({ index }: { index: number }) {
  const titleWidth = TITLE_WIDTHS[index % TITLE_WIDTHS.length];
  return (
    <div className="flex flex-col p-5 rounded-2xl bg-white border-l-[5px] border-[#004B23]/10 border border-[#004B23]/5 shadow-sm gap-3">
      {/* Row 1: time + action buttons */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-[#004B23]/10 animate-pulse" />
          <div className="h-4 w-24 rounded-full bg-[#004B23]/10 animate-pulse" />
        </div>
        <div className="flex items-center gap-1">
          <div className="h-7 w-7 rounded-lg bg-[#004B23]/10 animate-pulse" />
          <div className="h-7 w-24 rounded-lg bg-[#004B23]/10 animate-pulse" />
        </div>
      </div>
      {/* Row 2: type badge + level badge + title */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-5 w-16 rounded-full bg-[#004B23]/10 animate-pulse" />
        <div className="h-5 w-20 rounded-full bg-[#004B23]/10 animate-pulse" />
        <div
          className={`h-5 ${titleWidth} rounded-full bg-[#004B23]/10 animate-pulse`}
        />
      </div>
      {/* Row 3: location */}
      <div className="flex items-center gap-1.5">
        <div className="h-3.5 w-3.5 rounded-full bg-[#004B23]/10 animate-pulse" />
        <div className="h-3.5 w-40 rounded-full bg-[#004B23]/10 animate-pulse" />
      </div>
      {/* Row 4: track (only on even cards) */}
      {index % 2 === 0 && (
        <div className="h-5 w-48 rounded-md bg-[#004B23]/10 animate-pulse" />
      )}
      {/* Row 5: speakers */}
      <div className="flex items-center gap-1.5">
        <div className="h-3.5 w-3.5 rounded-full bg-[#004B23]/10 animate-pulse" />
        <div className="h-3.5 w-16 rounded-full bg-[#004B23]/10 animate-pulse" />
        <div className="h-3.5 w-28 rounded-full bg-[#004B23]/10 animate-pulse" />
      </div>
    </div>
  );
}

function SessionsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Toolbar skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Day switcher */}
        <div className="flex gap-2">
          <div className="h-10 w-36 rounded-full bg-[#004B23]/10 animate-pulse" />
          <div className="h-10 w-36 rounded-full bg-[#004B23]/10 animate-pulse" />
        </div>
        {/* Filter + agenda buttons */}
        <div className="flex gap-3 items-center">
          <div className="h-10 w-24 rounded-full bg-[#004B23]/10 animate-pulse" />
          <div className="h-10 w-10 rounded-full bg-[#004B23]/10 animate-pulse" />
        </div>
      </div>
      {/* Cards */}
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <SessionCardSkeleton key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function ProgramacaoInner() {
  const {
    isMounted,
    isLoading,
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
    return () => {
      document.body.style.overflow = "";
    };
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
              description="Explore as atividades e monte sua agenda"
            />

            {/*   <ScheduleStats
              keynote={keynoteCount}
              talks={talkCount}
              tutorials={tutorialCount}
            /> */}

            {/* Content — show full skeleton (toolbar included) while loading */}
            {isLoading ? (
              <SessionsSkeleton />
            ) : (
              <>
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

                {showAgenda ? (
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
                    activeDay={activeDay}
                  />
                )}
              </>
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
