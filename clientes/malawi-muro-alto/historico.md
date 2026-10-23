# Histórico — Bangalô Muro Alto (pasta `malawi-muro-alto`)

Como os mockups foram construídos, pedido a pedido. Status, links publicados e decisões ficam no
[README do cliente](README.md); fatos do anúncio em [dados.md](dados.md).

- Anúncio de origem: TemporadaLivre, Anúncio #53449, "5 suítes Praia Malawi Muro Alto + Serviços",
  Ref. Imobiliária "Malawi Bangalô 48". A plataforma é só a fonte das informações e não aparece no site.
- Material: 10 prints da galeria (de 56 fotos) em `fonte/` e 5 do texto do anúncio em `fonte/anuncio/`,
  enviados pelo usuário em 22/10/2026. O print da localização foi cortado antes de "Sobre o Anunciante".

## 1. Três mockups com React Bits

**Pedido:** "Faça três mockups para esse imóvel. Para esses utilize a skill superpowers, o shadcn e o caveman
e ponytail. Quero 3 mockups elegantes, cada um em um estilo diferente, utilizando ferramentas e elementos do
https://github.com/DavidHDev/react-bits.git."

- Processo **superpowers**, em ordem:
  1. `brainstorming`: três direções propostas e aprovadas ("Servem, pode seguir"); abordagem A (um app React
     com três páginas) escolhida entre três.
  2. Desenho em [docs/superpowers/specs/2026-10-22-malawi-mockups-design.md](../../docs/superpowers/specs/2026-10-22-malawi-mockups-design.md),
     revisado por um subagente construtor e aprovado pelo usuário.
  3. `writing-plans`: plano em [docs/superpowers/plans/2026-10-22-malawi-mockups.md](../../docs/superpowers/plans/2026-10-22-malawi-mockups.md),
     com seis tarefas e testes.
  4. `executing-plans` (execução na própria sessão, escolhida pelo usuário), com `test-driven-development`
     (teste de navegador escrito antes de cada página) e revisão final do ramo inteiro.
- Outras skills e ferramentas:
  - `ponytail` (menor código que resolve) e `karpathy-guidelines`;
  - `shadcn`: componentes copiados do `porto-coqueiral/site` (o registro `ui.shadcn.com` segue bloqueado e o MCP
    não conectou);
  - `caveman` só nas respostas de chat;
  - Context7 consultado para GSAP (SplitText é gratuito desde a 3.13) e Motion;
  - advisor (Opus) para revisão.
- **React Bits** (variante TypeScript + Tailwind, commit e12c221), copiado em `mockups/src/bits/` com a licença
  em `src/bits/LICENSE.md`. A licença é MIT + Commons Clause: pode usar em site comercial, mas não vender nem
  redistribuir os componentes em si. Novas dependências: `gsap`, `@gsap/react` e `motion`.
  - Noite no Malawi: SplitText (título letra a letra), LightRays (feixes de luz em WebGL), CountUp
    (números) e SpotlightCard (cartões que acendem).
  - Azulejo e madeira: Masonry (mosaico de fotos), ScrollReveal (texto do serviço) e TiltedCard (suítes).
  - Pé na areia: Stack (pilha de fotos para arrastar), RotatingText (frase girando), ScrollVelocity (faixa
    correndo) e o Carousel do shadcn na galeria.
- Fotos:
  - Mesma geometria do `porto-coqueiral` (prints de tablet 2304 × 1440). As fotos inteiras saem com 970 px de
    altura no print, sem o aviso "51 pessoas interessadas"; a 55 não tem o aviso.
  - A marca d'água foi medida foto a foto com uma grade sobreposta. Os recortes limpos são os lados esquerdo
    (`a`) ou direito (`b`) da foto, ou uma faixa acima ou abaixo da marca (`c`): 24 recortes no total.
- `dados.md`: só fatos dos prints. Telefone, nome e Instagram do anunciante não foram copiados nem para o
  `dados.md`. O quarto 5 aparece como "dependência" no card da foto 56: fica como (confirmar) e não vai para o
  site.
- Código:
  - `mockups/src/shared/` tem fatos, reserva (calendário, até 10 hóspedes, mensagem para o WhatsApp sem
    número), visualizador de fotos, menu do celular e perguntas, escritos uma vez para os três estilos;
  - cada estilo tem `App.tsx` e `index.css` próprios;
  - `scripts/build.mjs` gera `dist/<estilo>/`;
  - `scripts/e2e.mjs` testa cada página no celular e no computador.
- Decisões tomadas na execução (todas no ledger do plano):
  - Títulos do Noite em Playfair Display, no lugar do Cormorant Garamond: o circunflexo do Cormorant sai alto e
    fino, e "Bangalô" parecia errado.
  - CountUp no modo de contagem simples: no modo "rolo", o "10" aparecia como "1 0".
  - Masonry sem o visualizador próprio, com recortes limpos de alturas variadas. Com as fotos inteiras, todas
    da mesma proporção, o mosaico virava grade e sobrava uma foto solta. O toque abre a foto inteira no
    visualizador comum.
  - Suítes do Azulejo em cartões só com as camas, mais um cartão com a única foto de suíte. Repetir a foto em
    cada suíte faria parecer que todas são iguais.
  - ScrollReveal no modo de entrada: no modo de rolagem, o texto ficava apagado até o meio da tela.
  - Com "reduzir movimento", a frase do Pé na areia aparece inteira e parada, e a pilha de fotos não troca
    sozinha.
  - Variantes `dark:` dos componentes ligadas a uma classe, para o tema escuro do aparelho não alterar os
    estilos claros.
- Problemas resolvidos:
  - A pilha de fotos do Pé na areia passava 9 px da tela no celular: ficou menor.
  - No Noite, a lista da casa aparecia duas vezes: saiu da seção de serviço.
  - Com "reduzir movimento", o mosaico do Azulejo só mostrava cada foto quando ela entrava na tela (e uma
    rolagem rápida podia pular fotos): agora aparece inteiro de uma vez. Achado na revisão final; o teste
    passou a conferir as fotos, não só os títulos.
  - A frase da capa do Pé na areia dizia "Pé na areia", que o anúncio não diz: virou "De frente para o mar,
    com piscina privativa · empregada diária · 3 redes". O nome do estilo continua o mesmo.
- Verificação:
  - `node scripts/e2e.mjs noite azulejo rede`, no celular e no computador, confere título, fatos, ausência de
    dados do anunciante, galeria abrindo e passando, limite de 10 hóspedes, link do WhatsApp, aviso sem a data
    de saída, menu do celular e canvas WebGL só no Noite em tela grande. Com "reduzir movimento", confere que
    não há canvas e que os títulos estão visíveis;
  - `npm run check` nos três `dist/` sem erros;
  - `npm run validate` passa;
  - capturas de página inteira revisadas, também com "reduzir movimento".

## Em aberto

- Escolher um dos três estilos (ou pedir ajustes) para virar o site final; depois, proposta e mensagem.
- Pedir ao proprietário fotos originais, sem marca d'água, e fotos das outras suítes, dos banheiros e do
  condomínio.
- Confirmar se o quarto 5 é "dependência".

## 2. Contraste do Noite e publicação

**Pedido:** "Utilize opus para revisão do noite no Malawi, pois o contraste está ocultando o texto. Após
finalizar, mande tudo para publicação".

- Revisão de contraste por um subagente Opus, que mediu 1103 textos no Artifact real. A causa era uma só:
  o esqueleto do Artifact define `body{background:#fff;color:#000}` fora de camada CSS, e isso vencia o
  `@layer base` do Tailwind. No Noite, apareciam texto preto sobre azul-marinho (calendário, menu, cartões) e
  texto claro sobre fundo branco. No Azulejo e no Pé na areia, o fundo ficava branco em vez do tom do tema.
- Correção: regra do `body` fora de camada em `mockups/src/shared/base.css`. Depois dela, nenhum texto abaixo
  do mínimo WCAG AA.
- `npm run check` não pegava o problema porque o esqueleto local (`scripts/_pagina.mjs`) não tinha o fundo
  branco nem o texto preto do real. Ele passou a ser igual ao real, e o teste dos mockups confere se fundo e
  texto do body são os do tema.
- Os 3 Artifacts foram republicados nos mesmos links.
- `npm run build:web` passou a incluir os mockups: `/malawi-muro-alto/noite/`, `/azulejo/` e `/rede/`.
- Novo pacote para o Netlify gerado.
