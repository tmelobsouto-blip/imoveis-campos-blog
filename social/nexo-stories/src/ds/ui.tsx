import React, { createContext, useContext } from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONT, GRID, Mode, tone, TYPE } from './tokens';

// Feed pieces are Stills (rendered at frame 0), so motion is opt-in per tree.
const Motion = createContext(false);
export const MotionOn: React.FC<{ children: React.ReactNode }> = ({ children }) => <Motion.Provider value>{children}</Motion.Provider>;
const ModeCtx = createContext<Mode>('light');
export const useMode = () => useContext(ModeCtx);
export const useTone = () => tone(useContext(ModeCtx));

export const useReveal = (at: number, damping = 200) => {
  const animated = useContext(Motion);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!animated) return 1;
  return spring({ frame: frame - at, fps, config: { damping } });
};

export const useProgress = (from: number, to: number) => {
  const animated = useContext(Motion);
  const frame = useCurrentFrame();
  if (!animated) return 1;
  const t = interpolate(frame, [from, to], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return 1 - Math.pow(1 - t, 3);
};

export const Reveal: React.FC<{ at?: number; y?: number; style?: React.CSSProperties; children: React.ReactNode }> = ({
  at = 0,
  y = 24,
  style,
  children,
}) => {
  const p = useReveal(at);
  return <div style={{ opacity: p, transform: `translateY(${(1 - p) * y}px)`, ...style }}>{children}</div>;
};

export const Canvas: React.FC<{ mode: Mode; children: React.ReactNode; padTop?: number; padBottom?: number }> = ({
  mode,
  children,
  padTop,
  padBottom,
}) => {
  const t = tone(mode);
  return (
    <ModeCtx.Provider value={mode}>
      <AbsoluteFill
        style={{
          background: t.bg,
          color: t.fg,
          fontFamily: FONT.sans,
          padding: `${padTop ?? GRID.margin}px ${GRID.margin}px ${padBottom ?? GRID.margin}px`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </AbsoluteFill>
    </ModeCtx.Provider>
  );
};

export const Label: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color,
  size,
  style,
}) => {
  const t = useTone();
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        ...TYPE.label,
        fontSize: size ?? TYPE.label.fontSize,
        letterSpacing: (size ?? TYPE.label.fontSize) * 0.12,
        textTransform: 'uppercase',
        color: color ?? t.sub,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Brand signature: a full-width rule that fills with the carousel position, plus the section label and counter. */
export const TopBar: React.FC<{ label: string; index?: number; total?: number }> = ({ label, index, total }) => {
  const t = useTone();
  const fill = index && total ? index / total : 0;
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{ position: 'relative', height: 3, background: t.rule }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${fill * 100}%`, background: t.accent }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
        <Label color={t.accent}>{label}</Label>
        {index && total ? (
          <Label>
            {String(index).padStart(2, '0')}
            <span style={{ opacity: 0.45 }}> / {String(total).padStart(2, '0')}</span>
          </Label>
        ) : null}
      </div>
    </div>
  );
};

export const Footer: React.FC<{ action?: React.ReactNode }> = ({ action }) => {
  const t = useTone();
  return (
    <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontFamily: FONT.mono, fontSize: 21, fontWeight: 500, letterSpacing: 0.6, color: t.sub }}>@nexofiscalbr</span>
      {action ? (
        <span style={{ fontFamily: FONT.sans, fontSize: 24, fontWeight: 800, letterSpacing: -0.3, color: t.accent }}>{action}</span>
      ) : null}
    </div>
  );
};

export const Fill: React.FC<{ children: React.ReactNode; justify?: React.CSSProperties['justifyContent']; gap?: number }> = ({
  children,
  justify = 'center',
  gap = 0,
}) => <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: justify, gap }}>{children}</div>;

type TextKind = keyof typeof TYPE;
export const Text: React.FC<{ kind: TextKind; color?: string; style?: React.CSSProperties; children: React.ReactNode; as?: 'div' | 'span' }> = ({
  kind,
  color,
  style,
  children,
}) => {
  const t = useTone();
  return <div style={{ fontFamily: FONT.sans, ...TYPE[kind], color: color ?? t.fg, ...style }}>{children}</div>;
};

/** Accent word: mint on dark, green on a surface marker on light. */
export const Hl: React.FC<{ children: React.ReactNode; marker?: boolean }> = ({ children, marker }) => {
  const mode = useMode();
  if (mode === 'dark') return <span style={{ color: C.mint }}>{children}</span>;
  return (
    <span
      style={{
        color: C.green,
        background: marker ? C.surface : undefined,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
        padding: marker ? '0 0.12em' : undefined,
      }}
    >
      {children}
    </span>
  );
};

export const Warn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useMode();
  return <span style={{ color: mode === 'dark' ? C.alertSoft : C.alert }}>{children}</span>;
};

/** Brand device from the material: the explanation in brackets, on the same line. */
export const Br: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useMode();
  const c = mode === 'dark' ? C.mint : C.green;
  return (
    <span style={{ fontFamily: FONT.sans, fontWeight: 700, color: c, fontSize: '0.82em', letterSpacing: -0.2 }}>
      <span style={{ fontWeight: 400 }}>[</span>
      {children}
      <span style={{ fontWeight: 400 }}>]</span>
    </span>
  );
};

export const Rule: React.FC<{ strong?: boolean; style?: React.CSSProperties }> = ({ strong, style }) => {
  const t = useTone();
  return <div style={{ height: strong ? 3 : 1.5, background: strong ? t.fg : t.rule, ...style }} />;
};

export const Law: React.FC<{ source: string; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  source,
  children,
  size = 36,
  style,
}) => {
  const t = useTone();
  return (
    <div style={{ borderLeft: `6px solid ${t.accent}`, paddingLeft: 34, ...style }}>
      <Label>{source}</Label>
      <div style={{ fontFamily: FONT.law, fontWeight: 500, fontSize: size, lineHeight: 1.32, letterSpacing: -0.3, color: t.fg, marginTop: 18 }}>
        {children}
      </div>
    </div>
  );
};

/** Literal-text highlight: underline bar that can animate. */
export const Mark: React.FC<{ children: React.ReactNode; p?: number }> = ({ children, p = 1 }) => {
  const mode = useMode();
  const bg = mode === 'dark' ? 'rgba(54,205,137,0.22)' : C.surface;
  const fg = mode === 'dark' ? C.mint : C.green;
  return (
    <span
      style={{
        color: fg,
        backgroundImage: `linear-gradient(${bg}, ${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${p * 100}% 100%`,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
        padding: '0 0.1em',
      }}
    >
      {children}
    </span>
  );
};

export type Part = { value: number; label: string; caption: string; tone: 'green' | 'alert' | 'neutral' };

export const SplitBar: React.FC<{ parts: Part[]; height?: number; p?: number; scale?: string[] }> = ({ parts, height = 72, p = 1, scale }) => {
  const t = useTone();
  const mode = useMode();
  const total = parts.reduce((n, x) => n + x.value, 0);
  const fillOf = (k: Part['tone']) =>
    k === 'green' ? (mode === 'dark' ? C.mint : C.green) : k === 'alert' ? C.alert : mode === 'dark' ? '#3A4741' : '#AEBBB3';
  return (
    <div>
      <div style={{ display: 'flex', height, gap: 6 }}>
        {parts.map((x, i) => (
          <div key={i} style={{ width: `${(x.value / total) * 100}%`, position: 'relative', background: t.rule }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: fillOf(x.tone),
                transform: `scaleX(${clamp((p * parts.length - i) as number)})`,
                transformOrigin: 'left',
              }}
            />
          </div>
        ))}
      </div>
      {scale ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
          {scale.map((s) => (
            <Label key={s} size={18}>
              {s}
            </Label>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

export const Stat: React.FC<{ value: React.ReactNode; label: string; color?: string; size?: number; sub?: string }> = ({
  value,
  label,
  color,
  size = 112,
  sub,
}) => {
  const t = useTone();
  return (
    <div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 900, fontSize: size, lineHeight: 0.9, letterSpacing: -size * 0.045, color: color ?? t.fg, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
      <Label style={{ marginTop: 18 }} color={color}>
        {label}
      </Label>
      {sub ? <Text kind="small" color={t.sub} style={{ marginTop: 8 }}>{sub}</Text> : null}
    </div>
  );
};

export const Tag: React.FC<{ children: React.ReactNode; tone?: 'accent' | 'alert' | 'plain' }> = ({ children, tone: k = 'accent' }) => {
  const t = useTone();
  const color = k === 'alert' ? C.alert : k === 'plain' ? t.sub : t.accent;
  return (
    <span
      style={{
        display: 'inline-block',
        border: `2px solid ${color}`,
        borderRadius: 4,
        padding: '8px 14px',
        fontFamily: FONT.mono,
        fontWeight: 600,
        fontSize: 19,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color,
      }}
    >
      {children}
    </span>
  );
};

export const TemplateBadge: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      right: GRID.margin,
      bottom: GRID.margin + 48,
      background: C.alert,
      color: C.white,
      fontFamily: FONT.mono,
      fontWeight: 700,
      fontSize: 17,
      letterSpacing: 2,
      padding: '8px 12px',
      borderRadius: 3,
    }}
  >
    MODELO · DADOS FICTÍCIOS · VALIDAR ANTES DE PUBLICAR
  </div>
);

export const Icon = {
  bookmark: (color: string, size = 44) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round">
      <path d="M6 3h12v18l-6-4.5L6 21z" />
    </svg>
  ),
  link: (color: string, size = 36) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  ),
  arrowUp: (color: string, size = 48) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V5M5 11l7-7 7 7" />
    </svg>
  ),
};
