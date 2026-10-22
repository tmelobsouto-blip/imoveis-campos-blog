# Histórico — Casa Dez

Como este site foi construído, pedido a pedido. Status, links publicados e decisões ficam no
[README do cliente](README.md); fatos do anúncio em [dados.md](dados.md).

- Anúncio de origem: Airbnb (https://www.airbnb.com/l/4AhFnWmJ), anfitrião Leonardo.
- Fotos e fatos: prints da galeria e das telas do anúncio enviados pelo usuário (o ambiente bloqueia
  `www.airbnb.com`, então nada foi lido direto do site).

## 1. Tour imersivo (`tour/`)

**Pedido:** experiência imersiva de imóvel a partir das 20 fotos, com scroll conduzindo a visita.

- Entrevista com `AskUserQuestion`: sem nome na abertura, uso das fotos autorizado, projeto separado,
  botão final com o link do anúncio.
- Skills: `caveman`, `frontend-design`.
- Resultado: app Next.js + React + TypeScript + Tailwind 4 com renderizador WebGL2 próprio, testes com
  vitest e bundle para Artifact (`npm run tour -- artifact`). Percurso e análise das fotos em
  `tour/STORYBOARD.md`.
- Problema: o link do anúncio não pôde ser lido (proxy recusou `www.airbnb.com`); o usuário mandou prints.

## 2. Mockups, site final e proposta

**Pedido:** nova versão do site para vender ao proprietário, com entrevista antes e 3 mockups.

- Entrevista (`AskUserQuestion`): reserva direta pelo WhatsApp; famílias e grupos + casais que buscam luxo;
  apresentação no celular e no notebook; direções Resort tropical, Cinematográfico e Boutique minimal; só
  português; esperar os prints do anúncio antes de desenhar.
- Material: 20 prints em `fonte/`, fotos recortadas com `npm run fotos`, fatos em `dados.md`.
- Mockups: `mockup-tropical.html` (Villa Coqueiral), `mockup-cinema.html` (Villa Maré),
  `mockup-boutique.html`.
- Escolha do usuário: capa cinematográfica + restante boutique minimal, nome **Casa Dez** → `site.html`
  (publicado no link do mockup boutique).
- Proposta: 3 pacotes, página + PDF (`proposta.html`, `Proposta-Casa-Dez.pdf`), com a conta da taxa do
  Airbnb sobre uma estadia real do anúncio.
- Skills: `frontend-design`, `artifact-design`, `pdf`.

## 3. NEXO Websites, envio e domínio próprio

- Repositório reorganizado como **NEXO Websites**: `CLAUDE.md`, skills do projeto `novo-cliente` e
  `proposta-comercial`, hook de sessão (skill `session-start-hook`), scripts em `scripts/`.
- Dados do vendedor (Tiago Souto) na proposta e mensagens de envio em `mensagens.md`. Pelo chat do Airbnb
  não funciona: antes da reserva a plataforma oculta contatos e links e proíbe oferecer serviços.
- Links sem "claude": `npm run build:web` gera `dist/` para Cloudflare Pages ([docs/publicacao.md](../../docs/publicacao.md)).

## 4. Site v2 com shadcn/ui (`site-v2/`)

**Pedido:** otimizar o site com 3 referências, primeiro pelo Mobbin, depois pelo shadcn.

- Mobbin MCP: exige plano pago, não foi usado.
- shadcn: o MCP não estava instalado e `ui.shadcn.com` está bloqueado na rede do ambiente. Componentes
  oficiais (new-york-v4) copiados do registro no GitHub; documentação pelo **Context7**.
- Três referências: Date Range Picker (Popover + Calendar), Carousel com API (contador, categorias,
  miniaturas) e Drawer/Dialog responsivo para a consulta de datas.
- Problemas resolvidos: rolagem lateral no celular (trilhas do grid crescendo com as miniaturas →
  `grid-cols-1`; o `npm run check` passou a medir esse caso) e página pulando para a galeria ao abrir
  (`scrollIntoView` trocado por rolagem só da faixa de miniaturas).
- `.mcp.json` com o MCP do shadcn para as próximas sessões.

## Em aberto

- A proposta usa a tabela de preços anterior (R$ 1.900 / 3.500 / 5.900, manutenção R$ 149/mês). A tabela
  atual de [docs/precos.md](../../docs/precos.md) é mais baixa: confirmar com o usuário se a proposta deve
  ser refeita.
- `site-v2/` é mockup: falta o usuário decidir entre ele e `site.html`.
