# Backlog inicial

As seis issues foram criadas no GitHub. As tarefas #1–#5 foram concluídas; #6 acompanha a preparação e revisão final. Trabalhar em pequenos commits por tarefa.

| ID | Issue | Dependências |
| --- | --- | --- |
| 01 | [Conferir documentação e fechar escopo](https://github.com/bsampp/verzel-qa/issues/1) | Nenhuma |
| 02 | [Revisar cenários e dados de teste](https://github.com/bsampp/verzel-qa/issues/2) | 01 |
| 03 | [Executar testes manuais e exploração](https://github.com/bsampp/verzel-qa/issues/3) | 02 |
| 04 | [Documentar bugs e consolidar evidências](https://github.com/bsampp/verzel-qa/issues/4) | 03 (incremental durante a execução) |
| 05 | [Implementar pelo menos 3 cenários Playwright](https://github.com/bsampp/verzel-qa/issues/5) | 02; usar resultados de 03 para orientar |
| 06 | [Revisar entrega e preparar envio](https://github.com/bsampp/verzel-qa/issues/6) | 03, 04 e 05 |

Fluxo: A fazer → Em andamento → Em revisão → Concluído. Relatos de defeitos são issues separadas das tarefas de execução. Não fechar uma tarefa com entregáveis obrigatórios pendentes.

## Execução em slices

Aplicamos a ideia de slices verificáveis da skill `to-tickets` de Matt Pocock: regra → cenário → execução → evidência → resultado. As seis issues existentes continuam sendo o tracker; não criamos tickets duplicados. O setup de `setup-matt-pocock-skills` foi gravado em AGENTS.md e docs/agents em 21/10/2026, com GitHub como tracker canônico e contexto único. Não há skill triage instalada.

| Slice | Critérios/cenários | Issues | Resultado final |
| --- | --- | --- | --- |
| Frete e desconto | CA01/06/07/08/09; CT06/07/08/09/18/19/20 | #2, #3, #4, #5 | Executado; BUG-001 no limite exato; demais valores da matriz conferem |
| Cupons | CA01/02/03/04; CT01/02/03/04 | #2, #3, #4, #5 | Válido, inválido, expirado e normalização executados na UI/API; contratos distintos de cálculo/pedido passaram |
| Transições | CA05/08; CT05/10 | #3, #4, #5 | Remoção/reaplicação passaram; CT10 falhou no estado de R$ 200 e recuperou valores ao voltar para uma unidade |
| Quantidade e centavos | CA10/11; CT11/12/13 | #2, #3, #4, #5 | UI respeita cinco; API aceita seis (BUG-002); valores de centavos conferem |
| Checkout e contratos | CT14/15/16/17 | #3, #4, #5 | Executados; checkout confirma valor incorreto do BUG-001; validações e contratos auxiliares passaram |
| Exploração e entrega | EXP01/02 e checklist | #3, #4, #6 | Exploração assistida, relatório, guia e clone limpo concluídos; publicação pública e envio pendentes |

Cupons, transições e quantidade podem ser trabalhados independentemente; checkout usa o preparo do carrinho. Um slice pode terminar com um bug aberto, desde que sua execução, impacto e limitações estejam registrados. As issues de QA não são as issues de correção do produto.

## Estado consolidado

69 testes na rodada completa: 61 passaram, oito falharam por dois bugs. [Rodada final](rodada-final.md), [exploração](exploracao.md) e [relatório](relatorio-final.md). Todos os CT01–CT20 possuem variantes executadas. Defeitos abertos: [#7](https://github.com/bsampp/verzel-qa/issues/7) e [#8](https://github.com/bsampp/verzel-qa/issues/8).

As tarefas #1 a #5 tiveram os entregáveis concluídos. A pessoa candidata confirmou recebimento em 15/10/2026 e último dia de envio em 20/10/2026, sem informar horário limite. #6 mantém publicação pública, revisão humana e envio. A data do prazo foi informada pela pessoa candidata, não inferida dos commits.

## Revisão complementar de 21/10

Setup Matt Pocock executado, tracker GitHub configurado, dois scouts DeepSeek concluídos, Gherkin CT01–CT20 finalizado e validado. [Checklist dos seis itens](checklist-entrega.md) e [relatórios independentes](revisoes/README.md). Sem mudança nos testes ou na rodada histórica. Pendências de visibilidade/formulário e de compreensão/revisão humana continuam explícitas.
