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
} from "lucide-react";
import Link from "next/link";

interface Session {
  id: string;
  time: string;
  title: string;
  type: "Keynote" | "Palestra" | "Tutorial" | "Credenciamento" | "Intervalo";
  location?: string;
  target?: "Todos" | "Iniciante" | "Intermediário" | "Avançado";
  registrationRequired?: boolean;
  track?: string;
  learningOutcomes?: string;
  day: number;
  dayName: string;
  date: string;
}

export default function MinhaAgendaPage() {
  const [savedSessions, setSavedSessions] = useState<Set<string>>(new Set());
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  // All sessions data
  const allSessions: Session[] = [
    // Day 1
    {
      id: "d1-2",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "08:30 — 08:45",
      title: "Abertura Oficial do Evento",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d1-3",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "08:45 — 09:45",
      title: "Keynote I - Abertura",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d1-4",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "09:45 — 12:00",
      title: "Atividade Prática 1",
      type: "Tutorial",
      location: "Lab 1",
      target: "Iniciante",
      registrationRequired: true,
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a criar do zero uma aplicação web completa com banco de dados utilizando Django.",
    },
    {
      id: "d1-5",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "09:45 — 12:00",
      title: "Atividade Prática 2",
      type: "Tutorial",
      location: "Lab 2",
      target: "Iniciante",
      registrationRequired: true,
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a carregar, limpar, manipular e visualizar conjuntos de dados reais utilizando a biblioteca Pandas.",
    },
    {
      id: "d1-6",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "09:45 — 10:15",
      title: "Palestra 01",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Intermediário",
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a estruturar prompts eficazes para otimização de tarefas de desenvolvimento com LLMs.",
    },
    {
      id: "d1-7",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "10:15 — 10:45",
      title: "Palestra 02",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Avançado",
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão as melhores práticas de performance, concorrência e testes de carga em endpoints assíncronos.",
    },
    {
      id: "d1-9",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "11:00 — 11:30",
      title: "Palestra 03",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
      track: "Comunidades, carreira e liderança Tech",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão estratégias para engajar pessoas, criar conexões duradouras e organizar eventos inclusivos locais.",
    },
    {
      id: "d1-10",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "11:30 — 12:00",
      title: "Palestra 04",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Iniciante",
      track: "Open Source, DevOps & Ecossistemas colaborativos",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a empacotar e rodar aplicações em containers isolados de forma simples e rápida.",
    },
    {
      id: "d1-12",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "13:00 — 15:00",
      title: "Atividade Prática 03",
      type: "Tutorial",
      location: "Lab 1",
      target: "Avançado",
      registrationRequired: true,
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a orquestrar múltiplos modelos de linguagem para executar ações automatizadas e tomadas de decisão.",
    },
    {
      id: "d1-13",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "13:00 — 15:00",
      title: "Atividade Prática 04",
      type: "Tutorial",
      location: "Lab 2",
      target: "Intermediário",
      registrationRequired: true,
      track: "Open Source, DevOps & Ecossistemas colaborativos",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a estruturar pipelines de teste e deploy automáticos utilizando GitHub Actions.",
    },
    {
      id: "d1-14",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "13:00 — 13:30",
      title: "Palestra 05",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Avançado",
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a separar responsabilidades, facilitando a manutenção e testes de grandes projetos de software.",
    },
    {
      id: "d1-15",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "13:30 — 14:00",
      title: "Palestra 06",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
      track: "Open Source, DevOps & Ecossistemas colaborativos",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão como encontrar projetos, abrir issues, e submeter pull requests com confiança.",
    },
    {
      id: "d1-16",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "14:00 — 14:30",
      title: "Palestra 07",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
      track: "Comunidades, carreira e liderança Tech",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão habilidades de mentoria, delegação de tarefas e planejamento de crescimento profissional.",
    },
    {
      id: "d1-17",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "14:30 — 15:00",
      title: "Palestra 08",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Iniciante",
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão os conceitos fundamentais de algoritmos de classificação e regressão de forma simples.",
    },
    {
      id: "d1-19",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "15:30 — 16:30",
      title: "Keynote II - Encerramento do Dia 1",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d1-20",
      day: 1,
      dayName: "Dia 1",
      date: "03/07",
      time: "16:30 — 17:00",
      title: "Dinâmica de encerramento primeiro dia",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
    },
    // Day 2
    {
      id: "d2-2",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "08:30 — 09:30",
      title: "Keynote III - Abertura do Dia 2",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d2-4",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "14:00 — 14:45",
      title: "Palestra 09",
      type: "Palestra",
      location: "Sala 1",
      target: "Avançado",
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão estratégias de refatoração e migração segura de infraestrutura legada para provedores de nuvem.",
    },
    {
      id: "d2-5",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "14:00 — 14:45",
      title: "Palestra 10",
      type: "Palestra",
      location: "Sala 2",
      target: "Intermediário",
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a pré-processar texto, remover ruídos e extrair sentimentos usando spaCy.",
    },
    {
      id: "d2-6",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "14:45 — 15:45",
      title: "Minicurso 01",
      type: "Tutorial",
      location: "Lab 1",
      target: "Iniciante",
      registrationRequired: true,
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a criar seu primeiro modelo preditivo básico usando Scikit-Learn.",
    },
    {
      id: "d2-7",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "14:45 — 15:45",
      title: "Minicurso 02",
      type: "Tutorial",
      location: "Lab 2",
      target: "Intermediário",
      registrationRequired: true,
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a implementar autenticação JWT e prevenir vulnerabilidades como injeção e CSRF.",
    },
    {
      id: "d2-8",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "14:45 — 15:30",
      title: "Palestra 11",
      type: "Palestra",
      location: "Sala 1",
      target: "Iniciante",
      track: "Open Source, DevOps & Ecossistemas colaborativos",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a coletar e transmitir dados físicos usando MicroPython e placas de desenvolvimento.",
    },
    {
      id: "d2-9",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "15:30 — 16:45",
      title: "Palestra 12",
      type: "Palestra",
      location: "Sala 1",
      target: "Intermediário",
      track: "Web, Cloud & plataforma digitais",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a construir e gerenciar funções serverless scaláveis integradas com gatilhos de nuvem.",
    },
    {
      id: "d2-10",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "15:30 — 16:45",
      title: "Palestra 13",
      type: "Palestra",
      location: "Sala 2",
      target: "Todos",
      track: "Dados, inteligência artificial e machine learning",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão como o ecossistema Scipy/Numpy revolucionou as pesquisas científicas e computacionais.",
    },
    {
      id: "d2-11",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "16:15 — 17:00",
      title: "Palestra 14",
      type: "Palestra",
      location: "Sala 1",
      target: "Avançado",
      track: "Open Source, DevOps & Ecossistemas colaborativos",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão a estruturar portais internos de desenvolvedor (IDPs) para simplificar a criação de serviços.",
    },
    {
      id: "d2-12",
      day: 2,
      dayName: "Dia 2",
      date: "04/07",
      time: "16:15 — 17:00",
      title: "Palestra 15",
      type: "Palestra",
      location: "Sala 2",
      target: "Todos",
      track: "Comunidades, carreira e liderança Tech",
      learningOutcomes:
        "Ao final desta atividade, os participantes aprenderão os bastidores de logística, captação de patrocínios e gestão de voluntariado de eventos regionais.",
    },
    // Day 3
    {
      id: "d3-1",
      day: 3,
      dayName: "Dia 3",
      date: "05/07",
      time: "09:00 — 10:00",
      title: "Keynote IV - Abertura do Dia 3",
      type: "Keynote",
      location: "Auditório Principal",
      target: "Todos",
    },
    {
      id: "d3-3",
      day: 3,
      dayName: "Dia 3",
      date: "05/07",
      time: "10:30 — 12:00",
      title: "Mesa redonda",
      type: "Palestra",
      location: "Auditório Principal",
      target: "Todos",
      track: "Comunidades, carreira e liderança Tech",
      learningOutcomes:
        "Ao final desta atividade, os participantes compreenderão os desafios, potenciais e caminhos práticos para a transformação digital regional.",
    },
  ];

  // Load saved sessions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pythonNorteAgenda");
    if (saved) {
      setSavedSessions(new Set(JSON.parse(saved)));
    }
  }, []);

  const mySessions = allSessions.filter((s) => savedSessions.has(s.id));

  const removeSession = (sessionId: string) => {
    const newSet = new Set(savedSessions);
    newSet.delete(sessionId);
    setSavedSessions(newSet);
    localStorage.setItem(
      "pythonNorteAgenda",
      JSON.stringify(Array.from(newSet)),
    );
  };

  const clearAllSessions = () => {
    if (confirm("Tem certeza que deseja limpar toda sua agenda?")) {
      setSavedSessions(new Set());
      localStorage.removeItem("pythonNorteAgenda");
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
DESCRIPTION:${session.learningOutcomes || session.title}
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

  const addToGoogleCalendar = () => {
    // Google Calendar doesn't support bulk import via URL, so we'll download ICS
    downloadICalendar();
    alert(
      "Arquivo .ics baixado! Importe-o no Google Calendar: Configurações > Importar e exportar > Importar",
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
          bg: "bg-[#F4FAF5]",
          border: "border-l-[6px] border-[#004B23]",
          badge: "bg-[#004B23] text-white",
        };
      case "Palestra":
        return {
          bg: "bg-[#FFFDF0]",
          border: "border-l-[6px] border-[#FFB800]",
          badge: "bg-[#FFB800] text-white",
        };
      case "Tutorial":
        return {
          bg: "bg-[#FFF6F2]",
          border: "border-l-[6px] border-[#FF6B00]",
          badge: "bg-[#FF6B00] text-white",
        };
      default:
        return {
          bg: "bg-white",
          border: "border-l-[6px] border-gray-300",
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
            <div className="text-center space-y-3">
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
                {/* Stats & Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#004B23]/10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#004B23] mb-1">
                        {mySessions.length}{" "}
                        {mySessions.length === 1
                          ? "atividade salva"
                          : "atividades salvas"}
                      </h3>
                      <p className="text-sm text-[#4A5D4E]">
                        Exporte sua agenda ou compartilhe por email
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={downloadICalendar}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-[#004B23] text-white hover:bg-[#003818] transition-all shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        Baixar .ics
                      </button>

                      <button
                        onClick={addToGoogleCalendar}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-[#FFB800] text-black hover:bg-[#E5A600] transition-all shadow-md"
                      >
                        <Calendar className="w-4 h-4" />
                        Google Calendar
                      </button>

                      <button
                        onClick={() => setShowEmailModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-[#FF6B00] text-white hover:bg-[#E55F00] transition-all shadow-md"
                      >
                        <Mail className="w-4 h-4" />
                        Enviar por Email
                      </button>

                      <button
                        onClick={clearAllSessions}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                        Limpar Tudo
                      </button>
                    </div>
                  </div>
                </div>

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

                            return (
                              <div
                                key={session.id}
                                className={`flex flex-col sm:flex-row justify-between p-5 rounded-2xl ${style.bg} ${style.border} shadow-sm border border-[#004B23]/5 transition-all duration-200 gap-4 group hover:shadow-md`}
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
                                            : session.target === "Intermediário"
                                              ? "bg-[#FCE4D6] text-[#C65911]"
                                              : "bg-[#E1D5E7] text-[#6C3483]"
                                      }`}
                                    >
                                      <Users className="w-3 h-3" />
                                      {session.target}
                                    </span>
                                  )}

                                  <button
                                    onClick={() => removeSession(session.id)}
                                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all border border-red-200"
                                    title="Remover da agenda"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
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
              </>
            )}
          </div>
        </div>
      </main>

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

// Made with Bob
