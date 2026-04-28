import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que eu acesso a página principal", () => {
  cy.visit("/");
});

When("eu acesso a página de login", () => {
  cy.get('a[href="/login"]').click();
});

When("realizo o login com o usuário {string} e senha {string}", (email, password) => {
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

Then("eu devo ver a mensagem de login realizado com sucesso", () => {
  cy.contains("Logged in as").should("be.visible");
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
