# Storyboard — análise das 20 fotografias

Fonte: 20 capturas de tela da galeria do anúncio (46 fotos no total). Cada foto foi recortada da moldura da
galeria (`scripts/recortar-galeria.mjs`, na raiz) — sem retoque, sem reamostragem, sem IA. Resolução útil: **974 × 716 px**.

Os nomes de ambiente são os rótulos publicados no próprio anúncio. Coordenadas abaixo são UV da foto
(0–1, origem no canto superior esquerdo).

## 1. Catálogo

| Foto (anúncio) | Ambiente | Conteúdo verificável |
|---|---|---|
| 1/46 | Sala de estar | Piso de madeira, sofás de fibra, mesa rústica, lustre de conchas. Portas de vidro abertas à direita mostram piscina, guarda-sóis, espreguiçadeira e mesa com cadeiras. Banqueta de couro no canto inferior direito. |
| 2/46 | Sala de estar | Mesmo ambiente da 1 (mesmos sofás, lustre, piso). Cozinha com bancada e banquetas ao fundo à esquerda; mesa de jantar com cadeiras de fibra à direita. |
| 3/46 | Sala de estar | Mesmo ambiente. TV sobre parede de concreto, cozinha ao fundo, janelas triangulares sob a estrutura de madeira do telhado. |
| 6/46 | Sala de estar | **Outro ambiente**: piso claro, sofás brancos, TV sobre parede texturizada, mesa de jantar com cadeiras medalhão ao fundo. |
| 7/46 | Cozinha completa | Cervejeira, geladeira inox, pia dupla, ilha com tampo de madeira e 3 banquetas. Coqueiro visível pela janela alta. |
| 8/46 | Cozinha completa | Vista frontal da bancada com 3 banquetas; pia e fogão atrás. |
| 9/46 | Cozinha completa | Detalhe da bancada de pedra com pia dupla e gaveteiro, vista a partir da bancada. |
| 19/46 | Quarto 4 | Cama com manta vermelha, criados-mudos espelhados, armário branco, cortinas. |
| 21/46 | Quarto 4 | Sofá capitonê cinza e duas poltronas, cortinas do piso ao teto. |
| 29/46 | Exterior | Anexo de telhado cinza, fachada de vidro com cortinas azuis, 2 guarda-sóis, espreguiçadeiras, mesa; borda da piscina. |
| 30/46 | Exterior | Área coberta térrea da casa principal: rede, cadeira, chaise de fibra, vaso azul e branco; piscina e jardim à esquerda; anexo com guarda-sóis ao fundo. |
| 31/46 | Exterior | Estar coberto com sofás de fibra e o mesmo vaso azul e branco da 30. |
| 32/46 | Exterior | Varanda superior com deck, chaise redonda branca, guarda-corpo de vidro; piscina e bica d'água abaixo. |
| 34/46 | Piscina | Aérea: casa principal de dois pavimentos, anexo à esquerda, piscina, coqueiros. |
| 35/46 | Piscina | Fachada da casa principal a partir da piscina; área coberta com rede e mesa; varanda superior; bica d'água. |
| 36/46 | Piscina | Câmera rente à água olhando para a casa principal; jato d'água. |
| 37/46 | Piscina | Vista elevada: piscina, deck do anexo com guarda-sóis, lateral da casa e mesa da área coberta. |
| 38/46 | Piscina | Piscina junto à cerca de bambu com bica e vasos. |
| 39/46 | Piscina | Piscina vista do alto, guarda-sol e espreguiçadeiras. |
| 41/46 | Piscina | Nível do deck: piscina com jato, anexo ao fundo, lateral da casa à direita. |

## 2. Relações espaciais demonstráveis

Só conto como ligação o que aparece nas próprias fotos:

- **34 → 37 → 41**: mesma orientação (piscina em primeiro plano, anexo ao fundo, casa à direita), descendo da vista aérea ao nível do deck.
- **35 → 30**: a área coberta com rede aparece na 35 (≈ 0.31, 0.52); a 30 foi feita dentro dela.
- **30 → 31**: o vaso azul e branco da 30 (≈ 0.74, 0.57) é o mesmo da 31.
- **30 / 37 / 41 / 34 → 29**: o anexo com os dois guarda-sóis aparece nas quatro.
- **1 = 2 = 3**: mesmo ambiente (mobiliário, lustre e piso idênticos), três ângulos.
- **2 / 3 → 7**: a cozinha aparece ao fundo da 2 (≈ 0.33, 0.34) e da 3 (≈ 0.62, 0.44).
- **8 → 9**: a pia da 8 (≈ 0.42, 0.44) é o assunto da 9.
- **19 = 21**: mesmo ambiente segundo o anúncio.

Ligações **não comprovadas** (viram corte):

- **29 → 1**: a 1 mostra o ambiente abrindo para um deck com guarda-sóis, espreguiçadeira e mesa, coerente
  com o deck do anexo (29) visto de dentro — mas nenhuma foto mostra a passagem. Corte.
- **9 → 6**, **6 → 19**, **21 → 32**, **31 → 29**: nenhuma foto liga esses ambientes. Corte.
- A 6 é uma segunda sala (piso, sofás e lustre diferentes da 1–3) cuja posição na casa não aparece.

## 3. Percurso

| # | Foto | Capítulo | Movimento de câmera | Passagem para a próxima | Justificativa |
|---|---|---|---|---|---|
| 1 | 34 | 01 Piscina | dolly-in leve, desce para a piscina | **aproximação** → 37 | mesmo eixo, 37 é a mesma área vista mais de perto |
| 2 | 37 | | dolly-in em direção ao anexo | **aproximação** → 41 | anexo à frente nas duas |
| 3 | 41 | | dolly-in | **travelling** ← 38 | mesma piscina, câmera gira para a cerca |
| 4 | 38 | | travelling lateral | **travelling** → 39 | mesma piscina |
| 5 | 39 | | descida suave | **travelling** → 36 | mesma piscina |
| 6 | 36 | | dolly-in rente à água | **aproximação** → 35 | casa principal à frente nas duas |
| 7 | 35 | | travelling até a rede | **aproximação** → 30 | área com rede visível na 35 |
| 8 | 30 | 02 Exterior | travelling para a direita | **aproximação** → 31 | vaso azul e branco nas duas |
| 9 | 31 | | dolly-in | corte → 29 | sem ligação mostrada |
| 10 | 29 | | dolly-in | corte → 1 | ver seção 2 |
| 11 | 1 | 03 Sala de estar | travelling para as portas abertas | **travelling** → 2 | mesmo ambiente |
| 12 | 2 | | travelling para a cozinha | **travelling** ← 3 | mesmo ambiente |
| 13 | 3 | | travelling para a cozinha | **aproximação** → 7 | cozinha ao fundo da 3 |
| 14 | 7 | 04 Cozinha completa | travelling lateral | **travelling** → 8 | mesmo ambiente |
| 15 | 8 | | dolly-in na pia | **aproximação** → 9 | pia da 8 = assunto da 9 |
| 16 | 9 | | travelling na bancada | corte → 6 | sem ligação mostrada |
| 17 | 6 | 05 Sala de estar | travelling | corte → 19 | sem ligação mostrada |
| 18 | 19 | 06 Quarto 4 | dolly-in | **travelling** → 21 | mesmo ambiente (anúncio) |
| 19 | 21 | | travelling lateral | corte → 32 | sem ligação mostrada |
| 20 | 32 | 07 Exterior | dolly-in para a piscina | fim | varanda com vista para a piscina fecha o percurso |

Tipos de passagem implementados (`src/tour/timeline.ts`):

- **aproximação**: a câmera avança até o ponto da foto atual onde a próxima foi feita; a próxima entra em
  dissolve com desfoque radial proporcional à velocidade.
- **travelling**: mesmo ambiente, outro ângulo; as duas fotos deslizam na mesma direção com desfoque
  direcional.
- **corte**: dissolve pela luminância com mergulho escuro — passagem discreta que não sugere caminho físico.

Todos os movimentos ficam dentro dos limites de cada foto (`cameraRect`): nada é esticado e nenhuma área
fora do enquadramento original é exibida.

## 4. Trechos que pedem geração adicional de mídia

O ambiente de desenvolvimento não tem modelo de image-to-video nem estimativa de profundidade. As
passagens abaixo melhorariam com clipes gerados a partir das duas fotos como quadros-chave (início/fim),
com forte preservação estrutural:

| Passagem | Tipo de clipe |
|---|---|
| 34 → 37 → 41 | descida de drone contínua |
| 36 → 35 | deslocamento rente à água até a borda |
| 35 → 30 | caminhada da piscina até a área com rede |
| 30 → 31 | caminhada pela área coberta |
| 3 → 7 | caminhada da sala até a ilha |
| 8 → 9 | contorno da bancada |
| 1 → 2 → 3, 19 → 21 | pan/órbita dentro do ambiente |

Os cortes (31 → 29, 29 → 1, 9 → 6, 6 → 19, 21 → 32) **não devem** ser preenchidos com vídeo gerado:
não há material que fundamente o caminho entre esses ambientes.

Outras melhorias que dependem de material novo:

- **Originais em alta resolução** (as capturas têm 974 px úteis; em tela cheia o upscale fica macio).
- As outras 26 fotos do anúncio (quartos 1–3, banheiros etc.).
- Mapas de profundidade (Depth Anything / MiDaS) para parallax 2.5D real.
