# Casa em Porto de Galinhas (pasta `porto-coqueiral`) — Porto de Galinhas, PE

**Status:** mockup no estilo da Casa 6 (React + shadcn/ui) e proposta prontos para envio ao anfitrião
(Francisco). Mensagem de envio em [mensagens.md](mensagens.md). Falta compartilhar os links como públicos
(menu Share). Os 3 mockups por perfil foram descartados a pedido do usuário.

- Anúncio de origem: TemporadaLivre, Ref. 75328, "Casa com 5 suítes em Porto de galinhas" (a plataforma é
  só a fonte e não aparece no site)
- Fatos usados nos textos: [dados.md](dados.md)
- Como o site foi feito: [historico.md](historico.md)

## Links publicados (Artifacts claude.ai)

Republicar sempre com o `url` abaixo. Mockup atual: rodar o build e publicar `site/dist/index.html` com
`root = clientes/porto-coqueiral/site/dist` e `files` = `app.js`, `app.css` e `fotos/*`. Mockups HTML:
`root = clientes/porto-coqueiral` e só as fotos que a página usa.

| Arquivo | Artifact | Observação |
|---|---|---|
| `site/dist/` (`npm --prefix clientes/porto-coqueiral/site run build`) | https://claude.ai/artifact/CxDr8RPpgiEcK4Ds6kHfNM | **mockup atual**, estilo Casa 6; `root = site/dist` |
| `proposta.html` | https://claude.ai/artifact/6PERsmh3xYu1TQAzVPTZ8y | usa `img/`; PDF em `Proposta-Casa-em-Porto-de-Galinhas.pdf` |
| `mockup-familias.html` | https://claude.ai/artifact/WeyRNhzmnsq8gnto2smbyc | descartado · famílias, caderno de férias |
| `mockup-amigos.html` | https://claude.ai/artifact/MT9FVVzU3btQGh9rhDdM9k | descartado · amigos, azulejo à noite |
| `mockup-casais.html` | https://claude.ai/artifact/SSkB3qDDkDcFsX5iHrchMW | descartado · casais, linho e palha |

Todos são privados até o usuário compartilhar pelo menu Share. Os descartados continuam no ar até o usuário
pedir para apagar.

## Decisões
- Objetivo: reserva direta pelo WhatsApp (sem número até o proprietário fornecer).
- Nome: **Casa em Porto de Galinhas** (sugestão nossa; depende da aprovação do proprietário).
- **Mockup atual (estilo Casa 6, mais moderno e elegante, com mais fotos).** Mesma estrutura do site da
  Casa 6: capa dividida com reserva no computador, faixa de números, galeria com atalhos por ambiente,
  miniaturas e foto ampliada, reserva fixa ao lado, gaveta de reserva no celular e perguntas em acordeão.
  Identidade própria "cal e madeira" (off-white, azul-marinho do sofá, madeira do muro), Fraunces +
  Plus Jakarta Sans. A mais: capa com três fotos trocando, mosaico de abertura, grade com as 28 fotos por
  ambiente e seções com fotos de lazer, sala e noite. Sem as placas e a pastilha da Casa 6 (eram daquela
  casa).
- Descartados: um mockup por perfil, com o mesmo conteúdo real e visuais diferentes:
  1. **Famílias com crianças — caderno de férias.** Papel quadriculado, fotos coladas com fita e anotações à
     mão; suítes com ícones de cama; reserva conta adultos, crianças e pet (17 bolinhas = 17 lugares).
     Fredoka + Lexend + Caveat.
  2. **Grupos de amigos — azulejo à noite.** Fundo da noite das fotos, faixas de azulejo desenhadas em CSS
     (inspiradas na parede da churrasqueira), capa que alterna dia e noite na mesma churrasqueira, números
     grandes (17 pessoas, 5 suítes, 7 banheiros). Big Shoulders Display + Archivo.
  3. **Casais e descanso — linho e palha.** Capa num círculo trançado como os pratos de palha da sala, com
     três cantos da casa trocando devagar; "Sossego pleno." da avaliação da Rejane; cinco suítes com cama de
     casal. Instrument Serif + Hanken Grotesk.
- Só português. Preço da diária não aparece. Endereço exato fica fora (só o bairro, Loteamento Porto
  Coqueiral); FAQ diz que festas não são permitidas, como no anúncio.

## Fotos
28 das 86 fotos do anúncio, de prints do tablet. `fonte/recorte.json` tem a caixa da foto, caixas próprias para
os prints com aviso por cima (fotos 02 a 16 e a 22, sem a placa com telefone) e recortes extras fora da marca
d'água para capas e destaques. A marca d'água "TemporadaLivre" fica nas fotos inteiras da galeria (removê-la
seria retoque).

Pedir ao proprietário: fotos originais (sem marca d'água) e fotos das suítes, da cozinha e dos banheiros, que
não estão entre as 28.

## Confirmar com o anunciante
- Camas da suíte 1 ("uma de solteiro é uma bicama": lido como solteiro **e** bicama).
- Se há ar-condicionado em todas as suítes (o anúncio diz 5 aparelhos).
