# NEXO Websites

Estúdio que cria **sites próprios de reserva direta para imóveis de temporada** e vende ao proprietário.
Cada imóvel é um cliente em `clientes/<slug>/`. Clientes: **Casa Dez**, **Casa 6 Suítes** (nome sugerido, pasta `porto-6-suites`) e **Casa em Porto de Galinhas**
(nome sugerido, pasta `porto-coqueiral`), todos em Porto de Galinhas, PE.
Como cada site foi feito: `clientes/<slug>/historico.md`; fluxo geral, skills e MCPs: `docs/processo.md`.

## Antes de começar
1. Leia `clientes/<slug>/README.md` do cliente em questão (status, links publicados, decisões).
2. Para um imóvel novo, use a skill `novo-cliente`. Para orçamento/proposta, `proposta-comercial`.
3. Dependências: `npm install` na raiz (o hook de sessão já faz isso na nuvem).

## Modelos e skills padrão (pedido do usuário)
- **Advisor: Opus** (`advisorModel` em `.claude/settings.json`). **Subagentes: Haiku**
  (`CLAUDE_CODE_SUBAGENT_MODEL`); ao chamar o Agent, passar `model: "haiku"`.
- **Em toda solicitação**, aplicar a skill `karpathy-guidelines` (`.claude/skills/karpathy-guidelines/`):
  pensar antes e explicitar suposições, fazer o mínimo que resolve, mudar só o necessário e definir como
  verificar. O hook `UserPromptSubmit` (`.claude/hooks/karpathy.sh`) lembra disso e das regras abaixo a cada pedido.
- **Context7** (MCP) sempre que o pedido envolver biblioteca, framework, SDK ou CLI: consultar a documentação
  atual antes de escrever código.
- **shadcn** (MCP em `.mcp.json`) sempre que o pedido envolver componentes de interface. Na nuvem precisa de
  `ui.shadcn.com` liberado na rede do ambiente; sem ele, usar o código oficial do registro (GitHub).
- **Caveman ultra** (`.claude/skills/caveman/`) nas respostas de chat ao usuário, em português. **Nunca** em
  textos de site ou mockup, propostas, `mensagens.md`, documentação, comentários de código ou commits:
  esses seguem escrita normal. Avisos de segurança e confirmações de ação irreversível também em texto normal.

## Estrutura
```
CLAUDE.md, README.md
.claude/                 settings.json, hooks/ (session-start, karpathy = lembrete por pedido), skills/
docs/                    processo.md (fluxo de venda), precos.md (pacotes), publicacao.md (domínio próprio)
scripts/                 ferramentas (recorte de fotos, preview, checagem, PDF, build do site)
web/                     página da NEXO (raiz do domínio), 404 e favicon
dist/                    gerado por npm run build:web (não vai para o git)
clientes/<slug>/
  README.md              status, links publicados, decisões do cliente
  historico.md           como o site foi feito: pedidos em ordem, skills/MCPs, problemas, pendências
  dados.md               fatos do anúncio (fonte única para textos)
  fonte/                 prints originais da galeria (não editar); recorte.json se a galeria não tem moldura branca
  fotos/                 fotos recortadas (<id>.webp + <id>-thumb.webp)
  site.html              site final
  mockup-*.html          direções visuais apresentadas
  proposta.html + Proposta-<Nome>.pdf + img/   proposta comercial
  tour/                  (opcional, Premium) tour imersivo Next.js
  site-v2/               (Casa Dez) versão React + shadcn/ui; build em site-v2/dist/
  site/                  (Casa 6 Suítes) site final em React + shadcn/ui no lugar de site.html; build em site/dist/
                         (Casa em Porto de Galinhas) mockup no mesmo estilo, ainda sem site final
```

## Comandos
| Comando | O que faz |
|---|---|
| `npm run fotos -- clientes/<slug>/fonte clientes/<slug>/fotos` | recorta as fotos dos prints da galeria |
| `npm run preview -- clientes/<slug>` | servidor local em http://localhost:4321 com o esqueleto do Artifact |
| `npm run check -- clientes/<slug>` | abre cada página no celular e desktop: erros, rolagem lateral, capturas em `.screens/` |
| `npm run telas -- clientes/<slug>/site.html clientes/<slug>/img` | captura as telas do site usadas na proposta |
| `npm run pdf -- clientes/<slug>/proposta.html clientes/<slug>/Proposta-<Nome>.pdf` | gera o PDF A4 da proposta |
| `npm run build:web` | monta `dist/` para o domínio próprio: `/`, `/<slug>/`, `/<slug>/proposta/`, mockups e PDF |
| `npm run tour -- validate` | typecheck + testes + build do tour da Casa Dez |
| `npm run site-v2 -- build` | gera `clientes/casa-dez/site-v2/dist/` (página + app.js + app.css + fotos usadas) |
| `npm --prefix clientes/<slug>/<app> run build` | mesmo build para um mockup ou site React de cliente (`<app>/dist/`) |
| `npm run validate` | checa os scripts, valida o tour e faz o typecheck dos sites React |

## Regras de conteúdo (não negociáveis)
- **Fotos reais**: só as do anúncio ou do proprietário. Pode recortar e redimensionar. Nunca retocar, gerar com IA, usar banco de imagens ou inventar ambientes.
- **Fatos**: só o que está em `dados.md` (prints do anúncio ou informado pelo usuário). Nada de preço, distância, comodidade ou capacidade inventados.
- **Avaliações**: citação literal, com nome e mês. Trecho cortado vira `[…]`. Não "corrigir" o texto do hóspede.
- **Nome da marca**: é sugestão até o proprietário aprovar. Diga isso na proposta.
- **Airbnb**: o site soma um canal ao anúncio. Nunca sugerir desviar hóspedes ou reservas vindos do Airbnb (regra de pagamentos fora da plataforma). Taxas do Airbnb: citar a fonte e pedir confirmação no painel do anfitrião.
- **Não oferecer**: Perfil da Empresa no Google (casas de temporada são inelegíveis) e hospedagem gratuita da Vercel (plano Hobby é só para uso não comercial). Para hospedagem sem custo, usar Cloudflare Pages ou similar que permita uso comercial.
- **WhatsApp**: sem número real até o proprietário fornecer. Na fase de apresentação, `https://wa.me/?text=` sem número.

## Páginas HTML (publicadas como Artifact do claude.ai)
- O arquivo **não** tem `<!doctype>`, `<html>`, `<head>` nem `<body>`: o Artifact adiciona o esqueleto (o mesmo de `scripts/_pagina.mjs`).
- Abrir com `<title>` (nome curto) e `<meta name="claude:viewport-fit-sides" content="cover">`; laterais com `padding-left/right: max(20px, env(safe-area-inset-*, 0px))`.
- Caminhos relativos à pasta do cliente: `fotos/…`, `img/…`. Nunca `/` inicial nem `../`.
- Fontes só do Google Fonts; scripts externos só de cdnjs/jsDelivr/unpkg. Preferir JS puro.
- Mobile primeiro (390 px), sem rolagem lateral, `prefers-reduced-motion` respeitado.
- `window.print()`, `alert()` e downloads não funcionam dentro do Artifact; PDF é gerado com `npm run pdf`.
- Antes de publicar: `npm run check -- clientes/<slug>` sem erros.

## Publicação
Dois canais:
- **Domínio próprio (para enviar ao proprietário)**: `npm run build:web` → Cloudflare Pages
  (`docs/publicacao.md`). Links `claude.ai/artifact` listados no README do cliente viram caminhos do domínio;
  páginas de clientes saem com `noindex`. Só entram clientes com `site.html` (sites React em `site/` ainda não).
- **Artifact do claude.ai (prévia)**:
- Publicar com `root = clientes/<slug>` e `files` = só as fotos/imagens que a página usa.
- **Republicar sempre com o `url` do Artifact existente** (tabela no README do cliente), senão nasce um link novo.
- Links nascem privados: o usuário compartilha pelo menu **Share** antes de enviar ao proprietário.

## Código e git
- Textos de interface e documentação em português do Brasil. Código e comentários seguem o padrão do arquivo; comentar só o porquê não óbvio.
- Tour imersivo: Next.js + React + TypeScript + Tailwind 4, WebGL2 próprio, testes com vitest.
- site-v2: React 19 + Tailwind 4 + componentes shadcn/ui copiados do registro oficial (new-york-v4) em
  `src/components/ui/`, empacotados com esbuild. Publicar com `root = clientes/casa-dez/site-v2/dist`.
  O MCP do shadcn está em `.mcp.json`; precisa de `ui.shadcn.com` liberado na rede do ambiente.
- Commits: `feat|fix|docs|chore(escopo): mensagem`. Nunca commitar `.env*`, `node_modules`, `.screens/` ou builds.

## Estilo de resposta
Chat em caveman ultra, em português (ver "Modelos e skills padrão"). Mostrar links e próximos passos;
detalhes técnicos só quando pedidos.
