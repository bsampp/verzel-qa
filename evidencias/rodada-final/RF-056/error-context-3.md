# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fluxos.spec.ts >> CT07 UI — fronteira de frete sem cupom
- Location: tests/fluxos.spec.ts:91:7

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('[data-valor="frete"]')
Expected pattern: /^(Grátis|R\$\s0,00)$/i
Received string:  "R$ 19,90"
Timeout: 5000ms

Call log:
  - Expect "soft toHaveText" locator('[data-valor="frete"]') with timeout 5000ms
  - waiting for locator('[data-valor="frete"]')
    14 × locator resolved to <dd data-valor="frete">R$ 19,90</dd>
       - unexpected value "R$ 19,90"

```

```yaml
- definition: R$ 19,90
```

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[data-valor="total"]')
Expected: "R$ 200,00"
Received: "R$ 219,90"
Timeout:  5000ms

Call log:
  - Expect "soft toHaveText" locator('[data-valor="total"]') with timeout 5000ms
  - waiting for locator('[data-valor="total"]')
    14 × locator resolved to <dd data-valor="total">R$ 219,90</dd>
       - unexpected value "R$ 219,90"

```

```yaml
- definition: R$ 219,90
```

# Test source

```ts
  1   | import { test, expect, type Page } from '@playwright/test';
  2   | import { registrarResposta, registrarTela } from './support';
  3   |
  4   | async function adicionar(page: Page, nome: string, quantidade = 1) {
  5   |   const botao = page.getByRole('article', { name: nome, exact: true }).getByRole('button', { name: 'Adicionar ao carrinho' });
  6   |   for (let i = 0; i < quantidade; i++) await botao.click();
  7   | }
  8   |
  9   | async function aplicarCupom(page: Page) {
  10  |   await page.getByLabel('Cupom de desconto', { exact: true }).fill('BEMVINDO10');
  11  |   await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
  12  |   await expect(page.getByRole('button', { name: 'Remover cupom', exact: true })).toBeVisible();
  13  | }
  14  |
  15  | test.afterEach(async ({ page }, info) => { await registrarTela(page, info); });
  16  |
  17  | test('CT05 — remover, rejeitar outro cupom e reaplicar sem acumular desconto', async ({ page }) => {
  18  |   await page.goto('/');
  19  |   await adicionar(page, 'Mochila Urbana 20L');
  20  |   await page.getByRole('link', { name: /Carrinho/ }).click();
  21  |   await aplicarCupom(page);
  22  |   await expect(page.getByLabel('Cupom de desconto', { exact: true })).toHaveCount(0);
  23  |   await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
  24  |   await page.getByRole('button', { name: 'Remover cupom', exact: true }).click();
  25  |   await expect(page.locator('[data-valor="desconto"]')).toHaveText('R$ 0,00');
  26  |   await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 119,90');
  27  |   await page.getByLabel('Cupom de desconto', { exact: true }).fill('INEXISTENTE');
  28  |   await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
  29  |   await expect(page.getByText('Cupom inválido.', { exact: true })).toBeVisible();
  30  |   await expect(page.locator('[data-valor="desconto"]')).toHaveText('R$ 0,00');
  31  |   await aplicarCupom(page);
  32  |   await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 10,00');
  33  |   await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
  34  | });
  35  |
  36  | test('CT10 — recalcular ao passar de uma para duas mochilas e voltar', async ({ page }, info) => {
  37  |   await page.goto('/');
  38  |   await adicionar(page, 'Mochila Urbana 20L');
  39  |   await page.getByRole('link', { name: /Carrinho/ }).click();
  40  |   await aplicarCupom(page);
  41  |   await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
  42  |   await page.getByRole('button', { name: 'Aumentar quantidade de Mochila Urbana 20L', exact: true }).click();
  43  |   await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 200,00');
  44  |   await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 20,00');
  45  |   await registrarTela(page, info);
  46  |   await expect.soft(page.locator('[data-valor="frete"]')).toHaveText(/^(Grátis|R\$\s0,00)$/i);
  47  |   await expect.soft(page.locator('[data-valor="total"]')).toHaveText('R$ 180,00');
  48  |   await page.getByRole('button', { name: 'Diminuir quantidade de Mochila Urbana 20L', exact: true }).click();
  49  |   await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 100,00');
  50  |   await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 10,00');
  51  |   await expect(page.locator('[data-valor="frete"]')).toHaveText('R$ 19,90');
  52  |   await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
  53  | });
  54  |
  55  | test('CT11 — limitar quantidade no catálogo e carrinho e permitir voltar a cinco', async ({ page }, info) => {
  56  |   await page.goto('/');
  57  |   await adicionar(page, 'Kit 3 Pares de Meias', 5);
  58  |   const adicionarMais = page.getByRole('article', { name: 'Kit 3 Pares de Meias', exact: true }).getByRole('button', { name: 'Adicionar ao carrinho' });
  59  |   if (await adicionarMais.isEnabled()) await adicionarMais.click();
  60  |   await expect.soft(page.getByRole('link', { name: /Carrinho/ })).toHaveText('Carrinho5');
  61  |   await registrarTela(page, info);
  62  |   await page.getByRole('link', { name: /Carrinho/ }).click();
  63  |   const quantidade = page.getByRole('status', { name: 'Quantidade de Kit 3 Pares de Meias', exact: true });
  64  |   await expect(quantidade).toHaveText('5');
  65  |   const aumentar = page.getByRole('button', { name: 'Aumentar quantidade de Kit 3 Pares de Meias', exact: true });
  66  |   if (await aumentar.isEnabled()) await aumentar.click();
  67  |   await expect(quantidade).toHaveText('5');
  68  |   await page.getByRole('button', { name: 'Diminuir quantidade de Kit 3 Pares de Meias', exact: true }).click();
  69  |   await expect(quantidade).toHaveText('4');
  70  |   await aumentar.click();
  71  |   await expect(quantidade).toHaveText('5');
  72  | });
  73  |
  74  | test('CT13 — apresentar desconto e total com centavos corretos', async ({ page }) => {
  75  |   await page.goto('/');
  76  |   await adicionar(page, 'Calça Jeans Slim');
  77  |   await adicionar(page, 'Boné Aba Curva', 2);
  78  |   await page.getByRole('link', { name: /Carrinho/ }).click();
  79  |   await aplicarCupom(page);
  80  |   await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 239,70');
  81  |   await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 23,97');
  82  |   await expect(page.locator('[data-valor="frete"]')).toHaveText(/^(Grátis|R\$\s0,00)$/i);
  83  |   await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 215,73');
  84  | });
  85  |
  86  | for (const caso of [
  87  |   { id: 'CT06', produtos: [['Calça Jeans Slim', 1], ['Camiseta Essencial', 1]] as const, subtotal: 'R$ 199,80', frete: 'R$ 19,90', total: 'R$ 219,70', faltante: 'Faltam R$ 0,20 para o frete grátis.' },
  88  |   { id: 'CT07', produtos: [['Mochila Urbana 20L', 2]] as const, subtotal: 'R$ 200,00', frete: /^(Grátis|R\$\s0,00)$/i, total: 'R$ 200,00' },
  89  |   { id: 'CT08', produtos: [['Jaqueta Corta-Vento', 1]] as const, subtotal: 'R$ 229,90', frete: /^(Grátis|R\$\s0,00)$/i, total: 'R$ 229,90' },
  90  | ]) {
  91  |   test(`${caso.id} UI — fronteira de frete sem cupom`, async ({ page }) => {
  92  |     await page.goto('/');
  93  |     for (const [nome, quantidade] of caso.produtos) await adicionar(page, nome, quantidade);
  94  |     await page.getByRole('link', { name: /Carrinho/ }).click();
  95  |     await expect(page.locator('[data-valor="subtotal"]')).toHaveText(caso.subtotal);
  96  |     await expect.soft(page.locator('[data-valor="frete"]')).toHaveText(caso.frete);
> 97  |     await expect.soft(page.locator('[data-valor="total"]')).toHaveText(caso.total);
      |                                                             ^ Error: expect(locator).toHaveText(expected) failed
  98  |     if (caso.faltante) await expect(page.getByText(caso.faltante, { exact: true })).toBeVisible();
  99  |   });
  100 | }
  101 |
  102 | for (const quantidade of [1, 2]) {
  103 |   test(`CT14 — confirmar pedido de ${quantidade} mochila(s) com cupom`, async ({ page }, info) => {
  104 |     await page.goto('/');
  105 |     await adicionar(page, 'Mochila Urbana 20L', quantidade);
  106 |     await page.getByRole('link', { name: /Carrinho/ }).click();
  107 |     await aplicarCupom(page);
  108 |     await page.getByRole('link', { name: 'Finalizar compra', exact: true }).click();
  109 |     await page.getByLabel('Nome completo', { exact: true }).fill('Maria Silva');
  110 |     await page.getByLabel('E-mail', { exact: true }).fill('maria@example.com');
  111 |     await page.getByLabel('CEP', { exact: true }).fill('01310-100');
  112 |     const pedido = page.waitForResponse(r => new URL(r.url()).pathname === '/api/pedidos' && r.request().method() === 'POST');
  113 |     await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
  114 |     const resposta = await pedido;
  115 |     const corpo = await registrarResposta(resposta, { metodo: 'POST', payload: resposta.request().postDataJSON() }, info);
  116 |     expect(resposta.status()).toBe(201);
  117 |     expect(corpo.numero).toMatch(/^VZ-\d{6}$/);
  118 |     const esperado = quantidade === 1 ? { subtotal: 100, desconto: 10, frete: 19.9, total: 109.9 } : { subtotal: 200, desconto: 20, frete: 0, total: 180 };
  119 |     expect.soft(corpo).toMatchObject(esperado);
  120 |     await expect(page.getByText(corpo.numero, { exact: false })).toBeVisible();
  121 |     await expect.soft(page.locator('[data-valor="total"]')).toHaveText(quantidade === 1 ? 'R$ 109,90' : 'R$ 180,00');
  122 |   });
  123 | }
  124 |
  125 | for (const caso of [
  126 |   { nome: 'nome sem sobrenome', cliente: { nome: 'Maria', email: 'maria@example.com', cep: '01310-100' }, campo: 'Nome completo' },
  127 |   { nome: 'email inválido', cliente: { nome: 'Maria Silva', email: 'invalido', cep: '01310-100' }, campo: 'E-mail' },
  128 |   { nome: 'CEP curto', cliente: { nome: 'Maria Silva', email: 'maria@example.com', cep: '0131010' }, campo: 'CEP' },
  129 | ]) {
  130 |   test(`CT16 UI — ${caso.nome}`, async ({ page }) => {
  131 |     await page.goto('/');
  132 |     await adicionar(page, 'Mochila Urbana 20L');
  133 |     await page.getByRole('link', { name: /Carrinho/ }).click();
  134 |     await page.getByRole('link', { name: 'Finalizar compra', exact: true }).click();
  135 |     await page.getByLabel('Nome completo', { exact: true }).fill(caso.cliente.nome);
  136 |     await page.getByLabel('E-mail', { exact: true }).fill(caso.cliente.email);
  137 |     await page.getByLabel('CEP', { exact: true }).fill(caso.cliente.cep);
  138 |     await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
  139 |     await expect(page.getByLabel(caso.campo, { exact: true })).toHaveAttribute('aria-invalid', 'true');
  140 |     await expect(page).toHaveURL(/\/checkout$/);
  141 |   });
  142 | }
  143 |
```
