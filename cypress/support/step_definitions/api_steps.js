import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;

When("eu envio um GET para {string}", (url) => {
  cy.request({
    method: 'GET',
    url: url,
    failOnStatusCode: false
  }).then((response) => {
    apiResponse = response;
  });
});

Then("o status code da resposta deve ser {int}", (statusCode) => {
  expect(apiResponse.status).to.eq(statusCode);
});

Then("o campo {string} da estrutura {string} deve ser exibido", (fieldName, structureName) => {
  const content = apiResponse.body.data[structureName][fieldName];
  cy.log(`Validando campo: ${fieldName}`);
  expect(content).to.not.be.undefined;
});
