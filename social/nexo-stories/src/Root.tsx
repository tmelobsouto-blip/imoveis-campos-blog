import React from 'react';
import { Composition } from 'remotion';
import { loadFonts } from './fonts';
import { Story } from './Story';
import { LAYOUT } from './theme';
import { FPS, TOTAL_FRAMES } from './timeline';

loadFonts();

const base = { component: Story, durationInFrames: TOTAL_FRAMES, fps: FPS, width: LAYOUT.width, height: LAYOUT.height };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StoryMockup" {...base} defaultProps={{ showInstagramUI: true }} />
    <Composition id="StoryClean" {...base} defaultProps={{ showInstagramUI: false }} />
  </>
);
