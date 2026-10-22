// Monta o site estático da NEXO em dist/ para publicar com endereço próprio (Netlify, Cloudflare Pages).
// Uso: npm run build:web
//   /                      web/index.html (página da NEXO)
//   /<cliente>/            site.html, ou o build do site React em site/ (app.js + app.css)
//   /<cliente>/proposta/   proposta.html
//   /<cliente>/mockup-x/   mockup-x.html (menos os marcados como "descartado" no README do cliente)
// Links claude.ai/artifact listados no README do cliente viram caminhos do próprio domínio.
import { execSync } from 'node:child_process';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'dist';
const HEAD_TAG = /^\s*(<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/i;

// As páginas são escritas no formato do Artifact (sem <head>); aqui viram documentos completos.
function toDocument(source, { noindex }) {
  let body = source;
  const head = [];
  for (let m = body.match(HEAD_TAG); m; m = body.match(HEAD_TAG)) {
    head.push(m[1]);
    body = body.slice(m[0].length);
  }
  return [
    '<!doctype html>',
    '<html lang="pt-BR">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
    noindex ? '<meta name="robots" content="noindex">' : '',
    '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
    ...head,
    '<style>:root{padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>',
    '</head>',
    '<body>',
    body.trim(),
    '</body>',
    '</html>',
    '',
  ].filter((line) => line !== '').join('\n');
}

function artifactLinks(readme, slug) {
  const links = new Map();
  for (const [, file, url] of readme.matchAll(/\|\s*`([\w-]+\.html)`\s*\|\s*(https:\/\/claude\.ai\/artifact\/\w+)/g)) {
    links.set(url, pagePath(slug, file));
  }
  // Linha do site React na tabela: | `site/` ou `site/dist/` (...) | https://claude.ai/artifact/... |
  for (const [, url] of readme.matchAll(/\|\s*`site\/(?:dist\/)?`[^|]*\|\s*(https:\/\/claude\.ai\/artifact\/\w+)/g)) {
    links.set(url, `/${slug}/`);
  }
  return links;
}

function discarded(readme) {
  return new Set([...readme.matchAll(/\|\s*`([\w-]+\.html)`\s*\|[^|]*\|[^|\n]*descartad/gi)].map((m) => m[1]));
}

// Na nuvem (Netlify) só a raiz tem npm install: o site React instala as próprias dependências antes do build.
function buildReactSite(app) {
  if (!existsSync(join(app, 'node_modules'))) execSync(`npm ci --prefix ${app} --no-audit --no-fund`, { stdio: 'inherit' });
  execSync(`npm --prefix ${app} run build`, { stdio: 'inherit' });
  return join(app, 'dist');
}

function pagePath(slug, file) {
  if (file === 'site.html') return `/${slug}/`;
  return `/${slug}/${file.replace(/\.html$/, '')}/`;
}

async function writePage(path, html) {
  const dir = join(OUT, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), html);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const file of await readdir('web')) {
  const src = await readFile(join('web', file), 'utf8');
  await writeFile(join(OUT, file), file.endsWith('.html') ? toDocument(src, { noindex: file === '404.html' }) : src);
}

for (const slug of await readdir('clientes')) {
  const dir = join('clientes', slug);
  const reactApp = !existsSync(join(dir, 'site.html')) && existsSync(join(dir, 'site', 'package.json')) ? join(dir, 'site') : null;
  if (!existsSync(join(dir, 'site.html')) && !reactApp) continue;
  const readme = existsSync(join(dir, 'README.md')) ? await readFile(join(dir, 'README.md'), 'utf8') : '';
  const links = artifactLinks(readme, slug);
  const skip = discarded(readme);

  for (const asset of ['fotos', 'img']) {
    if (existsSync(join(dir, asset))) await cp(join(dir, asset), join(OUT, slug, asset), { recursive: true });
  }
  for (const f of await readdir(dir)) {
    if (f.endsWith('.pdf')) await cp(join(dir, f), join(OUT, slug, f));
  }

  if (reactApp) {
    const built = buildReactSite(reactApp);
    await cp(built, join(OUT, slug), { recursive: true, filter: (src) => !src.endsWith('index.html') });
    await writePage(`/${slug}/`, toDocument(await readFile(join(built, 'index.html'), 'utf8'), { noindex: true }));
    console.log(`/${slug}/  ←  ${built}/`);
  }

  const pages = (await readdir(dir)).filter((f) => f.endsWith('.html') && !skip.has(f));
  for (const file of pages) {
    let html = await readFile(join(dir, file), 'utf8');
    for (const [url, path] of links) html = html.replaceAll(url, path);
    if (file !== 'site.html') html = html.replace(/(["'`(])(fotos|img)\//g, '$1../$2/');
    // Páginas de demonstração ficam fora do Google até o proprietário aprovar.
    await writePage(pagePath(slug, file), toDocument(html, { noindex: true }));
    console.log(`${pagePath(slug, file)}  ←  ${dir}/${file}`);
  }
}
console.log(`pronto: ${OUT}/`);
