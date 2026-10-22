# Casa Dez — Porto de Galinhas, PE

**Status:** proposta pronta para envio ao anfitrião (Leonardo), com os dados do Tiago Souto. Mensagens de
envio em [mensagens.md](mensagens.md). Falta compartilhar os links como públicos (menu Share).

- Anúncio: https://www.airbnb.com/l/4AhFnWmJ
- Fatos usados nos textos: [dados.md](dados.md)

## Links publicados (Artifacts claude.ai)

Republicar sempre com o `url` abaixo, `root = clientes/casa-dez` e só as fotos que a página usa.

| Arquivo | Artifact | Observação |
|---|---|---|
| `site.html` | https://claude.ai/artifact/1bxubUsoibxT8Ryf4bV7ST | site final; antes era o mockup boutique |
| `proposta.html` | https://claude.ai/artifact/WWk2trjf8wFUPzNMj28UW1 | usa `img/` |
| `mockup-tropical.html` | https://claude.ai/artifact/T6JPEejaRJAnVRHaPwTUe2 | Villa Coqueiral |
| `mockup-cinema.html` | https://claude.ai/artifact/NcCHPpF6iWVFmg5RL99NtA | Villa Maré |
| `mockup-boutique.html` | — | substituído pelo `site.html` no mesmo link |
| `tour/` (bundle `npm run tour -- artifact`) | https://claude.ai/artifact/XSt1k9qcTRXoWp6sjCPeey | tour imersivo, item do pacote Premium |
| `site-v2/dist/` (`npm run site-v2 -- build`) | https://claude.ai/artifact/3tHRyx4xKLQQ9rPo7gCkSS | mockup v2 com shadcn/ui; `root = site-v2/dist` |

Todos são privados até o usuário compartilhar pelo menu Share.

No domínio próprio (`npm run build:web`, ver [docs/publicacao.md](../../docs/publicacao.md)):
`/casa-dez/` (site), `/casa-dez/proposta/`, `/casa-dez/Proposta-Casa-Dez.pdf`, `/casa-dez/mockup-tropical/`,
`/casa-dez/mockup-cinema/`.

## Decisões
- Objetivo: reserva direta pelo WhatsApp; Airbnb aparece como prova social (nota e avaliações).
- Público: famílias e grupos; casais que buscam luxo. Apresentação no celular e no notebook.
- Nome de marca escolhido: **Casa Dez** (sugestão nossa; depende da aprovação do proprietário).
- Visual final: capa cinematográfica em tela cheia (foto aérea 34) + restante boutique minimal
  (Newsreader + Jost, papel `#f3f3f0`, azul porcelana `#233f8c` do vaso das fotos).
- Só português. Preço da diária não aparece no site.
- Site v2 (mockup, mesmo visual e mesmos fatos): três referências do shadcn/ui para levar à reserva.
  1. **Date Range Picker** (Popover + Calendar em período, pt-BR): escolha de datas e hóspedes já na capa.
  2. **Carousel com API** (Embla): galeria com contador, categorias e miniaturas.
  3. **Drawer/Dialog responsivo**: consulta de datas em gaveta no celular e em janela no desktop,
     com resumo das noites e mensagem pronta para o WhatsApp (sem número até o proprietário fornecer).
  Mobbin não foi usado (exige plano pago).
- Pacotes ofertados: ver [docs/precos.md](../../docs/precos.md). Conta da proposta: estadia de R$ 25.250
  (23–28/out/2026) × 15,5% ≈ R$ 3.900.

## Fotos
20 das 46 fotos do anúncio, de prints do celular (974 × 716 úteis). Pedir as originais ao fechar o pacote
Completo ou Premium. `fonte/` tem os prints; `fotos/` é gerada por `npm run fotos`.
