#!/bin/bash
# Script para automatizar migraciones TypeORM en Veteralia
# Uso: ./scripts/auto-migrate.sh "NombreDeMigracion"

set -e

MIGRATION_NAME="$1"
if [ -z "$MIGRATION_NAME" ]; then
  echo "Uso: $0 NombreDeMigracion"
  exit 1
fi

# 1. Generar migración
npx typeorm migration:generate src/migrations/${MIGRATION_NAME} -d src/data-source.ts

# 2. Compilar proyecto
yarn build

# 3. Hacer commit y push
cd $(git rev-parse --show-toplevel)
git add backend/src/migrations/*.ts
git commit -m "feat(migrations): auto migration $MIGRATION_NAME"
git push

# 4. Ejecutar migración en Heroku
cd backend
heroku run "npx typeorm migration:run -d dist/data-source.js" -a veteralia-backend

echo "¡Migración automatizada completa!"
