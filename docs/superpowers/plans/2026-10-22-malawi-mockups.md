# Mockups Bangalô Muro Alto — Plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 3 mockups React (Noite no Malawi, Azulejo e madeira, Pé na areia) do bangalô 48 do condomínio Malawi, publicados como 3 Artifacts.

**Architecture:** Um app em `clientes/malawi-muro-alto/mockups/` com código comum em `src/shared/` (fatos, reserva, galeria, perguntas, gatilhos de movimento) e uma pasta por estilo (`src/noite/`, `src/azulejo/`, `src/rede/`). `scripts/build.mjs` gera `dist/<estilo>/` (index.html no formato do Artifact, app.js, app.css, fotos usadas). Um teste de navegador (`scripts/e2e.mjs`) prova cada página.

**Tech Stack:** React 19, Tailwind 4, esbuild, shadcn/ui new-york-v4 (cópias do `porto-coqueiral/site`), React Bits TS+Tailwind (cópias do GitHub), gsap + @gsap/react, motion, Playwright (`scripts/_pagina.mjs` da raiz).

**Spec:** `docs/superpowers/specs/2026-10-22-malawi-mockups-design.md`

## Global Constraints
- Nome em todas as páginas: `Bangalô Muro Alto` (provisório). Pasta: `clientes/malawi-muro-alto/`.
- Fatos só do `dados.md` (tarefa 1). Avaliação literal: Sergio Dalmas · Abril de 2019 · "Excelente lugar, supero las expectativas".
- Proibido no código e nas páginas: telefone `(81) 98176-2641`, `Krauthamer`, `kraut_temporada`, `TemporadaLivre`.
- Reserva: no máximo 10 hóspedes; link `https://wa.me/?text=` sem número.
- Página sem `<head>`/`<body>`, abre com `<title>Bangalô Muro Alto</title>` e `<meta name="claude:viewport-fit-sides" content="cover">`; laterais `max(20px, env(safe-area-inset-*, 0px))`.
- Sem rolagem lateral em 390 px e 1440 px; `prefers-reduced-motion` desliga toda animação e deixa o conteúdo visível.
- Fundo WebGL (LightRays) só com tela ≥ 768 px, WebGL2 disponível e movimento permitido; senão gradiente parado.
- Fontes só do Google Fonts, uma dupla nova por estilo: Noite `Cormorant Garamond` + `Sora`; Azulejo `Gloock` + `Albert Sans`; Rede `Marcellus` + `Outfit`.
- Componentes React Bits copiados de `github.com/DavidHDev/react-bits` `src/ts-tailwind/` com a licença ao lado (`src/bits/LICENSE.md`); ícones de terceiros trocados por `lucide-react`.
- Regras da skill `shadcn`: ícone dentro de botão com `data-icon`, estilo nos componentes, `ToggleGroup` para escolha entre opções.

## Review Focus
- Celular sem WebGL ou fraco: página abre, sem `<canvas>`, texto e fotos visíveis (teste na tarefa 3).
- "Reduzir movimento": títulos com SplitText/ScrollReveal/RotatingText aparecem prontos, nada preso em opacidade 0 (teste nas tarefas 3, 4 e 5).
- Datas invertidas ou iguais na reserva: botão do WhatsApp sem link e aviso visível (teste na tarefa 2).
- Mais de 10 hóspedes: botão "+" desativa em 10 (teste na tarefa 2).
- Legenda longa ou nome de comodidade comprido em 390 px: sem rolagem lateral (teste de overflow em todas as tarefas).

---

### Task 1: Material — prints, fotos recortadas e `dados.md`

**Files:**
- Create: `clientes/malawi-muro-alto/fonte/{05-piscina,07-bar,08-bar-piscina,14-varanda,16-sala,21-jantar-sala,24-jantar-cozinha,32-suite,52-casa-noite,55-piscina-noite}.jpg`
- Create: `clientes/malawi-muro-alto/fonte/anuncio/{1-titulo-resumo,2-descricao,3-comodidades-a,4-comodidades-b-avaliacao,5-localizacao}.jpg`
- Create: `clientes/malawi-muro-alto/fonte/recorte.json`, `clientes/malawi-muro-alto/fotos/*`, `clientes/malawi-muro-alto/dados.md`

**Interfaces:**
- Produces: ids de foto `05-piscina` … `55-piscina-noite` (galeria, 1600 px de largura) e recortes limpos com letra (ex.: `55a-piscina-noite`), usados pelas tarefas 2–5.

- [ ] **Step 1:** Copiar os uploads (`/root/.claude/uploads/6e48843a-6146-52ea-b9a1-0716e48569cd/`) para `fonte/` com os nomes acima: galeria 82e7641c→55, 87e867e1→52, 24f6b058→32, 64d44707→24, f32d87c5→21, aa36eaa7→16, 0217a1f9→14, e8ebac60→05, 5a15931c→07, c2680f32→08; texto 3bcf8664→1, 3e1835d4→2, 470e38f5→3, 2ed01dda→4, f72f1eb4→5. O print 5 é cortado acima de "Sobre o Anunciante" (sem foto nem telefone do anunciante).
- [ ] **Step 2:** `recorte.json` com a geometria do `porto-coqueiral`: `caixa {left:92, top:276, width:2120, height:1068}`; `caixas` com `height: 970` para toda foto com o aviso "51 pessoas" (todas menos a 55, conferir na folha de contato); `extras` fora da marca d'água (x < 860 ou x > 1340 na foto de 2120 px, ou faixas acima/abaixo da marca, medidas por foto com grade): pelo menos 1 retrato limpo da 55, 52, 14, 05 e 08 e 1 faixa larga da 21 e da 16.
- [ ] **Step 3:** Rodar `npm run fotos -- clientes/malawi-muro-alto/fonte clientes/malawi-muro-alto/fotos` e conferir: folha de contato sem aviso, sem setas, sem barra; zoom nas bordas dos recortes sem resto de marca d'água.
- [ ] **Step 4:** `dados.md` a partir de `.claude/skills/novo-cliente/modelo-dados.md` com os fatos do spec, as comodidades marcadas e desmarcadas, as distâncias do card da foto 56, condomínio, regras, acessibilidade, a avaliação literal, "51 interessados" só em "Sinais para a proposta", Q5 "dependência" como **(confirmar)**, e a lista de fotos.
- [ ] **Step 5:** Verificar: `grep -rnE "98176|Krauthamer|kraut_temporada" clientes/malawi-muro-alto` → só em `dados.md`, na linha que diz para não publicar.
- [ ] **Step 6:** Commit `feat(malawi-muro-alto): prints, fotos e dados do anúncio`.

### Task 2: Base do app, reserva, galeria e teste de navegador

**Files:**
- Create: `mockups/{package.json,tsconfig.json,scripts/build.mjs,scripts/e2e.mjs}`
- Create: `mockups/src/lib/utils.ts`, `mockups/src/components/ui/*` (cópia de `clientes/porto-coqueiral/site/src/components/ui/` + `lib/utils.ts`)
- Create: `mockups/src/shared/{data.ts,booking.tsx,gallery.tsx,nav.tsx,faq.tsx,motion.ts,base.css}`
- Create: `mockups/src/noite/{main.tsx,App.tsx,index.css}` (página funcional sem efeitos)
- Modify: `package.json` da raiz (`validate` ganha `npm --prefix clientes/malawi-muro-alto/mockups run typecheck`)

**Interfaces:**
- Produces (`src/shared/data.ts`): `NAME = "Bangalô Muro Alto"`, `MAX_GUESTS = 10`, `PHOTOS: { id: string; caption: string; height: number }[]`, `SUITES: { n: number; beds: string }[]`, `HOUSE: string[]`, `CONDO: string[]`, `DISTANCES: { place: string; value: string }[]`, `REVIEW: { name: string; month: string; text: string }`, `FAQ: [string, string][]`, `photoSrc(id: string): string`.
- Produces (`src/shared/booking.tsx`): `BookingProvider`, `useBooking(): { range; setRange; guests; setGuests; openBooking(): void }`, `bookingMessage(range: DateRange, guests: number): string`, `BookingFlow()`, `BookingCard()`, `GuestsStepper()`, `DateRangePicker()` (adaptados do `porto-coqueiral/site/src/App.tsx`); botões com `aria-label="Mais um hóspede"`/`"Menos um hóspede"`; o botão que abre a reserva tem `data-booking-open`.
- Produces (`src/shared/gallery.tsx`): `PhotoViewer({ index: number | null; onClose: () => void })`; cada miniatura clicável tem `data-gallery-item`; a legenda do visualizador termina em `"<n> de <total>"`.
- Produces (`src/shared/nav.tsx`): `Nav({ links: [string, string][] })` — barra fixa; abaixo de 768 px, botão `aria-label="Abrir menu"` abre um `Drawer` com os links das seções e "Reservar".
- Produces (`src/shared/faq.tsx`): `Faq()`. (`src/shared/motion.ts`): `useReducedMotion(): boolean`, `useWebGL(): boolean`.
- Produces (`scripts/build.mjs`): `node scripts/build.mjs [estilo...]` gera `dist/<estilo>/` para `noite`, `azulejo`, `rede` (só os que têm `src/<estilo>/main.tsx`); fontes por estilo num mapa no próprio script.

- [ ] **Step 1: Teste que falha** — `scripts/e2e.mjs <estilo...>` abre `dist/<estilo>/index.html` embrulhado por `wrapPage` e, para cada estilo, verifica:

```js
// 390 e 1440 px: sem pageerror/console.error e sem rolagem lateral
assert(errors.length === 0 && overflow <= 0)
assert(await page.title() === 'Bangalô Muro Alto')
assert(/5 suítes/.test(text) && /10 pessoas/.test(text) && /Muro Alto/.test(text))
assert(!/98176|2641|Krauthamer|kraut_temporada|TemporadaLivre/i.test(html))
// galeria
await page.locator('[data-gallery-item]').first().click(); assert(/1 de \d+$/.test(caption))
await page.keyboard.press('ArrowRight'); assert(/2 de \d+$/.test(caption))
// reserva
await page.locator('[data-booking-open]').first().click()
for (let i = 0; i < 15; i++) await plus.click({ trial: false }).catch(() => {})
assert(await plus.isDisabled())                       // trava em 10
assert(decodeURIComponent(waHref).includes('10 hóspedes') && waHref.startsWith('https://wa.me/?text='))
// datas iguais: sem link do WhatsApp e aviso "Escolha a entrada e a saída"
// menu a 390 px: clicar em "Abrir menu" mostra o link "Reservar"; clicar num link fecha o menu
```

- [ ] **Step 2:** `node scripts/e2e.mjs noite` → FALHA (sem `dist/noite`).
- [ ] **Step 3:** Escrever `data.ts` (fatos da tarefa 1), `booking.tsx`, `gallery.tsx`, `nav.tsx`, `faq.tsx`, `motion.ts` (`useWebGL` = `!reduced && matchMedia('(min-width: 768px)').matches && !!canvas.getContext('webgl2')`), `build.mjs` (esbuild IIFE + postcss/Tailwind como `porto-coqueiral/site/scripts/build.mjs`, laço por estilo, cópia das fotos citadas em `src/shared/data.ts` + `src/<estilo>/*.tsx`), e `src/noite/App.tsx` com as seções comuns sem efeitos: capa, números, galeria, suítes, casa e condomínio, avaliação, localização, perguntas, reserva.
- [ ] **Step 4:** `npm install` em `mockups/`, `npm --prefix mockups run build -- noite`, `node mockups/scripts/e2e.mjs noite` → PASSA.
- [ ] **Step 5:** `npm run validate` na raiz → passa. Commit `feat(malawi-muro-alto): base dos mockups com reserva e galeria`.

### Task 3: Estilo "Noite no Malawi"

**Files:**
- Create: `mockups/src/bits/{SplitText,LightRays,SpotlightCard,CountUp}.tsx`, `mockups/src/bits/LICENSE.md`
- Modify: `mockups/src/noite/{App.tsx,index.css}`, `mockups/scripts/e2e.mjs`, `mockups/package.json` (gsap, @gsap/react, motion)

**Interfaces:**
- Consumes: tudo de `src/shared/*` (tarefa 2).
- Produces: componentes de `src/bits/` com o export padrão do React Bits, reutilizáveis nas tarefas 4 e 5.

- [ ] **Step 1: Teste que falha** — em `e2e.mjs`, para cada estilo: contexto `reducedMotion: 'reduce'` a 1440 px → `document.querySelectorAll('canvas').length === 0` e `getComputedStyle(h1).opacity === '1'`; contexto normal a 390 px → sem `canvas`; contexto normal a 1440 px no estilo `noite` → existe 1 `canvas` (LightRays).
- [ ] **Step 2:** `node scripts/e2e.mjs noite` → FALHA (sem canvas no desktop).
- [ ] **Step 3:** Copiar os 4 componentes e aplicar: capa em tela cheia com recorte limpo da 55 (piscina e redes à noite), título com `SplitText`, `LightRays` atrás das seções escuras quando `useWebGL()`, senão gradiente; números com `CountUp` (10 pessoas, 5 suítes, 30 s até o mar, 6 banheiros); comodidades e condomínio em `SpotlightCard`. Paleta: fundo `#0a0f24`, superfície `#121a3a`, azul piscina `#2f5bff`, âmbar `#ffb547`, texto `#f3efe7`. Com movimento reduzido, cada componente renderiza o estado final.
- [ ] **Step 4:** Build + `node scripts/e2e.mjs noite` → PASSA. Capturas de página inteira (celular e computador) revisadas.
- [ ] **Step 5:** Commit `feat(malawi-muro-alto): mockup Noite no Malawi`.

### Task 4: Estilo "Azulejo e madeira"

**Files:**
- Create: `mockups/src/bits/{Masonry,ScrollReveal,TiltedCard}.tsx`, `mockups/src/azulejo/{main.tsx,App.tsx,index.css}`

**Interfaces:**
- Consumes: `src/shared/*`, `src/bits/LICENSE.md`.

- [ ] **Step 1:** `node scripts/e2e.mjs azulejo` → FALHA (sem `dist/azulejo`).
- [ ] **Step 2:** Página clara e editorial: capa dividida com recorte limpo da 24 (teto de azulejo) ou da 21; galeria em `Masonry` (ícones Hugeicons trocados por lucide; se o Masonry tiver visualizador próprio que não se desliga, usar o dele e manter `data-gallery-item` e a legenda `n de N`); texto do serviço (empregada 8h–16h, roupa de cama e toalhas) com `ScrollReveal`; suítes em `TiltedCard`. Paleta: papel `#f6f1e7`, cobalto `#1f3f8f`, madeira `#9a5f34`, tinta `#1e2433`.
- [ ] **Step 3:** Build + `node scripts/e2e.mjs azulejo` → PASSA (inclui o teste de movimento reduzido da tarefa 3). Capturas revisadas.
- [ ] **Step 4:** Commit `feat(malawi-muro-alto): mockup Azulejo e madeira`.

### Task 5: Estilo "Pé na areia, ritmo de rede"

**Files:**
- Create: `mockups/src/bits/{Stack,RotatingText,ScrollVelocity}.tsx`, `mockups/src/rede/{main.tsx,App.tsx,index.css}`

- [ ] **Step 1:** `node scripts/e2e.mjs rede` → FALHA.
- [ ] **Step 2:** Página solar e minimalista: capa com `Stack` de recortes limpos (05, 14, 08, 55) e frase com `RotatingText` ("piscina privativa", "empregada diária", "30 s do mar"); faixa "Muro Alto · Porto de Galinhas" com `ScrollVelocity`; galeria no `Carousel` do shadcn com miniaturas (`data-gallery-item`). Paleta: areia `#f4ead9`, verde-mar `#1f8a84`, coral `#e8735a`, tinta `#1c2b2a`.
- [ ] **Step 3:** Build + `node scripts/e2e.mjs rede` → PASSA. Capturas revisadas.
- [ ] **Step 4:** Commit `feat(malawi-muro-alto): mockup Pé na areia`.

### Task 6: Verificação final, publicação e registro

**Files:**
- Create: `clientes/malawi-muro-alto/{README.md,historico.md}`
- Modify: `README.md` (linha do cliente), `CLAUDE.md` (lista de clientes e estrutura `mockups/`), `docs/processo.md` (histórico)

- [ ] **Step 1:** `npm --prefix clientes/malawi-muro-alto/mockups run build` (3 estilos), `node mockups/scripts/e2e.mjs noite azulejo rede` → PASSA; `npm run check -- clientes/malawi-muro-alto/mockups/dist/<estilo>` sem erros nos 3; `npm run validate` → passa.
- [ ] **Step 2:** Busca de restos: `grep -rnE "Casa 6|Porto Coqueiral|17 pessoas|Francisco|98176|kraut" clientes/malawi-muro-alto/mockups/src` → vazio.
- [ ] **Step 3:** Publicar 3 Artifacts (`root` absoluto = `mockups/dist/<estilo>`, `files` = `app.js`, `app.css`, `fotos/*`) e anotar os links no README do cliente.
- [ ] **Step 4:** README do cliente (status, links, decisões, fotos pendentes: 46 das 56 e as outras 4 suítes), `historico.md` (pedido, skills: superpowers, ponytail, shadcn, caveman; React Bits e licença; problemas), linha no README da raiz, CLAUDE.md.
- [ ] **Step 5:** Commit `docs(malawi-muro-alto): links e histórico dos mockups` e push.
