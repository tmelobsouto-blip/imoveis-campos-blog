import { IMAGE_ASPECT, photoSrc, type Camera, type Shot } from './data';
import { createRenderer, KIND_CODE, type Renderer } from './renderer';
import {
  buildTimeline,
  cameraRect,
  frameAt,
  projectPoint,
  shotStart,
  type Frame,
  type Rect,
  type Timeline,
} from './timeline';

export interface FrameInfo {
  t: number;
  total: number;
  frame: Frame;
  rectA: Rect;
  velocity: number;
  settled: boolean;
}

export interface EngineEvents {
  onShot?(index: number): void;
  onFrame?(info: FrameInfo): void;
  onLoad?(loaded: number, total: number): void;
  onAutoplay?(playing: boolean): void;
  onEnd?(atEnd: boolean): void;
}

export interface EngineOptions {
  reducedMotion: boolean;
  finePointer: boolean;
}

/** Higher = the camera catches up with the scroll faster. ~5 feels like a dolly with inertia. */
const SMOOTHING = 5.5;
const AUTOPLAY_SECONDS_PER_SHOT = 7;
/** Beyond this distance (in shots) a jump fades through black instead of flying past every room. */
const CUT_JUMP_DISTANCE = 2.5;
const MAX_DPR = 1.75;
const GRAIN = 0.022;

const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

export class TourEngine {
  readonly timeline: Timeline;
  private renderer: Renderer;
  private t = 0;
  private target = 0;
  private velocity = 0;
  private started = false;
  private autoplay = false;
  private playAfterJump = false;
  private scrollPos = 0;
  private glide: { from: number; to: number; start: number; duration: number } | null = null;
  private fade = 0;
  private fadeTarget = 0;
  private pendingJump: number | null = null;
  private pointer = { x: 0, y: 0 };
  private pointerTarget = { x: 0, y: 0 };
  private dominant = -1;
  private atEnd = false;
  private raf = 0;
  private last = 0;
  private dirty = true;
  private width = 1;
  private height = 1;
  private loaded = 0;
  private disposed = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private shots: readonly Shot[],
    private events: EngineEvents,
    private opts: EngineOptions,
  ) {
    this.timeline = buildTimeline(shots);
    this.renderer = createRenderer(canvas);
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('wheel', this.interrupt, { passive: true });
    window.addEventListener('touchstart', this.interrupt, { passive: true });
    window.addEventListener('pointerdown', this.interrupt, { passive: true });
    window.addEventListener('pointermove', this.onPointer, { passive: true });
    this.load();
    this.raf = requestAnimationFrame(this.tick);
  }

  get rendererKind() {
    return this.renderer.kind;
  }

  get isAutoplay() {
    return this.autoplay;
  }

  start() {
    this.started = true;
    this.dirty = true;
  }

  next() {
    this.goTo(Math.min(this.shots.length - 1, this.currentShot() + 1));
  }

  prev() {
    const i = this.currentShot();
    const rewindWithinShot = this.t > shotStart(this.timeline, i) + 0.15;
    this.goTo(rewindWithinShot ? i : Math.max(0, i - 1));
  }

  goTo(index: number) {
    const last = index >= this.shots.length - 1;
    const to = last ? this.timeline.total : shotStart(this.timeline, index) + 0.001;
    this.stopAutoplay();
    if (Math.abs(to - this.t) > CUT_JUMP_DISTANCE && !this.opts.reducedMotion) {
      this.jumpThroughBlack(to);
      return;
    }
    const distance = Math.abs(to - this.t);
    this.glide = {
      from: this.scrollPos,
      to: this.tToScroll(to),
      start: performance.now(),
      duration: Math.min(2400, 900 + distance * 600),
    };
  }

  play() {
    if (this.atEnd) {
      this.playAfterJump = true;
      this.jumpThroughBlack(0);
      return;
    }
    this.setAutoplay(true);
  }

  pause() {
    this.stopAutoplay();
  }

  restart() {
    this.stopAutoplay();
    this.jumpThroughBlack(0);
  }

  /** Any direct input from the visitor hands the camera back to them. */
  interrupt = (e?: Event) => {
    if (e?.target instanceof Element && e.target.closest('[data-ui]')) return;
    this.glide = null;
    this.stopAutoplay();
  };

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('wheel', this.interrupt);
    window.removeEventListener('touchstart', this.interrupt);
    window.removeEventListener('pointerdown', this.interrupt);
    window.removeEventListener('pointermove', this.onPointer);
    this.renderer.dispose();
  }

  private currentShot() {
    return Math.max(0, this.dominant);
  }

  private setAutoplay(on: boolean) {
    if (on) this.glide = null;
    if (this.autoplay === on) return;
    this.autoplay = on;
    this.events.onAutoplay?.(on);
  }

  private stopAutoplay() {
    this.playAfterJump = false;
    this.setAutoplay(false);
  }

  private jumpThroughBlack(to: number) {
    this.glide = null;
    this.pendingJump = to;
    this.fadeTarget = 1;
  }

  private maxScroll() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  private tToScroll(t: number) {
    return (t / this.timeline.total) * this.maxScroll();
  }

  private resize = () => {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    this.width = Math.max(1, rect.width);
    this.height = Math.max(1, rect.height);
    this.renderer.resize(Math.round(this.width * dpr), Math.round(this.height * dpr));
    this.dirty = true;
  };

  private onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    this.pointerTarget = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    };
  };

  private load() {
    const queue = this.shots.map((_, i) => i);
    const worker = async () => {
      while (queue.length && !this.disposed) {
        const i = queue.shift()!;
        try {
          const img = new Image();
          img.decoding = 'async';
          img.src = photoSrc(this.shots[i].id);
          await img.decode();
          if (this.disposed) return;
          this.renderer.setImage(i, img);
        } catch (err) {
          console.warn(`Falha ao carregar ${this.shots[i].id}`, err);
        }
        this.loaded++;
        this.dirty = true;
        this.events.onLoad?.(this.loaded, this.shots.length);
      }
    };
    for (let k = 0; k < 3; k++) void worker();
  }

  private tick = (now: number) => {
    this.raf = requestAnimationFrame(this.tick);
    const rawDt = this.last ? Math.min(0.25, (now - this.last) / 1000) : 1 / 60;
    const dt = Math.min(0.05, rawDt);
    this.last = now;
    const total = this.timeline.total;
    const max = this.maxScroll();

    if (this.glide) {
      const p = Math.min(1, (now - this.glide.start) / this.glide.duration);
      this.scrollPos = this.glide.from + (this.glide.to - this.glide.from) * easeInOutCubic(p);
      window.scrollTo(0, this.scrollPos);
      if (p >= 1) this.glide = null;
    } else if (this.autoplay) {
      this.scrollPos = Math.min(max, this.scrollPos + (max / total / AUTOPLAY_SECONDS_PER_SHOT) * rawDt);
      window.scrollTo(0, this.scrollPos);
      if (this.scrollPos >= max - 1) this.setAutoplay(false);
    } else {
      this.scrollPos = window.scrollY;
    }

    let fading = false;
    if (this.fade !== this.fadeTarget) {
      fading = true;
      const rate = this.fadeTarget > this.fade ? 4 : 2.2;
      this.fade = this.fadeTarget > this.fade
        ? Math.min(this.fadeTarget, this.fade + rate * dt)
        : Math.max(this.fadeTarget, this.fade - rate * dt);
      if (this.fade === 1 && this.pendingJump !== null) {
        this.scrollPos = this.tToScroll(this.pendingJump);
        window.scrollTo(0, this.scrollPos);
        this.t = this.target = this.pendingJump;
        this.pendingJump = null;
        this.fadeTarget = 0;
        if (this.playAfterJump) {
          this.playAfterJump = false;
          this.setAutoplay(true);
        }
      }
    }

    if (this.started) this.target = Math.min(total, Math.max(0, (this.scrollPos / max) * total));

    const prevT = this.t;
    const follow = 1 - Math.exp(-dt * (this.opts.reducedMotion ? 9 : SMOOTHING));
    this.t += (this.target - this.t) * follow;
    if (Math.abs(this.target - this.t) < 1e-5) this.t = this.target;
    this.velocity = (this.t - prevT) / dt;

    const ease = 1 - Math.exp(-dt * 3);
    const dx = (this.pointerTarget.x - this.pointer.x) * ease;
    const dy = (this.pointerTarget.y - this.pointer.y) * ease;
    this.pointer.x += dx;
    this.pointer.y += dy;
    const pointerMoving = this.opts.finePointer && Math.abs(dx) + Math.abs(dy) > 1e-5;

    const introDrift = !this.started && !this.opts.reducedMotion;
    if (!(this.dirty || fading || introDrift || pointerMoving || this.t !== prevT)) return;
    this.dirty = false;
    this.render(now / 1000);
  };

  private withParallax(c: Camera): Camera {
    if (!this.opts.finePointer || this.opts.reducedMotion) return c;
    return { x: c.x + (this.pointer.x * 0.012) / c.z, y: c.y + (this.pointer.y * 0.008) / c.z, z: c.z };
  }

  private render(time: number) {
    const reduced = this.opts.reducedMotion;
    const frame = frameAt(this.shots, this.timeline, this.t, reduced);
    const aspect = this.width / this.height;

    const camA = this.withParallax(frame.a.camera);
    if (!this.started && !reduced) {
      camA.z += 0.025 * (0.5 - 0.5 * Math.cos(time * 0.3));
      camA.x += 0.01 * Math.sin(time * 0.18);
    }
    const rectA = cameraRect(camA, IMAGE_ASPECT, aspect);
    const rectB = frame.b ? cameraRect(this.withParallax(frame.b.camera), IMAGE_ASPECT, aspect) : null;
    const focus = projectPoint(rectA, frame.focus.x, frame.focus.y);
    // Blur only exists while the camera moves: a paused frame is always the sharp photo.
    const speed = reduced ? 0 : Math.min(1, Math.abs(this.velocity) / 0.6);
    const motionBlur = reduced ? 0 : Math.min(0.04, Math.abs(this.velocity) * 0.025);

    this.renderer.draw({
      a: { image: frame.a.index, rect: rectA, blur: frame.a.blur * speed + motionBlur },
      b: frame.b && rectB ? { image: frame.b.index, rect: rectB, blur: frame.b.blur * speed + motionBlur } : null,
      mix: frame.mix,
      kind: KIND_CODE[frame.kind ?? 'fade'],
      focus: [focus.x, focus.y],
      linear: frame.linear,
      fade: this.fade,
      grain: reduced ? 0 : GRAIN,
      time,
    });

    if (frame.dominant !== this.dominant) {
      this.dominant = frame.dominant;
      this.events.onShot?.(frame.dominant);
    }
    const last = this.shots.length - 1;
    const atEnd = this.started && this.t >= this.timeline.starts[last] + this.timeline.weights[last] * 0.35;
    if (atEnd !== this.atEnd) {
      this.atEnd = atEnd;
      this.events.onEnd?.(atEnd);
    }
    this.events.onFrame?.({
      t: this.t,
      total: this.timeline.total,
      frame,
      rectA,
      velocity: this.velocity,
      settled: frame.b === null && Math.abs(this.velocity) < 0.06 && this.fade === 0,
    });
  }
}
