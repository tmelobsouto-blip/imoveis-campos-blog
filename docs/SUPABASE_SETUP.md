# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in / create account
3. New project → name: "imoveis-campos"
4. Region: US-East (or closest to you)
5. Database password: generate strong one
6. Wait for project to initialize (~2 min)

## 2. Get Connection Details

After project is ready:
- Go to Settings → API
- Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Copy `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Run Schema Migration

1. In Supabase console → SQL Editor
2. New query
3. Copy-paste content of `docs/migrations/001-initial-schema.sql`
4. Run (▶ button)
5. Confirm all tables created:
   - posts
   - listings
   - analytics_events

## 4. Update .env.local

Create `.env.local` (local only, never commit):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
CLAUDE_API_KEY=xxxxx
FIRECRAWL_API_KEY=xxxxx
...
```

Copy all values from `.env.example`, fill in from Supabase + APIs.

## 5. Test Connection

```bash
npm run dev
```

Open `http://localhost:3000` → should load without errors.

## Database Tables Reference

### posts
- `id` (UUID)
- `title` (TEXT) — post title
- `slug` (TEXT, UNIQUE) — URL-safe slug
- `body` (TEXT) — post content (HTML or Markdown)
- `tags` (TEXT[]) — array of tags (e.g., ["praia-farol", "residencial"])
- `featured_image_url` (TEXT, optional) — image URL
- `author` (TEXT) — default: "Blog Imóveis Campos"
- `published_at` (TIMESTAMP) — when published
- `created_at`, `updated_at` (TIMESTAMP)

### listings
- `id` (UUID)
- `source` (TEXT) — 'zap' | 'vivareal' | 'local'
- `url` (TEXT) — source URL (unique per source)
- `title` (TEXT) — listing title
- `price` (NUMERIC, optional)
- `bedrooms`, `bathrooms`, `area` (NUMERIC, optional)
- `neighborhood` (TEXT) — bairro
- `type` (TEXT) — 'residential' | 'commercial'
- `transaction_type` (TEXT) — 'sale' | 'rent'
- `description` (TEXT, optional) — listing description
- `created_at` (TIMESTAMP)

### analytics_events
- `id` (UUID)
- `post_id` (UUID) — FK to posts
- `event_type` (TEXT) — 'view' | 'click' | 'share'
- `source` (TEXT) — 'organic', 'direct', 'referral'
- `user_agent` (TEXT, optional)
- `created_at` (TIMESTAMP)

## Supabase Client Usage

In Next.js pages/components:

```typescript
import { getPosts, getPost, getTrending } from '@/lib/supabase';

// Get 10 latest posts
const { posts, total } = await getPosts(10, 0);

// Get single post by slug
const post = await getPost('praia-farol-milionarios');

// Get trending tags + posts
const { trending_posts, tags } = await getTrending();
```

## Publish New Post (via Agent)

The `/api/publish` endpoint will handle this:

```typescript
POST /api/publish
Body: {
  title: "Praia do Farol: refúgio de milionários",
  slug: "praia-farol-milionarios",
  body: "200-300 words...",
  tags: ["praia-farol", "residencial"],
  featured_image: "https://...",
  author: "Blog Imóveis Campos"
}
```

Response: `{ success: true, postId: "uuid" }`
