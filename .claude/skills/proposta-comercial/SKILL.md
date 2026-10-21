---
name: proposta-comercial
description: Cria ou atualiza a proposta comercial da NEXO Websites para um proprietário — página web e PDF A4 com a conta da taxa do Airbnb, pacotes, condições e dados do vendedor. Use quando pedirem proposta, orçamento, preço do site, PDF da proposta, trocar valores ou preencher nome/WhatsApp/e-mail do vendedor.
---

# Proposta comercial

Base: `clientes/casa-dez/proposta.html` (mesma identidade visual do site do cliente). Preços e condições
vêm de `docs/precos.md`, salvo pedido do usuário; se mudar o preço, atualize `docs/precos.md` também.

## Antes de escrever
Confirme que existem (senão pergunte ou use marcador amarelo `<span class="ph">[…]</span>`):
- Nome, WhatsApp e e-mail do vendedor.
- Primeiro nome do anfitrião (está em `dados.md`).
- Um valor total de estadia com datas, tirado do próprio anúncio.
- Link publicado do `site.html` do cliente (README do cliente).

## Conteúdo
1. Cabeçalho: para quem, de quem, data de hoje, validade de 15 dias (data por extenso em pt-BR).
2. Vitrine: captura do site no desktop e no celular + botão "Ver o site funcionando" com o link do Artifact.
3. Ponto de partida: nota, selo, nº de avaliações — o que a casa já tem.
4. O que o site resolve: reserva direta, marca própria, apresentação, menos perguntas repetidas.
5. A conta: total da estadia × taxa do Airbnb (15,5%, até 16% no Brasil) ≈ valor que fica na plataforma;
   comparar com o pacote recomendado. Nota de rodapé com as fontes e "confira no seu painel".
6. O que está no site: checklist + 4 telas de celular.
7. Pacotes: Essencial, Completo (Recomendado), Premium + manutenção opcional.
8. Como funciona (4 passos), condições, contato do vendedor.

Nunca: prometer número de reservas, sugerir desviar hóspedes do Airbnb, oferecer Perfil da Empresa no
Google ou hospedagem grátis da Vercel.

## Telas, PDF e checagem
```bash
npm run telas -- clientes/<slug>/site.html clientes/<slug>/img
npm run check -- clientes/<slug>
npm run pdf -- clientes/<slug>/proposta.html clientes/<slug>/Proposta-<Nome>.pdf
```
O PDF deve ficar com 4 ou 5 páginas, sem bloco cortado no meio (confira com `pdfinfo` ou `pypdf`).

## Publicar
Artifact com `root: clientes/<slug>` e `files` = `img/*.jpg` usados. Se a proposta já tem link, passe o
`url` do README do cliente. Envie o PDF ao usuário (`SendUserFile`) e lembre de compartilhar os links pelo
menu Share.
