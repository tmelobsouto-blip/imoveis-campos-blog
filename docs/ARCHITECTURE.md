# Architecture — Blog Imóveis Campos

## System Design

```
AGENTS (3x/day @ 6am, 12pm, 6pm)
  ↓
Scraper Agent
  - Firecrawl scrape Zap/VivaReal/portais locais
  - Extract: preço, metragem, bairro, tipo, timestamp
  - Store Supabase `listings` table
  ↓
Analyzer Agent
  - Detecta trends: novidades, price moves, hotspots
  - Score relevância, seleciona top 2-3 stories
  - Output: ranked stories JSON
  ↓
Writer Agent
  - Claude 3.5 Sonnet: gera 2-3 posts opinativos curtos
  - Template: título opinativo, corpo 200-300 palavras, CTA
  - Output: {title, slug, body, tags, featuredImage}
  ↓
Publisher Agent
  - Quality gates (70% threshold)
  - POST webhook → Next.js API
  - Retry exponencial (1min, 5min, 15min)
  - Slack notifications (success/error)
  ↓
NEXT.JS APP (Vercel)
  - API endpoint: POST /api/publish
  - Inserts Supabase `posts` table
  - Triggers ISR revalidation (path-based)
  - Returns success/error
  ↓
BLOG (SSG + Dynamic)
  - Post list (homepage)
  - Individual posts (slug-based)
  - Trending bairros (sidebar widget)
  - Newsletter signup
  - AdSense ads (display, in-feed, link units)
```

## Database Schema (Supabase)

```sql
-- Posts
CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  featured_image_url TEXT,
  author TEXT DEFAULT 'Blog Imóveis Campos',
  published_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Listings (histórico scraping)
CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- 'zap', 'vivareal', 'local'
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  price NUMERIC,
  bedrooms INTEGER,
  bathrooms NUMERIC,
  area NUMERIC,
  neighborhood TEXT,
  type TEXT, -- 'residential', 'commercial'
  transaction_type TEXT, -- 'sale', 'rent'
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(source, url)
);

-- Analytics
CREATE TABLE analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id),
  event_type TEXT, -- 'view', 'click', 'share'
  source TEXT, -- 'organic', 'direct', 'referral'
  created_at TIMESTAMP DEFAULT now()
);
```

## API Routes

```
POST /api/publish
  - Body: { title, slug, body, tags, featuredImage }
  - Response: { success: bool, postId: uuid, error?: string }
  - Side-effects: Inserts Supabase, triggers ISR, returns URL

GET /api/posts
  - Query: ?limit=10&offset=0&sort=date
  - Response: { posts: Post[], total: number }

GET /api/posts/[slug]
  - Response: Post object

GET /api/trending
  - Response: { bairros: string[], topics: string[], trending_posts: Post[] }
```

## Environment Variables

| Key | Type | Purpose |
|-----|------|---------|
| `CLAUDE_API_KEY` | string | Claude API authentication |
| `FIRECRAWL_API_KEY` | string | Firecrawl scraping |
| `SUPABASE_URL` | string | Supabase endpoint |
| `SUPABASE_ANON_KEY` | string | Supabase client key |
| `SUPABASE_SERVICE_ROLE_KEY` | string | Supabase admin key (agents) |
| `UPSTASH_REDIS_URL` | string | Redis queue (optional) |
| `SLACK_WEBHOOK_URL` | string | Slack alerts |
| `AGENT_SCHEDULE_*` | cron | Agent execution times |

## Deployment

**Hosting:** Vercel (Next.js native)
**DB:** Supabase (PostgreSQL, edge-compatible)
**Agents:** Node.js scripts (cron via Vercel Cron, or external scheduler)
**Monitoring:** Slack webhook, Vercel Analytics, custom metrics in Supabase

## Scaling Considerations

- **Database:** Supabase free tier ~500MB, 1M rows comfortable (listings table)
- **API calls:** Claude API ~R$200-400/mth (45-90 calls/day @ $0.003-0.005/call)
- **Storage:** Featured images ~1-2MB/day (could store in Supabase Storage or external CDN)
- **Concurrency:** Agents run sequentially (6am, 12pm, 6pm), no conflicts

## Security

- `SUPABASE_SERVICE_ROLE_KEY` only in agent runtime (not in client)
- `.env` never committed (`.env.example` in repo)
- AdSense compliance: E-E-A-T, disclaimer on financial advice
- No user PII stored (unless newsletter signup)

## Monitoring + Alerting

**Health checks:**
- Last 3 agent runs completed? (cron check hourly)
- Posts published in last 24h? (minimum 15, assuming 3 agents × 5 posts)
- Failure rate < 5%? (alert if exceeds)

**Metrics to track:**
- Posts published per day
- Agent execution time
- Scraper coverage (# listings found)
- CTR, bounce rate, time-on-page (Google Analytics)
- RPM (AdSense API)
- Newsletter subscribers
