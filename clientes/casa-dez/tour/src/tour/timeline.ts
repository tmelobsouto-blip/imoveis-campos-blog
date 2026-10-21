import type { Camera, Point, Shot, TransitionKind } from './data';

/** Share of a shot's scroll length spent handing over to the next shot. */
export const TRANSITION_SPAN: Record<TransitionKind, number> = {
  approach: 0.42,
  match: 0.38,
  cut: 0.45,
};

export interface Timeline {
  starts: number[];
  weights: number[];
  total: number;
}

export interface Layer {
  index: number;
  camera: Camera;
  /** Radial (zoom) blur strength. */
  blur: number;
}

export interface Frame {
  a: Layer;
  b: Layer | null;
  mix: number;
  kind: TransitionKind | 'fade' | null;
  /** Image-space point the camera of layer A is travelling towards. */
  focus: Point;
  /** Signed horizontal travel blur. */
  linear: number;
  dominant: number;
}

export interface Rect {
  sx: number;
  sy: number;
  ox: number;
  oy: number;
}

export interface Chapter {
  room: string;
  first: number;
  last: number;
  number: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const clamp01 = (v: number) => clamp(v, 0, 1);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

export function buildTimeline(shots: readonly Shot[]): Timeline {
  const weights = shots.map((s) => s.weight ?? 1);
  const starts: number[] = [];
  let acc = 0;
  for (const w of weights) {
    starts.push(acc);
    acc += w;
  }
  return { starts, weights, total: acc };
}

function outgoingSpan(shots: readonly Shot[], i: number) {
  const kind = shots[i]?.next;
  return i < shots.length - 1 && kind ? TRANSITION_SPAN[kind] : 0;
}

export function shotIndexAt(tl: Timeline, t: number) {
  let i = 0;
  while (i < tl.starts.length - 1 && t >= tl.starts[i + 1]) i++;
  return i;
}

/** First t at which shot i is on screen alone. */
export function shotStart(tl: Timeline, i: number) {
  return tl.starts[clamp(i, 0, tl.starts.length - 1)];
}

/** A shot's camera travels across its whole life: from the moment it starts fading in until it is gone. */
function lifeCamera(shots: readonly Shot[], tl: Timeline, i: number, t: number, reduced: boolean): Camera {
  const { from, to } = shots[i];
  const start = i === 0 ? 0 : tl.starts[i] - outgoingSpan(shots, i - 1) * tl.weights[i - 1];
  const end = tl.starts[i] + tl.weights[i];
  const u = reduced ? 0.5 : clamp01((t - start) / (end - start));
  return { x: lerp(from.x, to.x, u), y: lerp(from.y, to.y, u), z: lerp(from.z, to.z, u) };
}

export function frameAt(shots: readonly Shot[], tl: Timeline, rawT: number, reduced = false): Frame {
  const t = clamp(rawT, 0, tl.total);
  const i = shotIndexAt(tl, t);
  const camA = lifeCamera(shots, tl, i, t, reduced);
  const span = outgoingSpan(shots, i);
  const f = (t - tl.starts[i]) / tl.weights[i];

  const frame: Frame = {
    a: { index: i, camera: camA, blur: 0 },
    b: null,
    mix: 0,
    kind: null,
    focus: { x: camA.x, y: camA.y },
    linear: 0,
    dominant: i,
  };
  if (span === 0 || f < 1 - span) return frame;

  const k = clamp01((f - (1 - span)) / span);
  const camB = lifeCamera(shots, tl, i + 1, t, reduced);
  const b: Layer = { index: i + 1, camera: camB, blur: 0 };
  frame.b = b;

  if (reduced) {
    frame.kind = 'fade';
    frame.mix = smoothstep(0, 1, k);
  } else {
    const shot = shots[i];
    frame.kind = shot.next!;
    const e = smoothstep(0, 1, k);
    const pulse = Math.sin(Math.PI * k);
    switch (shot.next) {
      case 'approach': {
        const focus = shot.focus ?? frame.focus;
        frame.focus = focus;
        frame.a.camera = {
          x: lerp(camA.x, focus.x, e * 0.9),
          y: lerp(camA.y, focus.y, e * 0.9),
          z: camA.z * (1 + 0.45 * e),
        };
        frame.a.blur = 0.1 * pulse;
        b.blur = 0.05 * pulse;
        frame.mix = smoothstep(0.25, 0.9, k);
        break;
      }
      case 'match': {
        const dir = shot.dir ?? 1;
        frame.a.camera = { ...camA, x: camA.x + (dir * 0.12 * e) / camA.z };
        b.camera = { ...camB, x: camB.x - (dir * 0.12 * (1 - e)) / camB.z };
        frame.linear = dir * 0.03 * pulse;
        frame.mix = smoothstep(0.2, 0.8, k);
        break;
      }
      case 'cut':
        frame.mix = k;
        break;
    }
  }
  frame.dominant = frame.mix >= 0.5 ? i + 1 : i;
  return frame;
}

export function coverScale(imageAspect: number, viewAspect: number): [number, number] {
  return viewAspect > imageAspect ? [1, imageAspect / viewAspect] : [viewAspect / imageAspect, 1];
}

/** Visible window of the photo (UV) for a camera; the photo is never stretched or exposed past its edges. */
export function cameraRect(cam: Camera, imageAspect: number, viewAspect: number): Rect {
  const z = Math.max(1, cam.z);
  const [cx, cy] = coverScale(imageAspect, viewAspect);
  const sx = cx / z;
  const sy = cy / z;
  const x = clamp(cam.x, sx / 2, 1 - sx / 2);
  const y = clamp(cam.y, sy / 2, 1 - sy / 2);
  return { sx, sy, ox: x - sx / 2, oy: y - sy / 2 };
}

export function projectPoint(r: Rect, px: number, py: number): Point {
  return { x: (px - r.ox) / r.sx, y: (py - r.oy) / r.sy };
}

export function chaptersOf(shots: readonly Shot[]): Chapter[] {
  const chapters: Chapter[] = [];
  shots.forEach((s, i) => {
    const last = chapters.at(-1);
    if (last && last.room === s.room) last.last = i;
    else chapters.push({ room: s.room, first: i, last: i, number: chapters.length + 1 });
  });
  return chapters;
}

export function chapterOfShot(chapters: readonly Chapter[], index: number) {
  return Math.max(0, chapters.findIndex((c) => index >= c.first && index <= c.last));
}
