"use client";

export function Schedule() {
  const tracks = [
    {
      day: "Dia 1 — 27/Ago (Quinta)",
      sessions: [
        { time: "08:00", title: "Credenciamento", type: "geral" },
        { time: "09:00", title: "Abertura oficial", type: "geral" },
        { time: "09:30", title: "Keynote de abertura", type: "keynote" },
        { time: "10:30", title: "Coffee break", type: "pausa" },
        { time: "11:00", title: "Palestras paralelas", type: "palestra" },
        { time: "12:00", title: "Almoço", type: "pausa" },
        { time: "13:30", title: "Tutoriais (trilha 1 e 2)", type: "tutorial" },
        { time: "15:30", title: "Coffee break", type: "pausa" },
        { time: "16:00", title: "Lightning Talks", type: "lightning" },
        { time: "17:30", title: "Encerramento do dia", type: "geral" },
      ],
    },
    {
      day: "Dia 2 — 28/Ago (Sexta)",
      sessions: [
        { time: "08:30", title: "Abertura do dia", type: "geral" },
        { time: "09:00", title: "Keynote do dia 2", type: "keynote" },
        { time: "10:00", title: "Palestras paralelas", type: "palestra" },
        { time: "10:30", title: "Coffee break", type: "pausa" },
        { time: "11:00", title: "Tutoriais avançados", type: "tutorial" },
        { time: "12:00", title: "Almoço", type: "pausa" },
        { time: "13:30", title: "Palestras paralelas", type: "palestra" },
        { time: "15:30", title: "Coffee break", type: "pausa" },
        { time: "16:00", title: "Hackathon Kickoff", type: "hackathon" },
        { time: "17:30", title: "Encerramento do dia", type: "geral" },
      ],
    },
    {
      day: "Dia 3 — 29/Ago (Sábado)",
      sessions: [
        { time: "08:30", title: "Abertura do dia", type: "geral" },
        { time: "09:00", title: "Keynote de encerramento", type: "keynote" },
        { time: "10:00", title: "Palestras finais", type: "palestra" },
        { time: "10:30", title: "Coffee break", type: "pausa" },
        { time: "11:00", title: "Sprint de código aberto", type: "sprint" },
        { time: "12:00", title: "Almoço", type: "pausa" },
        { time: "13:30", title: "Apresentações do Hackathon", type: "hackathon" },
        { time: "15:00", title: "Premiações e sorteios", type: "geral" },
        { time: "16:00", title: "Encerramento oficial", type: "geral" },
        { time: "17:00", title: "Confraternização de despedida", type: "geral" },
      ],
    },
  ];

  const typeColors: Record<string, string> = {
    geral: "bg-gray-100 text-gray-700",
    keynote: "bg-orange/10 text-orange",
    palestra: "bg-green-deep/10 text-green-deep",
    tutorial: "bg-yellow/10 text-yellow",
    pausa: "bg-gray-50 text-gray-400",
    lightning: "bg-orange/10 text-orange",
    hackathon: "bg-green-light/10 text-green-light",
    sprint: "bg-green-deep/10 text-green-deep",
  };

  return (
    <section id="programacao" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-green-deep" style={{ fontFamily: "var(--font-display)" }}>
              Programação
            </h2>
            <div className="w-20 h-1 bg-orange mx-auto rounded-full" />
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Confira a programação completa do evento. Tudo pode ser atualizado, fique de olho!
            </p>
          </div>

          {/* Schedule grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <div key={i} className="bg-cream-card border border-yellow/20 rounded-2xl overflow-hidden">
                <div className="bg-green-deep text-white px-6 py-4">
                  <h3 className="font-bold text-sm">{track.day}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {track.sessions.map((session, j) => (
                    <div key={j} className="px-6 py-3 flex items-center gap-4">
                      <span className="text-xs font-mono font-bold text-green-deep w-12 flex-shrink-0">{session.time}</span>
                      <span className="text-sm text-gray-800 flex-1">{session.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColors[session.type] || typeColors.geral}`}>
                        {session.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
