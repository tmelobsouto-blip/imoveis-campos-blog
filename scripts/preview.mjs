// Servidor local que mostra as páginas como o Artifact publica (com o esqueleto HTML).
// Uso: npm run preview -- clientes/<cliente>   →  http://localhost:4321/site.html
import { createServer } from 'node:http';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { wrapPage } from './_pagina.mjs';

const root = resolve(process.argv[2] ?? '.');
const port = Number(process.env.PORT ?? 4321);
const TYPES = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.css': 'text/css', '.js': 'text/javascript' };

createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = join(root, path);
  try {
    if (path === '/' || path === '\\') {
      const pages = (await readdir(root)).filter((f) => f.endsWith('.html'));
      res.writeHead(200, { 'content-type': TYPES['.html'] });
      res.end(wrapPage(`<ul style="font:16px system-ui;padding:24px">${pages.map((p) => `<li><a href="/${p}">${p}</a></li>`).join('')}</ul>`));
      return;
    }
    const data = await readFile(file);
    const type = TYPES[extname(file)] ?? 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end(type.startsWith('text/html') ? wrapPage(data.toString()) : data);
  } catch {
    res.writeHead(404).end('não encontrado');
  }
}).listen(port, () => console.log(`Preview de ${root} em http://localhost:${port}/`));
