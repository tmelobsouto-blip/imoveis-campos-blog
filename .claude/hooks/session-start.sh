#!/bin/bash
# Prepara sessões do Claude Code na nuvem: ferramentas da raiz e apps dos clientes (tour, site-v2).
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

npm install --no-audit --no-fund

for manifest in clientes/*/*/package.json; do
  if [ -f "$manifest" ]; then
    npm install --prefix "$(dirname "$manifest")" --no-audit --no-fund
  fi
done

# Scripts de navegador (check, telas, pdf) usam o Chromium pré-instalado do ambiente.
if [ -x /opt/pw-browsers/chromium ] && [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export CHROME_PATH=/opt/pw-browsers/chromium' >> "$CLAUDE_ENV_FILE"
fi
