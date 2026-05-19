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

  return (
    <div
      className={`
        ${className}
        bg-gradient-to-br from-gray-50 to-gray-100
        border border-gray-200
        rounded-xl
        flex items-center justify-center
        shadow-sm
        ${format === 'responsive' ? 'w-full h-64' : ''}
        ${format === 'vertical' ? 'w-64 h-96' : ''}
        ${format === 'horizontal' ? 'w-full h-24' : ''}
      `}
      data-ad-slot={adSlot}
    >
      <div className="text-center">
        <p className="text-gray-400 text-xs font-medium">Publicidade</p>
      </div>
    </div>
  );
}
