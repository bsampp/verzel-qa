import { test, expect } from '@playwright/test';

const casos = [
  { id: 'CT01', cupom: 'BEMVINDO10', valido: true, desconto: '- R$ 10,00', total: 'R$ 109,90' },
  { id: 'CT03', cupom: 'INEXISTENTE', valido: false, desconto: 'R$ 0,00', total: 'R$ 119,90' },
];

for (const caso of casos) {
  test(`${caso.id} — ${caso.valido ? 'aplicar cupom válido' : 'rejeitar cupom inexistente'} com uma mochila`, async ({ page }, testInfo) => {
    await test.step('Preparar carrinho com uma mochila de R$ 100', async () => {
      await page.goto('/');
      await page.getByRole('article', { name: 'Mochila Urbana 20L' })
        .getByRole('button', { name: 'Adicionar ao carrinho' }).click();
      await page.getByRole('link', { name: /Carrinho/ }).click();
      await expect(page.getByRole('status', { name: 'Quantidade de Mochila Urbana 20L' })).toHaveText('1');
    });

    await test.step('Enviar cupom e coletar resposta real do cálculo', async () => {
      await page.getByLabel('Cupom de desconto', { exact: true }).fill(caso.cupom);
      const calculo = page.waitForResponse(response =>
        new URL(response.url()).pathname === '/api/carrinho/calcular' &&
        response.request().method() === 'POST' &&
        response.request().postDataJSON()?.cupom === caso.cupom
      );
      await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
      const resposta = await calculo;
      await testInfo.attach('calculo-carrinho', {
        body: JSON.stringify({
          coletadoEm: new Date().toISOString(), navegador: page.context().browser()?.version(),
          metodo: 'POST', url: resposta.url(), requisicao: resposta.request().postDataJSON(),
          status: resposta.status(), resposta: await resposta.json(),
        }, null, 2),
        contentType: 'application/json',
      });
      expect(resposta.status()).toBe(200);
    });

    await test.step('Conferir mensagem e valores do carrinho', async () => {
      const remover = page.getByRole('button', { name: 'Remover cupom', exact: true });
      if (caso.valido) {
        await expect(remover).toBeVisible();
        await expect(page.getByText('Cupom BEMVINDO10 aplicado.', { exact: true })).toBeVisible();
      } else {
        await expect(page.getByText('Cupom inválido.', { exact: true })).toBeVisible();
        await expect(remover).toHaveCount(0);
      }
      const resumo = page.getByRole('region', { name: 'Resumo do pedido' });
      await expect.soft(resumo.locator('[data-valor="subtotal"]')).toHaveText('R$ 100,00');
      await expect.soft(resumo.locator('[data-valor="desconto"]')).toHaveText(caso.desconto);
      await expect.soft(resumo.locator('[data-valor="frete"]')).toHaveText('R$ 19,90');
      await expect.soft(resumo.locator('[data-valor="total"]')).toHaveText(caso.total);
      await expect.soft(resumo.getByText('Faltam R$ 100,00 para o frete grátis.', { exact: true })).toBeVisible();
      await testInfo.attach('carrinho', { body: await page.screenshot(), contentType: 'image/png' });
    });
  });
}
