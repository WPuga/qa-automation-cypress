# language: pt

Funcionalidade: Validação de Endpoint Trello
  Para verificar a integridade dos dados retornados pela API
  Quero validar o status code e campos específicos de uma action do Trello

  Cenário: Validar conteúdo e status code de uma ação
    Quando eu envio um GET para "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a"
    Então o status code da resposta deve ser 200
    E o campo "name" da estrutura "list" deve ser exibido
