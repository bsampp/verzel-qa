# Plano de testes

## Objetivo

Avaliar se VZS-142 atende CA01–CA11 na interface e na API, priorizando erros de valor cobrado, limites de frete e consistência até a confirmação do pedido.

## Abordagem

1. Reconfirmar documentação, ambiente e dados fixos.
2. Revisar tabela de cenários e resultados esperados independentes.
3. Fazer execução manual determinística e sessões exploratórias com objetivo definido.
4. Reproduzir divergências, registrar defeitos e evidências; separar indisponibilidade de bug funcional.
5. Automatizar pelo menos 3 cenários com Playwright. Sugestão: cupom válido abaixo do limite, frete no limite exato com cupom e cupom inválido. Cobertura de UI nos três; API complementa os limites e contratos.
6. Executar a suíte e consolidar resultados, limitações e recomendação final.

Técnicas: partições válidas/inválidas, fronteiras possíveis do catálogo e transições (aplicar, remover, alterar quantidade, finalizar). Smoke de catálogo e checkout como suporte ao fluxo principal.

## Ambiente e isolamento

Registrar data/hora e fuso, navegador/versão, sistema operacional, URL e versão documentada em cada execução. Usar dados fictícios e contexto limpo para cada cenário; não depender de pedidos anteriores. Na automação futura, um worker inicialmente, sem testes de carga ou ciclos agressivos. Sem testes de segurança.

## Prioridades

- P0: valor final, frete e desconto; risco de cobrança errada.
- P1: normalização, mensagens de cupom, troca/remoção, limite de quantidade.
- P2: contratos auxiliares, regressão e exploração complementar.

Prioridade orienta a ordem de execução. Severidade de bugs depende do impacto observado: crítica (fluxo essencial indisponível), alta (valor incorreto/regra essencial), média (comportamento com alternativa), baixa (impacto pequeno). Justificar caso a caso.

## Agenda proposta em 5 dias

| Dia | Resultado |
| --- | --- |
| 1 | Fonte reconferida, regras, cenários e smoke |
| 2 | Execução de cupons/frete e primeiros reports |
| 3 | Quantidades, API, checkout e exploração |
| 4 | 3 ou mais automações Playwright, execução e relatório |
| 5 | Revisão das evidências, README, acesso público e envio |

Não interpretar esses dias como datas fixas: contar a partir do recebimento real.

## Conclusão

Cada cenário deve ter resultado real e evidência ou motivo para bloqueio/não execução. Bugs confirmados devem ser reproduzíveis. A suíte deve ter comando verificável e pelo menos 3 cenários executados; falhas de produto permanecem reportadas e não devem ser mascaradas para obter verde. A entrega pode conter bugs abertos com recomendação justificada de não aprovação. Documentar cobertura e limitações restantes.

## Execução efetiva

O cronograma acima preserva o planejamento inicial, não um compromisso de datas. O trabalho foi realizado como laboratório com estudo entre 18 e 20/10/2026. Em 20/10, a suíte completa e o clone limpo reproduziram 61 aprovações e 8 reprovações por dois defeitos. Duas explorações dirigidas curtas foram executadas; a duração sugerida de 20 minutos por sessão não foi cumprida e não é apresentada como tempo real. Ver [relatório final](relatorio-final.md), [exploração](exploracao.md) e [verificação](verificacao-entrega.md).
