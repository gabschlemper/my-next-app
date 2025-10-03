# 🔧 Configuração do SonarCloud no GitHub

Este documento explica como configurar o SonarCloud para rodar automaticamente em Pull Requests.

## 📋 **Pré-requisitos**

### 1. Configuração no SonarCloud.io

1. Acesse [SonarCloud.io](https://sonarcloud.io)
2. Faça login com sua conta do GitHub
3. Clique em "Import an organization from GitHub"
4. Selecione sua organização/usuário do GitHub
5. Import o repositório `my-next-app`

### 2. Configuração de Secrets no GitHub

No seu repositório GitHub, vá em **Settings → Secrets and variables → Actions** e adicione:

- `SONAR_TOKEN`: Token gerado no SonarCloud
  - No SonarCloud: **My Account → Security → Generate Tokens**
  - Nome: `github-actions-my-next-app`
  - Tipo: `User Token`
  - Copie o token e adicione no GitHub Secrets

## 🚀 **Como Funciona**

### Automatização em Pull Requests

O workflow `.github/workflows/branch-protection.yml` será executado automaticamente quando:

- ✅ Abrir um novo Pull Request para `main`
- ✅ Fazer novos commits em um PR existente
- ✅ Marcar um Draft PR como "Ready for review"

### Verificações Realizadas

1. **ESLint**: Análise estática do código
2. **Testes Unitários**: Jest + Testing Library
3. **Coverage**: Cobertura de testes
4. **Build**: Verificação se o projeto compila
5. **SonarCloud**: Análise de qualidade e segurança

### Quality Gate

O SonarCloud irá verificar:

- **Bugs**: Código que pode causar comportamento inesperado
- **Vulnerabilities**: Possíveis falhas de segurança
- **Code Smells**: Código que funciona mas pode ser melhorado
- **Coverage**: Cobertura de testes (meta: >80%)
- **Duplicação**: Código duplicado (meta: <3%)

## 🛠️ **Comandos Locais**

### Rodar análise local

```bash
# Instalar sonar-scanner globalmente (apenas uma vez)
npm install -g sonarqube-scanner

# Configurar variável de ambiente
export SONAR_TOKEN="seu_token_aqui"

# Executar script local
./scripts/sonar-local.sh
```

### Verificações manuais antes do PR

```bash
# Rodar todos os testes
npm run test:ci

# Verificar linting
npm run lint

# Gerar coverage
npm run test:coverage

# Build do projeto
npm run build
```

## 📊 **Dashboard e Relatórios**

### Locais para verificar resultados:

1. **GitHub PR**: Checks automáticos + comentário do bot
2. **SonarCloud**: https://sonarcloud.io/project/overview?id=gabschlemper_my-next-app
3. **GitHub Actions**: Logs detalhados dos workflows

### Interpretando o Quality Gate:

- 🟢 **Passed**: Todos os critérios atendidos, pode fazer merge
- 🔴 **Failed**: Existem issues que precisam ser corrigidas
- 🟡 **Warning**: Issues menores, mas merge permitido

## 🔒 **Branch Protection Rules**

Configure no GitHub em **Settings → Branches → Add rule**:

```
Branch name pattern: main

☑️ Require a pull request before merging
☑️ Require status checks to pass before merging
  - Quality Checks
  - SonarCloud Analysis
☑️ Require branches to be up to date before merging
☑️ Restrict pushes that create files
```

## 🚨 **Troubleshooting**

### Erro: "SonarCloud token not found"

- Verifique se `SONAR_TOKEN` está configurado nos GitHub Secrets
- Token deve ter permissões adequadas no SonarCloud

### Erro: "Quality Gate failed"

- Acesse o relatório do SonarCloud para detalhes
- Corrija os issues apontados
- Faça novo commit para re-executar

### Pre-commit hooks não funcionam

```bash
# Re-instalar hooks do Husky
npm run prepare
chmod +x .husky/pre-commit
```

## 📈 **Métricas de Qualidade**

### Metas do projeto:

- **Coverage**: > 80%
- **Maintainability Rating**: A
- **Reliability Rating**: A
- **Security Rating**: A
- **Duplicated Lines**: < 3%

### Como melhorar as métricas:

1. **Escrever mais testes** para aumentar coverage
2. **Refatorar código duplicado**
3. **Corrigir code smells** apontados pelo SonarCloud
4. **Adicionar documentação** em funções complexas

---

📝 **Documentação adicional**:

- [SonarCloud Docs](https://docs.sonarcloud.io/)
- [GitHub Actions](https://docs.github.com/en/actions)
