# language: pt
#
# Documentação em Gherkin dos 20 cenários planejados (CT01–CT20).
#
# Este arquivo é uma especificação legível por pessoas. Ele NÃO é executado
# pelo `npm test`: a automação real está em tests/*.spec.ts, com Playwright e
# TypeScript. Não há Cucumber instalado neste projeto.
#
# Os resultados esperados descrevem a regra correta da documentação VZS-142,
# não o comportamento defeituoso observado. Rastreabilidade, dados e camadas
# estão em docs/cenarios.md; regras e contratos, em docs/requisitos.md.

Funcionalidade: Comprar na Verzel Store com cupom, frete grátis e checkout
  Como cliente da Verzel Store
  Quero aplicar cupons, conferir frete e concluir pedidos
  Para receber os valores e as mensagens definidos pela documentação VZS-142

  Regra: Cupom de desconto

    @CT01 @CA01 @CA07 @CA09 @P0 @UI @API
    Cenário: Aplicar BEMVINDO10 em uma mochila e calcular o resumo
      Dado que o carrinho contém 1 unidade de P005 (Mochila Urbana 20L) por R$ 100,00
      Quando aplico o cupom "BEMVINDO10"
      Então o subtotal deve ser R$ 100,00
      E o desconto deve ser R$ 10,00
      E o frete deve ser R$ 19,90
      E o total deve ser R$ 109,90
      E deve faltar R$ 100,00 para o frete grátis
      E o cálculo da API deve responder HTTP 200 com os mesmos valores

    @CT02 @CA02 @P1 @UI @API
    Esquema do Cenário: Aceitar BEMVINDO10 sem diferenciar caixa e ignorando espaços nas extremidades
      Dado que o carrinho contém 1 unidade de P005 por R$ 100,00
      Quando aplico o cupom <cupom>
      Então o cupom deve ser aceito
      E o desconto deve ser R$ 10,00
      E o total deve ser R$ 109,90
      E o cálculo HTTP 200 e o pedido HTTP 201 devem refletir a mesma regra

      Exemplos:
        | cupom                |
        | "bemvindo10"         |
        | "  BeMvInDo10  "     |

    @CT03 @CA03 @P1 @UI @API
    Cenário: Rejeitar cupom inexistente sem desconto, mas manter o cálculo em 200
      Dado que o carrinho contém 1 unidade de P005 por R$ 100,00
      Quando aplico o cupom "INEXISTENTE"
      Então a interface deve exibir "Cupom inválido."
      E o desconto deve ser R$ 0,00
      E o frete deve ser R$ 19,90
      E o total deve ser R$ 119,90
      E o cálculo POST /api/carrinho/calcular deve responder HTTP 200 com cupom.aplicado falso e a mensagem "Cupom inválido."
      Mas o pedido POST /api/pedidos deve responder HTTP 422 com o código CUPOM_INVALIDO

    @CT04 @CA04 @P1 @UI @API
    Cenário: Rejeitar cupom expirado sem desconto, mas manter o cálculo em 200
      Dado que o carrinho contém 1 unidade de P005 por R$ 100,00
      Quando aplico o cupom "VERAO2026"
      Então a interface deve exibir "Cupom expirado."
      E o desconto deve ser R$ 0,00
      E o frete deve ser R$ 19,90
      E o total deve ser R$ 119,90
      E o cálculo POST /api/carrinho/calcular deve responder HTTP 200 com cupom.aplicado falso e a mensagem "Cupom expirado."
      Mas o pedido POST /api/pedidos deve responder HTTP 422 com o código CUPOM_EXPIRADO

    @CT05 @CA05 @P1 @UI
    Cenário: Manter apenas um cupom por vez ao remover, rejeitar e reaplicar
      Dado que o carrinho contém 1 unidade de P005 por R$ 100,00
      Quando aplico o cupom "BEMVINDO10"
      Então o desconto deve ser R$ 10,00
      E o total deve ser R$ 109,90
      Quando removo o cupom
      Então o desconto deve ser R$ 0,00
      E o total deve ser R$ 119,90
      Quando tento aplicar o cupom "INEXISTENTE"
      Então a interface deve exibir "Cupom inválido."
      E o desconto deve permanecer R$ 0,00
      Quando reaplico o cupom "BEMVINDO10"
      Então o desconto deve ser R$ 10,00
      E o total deve ser R$ 109,90, sem acúmulo de descontos

  Regra: Fronteira do frete grátis

    @CT06 @CA07 @P0 @UI @API
    Cenário: Cobrar frete quando o subtotal fica R$ 0,20 abaixo do limite
      Dado que o carrinho contém 1 unidade de P002 (Calça Jeans Slim) por R$ 139,90
      E 1 unidade de P001 (Camiseta Essencial) por R$ 59,90
      Quando calculo o carrinho sem cupom
      Então o subtotal deve ser R$ 199,80
      E o desconto deve ser R$ 0,00
      E o frete deve ser R$ 19,90
      E o total deve ser R$ 219,70
      E deve faltar R$ 0,20 para o frete grátis
      E a API deve responder HTTP 200 com os mesmos valores

    @CT07 @CA06 @P0 @UI @API
    Cenário: Oferecer frete grátis quando o subtotal é exatamente R$ 200,00
      Dado que o carrinho contém 2 unidades de P005 (Mochila Urbana 20L) por R$ 100,00 cada
      Quando calculo o carrinho sem cupom
      Então o subtotal deve ser R$ 200,00
      E o desconto deve ser R$ 0,00
      E o frete deve ser grátis
      E o total deve ser R$ 200,00
      E não deve faltar valor para o frete grátis
      E a API deve responder HTTP 200 com os mesmos valores

    @CT08 @CA06 @P0 @UI @API
    Cenário: Oferecer frete grátis quando o subtotal ultrapassa R$ 200,00
      Dado que o carrinho contém 1 unidade de P007 (Jaqueta Corta-Vento) por R$ 229,90
      Quando calculo o carrinho sem cupom
      Então o subtotal deve ser R$ 229,90
      E o desconto deve ser R$ 0,00
      E o frete deve ser grátis
      E o total deve ser R$ 229,90
      E não deve faltar valor para o frete grátis
      E a API deve responder HTTP 200 com os mesmos valores

    @CT09 @CA01 @CA06 @CA08 @P0 @UI @API
    Cenário: Manter o frete grátis quando o desconto reduz o total abaixo de R$ 200,00
      Dado que o carrinho contém 2 unidades de P005 (Mochila Urbana 20L) por R$ 100,00 cada
      Quando aplico o cupom "BEMVINDO10"
      Então o subtotal deve ser R$ 200,00
      E o desconto deve ser R$ 20,00
      E o frete deve ser grátis
      E o total deve ser R$ 180,00
      E o frete grátis deve continuar valendo porque a elegibilidade considera o subtotal antes do desconto
      E o cálculo da API deve responder HTTP 200 com os mesmos valores

    @CT10 @CA01 @CA07 @CA08 @P0 @UI
    Cenário: Recalcular cupom e frete ao alterar a quantidade de 1 para 2 e voltar a 1
      Dado que o carrinho contém 1 unidade de P005 por R$ 100,00
      E o cupom "BEMVINDO10" está aplicado
      Então o total deve ser R$ 109,90
      E o frete deve ser R$ 19,90
      Quando aumento a quantidade de P005 para 2
      Então o subtotal deve ser R$ 200,00
      E o desconto deve ser R$ 20,00
      E o frete deve ser grátis
      E o total deve ser R$ 180,00
      Quando diminuo a quantidade de P005 de volta para 1
      Então o subtotal deve ser R$ 100,00
      E o desconto deve ser R$ 10,00
      E o frete deve ser R$ 19,90
      E o total deve ser R$ 109,90

  Regra: Limite de quantidade por produto

    @CT11 @CA10 @P1 @UI
    Cenário: Limitar a quantidade a 5 unidades no catálogo e no carrinho
      Dado que adiciono 5 unidades de P006 (Kit 3 Pares de Meias)
      Quando tento adicionar a sexta unidade pelo catálogo
      Então a interface deve impedir a adição
      E o carrinho deve permanecer com 5 unidades
      Quando tento aumentar a quantidade para 6 dentro do carrinho
      Então a interface deve impedir o aumento
      E a quantidade deve permanecer 5
      Quando reduzo a quantidade para 4
      Então devo conseguir voltar a 5 unidades

    @CT12 @CA10 @P1 @API
    Esquema do Cenário: Aceitar 5 unidades e rejeitar 6 na API
      Dado um pedido com o produto P006 (Kit 3 Pares de Meias) e quantidade <quantidade>
      Quando envio os itens para POST /api/carrinho/calcular
      E envio os mesmos itens com um cliente sintético válido para POST /api/pedidos
      Então o cálculo deve responder HTTP <statusCalculo>
      E o pedido deve responder HTTP <statusPedido>
      E o código de erro deve ser <codigo> quando a quantidade for rejeitada
      E somente em respostas de sucesso, a quantidade aceita deve ser <quantidadeAceita>

      Exemplos:
        | quantidade | statusCalculo | statusPedido | codigo                     | quantidadeAceita |
        | 5          | 200           | 201          | —                          | 5                |
        | 6          | 422           | 422          | QUANTIDADE_MAXIMA_EXCEDIDA | —                |

  Regra: Arredondamento e checkout

    @CT13 @CA11 @CA01 @P0 @UI @API
    Cenário: Apresentar desconto e total com centavos corretos
      Dado que o carrinho contém 1 unidade de P002 (Calça Jeans Slim) por R$ 139,90
      E 2 unidades de P004 (Boné Aba Curva) por R$ 49,90 cada
      Quando aplico o cupom "BEMVINDO10"
      Então o subtotal deve ser R$ 239,70
      E o desconto deve ser R$ 23,97
      E o frete deve ser grátis
      E o total deve ser R$ 215,73
      E a interface deve mostrar os valores com duas casas decimais
      E a API deve retornar os valores numéricos equivalentes

    @CT14 @CA08 @CA09 @regressao-checkout @P0 @UI @API
    Esquema do Cenário: Concluir o checkout com cliente sintético válido
      Dado que o carrinho contém <quantidade> unidade(s) de P005 (Mochila Urbana 20L)
      E o cupom "BEMVINDO10" está aplicado
      Quando informo o cliente sintético Maria Silva, maria@example.com e CEP 01310-100
      E confirmo o pedido
      Então o resumo deve mostrar subtotal <subtotal>, desconto <desconto>, frete <frete> e total <total>
      E o pedido POST /api/pedidos deve responder HTTP 201
      E o número do pedido deve seguir o formato VZ com seis dígitos
      E a confirmação não deve exigir pagamento online

      Exemplos:
        | quantidade | subtotal   | desconto  | frete     | total      |
        | 1          | R$ 100,00  | R$ 10,00  | R$ 19,90  | R$ 109,90  |
        | 2          | R$ 200,00  | R$ 20,00  | Grátis    | R$ 180,00  |

  Regra: Contratos e validações da API

    @CT15 @contrato-api @P2 @API
    Esquema do Cenário: Rejeitar payloads inválidos com o código documentado
      Dado um payload com apenas uma invalidez: <invalidez>
      E os demais campos válidos, com cliente sintético quando aplicável
      Quando envio o payload para POST /api/carrinho/calcular
      E envio o mesmo payload para POST /api/pedidos
      Então as duas chamadas devem responder HTTP 422
      E o código em erro.codigo deve ser <codigo>

      Exemplos:
        | invalidez               | codigo                 |
        | itens ausentes          | ITENS_OBRIGATORIOS     |
        | itens vazios            | ITENS_OBRIGATORIOS     |
        | item não objeto (null)  | ITEM_INVALIDO          |
        | produto INEXISTENTE     | PRODUTO_NAO_ENCONTRADO |
        | P005 repetido           | ITEM_DUPLICADO         |
        | quantidade 0            | QUANTIDADE_INVALIDA    |
        | quantidade -1           | QUANTIDADE_INVALIDA    |
        | quantidade 1.5          | QUANTIDADE_INVALIDA    |
        | quantidade "1" (texto)  | QUANTIDADE_INVALIDA    |

    @CT16 @regressao-checkout @P2 @UI @API
    Esquema do Cenário: Validar dados do cliente e formatos de CEP
      # A automação atual cobre as invalidações na UI e na API; os dois formatos
      # de CEP válidos são verificados na API, e o formato sem hífen também foi
      # confirmado em exploração manual.
      Dado um cliente sintético com <caso>
      Quando tento confirmar o pedido na interface
      E envio o mesmo cliente para POST /api/pedidos
      Então a interface deve <resultadoUi>
      E a API deve responder HTTP <status>
      E quando inválido, o código deve ser DADOS_INVALIDOS e o campo <campo> deve ser indicado

      Exemplos:
        | caso                | resultadoUi                      | status | campo |
        | nome sem sobrenome  | bloquear e marcar Nome completo  | 422    | nome  |
        | e-mail inválido     | bloquear e marcar E-mail         | 422    | email |
        | CEP com 7 dígitos   | bloquear e marcar CEP            | 422    | cep   |
        | CEP com hífen       | aceitar e concluir               | 201    | —     |
        | CEP sem hífen       | aceitar e concluir               | 201    | —     |

    @CT17 @contrato-api @P2 @API
    Esquema do Cenário: Responder corretamente a contratos, rotas e erros da API
      Quando faço uma requisição <metodo> para <rota> <condicao>
      Então a API deve responder HTTP <status>
      E o código em erro.codigo deve ser <codigo> quando houver erro
      E em caso de sucesso, o corpo deve conter <conteudo>

      Exemplos:
        | caso                 | metodo | rota                       | condicao       | status | codigo                 | conteudo                   |
        | lista de produtos    | GET    | /api/produtos              |                | 200    | —                      | 8 produtos, incluindo P005 |
        | produto existente    | GET    | /api/produtos/P005         |                | 200    | —                      | P005 com preço 100         |
        | produto inexistente  | GET    | /api/produtos/INEXISTENTE  |                | 404    | PRODUTO_NAO_ENCONTRADO | —                          |
        | rota inexistente     | GET    | /api/inexistente           |                | 404    | ROTA_NAO_ENCONTRADA    | —                          |
        | método não permitido | POST   | /api/produtos              |                | 405    | METODO_NAO_PERMITIDO   | —                          |
        | JSON malformado      | POST   | /api/carrinho/calcular     | com corpo "{"  | 400    | JSON_INVALIDO          | —                          |

  Regra: Cupom, frete e total em valores acima e abaixo do limite

    @CT18 @CA01 @CA07 @CA09 @P0 @API
    Cenário: Aplicar BEMVINDO10 em subtotal de R$ 199,80 e manter o frete
      Dado que o carrinho contém 1 unidade de P002 (Calça Jeans Slim) por R$ 139,90
      E 1 unidade de P001 (Camiseta Essencial) por R$ 59,90
      Quando aplico o cupom "BEMVINDO10"
      Então o subtotal deve ser R$ 199,80
      E o desconto deve ser R$ 19,98
      E o frete deve ser R$ 19,90
      E o total deve ser R$ 199,72
      E deve faltar R$ 0,20 para o frete grátis
      E o cálculo da API deve responder HTTP 200 com os mesmos valores

    @CT19 @CA01 @CA06 @CA08 @P0 @API
    Cenário: Aplicar BEMVINDO10 em subtotal acima de R$ 200,00 e manter o frete grátis
      Dado que o carrinho contém 1 unidade de P007 (Jaqueta Corta-Vento) por R$ 229,90
      Quando aplico o cupom "BEMVINDO10"
      Então o subtotal deve ser R$ 229,90
      E o desconto deve ser R$ 22,99
      E o frete deve ser grátis
      E o total deve ser R$ 206,91
      E não deve faltar valor para o frete grátis
      E o cálculo da API deve responder HTTP 200 com os mesmos valores

    @CT20 @CA01 @CA06 @CA08 @P0 @API
    Cenário: Manter o frete grátis quando o subtotal supera R$ 200,00 antes do desconto
      Dado que o carrinho contém 1 unidade de P005 (Mochila Urbana 20L) por R$ 100,00
      E 1 unidade de P008 (Garrafa Térmica 750ml) por R$ 50,00
      E 2 unidades de P006 (Kit 3 Pares de Meias) por R$ 29,90 cada
      Quando aplico o cupom "BEMVINDO10"
      Então o subtotal deve ser R$ 209,80
      E o desconto deve ser R$ 20,98
      E o frete deve ser grátis
      E o total deve ser R$ 188,82
      E o frete grátis deve ser calculado pelo subtotal anterior ao desconto, mesmo com o total abaixo de R$ 200,00
      E o cálculo da API deve responder HTTP 200 com os mesmos valores
