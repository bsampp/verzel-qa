# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: frete.api.spec.ts >> CT09 API — subtotal 200, com cupom
- Location: tests/frete.api.spec.ts:15:7

# Error details

```
Error: frete

expect(received).toBe(expected) // Object.is equality

Expected: 0
Received: 19.9
```

```
Error: total

expect(received).toBe(expected) // Object.is equality

Expected: 180
Received: 199.9
```

```
Error: freteGratis

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  |
  3  | // Valores esperados definidos pela documentação, independentemente da API.
  4  | const casos = [
  5  |   { id: 'CT06', itens: [{ produtoId: 'P002', quantidade: 1 }, { produtoId: 'P001', quantidade: 1 }], cupom: undefined, subtotal: 199.8, desconto: 0, frete: 19.9, total: 219.7, faltante: 0.2 },
  6  |   { id: 'CT18', itens: [{ produtoId: 'P002', quantidade: 1 }, { produtoId: 'P001', quantidade: 1 }], cupom: 'BEMVINDO10', subtotal: 199.8, desconto: 19.98, frete: 19.9, total: 199.72, faltante: 0.2 },
  7  |   { id: 'CT07', itens: [{ produtoId: 'P005', quantidade: 2 }], cupom: undefined, subtotal: 200, desconto: 0, frete: 0, total: 200, faltante: 0 },
  8  |   { id: 'CT09', itens: [{ produtoId: 'P005', quantidade: 2 }], cupom: 'BEMVINDO10', subtotal: 200, desconto: 20, frete: 0, total: 180, faltante: 0 },
  9  |   { id: 'CT08', itens: [{ produtoId: 'P007', quantidade: 1 }], cupom: undefined, subtotal: 229.9, desconto: 0, frete: 0, total: 229.9, faltante: 0 },
  10 |   { id: 'CT19', itens: [{ produtoId: 'P007', quantidade: 1 }], cupom: 'BEMVINDO10', subtotal: 229.9, desconto: 22.99, frete: 0, total: 206.91, faltante: 0 },
  11 |   { id: 'CT20', itens: [{ produtoId: 'P005', quantidade: 1 }, { produtoId: 'P008', quantidade: 1 }, { produtoId: 'P006', quantidade: 2 }], cupom: 'BEMVINDO10', subtotal: 209.8, desconto: 20.98, frete: 0, total: 188.82, faltante: 0 },
  12 | ];
  13 |
  14 | for (const caso of casos) {
  15 |   test(`${caso.id} API — subtotal ${caso.subtotal}, ${caso.cupom ? 'com' : 'sem'} cupom`, async ({ request }, testInfo) => {
  16 |     const payload = {
  17 |       itens: caso.itens,
  18 |       ...(caso.cupom ? { cupom: caso.cupom } : {}),
  19 |     };
  20 |     const resposta = await request.post('/api/carrinho/calcular', { data: payload });
  21 |     const corpo = await resposta.json();
  22 |
  23 |     await testInfo.attach('calculo-carrinho', {
  24 |       body: JSON.stringify({
  25 |         coletadoEm: new Date().toISOString(),
  26 |         metodo: 'POST', url: resposta.url(), requisicao: payload,
  27 |         status: resposta.status(), resposta: corpo,
  28 |       }, null, 2),
  29 |       contentType: 'application/json',
  30 |     });
  31 |
  32 |     expect(resposta.status()).toBe(200);
  33 |     expect.soft(corpo.subtotal, 'subtotal').toBe(caso.subtotal);
  34 |     expect.soft(corpo.desconto, 'desconto').toBe(caso.desconto);
  35 |     expect.soft(corpo.frete, 'frete').toBe(caso.frete);
  36 |     expect.soft(corpo.total, 'total').toBe(caso.total);
> 37 |     expect.soft(corpo.freteGratis, 'freteGratis').toBe(caso.frete === 0);
     |                                                   ^ Error: freteGratis
  38 |     expect.soft(corpo.valorFaltanteFreteGratis, 'faltante').toBe(caso.faltante);
  39 |   });
  40 | }
  41 |
```
