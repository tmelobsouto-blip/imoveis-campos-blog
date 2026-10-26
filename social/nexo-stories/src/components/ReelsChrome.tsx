import React from 'react';
import { AbsoluteFill } from 'remotion';
import { BRAND } from '../content';

const Icon: React.FC<{ d: string; size?: number; fill?: boolean }> = ({ d, size = 58, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? '#fff' : 'none'} stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = [
  'M12 21s-7.5-4.6-9.3-9.2C1.4 8.4 3.6 5 7 5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8C19.5 16.4 12 21 12 21z',
  'M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z',
  'M22 3L10 14M22 3l-7 18-5-7-7-4z',
];

export const ReelsChrome: React.FC<{ caption: string }> = ({ caption }) => (
  <AbsoluteFill style={{ pointerEvents: 'none', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
    <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 220, background: 'linear-gradient(rgba(0,0,0,0.45), transparent)' }} />
    <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 560, background: 'linear-gradient(transparent, rgba(0,0,0,0.62))' }} />
    <div style={{ position: 'absolute', top: 70, left: 40, right: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: -1 }}>Reels</span>
      <Icon d="M3 8h3l2-3h8l2 3h3v11H3zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" size={54} />
    </div>
    <div style={{ position: 'absolute', right: 34, bottom: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46 }}>
      {ICONS.map((d) => (
        <Icon key={d} d={d} />
      ))}
      <span style={{ fontSize: 44, fontWeight: 800, letterSpacing: 2 }}>···</span>
      <div style={{ width: 62, height: 62, borderRadius: 12, border: '3px solid #fff', background: '#0B110E' }} />
    </div>
    <div style={{ position: 'absolute', left: 40, right: 250, bottom: 300 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 70, height: 70, borderRadius: 70, background: '#0B110E', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path d="M5 3l14 8-6 1.6L10 19z" fill="#2BC77F" />
          </svg>
        </div>
        <span style={{ fontSize: 32, fontWeight: 700 }}>{BRAND.handle.slice(1)}</span>
        <span style={{ border: '2px solid #fff', borderRadius: 14, padding: '6px 18px', fontSize: 28, fontWeight: 700 }}>Seguir</span>
      </div>
      <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 20, opacity: 0.95 }}>
        {caption} <span style={{ opacity: 0.7 }}>... mais</span>
      </div>
      <div style={{ fontSize: 26, marginTop: 18, opacity: 0.9 }}>♫ {BRAND.handle.slice(1)} · Áudio original</div>
    </div>
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: '#000', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
      {['M3 11l9-8 9 8v10H3z', 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5', 'M12 5v14M5 12h14', 'M4 4h16v16H4zM4 9h16M9 4l3 5M14 4l3 5', 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0'].map((d) => (
        <Icon key={d} d={d} size={52} />
      ))}
    </div>
  </AbsoluteFill>
);
