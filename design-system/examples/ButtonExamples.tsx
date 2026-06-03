/**
 * Python Norte Design System - Button Examples
 *
 * Exemplos de uso de todos os botões e suas variantes
 * Use este arquivo como referência para implementação
 */

import { Button, ButtonLink, ButtonGroup } from "@/design-system";
import {
  Calendar,
  ArrowRight,
  Download,
  Mail,
  Heart,
  Share2,
} from "lucide-react";

export function ButtonExamples() {
  return (
    <div className="p-8 space-y-12 bg-neutral-50">
      <section>
        <h2 className="text-2xl font-bold mb-6">Variantes de Botão</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Primary (CTA Principal)
            </h3>
            <Button variant="primary">Garantir Ingressos</Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Secondary (Ação Secundária)
            </h3>
            <Button variant="secondary">Ver Programação</Button>
          </div>

          <div className="bg-neutral-800 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">
              Tertiary (Glass Effect)
            </h3>
            <Button variant="tertiary">Salvar na Agenda</Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Accent (Destaque)
            </h3>
            <Button variant="accent">Oferta Especial</Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Ghost (Mínimo)
            </h3>
            <div className="bg-neutral-800 p-4 rounded-lg">
              <Button variant="ghost">Ação Sutil</Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Link (Texto)
            </h3>
            <Button variant="link">Saiba Mais</Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Destructive (Erro)
            </h3>
            <Button variant="destructive">Cancelar Inscrição</Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Outline (Neutro)
            </h3>
            <Button variant="outline">Voltar</Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Tamanhos</h2>

        <div className="flex items-end gap-4">
          <Button variant="primary" size="sm">
            Pequeno
          </Button>
          <Button variant="primary" size="md">
            Médio
          </Button>
          <Button variant="primary" size="lg">
            Grande
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Com Ícones</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Ícone à Esquerda
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary" leftIcon={<Calendar />}>
                Agendar
              </Button>
              <Button variant="secondary" leftIcon={<Download />}>
                Baixar
              </Button>
              <Button variant="accent" leftIcon={<Mail />}>
                Contato
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Ícone à Direita
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary" rightIcon={<ArrowRight />}>
                Continuar
              </Button>
              <Button variant="secondary" rightIcon={<Share2 />}>
                Compartilhar
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Apenas Ícone
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary" size="icon">
                <Heart />
              </Button>
              <Button variant="secondary" size="icon">
                <Share2 />
              </Button>
              <Button variant="accent" size="icon">
                <Download />
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Tamanhos de Ícone
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary" size="icon-sm">
                <Heart />
              </Button>
              <Button variant="primary" size="icon">
                <Heart />
              </Button>
              <Button variant="primary" size="icon-lg">
                <Heart />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Estados</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Loading
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary" loading>
                Carregando...
              </Button>
              <Button variant="secondary" loading>
                Processando
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Disabled
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary" disabled>
                Desabilitado
              </Button>
              <Button variant="secondary" disabled>
                Indisponível
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Full Width</h2>

        <div className="space-y-4 max-w-md">
          <Button variant="primary" fullWidth>
            Botão de Largura Total
          </Button>
          <Button variant="secondary" fullWidth leftIcon={<Calendar />}>
            Com Ícone Full Width
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Button Links</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Links Externos
            </h3>
            <ButtonGroup spacing="md">
              <ButtonLink
                href="https://www.even3.com.br/python-norte-2026"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Comprar Ingressos
              </ButtonLink>
              <ButtonLink href="#programacao" variant="secondary">
                Ver Programação
              </ButtonLink>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Button Groups</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Horizontal
            </h3>
            <ButtonGroup spacing="md">
              <Button variant="primary">Salvar</Button>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="outline">Voltar</Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Vertical
            </h3>
            <ButtonGroup orientation="vertical" spacing="sm">
              <Button variant="primary" fullWidth>
                Opção 1
              </Button>
              <Button variant="secondary" fullWidth>
                Opção 2
              </Button>
              <Button variant="outline" fullWidth>
                Opção 3
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-600 mb-2">
              Sem Espaçamento
            </h3>
            <ButtonGroup spacing="none">
              <Button variant="outline" className="rounded-r-none">
                Anterior
              </Button>
              <Button variant="outline" className="rounded-none border-l-0">
                Atual
              </Button>
              <Button variant="outline" className="rounded-l-none border-l-0">
                Próximo
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section className="bg-neutral-800 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Hero Section Example
        </h2>

        <div className="space-y-6">
          <h1 className="text-5xl font-black text-white font-display">
            PYTHON NORTE 2026
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Três dias de imersão em tecnologia, inovação e conexão, reunindo
            desenvolvedores da Região Norte e de todo o Brasil.
          </p>

          <ButtonGroup spacing="lg">
            <Button variant="primary" size="lg">
              🎟️ Garantir Ingressos
            </Button>
            <Button variant="secondary" size="lg">
              📅 Ver Programação
            </Button>
            <Button variant="tertiary" size="lg" leftIcon={<Calendar />}>
              Salvar na Agenda
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
}

export default ButtonExamples;

// Made with Bob
