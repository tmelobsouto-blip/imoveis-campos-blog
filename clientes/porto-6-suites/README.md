# Casa 6 Suítes (nome sugerido; pasta `porto-6-suites`) — Porto de Galinhas, PE

**Status:** site final "Casa 6 Suítes" e proposta prontos (direção Placas e pastilha). Mensagem de envio em
[mensagens.md](mensagens.md). Falta compartilhar os links pelo menu Share, pedir as fotos originais sem marca d'água e confirmar com o anunciante os pontos
marcados em `dados.md`.

- Fonte das informações: anúncio #126200 no TemporadaLivre (anunciante: Luis Calado). É só a fonte: o nome
  da plataforma não aparece nos mockups.
- Fatos usados nos textos: [dados.md](dados.md)
- Como o site foi feito: [historico.md](historico.md)

## Links publicados (Artifacts claude.ai)

Republicar sempre com o `url` abaixo. Páginas HTML: `root = clientes/porto-6-suites` e `files` = as fotos ou
imagens que a página usa. Site React: `root = clientes/porto-6-suites/site/dist` e `files` = `app.js`,
`app.css` e `dist/fotos/`.

| Arquivo | Artifact | Observação |
|---|---|---|
| `site/` (`npm --prefix clientes/porto-6-suites/site run build`) | https://claude.ai/artifact/K7rTYKmJeCZcpCxTnURmXb | site final "Casa 6 Suítes" (era o mockup Placas e pastilha) · React + shadcn/ui |
| `proposta.html` + `Proposta-Casa-6-Suites.pdf` | https://claude.ai/artifact/6trukqhmp4BTq1L2kcavrQ | usa `img/`; telas com `npm run telas -- clientes/porto-6-suites/site/dist/index.html clientes/porto-6-suites/img` |
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
- Escolhida a direção **Placas e pastilha**, nome sugerido **Casa 6 Suítes**. No site final: foto ampliada na
  galeria, menu lateral no celular e botão para copiar a mensagem da reserva.
- Proposta com a tabela nova de `docs/precos.md` (Essencial R$ 800, Completo R$ 1.400, Premium R$ 2.200,
  manutenção R$ 79/mês). Sem a conta da taxa do Airbnb (o anúncio não é do Airbnb): no lugar, comparação do
  anúncio atual com o site, só com fatos dos prints.
- Público: grupos e famílias grandes (21 pessoas, festas permitidas, aceita animais).
- Sem avaliações (o anúncio não tem nenhuma) e sem preço. Só português.

## Fotos
As 15 fotos da galeria do anúncio, de prints do tablet (1300 × 746 úteis), com a marca d'água da plataforma
no centro. Remover a marca seria retoque: pedir as originais ao fechar o pacote. Os recortes com letra
(`01a`, `02b`, `14a`…) ficam fora da marca; `11a`, `12a` e `13a` são quadros das colagens das suítes. Prints
do texto do anúncio em `fonte/anuncio/`.
