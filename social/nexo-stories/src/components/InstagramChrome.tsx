import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../content';
import { FONT } from '../theme';

const Icon: React.FC<{ d: string; size?: number }> = ({ d, size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const InstagramChrome: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', fontFamily: FONT.body }}>
      <div style={{ position: 'absolute', inset: '0 0 auto 0', height: 230, background: 'linear-gradient(rgba(0,0,0,0.42), transparent)' }} />
      <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 260, background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }} />
      <div style={{ position: 'absolute', top: 22, left: 18, right: 18, height: 5, borderRadius: 5, background: 'rgba(255,255,255,0.35)', overflow: 'hidden' }}>
        <div style={{ width: `${(frame / durationInFrames) * 100}%`, height: '100%', background: '#fff' }} />
      </div>
      <div style={{ position: 'absolute', top: 50, left: 26, right: 26, display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 76, height: 76, borderRadius: 76, padding: 4, background: 'linear-gradient(45deg,#FEDA75,#FA7E1E,#D62976,#962FBF,#4F5BD5)' }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 76, background: '#0A100D', border: '3px solid #fff', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path d="M5 3l14 8-6 1.6L10 19z" fill="#34D399" />
            </svg>
          </div>
        </div>
        <div style={{ color: '#fff', fontSize: 30, fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          {BRAND.handle.slice(1)} <span style={{ fontWeight: 400, opacity: 0.75, marginLeft: 8 }}>2 min</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ color: '#fff', fontSize: 40, letterSpacing: 2, fontWeight: 700 }}>···</div>
        <Icon d="M6 6l12 12M18 6L6 18" size={46} />
      </div>
      <div style={{ position: 'absolute', bottom: 46, left: 26, right: 26, display: 'flex', alignItems: 'center', gap: 28 }}>
        <div style={{ flex: 1, height: 92, borderRadius: 92, border: '2.5px solid rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', paddingLeft: 36, color: '#fff', fontSize: 30 }}>
          Enviar mensagem
        </div>
        <Icon d="M12 21s-7.5-4.6-9.3-9.2C1.4 8.4 3.6 5 7 5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8C19.5 16.4 12 21 12 21z" size={52} />
        <Icon d="M22 3L10 14M22 3l-7 18-5-7-7-4z" size={50} />
      </div>
    </AbsoluteFill>
  );
};
