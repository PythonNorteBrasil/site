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
  { year: "2023 - Manaus/AM", participantes: 230 },
  { year: "2024 - Itacoatiara/AM", participantes: 200 },
  { year: "2025 - Belém/PA", participantes: 246 },
  { year: "2026 - Anaindeua/PA", participantes: 0 },
];

let cidades = [
  {
    "quantidade": "Itacoatiara",
    "count": 131
  },
  {
    "quantidade": "Manaus",
    "count": 48
  },
  {
    "quantidade": "Maués",
    "count": 2
  },
  {
    "quantidade": "Monrovia, Liberia",
    "count": 1
  },
  {
    "quantidade": "Acarape",
    "count": 1
  },
  {
    "quantidade": "Florianópolis",
    "count": 1
  },
  {
    "quantidade": "São Carlos",
    "count": 1
  },
  {
    "quantidade": "Parintins",
    "count": 1
  },
  {
    "quantidade": "Parauapebas",
    "count": 1
  },
  {
    "quantidade": "Iranduba",
    "count": 1
  },
  {
    "quantidade": "Nova Olinda do Norte",
    "count": 1
  },
  {
    "quantidade": "Manaquiri",
    "count": 1
  },
  {
    "quantidade": "Nhamundá",
    "count": 1
  },
  {
    "quantidade": "Belém",
    "count": 111
  },
  {
    "quantidade": "Ananindeua",
    "count": 37
  },
  {
    "quantidade": "Castanhal",
    "count": 9
  },
  {
    "quantidade": "Manaus",
    "count": 7
  },
  {
    "quantidade": "Cametá",
    "count": 3
  },
  {
    "quantidade": "São Paulo",
    "count": 2
  },
  {
    "quantidade": "Benevides",
    "count": 2
  },
  {
    "quantidade": "Itacoatiara",
    "count": 2
  },
  {
    "quantidade": "Mãe do Rio",
    "count": 2
  },
  {
    "quantidade": "São Carlos",
    "count": 2
  },
  {
    "quantidade": "Parauapebas",
    "count": 2
  },
  {
    "quantidade": "Muaná",
    "count": 1
  },
  {
    "quantidade": "LiMA",
    "count": 1
  },
  {
    "quantidade": "Igarapé-Açu",
    "count": 1
  },
  {
    "quantidade": "Mocajuba",
    "count": 1
  },
  {
    "quantidade": "Barcarena",
    "count": 1
  },
  {
    "quantidade": "Benfica (Benevides)",
    "count": 1
  },
  {
    "quantidade": "Tomé-Açu",
    "count": 1
  },
  {
    "quantidade": "Abaetetuba",
    "count": 1
  },
  {
    "quantidade": "Rio Branco",
    "count": 1
  },
  {
    "quantidade": "Santa Isabel do Pará",
    "count": 1
  },
  {
    "quantidade": "Marituba",
    "count": 1
  },
  {
    "quantidade": "Recife",
    "count": 1
  },
  {
    "quantidade": "Capanema",
    "count": 1
  },
  {
    "quantidade": "Porto Velho",
    "count": 1
  },
  {
    "quantidade": "São José dos Campos",
    "count": 1
  },
  {
    "quantidade": "Florianópolis",
    "count": 1
  },
  {
    "quantidade": "Veranópolis",
    "count": 1
  },
  {
    "quantidade": "Palmas",
    "count": 1
  },
  {
    "quantidade": "Teresina",
    "count": 1
  },
  {
    "quantidade": "Natal",
    "count": 1
  },
  {
    "quantidade": "Santa Izabel do Pará",
    "count": 1
  }
]

cidades = Object.values(
  cidades.reduce((acc, item) => {
    const nomeBruto = item.quantidade //?.toString().trim();
    if (!nomeBruto) return acc;

    // // chave normalizada pra evitar duplicidade por maiúsc/minúsc
    const key = nomeBruto.toLowerCase();

    if (!acc[key]) {
      acc[key] = {
        cidade: nomeBruto,
        count: 0,
      };
    }

    acc[key].count += item.count;
    return acc;
  }, {} as Record<string, { cidade: string; count: number }>)
).sort((a, b) => b.count - a.count);

export function Impact() {
  const metrics = [
    {
      icon: Users,
      value: "+600",
      label: "Participantes",
      description:
        "Ao longo das 3 edições, já reunimos mais de 600 participantes",
    },
    {
      icon: MapPin,
      value: "2",
      label: "Estados alcançados",
      description: "AM e PA foram os estados que sediaram o evento até agora",
    },
    {
      icon: Calendar,
      value: "3 anos",
      label: "De história: de 2023 a 2025",
      description:
        "São 3 anos de história promovendo tecnologia e inclusão na região Norte",
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
      className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-secondary/5"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
            Impacto e transformação
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-1xl mx-auto text-pretty py-3">
            Ao longo de nossas edições, a Python Norte tem sido um catalisador
            de transformação e crescimento na região Norte do Brasil, e um
            expoente da cultura de código aberto e colaboração. Através do nosso
            compromisso com a democratização do acesso à tecnologia, temos
            alcançado marcos significativos que refletem nosso impacto positivo
            na comunidade.
          </p>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                <metric.icon className="w-7 h-7 text-primary-foreground" />
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
                    formatter={(value) => [`${value} participantes`, "Total"]}
                    labelFormatter={(label) => `Ano: ${label}`}
                  />
                  <Bar
                    dataKey="participantes"
                    radius={[12, 12, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        {/* Participantes cidade */}
        <div className="max-w-5xl mx-auto my-4">
          <Card className="p-6 md:p-8 bg-card/80 backdrop-blur border-2">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-foreground">
              Participação por cidade
            </h3>
            <div className="h-80 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cidades} barSize={32}>
                  <CartesianGrid
                    strokeDasharray="5 5"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="cidade"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      className: "text-[10px] md:text-xs fill-muted-foreground",
                    }}
                    interval={0}
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
                    formatter={(value) => [`${value} participantes`, "Total"]}
                    labelFormatter={(label) => `Cidade: ${label}`}
                  />
                  <Bar
                    dataKey="count"
                    radius={[12, 12, 0, 0]}
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
