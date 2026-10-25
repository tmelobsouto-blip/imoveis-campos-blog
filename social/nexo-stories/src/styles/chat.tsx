import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { Spacer, Stack, wipeIn } from '../components/primitives';
import { ACT1_TEXT, ACT2_TEXT, ACT3_TEXT, BRAND } from '../content';
import { useActProgress, useCountdown, useCountUp, useSpring } from '../shared/motion';
import { makeStory } from '../shared/StyledStory';
import { LAYOUT } from '../theme';
import { ACT2_REVEAL, WIPE } from '../timeline';

const C = {
  wall: '#E8E2D6',
  doodle: 'rgba(60,50,30,0.07)',
  bubble: '#FFFFFF',
  text: '#14171A',
  muted: '#667085',
  green: '#0F6B45',
  mint: '#25D07A',
  mintSoft: '#DDF7E8',
  orange: '#C2410C',
  orangeSoft: '#FFF1E6',
  bar: '#F7F5F0',
  ink: '#0A100D',
};
const FONT = "'Inter', sans-serif";
const MONO = "'JetBrains Mono', monospace";

const Wallpaper: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: C.wall,
      backgroundImage: `radial-gradient(circle at 20px 20px, ${C.doodle} 6px, transparent 7px), radial-gradient(circle at 70px 60px, transparent 9px, ${C.doodle} 10px, transparent 12px), linear-gradient(45deg, transparent 46%, ${C.doodle} 47%, ${C.doodle} 53%, transparent 54%)`,
      backgroundSize: '96px 96px, 96px 96px, 48px 48px',
    }}
  />
);

const Avatar: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size,
      background: C.ink,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: `0 0 0 3px ${C.mint}`,
    }}
  >
    <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24">
      <path d="M5 3l14 8-6 1.6L10 19z" fill={C.mint} />
    </svg>
  </div>
);

const AppBar: React.FC<{ actLabel: string }> = ({ actLabel }) => {
  const progress = useActProgress();
  return (
    <div style={{ background: C.bar, borderRadius: 26, padding: '16px 20px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth={2.4} strokeLinecap="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
        <Avatar />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, color: C.text, lineHeight: 1.1 }}>
            NEXO <span style={{ color: C.green }}>Fiscal</span>
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 500, fontSize: 17, color: C.green, marginTop: 4, whiteSpace: 'nowrap' }}>{actLabel}</div>
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 14,
            color: C.orange,
            background: C.orangeSoft,
            border: '2px solid #FDC9A6',
            borderRadius: 30,
            padding: '7px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {BRAND.badge}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, bottom: 0, height: 5, width: `${progress * 100}%`, background: C.mint }} />
    </div>
  );
};

const Typing: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', gap: 8, padding: '22px 26px', background: C.bubble, borderRadius: '8px 28px 28px 28px', alignSelf: 'flex-start' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 14,
            height: 14,
            borderRadius: 14,
            background: C.muted,
            opacity: interpolate(Math.sin(frame / 3 - i * 1.2), [-1, 1], [0.25, 1]),
            transform: `translateY(${Math.sin(frame / 3 - i * 1.2) * -4}px)`,
          }}
        />
      ))}
    </div>
  );
};

const Ticks: React.FC = () => (
  <svg width="26" height="16" viewBox="0 0 26 16" fill="none" stroke="#3B9BF0" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 8l4 4 8-9M10 12l1 0 8-9" />
  </svg>
);

const Msg: React.FC<{
  at: number;
  typing?: number;
  tone?: 'default' | 'warn' | 'dark' | 'success';
  width?: number | string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ at, typing = 10, tone = 'default', width, children, style }) => {
  const frame = useCurrentFrame();
  const p = useSpring(at, 14);
  if (frame < at - typing) return null;
  if (frame < at) return <Typing />;
  const bg = { default: C.bubble, warn: C.orangeSoft, dark: C.ink, success: C.mintSoft }[tone];
  return (
    <div
      style={{
        alignSelf: 'flex-start',
        width,
        maxWidth: '96%',
        background: bg,
        border: tone === 'warn' ? '2px solid #FDBA8C' : tone === 'success' ? `2px solid ${C.mint}` : 'none',
        borderRadius: '8px 28px 28px 28px',
        padding: '20px 24px 14px',
        boxShadow: '0 2px 0 rgba(0,0,0,0.06)',
        transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})`,
        transformOrigin: 'top left',
        opacity: Math.min(1, p * 2),
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <Ticks />
      </div>
    </div>
  );
};

const Tag: React.FC<{ color: string; children: React.ReactNode; size?: number }> = ({ color, children, size = 16 }) => (
  <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: size, letterSpacing: 1, color }}>{children}</div>
);

const Composer: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      left: LAYOUT.padX,
      right: LAYOUT.padX,
      top: 1600,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    }}
  >
    <div
      style={{
        flex: 1,
        background: C.bubble,
        borderRadius: 40,
        padding: '20px 26px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: MONO,
        fontSize: 19,
        color: C.muted,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
      }}
    >
      <span>
        <b style={{ color: C.green }}>{BRAND.handle}</b> · {BRAND.name}
      </span>
      <span style={{ color: C.green }}>{BRAND.url}</span>
    </div>
    <div style={{ width: 70, height: 70, borderRadius: 70, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinejoin="round">
        <path d="M22 3L10 14M22 3l-7 18-5-7-7-4z" />
      </svg>
    </div>
  </div>
);

const Act1: React.FC = () => (
  <>
    <Wallpaper />
    <Stack gap={20}>
      <AppBar actLabel={ACT1_TEXT.actLabel} />
      <Spacer h={6} />
      <Msg at={12} typing={8}>
        <Tag color={C.green}>{ACT1_TEXT.tag}</Tag>
        <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 66, lineHeight: 1.1, letterSpacing: -2, color: C.text, marginTop: 10 }}>
          {ACT1_TEXT.title.map((w) => (
            <React.Fragment key={w.word}>
              <span
                style={
                  w.highlight
                    ? { background: `linear-gradient(transparent 55%, ${C.mint}88 55%)`, color: C.green, padding: '0 4px' }
                    : undefined
                }
              >
                {w.word}
              </span>{' '}
            </React.Fragment>
          ))}
        </div>
      </Msg>
      <Msg at={34} typing={10}>
        <div style={{ fontFamily: FONT, fontSize: 29, lineHeight: 1.45, color: C.text }}>{ACT1_TEXT.context}</div>
      </Msg>
      <Msg at={50} typing={8} width="96%">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {ACT1_TEXT.chips.map((chip) => (
            <div
              key={chip}
              style={{
                background: '#F2F4F3',
                borderLeft: `5px solid ${C.mint}`,
                borderRadius: 12,
                padding: '12px 14px',
                fontFamily: MONO,
                fontSize: 20,
                lineHeight: 1.4,
                color: C.text,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </Msg>
      <Msg at={68} typing={10} tone="warn">
        <Tag color={C.orange}>▲ {ACT1_TEXT.warningLabel}</Tag>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 31, lineHeight: 1.4, color: C.text, marginTop: 8 }}>{ACT1_TEXT.warning}</div>
      </Msg>
    </Stack>
    <Composer />
  </>
);

const TimerPill: React.FC = () => {
  const { remaining, seconds, urgent, isRevealed, revealed } = useCountdown();
  const p = useSpring(6);
  const color = isRevealed ? C.green : urgent > 0 ? C.orange : C.text;
  return (
    <div
      style={{
        alignSelf: 'center',
        opacity: p,
        background: isRevealed ? C.mintSoft : C.bubble,
        border: `2px solid ${isRevealed ? C.mint : urgent > 0 ? '#FDBA8C' : 'rgba(0,0,0,0.06)'}`,
        borderRadius: 40,
        padding: '12px 24px 14px',
        minWidth: 520,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        transform: `scale(${isRevealed ? interpolate(revealed, [0, 1], [0.9, 1]) : 1})`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        <Tag color={C.muted} size={15}>
          {isRevealed ? ACT2_TEXT.revealLabel : ACT2_TEXT.timerLabel}
        </Tag>
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, color }}>{isRevealed ? ACT2_TEXT.revealValue : `${seconds}s`}</span>
      </div>
      <div style={{ height: 6, borderRadius: 6, background: '#E5E7EB', marginTop: 8, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(isRevealed ? 1 : remaining) * 100}%`, background: isRevealed ? C.mint : urgent > 0 ? C.orange : C.green }} />
      </div>
    </div>
  );
};

const QuickReply: React.FC<{ letter: string; text: string; at: number }> = ({ letter, text, at }) => {
  const { isRevealed, revealed } = useCountdown();
  const p = useSpring(at, 14);
  const badge = useSpring(ACT2_REVEAL + 8, 11);
  const correct = letter === ACT2_TEXT.correct;
  const lit = correct && isRevealed;
  return (
    <div
      style={{
        opacity: Math.min(1, p * 2) * (!correct && isRevealed ? interpolate(revealed, [0, 1], [1, 0.4]) : 1),
        transform: `translateY(${(1 - p) * 20}px)`,
        position: 'relative',
        background: lit ? C.green : C.bubble,
        border: `2px solid ${lit ? C.green : '#BFE6D0'}`,
        borderRadius: 22,
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        width: '96%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 48,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 22,
          background: lit ? C.bubble : C.mintSoft,
          color: C.green,
        }}
      >
        {letter}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: lit ? 700 : 500, fontSize: 24, lineHeight: 1.36, color: lit ? '#FFFFFF' : C.text }}>{text}</div>
      {lit && (
        <div
          style={{
            position: 'absolute',
            right: -14,
            top: -20,
            background: C.mint,
            color: C.ink,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 17,
            padding: '6px 12px',
            borderRadius: 20,
            transform: `scale(${badge})`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {ACT2_TEXT.correctBadge}
        </div>
      )}
    </div>
  );
};

const Act2: React.FC = () => {
  const frame = useCurrentFrame();
  const { isRevealed } = useCountdown();
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Wallpaper />
      <Stack gap={14}>
        <AppBar actLabel={ACT2_TEXT.actLabel} />
        <TimerPill />
        <Msg at={16} typing={8}>
          <Tag color={C.green} size={15}>
            {ACT2_TEXT.sourceLabel}
          </Tag>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, lineHeight: 1.2, letterSpacing: -0.6, color: C.text, marginTop: 6 }}>
            {ACT2_TEXT.sourceTitle}
          </div>
          <div style={{ height: 2, background: '#EEF0EE', margin: '14px 0' }} />
          <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 26, lineHeight: 1.42, color: C.text }}>{ACT2_TEXT.question}</div>
        </Msg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ACT2_TEXT.options.map((o, i) => (
            <QuickReply key={o.letter} letter={o.letter} text={o.text} at={26 + i * 5} />
          ))}
        </div>
        {!isRevealed ? (
          <Msg at={46} typing={8} tone="success">
            <Tag color={C.green} size={15}>
              {ACT2_TEXT.hintLabel}
            </Tag>
            <div style={{ fontFamily: FONT, fontSize: 23, lineHeight: 1.4, color: C.text, marginTop: 6 }}>{ACT2_TEXT.hint}</div>
          </Msg>
        ) : (
          <Msg at={ACT2_REVEAL + 14} typing={12} tone="dark">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <Tag color={C.mint} size={15}>
                {ACT2_TEXT.answerLabel}
              </Tag>
              <Tag color="#8A948F" size={12}>
                {ACT2_TEXT.answerSide}
              </Tag>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 23, lineHeight: 1.42, color: '#F2F5F3', marginTop: 8 }}>{ACT2_TEXT.answer}</div>
          </Msg>
        )}
      </Stack>
      <Composer />
    </AbsoluteFill>
  );
};

const Kpi: React.FC<{ label: string; value: number; suffix: string; start: number }> = ({ label, value, suffix, start }) => {
  const n = useCountUp(value, start);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px solid #EEF0EE', padding: '16px 0' }}>
      <span style={{ fontFamily: FONT, fontWeight: 600, fontSize: 22, color: C.text }}>{label}</span>
      <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 38, color: C.green }}>
        {n}
        {suffix}
      </span>
    </div>
  );
};

const Act3: React.FC = () => {
  const frame = useCurrentFrame();
  const press = 1 + 0.03 * Math.max(0, Math.sin(frame / 7));
  return (
    <AbsoluteFill style={{ clipPath: wipeIn(frame, WIPE) }}>
      <Wallpaper />
      <Stack gap={20}>
        <AppBar actLabel={ACT3_TEXT.actLabel} />
        <Spacer h={6} />
        <Msg at={12} typing={8}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 56, lineHeight: 1.12, letterSpacing: -1.6, color: C.text }}>
            {ACT3_TEXT.titleA} <span style={{ color: C.green }}>{ACT3_TEXT.titleB}</span>
          </div>
        </Msg>
        <Msg at={28} typing={8} width="96%">
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ width: 300, flexShrink: 0 }}>
              <div
                style={{
                  position: 'relative',
                  height: 380,
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: 'linear-gradient(150deg, #0A100D, #123726)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: -64,
                    top: 34,
                    width: 160,
                    height: 260,
                    background: '#FBFBF9',
                    borderRadius: 10,
                    transform: `rotate(${8 + Math.sin(frame / 14) * 2}deg)`,
                    padding: 16,
                    boxSizing: 'border-box',
                  }}
                >
                  {[60, 90, 84, 92, 50, 88, 76, 90].map((w, i) => (
                    <div key={i} style={{ width: `${w}%`, height: 7, borderRadius: 7, background: i === 4 ? C.mint : '#D9DFDB', marginBottom: 12 }} />
                  ))}
                </div>
                <div style={{ position: 'absolute', left: 20, top: 20, fontFamily: FONT, fontWeight: 800, fontSize: 14, color: '#F2F5F3' }}>
                  NEXO <span style={{ color: C.mint }}>Fiscal</span>
                </div>
                <div style={{ position: 'absolute', left: 20, bottom: 40, fontFamily: FONT, fontWeight: 800, fontSize: 30, lineHeight: 1.05, letterSpacing: -1 }}>
                  <div style={{ color: '#F2F5F3' }}>{ACT3_TEXT.cover.top}</div>
                  <div style={{ color: C.mint }}>{ACT3_TEXT.cover.bottom}</div>
                </div>
              </div>
              <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 13, color: C.muted, marginTop: 10 }}>{ACT3_TEXT.sampleTag}</div>
            </div>
            <div style={{ flex: 1 }}>
              {ACT3_TEXT.kpis.map((k, i) => (
                <Kpi key={k.label} {...k} start={34 + i * 8} />
              ))}
            </div>
          </div>
        </Msg>
        <Msg at={66} typing={8}>
          {ACT3_TEXT.bullets.map((b) => (
            <div key={b.n} style={{ display: 'flex', gap: 14, marginBottom: 10 }}>
              <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 26, color: C.green }}>{b.n}</span>
              <span style={{ fontFamily: FONT, fontSize: 27, lineHeight: 1.4, color: C.text }}>{b.text}</span>
            </div>
          ))}
        </Msg>
        <Msg at={86} typing={8} width="96%">
          <div style={{ borderLeft: `5px solid ${C.mint}`, paddingLeft: 16 }}>
            <Tag color={C.green} size={14}>
              {ACT3_TEXT.ctaLabel}
            </Tag>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 42, color: C.text, marginTop: 6, letterSpacing: -1 }}>{BRAND.url}</div>
          </div>
          <div
            style={{
              marginTop: 16,
              background: C.green,
              color: '#FFFFFF',
              borderRadius: 18,
              padding: '18px 0',
              textAlign: 'center',
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 24,
              letterSpacing: 0.5,
              transform: `scale(${press})`,
            }}
          >
            {ACT3_TEXT.ctaButton} →
          </div>
        </Msg>
      </Stack>
      <Composer />
    </AbsoluteFill>
  );
};

export const ChatStory = makeStory({ name: 'Chat', Act1, Act2, Act3, base: C.wall });
