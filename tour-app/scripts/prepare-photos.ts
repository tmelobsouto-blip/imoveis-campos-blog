import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

// Source files are 1080x2392 phone screenshots of the listing gallery.
// The photo sits in a rounded frame at x 23–1056, y 808–1583 (corner radius ≈ 90px).
// Insetting 30px keeps every output pixel inside the rounded mask: no white corners, no resampling.
const FRAME = { left: 23, top: 808, width: 1034, height: 776 };
const INSET = 30;

const SRC = new URL('../source/', import.meta.url).pathname;
const OUT = new URL('../public/photos/', import.meta.url).pathname;

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => f.endsWith('.jpg')).sort();

for (const file of files) {
  const id = file.replace(/\.jpg$/, '');
  const region = {
    left: FRAME.left + INSET,
    top: FRAME.top + INSET,
    width: FRAME.width - INSET * 2,
    height: FRAME.height - INSET * 2,
  };
  const base = sharp(join(SRC, file)).extract(region);
  await base.clone().webp({ quality: 92, smartSubsample: true }).toFile(join(OUT, `${id}.webp`));
  await base.clone().resize({ width: 240 }).webp({ quality: 70 }).toFile(join(OUT, `${id}-thumb.webp`));
  console.log(`${id}: ${region.width}x${region.height}`);
}
