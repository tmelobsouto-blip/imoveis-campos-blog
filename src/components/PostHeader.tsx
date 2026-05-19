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
    <header className="mb-12">
      <h1 className="text-5xl sm:text-6xl font-bold text-black mb-6 leading-tight tracking-tight">
        {title}
      </h1>

      <div className="text-base text-gray-600 mb-8 space-y-2">
        <time dateTime={publishedAt} className="block">{formattedDate}</time>
        <span className="block text-gray-700">{author}</span>
      </div>

      {featuredImageUrl && (
        <div className="relative w-full h-96 sm:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-lg">
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
