# Backlog inicial

As seis issues foram criadas no GitHub e estão abertas. Trabalhar em pequenos commits por tarefa.

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

Os slices abaixo atravessam regra, teste, execução e evidência. Aplicamos a ideia de slices verificáveis da skill `to-tickets` de Matt Pocock, adaptada a um projeto de QA sem acesso ao código da loja. As seis issues existentes continuam sendo o tracker; os slices não criam um segundo backlog de tickets. Não foi executado o setup completo das skills.

| Slice | Critérios/cenários | Issues | Estado e entrega |
| --- | --- | --- | --- |
| Frete e desconto | CA01/06/07/08/09; CT06/07/08/09/18/19/20 | #2, #3, #4, #5 | Investigação API concluída; CT09 UI executado; BUG-001 confirmado. Não equivale à cobertura completa desses critérios. |
| Cupons | CA01/02/03/04; CT01/02/03/04 | #2, #3, #4, #5 | CT01 e CT03 passaram na UI; faltam normalização, expirado e rejeição de pedido na API. |
| Transições do carrinho | CA05/08; CT05/10 | #3, #4, #5 | Pendente; recalcular ao aplicar/remover cupom e mudar quantidade. |
| Quantidade e arredondamento | CA10/11; CT11/12/13 | #2, #3, #4, #5 | Pendente; conferir limites na UI/API e centavos. |
| Checkout e contratos | CT14/15/16/17 e variantes de CT03/04 | #3, #4, #5 | Pendente; confirmar valores do pedido e validações. |
| Exploração e entrega | EXP01/02 e checklist final | #3, #4, #6 | Pendente; exploração, relatório final, clone limpo e revisão humana. |

Cupons, transições e quantidade podem ser trabalhados independentemente; checkout usa o preparo do carrinho. A revisão final depende dos resultados de todos. Cada slice só termina com resultados e limitações registrados; um bug do produto não impede concluir sua investigação.
