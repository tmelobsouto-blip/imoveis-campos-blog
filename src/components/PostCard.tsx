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
      rounded-xl
      p-8
      hover:shadow-lg
      hover:bg-gray-50
      transition-all
      duration-300
      group
    ">
      <Link href={`/posts/${slug}`} className="block">
        <h3 className="
          text-2xl font-semibold
          text-black
          group-hover:text-blue-600
          transition-colors
          duration-300
          mb-4
          line-clamp-3
          leading-tight
        ">
          {title}
        </h3>
      </Link>

      <div className="text-sm text-gray-500 mb-4 space-y-1">
        <time dateTime={publishedAt} className="block">{formattedDate}</time>
        {author && <span className="block text-gray-600">{author}</span>}
      </div>

      <p className="text-gray-700 text-base mb-6 line-clamp-2 leading-relaxed">
        {excerpt}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 3).map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
        {tags.length > 3 && (
          <span className="text-xs text-gray-400">+{tags.length - 3}</span>
        )}
      </div>
    </article>
  );
}
