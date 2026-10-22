---
name: novo-cliente
description: Cria o site de reserva direta de um novo imóvel de temporada para a NEXO Websites — entrevista com o usuário, organização dos prints do anúncio, recorte das fotos, dados.md, três mockups, site final e registro dos links. Use quando o usuário trouxer um imóvel novo, prints de um anúncio (Airbnb, Booking etc.), pedir mockups para um proprietário ou disser "novo cliente".
---

# Novo cliente

Referência pronta: `clientes/casa-dez/` (estrutura, `site.html`, mockups, proposta). Copie e adapte; não
recomece do zero. Siga as regras de conteúdo e de páginas do `CLAUDE.md`.

## 1. Entrevista (grill)
Use `AskUserQuestion`: até 4 perguntas por rodada, cada uma com 2 a 4 opções, a recomendada primeiro com
"(Recommended)". Pergunte só o que mudar o trabalho e não estiver respondido:
- Ação principal do visitante (reserva direta pelo WhatsApp é o padrão e o melhor argumento de venda).
- Hóspede ideal (famílias/grupos, casais/luxo, eventos).
- Nome de marca (sugerir 3 ou usar o que o proprietário já tem) e como será apresentado (celular, notebook).
- 3 direções visuais para os mockups, seções obrigatórias, idiomas.
- Se faltar material, combine esperar os prints antes de desenhar.

## 2. Material
Peça ao usuário prints de: galeria de fotos (o máximo possível), título e capacidade, "Onde você vai
dormir", "O que esse lugar oferece" completo, descrição e "Outras observações", localização/bairro,
nota e avaliações, anfitrião e um valor total de estadia com datas.

Crie `clientes/<slug>/` (slug curto em kebab-case, ex.: `casa-dez`). Salve os prints da galeria em
`fonte/` com o nome `<nº na galeria>-<ambiente>.jpg` (ex.: `34-piscina.jpg`, `19-quarto4.jpg`), usando o
"n de N" e o rótulo de ambiente que aparecem no print.

## 3. Fotos
```bash
npm run fotos -- clientes/<slug>/fonte clientes/<slug>/fotos
```
Confira se todas saíram com o mesmo tamanho e sem borda branca. Se um print não tiver moldura, o script
usa a imagem inteira e avisa "(sem moldura)". Galerias com fundo escuro, barra "n/N" ou setas por cima da foto
(ex.: TemporadaLivre) levam `fonte/recorte.json` com a caixa fixa e, se preciso, recortes extras de colagens;
modelo em `clientes/porto-6-suites/fonte/recorte.json`. Marca d'água da plataforma fica (removê-la é retoque):
anote no README para pedir as originais.

## 4. Dados
Preencha `clientes/<slug>/dados.md` a partir de [modelo-dados.md](modelo-dados.md). Só fatos dos prints ou
informados pelo usuário. Avaliações literais. Marque com `(confirmar)` o que estiver ambíguo — por
exemplo, capacidade diferente entre cabeçalho e descrição.

## 5. Três mockups
- `mockup-<direcao>.html`, mesmo conteúdo real e visuais bem diferentes entre si (paleta tirada das
  próprias fotos, tipografia própria, um momento memorável por página).
- Reaproveite de `clientes/casa-dez/site.html`: consulta de datas → mensagem pronta (`wa.me/?text=` sem
  número), galeria com ampliação, lista de quartos, comodidades, regras, avaliações, localização.
- Fotos com `loading="lazy"` só abaixo da primeira tela; capa sem lazy.
- `npm run check -- clientes/<slug>` sem erros, depois olhe as capturas de `.screens/` uma vez.
- Publique cada mockup com o Artifact (`root: clientes/<slug>`, `files` com as fotos usadas) e anote os
  links no README do cliente.

## 6. Site final
Combine o que o usuário escolher em `site.html`. Cheque de novo e publique — pode reaproveitar o link de
um mockup passando `url`. Atualize o README do cliente.

## 7. Proposta
Siga a skill `proposta-comercial`.

## 8. Fechar a etapa
- `clientes/<slug>/README.md`: status, links publicados, decisões.
- `clientes/<slug>/historico.md`: os pedidos em ordem, skills e MCPs usados em cada um, problemas resolvidos
  e o que ficou em aberto (modelos: `clientes/casa-dez/historico.md`, `clientes/porto-6-suites/historico.md`).
- Linha do cliente na tabela de `README.md` da raiz.
- Commit `feat(<slug>): …` e push.
- Lembre o usuário de compartilhar os links pelo menu Share antes de enviar ao proprietário.
