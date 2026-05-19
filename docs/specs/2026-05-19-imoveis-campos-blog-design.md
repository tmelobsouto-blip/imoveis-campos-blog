# Blog Imóveis Campos — Design Spec

**Data:** 2026-05-19  
**Escopo:** Blog local imóveis residencial + comercial, 5-10 posts/dia autônomos, monetização AdSense  
**Região:** Campos dos Goytacazes, RJ  
**Stack:** Next.js + Vercel + Claude API + Firecrawl  
**Orçamento:** R$300-1000/mês  

---

## 1. Visão Geral

Sistema completamente autônomo que:
- Scrape dados imobiliários (Zap, VivaReal, portais locais) 3x/dia
- Analisa trends e novidades (lançamentos, preços, bairros quentes)
- Gera 2-3 posts curtos opinativos por rodada via Claude
- Publica automaticamente no Next.js via webhook
- Monetiza via Google AdSense
- Monitora qualidade com fallback manual

**Resultado:** 5-10 posts/dia, 100% autônomo, escalável, conforme AdSense guidelines.

---

## 2. Arquitetura

```
┌─────────────────────────────────────────────────┐
│  AGENTES AUTONOMOS (3x/dia: 6am, 12pm, 6pm)   │
│  - Scraper (Zap, VivaReal, portais locais)    │
│  - Analyzer (detecta trends, novidades)        │
│  - Writer (Claude gera 2-3 posts opinativos)   │
│  - Publisher (webhook → Next.js API)           │
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│  NEXT.JS APP (Vercel hosting)                  │
│  - Blog posts (SSG, dinâmico pra novos)        │
│  - Landing page + newsletter signup            │
│  - Analytics (Vercel Analytics + custom)       │
│  - AdSense tags integrados                     │
└─────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────┐
│  MONETIZAÇÃO                                   │
│  - Google AdSense (display + in-feed)          │
│  - Métricas: RPM, pageviews, bounce rate       │
└─────────────────────────────────────────────────┘
```

**Fluxo data:**
Scraper → Analyzer → Writer → Publisher → Next.js ISR → live.

---

## 3. Tech Stack

### Frontend/Hosting
- **Next.js 14+** (App Router, SSG + ISR para posts dinâmicos)
- **Vercel** (hosting free tier, escalável até 1M pageviews/mês)
- **Tailwind + Shadcn/ui** (componentes rápido, responsive)
- **Vercel Analytics** + Google Analytics (métricas)

### Backend/Agentes
- **Node.js + TypeScript** (scripts agentes, type-safe)
- **Claude API** (3.5 Sonnet, posts ~R$200-400/mês)
- **Firecrawl** (scraping Zap/VivaReal, ~R$100-200/mês)
- **Upstash Redis** (queue jobs, fallback, free tier)
- **Supabase ou SQLite** (metadados posts, analytics local, free tier)

### APIs Integradas
- **Zap Imóveis** (scraping Firecrawl, sem API oficial)
- **VivaReal** (scraping Firecrawl, sem API oficial)
- **Portais locais Campos** (discovery manual, scraping)
- **Claude API** (redação automática)
- **Google AdSense** (monetização)
- **Google Analytics** (tracking)

### Orçamento mensal (R$300-1000)
| Item | Custo | Notas |
|------|-------|-------|
| Claude API | R$200-400 | 45-90 calls/dia, 3.5 Sonnet |
| Firecrawl | R$100-200 | Scraping 3x/dia |
| Vercel | R$0 | Free tier |
| Supabase | R$0 | Free tier |
| Upstash Redis | R$0 | Free tier |
| **Total** | **R$300-600** | Dentro budget |

---

## 4. Agent Workflow (3x daily: 6am, 12pm, 6pm)

### 4.1 Scraper Agent (15-20 min)
**Objetivo:** Coletar dados imobiliários recentes.

1. Firecrawl scrape URLs:
   - Zap Imóveis (Campos dos Goytacazes, residencial + comercial)
   - VivaReal (Campos, últimas 48h)
   - Portais locais (se existirem)
2. Parse HTML → extract:
   - Preço, metragem, quartos, bairro
   - Tipo (residencial/comercial, venda/aluguel)
   - Data listagem
   - Descrição anúncio
3. Armazena em Supabase:
   - `listings` table (preço, bairro, tipo, timestamp)
   - Deduplicação por URL (evita duplicatas)
4. Output: Lista de imóveis novos/trending

### 4.2 Analyzer Agent (10 min)
**Objetivo:** Identificar histórias interessantes.

1. Query últimas 48h listings
2. Detecta:
   - **Novidades:** Lançamentos, primeira listagem
   - **Trends:** Bairros com mais listagens
   - **Price moves:** Preços subindo/caindo vs média histórica
   - **Hotspots:** Comerciais em locais inesperados
3. Score relevância:
   - Novo ≥ Trend ≥ Price-change
4. Seleciona top 2-3 stories (mais relevantes)
5. Output: Lista de histórias ranqueadas

### 4.3 Writer Agent (10-15 min)
**Objetivo:** Gerar posts opinativos curtos.

1. Para cada story top 2-3:
   - Prompt Claude: "Escreva post opinativo curto sobre [história] em Campos"
   - Modelo: 3.5 Sonnet (custo-benefício)
   - Tone: opinião clara + dados factuais
   - Exemplos:
     - "Lançamento em Parque Califórnia surpreende → preço acima média, mas demanda justifica"
     - "Comercial em centro virou bom negócio? Análise real: +30% ocupação em 6 meses"
2. Output estruturado:
   ```json
   {
     "title": "Praia do Farol: refúgio de milionários com preços que voam",
     "slug": "praia-farol-milionarios",
     "body": "200-300 palavras...",
     "tags": ["praia-farol", "residencial", "lançamento"],
     "featuredImage": "URL automática (search)",
     "cta": "Quer acompanhar lançamentos em tempo real? Assine newsletter"
   }
   ```
3. Validação:
   - Título tem opinião? ✅
   - Corpo tem dados (preço/bairro/metragem)? ✅
   - Sem clickbait extremo ("CHOCANTE", "URGENTE" sozinho)? ✅

### 4.4 Publisher Agent (2 min)
**Objetivo:** Publicar posts no Next.js.

1. Valida posts (quality gates abaixo)
2. POST webhook → `POST /api/publish`
   - Payload: título, slug, body, tags, imagem, timestamp
3. Next.js API:
   - Insere Supabase `posts` table
   - Regenera site via ISR (revalidate path)
   - Retorna sucesso/erro
4. Retry automático (exponencial):
   - Falha → retry 1min depois
   - Falha → retry 5min depois
   - Falha → retry 15min depois
   - 3 falhas → Slack alert + pause auto-publish
5. Log: Slack notification
   ```
   ✅ 3 posts published
   - "Praia do Farol: refúgio de milionários..."
   - "Comercial em centro virou bom negócio?..."
   - "Lançamento em Parque Califórnia..."
   ```

---

## 5. Content Strategy + AdSense

### 5.1 Editorial Tone
- **Opinião clara** (não "neutro", mas factual)
- **Exemplos:**
  - "Praia do Farol virou refúgio de milionários — preços subiram 40% em 6 meses"
  - "Comercial em centro virou bom negócio? Análise real"
  - "Lançamento em Parque Califórnia surpreende pelo preço"
- **Comprimento:** 200-300 palavras, mobile-first
- **CTA:** "Quer acompanhar lançamentos? Assine newsletter" + WhatsApp link

### 5.2 SEO Strategy
- **Keywords-alvo:**
  - "imóvel Campos dos Goytacazes"
  - "comprar/alugar [bairro específico]"
  - "lançamento residencial/comercial Campos"
  - Long-tail: "apartamento praia do farol", "sala comercial centro campos"
- **On-page:**
  - H1 opinativo, H2 dados + análise
  - Meta description com opinião (melhor CTR)
  - Schema.org: BreadcrumbList, Article, NewsArticle
  - Internal links: entre bairros/tipos (bom pra indexação)
- **Off-page:**
  - Newsletter (SEO signal: engagement)
  - Possível: guest posts em sites regionais

### 5.3 AdSense Compliance (CRÍTICO)
Google penaliza conteúdo YMYL (Your Money Your Life) facilmente. Imóveis é sensível.

**✅ Obrigatório:**
- Conteúdo **factual** + **fontes transparentes** (Zap, VivaReal, dados públicos)
- **E-E-A-T (Expertise, Experience, Authority, Trustworthiness):**
  - Autor bio: "Analista mercado imobiliário Campos desde X anos"
  - Sobre página com credenciais
  - Byline em cada post
- **Disclaimer:** "Conteúdo informativo. Não é recomendação de investimento."
- **Disclosure:** "Este site contém links afiliados (se houver programa VivaReal/Zap)"
- Links externos apenas para **portais confiáveis** (Zap, VivaReal, prefeitura, cartórios)

**❌ Evitar:**
- Promessas falsas ("ganhe R$10k rápido", "investimento seguro")
- Dicas de investimento sem disclaimer
- Previsões de preço sem dados históricos
- Clickbait sensacionalista puro (sem dado por trás)

**✅ Ad placements seguros:**
- Display ads (sidebar, rodapé)
- In-feed ads (entre posts na lista)
- Link units (navigation bar)
- **Evitar:** ads perto de política/sensível, ads disruptivos (pop-up)

### 5.4 AdSense Setup
1. Criar conta Google AdSense
2. Integrar tags:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX"></script>
   ```
3. Placements no Next.js:
   - Post layout (2-3 ads by post)
   - Sidebar (sticky ad)
   - After post CTA
4. Monitor: RPM, pageviews, bounce rate, bloqueia if < R$5/1k views

---

## 6. Quality Gates + Monitoring

### 6.1 Automated Quality Checks
Posts precisam passar:
- ✅ Tem título, body, tags? (estrutura)
- ✅ Não é duplicado? (hash conteúdo vs 7 dias)
- ✅ Título não é clickbait extremo? (sem "CHOCANTE", "URGENTE" sozinho, sem ???)
- ✅ Contém dados? (preço, bairro, metragem, ou dados públicos)
- ✅ Sem red flags? (sem prejudicial content, misinformation markers)

**Threshold:** Se passa 70%+ checks, publica. Senão, Slack alert + human review.

### 6.2 Monitoring 24/7
- **Cron check** (hourly): Verificar se últimas 3 rodadas rodaram sem erro
- **Alerts** (Slack):
  - Agent falhou (motivo + stack trace)
  - Posts não publicados (fila vazia?)
  - Scraper zerou (portais offline?)
- **Auto-retry:** 3 tentativas exponencial (1min, 5min, 15min)
- **Fallback:** Se 3 falhas, pause auto-publish + notify human

### 6.3 Metrics Dashboard
**Supabase + Google Analytics:**
- Posts/dia, taxa sucesso
- Avg bounce rate, time on page
- RPM (Google AdSense API)
- Newsletter subscribers growth
- Top trending bairros (posts mais clicados)
- Weekly report: RPM, pageviews, conversão

### 6.4 Escalação Manual
- **RPM cai > 20% semana:** Review conteúdo qualidade? Adulterated ads? CTR baixo?
- **Posts falhando > 20% rodada:** Debug scraper (layouts mudaram?), agent logs
- **Bounce rate alto:** Revisar títulos (clickbait?), mobile experience, ads disruptivos

---

## 7. Roadmap (4 Fases)

| Fase | Timeline | Objetivos | Deliverables |
|------|----------|-----------|--------------|
| **1: MVP** | Week 1-2 | 3 posts/dia, manual publish | Next.js app, Firecrawl scraper, Claude writer, manual webhook |
| **2: Auto** | Week 3-4 | Auto-publish, monitoring | Webhook automation, Slack alerts, quality gates (70% threshold) |
| **3: Scale** | Week 5-6 | 5-10 posts/dia, trending | Analyzer sofisticado, múltiplas fontes, newsletter, ad otimização |
| **4: Revenue** | Week 7+ | RPM otimizado, refinamento | A/B testing, afiliados (se houver), community (comentários) |

---

## 8. Success Criteria

- ✅ MVP: 3 posts/dia, 0 manual intervention por 7 dias
- ✅ Auto: 5-10 posts/dia, auto-publish, <5% failure rate
- ✅ Revenue: RPM ≥ R$8/1k views (imóveis deve alcançar), 1k+ pageviews/mês
- ✅ Quality: 70%+ posts passam quality gates, bounce rate <60%

---

## 9. Risks + Mitigações

| Risk | Severidade | Mitigation |
|------|-----------|-----------|
| AdSense rejeição/desmonetização | Alta | E-E-A-T bio, disclaimer, sourceado |
| Scraper quebra (portais mudaram) | Média | Monitoramento automático, fallback manual |
| Conteúdo baixa qualidade | Média | Quality gates, human review fallback |
| RPM baixo (imóvel local) | Média | SEO otimização, multiple income streams |
| Legal (copyright, direitos) | Baixa | Sourced sempre (Zap/VivaReal), não scrape texto anúncio verbatim |

---

## 10. Próximos Passos

1. ✅ Design aprovado
2. → **Writing-plans:** Criar plano implementação detalhado (tasks, dependências, timelines)
3. → **Executing-plans:** Implementar em 4 fases

