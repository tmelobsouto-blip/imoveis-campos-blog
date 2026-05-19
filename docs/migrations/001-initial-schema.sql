-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured_image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Blog Imóveis Campos',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Listings table (real estate data from scrapers)
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL CHECK (source IN ('zap', 'vivareal', 'local')),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  price NUMERIC,
  bedrooms INTEGER,
  bathrooms NUMERIC,
  area NUMERIC,
  neighborhood TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('residential', 'commercial')),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('sale', 'rent')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(source, url)
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click', 'share')),
  source TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_neighborhood ON listings(neighborhood);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listings_source_url ON listings(source, url);
CREATE INDEX IF NOT EXISTS idx_analytics_post_id ON analytics_events(post_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies for posts (public read, authenticated write)
CREATE POLICY posts_public_read ON posts FOR SELECT USING (true);
CREATE POLICY posts_authenticated_write ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY posts_authenticated_update ON posts FOR UPDATE USING (true);

-- Policies for listings (public read only)
CREATE POLICY listings_public_read ON listings FOR SELECT USING (true);
CREATE POLICY listings_authenticated_insert ON listings FOR INSERT WITH CHECK (true);

-- Policies for analytics (authenticated write)
CREATE POLICY analytics_insert ON analytics_events FOR INSERT WITH CHECK (true);
