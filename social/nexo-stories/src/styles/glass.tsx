import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BoltIcon, ClockIcon, Spacer, Stack, wipeIn } from '../components/primitives';
import { ACT1_TEXT, ACT2_TEXT, ACT3_TEXT, BRAND } from '../content';
import { ramp, useActProgress, useCountdown, useCountUp, useSpring } from '../shared/motion';
import { makeStory } from '../shared/StyledStory';
import { ACT2_REVEAL, WIPE } from '../timeline';

const C = {
  base: '#070B1F',
  text: '#F5F7FF',
  soft: 'rgba(235,240,255,0.82)',
  muted: 'rgba(235,240,255,0.56)',
  teal: '#5EEAD4',
  indigo: '#818CF8',
  pink: '#F0ABFC',
  amber: '#FDBA74',
  rose: '#FB7185',
};
const FONT = "'Plus Jakarta Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const GRAD = `linear-gradient(90deg, ${C.teal}, ${C.indigo} 55%, ${C.pink})`;
const WARM = `linear-gradient(90deg, ${C.amber}, ${C.rose})`;

const gradText = (g = GRAD): React.CSSProperties => ({
  backgroundImage: g,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
});

const glass = (radius = 28, strong = false): React.CSSProperties => ({
  background: strong ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)',
  border: '1.5px solid rgba(255,255,255,0.18)',
  borderRadius: radius,
  backdropFilter: 'blur(26px) saturate(150%)',
  WebkitBackdropFilter: 'blur(26px) saturate(150%)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.22), 0 24px 60px rgba(0,0,0,0.35)',
});

const gradBorder = (g: string, inner = 'rgba(16,20,48,0.72)'): React.CSSProperties => ({
  border: '2px solid transparent',
  background: `linear-gradient(${inner}, ${inner}) padding-box, ${g} border-box`,
});

type Blob = { x: number; y: number; r: number; color: string; speed: number };

const Mesh: React.FC<{ blobs: Blob[] }> = ({ blobs }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.base, overflow: 'hidden' }}>
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: b.r * 2,
            height: b.r * 2,
            left: b.x - b.r + Math.sin(frame / (40 / b.speed) + i) * 90,
            top: b.y - b.r + Math.cos(frame / (50 / b.speed) + i * 2) * 110,
            borderRadius: '50%',
            background: b.color,
            filter: 'blur(110px)',
            opacity: 0.75,
          }}
        />
      ))}
      <AbsoluteFill
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
          mixBlendMode: 'overlay',
        }}
      />
    </AbsoluteFill>
  );
};

const MESH_1: Blob[] = [
  { x: 150, y: 300, r: 380, color: '#4F46E5', speed: 1 },
  { x: 950, y: 900, r: 420, color: '#0D9488', speed: 0.8 },
  { x: 300, y: 1600, r: 400, color: '#A21CAF', speed: 1.2 },
];
const MESH_2: Blob[] = [
  { x: 900, y: 350, r: 400, color: '#0E7490', speed: 1 },
  { x: 150, y: 1100, r: 420, color: '#4338CA', speed: 0.9 },
  { x: 900, y: 1700, r: 380, color: '#0F766E', speed: 1.1 },
];
const MESH_3: Blob[] = [
  { x: 200, y: 400, r: 420, color: '#7C3AED', speed: 1 },
  { x: 950, y: 1000, r: 400, color: '#DB2777', speed: 0.8 },
  { x: 250, y: 1650, r: 420, color: '#4F46E5', speed: 1.1 },
];

const BlurIn: React.FC<{ start: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ start, style, children }) => {
  const p = useSpring(start, 200);
  return (
    <div style={{ opacity: p, filter: `blur(${(1 - p) * 18}px)`, transform: `translateY(${(1 - p) * 24}px) scale(${0.97 + p * 0.03})`, ...style }}>
      {children}
    </div>
  );
};

const Header: React.FC<{ actLabel: string }> = ({ actLabel }) => {
  const progress = useActProgress();
  return (
    <BlurIn start={0}>
      <div style={{ ...glass(26), padding: '16px 18px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 58, height: 58, borderRadius: 58, background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M5 3l14 8-6 1.6L10 19z" fill={C.base} />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 34, letterSpacing: -1, color: C.text, lineHeight: 1 }}>
              NEXO <span style={gradText()}>Fiscal</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 14, letterSpacing: 0.6, color: C.muted, marginTop: 6, whiteSpace: 'nowrap' }}>{actLabel}</div>
          </div>
          <div
            style={{
              ...gradBorder(WARM, 'rgba(40,20,30,0.6)'),
              borderRadius: 40,
              padding: '9px 14px',
              fontFamily: MONO,
              fontWeight: 500,
              fontSize: 15,
              color: C.amber,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 8, background: C.amber, boxShadow: `0 0 10px ${C.amber}` }} />
            {BRAND.badge}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, bottom: 0, height: 4, width: `${progress * 100}%`, background: GRAD, boxShadow: `0 0 16px ${C.indigo}` }} />
      </div>
    </BlurIn>
  );
};

const Footer: React.FC = () => (
  <BlurIn start={20}>
    <div style={{ ...glass(40), padding: '18px 26px', display: 'flex', justifyContent: 'space-between', fontFamily: MONO, fontSize: 20, color: C.soft }}>
      <span>
        <b style={gradText()}>{BRAND.handle}</b> · {BRAND.name}
      </span>
      <span style={{ color: C.teal }}>{BRAND.url} →</span>
    </div>
  </BlurIn>
);

const Act1: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 6), [-1, 1], [0.25, 0.75]);
  const dotColors = [C.teal, C.indigo, C.pink, C.amber];
  return (
    <>
      <Mesh blobs={MESH_1} />
      <Stack gap={0}>
        <Header actLabel={ACT1_TEXT.actLabel} />
        <Spacer h={44} />
        <BlurIn start={6} style={{ alignSelf: 'flex-start' }}>
          <div style={{ ...glass(40, true), padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BoltIcon color={C.amber} size={22} />
            <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: 1.2, ...gradText() }}>{ACT1_TEXT.tag}</span>
          </div>
        </BlurIn>
        <Spacer h={26} />
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 80, lineHeight: 1.08, letterSpacing: -2.6, color: C.text }}>
          {ACT1_TEXT.title.map((w, i) => (
            <BlurIn key={w.word} start={10 + i * 3} style={{ display: 'inline-block', marginRight: 20 }}>
              <span style={w.highlight ? gradText() : undefined}>{w.word}</span>
            </BlurIn>
          ))}
        </div>
        <Spacer h={30} />
        <BlurIn start={32}>
          <div style={{ ...glass(28), padding: '26px 30px', fontFamily: FONT, fontWeight: 500, fontSize: 29, lineHeight: 1.45, color: C.soft }}>
            {ACT1_TEXT.context}
          </div>
        </BlurIn>
        <Spacer h={26} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {ACT1_TEXT.chips.map((chip, i) => (
            <BlurIn key={chip} start={42 + i * 4}>
              <div
                style={{
                  ...glass(22),
                  padding: '16px 18px',
                  display: 'flex',
                  gap: 12,
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 21,
                  lineHeight: 1.38,
                  color: C.soft,
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 12,
                    flexShrink: 0,
                    marginTop: 8,
                    background: dotColors[i],
                    boxShadow: `0 0 12px ${dotColors[i]}`,
                  }}
                />
                {chip}
              </div>
            </BlurIn>
          ))}
        </div>
        <Spacer h={38} />
        <BlurIn start={62}>
          <div
            style={{
              ...gradBorder(WARM, 'rgba(45,18,34,0.78)'),
              borderRadius: 28,
              padding: '24px 28px',
              boxShadow: `0 0 ${40 + pulse * 40}px rgba(251,113,133,${pulse * 0.45})`,
            }}
          >
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 18, letterSpacing: 1.2, ...gradText(WARM) }}>▲ {ACT1_TEXT.warningLabel}</div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, lineHeight: 1.38, color: C.text, marginTop: 10 }}>{ACT1_TEXT.warning}</div>
          </div>
        </BlurIn>
        <Spacer h={28} />
        <Footer />
      </Stack>
    </>
  );
};

const Ring: React.FC<{ value: number; label: React.ReactNode; warm: number; scale: number }> = ({ value, label, warm, scale }) => {
  const g = warm > 0 ? `${C.amber}, ${C.rose}` : `${C.teal}, ${C.indigo}, ${C.pink}`;
  return (
    <div style={{ position: 'relative', width: 124, height: 124, transform: `scale(${scale})` }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `conic-gradient(from 0deg, ${g} ${value * 360}deg, rgba(255,255,255,0.1) ${value * 360}deg)`,
          WebkitMask: 'radial-gradient(circle, transparent 52px, #000 53px)',
          mask: 'radial-gradient(circle, transparent 52px, #000 53px)',
          filter: `drop-shadow(0 0 10px ${warm > 0 ? C.rose : C.indigo})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 46,
          color: C.text,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const Sparks: React.FC<{ progress: number }> = ({ progress }) => {
  if (progress <= 0 || progress >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: 50, top: '50%' }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const d = 30 + progress * 180;
        const c = [C.teal, C.indigo, C.pink][i % 3];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 10,
              height: 10,
              borderRadius: 10,
              background: c,
              boxShadow: `0 0 14px ${c}`,
              opacity: 1 - progress,
              transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

const Act2: React.FC = () => {
  const { frame, remaining, seconds, urgent, isRevealed, revealed, burst, tick } = useCountdown();
  const answer = useSpring(ACT2_REVEAL + 12);
  const badge = useSpring(ACT2_REVEAL + 8, 12);
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Mesh blobs={MESH_2} />
      <Stack gap={0}>
        <Header actLabel={ACT2_TEXT.actLabel} />
        <Spacer h={26} />
        <BlurIn start={8}>
          <div style={{ ...glass(28), padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15, letterSpacing: 0.8, ...gradText() }}>{ACT2_TEXT.sourceLabel}</div>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, lineHeight: 1.2, letterSpacing: -0.6, color: C.text, marginTop: 8 }}>
                {ACT2_TEXT.sourceTitle}
              </div>
            </div>
            <div style={{ width: 178, textAlign: 'right' }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: C.muted, letterSpacing: 1 }}>
                {isRevealed ? ACT2_TEXT.revealLabel : ACT2_TEXT.timerLabel}
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: isRevealed ? 23 : 40,
                  lineHeight: 1.1,
                  marginTop: 4,
                  ...gradText(urgent > 0 && !isRevealed ? WARM : GRAD),
                }}
              >
                {isRevealed ? ACT2_TEXT.revealValue : `${seconds}s`}
              </div>
            </div>
            <Ring
              value={isRevealed ? 1 : remaining}
              warm={isRevealed ? 0 : urgent}
              scale={isRevealed ? 1 : 1 + (1 - tick) * 0.05 * urgent}
              label={isRevealed ? <span style={{ transform: `scale(${revealed})`, ...gradText() }}>✓</span> : seconds}
            />
          </div>
        </BlurIn>
        <Spacer h={22} />
        <BlurIn start={16}>
          <div style={{ ...glass(28, true), padding: '24px 28px', fontFamily: FONT, fontWeight: 700, fontSize: 28, lineHeight: 1.42, color: C.text }}>
            {ACT2_TEXT.question}
          </div>
        </BlurIn>
        <Spacer h={20} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ACT2_TEXT.options.map((o, i) => {
            const correct = o.letter === ACT2_TEXT.correct;
            const lit = correct && isRevealed;
            return (
              <BlurIn key={o.letter} start={24 + i * 6}>
                <div
                  style={{
                    ...(lit ? { ...gradBorder(GRAD, 'rgba(20,40,60,0.75)'), borderRadius: 24 } : glass(24)),
                    position: 'relative',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    opacity: !correct && isRevealed ? interpolate(revealed, [0, 1], [1, 0.4]) : 1,
                    filter: !correct && isRevealed ? `blur(${revealed * 1.2}px)` : 'none',
                    boxShadow: lit ? `0 0 ${30 + revealed * 20}px rgba(94,234,212,0.35)` : undefined,
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 52,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 24,
                      ...(lit ? { background: GRAD, color: C.base } : { ...gradBorder(GRAD, 'rgba(20,24,56,0.9)'), color: C.text }),
                    }}
                  >
                    {o.letter}
                  </div>
                  <div style={{ fontFamily: FONT, fontWeight: lit ? 700 : 500, fontSize: 25, lineHeight: 1.38, color: lit ? C.text : C.soft }}>{o.text}</div>
                  {lit && (
                    <>
                      <div
                        style={{
                          position: 'absolute',
                          right: 18,
                          top: -20,
                          background: GRAD,
                          color: C.base,
                          borderRadius: 30,
                          padding: '7px 14px',
                          fontFamily: MONO,
                          fontWeight: 700,
                          fontSize: 17,
                          transform: `scale(${badge})`,
                          boxShadow: `0 0 20px ${C.indigo}`,
                        }}
                      >
                        {ACT2_TEXT.correctBadge}
                      </div>
                      <Sparks progress={burst} />
                    </>
                  )}
                </div>
              </BlurIn>
            );
          })}
        </div>
        <Spacer h={22} />
        {!isRevealed ? (
          <BlurIn start={44}>
            <div style={{ ...glass(24), padding: '18px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontWeight: 700, fontSize: 15, letterSpacing: 0.8, color: C.teal }}>
                <span style={{ opacity: interpolate(Math.sin(frame / 4), [-1, 1], [0.3, 1]) }}>
                  <ClockIcon color={C.teal} size={20} />
                </span>
                {ACT2_TEXT.hintLabel}
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 24, lineHeight: 1.42, color: C.soft, marginTop: 8 }}>{ACT2_TEXT.hint}</div>
            </div>
          </BlurIn>
        ) : (
          <div
            style={{
              opacity: answer,
              filter: `blur(${(1 - answer) * 14}px)`,
              ...gradBorder(GRAD, 'rgba(12,30,44,0.82)'),
              borderRadius: 26,
              padding: '20px 24px',
              boxShadow: '0 0 50px rgba(94,234,212,0.25)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 16, ...gradText() }}>{ACT2_TEXT.answerLabel}</span>
              <span style={{ fontFamily: MONO, fontSize: 12, color: C.muted }}>{ACT2_TEXT.answerSide}</span>
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 24, lineHeight: 1.42, color: C.text, marginTop: 10 }}>{ACT2_TEXT.answer}</div>
          </div>
        )}
        <Spacer h={24} />
        <Footer />
      </Stack>
    </AbsoluteFill>
  );
};

const Device: React.FC = () => {
  const frame = useCurrentFrame();
  const p = useSpring(18, 16);
  const tilt = interpolate(p, [0, 1], [-40, -14]) + Math.sin(frame / 20) * 4;
  return (
    <div style={{ position: 'relative', width: 380, height: 420, perspective: 1300, opacity: p }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateY(${tilt}deg) rotateX(8deg) translateY(${Math.sin(frame / 16) * 8}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 10,
            width: 220,
            height: 330,
            borderRadius: 22,
            background: 'rgba(255,255,255,0.92)',
            transform: 'translateZ(-50px) rotate(6deg)',
            padding: 20,
            boxSizing: 'border-box',
            boxShadow: '0 30px 70px rgba(0,0,0,0.45)',
          }}
        >
          {[50, 90, 82, 94, 64, 88, 76, 92, 58].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 8, borderRadius: 8, background: i === 4 ? C.indigo : '#D5D9EA', marginBottom: 14 }} />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 40,
            width: 230,
            height: 330,
            borderRadius: 26,
            padding: 10,
            background: 'rgba(255,255,255,0.12)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 40px rgba(129,140,248,0.35)',
            transform: 'translateZ(40px)',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 18,
              background: 'linear-gradient(160deg, #111735, #1E1B4B 60%, #3B0764)',
              padding: 18,
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 13, color: C.text }}>
              NEXO <span style={gradText()}>Fiscal</span>
            </div>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, lineHeight: 1.04, letterSpacing: -1, marginTop: 120, color: C.text }}>
              {ACT3_TEXT.cover.top}
              <br />
              <span style={gradText()}>{ACT3_TEXT.cover.bottom}</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 70,
                left: `${((frame * 4) % 400) - 100}px`,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
                transform: 'skewX(-18deg)',
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: 10,
          bottom: 0,
          ...glass(20, true),
          padding: '7px 12px',
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 13,
          color: C.teal,
        }}
      >
        {ACT3_TEXT.sampleTag}
      </div>
    </div>
  );
};

const Kpi: React.FC<{ label: string; value: number; suffix: string; start: number }> = ({ label, value, suffix, start }) => {
  const n = useCountUp(value, start);
  return (
    <BlurIn start={start - 6}>
      <div style={{ ...glass(20), padding: '14px 18px' }}>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 38, lineHeight: 1, letterSpacing: -1, ...gradText() }}>
          {n}
          {suffix}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 19, color: C.soft, marginTop: 6 }}>{label}</div>
      </div>
    </BlurIn>
  );
};

const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const cta = useSpring(84, 14);
  const shine = ((frame - 90) * 10) % 700;
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Mesh blobs={MESH_3} />
      <Stack gap={0}>
        <Header actLabel={ACT3_TEXT.actLabel} />
        <Spacer h={40} />
        <BlurIn start={8}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 64, lineHeight: 1.08, letterSpacing: -2.2, color: C.text }}>
            {ACT3_TEXT.titleA}
            <br />
            <span style={gradText()}>{ACT3_TEXT.titleB}</span>
          </div>
        </BlurIn>
        <Spacer h={32} />
        <BlurIn start={14}>
          <div style={{ ...glass(32), padding: '22px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <Device />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {ACT3_TEXT.kpis.map((k, i) => (
                <Kpi key={k.label} {...k} start={30 + i * 8} />
              ))}
            </div>
          </div>
        </BlurIn>
        <Spacer h={28} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {ACT3_TEXT.bullets.map((b, i) => (
            <BlurIn key={b.n} start={62 + i * 8}>
              <div style={{ ...glass(24), padding: '18px 22px', display: 'flex', gap: 18, alignItems: 'center' }}>
                <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, ...gradText() }}>{b.n}</span>
                <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: 24, lineHeight: 1.4, color: C.soft }}>{b.text}</span>
              </div>
            </BlurIn>
          ))}
        </div>
        <Spacer h={30} />
        <div
          style={{
            opacity: cta,
            filter: `blur(${(1 - cta) * 14}px)`,
            ...gradBorder(GRAD, 'rgba(18,16,50,0.8)'),
            borderRadius: 30,
            padding: '20px 22px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            boxShadow: `0 0 ${40 + Math.sin(frame / 6) * 15}px rgba(129,140,248,0.45)`,
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 14, letterSpacing: 0.4, color: C.teal, whiteSpace: 'nowrap' }}>{ACT3_TEXT.ctaLabel}</div>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 36, letterSpacing: -1, color: C.text, marginTop: 6 }}>{BRAND.url}</div>
          </div>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: GRAD,
              color: C.base,
              borderRadius: 22,
              padding: '18px 18px',
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 20,
              whiteSpace: 'nowrap',
            }}
          >
            {ACT3_TEXT.ctaButton} →
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 60,
                left: shine - 200,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                transform: 'skewX(-20deg)',
                opacity: ramp(frame, 90, 96),
              }}
            />
          </div>
        </div>
        <Spacer h={26} />
        <Footer />
      </Stack>
    </AbsoluteFill>
  );
};

export const GlassStory = makeStory({ name: 'Glass', Act1, Act2, Act3, base: C.base });
