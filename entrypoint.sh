#!/bin/bash
set -e

echo "Waiting for PostgreSQL to be ready..."

# Espera o Postgres inicializar
until npx prisma db push --accept-data-loss || npx prisma migrate deploy; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "Database is ready!"

# Gera cliente Prisma
npx prisma generate

echo "Starting application..."
exec "$@"
