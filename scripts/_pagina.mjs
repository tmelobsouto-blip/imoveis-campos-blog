// Esqueleto que o Artifact (claude.ai) adiciona ao publicar; usado para visualizar e gerar PDF localmente.
export function wrapPage(body) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">` +
    `<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}` +
    `body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]{display:none!important}</style>` +
    `</head><body>${body}</body></html>`;
}

export async function launchChromium() {
  const { chromium } = await import('playwright-core');
  const { existsSync } = await import('node:fs');
  const candidates = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium'].filter(Boolean);
  const executablePath = candidates.find((p) => existsSync(p));
  return chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });
}
