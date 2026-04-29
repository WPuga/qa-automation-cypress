import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Gera dados únicos para cada execução usando timestamp
function gerarDadosCadastro() {
  const timestamp = Date.now();
  return {
    nome: `Teste QA`,
    email: `teste_cypress_${timestamp}@testmail.com`,
    senha: "Senha@Teste123",
    firstName: "Teste",
    lastName: "QA",
    company: "Empresa Teste",
    address: "Rua dos Testes, 123",
    country: "United States",
    state: "California",
    city: "Los Angeles",
    zipcode: "90001",
    mobile: "11999999999"
  };
}

Given("que eu acesso a página principal", () => {
  cy.visit("/");
});

When("eu acesso a página de login", () => {
  cy.get('a[href="/login"]').click();
});

When("realizo um novo cadastro no site", () => {
  const dados = gerarDadosCadastro();

  // Preenche o formulário inicial de signup
  cy.get('[data-qa="signup-name"]').type(dados.nome);
  cy.get('[data-qa="signup-email"]').type(dados.email);
  cy.get('[data-qa="signup-button"]').click();

  // Preenche o formulário completo de registro
  cy.get("#id_gender1").check();
  cy.get('[data-qa="password"]').type(dados.senha);
  cy.get('[data-qa="days"]').select("15");
  cy.get('[data-qa="months"]').select("June");
  cy.get('[data-qa="years"]').select("1990");

  cy.get('[data-qa="first_name"]').type(dados.firstName);
  cy.get('[data-qa="last_name"]').type(dados.lastName);
  cy.get('[data-qa="company"]').type(dados.company);
  cy.get('[data-qa="address"]').type(dados.address);
  cy.get('[data-qa="country"]').select(dados.country);
  cy.get('[data-qa="state"]').type(dados.state);
  cy.get('[data-qa="city"]').type(dados.city);
  cy.get('[data-qa="zipcode"]').type(dados.zipcode);
  cy.get('[data-qa="mobile_number"]').type(dados.mobile);

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
