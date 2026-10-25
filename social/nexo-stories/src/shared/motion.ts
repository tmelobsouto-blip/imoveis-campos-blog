import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { ACT2_COUNTDOWN_FRAMES, ACT2_COUNTDOWN_START, ACT2_REVEAL, FPS } from '../timeline';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export const ramp = (frame: number, from: number, to: number) => interpolate(frame, [from, to], [0, 1], clamp);

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const useSpring = (start: number, damping = 200, mass = 1) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - start, fps, config: { damping, mass } });
};

export const useCountdown = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const remaining = 1 - ramp(frame, ACT2_COUNTDOWN_START, ACT2_REVEAL);
  const seconds = Math.max(1, Math.ceil((remaining * ACT2_COUNTDOWN_FRAMES) / FPS));
  const urgent = ramp(frame, ACT2_REVEAL - 3 * FPS, ACT2_REVEAL - 3 * FPS + 10);
  const isRevealed = frame >= ACT2_REVEAL;
  const revealed = isRevealed ? spring({ frame: frame - ACT2_REVEAL, fps, config: { damping: 14 } }) : 0;
  const burst = ramp(frame, ACT2_REVEAL, ACT2_REVEAL + 22);
  const tick = isRevealed ? 0 : ((frame - ACT2_COUNTDOWN_START) % FPS) / FPS;
  return { frame, remaining, seconds, urgent, isRevealed, revealed, burst, tick };
};

export const useCountUp = (value: number, start: number, duration = 30) => {
  const frame = useCurrentFrame();
  return Math.round(easeOut(ramp(frame, start, start + duration)) * value);
};

export const useActProgress = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return frame / durationInFrames;
};

export const typed = (text: string, frame: number, start: number, charsPerFrame: number) =>
  text.slice(0, Math.max(0, Math.floor((frame - start) * charsPerFrame)));
