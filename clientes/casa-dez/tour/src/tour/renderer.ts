import type { Rect } from './timeline';

export const KIND_CODE = { approach: 0, match: 1, cut: 2, fade: 3 } as const;

export interface DrawState {
  a: { image: number; rect: Rect; blur: number };
  b: { image: number; rect: Rect; blur: number } | null;
  mix: number;
  kind: number;
  /** Screen-space centre of the zoom blur. */
  focus: [number, number];
  linear: number;
  fade: number;
  grain: number;
  time: number;
}

export interface Renderer {
  readonly kind: 'webgl2' | 'canvas2d';
  resize(width: number, height: number): void;
  setImage(index: number, image: HTMLImageElement): void;
  has(index: number): boolean;
  draw(state: DrawState): void;
  dispose(): void;
}

const VERT = `#version 300 es
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vPos;
void main() {
  vec2 q = P[gl_VertexID];
  vPos = vec2(q.x * 0.5 + 0.5, 0.5 - q.y * 0.5);
  gl_Position = vec4(q, 0.0, 1.0);
}`;

// Pixels are only ever sampled from the original photo: blur = averaged taps along the camera motion,
// the cut dissolve reveals the next photo by its own luminance. Nothing is synthesised.
const FRAG = `#version 300 es
precision highp float;
in vec2 vPos;
out vec4 outColor;
uniform sampler2D uA;
uniform sampler2D uB;
uniform vec4 uRectA;
uniform vec4 uRectB;
uniform float uBlurA;
uniform float uBlurB;
uniform vec2 uFocus;
uniform float uLinear;
uniform float uMix;
uniform int uKind;
uniform int uHasB;
uniform float uFade;
uniform float uGrain;
uniform float uTime;

vec3 tap(sampler2D t, vec4 r, vec2 p) {
  return texture(t, p * r.xy + r.zw).rgb;
}

vec3 layer(sampler2D t, vec4 r, vec2 p, float radial) {
  vec2 v = (p - uFocus) * radial + vec2(uLinear, 0.0);
  if (dot(v, v) < 1e-7) return tap(t, r, p);
  vec3 acc = vec3(0.0);
  for (int i = 0; i < 12; i++) {
    float s = float(i) / 11.0 - 0.5;
    acc += tap(t, r, p - v * s);
  }
  return acc / 12.0;
}

void main() {
  vec2 p = vPos;
  vec3 c = layer(uA, uRectA, p, uBlurA);
  if (uHasB == 1 && uMix > 0.0) {
    vec3 b = layer(uB, uRectB, p, uBlurB);
    if (uKind == 2) {
      float l = dot(b, vec3(0.299, 0.587, 0.114));
      float m = clamp(uMix * 1.7 - (1.0 - l) * 0.7, 0.0, 1.0);
      c = mix(c, b, m * m * (3.0 - 2.0 * m));
      c *= 1.0 - 0.6 * sin(3.14159265 * uMix);
    } else {
      c = mix(c, b, uMix);
    }
  }
  c *= 1.0 - uFade;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  outColor = vec4(c + n * uGrain, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? 'shader');
  return sh;
}

class WebGLRenderer implements Renderer {
  readonly kind = 'webgl2' as const;
  private gl: WebGL2RenderingContext;
  private program!: WebGLProgram;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private textures = new Map<number, WebGLTexture>();
  private images = new Map<number, HTMLImageElement>();
  private lost = false;

  constructor(private canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.gl = gl;
    this.init();
    canvas.addEventListener('webglcontextlost', this.onLost);
    canvas.addEventListener('webglcontextrestored', this.onRestored);
  }

  private onLost = (e: Event) => {
    e.preventDefault();
    this.lost = true;
  };

  private onRestored = () => {
    this.lost = false;
    this.textures.clear();
    this.init();
    for (const [i, img] of this.images) this.upload(i, img);
  };

  private init() {
    const gl = this.gl;
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? 'link');
    this.program = program;
    gl.useProgram(program);
    gl.bindVertexArray(gl.createVertexArray());
    for (const name of [
      'uA', 'uB', 'uRectA', 'uRectB', 'uBlurA', 'uBlurB', 'uFocus', 'uLinear',
      'uMix', 'uKind', 'uHasB', 'uFade', 'uGrain', 'uTime',
    ]) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }
    gl.uniform1i(this.uniforms.uA, 0);
    gl.uniform1i(this.uniforms.uB, 1);
  }

  private upload(index: number, image: HTMLImageElement) {
    const gl = this.gl;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    this.textures.set(index, tex);
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
  }

  setImage(index: number, image: HTMLImageElement) {
    this.images.set(index, image);
    if (!this.lost) this.upload(index, image);
  }

  has(index: number) {
    return this.textures.has(index);
  }

  draw(s: DrawState) {
    const texA = this.textures.get(s.a.image);
    if (this.lost || !texA) return;
    const gl = this.gl;
    const u = this.uniforms;
    const texB = s.b ? this.textures.get(s.b.image) : undefined;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texA);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texB ?? texA);
    const ra = s.a.rect;
    gl.uniform4f(u.uRectA, ra.sx, ra.sy, ra.ox, ra.oy);
    const rb = s.b?.rect ?? ra;
    gl.uniform4f(u.uRectB, rb.sx, rb.sy, rb.ox, rb.oy);
    gl.uniform1f(u.uBlurA, s.a.blur);
    gl.uniform1f(u.uBlurB, s.b?.blur ?? 0);
    gl.uniform2f(u.uFocus, s.focus[0], s.focus[1]);
    gl.uniform1f(u.uLinear, s.linear);
    gl.uniform1f(u.uMix, texB ? s.mix : 0);
    gl.uniform1i(u.uKind, s.kind);
    gl.uniform1i(u.uHasB, texB ? 1 : 0);
    gl.uniform1f(u.uFade, s.fade);
    gl.uniform1f(u.uGrain, s.grain);
    gl.uniform1f(u.uTime, s.time % 97);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  dispose() {
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onRestored);
    for (const tex of this.textures.values()) this.gl.deleteTexture(tex);
    this.gl.deleteProgram(this.program);
  }
}

class Canvas2DRenderer implements Renderer {
  readonly kind = 'canvas2d' as const;
  private images = new Map<number, HTMLImageElement>();

  constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D) {}

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  setImage(index: number, image: HTMLImageElement) {
    this.images.set(index, image);
  }

  has(index: number) {
    return this.images.has(index);
  }

  private layer(index: number, r: Rect) {
    const img = this.images.get(index);
    if (!img) return false;
    const { naturalWidth: w, naturalHeight: h } = img;
    this.ctx.drawImage(img, r.ox * w, r.oy * h, r.sx * w, r.sy * h, 0, 0, this.canvas.width, this.canvas.height);
    return true;
  }

  draw(s: DrawState) {
    const { ctx, canvas } = this;
    ctx.globalAlpha = 1;
    if (!this.layer(s.a.image, s.a.rect)) return;
    if (s.b && this.images.has(s.b.image) && s.mix > 0) {
      ctx.globalAlpha = s.mix;
      this.layer(s.b.image, s.b.rect);
      ctx.globalAlpha = 1;
    }
    const dip = s.b && s.kind === KIND_CODE.cut ? 0.6 * Math.sin(Math.PI * s.mix) : 0;
    const dark = 1 - (1 - dip) * (1 - s.fade);
    if (dark > 0) {
      ctx.fillStyle = `rgba(0,0,0,${dark})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  dispose() {
    this.images.clear();
  }
}

export function createRenderer(canvas: HTMLCanvasElement): Renderer {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
  if (gl) {
    try {
      return new WebGLRenderer(canvas, gl);
    } catch (err) {
      console.warn('WebGL2 indisponível, usando Canvas2D', err);
    }
  }
  return new Canvas2DRenderer(canvas, canvas.getContext('2d', { alpha: false })!);
}
