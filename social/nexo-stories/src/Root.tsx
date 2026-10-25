import React from 'react';
import { Composition } from 'remotion';
import { loadFonts } from './fonts';
import { Story } from './Story';
import { STYLES } from './styles';
import { LAYOUT } from './theme';
import { FPS, TOTAL_FRAMES } from './timeline';

loadFonts();

const base = { durationInFrames: TOTAL_FRAMES, fps: FPS, width: LAYOUT.width, height: LAYOUT.height };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="StoryMockup" component={Story} {...base} defaultProps={{ showInstagramUI: true }} />
    <Composition id="StoryClean" component={Story} {...base} defaultProps={{ showInstagramUI: false }} />
    {STYLES.map(({ id, component }) => (
      <React.Fragment key={id}>
        <Composition id={`${id}-Mockup`} component={component} {...base} defaultProps={{ showInstagramUI: true }} />
        <Composition id={`${id}-Clean`} component={component} {...base} defaultProps={{ showInstagramUI: false }} />
      </React.Fragment>
    ))}
  </>
);
