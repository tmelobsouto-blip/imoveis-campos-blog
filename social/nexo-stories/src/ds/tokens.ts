export const C = {
  ink: '#0B110E',
  green: '#176B49',
  mint: '#36CD89',
  paper: '#F8F9F6',
  surface: '#EDF3EE',
  line: '#D8E1DA',
  white: '#FFFFFF',
  muted: '#55645C',
  inkSoft: '#141C18',
  lineDark: '#26332C',
  mutedDark: '#93A39A',
  alert: '#B4441A',
  alertSoft: '#E9875F',
  alertSurface: '#F6E4DA',
};

export const FONT = {
  sans: "'Inter', sans-serif",
  mono: "'Noto Sans Mono', monospace",
  law: "'Source Serif 4', serif",
};

export const FORMAT = {
  feed: { w: 1080, h: 1350 },
  story: { w: 1080, h: 1920 },
};

export const GRID = {
  margin: 88,
  gutter: 32,
  storySafeTop: 250,
  storySafeBottom: 1580,
};

export const TYPE = {
  hero: { fontSize: 200, lineHeight: 0.86, letterSpacing: -9, fontWeight: 900 },
  display: { fontSize: 104, lineHeight: 0.94, letterSpacing: -4.6, fontWeight: 900 },
  h1: { fontSize: 76, lineHeight: 1, letterSpacing: -3, fontWeight: 800 },
  h2: { fontSize: 54, lineHeight: 1.06, letterSpacing: -1.9, fontWeight: 800 },
  lead: { fontSize: 38, lineHeight: 1.24, letterSpacing: -0.9, fontWeight: 600 },
  body: { fontSize: 32, lineHeight: 1.36, letterSpacing: -0.4, fontWeight: 500 },
  small: { fontSize: 27, lineHeight: 1.38, letterSpacing: -0.2, fontWeight: 500 },
  label: { fontSize: 21, lineHeight: 1.3, letterSpacing: 2.6, fontWeight: 600 },
  micro: { fontSize: 18, lineHeight: 1.35, letterSpacing: 1.6, fontWeight: 500 },
} as const;

export type Mode = 'light' | 'dark';
export type Format = keyof typeof FORMAT;

export const tone = (mode: Mode) =>
  mode === 'dark'
    ? { bg: C.ink, fg: C.white, sub: C.mutedDark, rule: C.lineDark, accent: C.mint, surface: C.inkSoft }
    : { bg: C.paper, fg: C.ink, sub: C.muted, rule: C.line, accent: C.green, surface: C.surface };
