import { test, expect } from '@playwright/test';

// Valores esperados definidos pela documentação, independentemente da API.
const casos = [
  { id: 'CT06', itens: [{ produtoId: 'P002', quantidade: 1 }, { produtoId: 'P001', quantidade: 1 }], cupom: undefined, subtotal: 199.8, desconto: 0, frete: 19.9, total: 219.7, faltante: 0.2 },
  { id: 'CT18', itens: [{ produtoId: 'P002', quantidade: 1 }, { produtoId: 'P001', quantidade: 1 }], cupom: 'BEMVINDO10', subtotal: 199.8, desconto: 19.98, frete: 19.9, total: 199.72, faltante: 0.2 },
  { id: 'CT07', itens: [{ produtoId: 'P005', quantidade: 2 }], cupom: undefined, subtotal: 200, desconto: 0, frete: 0, total: 200, faltante: 0 },
  { id: 'CT09', itens: [{ produtoId: 'P005', quantidade: 2 }], cupom: 'BEMVINDO10', subtotal: 200, desconto: 20, frete: 0, total: 180, faltante: 0 },
  { id: 'CT08', itens: [{ produtoId: 'P007', quantidade: 1 }], cupom: undefined, subtotal: 229.9, desconto: 0, frete: 0, total: 229.9, faltante: 0 },
  { id: 'CT19', itens: [{ produtoId: 'P007', quantidade: 1 }], cupom: 'BEMVINDO10', subtotal: 229.9, desconto: 22.99, frete: 0, total: 206.91, faltante: 0 },
  { id: 'CT20', itens: [{ produtoId: 'P005', quantidade: 1 }, { produtoId: 'P008', quantidade: 1 }, { produtoId: 'P006', quantidade: 2 }], cupom: 'BEMVINDO10', subtotal: 209.8, desconto: 20.98, frete: 0, total: 188.82, faltante: 0 },
];

for (const caso of casos) {
  test(`${caso.id} API — subtotal ${caso.subtotal}, ${caso.cupom ? 'com' : 'sem'} cupom`, async ({ request }, testInfo) => {
    const payload = {
      itens: caso.itens,
      ...(caso.cupom ? { cupom: caso.cupom } : {}),
    };
    const resposta = await request.post('/api/carrinho/calcular', { data: payload });
    const corpo = await resposta.json();

    await testInfo.attach('calculo-carrinho', {
      body: JSON.stringify({
        coletadoEm: new Date().toISOString(),
        metodo: 'POST', url: resposta.url(), requisicao: payload,
        status: resposta.status(), resposta: corpo,
      }, null, 2),
      contentType: 'application/json',
    });

    expect(resposta.status()).toBe(200);
    expect.soft(corpo.subtotal, 'subtotal').toBe(caso.subtotal);
    expect.soft(corpo.desconto, 'desconto').toBe(caso.desconto);
    expect.soft(corpo.frete, 'frete').toBe(caso.frete);
    expect.soft(corpo.total, 'total').toBe(caso.total);
    expect.soft(corpo.freteGratis, 'freteGratis').toBe(caso.frete === 0);
    expect.soft(corpo.valorFaltanteFreteGratis, 'faltante').toBe(caso.faltante);
  });
}
