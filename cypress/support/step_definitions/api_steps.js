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

// ─── VERIFICAÇÃO DE CAMPO ───────────────────────────────────────────────────

Then(
  "o campo {string} da estrutura {string} deve ser exibido",
  (nomeDoCampo, nomeDaEstrutura) => {
    const valor = apiResponse.body?.data?.[nomeDaEstrutura]?.[nomeDoCampo];
    cy.log(`[API] Verificando se ${nomeDaEstrutura}.${nomeDoCampo} existe. Valor encontrado: ${valor}`);
    expect(valor, `O campo "${nomeDoCampo}" não foi encontrado dentro de "${nomeDaEstrutura}"`).to.not.be.undefined;
  }
);

// ─── VALIDAÇÃO DE TIPO ────────────────────────────────────────────────────────

Then(
  "o campo {string} da estrutura {string} deve ser do tipo {string}",
  (nomeDoCampo, nomeDaEstrutura, tipoEsperado) => {
    const valor = apiResponse.body?.data?.[nomeDaEstrutura]?.[nomeDoCampo];
    const tipoAtual = typeof valor;
    cy.log(`[API] Validando tipo de ${nomeDaEstrutura}.${nomeDoCampo}: ${tipoAtual}`);
    expect(tipoAtual).to.eq(
      tipoEsperado,
      `Esperava que o campo fosse "${tipoEsperado}", mas recebi "${tipoAtual}"`
    );
  }
);

// ─── VALIDAÇÃO DE CONTEÚDO ───────────────────────────────────────────────────

Then(
  "o campo {string} da estrutura {string} não deve estar vazio",
  (nomeDoCampo, nomeDaEstrutura) => {
    const valor = apiResponse.body?.data?.[nomeDaEstrutura]?.[nomeDoCampo];
    cy.log(`[API] Validando se ${nomeDaEstrutura}.${nomeDoCampo} tem conteúdo: "${valor}"`);
    expect(valor).to.not.be.empty;
  }
);

// ─── CAMPOS OBRIGATÓRIOS ─────────────────────────────────────────────────────

Then(
  "a resposta deve conter os campos obrigatórios {string}",
  (listaDeCampos) => {
    const campos = listaDeCampos.split(",").map((c) => c.trim());
    campos.forEach((campo) => {
      expect(
        apiResponse.body,
        `A resposta da API deveria conter o campo "${campo}", mas ele está ausente.`
      ).to.have.property(campo);
      cy.log(`[API] Campo obrigatório confirmado: ${campo}`);
    });
  }
);

// ─── PERFORMANCE ─────────────────────────────────────────────────────────────

Then(
  "o tempo de resposta deve ser menor que {int} milissegundos",
  (tempoLimite) => {
    const duracao = apiResponse.duration;
    cy.log(`[API] Performance: ${duracao}ms (Limite: ${tempoLimite}ms)`);
    expect(duracao).to.be.lessThan(
      tempoLimite,
      `A API demorou ${duracao}ms para responder, o que ultrapassa o limite de ${tempoLimite}ms`
    );
  }
);
