"use client";

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
  { year: "2019 - PYCON AMAZÔNIA - Porto Velho/RO", participantes: 90 },
  { year: "2022 - Python Brasil - Manaus/AM", participantes: 576 },
  { year: "2023 - Manaus/AM", participantes: 230 },
  { year: "2024 - Itacoatiara/AM", participantes: 200 },
  { year: "2025 - Belém/PA", participantes: 246 },
  { year: "2026 - Anaindeua/PA", participantes: 0 },
];

export function Impact() {
  const metrics = [
    {
      icon: Users,
      value: "+1200",
      label: "Participantes",
      description:
        "Ao longo dos anos, mais de 1200 entusiastas de tecnologia participaram dos nossos eventos",
    },
    {
      icon: MapPin,
      value: "3",
      label: "Estados alcançados",
      description:
        "Ao longo dos anos, já realizamos eventos em 3 estados diferentes: Amazonas, Pará e Rondônia",
    },
    {
      icon: Calendar,
      value: `${new Date().getFullYear() - 2017} anos`,
      label: `De história: de 2017 a ${new Date().getFullYear()}`,
      description: `Desde 2017, a Python Norte tem sido um pilar na promoção da tecnologia e do código aberto na região Norte do Brasil`,
    },
    {
      icon: Clock,
      value: "3 dias",
      label: "De imersão tecnológica e cultural",
      description:
        "Durante os 3 dias de evento, oferecemos uma programação intensa e diversificada para todos os niveis de experiência",
    },
  ];

  return (
    <section
      id="impacto"
      className="
        py-20 md:py-28
        bg-gradient-to-br from-primary/5 to-secondary/5
        bg-[url('/assets/bg-norte.png')]
        bg-no-repeat
        bg-contain md:bg-cover
        bg-center
      "
    >
      {/* 👇 padding lateral pra evitar qualquer “estouro” nas bordas */}
      <div className="container mx-auto px-4">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl pt-20 md:text-5xl font-bold mb-4 text-primary">
            Impacto e transformação
          </h2>

          <h1
  className="
    text-lg md:text-xl text-muted-foreground
    max-w-6xl mx-auto text-pretty
    py-4 px-6
    bg-background/80 dark:bg-background/70
    border border-border/60
    rounded-xl
    shadow-sm
    backdrop-blur
  "
>
  Ao longo de nossas edições, a Python Norte tem sido um catalisador
  de transformação e crescimento na região Norte do Brasil, e um
  expoente da cultura de código aberto e colaboração. Através do nosso
  compromisso com a democratização do acesso à tecnologia, temos
  alcançado marcos significativos que refletem nosso impacto positivo
  na comunidade.
</h1>

        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2"
            >
              <div className="flex justify-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                  <metric.icon className="w-7 h-7 text-primary-foreground" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-primary">
                {metric.value}
              </div>
              <div className="text-lg font-semibold mb-1 text-foreground">
                {metric.label}
              </div>
              <p className="text-sm text-muted-foreground text-pretty">
                {metric.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Gráfico de participantes por ano */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 bg-card/80 backdrop-blur border-2">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-foreground">
              Participação ao longo dos anos
            </h3>
            <h3 className="text-sm md:text-base mb-6 text-center text-muted-foreground text-pretty">
              Número de participantes em cada edição do evento, desde a PyCon Amazônia em 2019 até este presente momento.
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barSize={32}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      className: "text-xs md:text-sm fill-muted-foreground",
                    }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      className: "text-xs md:text-sm fill-muted-foreground",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid hsl(var(--border))",
                      backgroundColor: "hsl(var(--card))",
                    }}
                    formatter={(value: number | string) => [
                      `${value} participantes`,
                      "Total",
                    ]}
                    labelFormatter={(label: string) => `Ano: ${label}`}
                  />
                  <Bar
                    dataKey="participantes"
                    radius={[30, 30, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
