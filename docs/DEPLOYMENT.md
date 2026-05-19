# Deployment Guide — Blog Imóveis Campos

## Vercel Deployment

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git status
git add .
git commit -m "feat: ready for production deployment"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Create repo `imoveis-campos-blog`
3. Push local repo:
```bash
git remote add origin https://github.com/YOUR_USERNAME/imoveis-campos-blog.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to https://vercel.com/new
2. Import GitHub repository
3. Configure environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon key
   - `SUPABASE_SERVICE_ROLE_KEY` = service role key
   - `ANTHROPIC_API_KEY` = Claude API key
   - `FIRECRAWL_API_KEY` = Firecrawl API key
   - `CRON_SECRET` = random string for cron auth
   - `SLACK_WEBHOOK_URL` = optional, for alerts

4. Deploy!

### Step 4: Cron Jobs
Vercel will automatically set up 3 cron jobs (via `vercel.json`):
- 6am UTC: `POST /api/cron/run-agents`
- 12pm UTC: `POST /api/cron/run-agents`
- 6pm UTC: `POST /api/cron/run-agents`

**Note:** Currently, cron endpoint is stubbed (returns 200 OK). To run agents in production, use one of:

#### Option A: External Job Queue (Recommended)
Use **Upstash QStash** to trigger agents:
1. Create Upstash account
2. Set webhook URL to `POST /api/webhooks/agents`
3. Upstash calls webhook → agents run
4. Cost: ~$0

#### Option B: Separate Vercel Function
Deploy agents as separate function:
1. Create `api/agents/_runner.ts` as Node.js function
2. Cron calls `_runner.ts` → spawns all agents
3. Cost: function runtime charges

#### Option C: GitHub Actions
Use GitHub Actions to trigger cron:
1. Schedule workflow 3x/day
2. Workflow calls deployed API endpoint
3. Free within usage limits

## Local Development

### Run Pipeline Locally
```bash
npm run agent:run
```

### Run Individual Agents
```bash
npm run agent:scraper
npm run agent:analyzer
npm run agent:writer
npm run agent:publisher
```

### Development Server
```bash
npm run dev
# Visit http://localhost:3000
```

## Monitoring

### Vercel Logs
https://vercel.com/dashboard → Project → Deployments → Logs

### Supabase
- Posts table: https://app.supabase.com → posts
- Check: number of posts, publishing dates

### Google Analytics
- RPM, pageviews, bounce rate
- Set up via Google AdSense dashboard

### Slack Alerts
Optional: Set `SLACK_WEBHOOK_URL` to receive alerts on publish success/failure.

## Troubleshooting

### Cron Not Running
1. Check Vercel logs
2. Verify `CRON_SECRET` environment variable set
3. Ensure `vercel.json` is in root

### Posts Not Publishing
1. Check Supabase connection
2. Run `npm run agent:run` locally to debug
3. Check API endpoint `/api/publish`

### API Key Issues
- `ANTHROPIC_API_KEY`: Check quota at console.anthropic.com
- `FIRECRAWL_API_KEY`: Check quota at firecrawl.dev
- Supabase keys: Rotate via dashboard if compromised

## Cost Estimation

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | $0 | Free tier sufficient |
| Supabase | $0 | Free tier (5GB) |
| Claude API | R$200-400/month | ~45-90 calls/day × R$200-400 |
| Firecrawl | R$100-200/month | ~6 scrapes/day × R$100-200 |
| **Total** | **R$300-600/month** | Within R$300-1000 budget |

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up cron jobs
3. → Monitor first 24h (check logs, metrics)
4. → Optimize scraper (if listings returning 0)
5. → Set up AdSense monetization
6. → Improve content quality based on CTR/RPM metrics
