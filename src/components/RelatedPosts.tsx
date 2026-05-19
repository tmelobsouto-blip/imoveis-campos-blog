import PostCard from './PostCard';

export interface RelatedPost {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  published_at: string;
  author?: string;
}

export interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-300">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Leia também
      </h2>

      <div className="
        grid
        gap-6
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
      ">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
            publishedAt={post.published_at}
            author={post.author}
          />
        ))}
      </div>
    </section>
  );
}
