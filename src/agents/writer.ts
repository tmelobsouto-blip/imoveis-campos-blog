import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import { readFile } from 'fs/promises';

const client = new Anthropic();

interface Story {
  type: 'new_launch' | 'price_move' | 'neighborhood_hotspot';
  neighborhood: string;
  count: number;
  relevanceScore: number;
  details: string;
  listings: any[];
}

interface GeneratedPost {
  title: string;
  slug: string;
  body: string;
  tags: string[];
  featuredImage: string;
  cta: string;
}

async function slugify(text: string): Promise<string> {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);
}

async function generatePost(story: Story): Promise<GeneratedPost> {
  const prompt = buildPrompt(story);

  console.log(`\n📝 Generating post for: ${story.neighborhood} (${story.type})`);

  const message = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type');
  }

  // Parse JSON response from Claude
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from Claude response');
  }

  const parsed = JSON.parse(jsonMatch[0]);
  const slug = await slugify(parsed.title);

  return {
    title: parsed.title,
    slug,
    body: parsed.body,
    tags: parsed.tags || [],
    featuredImage: parsed.featured_image || 'https://via.placeholder.com/800x400',
    cta: parsed.cta || 'Quer acompanhar lançamentos? Assine nossa newsletter',
  };
}

function buildPrompt(story: Story): string {
  return `You are a real estate analyst writing opinionated blog posts for a Brazilian real estate blog focused on Campos dos Goytacazes.

Story data:
- Type: ${story.type}
- Neighborhood: ${story.neighborhood}
- Count: ${story.count} listings
- Details: ${story.details}
- Sample listings: ${JSON.stringify(story.listings.slice(0, 2))}

Generate a blog post in Portuguese with:
1. Opinionated title (not clickbait, but with a clear opinion)
2. 200-300 word body with factual data + analysis
3. Relevant tags (at least 3)
4. A featured image search query
5. A call-to-action

Important:
- Be opinionated but factual
- Include specific data (prices, neighborhoods, market trends)
- No extreme clickbait ("CHOCANTE", "URGENTE" alone)
- Include a disclaimer that this is informational, not investment advice
- CTA should encourage newsletter signup or WhatsApp contact

Respond ONLY with valid JSON:
{
  "title": "opinionated title here",
  "body": "200-300 words...",
  "tags": ["tag1", "tag2", "tag3"],
  "featured_image": "search query for unsplash",
  "cta": "call to action text"
}`;
}

async function loadStoriesFromFile(): Promise<Story[]> {
  try {
    const content = await readFile('tmp/analyzed_stories.json', 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.warn('⚠️  Could not read tmp/analyzed_stories.json, using mock data');
    return [
      {
        type: 'new_launch',
        neighborhood: 'Praia do Farol',
        count: 5,
        relevanceScore: 100,
        details: '5 new luxury listings',
        listings: [
          {
            title: 'Apartamento luxo Praia do Farol',
            price: 1500000,
            bedrooms: 3,
            area: 150,
          },
        ],
      },
    ];
  }
}

async function main() {
  try {
    console.log('🚀 Starting Writer Agent...\n');

    const stories = await loadStoriesFromFile();
    console.log(`📖 Loaded ${stories.length} stories to write about`);

    const posts: GeneratedPost[] = [];

    for (const story of stories.slice(0, 3)) {
      try {
        const post = await generatePost(story);
        posts.push(post);
        console.log(`  ✓ Generated: ${post.title}`);
      } catch (err) {
        console.error(`  ❌ Failed to generate post for ${story.neighborhood}:`, err);
      }
    }

    console.log(`\n✅ Writer completed! Generated ${posts.length} posts`);

    // Save posts for Publisher agent
    const fs = await import('fs').then(m => m.promises);
    await fs.mkdir('tmp', { recursive: true });
    await fs.writeFile('tmp/generated_posts.json', JSON.stringify(posts, null, 2));

    console.log(`📄 Posts saved to tmp/generated_posts.json`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // Output summary
    for (const post of posts) {
      console.log(`\n📰 ${post.title}`);
      console.log(`   Slug: ${post.slug}`);
      console.log(`   Tags: ${post.tags.join(', ')}`);
    }
  } catch (err) {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  }
}

main();
