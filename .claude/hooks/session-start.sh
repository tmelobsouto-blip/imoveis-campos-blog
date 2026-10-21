#!/bin/bash
# Prepara sessões do Claude Code na nuvem: ferramentas da raiz e apps de tour dos clientes.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

npm install --no-audit --no-fund

for app in clientes/*/tour; do
  if [ -f "$app/package.json" ]; then
    npm install --prefix "$app" --no-audit --no-fund
  fi
done

# Scripts de navegador (check, telas, pdf) usam o Chromium pré-instalado do ambiente.
if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export CHROME_PATH=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
