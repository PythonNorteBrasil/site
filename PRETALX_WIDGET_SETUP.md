# Configuração do Widget Pretalx

## Página de Teste Criada

Foi criada uma nova página em `/app/programacao-pretalx/page.tsx` para testar o widget do Pretalx.

## Como Acessar

Após iniciar o servidor de desenvolvimento (requer Node.js >= 20.9.0):

```bash
npm run dev
```

Acesse: `http://localhost:3000/programacao-pretalx`

## Requisitos

- Node.js versão >= 20.9.0
- O widget carrega automaticamente o script do Pretalx
- Suporte a custom elements (pretalx-schedule)

## Arquivos Criados

1. **app/programacao-pretalx/page.tsx** - Página de teste do widget
2. **types/pretalx.d.ts** - Declaração TypeScript para o elemento customizado

## Integração com a Página Existente

Se o widget funcionar bem na página de teste, você pode integrá-lo de duas formas:

### Opção 1: Substituir a página atual

Substituir o conteúdo de `app/programacao/page.tsx` pelo widget do Pretalx.

### Opção 2: Adicionar como aba/seção

Adicionar o widget como uma nova seção ou aba na página de programação existente.

## Personalização

O widget aceita os seguintes parâmetros:

- `event-url`: URL do evento no Pretalx
- `locale`: Idioma (pt-br)
- `format`: Formato de exibição (grid, list)
- `style`: CSS customizado (--pretalx-clr-primary para cor primária)

## Próximos Passos

1. Atualizar Node.js para versão >= 20.9.0
2. Testar a página `/programacao-pretalx`
3. Verificar se o widget carrega corretamente
4. Decidir se vai substituir ou complementar a programação atual
