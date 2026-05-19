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
    <section className="mt-20 pt-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-black mb-10 tracking-tight">
        Leia também
      </h2>

      <div className="
        grid
        gap-8
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
