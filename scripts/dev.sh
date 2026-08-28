#!/usr/bin/env bash

set -euo pipefail

PORT="${1:-8000}"

echo "Prévia local do Junja: http://127.0.0.1:${PORT}"
echo "Edite os arquivos e recarregue o navegador para ver as mudanças."
echo "Encerre o servidor com Ctrl+C."

python3 -m http.server "$PORT" --bind 127.0.0.1
