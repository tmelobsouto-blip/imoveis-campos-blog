# Porto 6 Suítes (nome provisório) — Porto de Galinhas, PE

**Status:** 3 mockups prontos para o usuário escolher a direção. Depois: site final, proposta (falta um
valor de estadia com datas), fotos originais sem marca d'água e confirmar com o anunciante os pontos
marcados em `dados.md`.

- Fonte das informações: anúncio #126200 no TemporadaLivre (anunciante: Luis Calado). É só a fonte: o nome
  da plataforma não aparece nos mockups.
- Fatos usados nos textos: [dados.md](dados.md)

## Links publicados (Artifacts claude.ai)

Republicar sempre com o `url` abaixo. Mockups em HTML: `root = clientes/porto-6-suites` e `files` = as fotos
que a página usa. Mockup React: `root = clientes/porto-6-suites/mockup-placas/dist` e `files` = `app.js`,
`app.css` e `dist/fotos/`.

| Arquivo | Artifact | Observação |
|---|---|---|
| `mockup-placas/` (`npm --prefix clientes/porto-6-suites/mockup-placas run build`) | https://claude.ai/artifact/K7rTYKmJeCZcpCxTnURmXb | Placas e pastilha · "Casa 6 Suítes" · React + shadcn/ui |
| `mockup-cinema.html` | https://claude.ai/artifact/KPDPNvxnZxApSqPCiUEavM | Cinematográfico · "Casa em Porto de Galinhas" |
| `mockup-tropical.html` | https://claude.ai/artifact/8DWrYG2sXYPdQLgf1FHHyn | Tropical artesanal · "Casa de Praia PG" |

Privados até o usuário compartilhar pelo menu Share.

## Decisões
- Nome: genérico, um por mockup (pedido do usuário). O nome final depende do proprietário.
- Marca d'água: capa e fotos de destaque usam recortes sem a marca (faixas acima/abaixo dela ou blocos
  laterais, ver `fonte/recorte.json`); a galeria completa mostra as 15 fotos inteiras, com a marca.
- Três direções, todas com reserva direta pelo WhatsApp (`wa.me/?text=` sem número):
  1. **Placas e pastilha**: suítes como placas de porta (como as das fotos), azul da pastilha da piscina,
     calendário de período, carrossel e drawer do shadcn/ui.
  2. **Cinematográfico**: cenas em tela cheia no celular e em quadro panorâmico com tarjas no computador,
     ficha técnica, elenco de suítes e ingresso de reserva.
  3. **Tropical artesanal**: verde de coqueiro, barro das argolas da varanda (uma argola balança na capa),
     fotos com moldura em arco, um dia na casa em fotos grandes.
- Público: grupos e famílias grandes (21 pessoas, festas permitidas, aceita animais).
- Sem avaliações (o anúncio não tem nenhuma) e sem preço. Só português.

## Fotos
As 15 fotos da galeria do anúncio, de prints do tablet (1300 × 746 úteis), com a marca d'água da plataforma
no centro. Remover a marca seria retoque: pedir as originais ao fechar o pacote. Os recortes com letra
(`01a`, `02b`, `14a`…) ficam fora da marca; `11a`, `12a` e `13a` são quadros das colagens das suítes. Prints
do texto do anúncio em `fonte/anuncio/`.
