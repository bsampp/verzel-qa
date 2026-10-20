# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: carrinho.spec.ts >> CT09 — manter frete grátis com subtotal de R$ 200 e cupom de 10%
- Location: tests/carrinho.spec.ts:3:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('region', { name: 'Resumo do pedido' }).locator('[data-valor="frete"]')
Expected pattern: /^(Grátis|R\$\s0,00)$/i
Received string:  "R$ 19,90"
Timeout: 5000ms

Call log:
  - Expect "soft toHaveText" getByRole('region', { name: 'Resumo do pedido' }).locator('[data-valor="frete"]') with timeout 5000ms
  - waiting for getByRole('region', { name: 'Resumo do pedido' }).locator('[data-valor="frete"]')
    14 × locator resolved to <dd data-valor="frete">R$ 19,90</dd>
       - unexpected value "R$ 19,90"

```

```yaml
- definition: R$ 19,90
```

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByRole('region', { name: 'Resumo do pedido' }).locator('[data-valor="total"]')
Expected: "R$ 180,00"
Received: "R$ 199,90"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" getByRole('region', { name: 'Resumo do pedido' }).locator('[data-valor="total"]') with timeout 5000ms
  - waiting for getByRole('region', { name: 'Resumo do pedido' }).locator('[data-valor="total"]')
    14 × locator resolved to <dd data-valor="total">R$ 199,90</dd>
       - unexpected value "R$ 199,90"

```

```yaml
- definition: R$ 199,90
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | test('CT09 — manter frete grátis com subtotal de R$ 200 e cupom de 10%', async ({ page }, testInfo) => {
  4  |   await test.step('Adicionar duas mochilas ao carrinho', async () => {
  5  |     await page.goto('/');
  6  |     const mochila = page.getByRole('article', { name: 'Mochila Urbana 20L' });
  7  |     await mochila.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
  8  |     await mochila.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
  9  |     await page.getByRole('link', { name: /Carrinho/ }).click();
  10 |     await expect(page.getByRole('status', { name: 'Quantidade de Mochila Urbana 20L' })).toHaveText('2');
  11 |   });
  12 |
  13 |   await test.step('Aplicar BEMVINDO10 e registrar a resposta real da API', async () => {
  14 |     await page.getByLabel('Cupom de desconto', { exact: true }).fill('BEMVINDO10');
  15 |     const calculo = page.waitForResponse(response =>
  16 |       new URL(response.url()).pathname === '/api/carrinho/calcular' &&
  17 |       response.request().method() === 'POST' &&
  18 |       response.request().postDataJSON()?.cupom === 'BEMVINDO10'
  19 |     );
  20 |     await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
  21 |     const resposta = await calculo;
  22 |     await testInfo.attach('calculo-carrinho', {
  23 |       body: JSON.stringify({
  24 |         coletadoEm: new Date().toISOString(),
  25 |         navegador: page.context().browser()?.version(),
  26 |         metodo: resposta.request().method(),
  27 |         url: resposta.url(),
  28 |         requisicao: resposta.request().postDataJSON(),
  29 |         status: resposta.status(),
  30 |         resposta: await resposta.json(),
  31 |       }, null, 2),
  32 |       contentType: 'application/json',
  33 |     });
  34 |     expect(resposta.status()).toBe(200);
  35 |     await expect(page.getByRole('button', { name: 'Remover cupom', exact: true })).toBeVisible();
  36 |   });
  37 |
  38 |   await test.step('Conferir os valores definidos por CA01, CA06 e CA08', async () => {
  39 |     const resumo = page.getByRole('region', { name: 'Resumo do pedido' });
  40 |     await expect(resumo.locator('[data-valor="subtotal"]')).toHaveText('R$ 200,00');
  41 |     await expect(resumo.locator('[data-valor="desconto"]')).toHaveText('- R$ 20,00');
  42 |     // Soft permite relatar frete e total incorretos na mesma execução.
  43 |     await expect.soft(resumo.locator('[data-valor="frete"]')).toHaveText(/^(Grátis|R\$\s0,00)$/i);
> 44 |     await expect.soft(resumo.locator('[data-valor="total"]')).toHaveText('R$ 180,00');
     |                                                               ^ Error: expect(locator).toHaveText(expected) failed
  45 |   });
  46 | });
  47 |
```
