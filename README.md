# Blog Imóveis Campos

Blog local de imóveis (residencial + comercial) em Campos dos Goytacazes, RJ. Posts diários curtos e opinativos gerados autonomamente por agentes IA.

**Stack:** Next.js + Vercel + Claude API + Firecrawl  
**Orçamento:** R$300-1000/mês  
**Volume:** 5-10 posts/dia  
**Monetização:** Google AdSense  

## Estrutura

```
imoveis-campos-blog/
├── docs/                  # Documentação
│   ├── specs/            # Design specs
│   └── README.md         # Índice docs
├── src/
│   ├── app/              # Next.js App Router
│   ├── agents/           # Agent scripts (scraper, analyzer, writer, publisher)
│   ├── lib/              # Utilitários (API clients, db, etc)
│   └── pages/            # API routes
├── scripts/              # Scripts utilitários (seed, cleanup, etc)
├── backups/              # Snapshots do projeto
├── .claude/              # Claude Code config
│   └── skills/           # Custom skills
├── CLAUDE.md             # Instruções projeto
├── .env.example          # Variáveis environment template
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── .gitignore
```

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Agentes

- **Scraper:** Firecrawl (Zap, VivaReal, portais locais)
- **Analyzer:** Node.js (detecta trends, novidades)
- **Writer:** Claude API (gera posts opinativos)
- **Publisher:** Next.js webhook (publica automaticamente)

Rodam 3x/dia (6am, 12pm, 6pm).

## Roadmap

- **Fase 1 (Week 1-2):** MVP, 3 posts/dia, manual publish
- **Fase 2 (Week 3-4):** Auto-publish, monitoring
- **Fase 3 (Week 5-6):** Scale 5-10 posts/dia
- **Fase 4 (Week 7+):** Revenue optimization

## Design Spec

Veja [Design Spec](docs/specs/2026-05-19-imoveis-campos-blog-design.md) para arquitetura, tech stack, e detalhe workflow.

## Status

- [x] Design spec
- [ ] Fase 1: MVP setup
- [ ] Fase 2: Auto-publish
- [ ] Fase 3: Scale
- [ ] Fase 4: Revenue
