import Image from 'next/image';

export interface PostHeaderProps {
  title: string;
  author?: string;
  publishedAt: string;
  featuredImageUrl?: string;
  featuredImageAlt?: string;
}

export default function PostHeader({
  title,
  author = 'Blog Imóveis Campos',
  publishedAt,
  featuredImageUrl,
  featuredImageAlt = title,
}: PostHeaderProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {title}
      </h1>

      <div className="text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <time dateTime={publishedAt}>{formattedDate}</time>
          <span>•</span>
          <span>{author}</span>
        </div>
      </div>

      {featuredImageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </header>
  );
}
