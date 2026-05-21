"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Users, MapPin, Calendar, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { name: "2019 RO", participantes: 90, label: "2019 - Porto Velho/RO" },
  { name: "2022 AM", participantes: 576, label: "2022 - Python Brasil (Manaus/AM)" },
  { name: "2023 AM", participantes: 230, label: "2023 - Manaus/AM" },
  { name: "2024 AM", participantes: 200, label: "2024 - Itacoatiara/AM" },
  { name: "2025 PA", participantes: 246, label: "2025 - Belém/PA" },
  { name: "2026 PA", participantes: 400, label: "2026 - Ananindeua/PA (Previsto)" },
];

export function Impact() {
  const metrics = [
    {
      icon: Users,
      value: "+1.600",
      label: "Participantes",
      description:
        "Ao longo de nossa história, conectamos mais de 1.600 entusiastas, profissionais e estudantes de tecnologia.",
      color: "text-brand-green"
    },
    {
      icon: MapPin,
      value: "3 Estados",
      label: "Alcançados",
      description:
        "Realizamos edições marcantes nos estados do Amazonas, Pará e Rondônia, cobrindo a Amazônia Legal.",
      color: "text-brand-orange"
    },
    {
      icon: Calendar,
      value: "9 Anos",
      label: "De História",
      description:
        "Fomentando comunidades locais e criando polos de desenvolvimento desde a primeira edição em 2017.",
      color: "text-brand-yellow-dark"
    },
    {
      icon: Clock,
      value: "3 Dias",
      label: "De Imersão",
      description:
        "Uma programação intensa que une palestras, tutoriais práticos e debates enriquecedores a cada edição.",
      color: "text-brand-green-dark"
    },
  ];

  return (
    <section
      id="impacto"
      className="relative py-20 md:py-32 bg-slate-50 text-brand-text overflow-hidden"
      aria-label="Impacto e Transformação"
    >
      <div className="absolute inset-0 bg-[url('/quadradinho.png')] opacity-5 bg-repeat pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight font-oferta text-brand-green">
              Impacto & Transformação
            </h2>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full" />
            <p className="text-base md:text-lg max-w-2xl mx-auto text-foreground/80 font-medium pt-2">
              A Python Norte atua como um motor de desenvolvimento tecnológico, inclusão social e fomento à inovação na Amazônia.
            </p>
          </div>

          {/* Metrics cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <Card
                key={index}
                className="group relative rounded-3xl border border-black/5 bg-white p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                <div className="space-y-6 text-center">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-bg border border-black/5 text-foreground/70 transition-transform duration-300 group-hover:scale-110">
                    <metric.icon className="h-7 w-7 text-brand-orange" />
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-3xl md:text-4xl font-black tracking-tight font-oferta ${metric.color}`}>
                      {metric.value}
                    </h3>
                    <p className="text-sm font-bold text-foreground">
                      {metric.label}
                    </p>
                    <p className="text-xs md:text-sm text-foreground/75 leading-relaxed font-medium">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Chart Wrapper */}
          <div className="max-w-4xl mx-auto">
            <Card className="rounded-3xl border border-black/5 bg-white p-6 md:p-10 shadow-lg">
              <div className="space-y-2 text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground font-oferta">
                  Crescimento Histórico
                </h3>
                <p className="text-xs md:text-sm text-foreground/60 font-medium">
                  Número aproximado de participantes credenciados por edição do evento.
                </p>
              </div>

              {/* Chart container */}
              <div className="h-72 md:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barSize={32} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tick={{ className: "text-[10px] md:text-xs fill-foreground/60 font-bold" }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ className: "text-[10px] md:text-xs fill-foreground/60 font-bold" }}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                      contentStyle={{
                        borderRadius: "16px",
                        border: "1px solid rgba(0, 0, 0, 0.05)",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}
                      formatter={(value: number) => [`${value} participantes`, "Público"]}
                      labelFormatter={(label, items) => {
                        const payload = items[0]?.payload;
                        return payload ? payload.label : label;
                      }}
                    />
                    <Bar
                      dataKey="participantes"
                      radius={[8, 8, 0, 0]}
                      fill="#00B359" // brand-green
                      className="transition-all duration-300"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
