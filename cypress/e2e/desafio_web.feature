# language: pt

Funcionalidade: Fluxos de E-commerce
  Para garantir que os usuários consigam comprar sem problemas
  Eu, como analista de QA, quero validar o cadastro, busca e carrinho no site Automation Exercise

  Contexto:
    Dado que eu acesso a página principal

  Cenário: Realizar cadastro e login com sucesso
    Quando eu acesso a página de login
    E realizo um novo cadastro no site
    Então eu devo ver a mensagem de conta criada com sucesso
    E eu devo ver a mensagem de login realizado com sucesso
    E eu excluo a conta criada para limpeza

  Cenário: Buscar um produto
    Quando eu busco pelo produto "Top"
    Então eu devo ver resultados relacionados à busca

  Cenário: Adicionar produto ao carrinho e validar no checkout
    Quando eu busco pelo produto "Blue Cotton Indie Mickey"
    E adiciono o produto ao carrinho
    E visualizo o carrinho
    Então o produto deve estar presente no carrinho com as informações corretas
