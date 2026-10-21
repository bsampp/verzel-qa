# Gherkin: documentação legível dos cenários

Este guia explica, para quem está começando em QA, o que é Gherkin, como ler
[`cenarios.feature`](cenarios.feature) e por que essa documentação é diferente
da automação em TypeScript. Ele não substitui [`cenarios.md`](cenarios.md),
[`requisitos.md`](requisitos.md) nem os testes.

## O que é Gherkin

Gherkin é uma forma de escrever cenários de teste em linguagem natural, com
palavras-chave fixas. O arquivo tem extensão `.feature` e costuma começar com
`# language: pt` para indicar português.

O objetivo é permitir que pessoa de produto, QA e desenvolvimento leiam a mesma
regra. O Gherkin descreve **o que** deve acontecer; a automação descreve **como**
isso é verificado no navegador ou na API.

## Dado, Quando e Então

Três palavras formam o núcleo de um cenário:

| Palavra | Papel | Pergunta que responde |
| --- | --- | --- |
| **Dado** | Contexto inicial | Qual é a situação antes da ação? |
| **Quando** | Ação testada | O que a pessoa ou o sistema faz? |
| **Então** | Resultado esperado | O que deve ser observado depois? |

Exemplo simples:

```gherkin
Dado que o carrinho contém 1 mochila de R$ 100,00
Quando aplico o cupom "BEMVINDO10"
Então o desconto deve ser R$ 10,00
E o total deve ser R$ 109,90
```

`E` (e `Mas`) apenas continua a lista de passos do mesmo tipo. `E` depois de um
`Então` continua sendo uma verificação. `Mas` costuma destacar uma exceção ou
uma condição que contraria a expectativa anterior.

## Cenário, Esquema do Cenário e Exemplos

- `Cenário` descreve um caso concreto.
- `Esquema do Cenário` descreve um caso com partes variáveis, escritas entre
  `<...>`.
- `Exemplos` fornece as linhas da tabela que substituem essas variáveis.

No arquivo, por exemplo, o CT02 usa um esquema para testar `"bemvindo10"` e
`"  BeMvInDo10  "` sem repetir todos os passos. O CT12 usa o mesmo recurso para
as quantidades 5 e 6. O CT15 percorre uma invalidez por linha, e o CT17 percorre
rotas e erros diferentes.

As tags, como `@CT09`, `@CA06` e `@API`, não executam nada sozinhas. Elas servem
para rastrear o cenário e indicar a camada ou o critério relacionado.

## `.feature` não é o teste executável

O arquivo [`cenarios.feature`](cenarios.feature) é **documentação**. Ele não é
executado diretamente por `npm test`, e este projeto **não usa Cucumber**. A
automação real está em `tests/*.spec.ts`, com Playwright e TypeScript. O
`playwright.config.ts` aponta `testDir` para `./tests`, então o Playwright não lê
arquivos `.feature`.

| Documento `.feature` | Automação `.spec.ts` |
| --- | --- |
| Escrito em Gherkin, legível por pessoas | Escrito em TypeScript, executado pelo Playwright |
| Descreve regras e exemplos | Executa cliques, requisições e asserções |
| Pode juntar UI e API no mesmo cenário | Separa os testes por arquivo e camada |
| Não é lido por `npm test` | É lido por `npm test` e pelos comandos focados |
| Ajuda a comunicar e revisar o comportamento | Produz o resultado pass/fail e as evidências |

Manter os dois artefatos é intencional: o `.feature` explica a regra em
português; o teste prova o comportamento contra o ambiente. Se os dois
divergirem, a documentação oficial define a regra esperada; revisar o cenário e
o teste contra essa fonte. O resultado observado de uma rodada vem dos testes e
das evidências, sem alterar a regra para acomodar um bug.

## Exemplo correspondente a um teste existente: CT09

Trecho de [`cenarios.feature`](cenarios.feature):

```gherkin
@CT09 @CA01 @CA06 @CA08 @P0 @UI @API
Cenário: Manter o frete grátis quando o desconto reduz o total abaixo de R$ 200,00
  Dado que o carrinho contém 2 unidades de P005 (Mochila Urbana 20L) por R$ 100,00 cada
  Quando aplico o cupom "BEMVINDO10"
  Então o subtotal deve ser R$ 200,00
  E o desconto deve ser R$ 20,00
  E o frete deve ser grátis
  E o total deve ser R$ 180,00
```

O teste correspondente na interface está em
[`tests/carrinho.spec.ts`](../tests/carrinho.spec.ts#L3). Ele faz o mesmo caminho:
adiciona duas mochilas, aplica o cupom e confere o resumo do pedido.

```ts
test('CT09 — manter frete grátis com subtotal de R$ 200 e cupom de 10%', async ({ page }) => {
  await page.goto('/');
  const mochila = page.getByRole('article', { name: 'Mochila Urbana 20L' });
  await mochila.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
  await mochila.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
  await page.getByRole('link', { name: /Carrinho/ }).click();

  await page.getByLabel('Cupom de desconto', { exact: true }).fill('BEMVINDO10');
  await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();

  const resumo = page.getByRole('region', { name: 'Resumo do pedido' });
  await expect(resumo.locator('[data-valor="subtotal"]')).toHaveText('R$ 200,00');
  await expect(resumo.locator('[data-valor="desconto"]')).toHaveText('- R$ 20,00');
  await expect(resumo.locator('[data-valor="total"]')).toHaveText('R$ 180,00');
});
```

A versão pela API está em
[`tests/frete.api.spec.ts`](../tests/frete.api.spec.ts:8): ela envia o carrinho
para `POST /api/carrinho/calcular` e compara os números esperados. O `.feature`
não escolhe uma única camada; ele documenta a regra que vale para UI e API.

## Como executar a automação Playwright

Pré-requisitos, uma vez por clone:

```bash
npm ci
npx playwright install chromium
```

Verificação de tipos e execução focada no CT09:

```bash
npm run typecheck
npx playwright test tests/carrinho.spec.ts --grep "CT09"
```

Outros comandos úteis:

```bash
# Todos os testes
npm test

# Somente cupons pela interface
npx playwright test tests/cupons.spec.ts

# Somente contratos da API
npx playwright test tests/contratos.api.spec.ts

# Reproduzir a falha de quantidade da API
npx playwright test tests/contratos.api.spec.ts --grep "CT12 API quantidade 6"

# Abrir o relatório HTML da última execução
npm run test:report
```

`npm test` não executa `docs/cenarios.feature`. Ele executa os arquivos de
`tests/` configurados no Playwright. O retorno **código 1** da suíte completa é
esperado enquanto BUG-001 (frete no subtotal de R$ 200,00) e BUG-002 (sexta
unidade aceita pela API) existirem. Isso é reprovação funcional, não erro de
instalação nem falha do Gherkin.

## Cupom inválido: cálculo 200 e pedido 422

Essa distinção aparece nos CT03 e CT04 e é importante para não interpretar a
rejeição do cupom como erro de cálculo:

- `POST /api/carrinho/calcular` responde **HTTP 200**, com desconto zero,
  `cupom.aplicado` falso e a mensagem `Cupom inválido.` ou `Cupom expirado.`.
- `POST /api/pedidos` responde **HTTP 422**, com o código `CUPOM_INVALIDO` ou
  `CUPOM_EXPIRADO`.

Já payloads inválidos do CT15 (itens ausentes, quantidade inválida e outros)
retornam **422 nas duas rotas**. O `.feature` separa esses contratos de propósito.

## Conferência de valores

Os valores do `.feature` foram conferidos com a tabela de preços de
[`requisitos.md`](requisitos.md):

- 4 bonés custam 4 × R$ 49,90 = **R$ 199,60**. Esse total não é usado como
  R$ 199,80.
- O subtotal de **R$ 199,80** do CT06/CT18 é calça jeans (R$ 139,90) + camiseta
  (R$ 59,90).
- 2 mochilas custam **R$ 200,00**; com 10% de desconto, o total é **R$ 180,00**,
  e o frete continua grátis porque a elegibilidade usa o subtotal antes do
  desconto (CA08).
- O CT20 soma R$ 100,00 + R$ 50,00 + 2 × R$ 29,90 = **R$ 209,80**; com desconto
  de 10%, o total fica **R$ 188,82**, ainda com frete grátis pela mesma regra.

## Como ler e manter os artefatos

- [`cenarios.md`](cenarios.md) é a tabela de planejamento: dados, camada,
  prioridade e rastreabilidade.
- [`cenarios.feature`](cenarios.feature) é a especificação documental em Gherkin, com
  os IDs CT01–CT20.
- `tests/*.spec.ts` é a automação que produz os resultados reais.
- [`rodada-final.md`](rodada-final.md) e [`execucao.md`](execucao.md) registram o
  que aconteceu em cada variante.

Os resultados esperados no `.feature` são os da regra correta. Os bugs
conhecidos permanecem visíveis nos testes; não se deve alterar a expectativa
para obter verde.

## Limites deste material

Este guia e o `.feature` documentam os 20 cenários planejados nesta entrega.
Isso não significa cobertura exaustiva do produto nem revisão humana
independente. Também não há execução de Gherkin por Cucumber, carga, estresse,
segurança, acessibilidade ampla ou múltiplos navegadores.
