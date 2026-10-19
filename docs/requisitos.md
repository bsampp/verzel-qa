# Requisitos e referências

Levantamento inicial em 18/10/2026. A página é uma SPA: o conteúdo foi recuperado do bundle público `/assets/index-DimFnQZA.js`, na função que monta a documentação, incluindo os critérios, endpoints e a seção de ambiente. A documentação renderizada foi reconferida em 18/10/2026, antes da execução de CT09, sem mudanças identificadas nos critérios acima. O registro funcional está em `execucao.md`.

Fonte: https://verzel-store.qa-test-verzel-store.workers.dev/documentacao — VZS-142, versão 2.3.0.

## Critérios resumidos

| ID | Regra esperada |
| --- | --- |
| CA01 | BEMVINDO10 desconta 10% do subtotal dos produtos. |
| CA02 | Cupom ignora caixa e espaços nas extremidades. |
| CA03 | Cupom inexistente: “Cupom inválido.”, desconto zero. |
| CA04 | Cupom expirado: “Cupom expirado.”, desconto zero. |
| CA05 | Um cupom por vez; remover o atual antes de aplicar outro. |
| CA06 | Subtotal >= R$ 200,00 recebe frete grátis. |
| CA07 | Abaixo do limite: frete R$ 19,90 e indicação do valor faltante. |
| CA08 | Elegibilidade do frete considera subtotal anterior ao desconto. |
| CA09 | Desconto não incide no frete. |
| CA10 | Máximo de 5 unidades por produto, na UI e na API. |
| CA11 | Valores monetários arredondados para duas casas decimais. |

Oráculo: `total = subtotal - desconto + frete`; faltante = máximo entre zero e `200 - subtotal`. Calcular esperados independentemente da resposta da aplicação.

## Dados disponíveis

| Produto | Preço |
| --- | --- |
| P001 — Camiseta Essencial | R$ 59,90 |
| P002 — Calça Jeans Slim | R$ 139,90 |
| P003 — Tênis Casual Urbano | R$ 189,90 |
| P004 — Boné Aba Curva | R$ 49,90 |
| P005 — Mochila Urbana 20L | R$ 100,00 |
| P006 — Kit 3 Pares de Meias | R$ 29,90 |
| P007 — Jaqueta Corta-Vento | R$ 229,90 |
| P008 — Garrafa Térmica 750ml | R$ 50,00 |

BEMVINDO10: válido, 10%. VERAO2026: expirado em 31/03/2026, 15% nominal, sem aplicação esperada. INEXISTENTE: dado negativo proposto.

Cliente sintético sugerido: Maria Silva, maria@example.com, CEP 01310-100. A documentação exige nome e sobrenome, e-mail válido e CEP de oito dígitos com ou sem hífen.

## Contratos resumidos da API

JSON, valores monetários numéricos, base `/api`.

| Método e rota | Contrato documentado |
| --- | --- |
| GET /produtos | 200, lista de produtos |
| GET /produtos/{id} | 200 para produto existente; 404 caso contrário |
| POST /carrinho/calcular | Recebe itens `{produtoId, quantidade}` e cupom opcional; cupom inválido/expirado retorna 200 sem desconto e motivo em `cupom.mensagem` |
| POST /pedidos | Recebe cliente, itens e cupom opcional; sucesso 201 com número fictício VZ-000000 e resumo; cupom inválido/expirado retorna 422 |

Erros documentados: 400 JSON_INVALIDO; 404 ROTA_NAO_ENCONTRADA e PRODUTO_NAO_ENCONTRADO na consulta; 405 METODO_NAO_PERMITIDO; 422 ITENS_OBRIGATORIOS, ITEM_INVALIDO, PRODUTO_NAO_ENCONTRADO nos itens, ITEM_DUPLICADO, QUANTIDADE_INVALIDA, QUANTIDADE_MAXIMA_EXCEDIDA, DADOS_INVALIDOS, CUPOM_INVALIDO e CUPOM_EXPIRADO. Conferir o objeto `erro`, o código e os detalhes de campo aplicáveis na fonte.

## Simplificações intencionais: não abrir bugs

- Carrinho restrito à aba; outra aba/navegador/janela anônima começa vazio.
- Pedidos não persistem e seus números são fictícios; não há consulta de pedidos.
- Sem envio de e-mail, cobrança ou controle de estoque.
- Produtos, preços e cupons fixos; API sem persistência entre chamadas.
- Login, cadastro, pagamento online e consulta de pedidos fora do escopo.
- O enunciado também exclui carga, estresse e segurança.

## Decisões e ambiguidades

| ID | Questão | Interpretação inicial | Impacto |
| --- | --- | --- | --- |
| DEC01 | Apenas um cupom válido está disponível | Verificar remoção e reaplicação/alternância com um inválido; não inventar segundo cupom válido | CA05 com limitação de dados |
| DEC02 | Limite em centavos R$ 199,99 / R$ 200,01 | Catálogo fixo não permite necessariamente esses totais; usar R$ 199,80 / R$ 200,00 / R$ 229,90, sem adulterar preços | Fronteira possível com os dados reais |
| DEC03 | Meio centavo no arredondamento | Não assumir modo de desempate não especificado; registrar ambiguidade se relevante | CA11 |

Novas ambiguidades: registrar referência, interpretação, justificativa e impacto antes de seguir.
