import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import tailwind from '@tailwindcss/postcss';
import { build } from 'esbuild';
import postcss from 'postcss';

// Same app as the Next.js export, bundled as plain files with relative paths so it can be
// published as a claude.ai Artifact (no server, no /_next/ absolute URLs).
const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'artifact-dist');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

await build({
  entryPoints: [join(root, 'artifact/main.tsx')],
  outfile: join(out, 'app.js'),
  bundle: true,
  minify: true,
  format: 'iife',
  target: 'es2020',
  jsx: 'automatic',
  legalComments: 'none',
  tsconfig: join(root, 'tsconfig.json'),
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.NEXT_PUBLIC_LISTING_URL': JSON.stringify(process.env.NEXT_PUBLIC_LISTING_URL ?? ''),
  },
});

const cssPath = join(root, 'src/app/globals.css');
const css = await postcss([tailwind({ base: root, optimize: true })]).process(await readFile(cssPath, 'utf8'), {
  from: cssPath,
});
await writeFile(join(out, 'app.css'), css.css);
await cp(join(root, 'public/photos'), join(out, 'photos'), { recursive: true });
await cp(join(root, 'artifact/page.html'), join(out, 'index.html'));
console.log(`artifact → ${out}`);
