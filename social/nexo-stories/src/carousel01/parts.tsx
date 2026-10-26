import React from 'react';
import { HANDLE, SLIDE2, SLIDE3, SLIDE4 } from './content';
import { F, K } from './theme';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const Mono: React.FC<{ color?: string; size?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  color = K.green,
  size = 18,
  style,
  children,
}) => <div style={{ fontFamily: F.mono, fontWeight: 500, fontSize: size, letterSpacing: size * 0.16, color, ...style }}>{children}</div>;

export const Kicker: React.FC<{ text: string; dark?: boolean; size?: number }> = ({ text, dark, size = 18 }) => (
  <div style={{ display: 'inline-block', borderBottom: `2px solid ${dark ? K.mint : K.green}`, paddingBottom: 10 }}>
    <Mono color={dark ? K.mint : K.green} size={size} style={{ fontWeight: 700 }}>
      {text}
    </Mono>
  </div>
);

export const Mark: React.FC<{ tone: 'green' | 'red'; children: React.ReactNode; p?: number; style?: React.CSSProperties }> = ({
  tone,
  children,
  p = 1,
  style,
}) => (
  <span
    style={{
      position: 'relative',
      display: 'inline-block',
      color: tone === 'green' ? K.green : K.red,
      padding: '0 14px',
      ...style,
    }}
  >
    <span
      style={{
        position: 'absolute',
        inset: '4px 0 0 0',
        borderRadius: 12,
        background: tone === 'green' ? K.greenSoft : K.redSoft,
        transform: `scaleX(${p})`,
        transformOrigin: 'left',
        zIndex: -1,
      }}
    />
    {children}
  </span>
);

export const HighlightRun: React.FC<{ text: string; p?: number }> = ({ text, p = 1 }) => (
  <span
    style={{
      color: K.green,
      backgroundImage: `linear-gradient(${K.greenSoft}, ${K.greenSoft})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${p * 100}% 100%`,
      boxDecorationBreak: 'clone',
      WebkitBoxDecorationBreak: 'clone',
      padding: '0 6px',
      borderRadius: 6,
    }}
  >
    {text}
  </span>
);

export const LiteralCard: React.FC<{
  label: string;
  children: React.ReactNode;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({ label, children, fontSize = 31, style }) => (
  <div
    style={{
      background: K.card,
      border: `1.5px solid ${K.border}`,
      borderLeft: `7px solid ${K.green}`,
      borderRadius: 22,
      padding: '44px 48px 40px',
      boxShadow: '0 10px 30px rgba(17,20,18,0.05)',
      ...style,
    }}
  >
    <Mono size={15} style={{ fontWeight: 700 }}>
      {label}
    </Mono>
    <div style={{ fontFamily: F.serif, fontWeight: 500, fontSize, lineHeight: 1.3, color: K.ink, marginTop: 18 }}>{children}</div>
  </div>
);

export const PlainCard: React.FC<{ label: string; children: React.ReactNode; fontSize?: number; style?: React.CSSProperties }> = ({
  label,
  children,
  fontSize = 33,
  style,
}) => (
  <div
    style={{
      background: K.black,
      borderLeft: `7px solid ${K.mint}`,
      borderRadius: 22,
      padding: '42px 48px 44px',
      boxShadow: '0 24px 50px rgba(11,17,14,0.22)',
      ...style,
    }}
  >
    <Mono color={K.mint} size={15} style={{ fontWeight: 700 }}>
      {label}
    </Mono>
    <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize, lineHeight: 1.22, color: '#FFFFFF', marginTop: 14, letterSpacing: -0.4 }}>
      {children}
    </div>
  </div>
);

export const TeseQuote: React.FC<{ p?: number }> = ({ p = 1 }) => (
  <>
    {SLIDE2.quote.before} <HighlightRun text={SLIDE2.quote.highlight} p={p} /> {SLIDE2.quote.after}
  </>
);

export const PlainTese: React.FC = () => (
  <>
    {SLIDE2.plain.a} <span style={{ color: K.mint }}>{SLIDE2.plain.green}</span>
    {SLIDE2.plain.b}
  </>
);

export const Footer: React.FC<{ cta: React.ReactNode; dark?: boolean }> = ({ cta, dark }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontFamily: F.mono, fontSize: 19, color: dark ? '#8C9A93' : K.muted }}>{HANDLE}</span>
    {cta}
  </div>
);

export const LinkCta: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 21, color: K.green }}>{text} →</span>
);

const Box: React.FC<{ tone: 'green' | 'red'; label: string; title: string; chip: string; p: number; pulse?: number }> = ({
  tone,
  label,
  title,
  chip,
  p,
  pulse = 0,
}) => {
  const c = tone === 'green' ? { fg: K.green, bg: '#E9F3EE', line: K.green, chip: K.greenSoft } : { fg: K.red, bg: '#FCEEE7', line: K.redLine, chip: K.redSoft };
  return (
    <div
      style={{
        flex: 1,
        background: c.bg,
        border: `2px solid ${c.line}`,
        borderRadius: 20,
        padding: '30px 26px',
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px) scale(${1 + pulse * 0.04})`,
        boxShadow: pulse ? `0 0 ${30 * pulse}px rgba(180,68,26,${0.35 * pulse})` : 'none',
      }}
    >
      <Mono color={c.fg} size={15} style={{ fontWeight: 700, letterSpacing: 1.4 }}>
        {label}
      </Mono>
      <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 38, letterSpacing: -1, color: c.fg, marginTop: 12 }}>{title}</div>
      <div
        style={{
          display: 'inline-block',
          marginTop: 16,
          background: c.chip,
          borderRadius: 8,
          padding: '8px 14px',
          fontFamily: F.mono,
          fontWeight: 500,
          fontSize: 16,
          color: c.fg,
        }}
      >
        {chip}
      </div>
    </div>
  );
};

export const MapDiagram: React.FC<{ width: number; root?: number; left?: number; right?: number; pulse?: number }> = ({
  width,
  root = 1,
  left = 1,
  right = 1,
  pulse = 0,
}) => {
  const rootW = width * 0.72;
  const arrowH = 150;
  return (
    <div style={{ width, position: 'relative' }}>
      <div
        style={{
          width: rootW,
          margin: '0 auto',
          background: K.black,
          borderRadius: 20,
          padding: '30px 24px',
          textAlign: 'center',
          opacity: root,
          transform: `translateY(${(1 - root) * -20}px)`,
          boxShadow: '0 20px 40px rgba(11,17,14,0.22)',
        }}
      >
        <Mono color={K.mint} size={15} style={{ fontWeight: 700 }}>
          {SLIDE3.rootLabel}
        </Mono>
        <div style={{ fontFamily: F.display, fontWeight: 800, fontSize: 36, color: '#fff', marginTop: 10, letterSpacing: -0.8 }}>{SLIDE3.rootTitle}</div>
        <div style={{ fontFamily: F.serif, fontSize: 21, color: '#D5DDD8', marginTop: 8 }}>{SLIDE3.rootExample}</div>
      </div>
      <svg width={width} height={arrowH} viewBox={`0 0 ${width} ${arrowH}`} style={{ display: 'block' }}>
        {[
          { x0: width * 0.38, x1: width * 0.24, color: K.green, p: left },
          { x0: width * 0.6, x1: width * 0.76, color: '#C2562A', p: right },
        ].map((a, i) => (
          <g key={i}>
            <path
              d={`M ${a.x0} 6 C ${a.x0} 70, ${a.x1} 50, ${a.x1} ${arrowH - 22}`}
              fill="none"
              stroke={a.color}
              strokeWidth={4}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - a.p}
            />
            <path
              d={`M ${a.x1 - 18} ${arrowH - 36} L ${a.x1} ${arrowH - 14} L ${a.x1 + 18} ${arrowH - 36}`}
              fill="none"
              stroke={a.color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={a.p > 0.9 ? 1 : 0}
            />
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 34 }}>
        <Box tone="green" {...SLIDE3.left} p={left} />
        <Box tone="red" {...SLIDE3.right} p={right} pulse={pulse} />
      </div>
    </div>
  );
};

const Lines: React.FC<{ rows: number[]; color?: string; h?: number; gap?: number }> = ({ rows, color = '#D9DEDB', h = 5, gap = 7 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {rows.map((w, i) => (
      <div key={i} style={{ width: `${w}%`, height: h, borderRadius: h, background: color }} />
    ))}
  </div>
);

export const MaterialPages: React.FC<{ scale?: number; float?: number }> = ({ scale = 1, float = 0 }) => (
  <div style={{ position: 'relative', width: 920, height: 600, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
    <div
      style={{
        position: 'absolute',
        left: 10,
        top: 40,
        width: 440,
        height: 560,
        background: '#FBFBF9',
        borderRadius: 14,
        transform: `rotate(${-4 + float}deg)`,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        padding: '34px 30px',
        boxSizing: 'border-box',
      }}
    >
      <Lines rows={[40, 70]} h={4} />
      <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 19, color: K.ink, margin: '22px 0 14px', borderBottom: `2px solid ${K.ink}`, paddingBottom: 8 }}>
        {SLIDE4.pageA.title}
      </div>
      {SLIDE4.pageA.rates.map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 44, fontFamily: F.sans, fontWeight: 800, fontSize: 15, color: K.ink }}>{r}</span>
          <span style={{ width: [70, 54, 40, 30, 30][i], height: 7, background: K.green, borderRadius: 2 }} />
          <div style={{ flex: 1 }}>
            <Lines rows={[96, 80]} h={4} gap={5} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 14, borderLeft: `3px solid ${K.ink}`, paddingLeft: 14 }}>
        <Lines rows={[90, 84, 92, 70, 88, 60]} h={4} />
      </div>
      <div style={{ position: 'absolute', left: 30, bottom: 30, background: K.black, color: K.mint, fontFamily: F.sans, fontWeight: 800, fontSize: 18, padding: '10px 14px', borderRadius: 6 }}>
        7.02 · 7.05 · 16.01
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 470,
        top: 0,
        width: 440,
        height: 570,
        background: '#FBFBF9',
        borderRadius: 14,
        transform: `rotate(${3 - float}deg)`,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        padding: '34px 30px',
        boxSizing: 'border-box',
      }}
    >
      <Lines rows={[30, 88, 76, 90]} h={4} />
      <div style={{ fontFamily: F.sans, fontWeight: 800, fontSize: 18, color: K.ink, margin: '24px 0 10px', borderBottom: `2px solid ${K.green}`, paddingBottom: 8 }}>
        {SLIDE4.pageB.title}
      </div>
      <div style={{ display: 'inline-block', background: K.green, width: 60, height: 14, borderRadius: 3, marginBottom: 12 }} />
      <Lines rows={[94, 90, 86, 92, 80, 94, 88, 72, 90, 84, 92, 66, 88, 90, 58]} h={4} gap={9} />
    </div>
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        background: K.mint,
        color: K.black,
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 18,
        padding: '12px 18px',
        borderRadius: 30,
      }}
    >
      {SLIDE4.badgeTop}
    </div>
    <div
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        background: K.mint,
        color: K.black,
        fontFamily: F.mono,
        fontWeight: 700,
        fontSize: 18,
        padding: '12px 18px',
        borderRadius: 30,
      }}
    >
      {SLIDE4.badgeBottom}
    </div>
  </div>
);
