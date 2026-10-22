#!/bin/bash
# Lembra, a cada pedido, de aplicar a skill karpathy-guidelines (pedido do usuário, ver CLAUDE.md).
cat <<'JSON'
{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"Aplique a skill karpathy-guidelines (.claude/skills/karpathy-guidelines/SKILL.md) neste pedido: pense antes e explicite suposições, faça o mínimo que resolve, mude só o necessário e defina como verificar o resultado."}}
JSON
