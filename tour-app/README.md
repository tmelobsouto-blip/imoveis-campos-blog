# Visita imersiva

Site de apresentação do imóvel em forma de visita cinematográfica: o scroll conduz uma câmera virtual pelas
20 fotografias reais do anúncio. Projeto independente do blog (pasta própria, dependências próprias).

- Percurso, análise das fotos e justificativa de cada passagem: [`STORYBOARD.md`](./STORYBOARD.md)

## Rodar

```bash
cd tour-app
npm install
npm run dev          # http://localhost:3000
npm run validate     # typecheck + testes + build estático (out/)
```

Link do anúncio no botão final "Ver disponibilidade": copie `.env.example` para `.env.local` e preencha
`NEXT_PUBLIC_LISTING_URL`. Padrão: link do anúncio no Airbnb (`src/tour/config.ts`).

## Deploy (Vercel)

Novo projeto apontando para este repositório com **Root Directory = `tour-app`**. Build estático
(`output: 'export'`), sem servidor. Defina `NEXT_PUBLIC_LISTING_URL` nas variáveis do projeto.

## Controles

| Ação | Desktop | Celular |
|---|---|---|
| Avançar / voltar | scroll, ↓ ↑ → ←, Espaço, PgDn/PgUp | deslizar |
| Pausar no quadro | parar o scroll | parar de deslizar |
| Reprodução automática | botão ▶ ou `K` | botão ▶ |
| Modo cinema (sem interface) | botão ou `C`; sai com `Esc`, clique ou scroll | botão; sai tocando na tela |
| Mapa de ambientes | `M` ou "Ambientes" | ícone de grade |
| Pontos de interesse | clique nos pontos sobre a foto | toque |
| Início / fim | Home / End | — |

Com `prefers-reduced-motion`, a câmera fica parada em cada foto, as passagens viram dissolves simples e não
há desfoque, parallax ou grão.

## Arquitetura

```
source/                 capturas originais (fonte da verdade)
scripts/prepare-photos  recorta a foto da moldura da galeria → public/photos/*.webp
src/tour/data.ts        storyboard: ordem, câmeras, passagens, hotspots, textos alternativos
src/tour/timeline.ts    matemática pura: progresso → quadro (testada em tests/)
src/tour/renderer.ts    WebGL2 (shader de dissolve/desfoque) com fallback Canvas2D
src/tour/engine.ts      loop rAF: scroll suavizado, autoplay, saltos, parallax, pré-carregamento
src/components/         interface (React)
```

Decisões:

- **Scroll nativo + suavização própria** em vez de GSAP/ScrollTrigger: o progresso é uma função pura do
  scroll (`frameAt`), então ida e volta produzem exatamente os mesmos quadros, e o loop escreve direto nos
  uniforms do WebGL, sem re-render do React por quadro.
- **WebGL2 direto** em vez de Three.js: a cena é um único triângulo de tela cheia com duas texturas; Three.js
  só adicionaria peso.
- **Desfoque só com movimento**: parado, o quadro é sempre a foto nítida.
- **Nada é sintetizado**: o shader só amostra pixels das fotos originais. Passagens sem ligação física
  comprovada usam corte.

## Limitações conhecidas

- Fotos em 974 × 716 (capturas de tela): em telas grandes ficam macias. Substitua os arquivos em `source/`
  pelos originais (mesmo nome) e ajuste `FRAME`/`INSET` em `scripts/prepare-photos.ts`, ou exporte direto
  para `public/photos/`.
- Sem vídeo gerado nem mapas de profundidade — ver seção 4 do storyboard.
