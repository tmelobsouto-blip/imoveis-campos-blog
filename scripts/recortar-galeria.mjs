// Recorta a foto de cada captura de tela da galeria (Airbnb etc.) e gera WebP + miniatura.
// Uso: npm run fotos -- clientes/<cliente>/fonte clientes/<cliente>/fotos
// Galerias sem moldura branca (ex.: TemporadaLivre) usam fonte/recorte.json:
//   { "caixa": { left, top, width, height },             mesma caixa para todos os prints
//     "caixas": { "<id>": { left, top, width, height } },  caixa própria de um print (ex.: aviso por cima)
//     "extras": { "<id>": [{ id, left, top, width, height }] } }   recortes a mais de um print
import { mkdir, readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, basename } from 'node:path';
import sharp from 'sharp';

const [src, out] = process.argv.slice(2);
if (!src || !out) {
  console.error('Uso: npm run fotos -- <pasta-fonte> <pasta-fotos>');
  process.exit(1);
}

const WHITE = 245;

// Localiza a moldura da foto: linhas/colunas onde a maior parte dos pixels não é branca.
// Ignora 10% do topo e da base (barra de status e de navegação do celular).
async function findFrame(file) {
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const dark = (x, y) => data[y * w + x] < WHITE;
  const x0 = Math.floor(w * 0.3);
  const x1 = Math.floor(w * 0.7);
  const rows = [];
  for (let y = Math.floor(h * 0.1); y < Math.floor(h * 0.9); y++) {
    let n = 0;
    for (let x = x0; x < x1; x++) if (dark(x, y)) n++;
    if (n / (x1 - x0) > 0.5) rows.push(y);
  }
  if (rows.length < h * 0.15) return null;
  const top = rows[0];
  const bottom = rows.at(-1);
  const band = [top + Math.floor((bottom - top) * 0.15), bottom - Math.floor((bottom - top) * 0.15)];
  const cols = [];
  for (let x = 0; x < w; x++) {
    let n = 0;
    for (let y = band[0]; y < band[1]; y++) if (dark(x, y)) n++;
    if (n / (band[1] - band[0]) > 0.5) cols.push(x);
  }
  const left = cols[0];
  const right = cols.at(-1);
  // Quase a imagem inteira = já é uma foto limpa, sem moldura.
  if ((right - left) * (bottom - top) > w * h * 0.85) return null;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

// Prints de tablet passam de 2000 px; 1600 basta para a capa no desktop e alivia a página.
async function save(img, id, note = '') {
  await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 92, smartSubsample: true }).toFile(join(out, `${id}.webp`));
  await img.clone().resize({ width: 240 }).webp({ quality: 70 }).toFile(join(out, `${id}-thumb.webp`));
  const meta = await sharp(join(out, `${id}.webp`)).metadata();
  console.log(`${id}: ${meta.width}×${meta.height}${note}`);
}

await mkdir(out, { recursive: true });
const files = (await readdir(src)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
const config = existsSync(join(src, 'recorte.json'))
  ? JSON.parse(await readFile(join(src, 'recorte.json'), 'utf8'))
  : {};

for (const f of files) {
  const file = join(src, f);
  const id = basename(f, extname(f));
  for (const { id: extra, ...box } of config.extras?.[id] ?? []) {
    await save(sharp(file).extract(box), extra);
  }
  const box = config.caixas?.[id] ?? config.caixa;
  if (box) {
    await save(sharp(file).extract(box), id);
    continue;
  }
  const frame = await findFrame(file);
  let img = sharp(file);
  if (frame) {
    // Cantos arredondados: recuar ~3% da largura mantém todo pixel dentro da foto.
    const inset = Math.round(frame.width * 0.029);
    img = img.extract({
      left: frame.left + inset,
      top: frame.top + inset,
      width: frame.width - inset * 2,
      height: frame.height - inset * 2,
    });
  }
  await save(img, id, frame ? '' : ' (sem moldura)');
}
