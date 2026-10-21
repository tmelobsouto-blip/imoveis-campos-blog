// Abre cada página da pasta no celular e no desktop: aponta erros de console, rolagem lateral e salva capturas.
// Uso: npm run check -- clientes/<cliente>   (capturas em clientes/<cliente>/.screens/)
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launchChromium, wrapPage } from './_pagina.mjs';

const dir = resolve(process.argv[2] ?? '.');
const shots = join(dir, '.screens');
await mkdir(shots, { recursive: true });
const pages = (await readdir(dir)).filter((f) => f.endsWith('.html') && !f.startsWith('.'));
const VIEWPORTS = { mobile: { width: 390, height: 844, isMobile: true }, desktop: { width: 1440, height: 900, isMobile: false } };

const browser = await launchChromium();
let problems = 0;
for (const name of pages) {
  const tmp = join(dir, `.check-${name}`);
  await writeFile(tmp, wrapPage(await readFile(join(dir, name), 'utf8')));
  for (const [label, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.isMobile, locale: 'pt-BR' });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && !/favicon/.test(m.text()) && errors.push(m.text()));
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    await page.screenshot({ path: join(shots, `${name.replace('.html', '')}-${label}.png`) });
    const ok = overflow <= 0 && errors.length === 0;
    if (!ok) problems++;
    console.log(`${ok ? 'ok ' : 'ERRO'} ${name} [${label}]${overflow > 0 ? ` rolagem lateral ${overflow}px` : ''}${errors.length ? ` ${errors.join(' | ')}` : ''}`);
    await ctx.close();
  }
  await rm(tmp, { force: true });
}
await browser.close();
process.exit(problems ? 1 : 0);
