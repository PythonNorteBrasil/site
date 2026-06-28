"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Calendar,
  Download,
  Trash2,
  Mail,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  ExternalLink,
  Share2,
  X,
  BookmarkCheck,
} from "lucide-react";
import Link from "next/link";
import sessionsData from "../programacao/python-norte-2026_sessions.json";
import { SessionDetailModal } from "@/components/session-detail-modal";

interface Session {
  id: string;
  time: string;
  title: string;
  type: string;
  location?: string;
  target?: string;
  registrationRequired?: boolean;
  track?: string;
  description?: string;
  day: number;
  dayName: string;
  date: string;
  speakers?: string[];
  duration?: number;
}

export default function MinhaAgendaPage() {
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // Process JSON data - same as programacao page
  const allSessions: Session[] = sessionsData
    .filter(
      (s: any) => s["Início (data)"] && s["Estado da proposta"] === "confirmed",
    )
    .map((s: any) => {
      const startDate = s["Início (data)"];
      const startTime = s["Início (hora)"]?.substring(0, 5) || "";
      const endTime = s["Término (hora)"]?.substring(0, 5) || "";

      // Determine day (1 = 03/07, 2 = 04/07)
      const day = startDate === "2026-07-03" ? 1 : 2;
      const dayName = day === 1 ? "Sexta-feira" : "Sábado";
      const date = day === 1 ? "03/07" : "04/07";

      return {
        id: s.ID,
        time: `${startTime} — ${endTime}`,
        title: s["Título da proposta"],
        type: s["Tipo de sessão"]["pt-br"],
        location: s.Sala?.["pt-br"] || undefined,
        target: s["Nível da atividade"] || "Todos",
        track: s.Trilha["pt-br"],
        description: s.Resumo,
        day,
        dayName,
        date,
        speakers: s["Nomes de palestrantes"],
        duration: s.Duração,
      };
    })
    .sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      return a.time.localeCompare(b.time);
    });

  // Load saved sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pythonNorteAgenda");
    if (saved) {
      setSavedSessions(new Set(JSON.parse(saved)));
    }
    setIsMounted(true);
  }, []);

  // Lock body scroll when detail modal is open
  useEffect(() => {
    document.body.style.overflow = selectedSession ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedSession]);

  // Persist to localStorage whenever savedSessions changes (only after mount)
  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem(
      "pythonNorteAgenda",
      JSON.stringify(Array.from(savedSessions)),
    );
  }, [savedSessions, isMounted]);

  const mySessions = allSessions.filter((s) => savedSessions.has(s.id));

  // Detect time conflicts (same day + same time slot, more than one session)
  const conflictTimes = new Set<string>();
  const timeCount: Record<string, number> = {};
  mySessions.forEach((s) => {
    const key = `${s.day}-${s.time}`;
    timeCount[key] = (timeCount[key] || 0) + 1;
  });
  Object.entries(timeCount).forEach(([key, count]) => {
    if (count > 1) conflictTimes.add(key);
  });

  const removeSession = (sessionId: string) => {
    const newSet = new Set(savedSessions);
    newSet.delete(sessionId);
    setSavedSessions(newSet);
  };

  const clearAllSessions = () => {
    if (confirm("Tem certeza que deseja limpar toda sua agenda?")) {
      setSavedSessions(new Set());
    }
  };

  // Generate iCal format
  const generateICalendar = () => {
    const icsEvents = mySessions
      .map((session) => {
        const [startTime, endTime] = session.time.split(" — ");
        const [startHour, startMin] = startTime.split(":").map(Number);
        const [endHour, endMin] = endTime.split(":").map(Number);

        // Convert date format from DD/MM to actual date
        const [day, month] = session.date.split("/").map(Number);
        const year = 2026;

        const startDate = new Date(year, month - 1, day, startHour, startMin);
        const endDate = new Date(year, month - 1, day, endHour, endMin);

        const formatDate = (date: Date) => {
          return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        };

        return `BEGIN:VEVENT
UID:${session.id}@pythonnorte2026
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${session.title}
DESCRIPTION:${session.description || session.title}
LOCATION:${session.location || "Python Norte 2026"}
STATUS:CONFIRMED
END:VEVENT`;
      })
      .join("\n");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Python Norte 2026//Minha Agenda//PT
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Python Norte 2026 - Minha Agenda
X-WR-TIMEZONE:America/Fortaleza
${icsEvents}
END:VCALENDAR`;

    return icsContent;
  };

  const downloadICalendar = () => {
    const icsContent = generateICalendar();
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "python-norte-2026-agenda.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  const addSingleToGoogleCalendar = (session: Session) => {
    // Parse date and time
    const [startTime, endTime] = session.time.split(" — ");
    const dateStr = session.day === 1 ? "2026-07-03" : "2026-07-04";

    // Format: YYYYMMDDTHHmmss
    const startDateTime = `${dateStr.replace(/-/g, "")}T${startTime.replace(":", "")}00`;
    const endDateTime = `${dateStr.replace(/-/g, "")}T${endTime.replace(":", "")}00`;

    // Build Google Calendar URL
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: session.title,
      dates: `${startDateTime}/${endDateTime}`,
      details: `${session.description || ""}\n\nTipo: ${session.type}\nTrilha: ${session.track || ""}\nPalestrantes: ${session.speakers?.join(", ") || ""}`,
      location: session.location || "Python Norte 2026 - Manaus, AM",
      ctz: "America/Manaus",
    });

    const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
    window.open(url, "_blank");
  };

  const addToGoogleCalendar = () => {
    if (mySessions.length === 0) {
      alert("Nenhuma sessão salva para adicionar ao Google Calendar");
      return;
    }

    // Create Google Calendar URLs for each session
    mySessions.forEach((session, index) => {
      // Open in new tab with slight delay to avoid popup blockers
      setTimeout(() => {
        addSingleToGoogleCalendar(session);
      }, index * 300); // 300ms delay between each tab
    });

    alert(
      `Abrindo ${mySessions.length} aba(s) do Google Calendar. Clique em "Salvar" em cada uma para adicionar à sua agenda.`,
    );
  };

  const sendAgendaByEmail = async () => {
    if (!email || !email.includes("@")) {
      alert("Por favor, insira um email válido");
      return;
    }

    // In a real implementation, this would call an API endpoint
    // For now, we'll simulate it
    const agendaText = mySessions
      .map(
        (s) =>
          `${s.dayName} (${s.date}) - ${s.time}\n${s.title}${s.location ? ` - ${s.location}` : ""}\n`,
      )
      .join("\n");

    // Simulate email sending
    console.log("Sending email to:", email);
    console.log("Content:", agendaText);

    setEmailSent(true);
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailSent(false);
      setEmail("");
    }, 2000);
  };

  const getSessionStyle = (type: Session["type"]) => {
    switch (type) {
      case "Keynote":
        return {
          bg: "bg-[#FFFBF0]",
          border: "border-l-[5px] border-[#FFB800]",
          badge: "bg-[#FFB800] text-[#1a1a1a]",
        };
      case "Palestra":
        return {
          bg: "bg-[#F4FAF5]",
          border: "border-l-[5px] border-[#004B23]",
          badge: "bg-[#004B23] text-white",
        };
      case "Tutorial":
        return {
          bg: "bg-[#FFF6F2]",
          border: "border-l-[5px] border-[#FF6B00]",
          badge: "bg-[#FF6B00] text-white",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-l-[5px] border-gray-300",
          badge: "bg-gray-500 text-white",
        };
    }
  };

  // Group sessions by day
  const sessionsByDay = mySessions.reduce(
    (acc, session) => {
      if (!acc[session.day]) {
        acc[session.day] = [];
      }
      acc[session.day].push(session);
      return acc;
    },
    {} as Record<number, Session[]>,
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-16 bg-[#FAF7F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 mb-2">
              <h1
                className="text-3xl md:text-5xl font-bold text-[#004B23]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Minha Agenda
              </h1>
              <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
              <p className="text-[#4A5D4E] text-base md:text-lg max-w-3xl mx-auto">
                Suas atividades salvas para o Python Norte 2026
              </p>
            </div>

            {mySessions.length === 0 ? (
              // Empty State
              <div className="bg-white rounded-2xl p-12 md:p-16 text-center shadow-lg border border-[#004B23]/10">
                <Calendar className="w-16 h-16 text-[#004B23]/30 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-[#004B23] mb-3">
                  Sua agenda está vazia
                </h2>
                <p className="text-[#4A5D4E] mb-8 max-w-md mx-auto">
                  Navegue pela programação completa e adicione as atividades que
                  você deseja participar
                </p>
                <Link
                  href="/programacao"
                  className="inline-flex items-center gap-2 bg-[#004B23] hover:bg-[#003818] text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Ver Programação Completa
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <>
                {/* Sessions by Day */}
                <div className="space-y-8">
                  {Object.entries(sessionsByDay)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([day, sessions]) => (
                      <div key={day} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-[#004B23]">
                            {sessions[0].dayName} - {sessions[0].date}
                          </h2>
                          <span className="text-sm text-[#4A5D4E] bg-white px-3 py-1 rounded-full border border-[#004B23]/10">
                            {sessions.length}{" "}
                            {sessions.length === 1 ? "atividade" : "atividades"}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {sessions.map((session) => {
                            const style = getSessionStyle(session.type);
                            const hasConflict = conflictTimes.has(
                              `${session.day}-${session.time}`,
                            );

                            return (
                              <div key={session.id} className="space-y-0">
                                {hasConflict && (
                                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 border-b-0 rounded-t-xl px-3 py-2 text-xs font-semibold text-amber-700">
                                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                    Conflito de horário — você salvou mais de
                                    uma palestra para este horário
                                  </div>
                                )}
                                <div
                                  onClick={() => setSelectedSession(session)}
                                  className={`flex flex-col sm:flex-row justify-between p-5 ${hasConflict ? "rounded-b-2xl rounded-t-none" : "rounded-2xl"} ${style.bg} ${style.border} shadow-sm border border-[#004B23]/5 ${hasConflict ? "border-t-amber-300" : ""} transition-all duration-200 gap-4 group hover:shadow-md cursor-pointer hover:scale-[1.005]`}
                                >
                                  {/* Left: Content */}
                                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 flex-grow">
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm font-bold text-[#4A5D4E] min-w-[110px] flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {session.time}
                                      </span>
                                    </div>

                                    <div className="flex flex-col gap-2 flex-grow">
                                      <div className="flex flex-wrap items-center gap-3">
                                        <span
                                          className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${style.badge}`}
                                        >
                                          {session.type}
                                        </span>
                                        <span className="text-base font-bold text-[#004B23] tracking-tight">
                                          {session.title}
                                        </span>
                                      </div>

                                      {session.location && (
                                        <div className="flex items-center gap-1.5 text-xs text-[#4A5D4E]">
                                          <MapPin className="w-3.5 h-3.5" />
                                          {session.location}
                                        </div>
                                      )}

                                      {session.track && (
                                        <div className="text-[11px] font-semibold text-[#8B5E3C] bg-[#FFF5EE] border border-[#8B5E3C]/10 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5 self-start">
                                          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                                          {session.track}
                                        </div>
                                      )}

                                      {session.registrationRequired && (
                                        <div className="flex items-center gap-1.5 text-xs text-[#C65911] bg-[#FFF2EB] border border-[#C65911]/20 px-2.5 py-1 rounded-md self-start">
                                          <AlertCircle className="w-3.5 h-3.5" />
                                          Inscrição obrigatória
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Right: Actions */}
                                  <div className="flex items-start gap-3 flex-wrap self-start sm:self-auto">
                                    {session.target && (
                                      <span
                                        className={`text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                                          session.target === "Todos"
                                            ? "bg-[#E2F0D9] text-[#385723]"
                                            : session.target === "Iniciante"
                                              ? "bg-[#DDEBF7] text-[#1F4E79]"
                                              : session.target ===
                                                  "Intermediário"
                                                ? "bg-[#FCE4D6] text-[#C65911]"
                                                : "bg-[#E1D5E7] text-[#6C3483]"
                                        }`}
                                      >
                                        <Users className="w-3 h-3" />
                                        {session.target}
                                      </span>
                                    )}

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addSingleToGoogleCalendar(session);
                                      }}
                                      className="p-1.5 rounded-lg hover:bg-[#FFB800]/10 text-[#FFB800] transition-all"
                                      title="Adicionar ao Google Calendar"
                                    >
                                      <Calendar className="w-4 h-4" />
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeSession(session.id);
                                      }}
                                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
                                      title="Remover da agenda"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>

                {/* CTA to add more */}
                <div className="bg-gradient-to-br from-[#004B23] to-[#003318] rounded-2xl p-8 text-white shadow-xl text-center">
                  <Share2 className="w-12 h-12 mx-auto mb-4 text-[#FFB800]" />
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Quer adicionar mais atividades?
                  </h3>
                  <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                    Explore a programação completa e monte sua agenda ideal
                  </p>
                  <Link
                    href="/programacao"
                    className="inline-flex items-center gap-2 bg-[#FFB800] hover:bg-[#E5A600] text-black font-bold py-3 px-6 rounded-xl transition-all"
                  >
                    Ver Programação Completa
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

                {/* localStorage notice — bottom of page */}
                <div className="flex items-start gap-2.5 bg-white border border-[#004B23]/10 rounded-xl px-4 py-3 max-w-xl mx-auto">
                  <AlertCircle className="w-4 h-4 text-[#4A5D4E]/60 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#4A5D4E]">
                    Sua agenda fica salva{" "}
                    <span className="font-semibold text-[#004B23]">
                      neste dispositivo
                    </span>{" "}
                    — ela não some ao fechar o navegador. Para salvar no Google
                    Agenda, clique no{" "}
                    <span className="font-semibold text-[#004B23]">
                      ícone de calendário
                    </span>{" "}
                    em cada card.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {selectedSession && (
        <SessionDetailModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          isSaved={true}
          onRemove={() => {
            removeSession(selectedSession.id);
            setSelectedSession(null);
          }}
          onAddToCalendar={() => addSingleToGoogleCalendar(selectedSession)}
          speakers={(selectedSession.speakers ?? []).map((name) => ({
            name,
            imagem: null,
          }))}
        />
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {emailSent ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-[#004B23] mb-2">
                  Email enviado!
                </h3>
                <p className="text-[#4A5D4E]">Verifique sua caixa de entrada</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#004B23] mb-4">
                  Enviar Agenda por Email
                </h3>
                <p className="text-[#4A5D4E] mb-6">
                  Digite seu email para receber sua agenda personalizada
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border-2 border-[#004B23]/20 rounded-xl focus:border-[#004B23] focus:outline-none mb-6"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={sendAgendaByEmail}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm bg-[#004B23] text-white hover:bg-[#003818] transition-all"
                  >
                    Enviar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
