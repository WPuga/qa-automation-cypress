import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Gera dados dinâmicos para o cadastro
function gerarDadosUsuario() {
  const sufixo = Date.now();
  return {
    nomeCompleto: `qatest Teste ${sufixo}`,
    email: `qatest.automacao.${sufixo}@provedor.com.br`,
    senha: "SenhaSegura#2024",
    primeiroNome: "qatest",
    sobrenome: "testtes",
    empresa: "QA Solutions BR",
    endereco: "Avenida Paulista, 1000 - Bela Vista",
    pais: "United States",
    estado: "São Paulo (Simulado)", 
    cidade: "São Paulo",
    cep: "01310-100",
    celular: "11988887777"
  };
}

Given("que eu acesso a página principal", () => {
  cy.visit("/");
});

When("eu acesso a página de login", () => {
  cy.get('a[href="/login"]').click();
});

When("realizo um novo cadastro no site", () => {
  const usuario = gerarDadosUsuario();

  // Preenche o formulário de Cadastro Inicial
  cy.get('[data-qa="signup-name"]').type(usuario.nomeCompleto);
  cy.get('[data-qa="signup-email"]').type(usuario.email);
  cy.get('[data-qa="signup-button"]').click();

  // Preenche os Detalhes da Conta
  cy.get("#id_gender1").check();
  cy.get('[data-qa="password"]').type(usuario.senha);
  cy.get('[data-qa="days"]').select("10");
  cy.get('[data-qa="months"]').select("March");
  cy.get('[data-qa="years"]').select("1995");

  // Preenche Informações de Endereço
  cy.get('[data-qa="first_name"]').type(usuario.primeiroNome);
  cy.get('[data-qa="last_name"]').type(usuario.sobrenome);
  cy.get('[data-qa="company"]').type(usuario.empresa);
  cy.get('[data-qa="address"]').type(usuario.endereco);
  cy.get('[data-qa="country"]').select(usuario.pais);
  cy.get('[data-qa="state"]').type(usuario.estado);
  cy.get('[data-qa="city"]').type(usuario.cidade);
  cy.get('[data-qa="zipcode"]').type(usuario.cep);
  cy.get('[data-qa="mobile_number"]').type(usuario.celular);

  cy.get('[data-qa="create-account"]').click();
});

Then("eu devo ver a mensagem de conta criada com sucesso", () => {
  cy.get('[data-qa="account-created"]').should("be.visible");
  cy.get('[data-qa="continue-button"]').click();
});

Then("eu devo ver a mensagem de login realizado com sucesso", () => {
  cy.contains("Logged in as").should("be.visible");
});

Then("eu excluo a conta criada para limpeza", () => {
  cy.get('a[href="/delete_account"]').click();
  cy.get('[data-qa="account-deleted"]').should("be.visible");
  cy.get('[data-qa="continue-button"]').click();
});

When("eu busco pelo produto {string}", (produto) => {
  cy.get('a[href="/products"]').click();
  cy.get('#search_product').type(produto);
  cy.get('#submit_search').click();
});

Then("eu devo ver resultados relacionados à busca", () => {
  cy.get('.features_items').should("be.visible");
  cy.get('.productinfo').should("have.length.at.least", 1);
});

When("adiciono o produto ao carrinho", () => {
  cy.get('.add-to-cart').first().click();
  cy.get('.modal-footer > .btn').click();
});

When("visualizo o carrinho", () => {
  cy.get('a[href="/view_cart"]').first().click();
});

Then("o produto deve estar presente no carrinho com as informações corretas", () => {
  cy.get('#cart_info_table').should("be.visible");
  cy.get('.cart_description').should("have.length.at.least", 1);
});
