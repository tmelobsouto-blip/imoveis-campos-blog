import React from 'react';
import { AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ReelsChrome } from '../components/ReelsChrome';
import { FPS } from '../timeline';
import sheet from './beats.json';
import { SLIDE1, SLIDE2, SLIDE3, SLIDE4 } from './content';
import { clamp01, Kicker, LiteralCard, MapDiagram, Mark, MaterialPages, Mono, TeseQuote } from './parts';
import { F, K } from './theme';

export const SAFE = { left: 64, right: 850, top: 240, bottom: 1440 };
const W = SAFE.right - SAFE.left;

type Beat = { n: number; start: number; dur: number; text: string };
const BEATS: Array<Beat & { from: number; frames: number }> = (sheet.beats as Beat[]).map((b, i, all) => {
  const from = Math.round(b.start * FPS);
  const end = i === all.length - 1 ? Math.round((sheet.total_seconds + 0.5) * FPS) : Math.round(all[i + 1].start * FPS);
  return { ...b, from, frames: end - from };
});
export const REEL_FRAMES = BEATS[BEATS.length - 1].from + BEATS[BEATS.length - 1].frames;

const ramp = (f: number, a: number, b: number) => clamp01((f - a) / (b - a));
const useIn = (delay = 0, damping = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

const Zone: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center = true }) => {
  const p = useIn(0, 18);
  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.left,
        width: W,
        top: SAFE.top + 70,
        height: 1240 - SAFE.top - 70 + 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: center ? 'center' : 'flex-start',
        opacity: Math.min(1, p * 1.6),
        transform: `translateY(${(1 - p) * 40}px) scale(${0.96 + p * 0.04})`,
      }}
    >
      {children}
    </div>
  );
};

const Big: React.FC<{ size?: number; color?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  size = 112,
  color = K.ink,
  children,
  style,
}) => (
  <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: size, lineHeight: 1.02, letterSpacing: -size * 0.035, color, isolation: 'isolate', ...style }}>
    {children}
  </div>
);

const Hook: React.FC<{ loop?: boolean }> = ({ loop }) => {
  const frame = useCurrentFrame();
  const mark = loop ? 1 : 0.35 + 0.65 * ramp(frame, 0, 10);
  const zoom = 1 + frame * 0.0012;
  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.left,
        width: W,
        top: SAFE.top + 70,
        height: 900,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        transform: `scale(${zoom})`,
        transformOrigin: 'left center',
      }}
    >
      <Big size={132}>
        <Mark tone="red" p={mark} style={{ padding: '0 18px' }}>
          R$ 400 MIL
        </Mark>
        <br />
        PAGAM ITBI
      </Big>
    </div>
  );
};

const Tema: React.FC = () => {
  const pill = useIn(0, 12);
  return (
    <Zone>
      <span
        style={{
          alignSelf: 'flex-start',
          border: `3px solid ${K.green}`,
          borderRadius: 50,
          padding: '16px 26px',
          transform: `scale(${0.9 + pill * 0.1})`,
        }}
      >
        <Mono size={26} style={{ fontWeight: 700, letterSpacing: 2 }}>
          {SLIDE1.pill}
        </Mono>
      </span>
      <Big size={104} color={K.green} style={{ marginTop: 44 }}>
        SEM
        <br />
        JURIDIQUÊS.
      </Big>
    </Zone>
  );
};

const brl = (n: number) => `R$ ${Math.round(n).toLocaleString('pt-BR')}`;

const Imovel: React.FC = () => {
  const frame = useCurrentFrame();
  const box = useIn(8, 16);
  const value = 1_000_000 * (1 - Math.pow(1 - ramp(frame, 4, 40), 3));
  return (
    <Zone>
      <Mono size={24} style={{ fontWeight: 700 }}>
        IMÓVEL INTEGRALIZADO
      </Mono>
      <Big size={104} style={{ marginTop: 14, fontVariantNumeric: 'tabular-nums' }}>
        {brl(value)}
      </Big>
      <div
        style={{
          marginTop: 56,
          background: K.black,
          borderRadius: 24,
          padding: '36px 30px',
          textAlign: 'center',
          opacity: box,
          transform: `translateY(${(1 - box) * 30}px)`,
          boxShadow: '0 24px 50px rgba(11,17,14,0.25)',
        }}
      >
        <Mono color={K.mint} size={19} style={{ fontWeight: 700 }}>
          {SLIDE3.rootLabel}
        </Mono>
        <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 46, color: '#fff', marginTop: 12, letterSpacing: -1 }}>{SLIDE3.rootTitle}</div>
        <div style={{ fontFamily: F.serif, fontSize: 27, color: '#D5DDD8', marginTop: 10 }}>{SLIDE3.rootExample}</div>
      </div>
    </Zone>
  );
};

const SplitBox: React.FC<{ tone: 'green' | 'red'; label: string; title: string; chip: string; p: number }> = ({ tone, label, title, chip, p }) => {
  const c = tone === 'green' ? { fg: K.green, bg: '#E9F3EE', line: K.green, chip: K.greenSoft } : { fg: K.red, bg: '#FCEEE7', line: K.redLine, chip: K.redSoft };
  return (
    <div
      style={{
        flex: 1,
        background: c.bg,
        border: `3px solid ${c.line}`,
        borderRadius: 22,
        padding: '26px 22px',
        opacity: p,
        transform: `translateY(${(1 - p) * 26}px)`,
      }}
    >
      <Mono color={c.fg} size={16} style={{ fontWeight: 700, letterSpacing: 1 }}>
        {label}
      </Mono>
      <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 44, letterSpacing: -1.2, color: c.fg, marginTop: 10 }}>{title}</div>
      <div style={{ display: 'inline-block', marginTop: 14, background: c.chip, borderRadius: 8, padding: '8px 12px', fontFamily: F.mono, fontSize: 17, color: c.fg }}>
        {chip}
      </div>
    </div>
  );
};

const ValueSplit: React.FC<{ stage: 'imune' | 'excedente' }> = ({ stage }) => {
  const frame = useCurrentFrame();
  const green = stage === 'imune' ? ramp(frame, 2, 20) : 1;
  const red = stage === 'excedente' ? ramp(frame, 4, 26) : 0;
  const leftBox = stage === 'imune' ? ramp(frame, 12, 26) : 1;
  const rightBox = stage === 'excedente' ? ramp(frame, 18, 34) : 0;
  return (
    <Zone>
      <Big size={92} color={stage === 'imune' ? K.green : K.red}>
        {stage === 'imune' ? (
          <>
            R$ 600 MIL
            <br />
            IMUNES
          </>
        ) : (
          <>
            R$ 400 MIL
            <br />
            VIRAM ÁGIO
          </>
        )}
      </Big>
      <div style={{ marginTop: 50 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Mono size={20} color={K.muted}>
            IMÓVEL · R$ 1 MI
          </Mono>
          <Mono size={20} color={K.muted}>
            100%
          </Mono>
        </div>
        <div style={{ position: 'relative', height: 96, marginTop: 12, borderRadius: 18, border: `3px solid ${K.ink}`, background: '#fff', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${60 * green}%`,
              background: K.green,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 22,
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: 32,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            R$ 600 MIL
          </div>
          {red > 0 && (
          <div
            style={{
              position: 'absolute',
              left: '60%',
              top: 0,
              bottom: 0,
              width: `${40 * red}%`,
              background: K.red,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 18,
              fontFamily: F.display,
              fontWeight: 800,
              fontSize: 32,
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            R$ 400 MIL
          </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 22, marginTop: 34, minHeight: 230 }}>
        <SplitBox tone="green" {...SLIDE3.left} p={leftBox} />
        <SplitBox tone="red" {...SLIDE3.right} p={rightBox} />
      </div>
    </Zone>
  );
};

const Stamp: React.FC = () => {
  const s = useIn(0, 9);
  return (
    <Zone>
      <Mono size={24} style={{ fontWeight: 700 }}>
        STF · TEMA 796
      </Mono>
      <div
        style={{
          alignSelf: 'flex-start',
          marginTop: 30,
          border: `8px solid ${K.green}`,
          borderRadius: 24,
          padding: '20px 34px',
          transform: `rotate(-4deg) scale(${interpolate(s, [0, 1], [1.6, 1])})`,
          opacity: Math.min(1, s * 2),
        }}
      >
        <Big size={96} color={K.green}>
          RE 796.376
        </Big>
      </div>
      <Big size={64} style={{ marginTop: 56 }}>
        FECHOU A QUESTÃO.
      </Big>
    </Zone>
  );
};

const Literal: React.FC<{ frames: number }> = ({ frames }) => {
  const frame = useCurrentFrame();
  const hl = ramp(frame, frames * 0.25, frames * 0.85);
  return (
    <Zone>
      <LiteralCard label={SLIDE2.label} fontSize={38} style={{ padding: '40px 40px 36px' }}>
        <TeseQuote p={hl} />
      </LiteralCard>
    </Zone>
  );
};

const SoQuota: React.FC = () => (
  <Zone>
    <div style={{ background: K.black, borderLeft: `10px solid ${K.mint}`, borderRadius: 28, padding: '56px 48px' }}>
      <Mono color={K.mint} size={20} style={{ fontWeight: 700 }}>
        {SLIDE2.plainLabel}
      </Mono>
      <Big size={100} color="#fff" style={{ marginTop: 18 }}>
        SÓ A <span style={{ color: K.mint }}>QUOTA</span>
        <br />É IMUNE.
      </Big>
    </div>
  </Zone>
);

const Mapa: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Zone>
      <Big size={74} color={K.red} style={{ marginBottom: 40 }}>
        EXCEDENTE
        <br />
        PAGA ITBI.
      </Big>
      <MapDiagram
        width={W}
        root={ramp(frame, 0, 10)}
        left={ramp(frame, 8, 26)}
        right={ramp(frame, 18, 38)}
        pulse={frame > 40 ? 0.5 + 0.5 * Math.sin((frame - 40) / 4) : 0}
      />
    </Zone>
  );
};

const Material: React.FC = () => {
  const frame = useCurrentFrame();
  const press = 1 + 0.04 * Math.max(0, Math.sin(frame / 5));
  return (
    <Zone>
      <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 48, lineHeight: 1.1, letterSpacing: -1.4, color: '#fff' }}>
        {SLIDE4.title.a} <span style={{ color: K.mint }}>{SLIDE4.title.green}</span> {SLIDE4.title.b}
      </div>
      <div style={{ height: 520, marginTop: 40 }}>
        <MaterialPages scale={(W - 40) / 920} float={Math.sin(frame / 10) * 1.2} />
      </div>
      <div
        style={{
          marginTop: 30,
          background: K.mint,
          borderRadius: 50,
          padding: '26px 0',
          textAlign: 'center',
          transform: `scale(${press})`,
          boxShadow: '0 0 50px rgba(43,199,127,0.4)',
        }}
      >
        <Big size={46} color={K.black}>
          20 PÁGS GRÁTIS · LINK NA BIO →
        </Big>
      </div>
    </Zone>
  );
};

const KICKERS = [
  SLIDE1.kicker,
  SLIDE1.kicker,
  SLIDE3.kicker,
  SLIDE3.kicker,
  SLIDE3.kicker,
  SLIDE2.kicker,
  SLIDE2.kicker,
  SLIDE2.kicker,
  SLIDE3.kicker,
  SLIDE4.kicker,
  SLIDE1.kicker,
];

const scene = (i: number, frames: number) => {
  switch (i) {
    case 0:
      return <Hook />;
    case 1:
      return <Tema />;
    case 2:
      return <Imovel />;
    case 3:
      return <ValueSplit stage="imune" />;
    case 4:
      return <ValueSplit stage="excedente" />;
    case 5:
      return <Stamp />;
    case 6:
      return <Literal frames={frames} />;
    case 7:
      return <SoQuota />;
    case 8:
      return <Mapa />;
    case 9:
      return <Material />;
    default:
      return <Hook loop />;
  }
};

const Caption: React.FC<{ text: string; frames: number; dark: boolean }> = ({ text, frames, dark }) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const total = words.reduce((n, w) => n + w.length + 1, 0);
  const spoken = (frame / Math.max(1, frames - 6)) * total;
  let acc = 0;
  const pop = useIn(0, 16);
  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.left,
        width: W,
        bottom: 1920 - SAFE.bottom,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: dark ? '#FFFFFF' : K.black,
          borderRadius: 22,
          padding: '20px 28px',
          textAlign: 'center',
          fontFamily: F.sans,
          fontWeight: 800,
          fontSize: 44,
          lineHeight: 1.22,
          letterSpacing: -0.6,
          transform: `scale(${0.92 + pop * 0.08})`,
          boxShadow: '0 14px 30px rgba(0,0,0,0.18)',
        }}
      >
        {words.map((w, i) => {
          const start = acc;
          acc += w.length + 1;
          const on = spoken >= start;
          const current = on && spoken < acc;
          const base = dark ? K.black : '#FFFFFF';
          return (
            <span key={i} style={{ color: current ? (dark ? K.green : K.mint) : base, opacity: on ? 1 : 0.4 }}>
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const Reel796: React.FC<{ showInstagramUI: boolean }> = ({ showInstagramUI }) => (
  <AbsoluteFill style={{ background: K.paper }}>
    {BEATS.map((b, i) => {
      const dark = i === 9;
      return (
        <Sequence key={b.n} from={b.from} durationInFrames={b.frames} name={`Beat ${b.n}`}>
          <AbsoluteFill style={{ background: dark ? K.black : K.paper }}>
            {!dark && (
              <AbsoluteFill
                style={{ backgroundImage: 'radial-gradient(rgba(17,20,18,0.06) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}
              />
            )}
            <div style={{ position: 'absolute', left: SAFE.left, top: SAFE.top }}>
              <Kicker text={KICKERS[i]} dark={dark} size={19} />
            </div>
            {scene(i, b.frames)}
            <Caption text={b.text} frames={b.frames} dark={dark} />
          </AbsoluteFill>
        </Sequence>
      );
    })}
    {showInstagramUI && <ReelsChrome caption={`${SLIDE1.title.a} ${SLIDE1.title.green} ${SLIDE1.title.b} ${SLIDE1.title.red}`} />}
  </AbsoluteFill>
);
