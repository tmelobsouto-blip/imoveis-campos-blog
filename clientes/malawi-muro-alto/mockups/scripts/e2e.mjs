// Teste de navegador dos mockups: abre dist/<estilo>/index.html com o esqueleto do Artifact no celular e no
// computador e confere fatos, galeria, reserva e menu. Uso: node scripts/e2e.mjs noite azulejo rede
import { readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { pathToFileURL } from "node:url"
import { launchChromium, wrapPage } from "../../../../scripts/_pagina.mjs"

const root = new URL("..", import.meta.url).pathname
const styles = process.argv.slice(2)
const VIEWPORTS = {
  celular: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  computador: { viewport: { width: 1440, height: 900 } },
}

let failures = 0
function check(ok, label) {
  if (!ok) failures++
  console.log(`${ok ? "ok  " : "ERRO"} ${label}`)
}

const browser = await launchChromium()
for (const style of styles) {
  const dir = join(root, "dist", style)
  const tmp = join(dir, ".e2e.html")
  await writeFile(tmp, wrapPage(await readFile(join(dir, "index.html"), "utf8")))
  const url = pathToFileURL(tmp).href

  for (const [label, options] of Object.entries(VIEWPORTS)) {
    const tag = `${style} [${label}]`
    const ctx = await browser.newContext({ ...options, locale: "pt-BR" })
    const page = await ctx.newPage()
    const errors = []
    page.on("pageerror", (e) => errors.push(e.message))
    page.on("console", (m) => m.type() === "error" && !/favicon|fonts\.g/.test(m.text()) && errors.push(m.text()))
    await page.goto(url, { waitUntil: "load" })
    await page.waitForTimeout(1500)

    const overflow = await page.evaluate((w) => Math.max(document.documentElement.scrollWidth, innerWidth) - w, options.viewport.width)
    check(overflow <= 0, `${tag} sem rolagem lateral (${overflow}px)`)
    check((await page.title()) === "Bangalô Muro Alto", `${tag} título`)
    const text = await page.locator("body").innerText()
    check(/5 suítes/.test(text) && /10 pessoas/.test(text) && /Muro Alto/.test(text), `${tag} fatos: 5 suítes, 10 pessoas, Muro Alto`)
    const html = await page.content()
    check(!/98176|2641|Krauthamer|kraut_temporada|TemporadaLivre/i.test(html), `${tag} sem dados do anunciante nem da plataforma`)

    // Galeria: abre na foto clicada e passa com a seta.
    await page.locator("[data-gallery-item]:visible").first().click()
    const caption = page.locator("[data-viewer-caption]")
    await caption.waitFor()
    check(/1 de \d+$/.test((await caption.innerText()).trim()), `${tag} galeria abre na foto 1`)
    await page.keyboard.press("ArrowRight")
    await page.waitForTimeout(400)
    check(/2 de \d+$/.test((await caption.innerText()).trim()), `${tag} galeria passa para a foto 2`)
    await page.keyboard.press("Escape")
    await caption.waitFor({ state: "detached" })

    // Reserva: trava em 10 hóspedes e monta o link do WhatsApp sem número.
    await page.locator("[data-booking-open]:visible").first().click()
    const dialog = page.getByRole("dialog")
    const plus = dialog.getByRole("button", { name: "Mais um hóspede" })
    for (let i = 0; i < 15 && (await plus.isEnabled()); i++) await plus.click()
    check(await plus.isDisabled(), `${tag} "+" desativa em 10`)
    const wa = dialog.locator('a[href^="https://wa.me/"]')
    const href = (await wa.getAttribute("href")) ?? ""
    check(href.startsWith("https://wa.me/?text=") && decodeURIComponent(href).includes("10 hóspedes"), `${tag} link do WhatsApp com 10 hóspedes`)
    // Tocar de novo na entrada desfaz a saída: sem período completo, sem link e com aviso.
    await dialog.locator('button[data-range-start="true"]').first().click()
    check((await wa.count()) === 0 && (await dialog.getByText("Escolha a entrada e a saída").isVisible()), `${tag} sem saída: sem link e com aviso`)
    await page.keyboard.press("Escape")
    await dialog.waitFor({ state: "detached" })

    if (label === "celular") {
      await page.getByRole("button", { name: "Abrir menu" }).click()
      const menu = page.getByRole("dialog")
      check(await menu.getByRole("button", { name: "Reservar" }).isVisible(), `${tag} menu mostra "Reservar"`)
      await menu.getByRole("button", { name: "Fotos" }).click()
      await menu.waitFor({ state: "detached", timeout: 3000 }).catch(() => {})
      check((await page.getByRole("dialog").count()) === 0, `${tag} menu fecha ao tocar num item`)
    }

    check(errors.length === 0, `${tag} sem erros no console${errors.length ? `: ${errors.join(" | ")}` : ""}`)
    await ctx.close()
  }
  await rm(tmp, { force: true })
}
await browser.close()
console.log(failures ? `${failures} falha(s)` : "tudo ok")
process.exit(failures ? 1 : 0)
