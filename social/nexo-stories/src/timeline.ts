export const FPS = 30;
export const WIPE = 15;

export const ACT1 = { from: 0, duration: 135 };
export const ACT2 = { from: ACT1.duration - WIPE, duration: 495 };
export const ACT3 = { from: ACT2.from + ACT2.duration - WIPE, duration: 255 };

export const ACT2_COUNTDOWN_START = 45;
export const ACT2_COUNTDOWN_FRAMES = 10 * FPS;
export const ACT2_REVEAL = ACT2_COUNTDOWN_START + ACT2_COUNTDOWN_FRAMES;

export const TOTAL_FRAMES = ACT3.from + ACT3.duration;
