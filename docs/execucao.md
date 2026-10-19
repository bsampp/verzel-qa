# Registro de execução

CT09 executado na UI e reprovado. Investigação API: CT06, CT18, CT07, CT09, CT08 e CT19 executados; quatro aprovações e duas reprovações. Demais cenários/camadas pendentes. A captura manual enviada pela pessoa candidata motivou a reprodução; não foi contada como uma sessão exploratória completa.

## Contexto de cada rodada

- Rodada: EX-001, CT09; execução automatizada final do primeiro slice
- Data/hora e fuso: 18/10/2026, 21:35:35 UTC (23:35:35 Europe/Berlin)
- Navegador/versão e SO: Chromium 156.0.8078.4 headless, Linux x86_64; Playwright 1.64.1, Node v26.8.1
- URL e versão documentada: https://verzel-store.qa-test-verzel-store.workers.dev/ — VZS-142, documentação 2.3.0
- Responsável: Codex, assistindo a pessoa candidata; revisão humana do código pendente.

## Resultados

Criar uma linha por cenário, camada e variante, usando IDs como EX-001. Estados: passou, falhou, bloqueado ou não executado. Em caso de bloqueio, explicar a causa. Não substituir resultado obtido por resultado esperado.

| Execução | Cenário/variante | Camada | Dados e passos realizados | Esperado | Obtido | Estado | Evidência | Bug |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EX-001 | CT09 | UI/E2E; resposta da API coletada durante o fluxo | Contexto limpo; adicionar P005 duas vezes; abrir carrinho; aplicar BEMVINDO10 | Subtotal 200; desconto 20; frete 0; total 180 | Subtotal 200; desconto 20; frete 19,90; total 199,90; faltante zero | Falhou | [Tela](../evidencias/CT09/EX-001-carrinho.png), [API](../evidencias/CT09/EX-001-calculo.json) | [BUG-001](bugs/BUG-001.md) |

## Sessões exploratórias propostas

| ID | Objetivo | Tempo sugerido | Foco |
| --- | --- | --- | --- |
| EXP01 | Transições de carrinho e cupom | 20 min | Aplicar/remover, mudar itens, cruzar limite do frete, esvaziar |
| EXP02 | Consistência do checkout | 20 min | Voltar ao carrinho, editar valores, validar dados e confirmar |

Para cada sessão registrar início/fim, ambiente, dados, sequência real de ações, observações, evidências e bugs. Transformar descobertas relevantes em cenários reproduzíveis. Não incluir carga, estresse ou segurança.

## Resumo final (a preencher)

Total por estado, critérios cobertos, bugs por severidade, testes automatizados executados, limitações e recomendação de aprovação/não aprovação com justificativa. Separar execuções de cenários únicos na contagem.

## Resultado do primeiro slice

Última rodada: 1 teste, 0 aprovados, 1 reprovado por duas verificações (frete e total). CT09 teve a mesma divergência em duas execuções automatizadas durante a implementação. EX-001 preserva os artefatos da última. Não houve execução independente de suíte API nem aprovação dos critérios completos.

## Investigação do limite do frete pela API

Rodada em 2026-10-18T22:38:56.823Z (UTC), Node v26.8.1, Playwright 1.64.1, Linux; fixture `request`, sem abrir navegador. Seis chamadas sequenciais para POST /api/carrinho/calcular. Comando: `npx playwright test tests/frete.api.spec.ts`.

Nas colunas esperado/obtido abaixo, a ordem é: subtotal, desconto, frete, total e faltante, em reais.

| Execução | Cenário/variante | Camada | Dados | Esperado | Obtido | Estado | Evidência | Bug |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EX-002 | CT06 / sem cupom | API | `{"itens": [{"produtoId": "P002", "quantidade": 1}, {"produtoId": "P001", "quantidade": 1}]}` | (199.8, 0, 19.9, 219.7, 0.2) | (199.8, 0, 19.9, 219.7, 0.2); HTTP 200 | Passou | [JSON](../evidencias/CT06/EX-002-calculo.json) | — |
| EX-003 | CT18 / com cupom | API | `{"itens": [{"produtoId": "P002", "quantidade": 1}, {"produtoId": "P001", "quantidade": 1}], "cupom": "BEMVINDO10"}` | (199.8, 19.98, 19.9, 199.72, 0.2) | (199.8, 19.98, 19.9, 199.72, 0.2); HTTP 200 | Passou | [JSON](../evidencias/CT18/EX-003-calculo.json) | — |
| EX-004 | CT07 / sem cupom | API | `{"itens": [{"produtoId": "P005", "quantidade": 2}]}` | (200, 0, 0, 200, 0) | (200, 0, 19.9, 219.9, 0); HTTP 200 | Falhou | [JSON](../evidencias/CT07/EX-004-calculo.json) | [BUG-001](bugs/BUG-001.md) |
| EX-005 | CT09 / com cupom | API | `{"itens": [{"produtoId": "P005", "quantidade": 2}], "cupom": "BEMVINDO10"}` | (200, 20, 0, 180, 0) | (200, 20, 19.9, 199.9, 0); HTTP 200 | Falhou | [JSON](../evidencias/CT09/EX-005-calculo.json) | [BUG-001](bugs/BUG-001.md) |
| EX-006 | CT08 / sem cupom | API | `{"itens": [{"produtoId": "P007", "quantidade": 1}]}` | (229.9, 0, 0, 229.9, 0) | (229.9, 0, 0, 229.9, 0); HTTP 200 | Passou | [JSON](../evidencias/CT08/EX-006-calculo.json) | — |
| EX-007 | CT19 / com cupom | API | `{"itens": [{"produtoId": "P007", "quantidade": 1}], "cupom": "BEMVINDO10"}` | (229.9, 22.99, 0, 206.91, 0) | (229.9, 22.99, 0, 206.91, 0); HTTP 200 | Passou | [JSON](../evidencias/CT19/EX-007-calculo.json) | — |

Resultado: 4 passaram e 2 falharam. A cobrança indevida em R$ 200 ocorre com e sem cupom; em R$ 199,80 e R$ 229,90 os valores conferem nas duas variantes. Hipótese: limite estrito em vez de inclusivo. A causa interna não foi confirmada. Não generalizar para todos os valores acima de R$ 200.

Correção da massa: o planejamento usava quatro bonés (4 × 49,90 = 199,60) como se somassem 199,80. A primeira rodada expôs esse erro no teste. CT06 foi corrigido para calça + camiseta (139,90 + 59,90 = 199,80), e a suíte foi reexecutada. As falhas da primeira rodada abaixo do limite não são bugs do produto. EX-002 a EX-007 preservam somente a rodada corrigida.

## Complemento — subtotal acima de 200 e valor após desconto abaixo de 200

EX-008 / CT20; API; 2026-10-18T22:41:38.892Z (UTC), Playwright 1.64.1, Node v26.8.1, Linux. Comando: `npx playwright test tests/frete.api.spec.ts --grep CT20`.

Dados: P005 × 1 (100,00), P008 × 1 (50,00), P006 × 2 (59,80); cupom BEMVINDO10. Esperado e obtido: subtotal 209,80; desconto 20,98; frete 0; total 188,82; freteGratis true; faltante 0; HTTP 200. **Passou**. [Evidência](../evidencias/CT20/EX-008-calculo.json).

Esse caso confirma CA08 para essa combinação: o desconto reduz o valor abaixo de 200 sem perder frete grátis. Isso enfraquece a hipótese de que o frete seja sempre calculado após o desconto; não prova a implementação interna. Considerando a matriz anterior e este complemento: 7 casos API executados, 5 aprovados e 2 reprovados; não houve nova execução dos seis anteriores.
