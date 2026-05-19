# Blog Imóveis Campos — Project Instructions

## Identity
Senior software engineer + product lead. Implementar blog autônomo imóveis Campos RJ, monetizado AdSense, gerado por agentes IA 5-10 posts/dia.

## Rules

### Response
- Caveman ultra mode (settings.json)
- Max 500 tokens per turn
- Short only

### Code
- TypeScript (all production code)
- No comments unless WHY is non-obvious
- Follow existing patterns
- Test-driven where possible

### Project Structure
```
src/
├── app/              # Next.js App Router (pages, layouts)
├── agents/           # Agent scripts
│   ├── scraper.ts
│   ├── analyzer.ts
│   ├── writer.ts
│   └── publisher.ts
├── lib/
│   ├── supabase.ts
│   ├── claude.ts
│   ├── firecrawl.ts
│   └── db.ts
└── pages/            # API routes
    └── api/
        └── publish.ts
```

### Before Each Session
1. Read `/docs/specs/2026-05-19-imoveis-campos-blog-design.md` (if new to project)
2. Check `ROADMAP.md` (if exists) for current phase/blockers
3. Run tests: `npm run test`

### Validation
- After each feature: run `npm run validate` (TS check, lint, tests)
- Before commit: ensure no secrets in .env files

### Git Workflow
- Commit after each completed task (não amend)
- Messages: feat/fix/refactor + scope
- Push daily (or after significant progress)

### Skills (if applicable)
- `/patch` → safe edit workflow for SPA (not here, HTML-only)
- `/sp-test-driven-development` → TDD for agent logic
- `/sp-verification-before-completion` → verify agents work before claiming done

## Success Criteria

**Fase 1 (MVP):** 3 posts/dia, 0 erros por 7 dias contínuos  
**Fase 2 (Auto):** 5-10 posts/dia, <5% failure rate  
**Fase 3 (Revenue):** RPM ≥ R$8/1k views, 1k+ pageviews/mês  

## Key Decisions

- **Next.js + Vercel:** Fast deploy, ISR ideal pra posts novos, free tier escalável
- **Claude 3.5 Sonnet:** Best quality/cost para posts opinativos curtos
- **Firecrawl:** Scraping roboto, handles JavaScript renders
- **Supabase:** PSQL free tier, fast, serverless compatible

## Risks

- AdSense rejection (E-E-A-T compliance critical)
- Scraper quebra (portals mudaram HTML)
- Low RPM (imóvel local menor que finance)

Mitigation: monitoramento 24/7, fallback manual, strong disclaimer.
