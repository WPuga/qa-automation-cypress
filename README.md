# Automação de Testes - Cypress + Cucumber

Este repositório contém a automação de testes desenvolvida para o desafio técnico, cobrindo tanto testes de interface (Web) quanto de API. O objetivo foi criar uma estrutura robusta, fácil de manter e que utilizasse as melhores práticas de BDD.

## 🛠️ O que foi utilizado?

Para este projeto, escolhi as seguintes tecnologias:
- **Cypress**: Para a execução dos testes.
- **Cucumber (Gherkin)**: Para a escrita dos cenários em uma linguagem mais próxima do negócio.
- **JavaScript**: Linguagem base para os scripts.
- **@badeball/cypress-cucumber-preprocessor**: Para integrar o Cucumber ao Cypress.

## ⚙️ Como configurar o projeto

1. **Clone ou baixe o projeto** e abra no seu editor favorito (eu usei o VS Code).
2. **Instale as dependências**: No terminal, dentro da pasta do projeto, rode:
   ```bash
   npm install
   ```

## 🚀 Rodando os testes

Dá para rodar os testes de dois jeitos:

### 1. Interface Visual
Se quiser ver o navegador abrindo e acompanhar o passo a passo:
```bash
npm run cypress:open
```

### 2. Linha de Comando (Headless)
Se quiser apenas o resultado final no terminal (bom para CI/CD):
```bash
npm test
```

## 📂 Organização do Projeto

Tentei deixar tudo bem organizado para facilitar a leitura:
- `cypress/e2e/`: Aqui ficam os arquivos `.feature` com os cenários em português.
- `cypress/support/step_definitions/`: Onde a "mágica" acontece, com a implementação de cada passo do Gherkin.
- `cypress.config.js`: Configurações globais do ambiente.

## 📝 O que foi testado?

### Testes Web
O alvo foi o site [Automation Exercise](https://www.automationexercise.com). Os fluxos cobertos foram:
- Login de usuário.
- Pesquisa de produtos.
- Adição de itens ao carrinho e conferência no checkout.

*Obs: Se o login `rennierwesley@gmail.com` der algum erro de credenciais, pode ser que o site tenha limpado a base de dados. Se isso acontecer, é só criar um novo usuário rapidinho no site e atualizar o arquivo `.feature`.*

### Testes de API
Fiz a validação de um endpoint do Trello (`https://api.trello.com/1/actions/592f11060f95a3d3d46a987a`):
- Verificação do Status Code (200 OK).
- Validação se o campo `name` está presente dentro do objeto `list` no JSON de retorno.

## 🤖 CI/CD e Evidências

Este projeto conta com uma pipeline de CI/CD via **GitHub Actions**. Toda vez que você fizer um `push` ou abrir um `pull request` para a branch principal, os testes serão executados automaticamente em um ambiente Linux.

### Onde encontrar as evidências?
Após a execução da pipeline no GitHub, você pode acessar a aba **Actions**, clicar na execução desejada e, no final da página, encontrará os **Artifacts**:
- **cypress-videos**: Gravação completa de todos os testes executados.
- **cypress-screenshots**: Prints tirados automaticamente caso algum teste falhe.

Isso garante que tenhamos provas da execução e facilita muito o debug em caso de erros no ambiente de integração.

---
Feito com foco em qualidade e organização.
