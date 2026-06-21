# 🚀 Quick Start - Python Norte Design System

Guia rápido para começar a usar o Design System.

## 📦 Importação

```tsx
// Importar componentes
import { Button, ButtonLink, ButtonGroup } from "@/design-system";

// Importar tokens
import { colors, typography, spacing } from "@/design-system";

// Importar tema
import { theme, pythonNorteTheme } from "@/design-system";
```

## 🎨 Uso Básico

### Botões

```tsx
// Botão primário (CTA principal)
<Button variant="primary" size="lg">
  Garantir Ingressos
</Button>

// Botão secundário
<Button variant="secondary">
  Ver Programação
</Button>

// Com ícone
import { Calendar } from 'lucide-react';

<Button variant="tertiary" leftIcon={<Calendar />}>
  Salvar na Agenda
</Button>

// Com loading
<Button variant="primary" loading>
  Processando...
</Button>
```

### Links como Botões

```tsx
<ButtonLink href="https://example.com" variant="primary" target="_blank">
  Link Externo
</ButtonLink>
```

### Grupo de Botões

```tsx
<ButtonGroup spacing="md">
  <Button variant="primary">Salvar</Button>
  <Button variant="secondary">Cancelar</Button>
</ButtonGroup>
```

## 🎨 Cores no Tailwind

```tsx
// Cores da marca
<div className="bg-primary text-white">CTA</div>
<div className="bg-secondary text-white">Secundário</div>
<div className="bg-accent text-black">Destaque</div>

// Com hover
<button className="bg-primary hover:bg-primary-600">
  Hover Effect
</button>

// Cores específicas
<div className="bg-brand-orange-500">Laranja</div>
<div className="bg-brand-green-500">Verde</div>
<div className="bg-brand-yellow-500">Amarelo</div>
```

## 🎨 Cores com CSS Variables

```css
.custom-button {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
}

.custom-button:hover {
  background-color: var(--color-primary-hover);
}
```

## 🎨 Cores em JavaScript/TypeScript

```tsx
import { colors } from "@/design-system";

const primaryColor = colors.semantic.primary; // #D94A1A
const greenColor = colors.brand.green[500]; // #00D65F

// Usar em estilos inline
<div style={{ backgroundColor: colors.semantic.primary }}>Conteúdo</div>;
```

## 📐 Espaçamento

```tsx
// Com Tailwind
<div className="p-4 m-8 gap-6">Conteúdo</div>;

// Com tokens
import { spacing } from "@/design-system";

<div style={{ padding: spacing[4], margin: spacing[8] }}>Conteúdo</div>;
```

## 🔤 Tipografia

```tsx
// Com Tailwind
<h1 className="font-display text-6xl font-black">
  Título Principal
</h1>

<p className="font-sans text-base">
  Corpo de texto
</p>

// Com tokens
import { typography } from '@/design-system';

<h1 style={{ fontFamily: typography.fontFamily.display }}>
  Título
</h1>
```

## 🎯 Exemplo Completo - Hero Section

```tsx
import { Button, ButtonGroup } from "@/design-system";
import { Calendar } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-neutral-900 flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-black text-white font-display mb-6">
          PYTHON NORTE 2026
        </h1>

        <p className="text-lg text-white/90 max-w-2xl mb-8">
          Três dias de imersão em tecnologia, inovação e conexão.
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
  );
}
```

## 🎯 Exemplo - Formulário com Loading

```tsx
import { Button, ButtonGroup } from "@/design-system";
import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sua lógica aqui
      await submitForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Seu email"
        className="w-full px-4 py-3 rounded-lg border"
      />

      <ButtonGroup spacing="md">
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          Enviar
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => console.log("Cancelado")}
        >
          Cancelar
        </Button>
      </ButtonGroup>
    </form>
  );
}
```

## 🎯 Exemplo - Card com Tema

```tsx
import { theme } from "@/design-system";

export function InfoCard() {
  return (
    <div
      className="p-6 rounded-xl backdrop-blur-md"
      style={{
        background: theme.components.card.background,
        border: theme.components.card.border,
        boxShadow: theme.components.card.shadow,
      }}
    >
      <h3 className="text-xl font-bold text-white mb-2">Quando</h3>
      <p className="text-white/90">03 e 04 de Julho de 2026</p>
    </div>
  );
}
```

## 📚 Recursos

- [README Completo](./README.md) - Documentação completa
- [Exemplos de Botões](./examples/ButtonExamples.tsx) - Todos os exemplos de botões
- [Figma](https://www.figma.com/design/p9auUTByXEeyEOGjOgVD7e/Python-Norte) - Design original

## 🆘 Ajuda

Se tiver dúvidas:

1. Consulte o [README.md](./README.md)
2. Veja os [exemplos](./examples/ButtonExamples.tsx)
3. Explore os tokens em `design-system/tokens/`

---

**Desenvolvido com ❤️ para Python Norte 2026**
