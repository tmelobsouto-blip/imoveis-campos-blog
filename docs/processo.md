# Processo: do anúncio ao site vendido

1. **Escolher o imóvel.** Casa de temporada sem site próprio. Copiar o link do anúncio (Airbnb,
   TemporadaLivre etc.).
2. **Coletar material.** Prints da galeria de fotos (todas que der) e das telas do anúncio: título,
   capacidade, quartos e camas, comodidades, regras e observações, avaliações, anfitrião e localização.
   Se o anúncio for do Airbnb, também um valor total de estadia com datas (para a conta da taxa).
3. **Entrevista.** Objetivo do site, público, nome, como será apresentado, direções visuais, idioma. Feita
   com `AskUserQuestion`, seguindo a skill `novo-cliente`.
4. **Preparar os dados.** `clientes/<slug>/fonte/` com os prints, `npm run fotos` para recortar
   (`fonte/recorte.json` se a galeria não tiver moldura branca), `dados.md` só com fatos.
5. **Três mockups.** Direções visuais diferentes com o mesmo conteúdo real. Publicar e mandar os links.
6. **Site final.** Combinar o que o usuário escolher (`site.html` ou app React em `site/`). Checar com
   `npm run check` e testar cada interação nova com clique real.
7. **Proposta.** Página + PDF com pacotes ([precos.md](precos.md)), dados do vendedor e próximos passos
   (skill `proposta-comercial`). Conta da taxa só para anúncio do Airbnb; nos outros, comparar o anúncio
   atual com o site usando fatos dos prints.
8. **Envio.** Usuário compartilha os links (menu Share) e manda proposta + site ao proprietário com o texto
   de `mensagens.md`.
9. **Fechamento.** Proprietário escolhe pacote, envia número de WhatsApp, fotos originais e aprova o nome.
10. **Publicação.** Domínio no nome do proprietário, hospedagem com uso comercial permitido
    (ex.: Cloudflare Pages), WhatsApp real no botão, entrega dos acessos.
11. **Registro.** Status e links no `README.md` do cliente; como foi feito em `historico.md`.

## Skills e ferramentas

| Etapa | Usar |
|---|---|
| Todo pedido | `karpathy-guidelines`; chat em `caveman` ultra (nunca em sites, propostas ou docs) |
| Imóvel novo, mockups, site | `novo-cliente`, `frontend-design`, `artifact-design` |
| Componentes de interface | MCP do shadcn (precisa de `ui.shadcn.com` liberado; sem ele, código do registro no GitHub) |
| Bibliotecas e frameworks | Context7, antes de escrever código |
| Proposta e PDF | `proposta-comercial` (`npm run telas`, `npm run pdf`) |
| Configuração do Claude | `update-config`, `session-start-hook` |
| Revisão | ferramenta advisor (Opus) antes de começar e antes de entregar |

Bloqueios conhecidos no ambiente na nuvem: `www.airbnb.com`, `ui.shadcn.com` e `mcp.context7.com` (o
Context7 funciona pelo conector do claude.ai). O Mobbin MCP exige plano pago.

## Histórico dos sites

- [Casa Dez](../clientes/casa-dez/historico.md): tour imersivo, 3 mockups, site final, proposta, site v2 com
  shadcn.
- [Casa 6 Suítes](../clientes/porto-6-suites/historico.md): fotos com marca d'água, 3 mockups com nomes
  genéricos, site final React e proposta com a tabela nova.
- [Casa em Porto de Galinhas](../clientes/porto-coqueiral/historico.md): prints de tablet com avisos por cima
  (caixas por foto), 3 mockups, um por perfil de hóspede (famílias, amigos, casais).
