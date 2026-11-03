#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

if ! command -v node >/dev/null || ! command -v npm >/dev/null; then
  printf 'Node.js (version 20 ou ultérieure recommandée) et npm sont nécessaires.\n' >&2
  exit 1
fi

MODE="${1:-dev}"
case "$MODE" in
  dev|build|preview) ;;
  *) printf 'Utilisation : bash lancer.sh [dev|build|preview]\n' >&2; exit 1 ;;
esac

if [[ ! -d node_modules || "${REINSTALLER:-0}" == "1" ]]; then
  printf 'Installation des dépendances depuis package-lock.json…\n'
  npm ci --no-audit --no-fund
fi

case "$MODE" in
  dev)
    printf '\nSmart Wewa : http://localhost:3000\nProcessus : http://localhost:3000/processus-enregistrement\nCtrl+C pour arrêter.\n\n'
    exec npm run dev -- --port 3000 --strictPort
    ;;
  build) exec npm run build ;;
  preview)
    npm run build
    printf '\nAperçu : http://localhost:3000\n\n'
    exec npm run serve -- --port 3000 --strictPort
    ;;
esac
