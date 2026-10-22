// Captura as telas do site usadas na proposta (capa no desktop e no celular + seções no celular).
// Uso: npm run telas -- clientes/<cliente>/site.html clientes/<cliente>/img
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { launchChromium, wrapPage } from './_pagina.mjs';

const [input, outDir] = process.argv.slice(2);
if (!input || !outDir) {
  console.error('Uso: npm run telas -- <site.html> <pasta-img>');
  process.exit(1);
}
const src = resolve(input);
const tmp = join(dirname(src), `.check-${basename(src)}`);
await writeFile(tmp, wrapPage(await readFile(src, 'utf8')));
await mkdir(outDir, { recursive: true });

// Seções procuradas pelo id; as que não existirem na página são ignoradas.
const SECTIONS = { intro: '#a-casa, #galeria', quartos: '#quartos, #suites-secao', lazer: '#lazer-secao', reserva: '#reservar' };
const SETUPS = [
  { tag: 'desk', viewport: { width: 1440, height: 900 }, dpr: 1, size: [1200, 750], sections: ['intro', 'quartos'] },
  { tag: 'mob', viewport: { width: 390, height: 844 }, dpr: 2, size: [390, 844], sections: ['intro', 'quartos', 'lazer', 'reserva'], mobile: true },
];

const browser = await launchChromium();
try {
  for (const s of SETUPS) {
    const ctx = await browser.newContext({ viewport: s.viewport, deviceScaleFactor: s.dpr, isMobile: !!s.mobile, hasTouch: !!s.mobile, locale: 'pt-BR' });
    const page = await ctx.newPage();
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await page.waitForTimeout(9500); // deixa a animação de abertura terminar
    const save = async (name) => {
      const png = await page.screenshot();
      await sharp(png).resize(...s.size).jpeg({ quality: 84, mozjpeg: true }).toFile(join(outDir, `${s.tag}-${name}.jpg`));
      console.log(`${s.tag}-${name}.jpg`);
    };
    await save('cover');
    for (const name of s.sections) {
      const found = await page.evaluate((sel) => { const el = document.querySelector(sel); el?.scrollIntoView(); return !!el; }, SECTIONS[name]);
      if (!found) continue;
      await page.waitForTimeout(1200);
      await save(name);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  await rm(tmp, { force: true });
}
