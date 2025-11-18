import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqs = [
    {
      question: "Como funciona o patrocínio?",
      answer:
        "O patrocínio é totalmente flexível e adaptado às necessidades da sua empresa. Você pode escolher entre diferentes categorias (Diamante, Ouro, Prata) ou optar por apoios específicos como coffee break, credenciamento ou brindes. Entre em contato conosco para discutirmos a melhor opção.",
    },
    {
      question: "Quais são as categorias de patrocínio disponíveis?",
      answer:
        "Oferecemos três categorias principais: Diamante (máxima visibilidade), Ouro (alta visibilidade) e Prata (visibilidade regional). Além disso, você pode patrocinar itens específicos do evento como coffee break, credenciamento, lanches ou brindes personalizados.",
    },
    {
      question: "O patrocínio vale para uma edição ou para todas?",
      answer:
        "Por padrão, o patrocínio é válido para uma edição específica da Python Norte. No entanto, oferecemos condições especiais para empresas que desejam apoiar múltiplas edições ou estabelecer parcerias de longo prazo com a conferência.",
    },
    {
      question: "Posso patrocinar apenas uma parte específica do evento?",
      answer:
        "Sim! Além das categorias tradicionais, você pode escolher patrocinar elementos específicos como: coffee break, credenciamento, brindes, camisetas, sacolas, área de networking, ou qualquer outro item que faça sentido para a sua marca.",
    },
    {
      question: "Qual é o retorno esperado do patrocínio?",
      answer:
        "O retorno inclui visibilidade regional em 7 estados, acesso a um público qualificado de desenvolvedores e gestores de TI, networking com líderes de comunidade, posicionamento de marca como apoiadora da tecnologia no Norte, e oportunidades de recrutamento de talentos.",
    },
    {
      question: "A Python Norte emite nota fiscal?",
      answer:
        "Sim, trabalhamos com parceiros que emitem nota fiscal para todos os patrocínios. Os detalhes fiscais e contratuais são definidos durante o processo de formalização do patrocínio.",
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Perguntas Frequentes</h2>
            <p className="text-lg md:text-xl text-muted-foreground text-pretty">
              Tudo o que você precisa saber sobre apoiar a Python Norte
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border-2 rounded-lg px-6 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
