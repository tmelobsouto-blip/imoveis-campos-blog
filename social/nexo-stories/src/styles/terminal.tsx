import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Spacer, wipeIn } from '../components/primitives';
import { ACT1_TEXT, ACT2_TEXT, ACT3_TEXT, BRAND } from '../content';
import { ramp, typed, useActProgress, useCountdown, useCountUp, useSpring } from '../shared/motion';
import { makeStory } from '../shared/StyledStory';
import { LAYOUT } from '../theme';
import { ACT2_REVEAL, WIPE } from '../timeline';

const C = {
  bg: '#020503',
  screen: '#04100A',
  green: '#3DFF8F',
  soft: '#A8FFD0',
  dim: '#1F8A50',
  faint: '#0E3A22',
  amber: '#FFB43D',
};
const MONO = "'JetBrains Mono', 'DejaVu Sans Mono', monospace";
const PIXEL = "'VT323', monospace";
const glow = (c: string, r = 10) => `0 0 ${r}px ${c}99, 0 0 2px ${c}`;

const Cursor: React.FC<{ color?: string }> = ({ color = C.green }) => {
  const frame = useCurrentFrame();
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.55em',
        height: '1em',
        verticalAlign: '-0.12em',
        background: color,
        marginLeft: 4,
        opacity: frame % 16 < 9 ? 1 : 0,
        boxShadow: glow(color),
      }}
    />
  );
};

const Typed: React.FC<{ text: string; start: number; speed: number; cursorUntil?: number }> = ({ text, start, speed, cursorUntil }) => {
  const frame = useCurrentFrame();
  const shown = typed(text, frame, start, speed);
  const typing = frame >= start && shown.length < text.length;
  const showCursor = typing || (cursorUntil !== undefined && frame >= start && frame < cursorUntil);
  return (
    <>
      {shown}
      {showCursor && <Cursor />}
    </>
  );
};

const CRT: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const flicker = 0.97 + 0.03 * Math.sin(frame * 1.7) * Math.sin(frame * 0.31);
  const scan = (frame * 9) % LAYOUT.height;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill style={{ background: `radial-gradient(1100px 1500px at 50% 45%, #062314 0%, ${C.bg} 75%)` }} />
      <AbsoluteFill style={{ opacity: flicker }}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          backgroundImage: 'repeating-linear-gradient(rgba(0,0,0,0.28) 0 2px, transparent 2px 5px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: scan,
          height: 140,
          background: 'linear-gradient(transparent, rgba(61,255,143,0.05), transparent)',
        }}
      />
      <AbsoluteFill style={{ background: 'radial-gradient(1300px 1700px at 50% 50%, transparent 60%, rgba(0,0,0,0.65))' }} />
    </AbsoluteFill>
  );
};

const Window: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      left: LAYOUT.padX - 20,
      right: LAYOUT.padX - 20,
      top: LAYOUT.top,
      bottom: 210,
      border: `2px solid ${C.dim}`,
      borderRadius: 18,
      background: 'rgba(4,16,10,0.75)',
      boxShadow: `0 0 40px rgba(61,255,143,0.12), inset 0 0 60px rgba(61,255,143,0.05)`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ height: 50, borderBottom: `2px solid ${C.faint}`, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 10 }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: 16, height: 16, borderRadius: 16, border: `2px solid ${C.dim}` }} />
      ))}
      <span style={{ flex: 1, textAlign: 'center', fontFamily: MONO, fontSize: 18, color: C.dim, marginRight: 60 }}>{BRAND.handle}</span>
    </div>
    <div style={{ flex: 1, padding: '22px 28px', display: 'flex', flexDirection: 'column', fontFamily: MONO, color: C.green, textShadow: glow(C.green, 6) }}>
      {children}
    </div>
  </div>
);

const Bar: React.FC<{ value: number; cells?: number; color?: string; height?: number }> = ({ value, cells = 24, color = C.green, height = 20 }) => (
  <div style={{ display: 'flex', gap: 4, flex: 1 }}>
    {Array.from({ length: cells }).map((_, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          height,
          background: i < Math.round(value * cells) ? color : C.faint,
          boxShadow: i < Math.round(value * cells) ? glow(color, 6) : 'none',
        }}
      />
    ))}
  </div>
);

const Prompt: React.FC<{ actLabel: string }> = ({ actLabel }) => {
  const progress = useActProgress();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 19, whiteSpace: 'nowrap' }}>
          <span style={{ color: C.dim }}>&gt; </span>
          <Typed text={actLabel} start={0} speed={2.4} />
        </div>
        <div style={{ fontSize: 16, color: C.amber, textShadow: glow(C.amber, 6), whiteSpace: 'nowrap' }}>[{BRAND.badge}]</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14 }}>
        <Bar value={progress} cells={30} height={12} />
        <span style={{ fontSize: 17, width: 56, textAlign: 'right', color: C.dim }}>{Math.round(progress * 100)}%</span>
      </div>
    </>
  );
};

const Footer: React.FC = () => (
  <div style={{ marginTop: 'auto', borderTop: `2px dashed ${C.faint}`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 19 }}>
    <span>
      <b>{BRAND.handle}</b> <span style={{ color: C.dim }}>· {BRAND.name}</span>
    </span>
    <span>{BRAND.url} →</span>
  </div>
);

const Appear: React.FC<{ start: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ start, children, style }) => {
  const frame = useCurrentFrame();
  const on = frame >= start;
  const flash = interpolate(frame, [start, start + 3, start + 6], [0.3, 1, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: on ? flash : 0, ...style }}>{children}</div>;
};

const TypedTitle: React.FC<{ start: number; speed: number }> = ({ start, speed }) => {
  const frame = useCurrentFrame();
  const budget = Math.max(0, Math.floor((frame - start) * speed));
  let used = 0;
  const done = budget >= ACT1_TEXT.title.reduce((n, w) => n + w.word.length + 1, 0);
  return (
    <div style={{ fontFamily: PIXEL, fontSize: 100, lineHeight: 0.98, color: C.green, textShadow: glow(C.green, 14) }}>
      {ACT1_TEXT.title.map((w) => {
        const visible = w.word.slice(0, Math.max(0, budget - used));
        used += w.word.length + 1;
        if (!visible) return null;
        return (
          <React.Fragment key={w.word}>
            <span
              style={
                w.highlight
                  ? { background: C.green, color: C.bg, textShadow: 'none', padding: '0 8px', boxShadow: glow(C.green, 16) }
                  : undefined
              }
            >
              {visible}
            </span>{' '}
          </React.Fragment>
        );
      })}
      {!done && <Cursor />}
    </div>
  );
};

const Act1: React.FC = () => {
  const frame = useCurrentFrame();
  const warnBlink = frame > 62 && frame < 80 ? (frame % 6 < 3 ? 1 : 0.35) : 1;
  return (
    <CRT>
      <Window>
        <Prompt actLabel={ACT1_TEXT.actLabel} />
        <Spacer h={32} />
        <Appear start={6} style={{ alignSelf: 'flex-start' }}>
          <div style={{ background: C.green, color: C.bg, textShadow: 'none', fontWeight: 700, fontSize: 19, padding: '6px 12px', boxShadow: glow(C.green, 10) }}>
            {ACT1_TEXT.tag}
          </div>
        </Appear>
        <Spacer h={20} />
        <TypedTitle start={10} speed={3.2} />
        <Spacer h={24} />
        <div style={{ borderLeft: `4px solid ${C.dim}`, paddingLeft: 20, fontSize: 26, lineHeight: 1.45, color: C.soft, minHeight: 260 }}>
          <Typed text={ACT1_TEXT.context} start={30} speed={9} />
        </div>
        <Spacer h={22} />
        <div style={{ fontSize: 23, lineHeight: 1.5 }}>
          {ACT1_TEXT.chips.map((chip, i) => (
            <Appear key={chip} start={44 + i * 4} style={{ display: 'flex', gap: 10 }}>
              <span style={{ color: C.dim, whiteSpace: 'pre' }}>{i === ACT1_TEXT.chips.length - 1 ? '└─' : '├─'}</span>
              <span>{chip}</span>
            </Appear>
          ))}
        </div>
        <Spacer h={36} />
        <Appear start={62}>
          <div style={{ border: `2px dashed ${C.amber}`, padding: '18px 22px', color: C.amber, textShadow: glow(C.amber, 8), opacity: warnBlink }}>
            <div style={{ fontWeight: 700, fontSize: 20 }}>▲ {ACT1_TEXT.warningLabel}</div>
            <div style={{ fontSize: 27, lineHeight: 1.42, marginTop: 8, color: '#FFE2B0', fontWeight: 700 }}>{ACT1_TEXT.warning}</div>
          </div>
        </Appear>
        <Footer />
      </Window>
    </CRT>
  );
};

const Act2: React.FC = () => {
  const { frame, remaining, seconds, urgent, isRevealed } = useCountdown();
  const blink = urgent > 0 && !isRevealed && frame % 10 < 5;
  const timerColor = urgent > 0 && !isRevealed ? C.amber : C.green;
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <CRT>
        <Window>
          <Prompt actLabel={ACT2_TEXT.actLabel} />
          <Spacer h={24} />
          <Appear start={8}>
            <div style={{ fontSize: 17, color: C.dim }}>{ACT2_TEXT.sourceLabel}</div>
            <div style={{ fontFamily: PIXEL, fontSize: 50, lineHeight: 1, marginTop: 6 }}>{ACT2_TEXT.sourceTitle}</div>
          </Appear>
          <Spacer h={18} />
          <Appear start={12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ width: isRevealed ? 340 : 230 }}>
                <div style={{ fontSize: 16, color: isRevealed ? C.green : C.dim }}>{isRevealed ? ACT2_TEXT.revealLabel : ACT2_TEXT.timerLabel}</div>
                <div
                  style={{
                    fontFamily: PIXEL,
                    fontSize: isRevealed ? 50 : 104,
                    lineHeight: 0.95,
                    color: timerColor,
                    textShadow: glow(timerColor, 16),
                    opacity: blink ? 0.4 : 1,
                  }}
                >
                  {isRevealed ? ACT2_TEXT.revealValue : `${String(seconds).padStart(2, '0')}s`}
                </div>
              </div>
              <Bar value={isRevealed ? 1 : remaining} cells={20} color={timerColor} height={34} />
            </div>
          </Appear>
          <Spacer h={18} />
          <div style={{ fontSize: 24, lineHeight: 1.42, color: C.soft, minHeight: 176 }}>
            <Typed text={ACT2_TEXT.question} start={16} speed={14} />
          </div>
          <Spacer h={12} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ACT2_TEXT.options.map((o, i) => {
              const correct = o.letter === ACT2_TEXT.correct;
              const inverse = correct && isRevealed;
              return (
                <Appear key={o.letter} start={30 + i * 4}>
                  <div
                    style={{
                      display: 'flex',
                      gap: 14,
                      fontSize: 24,
                      lineHeight: 1.38,
                      padding: '8px 10px',
                      background: inverse ? C.green : 'transparent',
                      color: inverse ? C.bg : isRevealed ? C.dim : C.green,
                      textShadow: inverse ? 'none' : undefined,
                      boxShadow: inverse ? glow(C.green, 18) : 'none',
                      fontWeight: inverse ? 700 : 400,
                    }}
                  >
                    <span style={{ whiteSpace: 'pre', fontWeight: 700 }}>[{o.letter}]</span>
                    <span>{o.text}</span>
                  </div>
                  {inverse && (
                    <div
                      style={{
                        textAlign: 'right',
                        marginTop: 6,
                        fontSize: 18,
                        fontWeight: 700,
                        color: C.amber,
                        textShadow: glow(C.amber, 8),
                        opacity: frame % 14 < 9 ? 1 : 0.4,
                      }}
                    >
                      {ACT2_TEXT.correctBadge}
                    </div>
                  )}
                </Appear>
              );
            })}
          </div>
          <Spacer h={20} />
          {!isRevealed ? (
            <Appear start={48}>
              <div style={{ border: `2px dashed ${C.dim}`, padding: '14px 18px' }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>
                  <span style={{ opacity: frame % 20 < 10 ? 1 : 0.2 }}>●</span> {ACT2_TEXT.hintLabel}
                </div>
                <div style={{ fontSize: 22, lineHeight: 1.42, color: C.soft, marginTop: 6 }}>{ACT2_TEXT.hint}</div>
              </div>
            </Appear>
          ) : (
            <div style={{ border: `4px double ${C.green}`, padding: '14px 18px', boxShadow: glow(C.green, 14) }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700 }}>
                <span>{ACT2_TEXT.answerLabel}</span>
                <span style={{ color: C.dim, fontWeight: 400, fontSize: 13 }}>{ACT2_TEXT.answerSide}</span>
              </div>
              <div style={{ fontSize: 22, lineHeight: 1.42, color: C.soft, marginTop: 8, minHeight: 190 }}>
                <Typed text={ACT2_TEXT.answer} start={ACT2_REVEAL + 6} speed={9} cursorUntil={ACT2_REVEAL + 140} />
              </div>
            </div>
          )}
          <Footer />
        </Window>
      </CRT>
    </AbsoluteFill>
  );
};

const Wire: React.FC<{ left: number; top: number; w: number; h: number; rotate: number; children?: React.ReactNode }> = ({
  left,
  top,
  w,
  h,
  rotate,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      width: w,
      height: h,
      border: `2px solid ${C.green}`,
      boxShadow: glow(C.green, 10),
      background: 'rgba(4,16,10,0.9)',
      transform: `perspective(900px) rotateY(${rotate}deg)`,
      padding: 16,
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

const Kpi: React.FC<{ label: string; value: number; suffix: string; start: number }> = ({ label, value, suffix, start }) => {
  const n = useCountUp(value, start, 24);
  return (
    <Appear start={start - 4} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 22 }}>
      <span style={{ whiteSpace: 'nowrap', color: C.soft }}>{label}</span>
      <span style={{ flex: 1, borderBottom: `2px dotted ${C.dim}`, transform: 'translateY(-6px)' }} />
      <span style={{ fontFamily: PIXEL, fontSize: 52, lineHeight: 1 }}>
        {n}
        {suffix}
      </span>
    </Appear>
  );
};

const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const sweep = (frame * 6) % 360;
  const cta = useSpring(84, 14);
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <CRT>
        <Window>
          <Prompt actLabel={ACT3_TEXT.actLabel} />
          <Spacer h={28} />
          <div style={{ fontFamily: PIXEL, fontSize: 84, lineHeight: 1, textShadow: glow(C.green, 14) }}>
            <Typed text={ACT3_TEXT.titleA} start={6} speed={3} />
            <br />
            <span style={{ color: C.soft }}>
              <Typed text={ACT3_TEXT.titleB} start={16} speed={3} />
            </span>
          </div>
          <Spacer h={26} />
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Appear start={20} style={{ position: 'relative', width: 350, height: 430, flexShrink: 0 }}>
              <Wire left={0} top={30} w={220} h={340} rotate={18}>
                <div style={{ fontSize: 12 }}>NEXO Fiscal</div>
                <div style={{ fontFamily: PIXEL, fontSize: 30, lineHeight: 0.95, marginTop: 140 }}>
                  {ACT3_TEXT.cover.top}
                  <br />
                  <span style={{ color: C.soft }}>{ACT3_TEXT.cover.bottom}</span>
                </div>
              </Wire>
              <Wire left={168} top={0} w={182} h={370} rotate={-14}>
                {[60, 92, 84, 90, 70, 88, 94, 56, 82, 74].map((w, i) => (
                  <div key={i} style={{ width: `${w}%`, height: 6, background: i === 0 ? C.green : C.faint, marginBottom: 14 }} />
                ))}
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: `${(sweep / 360) * 100}%`,
                    height: 3,
                    background: C.green,
                    boxShadow: glow(C.green, 14),
                  }}
                />
              </Wire>
              <div style={{ position: 'absolute', bottom: 0, left: 0, fontSize: 14, color: C.dim }}>{ACT3_TEXT.sampleTag}</div>
            </Appear>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30 }}>
              {ACT3_TEXT.kpis.map((k, i) => (
                <Kpi key={k.label} {...k} start={30 + i * 8} />
              ))}
            </div>
          </div>
          <Spacer h={24} />
          {ACT3_TEXT.bullets.map((b, i) => (
            <Appear key={b.n} start={62 + i * 8} style={{ display: 'flex', gap: 16, fontSize: 25, lineHeight: 1.42, marginBottom: 18 }}>
              <span style={{ fontWeight: 700 }}>{b.n}</span>
              <span style={{ color: C.soft }}>{b.text}</span>
            </Appear>
          ))}
          <Spacer h={24} />
          <div
            style={{
              opacity: ramp(frame, 84, 90),
              border: `3px solid ${C.green}`,
              padding: '18px 20px',
              boxShadow: glow(C.green, 10 + cta * 8),
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700 }}>{ACT3_TEXT.ctaLabel}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontFamily: PIXEL, fontSize: 52, lineHeight: 1, color: C.soft }}>{BRAND.url}</span>
              <span
                style={{
                  background: frame % 24 < 16 ? C.green : 'transparent',
                  color: frame % 24 < 16 ? C.bg : C.green,
                  border: `2px solid ${C.green}`,
                  textShadow: 'none',
                  fontWeight: 700,
                  fontSize: 19,
                  padding: '10px 12px',
                  whiteSpace: 'nowrap',
                }}
              >
                [ {ACT3_TEXT.ctaButton} → ]
              </span>
            </div>
          </div>
          <Footer />
        </Window>
      </CRT>
    </AbsoluteFill>
  );
};

export const TerminalStory = makeStory({ name: 'Terminal', Act1, Act2, Act3, base: C.bg });
