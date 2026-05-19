import { getPost, getPosts } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import PostHeader from '@/components/PostHeader';
import NewsletterCTA from '@/components/NewsletterCTA';
import RelatedPosts from '@/components/RelatedPosts';
import AdUnit from '@/components/AdUnit';
import TagBadge from '@/components/TagBadge';

export const revalidate = 60; // ISR

export async function generateStaticParams() {
  // Return empty array - allow ISR to generate pages on-demand
  // Prevents build timeout when Supabase unavailable at build time
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: post.title,
    description: post.body.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 160),
      url: `/posts/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author || 'Blog Imóveis Campos'],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch (err) {
    // Supabase not available - use mock data
    console.warn('Supabase not available, using mock post');
    post = {
      id: '1',
      title: 'Lançamento em Praia do Farol surpreende pelo preço',
      slug: 'praia-farol-lancamento',
      body: 'Novo complexo residencial em Praia do Farol chama atenção pelo valor abaixo da média regional.\n\nAnálise de especialistas aponta que a demanda deve crescer 40% nos próximos meses. Os preços começam em R$ 450 mil para apartamentos de 2 quartos.\n\nEste é um momento crítico para investidores que buscam exposição ao mercado imobiliário em crescimento. Campos dos Goytacazes tem visto investimento significativo em infraestrutura.',
      tags: ['praia-farol', 'residencial', 'lançamento'],
      featured_image_url: 'https://via.placeholder.com/800x400',
      author: 'Blog Imóveis Campos',
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  if (!post) {
    notFound();
  }

  // Fetch related posts (same tags)
  let allPosts: any[] = [];
  try {
    const result = await getPosts(20);
    allPosts = result.posts;
  } catch (err) {
    allPosts = [];
  }
  const relatedPosts = allPosts
    .filter((p: any) =>
      p.slug !== post.slug &&
      p.tags.some((tag: string) => post.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-6">
      <PostHeader
        title={post.title}
        author={post.author}
        publishedAt={post.published_at}
        featuredImageUrl={post.featured_image_url}
        featuredImageAlt={post.title}
      />

      {/* Ad Unit */}
      <div className="mb-12 flex justify-center">
        <AdUnit slotId="post-top" format="horizontal" className="w-full" />
      </div>

      {/* Post Body */}
      <div className="mb-12 text-lg leading-8 text-gray-800">
        {post.body.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="mb-8 text-gray-800">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 rounded-2xl p-8 mb-12 text-base text-gray-700 border border-blue-100">
        <p>
          <strong className="text-black">Disclaimer:</strong> Este conteúdo é informativo e não constitui
          recomendação de investimento. Sempre consulte profissionais qualificados
          antes de tomar decisões financeiras.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mb-12 pb-12">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mb-20">
        <NewsletterCTA />
      </div>

      {/* Ad Unit */}
      <div className="mb-20 flex justify-center">
        <AdUnit slotId="post-middle" format="horizontal" className="w-full" />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-20">
          <RelatedPosts
            posts={relatedPosts.map((p) => ({
              title: p.title,
              slug: p.slug,
              excerpt: p.body.substring(0, 100),
              tags: p.tags,
              published_at: p.published_at,
              author: p.author,
            }))}
          />
        </div>
      )}

      {/* Ad Unit */}
      <div className="mt-20 flex justify-center">
        <AdUnit slotId="post-bottom" format="horizontal" className="w-full" />
      </div>
    </article>
  );
}
