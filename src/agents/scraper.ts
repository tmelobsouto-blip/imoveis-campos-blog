import 'dotenv/config';
import FirecrawlApp from 'firecrawl';
import { createClient } from '@supabase/supabase-js';

const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY! });
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ScrapedListing {
  source: 'zap' | 'vivareal';
  url: string;
  title: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  neighborhood: string;
  type: 'residential' | 'commercial';
  transaction_type: 'sale' | 'rent';
  description?: string;
}

async function scrapeZap(): Promise<ScrapedListing[]> {
  console.log('🔍 Scraping Zap Imóveis (Campos dos Goytacazes)...');

  const listings: ScrapedListing[] = [];

  try {
    // Zap Imóveis search URL for Campos dos Goytacazes
    const zapUrls = [
      'https://www.zapimoveis.com.br/venda/imoveis/rj+campos-dos-goytacazes/',
      'https://www.zapimoveis.com.br/aluguel/imoveis/rj+campos-dos-goytacazes/',
    ];

    for (const url of zapUrls) {
      const isRent = url.includes('aluguel');
      try {
        const response = await firecrawl.scrape(url, {
          formats: ['html'],
          timeout: 30000,
        });

        const html = (response as any).markdown || (response as any).html || '';
        if (!html) {
          console.warn(`⚠️  Zap scrape returned empty for ${url}`);
          continue;
        }

        const listings_raw = parseZapHTML(html, isRent ? 'rent' : 'sale');
        listings.push(...listings_raw);
      } catch (err) {
        console.warn(`⚠️  Zap scrape error for ${url}:`, err);
      }
    }

    console.log(`✓ Zap: ${listings.length} listings scraped`);
    return listings;
  } catch (err) {
    console.error('❌ Zap scrape error:', err);
    return [];
  }
}

async function scrapeVivaReal(): Promise<ScrapedListing[]> {
  console.log('🔍 Scraping VivaReal (Campos dos Goytacazes)...');

  const listings: ScrapedListing[] = [];

  try {
    const vivarealUrls = [
      'https://www.vivareal.com.br/venda/imoveis/rj+campos-dos-goytacazes/',
      'https://www.vivareal.com.br/aluguel/imoveis/rj+campos-dos-goytacazes/',
    ];

    for (const url of vivarealUrls) {
      const isRent = url.includes('aluguel');
      try {
        const response = await firecrawl.scrape(url, {
          formats: ['html'],
          timeout: 30000,
        });

        const html = (response as any).markdown || (response as any).html || '';
        if (!html) {
          console.warn(`⚠️  VivaReal scrape returned empty for ${url}`);
          continue;
        }

        const listings_raw = parseVivaRealHTML(html, isRent ? 'rent' : 'sale');
        listings.push(...listings_raw);
      } catch (err) {
        console.warn(`⚠️  VivaReal scrape error for ${url}:`, err);
      }
    }

    console.log(`✓ VivaReal: ${listings.length} listings scraped`);
    return listings;
  } catch (err) {
    console.error('❌ VivaReal scrape error:', err);
    return [];
  }
}

function parseZapHTML(html: string, transactionType: 'sale' | 'rent'): ScrapedListing[] {
  const listings: ScrapedListing[] = [];

  // Simple regex-based parsing (adjust based on actual HTML structure)
  const itemRegex =
    /href="(https:\/\/www\.zapimoveis\.com\.br\/[^"]+)"/g;
  let match;

  while ((match = itemRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.includes('/p/')) {
      listings.push({
        source: 'zap',
        url,
        title: `Zap listing - ${url.split('/p/')[1]}`,
        neighborhood: 'Campos dos Goytacazes',
        type: 'residential',
        transaction_type: transactionType,
      });
    }
  }

  return listings.slice(0, 20); // Limit to 20 per source
}

function parseVivaRealHTML(
  html: string,
  transactionType: 'sale' | 'rent'
): ScrapedListing[] {
  const listings: ScrapedListing[] = [];

  // Simple regex-based parsing (adjust based on actual HTML structure)
  const itemRegex = /href="(https:\/\/www\.vivareal\.com\.br\/[^"]+)"/g;
  let match;

  while ((match = itemRegex.exec(html)) !== null) {
    const url = match[1];
    if (url.includes('/imovel/')) {
      listings.push({
        source: 'vivareal',
        url,
        title: `VivaReal listing - ${url.split('/imovel/')[1]}`,
        neighborhood: 'Campos dos Goytacazes',
        type: 'residential',
        transaction_type: transactionType,
      });
    }
  }

  return listings.slice(0, 20); // Limit to 20 per source
}

async function deduplicateAndStore(listings: ScrapedListing[]) {
  console.log(`📊 Deduplicating ${listings.length} listings...`);

  let newCount = 0;
  let existingCount = 0;

  for (const listing of listings) {
    const { data: existing } = await supabase
      .from('listings')
      .select('id')
      .eq('source', listing.source)
      .eq('url', listing.url)
      .single();

    if (existing) {
      existingCount++;
      continue;
    }

    const { error } = await supabase.from('listings').insert([
      {
        source: listing.source,
        url: listing.url,
        title: listing.title,
        price: listing.price,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        area: listing.area,
        neighborhood: listing.neighborhood,
        type: listing.type,
        transaction_type: listing.transaction_type,
        description: listing.description,
      },
    ]);

    if (error) {
      console.warn(`⚠️  Insert failed for ${listing.url}:`, error);
    } else {
      newCount++;
    }
  }

  console.log(
    `✓ Stored: ${newCount} new, ${existingCount} existing, ${listings.length - newCount - existingCount} skipped`
  );

  return { newCount, existingCount };
}

async function main() {
  try {
    console.log('🚀 Starting Firecrawl Scraper Agent...\n');

    const [zapListings, vivarealListings] = await Promise.all([
      scrapeZap(),
      scrapeVivaReal(),
    ]);

    const allListings = [...zapListings, ...vivarealListings];
    console.log(`\n📦 Total listings collected: ${allListings.length}`);

    const { newCount, existingCount } = await deduplicateAndStore(allListings);

    console.log(`\n✅ Scraper completed!`);
    console.log(`   New listings: ${newCount}`);
    console.log(`   Existing: ${existingCount}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);
  } catch (err) {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  }
}

main();
