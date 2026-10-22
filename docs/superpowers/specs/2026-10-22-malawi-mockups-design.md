# Desenho — 3 mockups do bangalô no condomínio Malawi (Muro Alto)

Data: 22/10/2026 · Cliente novo da NEXO Websites · Processo: superpowers (brainstorming → plano → execução)

## Intenção e porquê

A NEXO vende sites de reserva direta a donos de casas de temporada. O usuário trouxe um anúncio novo
(TemporadaLivre #53449, "5 suítes Praia Malawi Muro Alto + Serviços", Ref. imobiliária "Malawi Bangalô 48") e
quer **3 mockups elegantes, cada um num estilo diferente**, usando elementos do **React Bits**
(github.com/DavidHDev/react-bits) junto com **shadcn/ui**, para apresentar ao anunciante e vender o site.
O argumento da casa é luxo com serviço: frente para o mar, piscina privativa, empregada todos os dias e a
estrutura de um condomínio de praia.

## Objetivos
- 3 páginas de demonstração, cada uma com identidade visual própria (paleta, tipografia, momento marcante),
  todas com o mesmo conteúdo real.
- Efeitos do React Bits que tornem cada estilo memorável, sem atrapalhar a leitura nem a reserva.
- Consulta de datas que gera mensagem pronta para o WhatsApp (sem número até o proprietário fornecer).
- 3 links publicados (Artifacts do claude.ai) para o usuário mostrar ao anunciante.

## Não objetivos
- Site final, proposta comercial e publicação no domínio próprio (próximos pedidos).
- Versão em outro idioma.

## Anti-objetivos (falha mesmo funcionando)
- Qualquer fato que não esteja nos prints: capacidade, distância, comodidade, preço.
- Foto retocada, gerada ou de banco de imagens; marca d'água "apagada".
- Telefone, nome completo ou Instagram do anunciante no site.
- Efeito que trave o celular, cause rolagem lateral ou ignore "reduzir movimento".
- Visual repetido dos outros clientes (Casa Dez, Casa 6 Suítes, Casa em Porto de Galinhas).

## Restrições (CLAUDE.md do projeto)
- Fotos reais só do anúncio; pode recortar e redimensionar. Fatos só do `dados.md`. Avaliação literal, com nome
  e mês. Nome da marca é sugestão.
- Página no formato do Artifact (sem `<head>`/`<body>`), mobile primeiro (390 px), sem rolagem lateral,
  `prefers-reduced-motion` respeitado, fontes só do Google Fonts, JS empacotado (esbuild) sem CDN.
- Registro do shadcn (`ui.shadcn.com`) e o do React Bits ficam fora da rede: componentes copiados do GitHub
  (React Bits na variante TypeScript + Tailwind, `src/ts-tailwind/`; shadcn new-york-v4 já presente no projeto).
- Regras da skill `shadcn` (composição, `data-icon`, estilo nos componentes) e da `ponytail` (menor código que
  resolve).

## Material e fatos (detalhe vai para `dados.md`)
- 15 prints: 5 de texto (título e resumo, descrição, comodidades, avaliação, localização e anunciante) e 10 da
  galeria (de 56): piscina à noite com redes (55), casa à noite com piscina (52), suíte com cabeceira listrada
  (32), jantar com teto de azulejo (24), jantar e sala abertos para a piscina (21), sala de estar (16), varanda
  com mesa rústica e redes (14), piscina de dia (5), bar externo (7), bar e piscina (8).
- Prints de tablet 2304 × 1440, mesmo layout da galeria do cliente `porto-coqueiral`: marca d'água no centro,
  aviso "51 pessoas interessadas" no canto inferior direito da maioria. Recorte com `fonte/recorte.json`
  (caixa, caixas por foto e recortes extras fora da marca), como no `porto-coqueiral`.
- Fatos principais: 10 pessoas; 5 quartos, todos suítes (Q1 queen, Q2 2 solteiro, Q3 queen, Q4 queen,
  Q5 5 solteiro; o card da foto 56 marca o Q5 como "dependência"); 6 banheiros; 6 ar-condicionados; de frente
  para o mar ("30 segundos caminhando"); piscina privativa; churrasqueira; empregada todos os dias das 8h às
  16h (limpeza e cozinha); roupa de cama e toalhas; 3 redes; check-in após 12h, check-out às 12h, self check-in
  com a equipe; itens de acessibilidade listados no anúncio; condomínio fechado com restaurante, sauna,
  academia, quadras, serviço de praia e recreação; distâncias do card (Pontal do Cupe 800 m, piscinas naturais
  de Muro Alto 1,5 km, centro de Porto 8 km, aeroporto do Recife 46,8 km…); 1 avaliação: Sergio Dalmas, abril de
  2019, "Excelente lugar, supero las expectativas". Não aceita animais, não permite festas.

## Abordagens consideradas
- **A. Um app React com 3 páginas (escolhida pelo usuário).** Uma pasta `mockups/` no cliente: dados, fotos,
  reserva, galeria e perguntas escritos uma vez; cada estilo é uma entrada com tema e efeitos próprios; o build
  gera 3 pastas e 3 links. Menos código e fatos iguais nos 3.
- B. Três apps separados (cópias do site da Casa 6): liberdade total por estilo, mas código triplicado e fato
  corrigido num não corrige nos outros.
- C. HTML puro como os mockups antigos: leve, mas perde a maior parte dos efeitos do React Bits, que são
  componentes React.

## Decisões do usuário
- As 3 direções abaixo, como propostas:
  1. **Noite no Malawi** — luxo cinematográfico escuro. Capa com a piscina iluminada à noite em tela cheia;
     título montando letra a letra (SplitText); fundo com feixes de luz suaves (LightRays); cartões que acendem
     sob o dedo ou mouse (SpotlightCard); números contando (CountUp: 10 pessoas, 5 suítes, 30 s do mar). Cores:
     azul elétrico da piscina e âmbar das luzes.
  2. **Azulejo e madeira** — editorial claro e quente, a partir do teto de azulejo e das vigas da sala de
     jantar. Galeria em mosaico com entrada em cascata (Masonry); texto do serviço revelado no scroll
     (ScrollReveal); suítes em cartões que inclinam (TiltedCard). Cores: papel creme, azul-cobalto, madeira.
  3. **Pé na areia, ritmo de rede** — resort minimalista e solar. Capa com pilha de fotos para arrastar (Stack)
     e frase girando "piscina privativa · empregada diária · 30 s do mar" (RotatingText); faixa
     "Muro Alto · Porto de Galinhas" correndo (ScrollVelocity); galeria em carrossel. Cores das redes e da
     suíte listrada: areia, verde-mar, coral.
- Nos 3: reserva com calendário shadcn e mensagem pronta para o WhatsApp; perguntas frequentes; efeitos
  pesados viram imagem parada no celular fraco ou com "reduzir movimento".
- Abordagem A.

## Decisões minhas (o usuário pode trocar)
- **Nome provisório: "Bangalô Muro Alto"** — genérico (tipo do imóvel + praia), sem citar a plataforma; o
  condomínio aparece como localização ("no condomínio Malawi, em Muro Alto"), porque é fato e ajuda o hóspede.
- **Pasta do cliente: `clientes/malawi-muro-alto/`**, com `fonte/`, `fotos/`, `dados.md`, `README.md`,
  `historico.md` e `mockups/` (app React: `src/shared/` com dados, reserva, galeria e perguntas;
  `src/components/ui/` com os componentes shadcn; `src/bits/` com os componentes do React Bits copiados;
  `src/noite/`, `src/azulejo/`, `src/rede/` com as páginas). Build: `mockups/dist/<estilo>/` com `index.html`,
  `app.js`, `app.css` e só as fotos usadas.
- Base técnica igual aos sites React do projeto: React 19, Tailwind 4, esbuild, componentes shadcn copiados
  do `porto-coqueiral/site`. Dependências novas só as que os componentes React Bits escolhidos exigem
  (gsap e/ou motion, e ogl para o fundo de luz), conferidas no plano.
- Capacidade máxima na reserva: 10 hóspedes.
- Fontes novas por estilo (nenhuma repetida dos outros clientes), escolhidas no plano.
- Mockups ficam fora do `build:web` por enquanto (são demonstração; o domínio entra com o site final).

## Fica para o construtor
- Recortes exatos das fotos e a ordem da galeria.
- Textos de cada página (sempre dentro do `dados.md`).
- Props e ajustes finos de cada componente do React Bits; troca de um componente por outro do mesmo papel se
  o escolhido não couber (peso, licença, dependência), registrando o motivo.

## Como verificar
- `typecheck` e build sem erro; `npm run check` em cada `mockups/dist/<estilo>` sem erros nem rolagem lateral.
- Capturas de página inteira no celular e no computador, revisadas uma a uma.
- Clique real: galeria abre e passa fotos, reserva gera a mensagem certa e trava em 10 hóspedes, menu do
  celular; com "reduzir movimento" ligado, efeitos param e o conteúdo continua visível.
- Busca no código por fatos de outros clientes e por telefone, Instagram ou nome completo do anunciante.
