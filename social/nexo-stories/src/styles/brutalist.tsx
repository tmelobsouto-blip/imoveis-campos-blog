import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { BoltIcon, ClockIcon, Spacer, Stack, wipeIn } from '../components/primitives';
import { ACT1_TEXT, ACT2_TEXT, ACT3_TEXT, BRAND } from '../content';
import { useActProgress, useCountdown, useCountUp, useSpring } from '../shared/motion';
import { makeStory } from '../shared/StyledStory';
import { ACT2_REVEAL, WIPE } from '../timeline';

const C = {
  yellow: '#FFD23F',
  pink: '#FF6FA3',
  blue: '#3D6BFF',
  sky: '#9DB8FF',
  green: '#2BD67B',
  lilac: '#B9A6FF',
  orange: '#FF8A3D',
  red: '#FF4D4D',
  ink: '#111111',
  white: '#FFFFFF',
  cream: '#FFF6E0',
  gray: '#E6E0D2',
};
const DISPLAY = "'Archivo Black', sans-serif";
const BODY = "'Space Grotesk', sans-serif";

const box = (bg: string, shadow = 8, border = 4): React.CSSProperties => ({
  background: bg,
  border: `${border}px solid ${C.ink}`,
  boxShadow: `${shadow}px ${shadow}px 0 ${C.ink}`,
  borderRadius: 14,
});

const Dots: React.FC<{ bg: string; grid?: boolean }> = ({ bg, grid }) => (
  <AbsoluteFill
    style={{
      backgroundColor: bg,
      backgroundImage: grid
        ? 'linear-gradient(rgba(17,17,17,0.07) 2px, transparent 2px), linear-gradient(90deg, rgba(17,17,17,0.07) 2px, transparent 2px)'
        : 'radial-gradient(rgba(17,17,17,0.22) 2px, transparent 2px)',
      backgroundSize: grid ? '54px 54px' : '30px 30px',
    }}
  />
);

const Slam: React.FC<{ start: number; rotate?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  start,
  rotate = 0,
  style,
  children,
}) => {
  const p = useSpring(start, 11);
  return (
    <div
      style={{
        opacity: Math.min(1, p * 3),
        transform: `scale(${interpolate(p, [0, 1], [1.35, 1])}) rotate(${rotate * p}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = C.ink,
  size = 18,
  style,
}) => <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: size, letterSpacing: 1, color, ...style }}>{children}</div>;

const Header: React.FC<{ actLabel: string }> = ({ actLabel }) => {
  const progress = useActProgress();
  return (
    <Slam start={0}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ ...box(C.ink, 6), padding: '12px 20px', fontFamily: DISPLAY, fontSize: 36, color: C.white, lineHeight: 1 }}>
          NEXO <span style={{ color: C.green }}>Fiscal</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ ...box(C.pink, 5, 3), padding: '10px 14px', transform: 'rotate(3deg)' }}>
          <Label size={16}>{BRAND.badge}</Label>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 18 }}>
        <Label size={16} style={{ whiteSpace: 'nowrap' }}>
          {actLabel}
        </Label>
        <div style={{ flex: 1, height: 18, border: `3px solid ${C.ink}`, borderRadius: 18, background: C.white, overflow: 'hidden' }}>
          <div
            style={{
              width: `${progress * 100}%`,
              height: '100%',
              background: `repeating-linear-gradient(-45deg, ${C.ink} 0 10px, ${C.blue} 10px 20px)`,
            }}
          />
        </div>
      </div>
    </Slam>
  );
};

const Footer: React.FC = () => (
  <Slam start={20}>
    <div
      style={{
        ...box(C.white, 6),
        padding: '18px 22px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: BODY,
        fontWeight: 700,
        fontSize: 22,
        color: C.ink,
      }}
    >
      <span>
        <span style={{ background: C.green, padding: '0 6px' }}>{BRAND.handle}</span> · {BRAND.name}
      </span>
      <span>{BRAND.url} →</span>
    </div>
  </Slam>
);

const Act1: React.FC = () => {
  const frame = useCurrentFrame();
  const chipColors = [C.green, C.lilac, C.orange, C.sky];
  const shake = Math.sin(frame / 2.2) * 0.7 * (frame > 70 ? 1 : 0);
  return (
    <>
      <Dots bg={C.yellow} />
      <Stack gap={0}>
        <Header actLabel={ACT1_TEXT.actLabel} />
        <Spacer h={40} />
        <Slam start={6} rotate={-2} style={{ alignSelf: 'flex-start' }}>
          <div style={{ ...box(C.green, 5, 3), padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <BoltIcon color={C.ink} size={24} />
            <Label size={19}>{ACT1_TEXT.tag}</Label>
          </div>
        </Slam>
        <Spacer h={26} />
        <div style={{ fontFamily: DISPLAY, fontSize: 80, lineHeight: 1.12, letterSpacing: -1.5, color: C.ink }}>
          {ACT1_TEXT.title.map((w, i) => (
            <Slam
              key={w.word}
              start={10 + i * 3}
              rotate={w.highlight ? (w.word === 'ITBI' ? 3 : -3) : 0}
              style={{ display: 'inline-block', marginRight: 18 }}
            >
              {w.highlight ? (
                <span
                  style={{
                    ...box(w.word === 'ITBI' ? C.blue : C.pink, 6),
                    display: 'inline-block',
                    padding: '0 14px',
                    color: w.word === 'ITBI' ? C.white : C.ink,
                  }}
                >
                  {w.word}
                </span>
              ) : (
                w.word
              )}
            </Slam>
          ))}
        </div>
        <Spacer h={30} />
        <Slam start={32}>
          <div style={{ ...box(C.white), padding: '24px 28px', fontFamily: BODY, fontWeight: 500, fontSize: 29, lineHeight: 1.42, color: C.ink }}>
            {ACT1_TEXT.context}
          </div>
        </Slam>
        <Spacer h={30} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {ACT1_TEXT.chips.map((chip, i) => (
            <Slam key={chip} start={42 + i * 4} rotate={i % 2 ? 1.2 : -1.2}>
              <div
                style={{
                  ...box(chipColors[i], 5, 3),
                  padding: '14px 18px',
                  fontFamily: BODY,
                  fontWeight: 700,
                  fontSize: 21,
                  lineHeight: 1.35,
                  color: C.ink,
                  height: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {chip}
              </div>
            </Slam>
          ))}
        </div>
        <Spacer h={38} />
        <Slam start={62} style={{ transform: `rotate(${shake}deg)` }}>
          <div style={{ ...box(C.ink, 10), boxShadow: `10px 10px 0 ${C.pink}`, padding: '24px 28px' }}>
            <Label color={C.yellow} size={19}>
              ▲ {ACT1_TEXT.warningLabel}
            </Label>
            <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: 30, lineHeight: 1.36, color: C.white, marginTop: 10 }}>
              {ACT1_TEXT.warning}
            </div>
          </div>
        </Slam>
        <Spacer h={30} />
        <Footer />
      </Stack>
    </>
  );
};

const LETTER_COLORS: Record<string, string> = { A: C.pink, B: C.sky, C: C.green, D: C.orange };

const Act2: React.FC = () => {
  const { frame, remaining, seconds, urgent, isRevealed, revealed } = useCountdown();
  const sticker = useSpring(ACT2_REVEAL + 8, 10);
  const answer = useSpring(ACT2_REVEAL + 14, 12);
  const blocks = Math.ceil(remaining * 10);
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Dots bg={C.cream} grid />
      <Stack gap={0}>
        <Header actLabel={ACT2_TEXT.actLabel} />
        <Spacer h={30} />
        <Slam start={8}>
          <div style={{ ...box(C.white), padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ flex: 1 }}>
              <Label color={C.blue} size={16}>
                {ACT2_TEXT.sourceLabel}
              </Label>
              <div style={{ fontFamily: DISPLAY, fontSize: 30, lineHeight: 1.15, color: C.ink, marginTop: 8 }}>{ACT2_TEXT.sourceTitle}</div>
            </div>
            <div style={{ width: 150, textAlign: 'center' }}>
              <Label size={14}>{isRevealed ? ACT2_TEXT.revealLabel : ACT2_TEXT.timerLabel}</Label>
              <div
                style={{
                  margin: '8px auto 0',
                  width: 112,
                  height: 112,
                  borderRadius: 112,
                  background: isRevealed ? C.green : C.ink,
                  border: `4px solid ${C.ink}`,
                  boxShadow: `5px 5px 0 ${urgent > 0 && !isRevealed ? C.red : C.ink}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: DISPLAY,
                  fontSize: isRevealed ? 54 : 56,
                  color: isRevealed ? C.ink : urgent > 0 ? C.red : C.yellow,
                  transform: `rotate(${isRevealed ? 0 : Math.sin(frame / 3) * 4 * urgent}deg) scale(${isRevealed ? revealed : 1})`,
                }}
              >
                {isRevealed ? 'B' : seconds}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 22,
                  border: `3px solid ${C.ink}`,
                  borderRadius: 6,
                  background: isRevealed ? C.green : i < blocks ? (urgent > 0 ? C.red : C.yellow) : C.white,
                }}
              />
            ))}
          </div>
          {isRevealed && (
            <div style={{ fontFamily: DISPLAY, fontSize: 22, color: C.ink, marginTop: 10, textAlign: 'right', opacity: revealed }}>
              {ACT2_TEXT.revealValue}
            </div>
          )}
        </Slam>
        <Spacer h={isRevealed ? 16 : 28} />
        <Slam start={16}>
          <div style={{ ...box(C.white), padding: '22px 26px', fontFamily: BODY, fontWeight: 700, fontSize: 28, lineHeight: 1.38, color: C.ink }}>
            {ACT2_TEXT.question}
          </div>
        </Slam>
        <Spacer h={24} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ACT2_TEXT.options.map((o, i) => {
            const correct = o.letter === ACT2_TEXT.correct;
            const press = correct ? revealed : 0;
            return (
              <Slam key={o.letter} start={24 + i * 6}>
                <div
                  style={{
                    ...box(correct && isRevealed ? C.green : isRevealed ? C.gray : C.white, 6),
                    boxShadow: `${6 - press * 6}px ${6 - press * 6}px 0 ${C.ink}`,
                    transform: `translate(${press * 6}px, ${press * 6}px)`,
                    opacity: !correct && isRevealed ? interpolate(revealed, [0, 1], [1, 0.55]) : 1,
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      ...box(LETTER_COLORS[o.letter], 0, 3),
                      borderRadius: 10,
                      width: 54,
                      height: 54,
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: DISPLAY,
                      fontSize: 28,
                    }}
                  >
                    {o.letter}
                  </div>
                  <div style={{ fontFamily: BODY, fontWeight: correct && isRevealed ? 700 : 500, fontSize: 25, lineHeight: 1.34, color: C.ink }}>{o.text}</div>
                  {correct && isRevealed && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: -36,
                        ...box(C.ink, 4, 3),
                        borderRadius: 10,
                        padding: '8px 14px',
                        transform: `rotate(${6 * sticker}deg) scale(${interpolate(sticker, [0, 1], [2, 1])})`,
                        opacity: Math.min(1, sticker * 2),
                      }}
                    >
                      <Label color={C.green} size={20}>
                        {ACT2_TEXT.correctBadge}
                      </Label>
                    </div>
                  )}
                </div>
              </Slam>
            );
          })}
        </div>
        <Spacer h={26} />
        {!isRevealed ? (
          <Slam start={44}>
            <div style={{ ...box(C.lilac, 6), padding: '16px 22px' }}>
              <Label size={16} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ClockIcon color={C.ink} size={20} />
                {ACT2_TEXT.hintLabel}
              </Label>
              <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 24, lineHeight: 1.38, color: C.ink, marginTop: 8 }}>{ACT2_TEXT.hint}</div>
            </div>
          </Slam>
        ) : (
          <div style={{ opacity: Math.min(1, answer * 2), transform: `scale(${interpolate(answer, [0, 1], [0.85, 1])})` }}>
            <div style={{ ...box(C.ink, 8), boxShadow: `8px 8px 0 ${C.green}`, padding: '18px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
                <Label color={C.green} size={17}>
                  {ACT2_TEXT.answerLabel}
                </Label>
                <Label color="#9A9A9A" size={12}>
                  {ACT2_TEXT.answerSide}
                </Label>
              </div>
              <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: 24, lineHeight: 1.38, color: C.white, marginTop: 8 }}>{ACT2_TEXT.answer}</div>
            </div>
          </div>
        )}
        <Spacer h={24} />
        <Footer />
      </Stack>
    </AbsoluteFill>
  );
};

const Kpi: React.FC<{ label: string; value: number; suffix: string; start: number; bg: string }> = ({ label, value, suffix, start, bg }) => {
  const n = useCountUp(value, start);
  return (
    <Slam start={start - 6} rotate={value % 2 ? 1.5 : -1.5}>
      <div style={{ ...box(bg, 5, 3), padding: '12px 14px' }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 40, lineHeight: 1, color: C.ink }}>
          {n}
          <span style={{ fontSize: 24 }}>{suffix}</span>
        </div>
        <Label size={17} style={{ marginTop: 6, letterSpacing: 0 }}>
          {label}
        </Label>
      </div>
    </Slam>
  );
};

const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const press = Math.max(0, Math.sin(frame / 6)) > 0.7 ? 1 : 0;
  const kpiColors = [C.yellow, C.pink, C.green, C.sky];
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Dots bg={C.lilac} />
      <Stack gap={0}>
        <Header actLabel={ACT3_TEXT.actLabel} />
        <Spacer h={36} />
        <Slam start={8}>
          <div style={{ fontFamily: DISPLAY, fontSize: 62, lineHeight: 1.18, letterSpacing: -1, color: C.ink }}>
            {ACT3_TEXT.titleA}{' '}
            <span
              style={{
                background: C.yellow,
                border: `4px solid ${C.ink}`,
                padding: '0 10px',
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
                borderRadius: 10,
              }}
            >
              {ACT3_TEXT.titleB}
            </span>
          </div>
        </Slam>
        <Spacer h={34} />
        <Slam start={14}>
          <div style={{ ...box(C.white), padding: '24px 22px', display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 380, height: 400, flexShrink: 0 }}>
              <div
                style={{
                  ...box(C.ink, 8),
                  position: 'absolute',
                  left: 6,
                  top: 30,
                  width: 230,
                  height: 320,
                  padding: 20,
                  boxSizing: 'border-box',
                  transform: `rotate(${-6 + Math.sin(frame / 10) * 1.5}deg)`,
                }}
              >
                <div style={{ fontFamily: DISPLAY, fontSize: 13, color: C.white }}>
                  NEXO <span style={{ color: C.green }}>Fiscal</span>
                </div>
                <div style={{ fontFamily: DISPLAY, fontSize: 23, lineHeight: 1.05, marginTop: 120 }}>
                  <div style={{ color: C.yellow }}>{ACT3_TEXT.cover.top}</div>
                  <div style={{ color: C.pink }}>{ACT3_TEXT.cover.bottom}</div>
                </div>
              </div>
              <div
                style={{
                  ...box(C.white, 8),
                  position: 'absolute',
                  left: 176,
                  top: 6,
                  width: 204,
                  height: 330,
                  padding: 18,
                  boxSizing: 'border-box',
                  transform: `rotate(${5 + Math.sin(frame / 8) * 1.5}deg)`,
                }}
              >
                {[50, 92, 80, 88, 60, 94, 74, 86, 52].map((w, i) => (
                  <div
                    key={i}
                    style={{ width: `${w}%`, height: i === 0 ? 14 : 9, borderRadius: 4, background: i === 0 ? C.ink : i === 5 ? C.blue : '#D6D0C2', marginBottom: 12 }}
                  />
                ))}
              </div>
              <div style={{ position: 'absolute', left: 10, bottom: 0, ...box(C.green, 4, 3), borderRadius: 8, padding: '6px 10px', transform: 'rotate(-2deg)' }}>
                <Label size={13}>{ACT3_TEXT.sampleTag}</Label>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {ACT3_TEXT.kpis.map((k, i) => (
                <Kpi key={k.label} {...k} start={30 + i * 8} bg={kpiColors[i]} />
              ))}
            </div>
          </div>
        </Slam>
        <Spacer h={30} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {ACT3_TEXT.bullets.map((b, i) => (
            <Slam key={b.n} start={62 + i * 8}>
              <div style={{ ...box(C.white, 6), padding: '16px 20px', display: 'flex', gap: 18, alignItems: 'center' }}>
                <div style={{ ...box(C.ink, 0, 3), borderRadius: 10, padding: '6px 10px', fontFamily: DISPLAY, fontSize: 26, color: C.yellow }}>{b.n}</div>
                <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 25, lineHeight: 1.35, color: C.ink }}>{b.text}</div>
              </div>
            </Slam>
          ))}
        </div>
        <Spacer h={34} />
        <Slam start={84} rotate={-1}>
          <div style={{ ...box(C.yellow, 10), padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <Label size={15} style={{ letterSpacing: 0.4 }}>
                {ACT3_TEXT.ctaLabel}
              </Label>
              <div style={{ fontFamily: DISPLAY, fontSize: 34, color: C.ink, marginTop: 8 }}>{BRAND.url}</div>
            </div>
            <div
              style={{
                ...box(C.ink, 6),
                boxShadow: `${6 - press * 6}px ${6 - press * 6}px 0 ${C.pink}`,
                transform: `translate(${press * 6}px, ${press * 6}px)`,
                padding: '16px 16px',
                fontFamily: DISPLAY,
                fontSize: 20,
                color: C.white,
                whiteSpace: 'nowrap',
              }}
            >
              {ACT3_TEXT.ctaButton} →
            </div>
          </div>
        </Slam>
        <Spacer h={28} />
        <Footer />
      </Stack>
    </AbsoluteFill>
  );
};

export const BrutalistStory = makeStory({ name: 'Brutalista', Act1, Act2, Act3, base: C.yellow });
