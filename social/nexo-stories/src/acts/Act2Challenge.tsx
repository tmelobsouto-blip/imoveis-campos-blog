import React from 'react';
import { interpolate, interpolateColors, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background, ClockIcon, Enter, Footer, Header, MonoLabel, Stack, useEnter, wipeIn } from '../components/primitives';
import { ACT2_TEXT } from '../content';
import { DARK, FONT, LIGHT } from '../theme';
import { ACT2_COUNTDOWN_FRAMES, ACT2_COUNTDOWN_START, ACT2_REVEAL, FPS, WIPE } from '../timeline';

const RING = 92;
const STROKE = 8;
const CIRC = Math.PI * (RING - STROKE);

const TimerRing: React.FC<{ remaining: number; revealed: number; urgent: number; seconds: number }> = ({
  remaining,
  revealed,
  urgent,
  seconds,
}) => {
  const color = interpolateColors(urgent, [0, 1], [LIGHT.green, LIGHT.orange]);
  const frame = useCurrentFrame();
  const beat = urgent > 0 && revealed === 0 ? 1 + 0.06 * Math.max(0, Math.sin((frame / FPS) * Math.PI * 2)) : 1;
  const fill = revealed > 0 ? 1 : remaining;
  return (
    <div style={{ width: RING, height: RING, position: 'relative', transform: `scale(${beat})` }}>
      <svg width={RING} height={RING} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={RING / 2} cy={RING / 2} r={(RING - STROKE) / 2} fill="none" stroke={LIGHT.track} strokeWidth={STROKE} />
        <circle
          cx={RING / 2}
          cy={RING / 2}
          r={(RING - STROKE) / 2}
          fill="none"
          stroke={revealed > 0 ? LIGHT.green : color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - fill)}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT.display,
          fontWeight: 800,
          fontSize: revealed > 0 ? 40 : 34,
          color: revealed > 0 ? LIGHT.green : color,
        }}
      >
        {revealed > 0 ? <span style={{ transform: `scale(${revealed})` }}>✓</span> : seconds}
      </div>
    </div>
  );
};

const Option: React.FC<{ letter: string; text: string; start: number; reveal: number; correct: boolean }> = ({
  letter,
  text,
  start,
  reveal,
  correct,
}) => {
  const badge = useEnter(ACT2_REVEAL + 8, 12);
  const dim = correct ? 1 : interpolate(reveal, [0, 1], [1, 0.42]);
  const pop = correct ? 1 + 0.035 * Math.sin(Math.min(1, reveal) * Math.PI) : 1;
  return (
    <Enter start={start} y={24}>
      <div
        style={{
          opacity: dim,
          transform: `scale(${pop})`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          background: correct ? interpolateColors(reveal, [0, 1], [LIGHT.card, LIGHT.greenSoft]) : LIGHT.card,
          border: `2px solid ${LIGHT.border}`,
          borderBottom: correct && reveal > 0 ? `4px solid ${LIGHT.green}` : `2px solid ${LIGHT.border}`,
          borderRadius: 16,
          padding: '17px 22px',
          boxShadow: '0 2px 0 rgba(10,16,13,0.03)',
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 13,
            flexShrink: 0,
            background: correct ? interpolateColors(reveal, [0, 1], [LIGHT.chip, LIGHT.green]) : LIGHT.chip,
            color: correct ? interpolateColors(reveal, [0, 1], [LIGHT.text, '#FFFFFF']) : LIGHT.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 28,
          }}
        >
          {letter}
        </div>
        <div
          style={{
            flex: 1,
            fontFamily: FONT.body,
            fontWeight: correct && reveal > 0.5 ? 700 : 500,
            fontSize: 26,
            lineHeight: 1.38,
            color: correct || reveal === 0 ? LIGHT.text : LIGHT.faded,
          }}
        >
          {text}
        </div>
        {correct && reveal > 0 && (
          <div
            style={{
              position: 'absolute',
              top: -18,
              right: 20,
              transform: `scale(${badge})`,
              background: '#0A100D',
              color: DARK.green,
              fontFamily: FONT.mono,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: 1,
              borderRadius: 10,
              padding: '8px 14px',
            }}
          >
            {ACT2_TEXT.correctBadge}
          </div>
        )}
      </div>
    </Enter>
  );
};

const Burst: React.FC<{ progress: number }> = ({ progress }) => {
  if (progress <= 0 || progress >= 1) return null;
  return (
    <div style={{ position: 'absolute', left: 52, top: '50%', width: 0, height: 0, pointerEvents: 'none' }}>
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2;
        const dist = 40 + progress * 150;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: 3,
              background: i % 3 === 0 ? DARK.green : LIGHT.green,
              opacity: 1 - progress,
              transform: `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) rotate(${progress * 180}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export const Act2Challenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const elapsed = interpolate(frame, [ACT2_COUNTDOWN_START, ACT2_REVEAL], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const remaining = 1 - elapsed;
  const seconds = Math.max(1, Math.ceil((remaining * ACT2_COUNTDOWN_FRAMES) / FPS));
  const urgent = interpolate(frame, [ACT2_REVEAL - 3 * FPS, ACT2_REVEAL - 3 * FPS + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const reveal = useEnter(ACT2_REVEAL, 14);
  const revealed = frame >= ACT2_REVEAL ? reveal : 0;
  const burst = interpolate(frame, [ACT2_REVEAL, ACT2_REVEAL + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const answerIn = useEnter(ACT2_REVEAL + 12);
  const flash = interpolate(frame, [ACT2_REVEAL, ACT2_REVEAL + 4, ACT2_REVEAL + 14], [0, 0.35, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ position: 'absolute', inset: 0, clipPath: wipeIn(frame, WIPE) }}>
      <Background mode="light" />
      <Stack gap={22}>
        <Header mode="light" actLabel={ACT2_TEXT.actLabel} progress={frame / durationInFrames} enterAt={4} />
        <Enter start={8}>
          <div
            style={{
              background: LIGHT.card,
              border: `2px solid ${LIGHT.border}`,
              borderRadius: 16,
              padding: '22px 26px',
              display: 'flex',
              alignItems: 'center',
              gap: 22,
            }}
          >
            <div style={{ flex: 1 }}>
              <MonoLabel color={LIGHT.green} size={16} style={{ letterSpacing: 0.8 }}>
                {ACT2_TEXT.sourceLabel}
              </MonoLabel>
              <div
                style={{
                  fontFamily: FONT.display,
                  fontWeight: 800,
                  fontSize: 31,
                  letterSpacing: -0.8,
                  lineHeight: 1.18,
                  color: LIGHT.text,
                  marginTop: 8,
                }}
              >
                {ACT2_TEXT.sourceTitle}
              </div>
            </div>
            <div style={{ width: 186, textAlign: 'right' }}>
              {revealed > 0 ? (
                <div style={{ opacity: revealed }}>
                  <MonoLabel color={LIGHT.green} size={15}>
                    {ACT2_TEXT.revealLabel}
                  </MonoLabel>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 27,
                      lineHeight: 1.05,
                      letterSpacing: -0.6,
                      color: LIGHT.green,
                      marginTop: 6,
                    }}
                  >
                    {ACT2_TEXT.revealValue}
                  </div>
                </div>
              ) : (
                <>
                  <MonoLabel color={LIGHT.muted} size={15} style={{ fontWeight: 500 }}>
                    {ACT2_TEXT.timerLabel}
                  </MonoLabel>
                  <div
                    style={{
                      fontFamily: FONT.display,
                      fontWeight: 800,
                      fontSize: 38,
                      color: interpolateColors(urgent, [0, 1], [LIGHT.green, LIGHT.orange]),
                      marginTop: 4,
                    }}
                  >
                    {seconds}s
                  </div>
                </>
              )}
            </div>
            <TimerRing remaining={remaining} revealed={revealed} urgent={urgent} seconds={seconds} />
          </div>
          <div style={{ height: 10, borderRadius: 10, background: LIGHT.track, marginTop: 14, overflow: 'hidden' }}>
            <div
              style={{
                width: `${(revealed > 0 ? 1 : remaining) * 100}%`,
                height: '100%',
                borderRadius: 10,
                background: revealed > 0 ? LIGHT.green : interpolateColors(urgent, [0, 1], [LIGHT.green, LIGHT.orange]),
              }}
            />
          </div>
        </Enter>
        <Enter start={16}>
          <div
            style={{
              background: LIGHT.card,
              border: `2px solid ${LIGHT.border}`,
              borderLeft: `6px solid ${LIGHT.green}`,
              borderRadius: 16,
              padding: '24px 28px',
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 28,
              lineHeight: 1.42,
              color: LIGHT.text,
            }}
          >
            {ACT2_TEXT.question}
          </div>
        </Enter>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative' }}>
          {ACT2_TEXT.options.map((o, i) => (
            <div key={o.letter} style={{ position: 'relative' }}>
              <Option
                letter={o.letter}
                text={o.text}
                start={24 + i * 6}
                reveal={revealed}
                correct={o.letter === ACT2_TEXT.correct}
              />
              {o.letter === ACT2_TEXT.correct && <Burst progress={burst} />}
            </div>
          ))}
        </div>
        <div style={{ position: 'relative' }}>
          {revealed === 0 ? (
            <Enter start={44}>
              <div
                style={{
                  background: LIGHT.hintBg,
                  border: `2px solid ${LIGHT.border}`,
                  borderRadius: 16,
                  padding: '20px 24px',
                }}
              >
                <MonoLabel color={LIGHT.green} size={17} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ opacity: interpolate(Math.sin(frame / 4), [-1, 1], [0.35, 1]) }}>
                    <ClockIcon color={LIGHT.green} size={20} />
                  </span>
                  {ACT2_TEXT.hintLabel}
                </MonoLabel>
                <div style={{ fontFamily: FONT.body, fontSize: 24, lineHeight: 1.42, color: '#2A332F', marginTop: 10 }}>
                  {ACT2_TEXT.hint}
                </div>
              </div>
            </Enter>
          ) : (
            <div
              style={{
                opacity: answerIn,
                transform: `translateY(${(1 - answerIn) * 30}px)`,
                background: '#0A100D',
                border: '3px solid #2E9E69',
                borderRadius: 18,
                padding: '20px 24px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <MonoLabel color={DARK.green} size={18}>
                  {ACT2_TEXT.answerLabel}
                </MonoLabel>
                <MonoLabel color={DARK.muted} size={14} style={{ fontWeight: 500 }}>
                  {ACT2_TEXT.answerSide}
                </MonoLabel>
              </div>
              <div style={{ fontFamily: FONT.body, fontWeight: 500, fontSize: 24, lineHeight: 1.4, color: DARK.text, marginTop: 10 }}>
                {ACT2_TEXT.answer}
              </div>
            </div>
          )}
        </div>
        <Footer mode="light" enterAt={20} />
      </Stack>
      <div style={{ position: 'absolute', inset: 0, background: LIGHT.green, opacity: flash, pointerEvents: 'none' }} />
    </div>
  );
};
