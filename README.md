# NEXO Websites

Sites próprios de reserva direta para imóveis de temporada. A gente monta o site com as fotos reais do
anúncio, apresenta mockups ao proprietário e vende o site pronto, com reserva pelo WhatsApp.

## Clientes

| Cliente | Local | Status | Site | Proposta |
|---|---|---|---|---|
| [Casa Dez](clientes/casa-dez/README.md) | Porto de Galinhas, PE | Proposta pronta; enviar ao anfitrião | [abrir](https://claude.ai/artifact/1bxubUsoibxT8Ryf4bV7ST) | [abrir](https://claude.ai/artifact/WWk2trjf8wFUPzNMj28UW1) |
| [Casa 6 Suítes](clientes/porto-6-suites/README.md) (nome provisório) | Porto de Galinhas, PE | Site e proposta prontos; enviar ao anunciante | [abrir](https://claude.ai/artifact/K7rTYKmJeCZcpCxTnURmXb) | [abrir](https://claude.ai/artifact/6trukqhmp4BTq1L2kcavrQ) |
| [Casa em Porto de Galinhas](clientes/porto-coqueiral/README.md) (nome provisório) | Porto de Galinhas, PE | Mockup e proposta prontos; enviar ao anfitrião | [abrir](https://claude.ai/artifact/CxDr8RPpgiEcK4Ds6kHfNM) | [abrir](https://claude.ai/artifact/6PERsmh3xYu1TQAzVPTZ8y) |
| [Bangalô Muro Alto](clientes/malawi-muro-alto/README.md) (nome provisório) | Muro Alto, Porto de Galinhas, PE | 3 mockups prontos; escolher um estilo | [noite](https://claude.ai/artifact/NHVcZ7tMua6xqA948Z9TPR) · [azulejo](https://claude.ai/artifact/4mCmVcXNd29vBApsqwGcq3) · [areia](https://claude.ai/artifact/VkWUpJwy8xNBfm9yziCnPy) | — |

## Como trabalhar

```bash
npm install                                   # ferramentas (sharp, playwright-core)
npm run preview -- clientes/casa-dez          # ver as páginas em http://localhost:4321
npm run check -- clientes/casa-dez            # checar celular e desktop
npm run pdf -- clientes/casa-dez/proposta.html clientes/casa-dez/Proposta-Casa-Dez.pdf
```

Os scripts de navegador usam o Chromium em `/opt/pw-browsers/chromium` (nuvem), `CHROME_PATH` ou o Google
Chrome instalado.

- Fluxo de venda, do primeiro contato à publicação, skills e MCPs: [docs/processo.md](docs/processo.md)
- Como cada site foi feito: [Casa Dez](clientes/casa-dez/historico.md) ·
  [Casa 6 Suítes](clientes/porto-6-suites/historico.md) ·
  [Casa em Porto de Galinhas](clientes/porto-coqueiral/historico.md) ·
  [Bangalô Muro Alto](clientes/malawi-muro-alto/historico.md)
- Endereço próprio (Netlify ou Cloudflare Pages + domínio): [docs/publicacao.md](docs/publicacao.md) — `npm run build:web`
- Pacotes e preços: [docs/precos.md](docs/precos.md)
- Regras para o Claude: [CLAUDE.md](CLAUDE.md) e skills em `.claude/skills/`
