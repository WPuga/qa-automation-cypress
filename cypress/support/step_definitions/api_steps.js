import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;

// ─── REQUEST ────────────────────────────────────────────────────────────────

When("eu envio um GET para {string}", (url) => {
  cy.request({
    method: "GET",
    url: url,
    failOnStatusCode: false,
  }).then((response) => {
    apiResponse = response;
  });
});

// ─── STATUS CODE ─────────────────────────────────────────────────────────────

Then("o status code da resposta deve ser {int}", (statusCode) => {
  expect(apiResponse.status).to.eq(statusCode);
});

// ─── CAMPO EXISTE ─────────────────────────────────────────────────────────────

Then(
  "o campo {string} da estrutura {string} deve ser exibido",
  (fieldName, structureName) => {
    const content = apiResponse.body?.data?.[structureName]?.[fieldName];
    cy.log(`[API] ${structureName}.${fieldName} = ${content}`);
    expect(content, `Campo "${fieldName}" não encontrado em "${structureName}"`).to.not.be.undefined;
  }
);

// ─── TIPO DO CAMPO ────────────────────────────────────────────────────────────

Then(
  "o campo {string} da estrutura {string} deve ser do tipo {string}",
  (fieldName, structureName, expectedType) => {
    const content = apiResponse.body?.data?.[structureName]?.[fieldName];
    const actualType = typeof content;
    cy.log(`[API] Tipo de ${structureName}.${fieldName}: ${actualType}`);
    expect(actualType).to.eq(
      expectedType,
      `Esperado tipo "${expectedType}", mas encontrado "${actualType}"`
    );
  }
);

// ─── CAMPO NÃO VAZIO ─────────────────────────────────────────────────────────

Then(
  "o campo {string} da estrutura {string} não deve estar vazio",
  (fieldName, structureName) => {
    const content = apiResponse.body?.data?.[structureName]?.[fieldName];
    cy.log(`[API] Valor de ${structureName}.${fieldName}: "${content}"`);
    expect(content).to.not.be.empty;
  }
);

// ─── CAMPOS OBRIGATÓRIOS NA RAIZ ─────────────────────────────────────────────

Then(
  "a resposta deve conter os campos obrigatórios {string}",
  (camposString) => {
    const campos = camposString.split(",").map((c) => c.trim());
    campos.forEach((campo) => {
      expect(
        apiResponse.body,
        `Campo obrigatório "${campo}" ausente na resposta`
      ).to.have.property(campo);
      cy.log(`[API] Campo obrigatório encontrado: ${campo}`);
    });
  }
);

// ─── TEMPO DE RESPOSTA ────────────────────────────────────────────────────────

Then(
  "o tempo de resposta deve ser menor que {int} milissegundos",
  (limitMs) => {
    const duration = apiResponse.duration;
    cy.log(`[API] Tempo de resposta: ${duration}ms (limite: ${limitMs}ms)`);
    expect(duration).to.be.lessThan(
      limitMs,
      `Tempo de resposta ${duration}ms excedeu o limite de ${limitMs}ms`
    );
  }
);
