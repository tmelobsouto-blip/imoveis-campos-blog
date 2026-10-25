import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Enter, Spacer, Stack, wipeIn } from '../components/primitives';
import { ACT1_TEXT, ACT2_TEXT, ACT3_TEXT, BRAND } from '../content';
import { easeOut, ramp, useActProgress, useCountdown, useCountUp, useSpring } from '../shared/motion';
import { makeStory } from '../shared/StyledStory';
import { ACT2_REVEAL, WIPE } from '../timeline';

const C = {
  paper: '#F2EDE2',
  paperDeep: '#E7DFCF',
  ink: '#161412',
  muted: '#6E675C',
  red: '#C23A22',
  redSoft: '#E8664B',
};
const SERIF = "'Fraunces', serif";
const MONO = "'JetBrains Mono', monospace";

const Paper: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.paper,
      backgroundImage:
        'radial-gradient(rgba(22,20,18,0.05) 1.2px, transparent 1.2px), radial-gradient(1200px 900px at 50% 40%, transparent 60%, rgba(120,100,70,0.16))',
      backgroundSize: '7px 7px, 100% 100%',
    }}
  />
);

const Caps: React.FC<{ color?: string; size?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  color = C.ink,
  size = 16,
  children,
  style,
}) => (
  <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: size, letterSpacing: 1.6, color, ...style }}>{children}</div>
);

const Masthead: React.FC<{ actLabel: string; big?: boolean }> = ({ actLabel, big }) => {
  const progress = useActProgress();
  const p = useSpring(0);
  return (
    <div style={{ opacity: p }}>
      <div style={{ height: 6, background: C.ink }} />
      <div style={{ height: 2, background: C.ink, marginTop: 4 }} />
      <div
        style={{
          fontFamily: SERIF,
          fontWeight: 900,
          fontSize: big ? 76 : 52,
          letterSpacing: -1.5,
          textAlign: 'center',
          color: C.ink,
          lineHeight: 1,
          padding: big ? '18px 0 14px' : '12px 0 10px',
        }}
      >
        NEXO <span style={{ fontStyle: 'italic', color: C.red }}>Fiscal</span>
      </div>
      <div style={{ position: 'relative', height: 2, background: C.ink }}>
        <div style={{ position: 'absolute', left: 0, top: -2, height: 6, width: `${progress * 100}%`, background: C.red }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
        <Caps size={15} color={C.muted} style={{ fontWeight: 500 }}>
          {actLabel}
        </Caps>
        <Caps size={15} color={C.red}>
          {BRAND.badge}
        </Caps>
      </div>
      <div style={{ height: 1, background: C.ink }} />
    </div>
  );
};

const FooterRule: React.FC = () => (
  <Enter start={20} y={12}>
    <div style={{ height: 2, background: C.ink }} />
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, fontFamily: MONO, fontSize: 20, color: C.ink }}>
      <span>
        <b style={{ color: C.red }}>{BRAND.handle}</b> · {BRAND.name}
      </span>
      <span>{BRAND.url} →</span>
    </div>
  </Enter>
);

const HeadWord: React.FC<{ word: string; highlight?: boolean; start: number }> = ({ word, highlight, start }) => {
  const p = useSpring(start, 18);
  const line = easeOut(ramp(useCurrentFrame(), start + 8, start + 22));
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', marginRight: 18, paddingBottom: 8 }}>
      <span
        style={{
          display: 'inline-block',
          position: 'relative',
          transform: `translateY(${(1 - p) * 105}%)`,
          fontStyle: highlight ? 'italic' : 'normal',
          color: highlight ? C.red : C.ink,
        }}
      >
        {word}
        {highlight && (
          <span
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 2,
              height: 7,
              background: C.red,
              transform: `scaleX(${line})`,
              transformOrigin: 'left',
            }}
          />
        )}
      </span>
    </span>
  );
};

const Act1: React.FC = () => {
  const frame = useCurrentFrame();
  const warn = useSpring(62, 14);
  return (
    <>
      <Paper />
      <Stack gap={0}>
        <Masthead actLabel={ACT1_TEXT.actLabel} big />
        <Spacer h={44} />
        <Enter start={6} y={10}>
          <Caps color={C.red} size={18} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 14, height: 14, background: C.red }} />
            {ACT1_TEXT.tag}
          </Caps>
        </Enter>
        <Spacer h={16} />
        <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 78, lineHeight: 1.02, letterSpacing: -1.8 }}>
          {ACT1_TEXT.title.map((w, i) => (
            <HeadWord key={w.word} word={w.word} highlight={w.highlight} start={10 + i * 3} />
          ))}
        </div>
        <Spacer h={22} />
        <Enter start={32}>
          <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 31, lineHeight: 1.45, color: C.ink }}>
            <span
              style={{
                float: 'left',
                fontFamily: SERIF,
                fontWeight: 900,
                fontSize: 136,
                lineHeight: 0.82,
                color: C.red,
                margin: '6px 14px 0 0',
              }}
            >
              {ACT1_TEXT.context[0]}
            </span>
            {ACT1_TEXT.context.slice(1)}
          </div>
        </Enter>
        <Spacer h={40} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 28, rowGap: 18 }}>
          {ACT1_TEXT.chips.map((chip, i) => (
            <Enter key={chip} start={42 + i * 4} y={12}>
              <div style={{ position: 'relative', borderTop: `2px solid ${C.ink}`, paddingTop: 12 }}>
                <div
                  style={{
                    position: 'absolute',
                    top: -2,
                    left: 0,
                    height: 2,
                    width: `${easeOut(ramp(frame, 42 + i * 4, 60 + i * 4)) * 100}%`,
                    background: C.red,
                  }}
                />
                <div style={{ fontFamily: MONO, fontSize: 20, lineHeight: 1.45, color: C.ink }}>{chip}</div>
              </div>
            </Enter>
          ))}
        </div>
        <Spacer h={46} />
        <div
          style={{
            opacity: warn,
            transform: `translateX(${(1 - warn) * -40}px)`,
            borderLeft: `10px solid ${C.red}`,
            paddingLeft: 28,
            paddingTop: 4,
          }}
        >
          <Caps color={C.red} size={16}>
            ▲ {ACT1_TEXT.warningLabel}
          </Caps>
          <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 600, fontSize: 35, lineHeight: 1.3, color: C.ink, marginTop: 10 }}>
            “{ACT1_TEXT.warning}”
          </div>
        </div>
        <Spacer h={30} />
        <FooterRule />
      </Stack>
    </>
  );
};

const Stamp: React.FC = () => {
  const s = useSpring(ACT2_REVEAL + 6, 11);
  return (
    <div
      style={{
        position: 'absolute',
        right: -14,
        top: -48,
        transform: `rotate(-9deg) scale(${interpolate(s, [0, 1], [2.2, 1])})`,
        opacity: Math.min(1, s * 2),
        border: `4px solid ${C.red}`,
        color: C.red,
        borderRadius: 8,
        padding: '6px 14px',
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: 2,
        background: 'rgba(242,237,226,0.85)',
      }}
    >
      {ACT2_TEXT.correctBadge}
    </div>
  );
};

const Act2: React.FC = () => {
  const { frame, remaining, seconds, urgent, isRevealed, revealed, tick } = useCountdown();
  const circle = easeOut(ramp(frame, ACT2_REVEAL, ACT2_REVEAL + 18));
  const answer = useSpring(ACT2_REVEAL + 14);
  const R = 66;
  const arc = 2 * Math.PI * R;
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Paper />
      <Stack gap={0}>
        <Masthead actLabel={ACT2_TEXT.actLabel} />
        <Spacer h={26} />
        <Enter start={8}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <div style={{ flex: 1 }}>
              <Caps color={C.red} size={15}>
                {ACT2_TEXT.sourceLabel}
              </Caps>
              <div style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 36, lineHeight: 1.15, letterSpacing: -0.6, color: C.ink, marginTop: 10 }}>
                {ACT2_TEXT.sourceTitle}
              </div>
            </div>
            <div style={{ width: 170, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Caps size={13} color={isRevealed ? C.red : C.muted} style={{ textAlign: 'center' }}>
                {isRevealed ? ACT2_TEXT.revealLabel : ACT2_TEXT.timerLabel}
              </Caps>
              <div style={{ position: 'relative', width: 148, height: 148, marginTop: 8 }}>
                <svg width={148} height={148} style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                  <circle cx={74} cy={74} r={R} fill="none" stroke={C.ink} strokeWidth={2} />
                  <circle
                    cx={74}
                    cy={74}
                    r={R}
                    fill="none"
                    stroke={C.red}
                    strokeWidth={7}
                    strokeDasharray={arc}
                    strokeDashoffset={arc * (1 - (isRevealed ? 1 : remaining))}
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: SERIF,
                    fontWeight: 900,
                    fontSize: 78,
                    color: urgent > 0 || isRevealed ? C.red : C.ink,
                    transform: `scale(${isRevealed ? revealed : 1 + (1 - tick) * 0.06 * urgent})`,
                  }}
                >
                  {isRevealed ? '✓' : seconds}
                </div>
              </div>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 700, fontSize: 26, color: C.red, marginTop: 6 }}>
                {isRevealed ? ACT2_TEXT.revealValue : `${seconds}s`}
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', height: 2, background: C.ink, marginTop: 18 }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: -3,
                height: 8,
                width: `${(isRevealed ? 1 : remaining) * 100}%`,
                background: isRevealed ? C.ink : C.red,
              }}
            />
          </div>
        </Enter>
        <Spacer h={24} />
        <Enter start={16}>
          <div style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 29, lineHeight: 1.42, color: C.ink }}>{ACT2_TEXT.question}</div>
        </Enter>
        <Spacer h={16} />
        <div style={{ borderTop: `1px solid ${C.ink}` }}>
          {ACT2_TEXT.options.map((o, i) => {
            const correct = o.letter === ACT2_TEXT.correct;
            return (
              <Enter key={o.letter} start={24 + i * 6} y={16}>
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    gap: 20,
                    alignItems: 'center',
                    padding: '14px 4px',
                    borderBottom: `1px solid ${C.ink}`,
                    opacity: correct ? 1 : interpolate(revealed, [0, 1], [1, 0.38]),
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      border: `2px solid ${C.ink}`,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: SERIF,
                      fontWeight: 800,
                      fontSize: 26,
                      background: correct && isRevealed ? C.red : 'transparent',
                      color: correct && isRevealed ? C.paper : C.ink,
                      borderColor: correct && isRevealed ? C.red : C.ink,
                    }}
                  >
                    {o.letter}
                  </div>
                  <div style={{ fontFamily: SERIF, fontWeight: correct && isRevealed ? 700 : 400, fontSize: 26, lineHeight: 1.34, color: C.ink }}>
                    {o.text}
                  </div>
                  {correct && isRevealed && (
                    <>
                      <svg
                        width={1040}
                        height={180}
                        viewBox="0 0 960 170"
                        preserveAspectRatio="none"
                        style={{ position: 'absolute', left: -62, top: -38, pointerEvents: 'none' }}
                      >
                        <path
                          d="M60 95 C 40 6, 900 -4, 942 70 C 978 150, 120 178, 34 122 C 4 98, 40 38, 112 22"
                          fill="none"
                          stroke={C.red}
                          strokeWidth={4}
                          strokeLinecap="round"
                          pathLength={1}
                          strokeDasharray={1}
                          strokeDashoffset={1 - circle}
                        />
                      </svg>
                      <Stamp />
                    </>
                  )}
                </div>
              </Enter>
            );
          })}
        </div>
        <Spacer h={22} />
        {!isRevealed ? (
          <Enter start={44}>
            <div style={{ border: `2px dashed ${C.ink}`, padding: '16px 22px' }}>
              <Caps color={C.red} size={15}>
                <span style={{ opacity: interpolate(Math.sin(frame / 4), [-1, 1], [0.3, 1]) }}>●</span> {ACT2_TEXT.hintLabel}
              </Caps>
              <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: 25, lineHeight: 1.38, color: C.ink, marginTop: 8 }}>
                {ACT2_TEXT.hint}
              </div>
            </div>
          </Enter>
        ) : (
          <div style={{ opacity: answer, transform: `translateY(${(1 - answer) * 24}px)`, background: C.ink, padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Caps color={C.redSoft} size={16}>
                {ACT2_TEXT.answerLabel}
              </Caps>
              <Caps color="#A49C8F" size={12} style={{ fontWeight: 500 }}>
                {ACT2_TEXT.answerSide}
              </Caps>
            </div>
            <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 25, lineHeight: 1.4, color: C.paper, marginTop: 10 }}>{ACT2_TEXT.answer}</div>
          </div>
        )}
        <Spacer h={24} />
        <FooterRule />
      </Stack>
    </AbsoluteFill>
  );
};

const Sheet: React.FC<{ rotate: number; x: number; y: number; dark?: boolean; children?: React.ReactNode }> = ({
  rotate,
  x,
  y,
  dark,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 250,
      height: 340,
      transform: `rotate(${rotate}deg)`,
      background: dark ? C.ink : '#FBF8F1',
      border: `2px solid ${C.ink}`,
      boxShadow: '6px 8px 0 rgba(22,20,18,0.18)',
      padding: 20,
      boxSizing: 'border-box',
    }}
  >
    {children}
  </div>
);

const Rule: React.FC<{ w: number; c?: string; h?: number }> = ({ w, c = '#CFC6B5', h = 6 }) => (
  <div style={{ width: `${w}%`, height: h, background: c, marginBottom: 8 }} />
);

const Kpi: React.FC<{ label: string; value: number; suffix: string; start: number }> = ({ label, value, suffix, start }) => {
  const n = useCountUp(value, start);
  return (
    <Enter start={start - 6} y={10}>
      <div style={{ borderBottom: `1px solid ${C.ink}`, padding: '8px 0 10px' }}>
        <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 52, lineHeight: 1, color: C.red, letterSpacing: -1 }}>
          {n}
          <span style={{ fontSize: 30 }}>{suffix}</span>
        </div>
        <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 600, fontSize: 23, color: C.ink, marginTop: 4 }}>{label}</div>
      </div>
    </Enter>
  );
};

const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const fig = useSpring(16, 16);
  const cta = useSpring(84, 13);
  const press = 1 + 0.035 * Math.max(0, Math.sin(frame / 7));
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Paper />
      <Stack gap={0}>
        <Masthead actLabel={ACT3_TEXT.actLabel} />
        <Spacer h={32} />
        <Enter start={8}>
          <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 60, lineHeight: 1.06, letterSpacing: -1.6, color: C.ink }}>
            {ACT3_TEXT.titleA}
            <br />
            <span style={{ fontStyle: 'italic', color: C.red }}>{ACT3_TEXT.titleB}</span>
          </div>
        </Enter>
        <Spacer h={30} />
        <div style={{ display: 'flex', gap: 36, borderTop: `2px solid ${C.ink}`, paddingTop: 24 }}>
          <div style={{ width: 400, flexShrink: 0 }}>
            <div style={{ position: 'relative', height: 400, opacity: fig, transform: `translateY(${(1 - fig) * 30}px)` }}>
              <Sheet rotate={-7 + Math.sin(frame / 20) * 1.2} x={0} y={30} dark>
                <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 14, color: C.paper }}>
                  NEXO <i style={{ color: C.redSoft }}>Fiscal</i>
                </div>
                <div style={{ marginTop: 110, fontFamily: SERIF, fontWeight: 900, fontSize: 28, lineHeight: 1, color: C.paper }}>
                  {ACT3_TEXT.cover.top}
                  <br />
                  <i style={{ color: C.redSoft }}>{ACT3_TEXT.cover.bottom}</i>
                </div>
                <div style={{ marginTop: 18 }}>
                  <Rule w={80} c="rgba(242,237,226,0.22)" h={5} />
                  <Rule w={64} c="rgba(242,237,226,0.22)" h={5} />
                </div>
              </Sheet>
              <Sheet rotate={5 + Math.sin(frame / 16) * 1.2} x={168} y={10}>
                <Rule w={40} c={C.ink} h={8} />
                <div style={{ height: 8 }} />
                {[92, 86, 90, 70, 88, 94, 60].map((w, i) => (
                  <Rule key={i} w={w} />
                ))}
                <div style={{ width: 90, height: 12, background: C.red, margin: '6px 0 12px' }} />
                {[90, 84, 92, 58].map((w, i) => (
                  <Rule key={i} w={w} />
                ))}
              </Sheet>
            </div>
            <Caps size={13} color={C.muted} style={{ marginTop: 10, fontWeight: 500 }}>
              {ACT3_TEXT.sampleTag}
            </Caps>
          </div>
          <div style={{ flex: 1, borderTop: `1px solid ${C.ink}` }}>
            {ACT3_TEXT.kpis.map((k, i) => (
              <Kpi key={k.label} label={k.label} value={k.value} suffix={k.suffix} start={30 + i * 8} />
            ))}
          </div>
        </div>
        <Spacer h={28} />
        {ACT3_TEXT.bullets.map((b, i) => (
          <Enter key={b.n} start={62 + i * 8} y={14}>
            <div style={{ display: 'flex', gap: 22, alignItems: 'baseline', padding: '12px 0', borderTop: `1px solid ${C.ink}` }}>
              <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 44, color: C.red, lineHeight: 1 }}>{b.n}</span>
              <span style={{ fontFamily: SERIF, fontSize: 26, lineHeight: 1.38, color: C.ink }}>{b.text}</span>
            </div>
          </Enter>
        ))}
        <Spacer h={26} />
        <div
          style={{
            opacity: cta,
            transform: `translateY(${(1 - cta) * 30}px)`,
            position: 'relative',
            border: `3px dashed ${C.ink}`,
            background: C.paperDeep,
            padding: '22px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <span style={{ position: 'absolute', top: -22, left: 30, fontSize: 32, background: C.paper, padding: '0 6px', color: C.ink, fontFamily: 'DejaVu Sans' }}>
            ✂
          </span>
          <div style={{ flex: 1 }}>
            <Caps color={C.red} size={14} style={{ letterSpacing: 0.8 }}>
              {ACT3_TEXT.ctaLabel}
            </Caps>
            <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 40, letterSpacing: -0.8, color: C.ink, marginTop: 6 }}>{BRAND.url}</div>
          </div>
          <div
            style={{
              transform: `scale(${press})`,
              background: C.red,
              color: C.paper,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: 1,
              padding: '18px 18px',
              whiteSpace: 'nowrap',
            }}
          >
            {ACT3_TEXT.ctaButton} →
          </div>
        </div>
        <Spacer h={24} />
        <FooterRule />
      </Stack>
    </AbsoluteFill>
  );
};

export const EditorialStory = makeStory({ name: 'Editorial', Act1, Act2, Act3, base: C.paper });
