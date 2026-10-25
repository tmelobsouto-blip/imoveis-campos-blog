import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { InstagramChrome } from '../components/InstagramChrome';
import { ACT1, ACT2, ACT3 } from '../timeline';

export type StyleActs = {
  name: string;
  Act1: React.FC;
  Act2: React.FC;
  Act3: React.FC;
  base: string;
};

export const makeStory = ({ name, Act1, Act2, Act3, base }: StyleActs) => {
  const StyledStory: React.FC<{ showInstagramUI: boolean }> = ({ showInstagramUI }) => (
    <AbsoluteFill style={{ backgroundColor: base }}>
      <Sequence from={ACT1.from} durationInFrames={ACT1.duration} name={`${name} · Ato 1`}>
        <Act1 />
      </Sequence>
      <Sequence from={ACT2.from} durationInFrames={ACT2.duration} name={`${name} · Ato 2`}>
        <Act2 />
      </Sequence>
      <Sequence from={ACT3.from} durationInFrames={ACT3.duration} name={`${name} · Ato 3`}>
        <Act3 />
      </Sequence>
      {showInstagramUI && <InstagramChrome />}
    </AbsoluteFill>
  );
  return StyledStory;
};
