# NEXO Websites

Sites próprios de reserva direta para imóveis de temporada. A gente monta o site com as fotos reais do
anúncio, apresenta mockups ao proprietário e vende o site pronto, com reserva pelo WhatsApp.

## Clientes

| Cliente | Local | Status | Site | Proposta |
|---|---|---|---|---|
| [Casa Dez](clientes/casa-dez/README.md) | Porto de Galinhas, PE | Proposta pronta; enviar ao anfitrião | [abrir](https://claude.ai/artifact/1bxubUsoibxT8Ryf4bV7ST) | [abrir](https://claude.ai/artifact/WWk2trjf8wFUPzNMj28UW1) |
| [Porto 6 Suítes](clientes/porto-6-suites/README.md) (nome provisório) | Porto de Galinhas, PE | 3 mockups; escolher a direção | [placas](https://claude.ai/artifact/K7rTYKmJeCZcpCxTnURmXb) · [cinema](https://claude.ai/artifact/KPDPNvxnZxApSqPCiUEavM) · [tropical](https://claude.ai/artifact/8DWrYG2sXYPdQLgf1FHHyn) | — |

## Como trabalhar

```bash
npm install                                   # ferramentas (sharp, playwright-core)
npm run preview -- clientes/casa-dez          # ver as páginas em http://localhost:4321
npm run check -- clientes/casa-dez            # checar celular e desktop
npm run pdf -- clientes/casa-dez/proposta.html clientes/casa-dez/Proposta-Casa-Dez.pdf
```

Os scripts de navegador usam o Chromium em `/opt/pw-browsers/chromium` (nuvem), `CHROME_PATH` ou o Google
Chrome instalado.

- Fluxo de venda, do primeiro contato à publicação: [docs/processo.md](docs/processo.md)
- Endereço próprio (Cloudflare Pages + domínio): [docs/publicacao.md](docs/publicacao.md) — `npm run build:web`
- Pacotes e preços: [docs/precos.md](docs/precos.md)
- Regras para o Claude: [CLAUDE.md](CLAUDE.md) e skills em `.claude/skills/`
