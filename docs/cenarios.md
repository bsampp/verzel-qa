# Cenários propostos

Todos **não executados**. Cada linha com múltiplas variantes exige registro individual por variante na execução. Começar com aba/contexto limpo; montar carrinho na UI ou enviar payload explícito na API; executar a ação e comparar cada valor/mensagem com o esperado.

| ID | Referência | Prioridade | Camada | Dados e ação | Resultado esperado |
| --- | --- | --- | --- | --- | --- |
| CT01 | CA01, CA07, CA09 | P0 | UI + API | P005 × 1, BEMVINDO10 | Subtotal 100,00; desconto 10,00; frete 19,90; total 109,90; faltante 100,00. |
| CT02 | CA02 | P1 | UI + API | P005 × 1; variantes bemvindo10 e "  BeMvInDo10  " em execuções separadas | Cada variante aplica 10%; mesmos valores de CT01. |
| CT03 | CA03 | P1 | UI + API | P005 × 1, INEXISTENTE | Mensagem “Cupom inválido.”; desconto 0; total 119,90. Cálculo HTTP 200; pedido HTTP 422/CUPOM_INVALIDO. |
| CT04 | CA04 | P1 | UI + API | P005 × 1, VERAO2026 | Mensagem “Cupom expirado.”; desconto 0; total 119,90. Cálculo HTTP 200; pedido HTTP 422/CUPOM_EXPIRADO. |
| CT05 | CA05 | P1 | UI | P005 × 1; aplicar BEMVINDO10, remover, tentar INEXISTENTE, reaplicar BEMVINDO10 | Um cupom por vez; ao remover, desconto 0/total 119,90; inválido sem desconto; reaplicar resulta em 109,90 sem acúmulo. |
| CT06 | CA07 | P0 | UI + API | P004 × 4, sem cupom | Subtotal 199,80; frete 19,90; faltante 0,20; total 219,70. |
| CT07 | CA06 | P0 | UI + API | P005 × 2, sem cupom | Subtotal 200,00; frete 0; faltante 0; total 200,00. |
| CT08 | CA06 | P0 | UI + API | P007 × 1, sem cupom | Subtotal 229,90; frete 0; faltante 0; total 229,90. |
| CT09 | CA01, CA06, CA08 | P0 | UI + API | P005 × 2, BEMVINDO10 | Subtotal 200,00; desconto 20,00; frete 0; total 180,00. Frete continua grátis mesmo com total inferior a 200. |
| CT10 | CA01, CA07, CA08 | P0 | UI + API | P005 com BEMVINDO10; alterar quantidade de 1 para 2 e voltar a 1 | Totais 109,90 → 180,00 → 109,90; frete 19,90 → 0 → 19,90 e desconto recalculado. |
| CT11 | CA10 | P1 | UI | P006; adicionar até 5 e tentar sexta unidade pela interface | Quantidade chega a 5; UI impede ultrapassar limite no catálogo e carrinho; redução para 4 permite voltar a 5. |
| CT12 | CA10 | P1 | API | P006 com quantidades 5 e 6, em chamadas separadas de cálculo e pedido com cliente válido | 5 aceito: cálculo 200/pedido 201. 6 rejeitado com 422/QUANTIDADE_MAXIMA_EXCEDIDA em ambos. |
| CT13 | CA11, CA01 | P0 | UI + API | P002 × 1 + P004 × 2, BEMVINDO10 | Subtotal 239,70; desconto 23,97; frete 0; total 215,73. UI com duas casas e API com valores numéricos equivalentes. |
| CT14 | Regressão checkout, CA08, CA09 | P0 | UI + API | Concluir CT01 e CT09, separadamente, com cliente sintético válido | UI e pedido mantêm valores esperados; POST /pedidos 201; número VZ com seis dígitos; confirmação sem exigir pagamento online. |
| CT15 | Contrato API | P2 | API | No cálculo e pedido: itens ausentes/vazios; item não objeto; produto desconhecido; produto repetido; quantidade 0, -1, 1.5 e "1" | 422 com códigos documentados: ITENS_OBRIGATORIOS, ITEM_INVALIDO, PRODUTO_NAO_ENCONTRADO, ITEM_DUPLICADO, QUANTIDADE_INVALIDA. Uma variação por chamada, demais campos válidos. |
| CT16 | Regressão checkout | P2 | UI + API | Nome sem sobrenome; e-mail inválido; CEP com 7 dígitos, separadamente; depois CEP válido com/sem hífen | Dados inválidos impedem confirmar; API 422/DADOS_INVALIDOS com campos. CEP válido aceito nas duas formas. |
| CT17 | Contrato API | P2 | API | GET /produtos; GET /produtos/P005; GET /produtos/INEXISTENTE; rota inexistente; método não permitido; JSON malformado | 200/lista, 200/produto, 404/PRODUTO_NAO_ENCONTRADO, 404/ROTA_NAO_ENCONTRADA, 405/METODO_NAO_PERMITIDO e 400/JSON_INVALIDO, respectivamente. Definir rota/método concretos antes da execução. |

## Exemplo em Gherkin (não executável nesta etapa)

```gherkin
# language: pt
Funcionalidade: Frete grátis com cupom
  @CT09 @CA01 @CA06 @CA08
  Cenário: Manter o frete grátis quando o desconto reduz o total abaixo de 200 reais
    Dado que o carrinho contém 2 unidades de P005 a 100 reais cada
    Quando aplico o cupom "BEMVINDO10"
    Então o subtotal deve ser 200 reais
    E o desconto deve ser 20 reais
    E o frete deve ser grátis
    E o total deve ser 180 reais
```

## Rastreabilidade

CA01: CT01/09/13; CA02: CT02; CA03: CT03; CA04: CT04; CA05: CT05; CA06: CT07/08/09; CA07: CT01/06/10; CA08: CT09/10; CA09: CT01/14; CA10: CT11/12; CA11: CT13.

Para variantes de contrato, montar payload com apenas uma invalidez por vez. Em CT03/04, a tentativa de pedido inválido deve ser feita diretamente na API, sem presumir que a UI permite manter o cupom rejeitado.
