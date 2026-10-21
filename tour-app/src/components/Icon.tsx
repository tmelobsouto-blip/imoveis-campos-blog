const PATHS = {
  prev: 'M14.5 6 8.5 12l6 6',
  next: 'M9.5 6l6 6-6 6',
  play: 'M8 5.5v13l10.5-6.5z',
  pause: 'M8.5 5.5v13M15.5 5.5v13',
  grid: 'M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z',
  film: 'M3.5 6.5h17v11h-17zM3.5 9.5h17M3.5 14.5h17M7.5 6.5v3M12 6.5v3M16.5 6.5v3M7.5 14.5v3M12 14.5v3M16.5 14.5v3',
  close: 'M6 6l12 12M18 6 6 18',
  external: 'M8 16 16 8M9.5 8H16v6.5',
  restart: 'M5.5 12a6.5 6.5 0 1 0 2-4.7M5.5 4.5v3.5H9',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const filled = name === 'play';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
