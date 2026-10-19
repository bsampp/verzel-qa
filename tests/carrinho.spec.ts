import { test, expect } from '@playwright/test';

test('CT09 — manter frete grátis com subtotal de R$ 200 e cupom de 10%', async ({ page }, testInfo) => {
  await test.step('Adicionar duas mochilas ao carrinho', async () => {
    await page.goto('/');
    const mochila = page.getByRole('article', { name: 'Mochila Urbana 20L' });
    await mochila.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
    await mochila.getByRole('button', { name: 'Adicionar ao carrinho' }).click();
    await page.getByRole('link', { name: /Carrinho/ }).click();
    await expect(page.getByRole('status', { name: 'Quantidade de Mochila Urbana 20L' })).toHaveText('2');
  });

  await test.step('Aplicar BEMVINDO10 e registrar a resposta real da API', async () => {
    await page.getByLabel('Cupom de desconto', { exact: true }).fill('BEMVINDO10');
    const calculo = page.waitForResponse(response =>
      new URL(response.url()).pathname === '/api/carrinho/calcular' &&
      response.request().method() === 'POST' &&
      response.request().postDataJSON()?.cupom === 'BEMVINDO10'
    );
    await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
    const resposta = await calculo;
    await testInfo.attach('calculo-carrinho', {
      body: JSON.stringify({
        coletadoEm: new Date().toISOString(),
        navegador: page.context().browser()?.version(),
        metodo: resposta.request().method(),
        url: resposta.url(),
        requisicao: resposta.request().postDataJSON(),
        status: resposta.status(),
        resposta: await resposta.json(),
      }, null, 2),
      contentType: 'application/json',
    });
    expect(resposta.status()).toBe(200);
    await expect(page.getByRole('button', { name: 'Remover cupom', exact: true })).toBeVisible();
  });

  await test.step('Conferir os valores definidos por CA01, CA06 e CA08', async () => {
    const resumo = page.getByRole('region', { name: 'Resumo do pedido' });
    await expect(resumo.locator('[data-valor="subtotal"]')).toHaveText('R$ 200,00');
    await expect(resumo.locator('[data-valor="desconto"]')).toHaveText('- R$ 20,00');
    // Soft permite relatar frete e total incorretos na mesma execução.
    await expect.soft(resumo.locator('[data-valor="frete"]')).toHaveText(/^(Grátis|R\$\s0,00)$/i);
    await expect.soft(resumo.locator('[data-valor="total"]')).toHaveText('R$ 180,00');
  });
});
