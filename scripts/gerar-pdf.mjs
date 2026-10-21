// Gera o PDF A4 de uma página (ex.: proposta.html) com o mesmo visual da versão web.
// Uso: npm run pdf -- clientes/<cliente>/proposta.html clientes/<cliente>/Proposta-<Nome>.pdf
import { readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launchChromium, wrapPage } from './_pagina.mjs';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.error('Uso: npm run pdf -- <pagina.html> <saida.pdf>');
  process.exit(1);
}
const src = resolve(input);
// Arquivo temporário na mesma pasta para que caminhos relativos (fotos/, img/) funcionem.
const tmp = join(dirname(src), `.pdf-${basename(src)}`);
await writeFile(tmp, wrapPage(await readFile(src, 'utf8')));

const browser = await launchChromium();
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (const img of document.images) img.loading = 'eager';
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: resolve(output),
    format: 'A4',
    printBackground: true,
    scale: 0.68,
    margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' },
  });
  console.log(`PDF gerado: ${output}`);
} finally {
  await browser.close();
  await rm(tmp, { force: true });
}
