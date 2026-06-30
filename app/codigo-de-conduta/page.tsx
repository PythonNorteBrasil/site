import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShieldCheck, AlertTriangle, Users, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Código de Conduta — Python Norte 2026",
  description:
    "O Python Norte tem o compromisso de proporcionar um ambiente seguro, inclusivo e respeitoso para todas as pessoas.",
};

// ── Section block ──────────────────────────────────────────────────────────────
function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`space-y-3 ${className}`}>{children}</section>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base font-bold text-[#004B23] uppercase tracking-wider flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-[#FF6B00] shrink-0" />
      {children}
    </h2>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="mt-1.5 w-2 h-2 rounded-full bg-[#004B23]/40 shrink-0" />
      <span className="text-[#2D3E31] leading-relaxed">{children}</span>
    </li>
  );
}

function Definition({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-[3px] border-[#FF6B00]/40 pl-4 space-y-0.5">
      <dt className="text-sm font-bold text-[#004B23]">{term}</dt>
      <dd className="text-sm text-[#4A5D4E] leading-relaxed">{children}</dd>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CodigoDeConductaPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-grow pt-10 pb-20 bg-[#FAF7F0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* ── Hero ── */}
            <div className="text-center space-y-4 py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#004B23] mx-auto">
                <ShieldCheck className="w-8 h-8 text-[#FFB800]" />
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold text-[#004B23]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Código de Conduta
              </h1>
              <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#004B23] to-[#FF6B00]" />
              <p className="text-[#4A5D4E] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                O evento Python Norte tem o compromisso de proporcionar um
                ambiente <strong className="text-[#004B23]">seguro</strong>,{" "}
                <strong className="text-[#004B23]">inclusivo</strong> e{" "}
                <strong className="text-[#004B23]">respeitoso</strong> para
                todas as pessoas envolvidas.
              </p>
            </div>

            {/* ── Card container ── */}
            <div className="bg-white rounded-3xl shadow-sm border border-[#004B23]/8 divide-y divide-[#004B23]/8 overflow-hidden">
              {/* Objetivo */}
              <div className="p-6 sm:p-8 space-y-3">
                <p className="text-[#2D3E31] leading-relaxed">
                  Nosso objetivo é fomentar a troca de conhecimento e
                  experiências de forma acolhedora e plural. Para garantir um
                  ambiente harmonioso, contamos com a colaboração de todas as
                  pessoas presentes no evento. Com esta finalidade, a
                  organização do evento conta com uma{" "}
                  <strong className="text-[#004B23]">Equipe de Resposta</strong>{" "}
                  que atua para garantir um ambiente com essas qualidades.
                </p>
              </div>

              {/* Não é tolerado */}
              <div className="p-6 sm:p-8">
                <Section>
                  <SectionTitle>Não é tolerado</SectionTitle>
                  <ul className="space-y-2 pt-1">
                    <Rule>
                      Nenhum tipo de assédio, discriminação inapropriada ou
                      humilhação pública.
                    </Rule>
                    <Rule>O descumprimento das leis brasileiras.</Rule>
                    <Rule>
                      Toda pessoa presente no evento, independentemente do seu
                      papel, está sujeita a estas regras.
                    </Rule>
                  </ul>
                </Section>
              </div>

              {/* Definições */}
              <div className="p-6 sm:p-8">
                <Section>
                  <SectionTitle>Definições</SectionTitle>
                  <dl className="space-y-4 pt-1">
                    <Definition term="Assédio">
                      A ação de insistir, perseguir ou coagir outra pessoa a um
                      comportamento involuntário.
                    </Definition>
                    <Definition term="Discriminação inapropriada">
                      O ato de separar, injuriar ou humilhar alguém, promovendo
                      sua exclusão por um atributo particular.
                    </Definition>
                    <Definition term="Humilhação pública">
                      O ato de submeter, rebaixar, ridicularizar ou promover o
                      vexame de alguém publicamente.
                    </Definition>
                  </dl>
                </Section>
              </div>

              {/* Ambiente para todas as idades */}
              <div className="p-6 sm:p-8">
                <Section>
                  <SectionTitle>Ambiente para todas as idades</SectionTitle>
                  <p className="text-[#2D3E31] leading-relaxed pt-1">
                    Como o evento pode incluir a participação de crianças e
                    adolescentes, buscamos manter um ambiente apropriado para
                    todas as faixas etárias. Por isso, linguagem e imagens
                    sexualizadas não são adequadas para palestras, atividades e
                    ações promocionais de patrocinadores.
                  </p>
                </Section>
              </div>

              {/* Relatos */}
              <div className="p-6 sm:p-8 bg-[#F4FAF5]">
                <Section>
                  <SectionTitle>Presenciou algo inadequado?</SectionTitle>
                  <p className="text-[#2D3E31] leading-relaxed pt-1">
                    Se você se sentiu assediado(a), discriminado(a) ou
                    humilhado(a), ou presenciou qualquer comportamento
                    inadequado, pedimos que entre em contato com a{" "}
                    <strong className="text-[#004B23]">
                      Equipe de Resposta do Código de Conduta
                    </strong>{" "}
                    por meio do formulário de contato.
                  </p>
                  <a
                    href="mailto:norte@python.org.br"
                    className="inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full font-bold text-sm bg-[#004B23] text-white hover:bg-[#003318] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Entrar em contato
                  </a>
                </Section>
              </div>

              {/* Ações */}
              <div className="p-6 sm:p-8">
                <Section>
                  <SectionTitle>Ações da Equipe de Resposta</SectionTitle>
                  <p className="text-[#2D3E31] leading-relaxed pt-1">
                    Havendo um relato de violação destes princípios, a Equipe de
                    Resposta realizará a devida análise e, quando necessário,
                    tomará as ações para impedir a reincidência. Estas ações
                    podem, mas não se restringem nem implicam em ir desde uma
                    conversa em busca da retratação até um convite para se
                    retirar do evento por tempo indeterminado.
                  </p>
                </Section>
              </div>

              {/* Compromisso final */}
              <div className="p-6 sm:p-8 bg-[#004B23] text-white rounded-b-3xl">
                <p className="leading-relaxed text-white/90">
                  Nosso compromisso é garantir que o{" "}
                  <strong className="text-[#FFB800]">Python Norte</strong> seja
                  um espaço acolhedor, diverso e respeitoso para toda a
                  comunidade.
                </p>
              </div>
            </div>

            {/* ── Referência ── */}
            <p className="text-center text-xs text-[#4A5D4E]/70 mt-6 leading-relaxed">
              Este Código de Conduta baseia-se na versão elaborada pela{" "}
              <a
                href="https://pythonbrasil.org.br/coc/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#004B23] transition-colors"
              >
                Python Brasil &amp; APyB
              </a>{" "}
              — Código de Conduta da Python Brasil.
            </p>

            {/* ── Back link ── */}
            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#004B23] hover:underline"
              >
                ← Voltar para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
