# 🎨 Python Norte Design System

Sistema de design completo e escalável para o site Python Norte, baseado no Figma oficial.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Instalação](#instalação)
- [Estrutura](#estrutura)
- [Design Tokens](#design-tokens)
- [Componentes](#componentes)
- [Uso](#uso)
- [Exemplos](#exemplos)

---

## 🎯 Visão Geral

O Python Norte Design System é uma biblioteca completa de tokens de design e componentes reutilizáveis que garante consistência visual em todo o site.

### Características

✅ **Design Tokens** - Cores, tipografia, espaçamento, etc.  
✅ **Componentes Reutilizáveis** - Botões, cards, inputs, etc.  
✅ **TypeScript** - Totalmente tipado para autocompletar  
✅ **Tailwind CSS** - Integração completa  
✅ **CSS Variables** - Suporte a variáveis CSS nativas  
✅ **Temas** - Sistema de temas configurável  
✅ **Acessibilidade** - Componentes acessíveis por padrão

---

## 📦 Instalação

O Design System já está integrado ao projeto. Para usar:

```tsx
import { Button, colors, theme } from "@/design-system";
```

---

## 📁 Estrutura

```
design-system/
├── tokens/              # Design Tokens
│   ├── colors.ts       # Paleta de cores
│   ├── typography.ts   # Tipografia
│   ├── spacing.ts      # Espaçamento
│   ├── radius.ts       # Border radius
│   ├── shadows.ts      # Sombras
│   ├── breakpoints.ts  # Breakpoints responsivos
│   └── index.ts        # Exportações
├── theme/              # Configuração de tema
│   └── theme.ts        # Tema Python Norte
├── components/         # Componentes
│   ├── Button.tsx      # Componente de botão
│   └── index.ts        # Exportações
├── styles/             # Estilos globais
│   └── variables.css   # Variáveis CSS
└── index.ts            # Exportação principal
```

---

## 🎨 Design Tokens

### Cores

#### Cores da Marca

```tsx
import { colors } from "@/design-system";

// Yellow (Amarelo)
colors.brand.yellow[500]; // #FFB000 - Normal
colors.brand.yellow[600]; // #F79E00 - Hover
colors.brand.yellow[700]; // #E37700 - Active

// Orange (Laranja/Vermelho)
colors.brand.orange[500]; // #D94A1A - Normal (CTA Principal)
colors.brand.orange[600]; // #C73F00 - Hover
colors.brand.orange[700]; // #AF3800 - Active

// Green (Verde)
colors.brand.green[500]; // #00D65F - Normal
colors.brand.green[600]; // #00C555 - Hover
colors.brand.green[700]; // #00B04B - Active
```

#### Cores Semânticas

```tsx
colors.semantic.primary; // #D94A1A - Ação principal
colors.semantic.secondary; // #00D65F - Ação secundária
colors.semantic.accent; // #FFB000 - Destaque
colors.semantic.success; // #00D65F - Sucesso
colors.semantic.warning; // #FFB000 - Aviso
colors.semantic.error; // #D94A1A - Erro
```

#### Uso com Tailwind

```tsx
<div className="bg-primary text-white">
  <p className="text-secondary">Texto verde</p>
  <span className="text-accent">Texto amarelo</span>
</div>
```

#### Uso com CSS Variables

```css
.custom-element {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  border: 2px solid var(--color-secondary);
}
```

### Tipografia

```tsx
import { typography, textStyles } from "@/design-system";

// Famílias de fonte
typography.fontFamily.display; // "Oferta do Dia"
typography.fontFamily.sans; // Inter
typography.fontFamily.mono; // Geist Mono

// Tamanhos
typography.fontSize.base; // 1rem (16px)
typography.fontSize["2xl"]; // 1.5rem (24px)
typography.fontSize["6xl"]; // 3.75rem (60px)

// Estilos pré-definidos
textStyles.h1; // Título principal
textStyles.body; // Corpo de texto
textStyles.button; // Texto de botão
```

### Espaçamento

```tsx
import { spacing, componentSpacing } from "@/design-system";

// Espaçamento base
spacing[4]; // 1rem (16px)
spacing[8]; // 2rem (32px)
spacing[12]; // 3rem (48px)

// Espaçamento de componentes
componentSpacing.button.md; // { x: '1.5rem', y: '0.75rem' }
componentSpacing.section.lg; // '6rem' (96px)
```

### Border Radius

```tsx
import { radius, componentRadius } from "@/design-system";

radius.sm; // 0.375rem (6px)
radius.lg; // 0.75rem (12px)
radius.xl; // 1rem (16px)
radius.full; // 9999px (círculo)

componentRadius.button.lg; // 1rem
componentRadius.card; // 1rem
```

### Sombras

```tsx
import { shadows, coloredShadows, textShadows } from "@/design-system";

// Sombras padrão
shadows.lg; // Sombra grande
shadows.xl; // Sombra extra grande

// Sombras coloridas
coloredShadows.primary; // Sombra laranja
coloredShadows.secondary; // Sombra verde

// Sombras de texto
textShadows.lg; // Sombra de texto grande
```

---

## 🧩 Componentes

### Button

Componente de botão completo com todas as variantes e estados.

#### Props

| Prop        | Tipo                                                                                                    | Padrão      | Descrição                 |
| ----------- | ------------------------------------------------------------------------------------------------------- | ----------- | ------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'tertiary' \| 'accent' \| 'ghost' \| 'link' \| 'destructive' \| 'outline'` | `'primary'` | Variante visual           |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'icon' \| 'icon-sm' \| 'icon-lg'`                                              | `'md'`      | Tamanho do botão          |
| `fullWidth` | `boolean`                                                                                               | `false`     | Ocupa toda a largura      |
| `loading`   | `boolean`                                                                                               | `false`     | Mostra spinner de loading |
| `disabled`  | `boolean`                                                                                               | `false`     | Desabilita o botão        |
| `leftIcon`  | `ReactNode`                                                                                             | -           | Ícone à esquerda          |
| `rightIcon` | `ReactNode`                                                                                             | -           | Ícone à direita           |

#### Variantes

##### Primary (Laranja - CTA Principal)

```tsx
<Button variant="primary">Garantir Ingressos</Button>
```

##### Secondary (Verde - Ação Secundária)

```tsx
<Button variant="secondary">Ver Programação</Button>
```

##### Tertiary (Glass Effect)

```tsx
<Button variant="tertiary">Salvar na Agenda</Button>
```

##### Accent (Amarelo - Destaque)

```tsx
<Button variant="accent">Destaque Especial</Button>
```

##### Ghost (Mínimo)

```tsx
<Button variant="ghost">Ação Sutil</Button>
```

##### Link (Texto)

```tsx
<Button variant="link">Saiba Mais</Button>
```

#### Tamanhos

```tsx
<Button size="sm">Pequeno</Button>
<Button size="md">Médio</Button>
<Button size="lg">Grande</Button>
```

#### Estados

##### Loading

```tsx
<Button loading>Carregando...</Button>
```

##### Disabled

```tsx
<Button disabled>Desabilitado</Button>
```

#### Com Ícones

```tsx
import { Calendar, ArrowRight } from 'lucide-react';

// Ícone à esquerda
<Button leftIcon={<Calendar />}>
  Agendar
</Button>

// Ícone à direita
<Button rightIcon={<ArrowRight />}>
  Continuar
</Button>

// Apenas ícone
<Button size="icon">
  <Calendar />
</Button>
```

#### Full Width

```tsx
<Button fullWidth>Botão de Largura Total</Button>
```

### ButtonLink

Versão do botão para uso com links (anchor tags).

```tsx
<ButtonLink
  href="https://example.com"
  variant="primary"
  target="_blank"
  rel="noopener noreferrer"
>
  Link Externo
</ButtonLink>
```

### ButtonGroup

Agrupa múltiplos botões.

```tsx
<ButtonGroup spacing="md">
  <Button variant="primary">Salvar</Button>
  <Button variant="secondary">Cancelar</Button>
</ButtonGroup>

// Vertical
<ButtonGroup orientation="vertical" spacing="sm">
  <Button>Opção 1</Button>
  <Button>Opção 2</Button>
  <Button>Opção 3</Button>
</ButtonGroup>
```

---

## 💡 Uso

### Importação

```tsx
// Importar tudo
import { Button, colors, theme } from "@/design-system";

// Importar específico
import { Button } from "@/design-system/components";
import { colors } from "@/design-system/tokens";
```

### Uso com Next.js Link

```tsx
import Link from "next/link";
import { buttonVariants } from "@/design-system";

<Link
  href="/about"
  className={buttonVariants({ variant: "primary", size: "lg" })}
>
  Sobre Nós
</Link>;
```

### Uso com CSS Variables

```css
.custom-button {
  background-color: var(--color-primary);
  color: var(--color-text-inverse);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-primary);
}

.custom-button:hover {
  background-color: var(--color-primary-hover);
  box-shadow: var(--shadow-primary-hover);
}
```

### Uso com Tailwind

```tsx
<div className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg shadow-primary">
  Custom Button
</div>
```

---

## 📚 Exemplos

### Hero Section com Botões

```tsx
import { Button, ButtonGroup } from "@/design-system";
import { Calendar } from "lucide-react";

export function Hero() {
  return (
    <section>
      <h1>Python Norte 2026</h1>
      <p>A maior conferência Python do Norte</p>

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
    </section>
  );
}
```

### Formulário com Loading

```tsx
import { Button } from "@/design-system";
import { useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // ... submit logic
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Seu email" />

      <ButtonGroup>
        <Button type="submit" variant="primary" loading={loading} fullWidth>
          Enviar
        </Button>

        <Button type="button" variant="ghost" disabled={loading}>
          Cancelar
        </Button>
      </ButtonGroup>
    </form>
  );
}
```

### Card com Tema

```tsx
import { theme } from "@/design-system";

export function InfoCard() {
  return (
    <div
      style={{
        background: theme.components.card.background,
        backdropFilter: theme.components.card.backdropBlur,
        border: theme.components.card.border,
        boxShadow: theme.components.card.shadow,
        borderRadius: theme.radius.xl,
        padding: theme.spacing[6],
      }}
    >
      <h3>Informações do Evento</h3>
      <p>03-05 de Julho de 2026</p>
    </div>
  );
}
```

---

## 🎯 Boas Práticas

1. **Use os tokens** ao invés de valores hardcoded
2. **Prefira componentes** ao invés de estilos inline
3. **Use variantes** para diferentes estados visuais
4. **Mantenha consistência** usando o Design System
5. **Documente** novos componentes adicionados

---

## 🔄 Atualizações

Para atualizar o Design System:

1. Modifique os tokens em `design-system/tokens/`
2. Atualize o tema em `design-system/theme/theme.ts`
3. Atualize as variáveis CSS em `design-system/styles/variables.css`
4. Atualize o Tailwind config em `tailwind.config.ts`

---

## 📝 Licença

Este Design System é parte do projeto Python Norte.

---

**Desenvolvido com ❤️ para Python Norte 2026**
