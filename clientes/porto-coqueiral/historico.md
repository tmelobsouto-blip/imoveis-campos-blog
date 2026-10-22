# Histórico — Casa em Porto de Galinhas (pasta `porto-coqueiral`)

Como este site foi construído, pedido a pedido. Status, links publicados e decisões ficam no
[README do cliente](README.md); fatos do anúncio em [dados.md](dados.md).

- Anúncio de origem: TemporadaLivre, Ref. 75328, "Casa com 5 suítes em Porto de galinhas", anfitrião
  Francisco Paiva de Asevedo. A plataforma é só a fonte das informações e não aparece no site.
- Material: 28 prints da galeria em `fonte/` e 4 do texto do anúncio (título e descrição, comodidades,
  avaliações) em `fonte/anuncio/`, enviados pelo usuário.

## 1. Três mockups, um por perfil

**Pedido:** "Crie os 3 mockups desse site, cada um de um perfil".

- Entrevista (`AskUserQuestion`): perfis Famílias com crianças, Grupos de amigos e Casais e descanso;
  material pelos prints do texto; nome "Casa em Porto de Galinhas" nos três.
- Skills: `novo-cliente` (roteiro) e `karpathy-guidelines` (lembrete do hook). As páginas seguem as
  convenções de `frontend-design` e `artifact-design` já usadas nos outros mockups, sem carregar as skills de
  novo. Ferramenta advisor antes de começar e na revisão final (que corrigiu o título "Perto das praias,
  longe do agito" do mockup casais: o anúncio diz "5ª quadra ou +"). Sem biblioteca nova (HTML e JS puro),
  então sem Context7 nem shadcn.
- Fotos:
  - Prints de tablet (2304 × 1440) com avisos por cima de algumas fotos: "62 pessoas interessadas" (02 a 16)
    e "Nova guia fechada" (12, 14, 15, 16). O `recorte.json` passou a aceitar `caixas` por foto; essas saem
    mais baixas, sem os avisos.
  - A foto 22 (fachada à noite) mostra uma placa com telefone: caixa própria que a deixa de fora.
  - Fotos saem com até 1600 px de largura (antes, 2120 px): a página fica mais leve e os outros clientes não
    mudam, porque as fotos deles já são menores.
  - Marca d'água no centro de todas, em alturas diferentes: medida foto a foto com uma grade sobreposta e
    recortes extras (`04a`, `12b`, `23a`…) fora dela para capas e destaques.
- `dados.md`: só fatos dos prints. Desmarcados no anúncio e fora do site: festas, piscina infantil,
  condomínio fechado, vista para o mar, cadeiras de praia. "(confirmar)" nas camas da suíte 1 e nos
  ar-condicionados por suíte. Avaliações literais; a do Guilherme tem o meio coberto por um aviso e virou
  "[…]".
- Mockups: `mockup-familias.html` (caderno de férias), `mockup-amigos.html` (azulejo à noite, capa dia/noite)
  e `mockup-casais.html` (linho e palha, capa num prato de palha). Direções novas, sem repetir as dos
  outros clientes.
- Problemas resolvidos:
  - Campos de data lado a lado estouravam o cartão no celular (largura mínima do campo no Chrome): passam a
    empilhar abaixo de ~340 px.
  - A faixa noturna do mockup amigos ampliava demais a foto no desktop: a altura agora acompanha a
    proporção da foto.
  - A capa "a rede" do mockup casais quase não mostrava a rede: novo recorte da foto 35 (`35d`).
- Verificação: `npm run check` sem erros; clique real em cada página (galeria abre, avança e fecha; mensagem
  do WhatsApp com datas, pessoas e pet; limite de 17; botão Dia/Noite; pontos da capa).

## 2. Mockup no estilo da Casa 6

**Pedido:** "Faça um mockup mais elegante, moderno. Aborte esse mockup e faça um no estilo casa 6. Quero um
mockup mais moderno, elegante, com mais fotos".

- Os 3 mockups por perfil ficaram como descartados (links continuam no ar até o usuário pedir para apagar).
- `site/` copiado do site da Casa 6 (`porto-6-suites/site`): React 19 + Tailwind 4 + shadcn/ui (Carousel,
  Dialog, Drawer, Popover + Calendar, Accordion), build com esbuild em `site/dist/`. Mantida a estrutura da
  Casa 6; trocada a identidade (paleta "cal e madeira", Fraunces + Plus Jakarta Sans) e tiradas as placas de
  porta e a pastilha, que eram daquela casa.
- Mais fotos: 8 recortes novos sem marca d'água (`08b`, `09a`, `10a`, `14b`, `19a`, `20a`, `22a`, `30a`;
  23 no total), capa com três fotos trocando, mosaico de abertura, grade com as 28 fotos por ambiente (Dialog
  com a foto ampliada por cima) e seções com fotos de lazer, sala e noite.
- MCP do shadcn: conectou, mas o registro (`ui.shadcn.com`) segue bloqueado na rede; componentes vieram do
  código já copiado na Casa 6. Context7 não foi consultado: as bibliotecas e APIs são as mesmas já
  conferidas no site da Casa 6.
- Advisor antes de começar (o que manter da Casa 6, restos do modelo, ids que `npm run telas` usa) e na
  revisão final.
- Verificação: `npm run check` em `site/dist` sem erros; clique real no celular (menu lateral fecha e rola
  até a seção, gaveta de reserva, limite de 17, botão Copiar) e no computador (janela de reserva, atalhos da
  galeria, foto ampliada abrindo na foto clicada, grade com zoom por cima, troca de foto da capa).

## 3. Skill shadcn no mockup

**Pedidos:** "pnpm dlx skills add shadcn/ui" e "Use a skill shadcn no mockup da Casa em Porto de Galinhas".

- Instaladas as skills oficiais `shadcn` e `migrate-radix-to-base` (`.claude/skills/`, versões em
  `skills-lock.json`); a segunda veio junto e não foi usada.
- Skill `shadcn` aplicada ao `site/`. A CLI (`pnpm dlx shadcn@latest`) e o MCP falham porque o registro
  `ui.shadcn.com` está bloqueado na rede; `toggle` e `toggle-group` vieram do registro oficial no GitHub
  (new-york-v4). A skill pede só a CLI, mas o CLAUDE.md permite o GitHub quando o registro está bloqueado.
- Context7 (documentação do Radix) consultado para o ToggleGroup controlado: no modo único, tocar no item ativo
  manda valor vazio, que é ignorado.
- Mudanças, sem alterar o visual aprovado:
  - estilo do site movido para as cópias dos componentes: botões arredondados e `lg` mais alto, variante
    `inverse` para a capa escura, títulos de Card, Dialog e Drawer em Fraunces, pergunta do acordeão em
    texto normal;
  - atalhos da galeria viraram `ToggleGroup` (antes, botões com estado ativo feito à mão);
  - suítes, avaliações e distâncias viraram `Card` (`CardHeader`, `CardAction`, `CardFooter`); a linha da faixa
    de números virou `Separator`;
  - ícones dentro de botões com `data-icon` e sem classe de tamanho; ícones das camas passados como objetos
    (em `data.ts`), não por nome.
- Exceções mantidas de propósito: fundo escuro da foto ampliada (visualizador precisa dele), traços da capa
  (paginação, não escolha) e o quadro "Ver as 28 fotos" do mosaico (sobreposição na foto). A reserva não tem
  campos de texto, então Field/FieldGroup não se aplica.
- Verificação: `npm run check` em `site/dist` sem erros; clique real repetido (menu, gaveta e janela de reserva,
  limite de 17, Copiar, ambientes como `radio` que não desmarcam, foto ampliada, grade, capa).

## 4. Proposta e mensagem de envio

**Pedido:** "Mande tudo para enviar a proposta".

- Skill `proposta-comercial`, com base na proposta da Casa 6 Suítes (anúncio fora do Airbnb, site React) e a
  identidade do mockup (cal e madeira, Fraunces + Plus Jakarta Sans).
- Telas com `npm run telas` sobre `site/dist/index.html` (os ids `#a-casa`, `#suites-secao`, `#lazer-secao` e
  `#reservar` do site foram mantidos para isso).
- Sem conta de taxa (não é Airbnb): comparação do anúncio com o site só com fatos dos prints. Ponto de partida
  com nota 4,8 em 12 avaliações, 17 hóspedes e o aviso de 62 interessados na última semana.
- Tabela de preços atual de [docs/precos.md](../../docs/precos.md); validade de 15 dias (até 6/11/2026).
- PDF A4 com 5 páginas. Problema: a legenda da vitrine passava por baixo do celular; ganhou largura máxima.
- `mensagens.md`: texto de WhatsApp para o Francisco com os dois links e o PDF anexo. O telefone da placa da
  foto 22 não foi usado; o contato é pelo anúncio.
- `npm run build:web` ainda não publica sites React: os links enviados são os do claude.ai.

## 5. Formato para o Netlify

**Pedido:** "Coloque em formato que irei publicar no Netlify".

- Pesquisa: o plano gratuito do Netlify permite uso comercial (cobrar pela criação e manutenção, sem revender
  a hospedagem), então não esbarra na regra que proíbe a Vercel gratuita. O arrastar e soltar aceita pasta,
  não .zip.
- `npm run build:web` passou a incluir os sites React (`site/`, com build automático e `npm ci` quando falta
  `node_modules`, como no Netlify), a trocar o link claude.ai do site React pelo caminho do domínio e a deixar
  de fora os mockups marcados "descartado" no README.
- `netlify.toml` na raiz (build `npm run build:web`, pasta `dist`) para publicar ligado ao GitHub; para arrastar,
  o .zip `nexo-websites-netlify.zip` com a pasta pronta (21 MB, 253 arquivos, nenhum acima de 10 MB).
- Verificação: `dist/` servida localmente como site estático; todas as páginas abrem sem erro nem rolagem
  lateral no celular e no computador, sem links claude.ai sobrando, e o botão "Ver o site" da proposta aponta
  para `/porto-coqueiral/`.
- `docs/publicacao.md` reescrito com o passo a passo do Netlify; `mensagens.md` com os links no formato do
  Netlify.

## Em aberto

- Publicar no Netlify e trocar os links da mensagem pelo endereço escolhido.
- Enviar a proposta.
- Aprovar o mockup no estilo da Casa 6 (ou pedir ajustes) para virar o site final.
- Pedir ao proprietário fotos originais e fotos das suítes, da cozinha e dos banheiros.
- Confirmar as camas da suíte 1 e os ar-condicionados por suíte.
