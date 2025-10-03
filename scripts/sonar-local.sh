#!/bin/bash

# Script para rodar SonarQube localmente antes do PR
# Uso: ./scripts/sonar-local.sh

set -e  # Exit on any error

echo "🔍 Rodando análise SonarQube local..."

# Verifica se SONAR_TOKEN está definido
if [ -z "${SONAR_TOKEN}" ]; then
    echo "❌ SONAR_TOKEN não está definido. Por favor, configure a variável de ambiente:"
    echo "   export SONAR_TOKEN='seu_token_aqui'"
    exit 1
fi

# Verifica se o sonar-scanner está instalado
if ! command -v sonar-scanner &> /dev/null; then
    echo "❌ sonar-scanner não encontrado. Instalando..."
    npm install -g sonarqube-scanner
fi

# Roda os testes com coverage
echo "🧪 Rodando testes com coverage..."
npm run test:coverage

# Roda o linter
echo "🔍 Rodando ESLint..."
npm run lint -- --format json --output-file eslint-report.json

# Executa a análise SonarQube
echo "📊 Executando análise SonarQube..."
sonar-scanner \
  -Dsonar.projectKey=gabschlemper_my-next-app \
  -Dsonar.sources=src \
  -Dsonar.host.url=https://sonarcloud.io \
  -Dsonar.login="${SONAR_TOKEN}"

echo "✅ Análise SonarQube concluída!"
echo "🔗 Verifique os resultados em: https://sonarcloud.io/project/overview?id=gabschlemper_my-next-app"