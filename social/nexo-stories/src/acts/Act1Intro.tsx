import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Background, BoltIcon, Enter, Footer, Header, MonoLabel, Spacer, Stack, useEnter } from '../components/primitives';
import { ACT1_TEXT } from '../content';
import { DARK, FONT } from '../theme';

const TitleWord: React.FC<{ word: string; highlight?: boolean; start: number }> = ({ word, highlight, start }) => {
  const p = useEnter(start, 14);
  const box = useEnter(start + 6, 200);
  return (
    <span
      style={{
        display: 'inline-block',
        opacity: Math.min(1, p * 1.4),
        transform: `translateY(${(1 - p) * 40}px)`,
        marginRight: 20,
        position: 'relative',
        color: highlight ? DARK.green : DARK.text,
        padding: highlight ? '0 12px' : 0,
      }}
    >
      {highlight && (
        <span
          style={{
            position: 'absolute',
            inset: '4px 0 0 0',
            background: DARK.greenSoft,
            border: `2px solid ${DARK.greenLine}`,
            borderRadius: 12,
            transform: `scaleX(${box})`,
            transformOrigin: 'left center',
            zIndex: -1,
          }}
        />
      )}
      {word}
    </span>
  );
};

export const Act1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pulse = interpolate(Math.sin(frame / 5), [-1, 1], [0.25, 0.7]);
  const warnIn = useEnter(62, 12);

  return (
    <>
      <Background mode="dark" />
      <Stack gap={0}>
        <Header mode="dark" actLabel={ACT1_TEXT.actLabel} progress={frame / durationInFrames} />
        <Spacer h={48} />
        <Enter start={6} y={16} style={{ alignSelf: 'flex-start' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: DARK.greenSoft,
              border: `2px solid ${DARK.greenLine}`,
              borderRadius: 10,
              padding: '12px 18px',
            }}
          >
            <BoltIcon color={DARK.orange} />
            <MonoLabel color={DARK.green}>{ACT1_TEXT.tag}</MonoLabel>
          </div>
        </Enter>
        <Spacer h={26} />
        <div
          style={{
            fontFamily: FONT.display,
            fontWeight: 800,
            fontSize: 80,
            lineHeight: 1.1,
            letterSpacing: -2.6,
            isolation: 'isolate',
          }}
        >
          {ACT1_TEXT.title.map((w, i) => (
            <TitleWord key={w.word} word={w.word} highlight={w.highlight} start={10 + i * 3} />
          ))}
        </div>
        <Spacer h={28} />
        <Enter start={32}>
          <div
            style={{
              background: DARK.card,
              border: `2px solid ${DARK.border}`,
              borderLeft: `6px solid ${DARK.green}`,
              borderRadius: 16,
              padding: '26px 30px',
              fontFamily: FONT.body,
              fontSize: 29,
              lineHeight: 1.45,
              color: DARK.textSoft,
            }}
          >
            {ACT1_TEXT.context}
          </div>
        </Enter>
        <Spacer h={36} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {ACT1_TEXT.chips.map((chip, i) => (
            <Enter key={chip} start={42 + i * 4} y={18}>
              <div
                style={{
                  height: '100%',
                  boxSizing: 'border-box',
                  background: DARK.cardAlt,
                  border: `2px solid ${DARK.border}`,
                  borderRadius: 12,
                  padding: '18px 20px',
                  display: 'flex',
                  gap: 14,
                  fontFamily: FONT.mono,
                  fontSize: 20,
                  lineHeight: 1.4,
                  color: DARK.textSoft,
                }}
              >
                <span style={{ width: 11, height: 11, borderRadius: 11, background: DARK.green, marginTop: 9, flexShrink: 0 }} />
                {chip}
              </div>
            </Enter>
          ))}
        </div>
        <Spacer h={44} />
        <div
          style={{
            opacity: warnIn,
            transform: `scale(${0.94 + warnIn * 0.06})`,
            background: DARK.orangeBg,
            border: `3px solid ${DARK.orangeLine}`,
            borderRadius: 18,
            padding: '26px 30px',
            boxShadow: `0 0 ${40 + pulse * 30}px rgba(242,162,58,${pulse * 0.45})`,
          }}
        >
          <MonoLabel color={DARK.orange} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>▲</span> {ACT1_TEXT.warningLabel}
          </MonoLabel>
          <div
            style={{
              fontFamily: FONT.body,
              fontWeight: 700,
              fontSize: 29,
              lineHeight: 1.4,
              color: DARK.text,
              marginTop: 12,
            }}
          >
            {ACT1_TEXT.warning}
          </div>
        </div>
        <Spacer h={26} />
        <Footer mode="dark" enterAt={20} />
      </Stack>
    </>
  );
};
