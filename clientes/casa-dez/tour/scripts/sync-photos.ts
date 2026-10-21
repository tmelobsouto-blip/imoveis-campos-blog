import { cp, mkdir } from 'node:fs/promises';

// Canonical photos live in the client folder (clientes/<cliente>/fotos); the app serves a copy.
const from = new URL('../../fotos/', import.meta.url).pathname;
const to = new URL('../public/photos/', import.meta.url).pathname;

await mkdir(to, { recursive: true });
await cp(from, to, { recursive: true });
console.log(`fotos sincronizadas → ${to}`);
