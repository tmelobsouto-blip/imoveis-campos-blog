import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background, Enter, Footer, Header, MonoLabel, Spacer, Stack, useEnter, wipeIn } from '../components/primitives';
import { ACT3_TEXT, BRAND } from '../content';
import { DARK, FONT } from '../theme';
import { WIPE } from '../timeline';

const Lines: React.FC<{ rows: number[]; color: string; gap?: number; h?: number }> = ({ rows, color, gap = 10, h = 7 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {rows.map((w, i) => (
      <div key={i} style={{ width: `${w}%`, height: h, borderRadius: h, background: color }} />
    ))}
  </div>
);

const Book: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = useEnter(18, 16);
  const float = Math.sin(frame / 18);
  const tilt = interpolate(enter, [0, 1], [-48, -16]) + float * 3;
  return (
    <div style={{ position: 'relative', width: 400, height: 440, perspective: 1400 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `translateY(${float * 8}px) rotateY(${tilt}deg) rotateX(6deg) scale(${0.85 + enter * 0.15})`,
          opacity: enter,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 20,
            width: 250,
            height: 360,
            background: '#0E1512',
            border: '2px solid #26332D',
            borderRadius: 12,
            padding: 22,
            boxSizing: 'border-box',
            boxShadow: '0 30px 60px rgba(0,0,0,0.55)',
            transform: 'translateZ(-40px)',
          }}
        >
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 13, color: DARK.text }}>
            NEXO <span style={{ color: DARK.green }}>Fiscal</span>
          </div>
          <div style={{ marginTop: 92 }}>
            <Lines rows={[46]} color="rgba(52,211,153,0.55)" h={5} />
          </div>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 30, lineHeight: 1.02, letterSpacing: -1, marginTop: 10 }}>
            <div style={{ color: DARK.text }}>{ACT3_TEXT.cover.top}</div>
            <div style={{ color: DARK.green }}>{ACT3_TEXT.cover.bottom}</div>
          </div>
          <div style={{ marginTop: 16 }}>
            <Lines rows={[88, 80, 64]} color="rgba(255,255,255,0.14)" h={5} gap={7} />
          </div>
          <div style={{ position: 'absolute', left: 22, bottom: 24, right: 22 }}>
            <Lines rows={[38, 70]} color="rgba(255,255,255,0.12)" h={5} gap={7} />
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 178,
            top: 0,
            width: 222,
            height: 400,
            background: '#FBFBF9',
            border: `3px solid ${DARK.green}`,
            borderRadius: 12,
            padding: 20,
            boxSizing: 'border-box',
            boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(52,211,153,0.18)',
            transform: 'translateZ(30px)',
          }}
        >
          <Lines rows={[40]} color="#CFD6D2" h={5} />
          <div style={{ marginTop: 14, border: '1px solid #DCE2DE', borderRadius: 6, padding: 8 }}>
            {[0, 1, 2, 3, 4].map((r) => (
              <div key={r} style={{ display: 'flex', gap: 8, padding: '5px 0', borderTop: r ? '1px solid #E6EAE7' : 'none' }}>
                <div style={{ width: '30%', height: 5, borderRadius: 5, background: r ? '#C7CEC9' : '#8F9A94' }} />
                <div style={{ width: '48%', height: 5, borderRadius: 5, background: '#D9DFDB' }} />
                <div style={{ width: '12%', height: 5, borderRadius: 5, background: '#D9DFDB' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, width: 64, height: 12, borderRadius: 3, background: '#111614' }} />
          <div style={{ marginTop: 10 }}>
            <Lines rows={[92, 86, 90, 60]} color="#D3D9D5" h={5} gap={7} />
          </div>
          <div style={{ marginTop: 12, width: 110, height: 12, borderRadius: 3, background: '#2E9E69' }} />
          <div style={{ marginTop: 10 }}>
            <Lines rows={[94, 88, 72, 90, 54, 84]} color="#D3D9D5" h={5} gap={7} />
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 16,
          bottom: 0,
          opacity: enter,
          background: '#0A100D',
          border: `2px solid ${DARK.greenLine}`,
          borderRadius: 8,
          padding: '8px 12px',
        }}
      >
        <MonoLabel color={DARK.green} size={14}>
          {ACT3_TEXT.sampleTag}
        </MonoLabel>
      </div>
    </div>
  );
};

const Kpi: React.FC<{ label: string; value: number; suffix: string; start: number }> = ({ label, value, suffix, start }) => {
  const frame = useCurrentFrame();
  const count = Math.round(
    interpolate(frame, [start, start + 30], [0, value], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3),
    }),
  );
  return (
    <Enter start={start - 6} y={14}>
      <div
        style={{
          background: '#0E1512',
          border: `2px solid ${DARK.border}`,
          borderLeft: `5px solid ${DARK.green}`,
          borderRadius: 12,
          padding: '16px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontFamily: FONT.body, fontWeight: 700, fontSize: 20, color: DARK.text }}>{label}</span>
        <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 32, letterSpacing: -0.8, color: DARK.green, whiteSpace: 'nowrap' }}>
          {count}
          {suffix}
        </span>
      </div>
    </Enter>
  );
};

export const Act3Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const ctaIn = useEnter(84, 13);
  const glow = interpolate(Math.sin(frame / 6), [-1, 1], [0.2, 0.65]);
  const press = 1 + 0.04 * Math.max(0, Math.sin(frame / 7));
  const nudge = interpolate(Math.sin(frame / 5), [-1, 1], [0, 8]);

  return (
    <div style={{ position: 'absolute', inset: 0, clipPath: wipeIn(frame, WIPE) }}>
      <Background mode="dark" />
      <Stack gap={0}>
        <Header mode="dark" actLabel={ACT3_TEXT.actLabel} progress={frame / durationInFrames} enterAt={4} />
        <Spacer h={44} />
        <Enter start={8}>
          <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 64, lineHeight: 1.08, letterSpacing: -2 }}>
            <div style={{ color: DARK.text }}>{ACT3_TEXT.titleA}</div>
            <div style={{ color: DARK.green }}>{ACT3_TEXT.titleB}</div>
          </div>
        </Enter>
        <Spacer h={40} />
        <Enter start={14}>
          <div
            style={{
              background: '#121A16',
              border: `2px solid ${DARK.border}`,
              borderRadius: 22,
              padding: '28px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <Book />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ACT3_TEXT.kpis.map((k, i) => (
                <Kpi key={k.label} label={k.label} value={k.value} suffix={k.suffix} start={32 + i * 8} />
              ))}
            </div>
          </div>
        </Enter>
        <Spacer h={36} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ACT3_TEXT.bullets.map((b, i) => (
            <Enter key={b.n} start={62 + i * 8} y={20}>
              <div
                style={{
                  background: DARK.card,
                  border: `2px solid ${DARK.border}`,
                  borderRadius: 14,
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                }}
              >
                <MonoLabel color={DARK.green} size={24}>
                  {b.n}
                </MonoLabel>
                <span style={{ fontFamily: FONT.body, fontWeight: 500, fontSize: 25, lineHeight: 1.4, color: DARK.textSoft }}>{b.text}</span>
              </div>
            </Enter>
          ))}
        </div>
        <Spacer h={40} />
        <div
          style={{
            opacity: ctaIn,
            transform: `translateY(${(1 - ctaIn) * 40}px)`,
            background: '#0A100D',
            border: `3px solid ${DARK.green}`,
            borderRadius: 20,
            padding: '24px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            boxShadow: `0 0 ${30 + glow * 40}px rgba(52,211,153,${glow * 0.5})`,
          }}
        >
          <div style={{ flex: 1 }}>
            <MonoLabel color={DARK.green} size={15} style={{ letterSpacing: 0.9, whiteSpace: 'nowrap' }}>
              {ACT3_TEXT.ctaLabel}
            </MonoLabel>
            <div style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: 40, letterSpacing: -1, color: DARK.text, marginTop: 8 }}>
              {BRAND.url}
            </div>
          </div>
          <div
            style={{
              transform: `scale(${press})`,
              background: DARK.green,
              color: '#062417',
              fontFamily: FONT.display,
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: -0.2,
              borderRadius: 14,
              padding: '18px 18px',
              whiteSpace: 'nowrap',
            }}
          >
            {ACT3_TEXT.ctaButton} <span style={{ display: 'inline-block', transform: `translateX(${nudge}px)` }}>→</span>
          </div>
        </div>
        <Spacer h={24} />
        <Footer mode="dark" enterAt={20} />
      </Stack>
    </div>
  );
};
