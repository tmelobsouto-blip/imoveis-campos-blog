# Publicar com endereço próprio

Os links `claude.ai/artifact/...` servem para prévia. Para mandar ao proprietário um endereço profissional,
publique a pasta `dist/` (gerada por `npm run build:web`) no Cloudflare Pages:

| Página | Endereço |
|---|---|
| NEXO Websites | `https://<domínio>/` |
| Site do cliente | `https://<domínio>/casa-dez/` |
| Proposta | `https://<domínio>/casa-dez/proposta/` |
| PDF | `https://<domínio>/casa-dez/Proposta-Casa-Dez.pdf` |
| Mockups | `https://<domínio>/casa-dez/mockup-tropical/` etc. |

As páginas dos clientes saem com `noindex` (não aparecem no Google) até o proprietário aprovar.

## 1. Cloudflare Pages (grátis, permite uso comercial)
1. Crie uma conta em https://dash.cloudflare.com.
2. **Workers & Pages → Create → Pages → Connect to Git**, autorize o GitHub e escolha este repositório.
3. Configure:
   - Production branch: `main` (ou a branch onde estão as mudanças)
   - Build command: `npm run build:web`
   - Build output directory: `dist`
   - Root directory: deixe vazio (a versão do Node vem do arquivo `.node-version`)
4. O nome do projeto vira o endereço: com `nexo-websites`, os links ficam
   `https://nexo-websites.pages.dev/casa-dez/` e `https://nexo-websites.pages.dev/casa-dez/proposta/`.
5. A cada push na branch configurada, o Cloudflare publica de novo sozinho.

## 2. Domínio próprio (recomendado, cerca de R$ 40 por ano)
1. Veja se `nexowebsites.com.br` (ou outro nome) está livre em https://registro.br e registre com seu CPF ou
   CNPJ.
2. No projeto do Cloudflare Pages: **Custom domains → Set up a custom domain** e informe o domínio.
3. Siga as instruções do Cloudflare para apontar o DNS (no Registro.br, troque os servidores DNS pelos do
   Cloudflare). O HTTPS é automático.
4. Links finais: `https://nexowebsites.com.br/casa-dez/` e `https://nexowebsites.com.br/casa-dez/proposta/`.

## Depois de publicar
- Troque os links em `clientes/<slug>/mensagens.md` e no README do cliente pelos endereços novos.
- Rode `npm run build:web` localmente para conferir antes de subir; `dist/` não vai para o git.
- Não use a Vercel no plano gratuito: ele é só para uso não comercial.
