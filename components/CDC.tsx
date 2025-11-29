"use client";

export function CodigoDeConduta() {
  return (
    <section
      id="codigo-de-conduta"
      aria-labelledby="codigo-de-conduta-heading"
      className="relative overflow-hidden py-14 md:py-24 bg-gradient-to-br from-muted/60 via-muted/30 to-background"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/abstract-1.e4a9f9c0.svg')] bg-repeat opacity-70"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-10xl">
          <div className="mb-8 flex flex-col items-center text-center gap-4">
            <div>
              <h1
                id="codigo-de-conduta-heading"
                className="my-3 text-balance text-4xl md:text-8xl font-bold text-primary tracking-tight flex items-center justify-center gap-3"
              >
                Código de Conduta
              </h1>
              <p className="mt-3 mx-auto text-2xl md:text-2xl">
                O evento Python Norte é um ambiente amistoso, de boa
                convivência, inclusivo e livre de intimidação, onde todas as
                pessoas são bem-vindas e a civilidade é exigida. Com esta
                finalidade, a organização do evento conta com uma Equipe de
                Resposta que atua para garantir um ambiente com essas
                qualidades.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-background/80 p-6 md:p-8 shadow-lg backdrop-blur-xl">
            <h3 className="mt-3 text-3xl md:text-3xl">
              Por isso:
            </h3>

            <ul className="mt-4 space-y-2 text-sm md:text-base text-foreground/90 list-disc list-inside">
              <li className="text-2xl md:text-2xl">
                Não é tolerado nenhum tipo de assédio, discriminação
                inapropriada ou humilhação pública;
              </li>
              <li className="text-2xl md:text-2xl">Não é tolerado o descumprimento das leis brasileiras;</li>
              <li className="text-2xl md:text-2xl">
                Toda pessoa presente no evento, independente do seu papel, está
                sujeita a estas regras.
              </li>
              <li className="text-2xl md:text-2xl">
                Toda pessoa presente no evento, independente do seu papel, está
                sujeita a estas regras.
              </li>
            </ul>

            <div className="mt-6 space-y-4 text-sm md:text-base">
              <h3 className="mt-3 text-3xl md:text-3xl">
                Desta forma, entendemos que:
              </h3>

              <ul className="mt-4 space-y-2 text-sm md:text-base text-foreground/90 list-disc list-inside">
                <li className="text-2xl md:text-2xl">
                  Assédio é a ação de insistir, perseguir ou coagir outra pessoa
                  a um comportamento involuntário;
                </li>
                <li className="text-2xl md:text-2xl">
                  Discriminação inapropriada é o ato de separar, injuriar ou
                  humilhar alguém promovendo sua exclusão por atributo
                  particular da mesma;
                </li>
                <li className="text-2xl md:text-2xl">
                  Humilhação pública é o ato de submeter, rebaixar,
                  ridicularizar ou promover o vexame de outro publicamente.
                </li>
              </ul>

              <p className="mt-10 text-2xl md:text-2xl">
                O público alvo do evento também inclui crianças e adolescentes,
                por isso buscamos manter um ambiente apropriado para todas as
                faixas etárias. Sendo assim, linguagem e imagens sexualizadas
                não são adequados para palestras e ações promocionais de
                patrocinadores. Se você se sentiu assediado, discriminado
                indevidamente ou humilhado, ou presenciou alguma destas
                atitudes, por favor entre em contato com a Equipe de Resposta.
                Para isso basta nos escrever no email pynorteam@gmail.com com o
                assunto "Violação do Código de Conduta" relatando o ocorrido.
              </p>
            </div>

            <h3 className="mt-6 text-3xl md:text-3xl">
              Haverá consequências para quem violar este código de conduta.
            </h3>

            <p className="mt-6 text-2xl md:text-2xl">
                Havendo um relato de violação destes princípios, a Equipe de Resposta realizará a devida análise e, quando necessário, tomará as ações para impedir a reincidência. Estas ações podem, mas não se restringem nem implicam em ir desde uma conversa em busca da retratação até um convite a se retirar do evento por tempo indeterminado.
              </p>

          </div>
        </div>
      </div>
    </section>
  );
}
