# Casa das Praias — Porto de Galinhas, PE

**Status:** site pronto (versão de apresentação). Falta: valor de uma estadia com datas para a proposta,
fotos originais sem marca d'água e confirmar com o anunciante os pontos marcados em `dados.md`.

- Anúncio: TemporadaLivre #126200, "Linda casa em Porto de Galinhas" (anunciante: Luis Calado)
- Fatos usados nos textos: [dados.md](dados.md)

## Links publicados (Artifacts claude.ai)

Republicar sempre com o `url` abaixo, `root = clientes/casa-das-praias/site/dist` e `files` = `app.js`,
`app.css` e as fotos de `dist/fotos/`.

| Arquivo | Artifact | Observação |
|---|---|---|
| `site/dist/` (`npm --prefix clientes/casa-das-praias/site run build`) | https://claude.ai/artifact/K7rTYKmJeCZcpCxTnURmXb | site final, React + shadcn/ui |

Privado até o usuário compartilhar pelo menu Share.

## Decisões
- Mesmo processo e mesma base do site-v2 da Casa Dez (React 19 + Tailwind 4 + shadcn/ui): calendário de
  período na capa, carrossel com categorias e miniaturas, consulta em Drawer (celular) ou Dialog (desktop)
  com mensagem pronta para o WhatsApp (`wa.me/?text=` sem número).
- Nome de marca: **Casa das Praias** (sugestão nossa; depende da aprovação do proprietário). Vem das placas
  nas portas das suítes: Praia do Cupe, Praia de Serrambi, Maracaípe, Porto de Galinhas.
- Visual: parede branca, azul-marinho das placas e cobalto da pastilha da piscina. As suítes aparecem como
  placas de porta; a ficha (21 · 6 · 8 · 2ª quadra) fica sobre uma grade de pastilha.
- Público: grupos e famílias grandes (21 pessoas, festas permitidas, aceita animais).
- Sem seção de avaliações (o anúncio não tem nenhuma) e sem preço.
- Só português.

## Fotos
As 15 fotos da galeria do anúncio, de prints do tablet (1300 × 746 úteis), com a marca d'água do
TemporadaLivre no centro. Remover a marca seria retoque: pedir as originais ao fechar o pacote.
`fonte/recorte.json` guarda a caixa de recorte (moldura escura, barra "n/15" e setas) e os recortes extras das
colagens das suítes (`11a`, `12a`, `13a`). Prints do texto do anúncio em `fonte/anuncio/`.
