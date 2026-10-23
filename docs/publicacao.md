# Publicar com endereço próprio

Os links `claude.ai/artifact/...` servem para prévia. Para mandar ao proprietário um endereço profissional,
publique a pasta `dist/`, gerada por `npm run build:web`:

| Página | Endereço |
|---|---|
| NEXO Websites | `https://<domínio>/` |
| Site do cliente | `https://<domínio>/porto-coqueiral/` |
| Proposta | `https://<domínio>/porto-coqueiral/proposta/` |
| PDF | `https://<domínio>/porto-coqueiral/Proposta-Casa-em-Porto-de-Galinhas.pdf` |
| Mockups React (um por estilo) | `https://<domínio>/malawi-muro-alto/noite/` (também `azulejo/` e `rede/`) |
| Mockups | `https://<domínio>/casa-dez/mockup-tropical/` etc. |

O build inclui a página da NEXO e todos os clientes: `site.html` ou o site React em `site/` (o build dele roda
sozinho), a proposta, o PDF e os mockups. Mockups marcados como "descartado" no README do cliente ficam de
fora. Os links `claude.ai/artifact` listados no README viram caminhos do próprio domínio, e as páginas dos
clientes saem com `noindex` (não aparecem no Google) até o proprietário aprovar.

## 1. Netlify (grátis, permite uso comercial)

O plano gratuito aceita uso comercial: dá para cobrar do proprietário pela criação e pela manutenção do site,
mas não revender a hospedagem ([fórum do Netlify](https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545/2)).
Confira os limites de uso do plano no painel.

### Opção A — arrastar a pasta (sem ligar ao GitHub)
1. Rode `npm run build:web` (ou use o .zip `nexo-websites-netlify.zip` gerado a partir da `dist/`) e
   descompacte: o Netlify só aceita a **pasta**, não o .zip.
2. Entre em https://app.netlify.com → **Add new project → Deploy manually** (ou https://app.netlify.com/drop)
   e arraste a pasta `nexo-websites` (o conteúdo da `dist/`).
3. Em **Project configuration → Change project name**, escolha o nome: com `nexo-websites`, os links ficam
   `https://nexo-websites.netlify.app/porto-coqueiral/` e `.../porto-coqueiral/proposta/`.
4. Para atualizar: gere a pasta de novo e arraste em **Deploys** (área de upload no fim da página).

### Opção B — ligar ao GitHub (publica sozinho a cada push)
1. **Add new project → Import an existing project → GitHub** e escolha este repositório e a branch.
2. As configurações vêm do `netlify.toml` da raiz: build `npm run build:web`, pasta `dist`. A versão do Node
   vem do `.node-version`.
3. Troque o nome do projeto como no passo 3 da opção A.

### Domínio próprio no Netlify
1. Registre o domínio (ex.: `nexowebsites.com.br`) em https://registro.br, cerca de R$ 40 por ano.
2. No projeto: **Domain management → Add a domain** e siga as instruções de DNS. O HTTPS é automático.

## 2. Cloudflare Pages (alternativa, também grátis e com uso comercial)
1. https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git** e escolha o repositório.
2. Build command `npm run build:web`, build output directory `dist`, root directory vazio.
3. Com o projeto `nexo-websites`, os links ficam `https://nexo-websites.pages.dev/porto-coqueiral/`.
4. Domínio próprio: **Custom domains → Set up a custom domain**.

## Depois de publicar
- Troque os links em `clientes/<slug>/mensagens.md` e no README do cliente pelos endereços novos.
- `dist/` não vai para o git; rode `npm run build:web` localmente para conferir antes de subir.
- Não use a Vercel no plano gratuito: ele é só para uso não comercial.
