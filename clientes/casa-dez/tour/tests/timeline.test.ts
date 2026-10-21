import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { IMAGE_ASPECT, SHOTS } from '../src/tour/data';
import {
  buildTimeline,
  cameraRect,
  chapterOfShot,
  chaptersOf,
  frameAt,
  projectPoint,
  shotIndexAt,
  shotStart,
} from '../src/tour/timeline';

const tl = buildTimeline(SHOTS);

describe('storyboard data', () => {
  it('has unique ids backed by real photo files', () => {
    const ids = SHOTS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      expect(existsSync(new URL(`../../fotos/${id}.webp`, import.meta.url))).toBe(true);
      expect(existsSync(new URL(`../../fotos/${id}-thumb.webp`, import.meta.url))).toBe(true);
    }
  });

  it('declares a transition on every shot except the last', () => {
    SHOTS.slice(0, -1).forEach((s) => expect(s.next, s.id).toBeDefined());
    expect(SHOTS.at(-1)!.next).toBeUndefined();
  });

  it('gives approach shots a focus and match shots a direction', () => {
    for (const s of SHOTS) {
      if (s.next === 'approach') expect(s.focus, s.id).toBeDefined();
      if (s.next === 'match') expect(s.dir, s.id).toBeDefined();
    }
  });

  it('keeps cameras and hotspots inside the photo', () => {
    for (const s of SHOTS) {
      for (const c of [s.from, s.to]) {
        expect(c.z).toBeGreaterThanOrEqual(1);
        expect(c.x).toBeGreaterThanOrEqual(0);
        expect(c.x).toBeLessThanOrEqual(1);
      }
      for (const h of s.hotspots ?? []) {
        expect(h.x).toBeGreaterThan(0);
        expect(h.x).toBeLessThan(1);
        expect(SHOTS.some((o) => o.id === h.target), `${s.id} → ${h.target}`).toBe(true);
        expect(h.target).not.toBe(s.id);
      }
    }
  });
});

describe('buildTimeline', () => {
  it('accumulates weights', () => {
    expect(tl.starts[0]).toBe(0);
    expect(tl.total).toBeCloseTo(SHOTS.reduce((a, s) => a + (s.weight ?? 1), 0));
    expect(tl.starts.length).toBe(SHOTS.length);
  });

  it('maps t to the owning shot', () => {
    expect(shotIndexAt(tl, 0)).toBe(0);
    expect(shotIndexAt(tl, tl.starts[5] + 0.01)).toBe(5);
    expect(shotIndexAt(tl, tl.total)).toBe(SHOTS.length - 1);
  });

  it('shotStart lands on a frame where only that shot is visible', () => {
    SHOTS.forEach((_, i) => {
      const f = frameAt(SHOTS, tl, shotStart(tl, i));
      expect(f.a.index).toBe(i);
      expect(f.b).toBeNull();
    });
  });
});

describe('frameAt', () => {
  it('starts on the first shot alone', () => {
    const f = frameAt(SHOTS, tl, 0);
    expect(f.a.index).toBe(0);
    expect(f.b).toBeNull();
    expect(f.a.camera).toEqual(SHOTS[0].from);
  });

  it('ends on the last shot at its final camera', () => {
    const f = frameAt(SHOTS, tl, tl.total);
    expect(f.a.index).toBe(SHOTS.length - 1);
    expect(f.a.camera.z).toBeCloseTo(SHOTS.at(-1)!.to.z);
  });

  it('is continuous across every shot boundary', () => {
    for (let i = 1; i < SHOTS.length; i++) {
      const before = frameAt(SHOTS, tl, tl.starts[i] - 1e-6);
      const after = frameAt(SHOTS, tl, tl.starts[i] + 1e-6);
      expect(before.b?.index).toBe(i);
      expect(before.mix).toBeCloseTo(1, 4);
      expect(after.a.index).toBe(i);
      expect(after.b).toBeNull();
      expect(before.b!.camera.x).toBeCloseTo(after.a.camera.x, 4);
      expect(before.b!.camera.y).toBeCloseTo(after.a.camera.y, 4);
      expect(before.b!.camera.z).toBeCloseTo(after.a.camera.z, 4);
    }
  });

  it('never jumps the camera of a visible layer between close samples', () => {
    const step = 0.002;
    let prev = frameAt(SHOTS, tl, 0);
    for (let t = step; t <= tl.total; t += step) {
      const cur = frameAt(SHOTS, tl, t);
      if (cur.a.index === prev.a.index) {
        expect(Math.abs(cur.a.camera.x - prev.a.camera.x)).toBeLessThan(0.01);
        expect(Math.abs(cur.a.camera.z - prev.a.camera.z)).toBeLessThan(0.01);
        expect(Math.abs(cur.mix - prev.mix)).toBeLessThan(0.05);
      } else {
        // Layer B of the finished transition becomes layer A: the picture must not change.
        expect(prev.b?.index).toBe(cur.a.index);
        expect(prev.mix).toBeGreaterThan(0.95);
        expect(cur.mix).toBeLessThan(0.05);
      }
      prev = cur;
    }
  });

  it('runs backwards to the exact same frames', () => {
    const t = tl.starts[3] + 0.83;
    expect(frameAt(SHOTS, tl, t)).toEqual(frameAt(SHOTS, tl, t));
  });

  it('switches the dominant shot halfway through a transition', () => {
    const i = 2;
    const end = tl.starts[i + 1];
    expect(frameAt(SHOTS, tl, end - 0.001).dominant).toBe(i + 1);
    expect(frameAt(SHOTS, tl, tl.starts[i] + 0.1).dominant).toBe(i);
  });

  it('uses static cameras and plain fades under reduced motion', () => {
    const t = tl.starts[1] - 0.05;
    const f = frameAt(SHOTS, tl, t, true);
    expect(f.kind).toBe('fade');
    expect(f.a.blur).toBe(0);
    expect(f.linear).toBe(0);
    const s = SHOTS[0];
    expect(f.a.camera.z).toBeCloseTo((s.from.z + s.to.z) / 2);
  });
});

describe('cameraRect', () => {
  const aspects = [16 / 9, 4 / 3, 1, 9 / 19.5, 21 / 9];

  it('always keeps the visible window inside the photo', () => {
    for (const va of aspects) {
      for (const cam of [
        { x: 0, y: 0, z: 1 },
        { x: 1, y: 1, z: 1.5 },
        { x: 0.5, y: 0.5, z: 0.7 },
        { x: 0.95, y: 0.1, z: 1.04 },
      ]) {
        const r = cameraRect(cam, IMAGE_ASPECT, va);
        expect(r.ox).toBeGreaterThanOrEqual(-1e-9);
        expect(r.oy).toBeGreaterThanOrEqual(-1e-9);
        expect(r.ox + r.sx).toBeLessThanOrEqual(1 + 1e-9);
        expect(r.oy + r.sy).toBeLessThanOrEqual(1 + 1e-9);
      }
    }
  });

  it('preserves the photo aspect ratio (no stretching)', () => {
    for (const va of aspects) {
      const r = cameraRect({ x: 0.5, y: 0.5, z: 1.2 }, IMAGE_ASPECT, va);
      expect((r.sx * IMAGE_ASPECT) / r.sy).toBeCloseTo(va, 6);
    }
  });

  it('projects image points back to screen space', () => {
    const r = cameraRect({ x: 0.5, y: 0.5, z: 1 }, IMAGE_ASPECT, IMAGE_ASPECT);
    expect(projectPoint(r, 0.5, 0.5)).toEqual({ x: 0.5, y: 0.5 });
    expect(projectPoint(r, 0, 0)).toEqual({ x: 0, y: 0 });
  });
});

describe('chapters', () => {
  const chapters = chaptersOf(SHOTS);

  it('groups consecutive shots of the same room', () => {
    expect(chapters.map((c) => c.room)).toEqual([
      'Piscina',
      'Exterior',
      'Sala de estar',
      'Cozinha completa',
      'Sala de estar',
      'Quarto 4',
      'Exterior',
    ]);
    expect(chapters[0]).toMatchObject({ first: 0, last: 6, number: 1 });
    expect(chapters.at(-1)!.last).toBe(SHOTS.length - 1);
  });

  it('finds the chapter of any shot', () => {
    expect(chapterOfShot(chapters, 0)).toBe(0);
    expect(chapterOfShot(chapters, 7)).toBe(1);
    expect(chapterOfShot(chapters, SHOTS.length - 1)).toBe(chapters.length - 1);
  });
});
