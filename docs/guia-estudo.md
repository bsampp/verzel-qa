# Guia de estudo — o que este laboratório ensina

## O objetivo de QA neste exercício

Entregar uma avaliação que outra pessoa consiga conferir e repetir: o que deveria acontecer, o que aconteceu, como verificamos e qual o impacto da diferença. Encontrar bugs não é a única finalidade: também demonstramos comportamentos corretos, registramos limites e recomendamos se a entrega pode ser aprovada.

Concluir o trabalho de QA não significa que a aplicação esteja aprovada. Aqui, a entrega técnica pode estar organizada enquanto dois defeitos impedem recomendar aprovação funcional.

## Os nomes que usamos

| Nome | Origem e função |
| --- | --- |
| CA01–CA11 | Critérios de aceite definidos pela Verzel |
| CT01–CT20 | Casos de teste definidos neste projeto a partir das regras |
| EX-001–EX-010 | Identificadores das primeiras execuções incrementais |
| RF-001–RF-069 | Variantes executadas na rodada completa |
| BUG-001/002 | Dois defeitos confirmados; publicados nas issues #7 e #8 |
| EXP01/02 | Sessões curtas de exploração assistida |

Um caso pode cobrir vários critérios e ter várias variantes. Por exemplo, CT12 vira quatro testes: quantidades cinco e seis nas rotas de cálculo e pedido. IDs ajudam a rastrear; não são exigidos pelo Playwright.

## Como uma regra vira um teste

Regra: subtotal a partir de R$ 200, inclusive, tem frete grátis. Primeiro escolhemos dados válidos do catálogo. Depois calculamos o resultado sem consultar o cálculo da aplicação:

- Duas mochilas: 2 × 100 = 200.
- BEMVINDO10: desconto de 20.
- Frete esperado: zero, pois considera o subtotal antes do desconto.
- Total esperado: 200 − 20 + 0 = 180.

A aplicação confirmou 199,90. A diferença de 19,90 é verificável, reproduzível e ligada a um critério explícito. Isso fundamenta BUG-001. Somente uma captura de tela, sem dados e passos, seria uma evidência incompleta.

## Como investigamos sem adivinhar a causa

Comparamos valores abaixo, exatamente no limite e acima, com e sem cupom. R$ 200 falhou nas duas variantes; R$ 199,80 e R$ 229,90 tiveram os resultados esperados. Depois testamos 209,80 com cupom, resultando em 188,82 e frete grátis. Assim, cair abaixo de 200 após o desconto não é suficiente para provocar o defeito.

A hipótese de uma comparação `> 200` em vez de `>= 200` é plausível. Sem o código, continua sendo hipótese. O relatório deve provar o comportamento, sem inventar a implementação.

Também encontramos um erro nosso: quatro bonés de 49,90 somam 199,60, não 199,80. Corrigimos a massa para calça + camiseta. Uma falha de teste pode vir do produto, da expectativa, dos dados ou da ferramenta; sempre investigue antes de abrir um bug.

## Unitário, integração, API e E2E

| Tipo | O que seria neste contexto |
| --- | --- |
| Unitário | Testar isoladamente a função real que calcula o frete; precisamos do código da loja |
| Integração | Exercitar a conexão real entre componentes, com limites de isolamento definidos |
| API | Enviar dados às rotas publicadas e conferir contrato e regra de negócio |
| E2E | Usar a interface e os serviços reais para realizar uma jornada, até confirmar o pedido |

Playwright é uma ferramenta, não um nível de teste: pode operar o navegador ou usar a fixture `request` para chamadas HTTP. Nossos testes de API avaliam o sistema publicado; não provam a integração interna de componentes que não vemos. Não criamos uma cópia da função de cálculo só para dizer que fizemos teste unitário.

## Por que não verificar tudo pelo navegador

API permite combinar entradas rapidamente e investigar cálculo/validação com menos passos. Navegador confirma interações, mensagens, mudanças de estado e consistência do fluxo. Os dois são necessários aqui: a UI respeitou cinco unidades, mas a API aceitou seis. Conferir apenas a UI deixaria BUG-002 passar.

Ao contrário, apenas testar a API não mostraria se a interface reage à remoção de um cupom ou atualiza os valores ao mudar a quantidade. Para isso usamos CT05 e CT10.

## Como ler o código

1. `tests/carrinho.spec.ts`: nosso primeiro caso, preparação → ação → verificação.
2. `tests/cupons.spec.ts`: várias entradas usando a mesma sequência de UI.
3. `tests/frete.api.spec.ts`: tabela de valores esperados independentes da aplicação.
4. `tests/contratos.api.spec.ts`: status HTTP, códigos de erro, dados inválidos e limites.
5. `tests/fluxos.spec.ts`: transições, quantidade, checkout e validação de formulário.
6. `tests/support.ts`: coleta de evidências reutilizada; não contém regras de negócio.
7. `playwright.config.ts`: ambiente, isolamento, um worker e relatórios.

`test.step` organiza etapas no relatório. `expect` compara o observado ao esperado. Verificações de locators aguardam o estado desejado sem `sleep` fixo. `expect.soft` registra uma falha e permite observar os demais valores, mas o teste continua reprovado. Ele não deve ser usado para continuar uma ação quando faltam pré-condições essenciais.

Seletores por papel e nome representam controles visíveis ao usuário. Os totais usam `data-valor` da página, evitando classes de estilo. Cada teste recebe contexto limpo, sem depender de execução anterior. Não usamos mocks para esconder problemas da aplicação, nem `test.fail` ou `skip` para deixar o relatório verde.

`npm run typecheck` verifica tipos; o Playwright transpila TypeScript, mas não substitui essa verificação. `npm ci` usa o lockfile; `.nvmrc` registra a versão de Node validada.

## Status HTTP depende da operação

Um cupom inválido em `/carrinho/calcular` retorna 200 com mensagem e desconto zero. Em `/pedidos`, o mesmo cupom deve retornar 422. Um teste que exige 422 nos dois lugares estaria errado. Contrato e contexto vêm antes de uma regra genérica sobre o significado de status.

## Teste manual e exploração

Um roteiro manual repete passos definidos. Exploração usa um objetivo e escolhe o próximo passo conforme as observações. Em EXP01, olhamos normalização, fronteira do frete e limpeza; em EXP02, tentamos confirmar dados vazios, corrigimos o nome e verificamos a recuperação até a confirmação.

As sessões foram operadas pelo agente através do navegador e têm duração curta, registrada. Não devem ser apresentadas como uma longa revisão humana. Faça sua própria leitura e reprodução para conseguir defender as decisões na entrevista.

## Como organizamos slices e issues

Inspirados no conceito de slices verificáveis de Matt Pocock, cada slice atravessa regra, cenário, execução, evidência e resultado. Não separamos em tarefas gigantes de “escrever todos os testes” e “coletar todas as evidências”. Os seis tickets existentes acompanham o progresso, e defeitos têm issues próprias. A aplicação da ideia foi adaptada a QA; não instalamos nem executamos o conjunto completo de skills.

Um slice pode terminar com falhas reais registradas. Corrigir a loja pertence ao time responsável pela aplicação; nossa responsabilidade é produzir um diagnóstico reproduzível.

## O que levar para o seu outro projeto

Comece pelas regras e jornadas mais importantes. Com código-fonte, coloque cálculos e validações em testes unitários; verifique conexões reais em testes de integração; mantenha jornadas essenciais em E2E. Decida quais verificações devem rodar a cada PR e quais ficam para uma rodada mais ampla. Um relatório vermelho precisa indicar falha de produto, de teste ou de infraestrutura com evidência suficiente para investigar.

Não copie esta quantidade de testes ou a estrutura de IDs automaticamente. Adapte ao risco, ao tempo de execução e ao que a equipe precisa entender. A camada de QA inclui testes, critérios claros, evidências e decisões sobre aceitar uma alteração.

## Perguntas para você praticar

- Por que CT09 falha, mas CT20 passa?
- Por que oito testes reprovados representam dois bugs?
- Como sabemos que o defeito de quantidade está na API?
- Por que retornar 200 com cupom inválido pode estar correto?
- O que não conseguimos concluir sem o código-fonte?
- Como você provaria que uma correção resolveu o problema sem causar regressão?

Para estudar executando: rode `npm run typecheck`, depois um arquivo por vez, e abra `npm run test:report`. Leia a expectativa que falhou, veja o anexo e tente explicar a divergência com suas palavras.
