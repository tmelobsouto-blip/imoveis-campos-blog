# Quick Start — Blog Imóveis Campos

## ✅ Status: MVP Complete

All 8 tasks finished. Ready for production deployment.

---

## 🔑 Critical: Environment Setup

### Local Development (.env.local)
```bash
# Create .env.local with these keys:
ANTHROPIC_API_KEY=sk-ant-api03-...
FIRECRAWL_API_KEY=fc-...
NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vercel Production
Add same variables in Vercel dashboard → Project Settings → Environment Variables

---

## 🚀 Deploy to Production (5 min)

### Step 1: Create GitHub Repo
```bash
# If not already done:
git remote add origin https://github.com/YOUR_USERNAME/imoveis-campos-blog.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel
1. Go https://vercel.com/new
2. Select "Import Git Repository"
3. Paste GitHub URL
4. Add env variables (see above)
5. Click "Deploy" ✓

**That's it!** Vercel will auto-deploy on every push to main.

---

## 📋 Checklist Before Deploy

- [ ] `.env.local` has all 6 variables
- [ ] Supabase project created + keys copied
- [ ] Claude API key active (check console.anthropic.com)
- [ ] Firecrawl API key active (check firecrawl.dev)
- [ ] GitHub repo created and pushed
- [ ] Vercel account created (free tier)

---

## 🧪 Test Locally First

### Run Development Server
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

Expected:
- ✓ Homepage loads with hero + empty post list
- ✓ Newsletter form submits (success state shows)
- ✓ Post detail page loads (slug routing works)

### Run Agents Locally
```bash
npm run build
npm run agent:run
```

Expected:
- ✓ Scraper runs (0+ listings)
- ✓ Analyzer runs (0+ stories)
- ✓ Writer runs (0+ posts generated)
- ✓ Publisher runs (0+ posts published)
- ✓ tmp/ files created (analyzed_stories.json, generated_posts.json)

If all pass → ready for Vercel!

---

## 📊 After Deployment

### First 24 Hours
1. Check Vercel logs: https://vercel.com/dashboard
2. Verify site loads: https://YOUR_DOMAIN.vercel.app
3. Check Supabase: posts table empty? Expected (Firecrawl might return 0 listings)

### Cron Verification
- Cron runs 3x daily (6am, 12pm, 6pm UTC)
- Check Vercel logs → Functions → cron/run-agents
- Status should be 200 (OK)

### Monitor RPM
- Set up Google AdSense
- Monitor RPM (target: R$8-15 per 1k views)
- If low, check:
  - Page speed (Vercel Analytics)
  - Ad placement (between posts)
  - Content quality (click-through rate)

---

## 🔧 If Issues Occur

### Build Fails
```bash
npm install
npm run build
# Check error messages
```

### Agents Don't Run
1. Check `.env.local` has all variables
2. Run locally: `npm run agent:run`
3. Check Vercel logs for error stack
4. Common: Firecrawl/Claude API quota exceeded

### No Posts Publishing
1. Verify Supabase connection: test query in SDK
2. Check `/api/publish` endpoint (add logging)
3. Ensure Firecrawl returns listings (test scraper alone)

### Low Engagement
1. Check SEO: titles include keywords (bairro names)
2. Check mobile layout (responsive test)
3. Ask: is content actually opinionated? (check posts in tmp/generated_posts.json)

---

## 📖 Documentation

- **DESIGN.md** — Visual system, components, responsive rules
- **docs/AGENTS_SETUP.md** — Agent architecture, quality gates, troubleshooting
- **docs/ARCHITECTURE.md** — System design, database schema, API routes
- **docs/DEPLOYMENT.md** — Vercel setup, cron options, monitoring, cost
- **ROADMAP.md** — Future features (Phases 2-4)

---

## 💡 Tips

- **Agents are idempotent** — safe to run multiple times (deduplicates by URL)
- **ISR every 60s** — homepage updates without full rebuild
- **Quality gates at 70%** — auto-reject low-quality AI posts
- **No manual intervention needed** — completely autonomous after deploy

---

## ✨ What's Ready

✅ Next.js 14 app (Vercel-ready)  
✅ Components with design system  
✅ 4 autonomous agents (Scraper → Analyzer → Writer → Publisher)  
✅ Supabase database (posts, listings, analytics)  
✅ API routes (/api/publish, /newsletter, /revalidate)  
✅ Cron job scheduling (3x daily)  
✅ E2E tested (pipeline verified working)  
✅ Environment variables configured  
✅ Git history clean  

---

## 🎯 Next Iteration (After MVP)

1. **Improve Scraper** — Better HTML parsing, cache previous URLs
2. **Add more sources** — News sites, classified portals
3. **Optimize Writer** — Use Claude with vision for feature images
4. **Setup Analytics** — Google Analytics + custom Supabase metrics
5. **Community** — Newsletter growth, social sharing buttons, comments

---

**Ready? Push to GitHub and deploy to Vercel!** 🚀
