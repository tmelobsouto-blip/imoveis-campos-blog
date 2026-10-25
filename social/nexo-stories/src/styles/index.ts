import { BrutalistStory } from './brutalist';
import { ChatStory } from './chat';
import { EditorialStory } from './editorial';
import { GlassStory } from './glass';
import { TerminalStory } from './terminal';

export const STYLES = [
  { id: 'S1-Editorial', component: EditorialStory },
  { id: 'S2-Brutalista', component: BrutalistStory },
  { id: 'S3-Terminal', component: TerminalStory },
  { id: 'S4-Glass', component: GlassStory },
  { id: 'S5-Chat', component: ChatStory },
];
