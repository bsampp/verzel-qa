# Documento de evidências

**Consolidado final:** [69 resultados por variante](rodada-final.md), [resumo JSON](../evidencias/rodada-final/resultados.json) e [execução manual/exploratória](exploracao.md). Cada RF possui `resultado.json` com estado, erros e caminhos relativos para os anexos. Screenshots de sucesso e falha e respostas reais foram preservados, sem traces volumosos. Os artefatos abaixo mantêm o histórico inicial.

Primeira evidência coletada em EX-001 (CT09), reprodução automatizada da divergência observada pela pessoa candidata.

Guardar arquivos em `evidencias/CTxx/`, por exemplo `EX-001-desconto.png` e `EX-001-calculo.json`. Usar dados sintéticos. As evidências selecionadas devem ser versionadas; diretórios temporários do Playwright ficam ignorados. Copiar artefatos relevantes antes da limpeza e conferir seus links.

| Evidência | Execução/cenário | Data/hora e ambiente | O que demonstra | Arquivo |
| --- | --- | --- | --- | --- |
| EV-001 | EX-001 / CT09 | 18/10/2026, 21:35 UTC; Chromium 156.0.8078.4/Linux | Frete cobrado e total incorreto com subtotal de R$ 200 e cupom | [Screenshot](../evidencias/CT09/EX-001-carrinho.png) |
| EV-002 | EX-001 / CT09 | 18/10/2026, 21:35:37 UTC; chamada real da UI | API já retorna frete 19.9, freteGratis false, faltante 0 e total 199.9 | [Requisição e resposta](../evidencias/CT09/EX-001-calculo.json) |

Capturar produto/quantidade, cupom, subtotal, desconto, frete e total quando pertinentes. Para API guardar método/URL, payload, status e resposta. Screenshots isoladas não substituem passos e valores do registro de execução.

## Evidências da investigação API

Requisição, status, resposta e horário UTC preservados por variante:

- EX-002 / CT06: [JSON](../evidencias/CT06/EX-002-calculo.json).
- EX-003 / CT18: [JSON](../evidencias/CT18/EX-003-calculo.json).
- EX-004 / CT07: [JSON](../evidencias/CT07/EX-004-calculo.json).
- EX-005 / CT09: [JSON](../evidencias/CT09/EX-005-calculo.json).
- EX-006 / CT08: [JSON](../evidencias/CT08/EX-006-calculo.json).
- EX-007 / CT19: [JSON](../evidencias/CT19/EX-007-calculo.json).

- EX-008 / CT20: [JSON](../evidencias/CT20/EX-008-calculo.json), coletado em 2026-10-18T22:41:38.892Z UTC. Confirma frete grátis com subtotal 209,80 e total após desconto 188,82.

## Cupons — evidências da execução pelo navegador

- EX-009 / CT01, 2026-10-20T14:58:47.681Z UTC: [tela](../evidencias/CT01/EX-009-carrinho.png) e [requisição/resposta](../evidencias/CT01/EX-009-calculo.json).
- EX-010 / CT03, 2026-10-20T14:58:48.939Z UTC: [tela](../evidencias/CT03/EX-010-carrinho.png) e [requisição/resposta](../evidencias/CT03/EX-010-calculo.json).
