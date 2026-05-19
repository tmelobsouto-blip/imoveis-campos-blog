import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface TrendingStory {
  type: 'new_launch' | 'price_move' | 'neighborhood_hotspot';
  neighborhood: string;
  count: number;
  relevanceScore: number;
  details: string;
  listings: any[];
}

async function detectNewListings(hours = 24): Promise<TrendingStory[]> {
  console.log(`🆕 Detecting new listings from last ${hours}h...`);

  const cutoff = new Date(Date.now() - hours * 3600 * 1000).toISOString();

  const { data: newListings, error } = await supabase
    .from('listings')
    .select('*')
    .gt('created_at', cutoff)
    .order('neighborhood')
    .order('created_at', { ascending: false });

  if (error || !newListings?.length) {
    console.log('  No new listings');
    return [];
  }

  // Group by neighborhood
  const byNeighborhood = new Map<string, any[]>();
  for (const listing of newListings) {
    const key = listing.neighborhood;
    if (!byNeighborhood.has(key)) {
      byNeighborhood.set(key, []);
    }
    byNeighborhood.get(key)!.push(listing);
  }

  const stories: TrendingStory[] = [];
  for (const [neighborhood, listings] of byNeighborhood) {
    if (listings.length >= 2) {
      stories.push({
        type: 'new_launch',
        neighborhood,
        count: listings.length,
        relevanceScore: 100, // New listings are highest priority
        details: `${listings.length} new listings in ${neighborhood}`,
        listings: listings.slice(0, 3),
      });
    }
  }

  console.log(`  ✓ Found ${stories.length} neighborhoods with new activity`);
  return stories;
}

async function detectPriceMovements(): Promise<TrendingStory[]> {
  console.log('💰 Detecting price movements...');

  // For MVP, simplified version: just look for price range clusters
  const { data: recentListings } = await supabase
    .from('listings')
    .select('*')
    .gt('price', 0)
    .order('created_at', { ascending: false })
    .limit(50);

  if (!recentListings?.length) {
    console.log('  No price data available');
    return [];
  }

  // Group by neighborhood and analyze price clusters
  const byNeighborhood = new Map<string, any[]>();
  for (const listing of recentListings) {
    const key = listing.neighborhood;
    if (!byNeighborhood.has(key)) {
      byNeighborhood.set(key, []);
    }
    byNeighborhood.get(key)!.push(listing);
  }

  const stories: TrendingStory[] = [];
  for (const [neighborhood, listings] of byNeighborhood) {
    if (listings.length >= 3) {
      const prices = listings
        .filter(l => l.price)
        .map(l => l.price)
        .sort((a, b) => a - b);

      if (prices.length > 0) {
        const minPrice = prices[0];
        const maxPrice = prices[prices.length - 1];
        const avgPrice =
          prices.reduce((a, b) => a + b, 0) / prices.length;

        if (maxPrice > minPrice * 1.3) {
          // 30%+ variation
          stories.push({
            type: 'price_move',
            neighborhood,
            count: listings.length,
            relevanceScore: 75,
            details: `Price range: R$${Math.round(minPrice/1000)}k-${Math.round(maxPrice/1000)}k`,
            listings: listings.slice(0, 3),
          });
        }
      }
    }
  }

  console.log(`  ✓ Found ${stories.length} neighborhoods with price movement`);
  return stories;
}

async function detectHotspots(): Promise<TrendingStory[]> {
  console.log('🔥 Detecting neighborhood hotspots...');

  const { data: listings } = await supabase
    .from('listings')
    .select('neighborhood')
    .order('created_at', { ascending: false })
    .limit(100);

  if (!listings?.length) {
    console.log('  No data available');
    return [];
  }

  const counts = new Map<string, number>();
  for (const { neighborhood } of listings as any[]) {
    counts.set(neighborhood, (counts.get(neighborhood) || 0) + 1);
  }

  const stories: TrendingStory[] = [];
  for (const [neighborhood, count] of counts) {
    if (count >= 5) {
      // At least 5 listings in recent data
      stories.push({
        type: 'neighborhood_hotspot',
        neighborhood,
        count,
        relevanceScore: 50,
        details: `${count} listings recently added`,
        listings: [],
      });
    }
  }

  console.log(`  ✓ Found ${stories.length} hotspots`);
  return stories;
}

interface RankedStory extends TrendingStory {
  rank: number;
}

async function rankAndSelect(allStories: TrendingStory[]): Promise<RankedStory[]> {
  console.log('\n🎯 Ranking stories by relevance...');

  // Score calculation
  const ranked: RankedStory[] = allStories
    .map((story, idx) => ({
      ...story,
      rank: idx + 1,
    }))
    .sort((a, b) => {
      // Sort by: type priority → relevance score → count
      const typePriority = { new_launch: 0, price_move: 1, neighborhood_hotspot: 2 };
      const typeDiff =
        typePriority[a.type as keyof typeof typePriority] -
        typePriority[b.type as keyof typeof typePriority];

      if (typeDiff !== 0) return typeDiff;

      const scoreDiff = b.relevanceScore - a.relevanceScore;
      if (scoreDiff !== 0) return scoreDiff;

      return b.count - a.count;
    })
    .slice(0, 10) // Top 10 stories
    .map((story, idx) => ({ ...story, rank: idx + 1 }));

  for (const story of ranked.slice(0, 3)) {
    console.log(
      `  #${story.rank}: [${story.type}] ${story.neighborhood} - ${story.details} (score: ${story.relevanceScore})`
    );
  }

  return ranked;
}

async function main() {
  try {
    console.log('🚀 Starting Analyzer Agent...\n');

    const [newListings, priceMovements, hotspots] = await Promise.all([
      detectNewListings(24),
      detectPriceMovements(),
      detectHotspots(),
    ]);

    const allStories = [...newListings, ...priceMovements, ...hotspots];
    console.log(`\n📊 Total stories detected: ${allStories.length}`);

    const ranked = await rankAndSelect(allStories);

    // Output top stories for Writer agent
    const topStories = ranked.slice(0, 3);
    console.log(`\n✅ Top ${topStories.length} stories selected for content generation:`);
    console.log(JSON.stringify(topStories, null, 2));

    // Save to file for Writer agent to consume
    const fs = await import('fs').then(m => m.promises);
    await fs.writeFile(
      'tmp/analyzed_stories.json',
      JSON.stringify(topStories, null, 2)
    );

    console.log(`\n📄 Stories saved to tmp/analyzed_stories.json`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
  } catch (err) {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  }
}

main();
