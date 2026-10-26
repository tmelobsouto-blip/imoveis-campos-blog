import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

type Face = [family: string, file: string, weight: string, style?: 'normal' | 'italic'];

const weights = (family: string, slug: string, list: number[], style: 'normal' | 'italic' = 'normal'): Face[] =>
  list.map((w) => [family, `${slug}-latin-${w}-${style}`, String(w), style]);

const faces: Face[] = [
  ...weights('Inter', 'inter', [400, 500, 600, 700, 800, 900]),
  ...weights('Inter Tight', 'inter-tight', [700, 800, 900]),
  ...weights('JetBrains Mono', 'jetbrains-mono', [400, 500, 700]),
  ...weights('Fraunces', 'fraunces', [400, 500, 600, 700, 800, 900]),
  ...weights('Fraunces', 'fraunces', [500, 600, 700, 800], 'italic'),
  ...weights('Archivo Black', 'archivo-black', [400]),
  ...weights('Space Grotesk', 'space-grotesk', [400, 500, 700]),
  ...weights('VT323', 'vt323', [400]),
  ...weights('Plus Jakarta Sans', 'plus-jakarta-sans', [400, 500, 600, 700, 800]),
  ...weights('Source Serif 4', 'source-serif-4', [400, 500, 600, 700]),
  ...weights('Noto Sans Mono', 'noto-sans-mono', [400, 500, 600, 700]),
];

export const loadFonts = () =>
  Promise.all(
    faces.map(([family, file, weight, style = 'normal']) =>
      loadFont({ family, url: staticFile(`fonts/${file}.woff2`), weight, style }),
    ),
  );
