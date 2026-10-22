# Histórico — Casa 6 Suítes (pasta `porto-6-suites`)

Como este site foi construído, pedido a pedido. Status, links publicados e decisões ficam no
[README do cliente](README.md); fatos do anúncio em [dados.md](dados.md).

- Anúncio de origem: TemporadaLivre #126200, "Linda casa em Porto de Galinhas", anunciante Luis Calado.
  A plataforma é só a fonte das informações e não aparece no site.
- Material: 20 prints enviados pelo usuário (15 da galeria em `fonte/`, 5 do texto do anúncio em
  `fonte/anuncio/`).

## 1. Primeira versão do site

**Pedido:** site para o imóvel usando as skills e ferramentas do anterior.

- Skills: `novo-cliente`, `frontend-design`, `artifact-design`.
- Fotos: a galeria tem fundo escuro, barra "n/15" e setas por cima da foto, e o recorte automático só
  reconhece moldura branca. O script `npm run fotos` passou a aceitar `fonte/recorte.json` (caixa fixa +
  recortes extras das colagens das suítes).
- `dados.md` só com fatos dos prints; pontos ambíguos marcados com "(confirmar)" (nome do condomínio,
  piscina privativa).
- Site em React + Tailwind 4 + shadcn/ui na base do `site-v2` da Casa Dez. O MCP do shadcn conectou, mas o
  registro (`ui.shadcn.com`) está bloqueado: os componentes vieram do código já copiado.

## 2. Nomes genéricos e 3 mockups

**Pedido:** nome do imóvel genérico (não TemporadaLivre) e 3 mockups.

- Entrevista (`AskUserQuestion`): um nome genérico por mockup; esconder a marca d'água enquadrando as
  fotos; direções Placas e pastilha, Cinematográfico e Tropical artesanal.
- Marca d'água "TemporadaLivre" no centro das 15 fotos: removê-la seria retoque. Foram feitos recortes fora
  da marca (faixas de cima e de baixo, blocos laterais) para capas e destaques; a galeria completa mostra
  as fotos inteiras.
- Pasta renomeada para o slug neutro `porto-6-suites`.
- Mockups: Placas e pastilha ("Casa 6 Suítes", React), `mockup-cinema.html` ("Casa em Porto de Galinhas",
  quadros panorâmicos com tarjas no computador e verticais no celular) e `mockup-tropical.html` ("Casa de
  Praia PG", argola de barro animada na capa).

## 3. Configuração do Claude no projeto

- Advisor Opus (`advisorModel`), subagentes Haiku (`CLAUDE_CODE_SUBAGENT_MODEL`; configurado, nenhum
  subagente foi usado ainda).
- Skills instaladas no projeto: `karpathy-guidelines` e `caveman` (ultra só no chat).
- Regras de uso do Context7 e do MCP do shadcn, e hook `UserPromptSubmit` que lembra tudo a cada pedido.
- Skill: `update-config`.

## 4. Site final e proposta

**Pedido:** site "Casa 6 Suítes" com melhorias nos componentes de UI e proposta com valores mais baixos.

- Site: o mockup Placas e pastilha virou `site/`. Documentação consultada no Context7 (Drawer do vaul,
  `startIndex` do Embla). Melhorias, cada uma testada com clique real:
  - foto ampliada na galeria (Dialog + Carousel abrindo na foto clicada);
  - menu lateral no celular (Drawer). Problema: o `onAnimationEnd` do vaul só dispara quando a gaveta fecha
    por dentro; os itens passaram a usar `DrawerClose` e a rolagem até a seção acontece no fim da animação;
  - botão "Copiar" a mensagem, que seleciona o texto quando o navegador recusa a área de transferência.
- Proposta: tabela nova em [docs/precos.md](../../docs/precos.md) (Essencial R$ 800, Completo R$ 1.400,
  Premium R$ 2.200, manutenção R$ 79/mês; só o R$ 800 veio do usuário). O anúncio não é do Airbnb, então
  não há conta de taxa: no lugar, comparação do anúncio atual com o site, só com fatos dos prints.
- Telas da proposta: `npm run telas` passou a achar as seções do site React (galeria, suítes, lazer).
- PDF: blocos partidos entre páginas corrigidos com regras de impressão; ficou com 5 páginas.
- Mensagem de WhatsApp para o anunciante em `mensagens.md`.
- Ferramenta advisor usada antes de cada etapa e na revisão final.

## Em aberto

- O pacote Essencial promete "galeria com as fotos atuais", que hoje têm marca d'água: exigir as fotos
  originais em todos os pacotes ou só no Completo e no Premium?
- Resolvido em 22/10/2026: `npm run build:web` passou a incluir o site React; no domínio, `/porto-6-suites/` e
  `/porto-6-suites/proposta/`.
- "Ponytail", citado pelo usuário entre as ferramentas padrão, não foi identificado.
- Confirmar com o anunciante: nome do condomínio ("Culpe"/"Cupe") e se a piscina é privativa.
