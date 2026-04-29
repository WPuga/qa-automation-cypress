# language: pt

Funcionalidade: Validação de Endpoint Trello
  Para verificar a integridade dos dados retornados pela API
  Quero validar status code, estrutura e conteúdo de uma action do Trello

  Cenário: Validar status code 200 para uma ação existente
    Quando eu envio um GET para "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a"
    Então o status code da resposta deve ser 200

  Cenário: Validar que o campo "name" da estrutura "list" está presente e não vazio
    Quando eu envio um GET para "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a"
    Então o status code da resposta deve ser 200
    E o campo "name" da estrutura "list" deve ser exibido
    E o campo "name" da estrutura "list" deve ser do tipo "string"
    E o campo "name" da estrutura "list" não deve estar vazio

  Cenário: Validar que o corpo da resposta contém os campos obrigatórios
    Quando eu envio um GET para "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a"
    Então o status code da resposta deve ser 200
    E a resposta deve conter os campos obrigatórios "id,type,date,data"

  Cenário: Validar retorno de erro para um endpoint inválido
    Quando eu envio um GET para "https://api.trello.com/1/actions/id-inexistente-abc123"
    Então o status code da resposta deve ser 400

  Cenário: Validar que o tempo de resposta está dentro do limite aceitável
    Quando eu envio um GET para "https://api.trello.com/1/actions/592f11060f95a3d3d46a987a"
    Então o tempo de resposta deve ser menor que 3000 milissegundos
