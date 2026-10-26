import React from 'react';
import { Composition, Still } from 'remotion';
import { REEL_FRAMES, Reel796 } from './carousel01/Reel';
import { CAROUSEL_SLIDES } from './carousel01/Slides';
import { FEED } from './ds/feed';
import { STORY_LIST } from './ds/stories';
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
    <Composition id="Reel796-Mockup" component={Reel796} {...base} durationInFrames={REEL_FRAMES} defaultProps={{ showInstagramUI: true }} />
    <Composition id="Reel796-Clean" component={Reel796} {...base} durationInFrames={REEL_FRAMES} defaultProps={{ showInstagramUI: false }} />
    {CAROUSEL_SLIDES.map(({ id, component }) => (
      <Still key={id} id={id} component={component} width={1080} height={1350} />
    ))}
    {FEED.map(({ id, component }) => (
      <Still key={id} id={id} component={component} width={1080} height={1350} />
    ))}
    {STORY_LIST.map(({ id, component, frames }) => (
      <React.Fragment key={id}>
        <Composition id={id} component={component} {...base} durationInFrames={frames} defaultProps={{ guide: false }} />
        <Composition id={`${id}-guia`} component={component} {...base} durationInFrames={frames} defaultProps={{ guide: true }} />
      </React.Fragment>
    ))}
  </>
);
