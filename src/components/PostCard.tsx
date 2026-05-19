import Link from 'next/link';
import TagBadge from './TagBadge';

export interface PostCardProps {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  author?: string;
}

export default function PostCard({
  title,
  slug,
  excerpt,
  tags,
  publishedAt,
  author = 'Blog Imóveis Campos',
}: PostCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="
      border border-gray-300
      rounded-md
      p-4
      hover:shadow-md
      hover:bg-gray-50
      transition-all
      duration-300
    ">
      <Link href={`/posts/${slug}`} className="block group">
        <h3 className="
          text-lg font-bold
          text-gray-900
          group-hover:text-blue-600
          transition-colors
          mb-2
          line-clamp-2
        ">
          {title}
        </h3>
      </Link>

      <div className="text-sm text-gray-600 mb-3">
        <time dateTime={publishedAt}>{formattedDate}</time>
        {author && <span className="ml-2">• {author}</span>}
      </div>

      <p className="text-gray-700 text-sm mb-3 line-clamp-2">
        {excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
        {tags.length > 3 && (
          <span className="text-xs text-gray-500">+{tags.length - 3}</span>
        )}
      </div>
    </article>
  );
}
