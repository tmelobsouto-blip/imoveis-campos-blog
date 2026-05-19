export interface AdUnitProps {
  slotId?: string;
  className?: string;
  format?: 'responsive' | 'vertical' | 'horizontal';
}

export default function AdUnit({
  slotId = 'default',
  className = '',
  format = 'responsive',
}: AdUnitProps) {
  const slotMap: Record<string, string> = {
    default: '1234567890',
    sidebar: '1234567891',
    inFeed: '1234567892',
  };

  const adSlot = slotMap[slotId] || slotMap.default;

  const placeholderBg = 'bg-gray-100';
  const placeholderText = 'text-gray-400 text-center text-xs';

  return (
    <div
      className={`
        ${className}
        ${placeholderBg}
        ${placeholderText}
        border border-gray-300
        rounded-md
        flex items-center justify-center
        ${format === 'responsive' ? 'w-full h-64' : ''}
        ${format === 'vertical' ? 'w-64 h-96' : ''}
        ${format === 'horizontal' ? 'w-full h-24' : ''}
      `}
      data-ad-slot={adSlot}
    >
      {/* Google AdSense script will render here */}
      <p>Ad Unit ({format})</p>
    </div>
  );
}
