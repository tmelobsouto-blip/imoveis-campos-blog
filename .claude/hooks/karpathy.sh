#!/bin/bash
# Lembra, a cada pedido, das skills e ferramentas padrão do projeto (pedido do usuário, ver CLAUDE.md).
cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"Padrão do projeto (CLAUDE.md): aplique karpathy-guidelines e ponytail (menor mudança) em código; use Context7 se houver biblioteca/framework e a skill shadcn + MCP do shadcn se houver componentes de interface; responda no chat em caveman ultra, em português (nunca em sites, propostas, mensagens, docs ou commits)."}}
JSON
