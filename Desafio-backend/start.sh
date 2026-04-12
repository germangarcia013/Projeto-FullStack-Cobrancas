echo "Esperando banco..."
npx wait-port db:5432

echo "Rodando migrations..."
npm run migrate

echo "Iniciando app..."
node src/index.js