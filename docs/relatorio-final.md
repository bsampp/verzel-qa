# Relatório final — VZS-142

## Decisão

**Não aprovar a entrega funcional enquanto BUG-001 e BUG-002 permanecerem abertos.** O primeiro altera o valor confirmado de um pedido elegível à promoção; o segundo permite ultrapassar o limite documentado de quantidade pela API. A entrega de QA registra resultados e não corrige o produto.

## Execução e alcance

Rodada completa em 20/10/2026, início 16:13:10 UTC, aproximadamente 82 segundos: **69 testes, 61 aprovados, 8 reprovados, nenhum ignorado e nenhum flaky**. 18 testes pelo navegador e 51 pela API. Um worker, sem retries ou mocks. Ambiente: Node 26.8.1, Playwright 1.64.1, Chromium 156.0.8078.4, Linux x86_64. [Todos os resultados](rodada-final.md).

Há 20 cenários de planejamento; múltiplas variantes por cenário explicam os 69 testes. As oito falhas não são oito defeitos: seis se referem ao frete no limite e duas à quantidade na API.

Complemento: duas sessões curtas de exploração dirigidas pelo agente na UI, documentadas com sequência, horários, esperado/obtido e snapshots. Não são sessões humanas nem uma avaliação exaustiva. A pessoa candidata identificou inicialmente o primeiro bug e acompanhou o desenvolvimento deste laboratório.

## Cobertura por critério

| Critério | Verificação | Resultado e limite |
| --- | --- | --- |
| CA01 | 10% do subtotal, CT01/13/18/19/20, UI/API | Desconto correto nos casos executados |
| CA02 | Minúsculas e caixa mista com espaços, CT02, UI/API/cálculo/pedido | Passou |
| CA03 | Cupom inexistente, CT03 | UI com mensagem e desconto zero; cálculo 200 e pedido 422: passou |
| CA04 | Cupom expirado, CT04 | UI com mensagem e desconto zero; cálculo 200 e pedido 422: passou |
| CA05 | Um cupom por vez, remoção e reaplicação, CT05 | Passou; só existe um cupom válido, não foi possível alternar entre dois códigos válidos distintos |
| CA06 | Subtotal abaixo/exatamente/acima de 200, CT06/07/08/09 | **Falhou no valor exato**, BUG-001 |
| CA07 | Frete 19,90 e faltante abaixo de 200, CT01/06/18 | Passou |
| CA08 | Considerar subtotal antes do desconto, CT20 | Passou com subtotal 209,80 e total 188,82; CT09 no limite continua reprovado pelo BUG-001, sem atribuir causa ao desconto |
| CA09 | Desconto não incide sobre frete, CT01/18 | Passou |
| CA10 | Cinco aceitos/seis rejeitados, CT11/12 | UI passou; **API falhou nas duas rotas**, BUG-002 |
| CA11 | Centavos, CT13 na UI/API | Passou nos valores do catálogo; política de desempate de meio centavo não especificada |

Checkout: uma mochila com cupom confirmou R$ 109,90; duas mochilas confirmaram incorretamente R$ 199,90, em vez de R$ 180,00. Validações de cliente, formatos de CEP e contratos de erro executados conforme CT15/16/17. A API simulada não registra pedidos de verdade.

## Defeitos

| Defeito | Impacto observado | Evidência principal | Estado |
| --- | --- | --- | --- |
| [BUG-001 / #7](bugs/BUG-001.md) | Frete de R$ 19,90 a mais no subtotal de R$ 200; chega à confirmação do pedido | RF-059: tela e HTTP 201 com total 199,90 | Aberto; severidade alta |
| [BUG-002 / #8](bugs/BUG-002.md) | API aceita seis unidades apesar do máximo de cinco | RF-008: HTTP 200; RF-024: HTTP 201, ambos com quantidade 6 | Aberto; severidade alta |

## Limites e próximos passos do produto

Sem código-fonte para comprovar causas internas ou criar testes unitários da aplicação. Hipóteses de implementação não são diagnósticos confirmados. Sem carga, estresse, segurança, estoque, autenticação ou pagamento online. Dados fixos impedem testar todos os limites monetários ao centavo. Não houve auditoria ampla de acessibilidade, layout ou navegadores.

Após correções: reexecutar os testes reprovados, depois a suíte completa para detectar regressões. Atualizar os reports com os resultados reais; não mudar os valores esperados para acomodar os defeitos. A disponibilidade pública do repositório e o envio pelo formulário ainda exigem os passos de publicação descritos no README.
