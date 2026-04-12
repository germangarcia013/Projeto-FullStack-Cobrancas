#!/bin/sh
echo "Esperando banco..."
npx wait-port db:5432

echo "Rodando migrations..."
npx knex migrate:latest

echo "Iniciando app..."
node src/index.js