# Roadmap — Blog Imóveis Campos

## Fase 1: MVP (Week 1-2)
**Objetivo:** 3 posts/dia, manual publish, sem erros por 7 dias

- [ ] Setup Next.js 14 + Vercel (deploy 0-friction)
- [ ] Integra Firecrawl scraper (Zap + VivaReal)
- [ ] Claude API writer (posts opinativos curtos)
- [ ] Webhook publisher (manual-first, human review antes publicar)
- [ ] Google AdSense apply (aguarda approval)
- [ ] Monitoramento básico (Slack alerts)
- [ ] Test: 3 posts/dia por 7 dias contínuos

**Success:** MVP rodando, 0 erros.

---

## Fase 2: Auto-publish (Week 3-4)
**Objetivo:** Auto-publish workflow, quality gates, 5-10 posts/dia viável

- [ ] Webhook automation (POST → Next.js API → Supabase → ISR)
- [ ] Quality gates (70% threshold, reject baixa qualidade)
- [ ] Retry automático (exponencial 1min, 5min, 15min)
- [ ] Slack alerts (sucesso/erro detalhado)
- [ ] Analyzer agent (detecta trends, ranqueia stories)
- [ ] Test: 3-5 posts/dia auto-publish, <5% failure rate

**Success:** Auto-publish rodando, monitoring em place.

---

## Fase 3: Scale (Week 5-6)
**Objetivo:** 5-10 posts/dia stable, trending detection, newsletter

- [ ] Analyzer sofisticado (price trends, bairros quentes, novidades)
- [ ] Múltiplas fontes scraping (portais locais)
- [ ] Newsletter integration (Supabase + email API)
- [ ] Featured images automáticas (search API ou generated)
- [ ] SEO optimization (schema.org, internal links, meta descriptions)
- [ ] AdSense ad placements finalizados (display, in-feed, link units)
- [ ] Test: 5-10 posts/dia, bounce rate <60%

**Success:** Full volume, SEO começando pagar.

---

## Fase 4: Revenue (Week 7+)
**Objetivo:** RPM otimizado, A/B testing, possível afiliação

- [ ] AdSense performance baseline (RPM, pageviews, bounce)
- [ ] A/B testing: títulos, CTAs, ad placements
- [ ] Investigate: programas afiliados (VivaReal, Zap)
- [ ] Community features (comentários, engagement)
- [ ] Automação conteúdo: newsletter weekly digest
- [ ] Analytics dashboard (RPM, trending topics, conversão)

**Success:** RPM ≥ R$8/1k views, 1k+ pageviews/mês.

---

## Current Status
- [x] Design spec (2026-05-19)
- [ ] Fase 1: MVP setup
  - [ ] Next.js init
  - [ ] Firecrawl integration
  - [ ] Claude API writer
  - [ ] Manual publisher
- [ ] Fase 2: Auto-publish
- [ ] Fase 3: Scale
- [ ] Fase 4: Revenue

**Last updated:** 2026-05-19  
**Next milestone:** Fase 1 complete (Week 2)
