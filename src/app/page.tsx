import { getPosts } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import NewsletterCTA from '@/components/NewsletterCTA';
import AdUnit from '@/components/AdUnit';
import { truncateExcerpt } from '@/lib/utils';

export const revalidate = 60; // ISR: revalidate every 60s
export const dynamicParams = true; // Allow dynamic params

export default async function Home() {
  let posts = [];

  try {
    const result = await getPosts(10);
    posts = result.posts;
  } catch (err) {
    // Supabase not configured - use mock data for build time
    console.warn('Supabase not available, using mock data');
    posts = [
      {
        id: '1',
        title: 'Lançamento em Praia do Farol surpreende pelo preço',
        slug: 'praia-farol-lancamento',
        body: 'Novo complexo residencial em Praia do Farol chama atenção pelo valor abaixo da média regional. Análise de especialistas aponta que a demanda deve crescer 40% nos próximos meses.',
        tags: ['praia-farol', 'residencial', 'lançamento'],
        featured_image_url: 'https://via.placeholder.com/800x400',
        author: 'Blog Imóveis Campos',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  return (
    <main className="max-w-3xl mx-auto">
      {/* Hero */}
      <section className="py-12 text-center border-b border-gray-300 mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Blog Imóveis Campos
        </h1>
        <p className="text-gray-600 text-lg">
          Análise opinativa do mercado imobiliário de Campos dos Goytacazes, RJ
        </p>
      </section>

      {/* Ad Unit */}
      <div className="mb-12 flex justify-center">
        <AdUnit slotId="homepage-top" format="horizontal" className="w-full" />
      </div>

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Posts Grid */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Últimos Posts</h2>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum post publicado ainda.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                slug={post.slug}
                excerpt={truncateExcerpt(post.body, 120)}
                tags={post.tags}
                publishedAt={post.published_at}
                author={post.author}
              />
            ))}
          </div>
        )}
      </section>

      {/* Ad Unit */}
      <div className="mb-12 flex justify-center">
        <AdUnit slotId="homepage-bottom" format="horizontal" className="w-full" />
      </div>

      {/* Bottom CTA */}
      <section className="text-center py-12 border-t border-gray-300">
        <p className="text-gray-600 mb-4">
          Quer acompanhar lançamentos em tempo real?
        </p>
        <p className="text-sm text-gray-500">
          Siga nossas redes sociais ou assine a newsletter acima.
        </p>
      </section>
    </main>
  );
}
