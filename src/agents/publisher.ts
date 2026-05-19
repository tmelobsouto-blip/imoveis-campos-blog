import 'dotenv/config';
import { readFile } from 'fs/promises';

interface GeneratedPost {
  title: string;
  slug: string;
  body: string;
  tags: string[];
  featuredImage: string;
  cta: string;
}

interface QualityGate {
  name: string;
  check: (post: GeneratedPost) => boolean;
}

const QUALITY_GATES: QualityGate[] = [
  {
    name: 'Has title',
    check: (p) => !!p.title && p.title.length > 0,
  },
  {
    name: 'Has body',
    check: (p) => !!p.body && p.body.length > 50,
  },
  {
    name: 'Has slug',
    check: (p) => !!p.slug && p.slug.length > 0,
  },
  {
    name: 'Has tags',
    check: (p) => Array.isArray(p.tags) && p.tags.length >= 2,
  },
  {
    name: 'Not duplicate (slug length)',
    check: (p) => p.slug.length <= 100,
  },
  {
    name: 'No extreme clickbait',
    check: (p) => !p.title.match(/CHOCANTE|URGENTE|!!!/),
  },
  {
    name: 'Has data/context',
    check: (p) => !!p.body.match(/\d{3,}|[Rr]\$|%|preço|bairro|metros/),
  },
];

function validatePost(post: GeneratedPost): { pass: boolean; score: number; failures: string[] } {
  const failures: string[] = [];

  for (const gate of QUALITY_GATES) {
    if (!gate.check(post)) {
      failures.push(gate.name);
    }
  }

  const score = ((QUALITY_GATES.length - failures.length) / QUALITY_GATES.length) * 100;
  const pass = score >= 70; // 70% threshold

  return { pass, score, failures };
}

async function publishPost(
  post: GeneratedPost,
  siteUrl: string
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const payload = {
    title: post.title,
    slug: post.slug,
    body: post.body,
    tags: post.tags,
    featured_image: post.featuredImage,
    author: 'Blog Imóveis Campos',
  };

  const maxRetries = 3;
  const delays = [60000, 300000, 900000]; // 1min, 5min, 15min

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(`${siteUrl}/api/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        return { success: true, postId: result.postId };
      }

      if (attempt < maxRetries - 1) {
        const delay = delays[attempt];
        console.log(
          `  ⏳ Retry in ${delay / 60000}min... (attempt ${attempt + 1}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (err) {
      if (attempt < maxRetries - 1) {
        const delay = delays[attempt];
        console.log(
          `  ⏳ Retry in ${delay / 60000}min... (attempt ${attempt + 1}/${maxRetries})`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts`,
  };
}

async function sendSlackAlert(
  webhookUrl: string,
  message: string,
  details?: string
): Promise<void> {
  if (!webhookUrl) {
    console.log('  (Slack alert skipped - no webhook configured)');
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: message,
        blocks: details
          ? [
              {
                type: 'section',
                text: { type: 'mrkdwn', text: message },
              },
              {
                type: 'section',
                text: { type: 'mrkdwn', text: details },
              },
            ]
          : undefined,
      }),
    });
  } catch (err) {
    console.warn('⚠️  Slack alert failed:', err);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Publisher Agent...\n');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const slackWebhook = process.env.SLACK_WEBHOOK_URL || '';

    let posts: GeneratedPost[] = [];
    try {
      const content = await readFile('tmp/generated_posts.json', 'utf-8');
      posts = JSON.parse(content);
    } catch (err) {
      console.error('❌ Could not read tmp/generated_posts.json');
      await sendSlackAlert(slackWebhook, '❌ Publisher: No posts to publish', `Error: ${err}`);
      process.exit(1);
    }

    console.log(`📦 Loaded ${posts.length} posts to publish\n`);

    const results = {
      published: [] as string[],
      rejected: [] as string[],
      failed: [] as string[],
    };

    for (const post of posts) {
      const validation = validatePost(post);

      if (!validation.pass) {
        console.log(
          `❌ [REJECTED] ${post.title}`
        );
        console.log(
          `   Score: ${validation.score.toFixed(0)}% (threshold: 70%)`
        );
        console.log(`   Failures: ${validation.failures.join(', ')}`);
        results.rejected.push(post.title);
        continue;
      }

      console.log(`✅ [PASSED QC] ${post.title}`);
      console.log(`   Score: ${validation.score.toFixed(0)}%`);

      const pubResult = await publishPost(post, siteUrl);

      if (pubResult.success) {
        console.log(`   🌐 Published at ${siteUrl}/posts/${post.slug}`);
        results.published.push(post.title);
      } else {
        console.log(`   ❌ Publish failed: ${pubResult.error}`);
        results.failed.push(post.title);
      }
    }

    // Summary
    console.log(`\n📊 Publisher Summary:`);
    console.log(`   ✅ Published: ${results.published.length}`);
    console.log(`   ⚠️  Rejected (QC): ${results.rejected.length}`);
    console.log(`   ❌ Failed (Publish): ${results.failed.length}`);

    // Slack alert
    const slackSummary = `✅ ${results.published.length} posts published\n` +
      (results.published.length > 0
        ? results.published.map((t) => `• ${t}`).join('\n') + '\n'
        : '') +
      (results.rejected.length > 0
        ? `⚠️ ${results.rejected.length} rejected (QC)\n`
        : '') +
      (results.failed.length > 0
        ? `❌ ${results.failed.length} failed (publish)\n`
        : '');

    await sendSlackAlert(
      slackWebhook,
      '📤 Publisher Agent Completed',
      slackSummary
    );

    console.log(`\n   Timestamp: ${new Date().toISOString()}`);

    // Exit with error if any failures
    if (results.failed.length > 0) {
      console.error(`\n⚠️  ${results.failed.length} posts failed to publish`);
      process.exit(1);
    }
  } catch (err) {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  }
}

main();
