export interface TagBadgeProps {
  tag: string;
  href?: string;
}

export default function TagBadge({ tag, href }: TagBadgeProps) {
  const className = `
    inline-block
    px-2 py-1
    bg-gray-100
    text-gray-700
    text-xs font-medium
    rounded
    hover:bg-gray-200
    transition-colors
  `.trim().replace(/\s+/g, ' ');

  if (href) {
    return (
      <a href={href} className={className}>
        {tag}
      </a>
    );
  }

  return <span className={className}>{tag}</span>;
}
