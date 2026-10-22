// Gera dist/<estilo>/ no formato do Artifact (sem <head>): index.html + app.js + app.css + fotos usadas.
// Uso: node scripts/build.mjs [noite azulejo rede]   (sem argumentos, todos os estilos com src/<estilo>/main.tsx)
import { existsSync } from "node:fs"
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import tailwind from "@tailwindcss/postcss"
import { build } from "esbuild"
import postcss from "postcss"

const root = new URL("..", import.meta.url).pathname
const fotos = join(root, "..", "fotos")

const STYLES = {
  noite: {
    theme: "#0a0f24",
    fonts: "family=Cormorant+Garamond:ital,wght@0,300..600;1,300..600&family=Sora:wght@300..600",
  },
  azulejo: {
    theme: "#f6f1e7",
    fonts: "family=Gloock&family=Albert+Sans:ital,wght@0,400..700;1,400..700",
  },
  rede: {
    theme: "#f4ead9",
    fonts: "family=Marcellus&family=Outfit:wght@300..600",
  },
}
const DESCRIPTION =
  "Bangalô com 5 suítes para 10 pessoas, piscina privativa e empregada todos os dias, de frente para o mar no condomínio Malawi, em Muro Alto, Porto de Galinhas. Reserva direta pelo WhatsApp."

const asked = process.argv.slice(2)
const styles = (asked.length ? asked : Object.keys(STYLES)).filter((s) => existsSync(join(root, "src", s, "main.tsx")))

for (const style of styles) {
  const src = join(root, "src", style)
  const out = join(root, "dist", style)
  await rm(out, { recursive: true, force: true })
  await mkdir(join(out, "fotos"), { recursive: true })

  await build({
    entryPoints: [join(src, "main.tsx")],
    outfile: join(out, "app.js"),
    bundle: true,
    minify: true,
    format: "iife",
    target: "es2020",
    jsx: "automatic",
    legalComments: "none",
    define: { "process.env.NODE_ENV": '"production"' },
  })

  const cssFile = join(src, "index.css")
  const css = await postcss([tailwind({ base: root, optimize: true })]).process(await readFile(cssFile, "utf8"), { from: cssFile })
  await writeFile(join(out, "app.css"), css.css)

  // Copia só as fotos citadas no código comum e no do estilo.
  const files = [join(root, "src/shared/data.ts"), ...(await readdir(src)).filter((f) => f.endsWith(".tsx")).map((f) => join(src, f))]
  const code = (await Promise.all(files.map((f) => readFile(f, "utf8")))).join("\n")
  const used = new Set([...code.matchAll(/"(\d{2}[a-z]?-[a-z0-9-]+)"/g)].map((m) => m[1]))
  for (const id of used) {
    await copyFile(join(fotos, `${id}.webp`), join(out, "fotos", `${id}.webp`))
    await copyFile(join(fotos, `${id}-thumb.webp`), join(out, "fotos", `${id}-thumb.webp`))
  }

  const { theme, fonts } = STYLES[style]
  await writeFile(
    join(out, "index.html"),
    `<title>Bangalô Muro Alto</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${DESCRIPTION}">
<meta name="theme-color" content="${theme}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">
<link rel="stylesheet" href="app.css">
<div id="root"></div>
<script src="app.js" defer></script>
`,
  )
  console.log(`dist/${style} pronto: ${used.size} fotos`)
}
