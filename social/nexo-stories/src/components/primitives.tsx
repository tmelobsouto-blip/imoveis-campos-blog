import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../content';
import { DARK, FONT, LAYOUT, LIGHT, Mode } from '../theme';

export const useEnter = (start: number, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - start, fps, config: { damping } });
};

export const Enter: React.FC<{
  start: number;
  y?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ start, y = 28, style, children }) => {
  const p = useEnter(start);
  return (
    <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}>{children}</div>
  );
};

export const Background: React.FC<{ mode: Mode }> = ({ mode }) => {
  const t = mode === 'dark' ? DARK : LIGHT;
  const glow =
    mode === 'dark'
      ? 'radial-gradient(900px 700px at 10% 8%, rgba(52,211,153,0.10), transparent 70%), radial-gradient(800px 900px at 100% 100%, rgba(52,211,153,0.06), transparent 70%)'
      : 'radial-gradient(900px 700px at 0% 0%, rgba(15,107,69,0.05), transparent 70%)';
  return (
    <AbsoluteFill
      style={{
        backgroundColor: t.bg,
        backgroundImage: `${glow}, linear-gradient(${t.grid} 2px, transparent 2px), linear-gradient(90deg, ${t.grid} 2px, transparent 2px)`,
        backgroundSize: '100% 100%, 100% 100%, 60px 60px, 60px 60px',
      }}
    />
  );
};

export const Stack: React.FC<{ children: React.ReactNode; gap?: number }> = ({ children, gap = 28 }) => (
  <AbsoluteFill
    style={{
      paddingTop: LAYOUT.top,
      paddingLeft: LAYOUT.padX,
      paddingRight: LAYOUT.padX,
      display: 'flex',
      flexDirection: 'column',
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Spacer: React.FC<{ h: number }> = ({ h }) => <div style={{ height: h, flexShrink: 0 }} />;

const LogoMark: React.FC<{ mode: Mode }> = ({ mode }) => (
  <div
    style={{
      width: 64,
      height: 64,
      borderRadius: 14,
      background: mode === 'dark' ? DARK.card : '#0A100D',
      border: `2px solid ${mode === 'dark' ? DARK.border : '#0A100D'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="26" height="26" viewBox="0 0 24 24">
      <path d="M5 3l14 8-6 1.6L10 19z" fill="#F2F5F3" />
    </svg>
  </div>
);

export const Header: React.FC<{ mode: Mode; actLabel: string; progress: number; enterAt?: number }> = ({
  mode,
  actLabel,
  progress,
  enterAt = 0,
}) => {
  const t = mode === 'dark' ? DARK : LIGHT;
  const badge =
    mode === 'dark'
      ? { color: DARK.orange, bg: 'rgba(242,162,58,0.10)', border: 'rgba(242,162,58,0.55)' }
      : { color: LIGHT.orange, bg: LIGHT.orangeBg, border: LIGHT.orangeLine };
  const track = mode === 'dark' ? '#1C2722' : LIGHT.track;
  return (
    <Enter start={enterAt} y={-16}>
      <div style={{ height: 8, borderRadius: 8, background: track, overflow: 'hidden' }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: t.green, borderRadius: 8 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 22 }}>
        <LogoMark mode={mode} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 38, letterSpacing: -1.2, color: t.text, lineHeight: 1 }}>
            NEXO <span style={{ color: t.green }}>Fiscal</span>
          </div>
          <div style={{ fontFamily: FONT.mono, fontSize: 15, letterSpacing: 0.6, color: t.muted, marginTop: 8, whiteSpace: 'nowrap' }}>{actLabel}</div>
        </div>
        <div
          style={{
            fontFamily: FONT.mono,
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: 0.8,
            color: badge.color,
            background: badge.bg,
            border: `2px solid ${badge.border}`,
            borderRadius: 10,
            padding: '9px 13px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ width: 9, height: 9, borderRadius: 9, background: badge.color }} />
          {BRAND.badge}
        </div>
      </div>
      <div style={{ height: 2, background: mode === 'dark' ? DARK.border : LIGHT.border, marginTop: 22 }} />
    </Enter>
  );
};

export const Footer: React.FC<{ mode: Mode; enterAt?: number }> = ({ mode, enterAt = 0 }) => {
  const frame = useCurrentFrame();
  const nudge = interpolate(Math.sin(frame / 6), [-1, 1], [0, 6]);
  const dark = mode === 'dark';
  return (
    <Enter start={enterAt} y={20}>
      <div
        style={{
          background: dark ? DARK.cardAlt : '#0A100D',
          borderRadius: 14,
          padding: '22px 26px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: FONT.mono,
          fontSize: 21,
        }}
      >
        <span style={{ color: DARK.text }}>
          <span style={{ color: DARK.green, fontWeight: 700 }}>{BRAND.handle}</span> · {BRAND.name}
        </span>
        <span style={{ color: DARK.green }}>
          {BRAND.url} <span style={{ display: 'inline-block', transform: `translateX(${nudge}px)` }}>→</span>
        </span>
      </div>
    </Enter>
  );
};

export const MonoLabel: React.FC<{ color: string; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  color,
  children,
  size = 19,
  style,
}) => (
  <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: size, letterSpacing: 1.4, color, ...style }}>{children}</div>
);

export const BoltIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6z" fill={color} />
  </svg>
);

export const ClockIcon: React.FC<{ color: string; size?: number }> = ({ color, size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} style={{ flexShrink: 0 }}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6" strokeLinecap="round" />
  </svg>
);

export const wipeIn = (frame: number, duration: number) => {
  const p = interpolate(frame, [0, duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const eased = 1 - Math.pow(1 - p, 3);
  return `inset(${(1 - eased) * 100}% 0 0 0)`;
};
