# Rodada final de execução

Início: 2026-10-20T16:13:10.570Z (UTC). Comando: `npm test`. Duração: 82.25 s.

**69 testes: 61 passaram, 8 falharam, 0 ignorados e 0 flaky.** 18 pelo navegador e 51 pela API. As falhas correspondem a BUG-001 (6) e BUG-002 (2). Não foram usados retries, mocks, skips ou marcação de falha esperada.

Um teste é uma variante executável; os 69 testes não representam 69 critérios. Cada linha aponta para os resultados/erros e artefatos preservados. Nos campos `evidencias[].arquivo` dos JSONs, os caminhos são relativos à raiz `evidencias/rodada-final/`, não ao próprio arquivo `resultado.json`. O código do cenário contém as verificações esperadas.

| Execução | Cenário e variante | Camada | Resultado | Bug | Evidência |
| --- | --- | --- | --- | --- | --- |
| RF-001 | CT09 — manter frete grátis com subtotal de R$ 200 e cupom de 10% | UI/E2E | Falhou | BUG-001 | [Resultado e anexos](../evidencias/rodada-final/RF-001/resultado.json) |
| RF-002 | CT01 API cupom "BEMVINDO10" em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-002/resultado.json) |
| RF-003 | CT02-minúsculas API cupom "bemvindo10" em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-003/resultado.json) |
| RF-004 | CT02-espaços API cupom "  BeMvInDo10  " em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-004/resultado.json) |
| RF-005 | CT03 API cupom "INEXISTENTE" em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-005/resultado.json) |
| RF-006 | CT04 API cupom "VERAO2026" em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-006/resultado.json) |
| RF-007 | CT12 API quantidade 5 em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-007/resultado.json) |
| RF-008 | CT12 API quantidade 6 em /api/carrinho/calcular | API | Falhou | BUG-002 | [Resultado e anexos](../evidencias/rodada-final/RF-008/resultado.json) |
| RF-009 | CT15 API ausentes em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-009/resultado.json) |
| RF-010 | CT15 API vazios em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-010/resultado.json) |
| RF-011 | CT15 API item não objeto em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-011/resultado.json) |
| RF-012 | CT15 API produto desconhecido em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-012/resultado.json) |
| RF-013 | CT15 API duplicado em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-013/resultado.json) |
| RF-014 | CT15 API quantidade 0 em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-014/resultado.json) |
| RF-015 | CT15 API quantidade -1 em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-015/resultado.json) |
| RF-016 | CT15 API quantidade 1.5 em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-016/resultado.json) |
| RF-017 | CT15 API quantidade "1" em /api/carrinho/calcular | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-017/resultado.json) |
| RF-018 | CT01 API cupom "BEMVINDO10" em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-018/resultado.json) |
| RF-019 | CT02-minúsculas API cupom "bemvindo10" em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-019/resultado.json) |
| RF-020 | CT02-espaços API cupom "  BeMvInDo10  " em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-020/resultado.json) |
| RF-021 | CT03 API cupom "INEXISTENTE" em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-021/resultado.json) |
| RF-022 | CT04 API cupom "VERAO2026" em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-022/resultado.json) |
| RF-023 | CT12 API quantidade 5 em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-023/resultado.json) |
| RF-024 | CT12 API quantidade 6 em /api/pedidos | API | Falhou | BUG-002 | [Resultado e anexos](../evidencias/rodada-final/RF-024/resultado.json) |
| RF-025 | CT15 API ausentes em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-025/resultado.json) |
| RF-026 | CT15 API vazios em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-026/resultado.json) |
| RF-027 | CT15 API item não objeto em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-027/resultado.json) |
| RF-028 | CT15 API produto desconhecido em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-028/resultado.json) |
| RF-029 | CT15 API duplicado em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-029/resultado.json) |
| RF-030 | CT15 API quantidade 0 em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-030/resultado.json) |
| RF-031 | CT15 API quantidade -1 em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-031/resultado.json) |
| RF-032 | CT15 API quantidade 1.5 em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-032/resultado.json) |
| RF-033 | CT15 API quantidade "1" em /api/pedidos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-033/resultado.json) |
| RF-034 | CT16 API nome sem sobrenome | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-034/resultado.json) |
| RF-035 | CT16 API email inválido | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-035/resultado.json) |
| RF-036 | CT16 API CEP curto | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-036/resultado.json) |
| RF-037 | CT16 API CEP com hífen | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-037/resultado.json) |
| RF-038 | CT16 API CEP sem hífen | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-038/resultado.json) |
| RF-039 | CT17 API lista de produtos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-039/resultado.json) |
| RF-040 | CT17 API produto existente | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-040/resultado.json) |
| RF-041 | CT17 API produto inexistente | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-041/resultado.json) |
| RF-042 | CT17 API rota inexistente | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-042/resultado.json) |
| RF-043 | CT17 API método não permitido | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-043/resultado.json) |
| RF-044 | CT17 API JSON malformado | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-044/resultado.json) |
| RF-045 | CT13 API — valores em centavos | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-045/resultado.json) |
| RF-046 | CT01 — aplicar cupom válido com uma mochila | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-046/resultado.json) |
| RF-047 | CT03 — rejeitar cupom inexistente com uma mochila | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-047/resultado.json) |
| RF-048 | CT02-minúsculas — aplicar cupom válido com uma mochila | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-048/resultado.json) |
| RF-049 | CT02-espaços — aplicar cupom válido com uma mochila | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-049/resultado.json) |
| RF-050 | CT04 — rejeitar cupom expirado com uma mochila | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-050/resultado.json) |
| RF-051 | CT05 — remover, rejeitar outro cupom e reaplicar sem acumular desconto | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-051/resultado.json) |
| RF-052 | CT10 — recalcular ao passar de uma para duas mochilas e voltar | UI/E2E | Falhou | BUG-001 | [Resultado e anexos](../evidencias/rodada-final/RF-052/resultado.json) |
| RF-053 | CT11 — limitar quantidade no catálogo e carrinho e permitir voltar a cinco | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-053/resultado.json) |
| RF-054 | CT13 — apresentar desconto e total com centavos corretos | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-054/resultado.json) |
| RF-055 | CT06 UI — fronteira de frete sem cupom | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-055/resultado.json) |
| RF-056 | CT07 UI — fronteira de frete sem cupom | UI/E2E | Falhou | BUG-001 | [Resultado e anexos](../evidencias/rodada-final/RF-056/resultado.json) |
| RF-057 | CT08 UI — fronteira de frete sem cupom | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-057/resultado.json) |
| RF-058 | CT14 — confirmar pedido de 1 mochila(s) com cupom | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-058/resultado.json) |
| RF-059 | CT14 — confirmar pedido de 2 mochila(s) com cupom | UI/E2E | Falhou | BUG-001 | [Resultado e anexos](../evidencias/rodada-final/RF-059/resultado.json) |
| RF-060 | CT16 UI — nome sem sobrenome | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-060/resultado.json) |
| RF-061 | CT16 UI — email inválido | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-061/resultado.json) |
| RF-062 | CT16 UI — CEP curto | UI/E2E | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-062/resultado.json) |
| RF-063 | CT06 API — subtotal 199.8, sem cupom | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-063/resultado.json) |
| RF-064 | CT18 API — subtotal 199.8, com cupom | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-064/resultado.json) |
| RF-065 | CT07 API — subtotal 200, sem cupom | API | Falhou | BUG-001 | [Resultado e anexos](../evidencias/rodada-final/RF-065/resultado.json) |
| RF-066 | CT09 API — subtotal 200, com cupom | API | Falhou | BUG-001 | [Resultado e anexos](../evidencias/rodada-final/RF-066/resultado.json) |
| RF-067 | CT08 API — subtotal 229.9, sem cupom | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-067/resultado.json) |
| RF-068 | CT19 API — subtotal 229.9, com cupom | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-068/resultado.json) |
| RF-069 | CT20 API — subtotal 209.8, com cupom | API | Passou | — | [Resultado e anexos](../evidencias/rodada-final/RF-069/resultado.json) |

Ambiente: Node 26.8.1, Playwright 1.64.1, Chromium 156.0.8078.4, Linux x86_64. Casos API usam `request`, sem abrir navegador. Código-fonte dos testes em `tests/`. Valores previstos são baseados na documentação, não derivados da resposta testada.

[Resumo JSON portátil](../evidencias/rodada-final/resultados.json). Relatório HTML e traces podem ser regenerados com `npm test` e `npm run test:report`; não são versionados.

Limitações: uma versão de Chromium, catálogo fixo, sem autenticação/pagamento/estoque/persistência; não foram executados carga, estresse ou segurança. CA11 verifica os centavos disponíveis no catálogo; desempate de meio centavo não foi especificado.
