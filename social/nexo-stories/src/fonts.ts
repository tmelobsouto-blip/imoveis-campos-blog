import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

const faces: Array<[family: string, file: string, weight: string]> = [
  ['Inter', 'inter-latin-400-normal', '400'],
  ['Inter', 'inter-latin-500-normal', '500'],
  ['Inter', 'inter-latin-600-normal', '600'],
  ['Inter', 'inter-latin-700-normal', '700'],
  ['Inter', 'inter-latin-800-normal', '800'],
  ['Inter Tight', 'inter-tight-latin-700-normal', '700'],
  ['Inter Tight', 'inter-tight-latin-800-normal', '800'],
  ['Inter Tight', 'inter-tight-latin-900-normal', '900'],
  ['JetBrains Mono', 'jetbrains-mono-latin-400-normal', '400'],
  ['JetBrains Mono', 'jetbrains-mono-latin-500-normal', '500'],
  ['JetBrains Mono', 'jetbrains-mono-latin-700-normal', '700'],
];

export const loadFonts = () =>
  Promise.all(
    faces.map(([family, file, weight]) =>
      loadFont({ family, url: staticFile(`fonts/${file}.woff2`), weight }),
    ),
  );
