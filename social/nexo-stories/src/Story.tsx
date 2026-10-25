import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Act1Intro } from './acts/Act1Intro';
import { Act2Challenge } from './acts/Act2Challenge';
import { Act3Outro } from './acts/Act3Outro';
import { InstagramChrome } from './components/InstagramChrome';
import { ACT1, ACT2, ACT3 } from './timeline';

export type StoryProps = { showInstagramUI: boolean };

export const Story: React.FC<StoryProps> = ({ showInstagramUI }) => (
  <AbsoluteFill style={{ backgroundColor: '#0A100D' }}>
    <Sequence from={ACT1.from} durationInFrames={ACT1.duration} name="Ato 1 · Intro">
      <Act1Intro />
    </Sequence>
    <Sequence from={ACT2.from} durationInFrames={ACT2.duration} name="Ato 2 · Desafio 10s + Gabarito">
      <Act2Challenge />
    </Sequence>
    <Sequence from={ACT3.from} durationInFrames={ACT3.duration} name="Ato 3 · Outro 3D + CTA">
      <Act3Outro />
    </Sequence>
    {showInstagramUI && <InstagramChrome />}
  </AbsoluteFill>
);
