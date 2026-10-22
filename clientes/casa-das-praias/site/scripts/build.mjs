// Gera dist/ no formato do Artifact (sem <head>): index.html + app.js + app.css + fotos usadas.
import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import tailwind from "@tailwindcss/postcss"
import { build } from "esbuild"
import postcss from "postcss"

const root = new URL("..", import.meta.url).pathname
const out = join(root, "dist")
const fotos = join(root, "..", "fotos")

await rm(out, { recursive: true, force: true })
await mkdir(join(out, "fotos"), { recursive: true })

await build({
  entryPoints: [join(root, "src/main.tsx")],
  outfile: join(out, "app.js"),
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  jsx: "automatic",
  legalComments: "none",
  define: { "process.env.NODE_ENV": '"production"' },
})

const cssFile = join(root, "src/index.css")
const css = await postcss([tailwind({ base: root, optimize: true })]).process(await readFile(cssFile, "utf8"), { from: cssFile })
await writeFile(join(out, "app.css"), css.css)

const used = new Set()
const app = await readFile(join(root, "src/data.ts"), "utf8") + (await readFile(join(root, "src/App.tsx"), "utf8"))
for (const [, id] of app.matchAll(/"(\d{2}[a-z]?-[a-z0-9-]+)"/g)) used.add(id)
for (const id of used) {
  await copyFile(join(fotos, `${id}.webp`), join(out, "fotos", `${id}.webp`))
  await copyFile(join(fotos, `${id}-thumb.webp`), join(out, "fotos", `${id}-thumb.webp`))
}

await writeFile(
  join(out, "index.html"),
  `<title>Casa das Praias</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Casa das Praias: 6 suítes para 21 pessoas, com piscina e duas churrasqueiras, em condomínio fechado na 2ª quadra da praia em Porto de Galinhas. Reserva direta pelo WhatsApp.">
<meta name="theme-color" content="#0d1838">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Figtree:wght@400;500;600&display=swap">
<link rel="stylesheet" href="app.css">
<div id="root"></div>
<script src="app.js" defer></script>
`,
)
console.log(`dist pronto: ${used.size} fotos`)
