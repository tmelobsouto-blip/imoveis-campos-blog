# Bangalô Muro Alto (pasta `malawi-muro-alto`) — Muro Alto, Porto de Galinhas, PE

**Status:** 3 mockups prontos para mostrar ao anunciante; falta escolher um estilo para virar o site final.
Os links são privados até o usuário compartilhar pelo menu Share.

- Anúncio de origem: TemporadaLivre, Anúncio #53449, "5 suítes Praia Malawi Muro Alto + Serviços"
  (Ref. Imobiliária "Malawi Bangalô 48"). A plataforma é só a fonte e não aparece no site.
- Fatos usados nos textos: [dados.md](dados.md)
- Como os mockups foram feitos: [historico.md](historico.md)

## Links publicados (Artifacts claude.ai)

Republicar sempre com o `url` abaixo. Build: `npm --prefix clientes/malawi-muro-alto/mockups run build`
(gera `mockups/dist/<estilo>/`). Publicar `mockups/dist/<estilo>/index.html` com
`root = clientes/malawi-muro-alto/mockups/dist/<estilo>` e `files` = `app.js`, `app.css` e `fotos/*`.

| Arquivo | Artifact | Observação |
|---|---|---|
| `mockups/dist/noite/` | https://claude.ai/artifact/NHVcZ7tMua6xqA948Z9TPR | Noite no Malawi · luxo escuro, piscina iluminada |
| `mockups/dist/azulejo/` | https://claude.ai/artifact/4mCmVcXNd29vBApsqwGcq3 | Azulejo e madeira · editorial claro |
| `mockups/dist/rede/` | https://claude.ai/artifact/VkWUpJwy8xNBfm9yziCnPy | Pé na areia · resort solar, areia e verde-mar |

Os mockups ficam fora do `npm run build:web` (não há `site.html` nem `site/`); o domínio próprio entra com o
site final.

## Decisões
- Objetivo: reserva direta pelo WhatsApp (sem número até o proprietário fornecer).
- Nome: **Bangalô Muro Alto** (sugestão nossa, genérica: tipo do imóvel + praia; depende da aprovação do
  proprietário). O condomínio aparece como localização ("no condomínio Malawi, em Muro Alto").
- Nos três mockups, o mesmo conteúdo real: capacidade (10 pessoas, 5 suítes, 6 banheiros), serviço de
  empregada, camas por suíte, listas da casa e do condomínio, distâncias do card do anúncio, a avaliação do
  Sergio Dalmas e as perguntas frequentes. Reserva com calendário, limite de 10 hóspedes e mensagem pronta.
- Três estilos, cada um com efeitos do React Bits (detalhes no [histórico](historico.md)):
  1. **Noite no Malawi:** azul da piscina iluminada e âmbar das luzes. Título letra a letra, feixes de luz em
     WebGL só no computador, números contando e cartões que acendem. Playfair Display + Sora.
  2. **Azulejo e madeira:** papel creme, cobalto e madeira, inspirado no teto de azulejo. Mosaico de fotos,
     texto do serviço revelado no scroll, suítes em cartões que inclinam e faixas de azulejo desenhadas em CSS
     (ornamento, não foto). Gloock + Albert Sans.
  3. **Pé na areia:** areia, verde-mar e coral das redes. Pilha de fotos para arrastar, frase girando, faixa
     "Muro Alto · Porto de Galinhas" correndo e galeria em carrossel. Marcellus + Outfit.
- Com "reduzir movimento", todos os efeitos param e o conteúdo aparece pronto; no celular não há WebGL.
- Endereço exato e número do bangalô ficam fora; telefone, nome e Instagram do anunciante nunca aparecem.
  Festas não são permitidas; animais: "consultar pelo WhatsApp" (o anúncio não marca "aceita animais").
- Preço da diária não aparece (não está nos prints).

## Fotos
10 das 56 fotos do anúncio, de prints do tablet. A marca d'água fica nas fotos inteiras da galeria (removê-la
seria retoque); capas e destaques usam só os recortes limpos de `fonte/recorte.json`.

Pedir ao proprietário: fotos originais (sem marca d'água) e fotos das outras suítes, dos banheiros e do
condomínio (praia, restaurante, quadras).

## Confirmar com o anunciante
- Se o quarto 5 é "dependência" (card da foto 56); no site, "5 suítes", como os campos do anúncio.
