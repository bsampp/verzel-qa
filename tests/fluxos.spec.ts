import { test, expect, type Page } from '@playwright/test';
import { registrarResposta, registrarTela } from './support';

async function adicionar(page: Page, nome: string, quantidade = 1) {
  const botao = page.getByRole('article', { name: nome, exact: true }).getByRole('button', { name: 'Adicionar ao carrinho' });
  for (let i = 0; i < quantidade; i++) await botao.click();
}

async function aplicarCupom(page: Page) {
  await page.getByLabel('Cupom de desconto', { exact: true }).fill('BEMVINDO10');
  await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Remover cupom', exact: true })).toBeVisible();
}

test.afterEach(async ({ page }, info) => { await registrarTela(page, info); });

test('CT05 — remover, rejeitar outro cupom e reaplicar sem acumular desconto', async ({ page }) => {
  await page.goto('/');
  await adicionar(page, 'Mochila Urbana 20L');
  await page.getByRole('link', { name: /Carrinho/ }).click();
  await aplicarCupom(page);
  await expect(page.getByLabel('Cupom de desconto', { exact: true })).toHaveCount(0);
  await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
  await page.getByRole('button', { name: 'Remover cupom', exact: true }).click();
  await expect(page.locator('[data-valor="desconto"]')).toHaveText('R$ 0,00');
  await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 119,90');
  await page.getByLabel('Cupom de desconto', { exact: true }).fill('INEXISTENTE');
  await page.getByRole('button', { name: 'Aplicar cupom', exact: true }).click();
  await expect(page.getByText('Cupom inválido.', { exact: true })).toBeVisible();
  await expect(page.locator('[data-valor="desconto"]')).toHaveText('R$ 0,00');
  await aplicarCupom(page);
  await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 10,00');
  await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
});

test('CT10 — recalcular ao passar de uma para duas mochilas e voltar', async ({ page }, info) => {
  await page.goto('/');
  await adicionar(page, 'Mochila Urbana 20L');
  await page.getByRole('link', { name: /Carrinho/ }).click();
  await aplicarCupom(page);
  await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
  await page.getByRole('button', { name: 'Aumentar quantidade de Mochila Urbana 20L', exact: true }).click();
  await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 200,00');
  await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 20,00');
  await registrarTela(page, info);
  await expect.soft(page.locator('[data-valor="frete"]')).toHaveText(/^(Grátis|R\$\s0,00)$/i);
  await expect.soft(page.locator('[data-valor="total"]')).toHaveText('R$ 180,00');
  await page.getByRole('button', { name: 'Diminuir quantidade de Mochila Urbana 20L', exact: true }).click();
  await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 100,00');
  await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 10,00');
  await expect(page.locator('[data-valor="frete"]')).toHaveText('R$ 19,90');
  await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 109,90');
});

test('CT11 — limitar quantidade no catálogo e carrinho e permitir voltar a cinco', async ({ page }, info) => {
  await page.goto('/');
  await adicionar(page, 'Kit 3 Pares de Meias', 5);
  const adicionarMais = page.getByRole('article', { name: 'Kit 3 Pares de Meias', exact: true }).getByRole('button', { name: 'Adicionar ao carrinho' });
  if (await adicionarMais.isEnabled()) await adicionarMais.click();
  await expect.soft(page.getByRole('link', { name: /Carrinho/ })).toHaveText('Carrinho5');
  await registrarTela(page, info);
  await page.getByRole('link', { name: /Carrinho/ }).click();
  const quantidade = page.getByRole('status', { name: 'Quantidade de Kit 3 Pares de Meias', exact: true });
  await expect(quantidade).toHaveText('5');
  const aumentar = page.getByRole('button', { name: 'Aumentar quantidade de Kit 3 Pares de Meias', exact: true });
  if (await aumentar.isEnabled()) await aumentar.click();
  await expect(quantidade).toHaveText('5');
  await page.getByRole('button', { name: 'Diminuir quantidade de Kit 3 Pares de Meias', exact: true }).click();
  await expect(quantidade).toHaveText('4');
  await aumentar.click();
  await expect(quantidade).toHaveText('5');
});

test('CT13 — apresentar desconto e total com centavos corretos', async ({ page }) => {
  await page.goto('/');
  await adicionar(page, 'Calça Jeans Slim');
  await adicionar(page, 'Boné Aba Curva', 2);
  await page.getByRole('link', { name: /Carrinho/ }).click();
  await aplicarCupom(page);
  await expect(page.locator('[data-valor="subtotal"]')).toHaveText('R$ 239,70');
  await expect(page.locator('[data-valor="desconto"]')).toHaveText('- R$ 23,97');
  await expect(page.locator('[data-valor="frete"]')).toHaveText(/^(Grátis|R\$\s0,00)$/i);
  await expect(page.locator('[data-valor="total"]')).toHaveText('R$ 215,73');
});

for (const caso of [
  { id: 'CT06', produtos: [['Calça Jeans Slim', 1], ['Camiseta Essencial', 1]] as const, subtotal: 'R$ 199,80', frete: 'R$ 19,90', total: 'R$ 219,70', faltante: 'Faltam R$ 0,20 para o frete grátis.' },
  { id: 'CT07', produtos: [['Mochila Urbana 20L', 2]] as const, subtotal: 'R$ 200,00', frete: /^(Grátis|R\$\s0,00)$/i, total: 'R$ 200,00' },
  { id: 'CT08', produtos: [['Jaqueta Corta-Vento', 1]] as const, subtotal: 'R$ 229,90', frete: /^(Grátis|R\$\s0,00)$/i, total: 'R$ 229,90' },
]) {
  test(`${caso.id} UI — fronteira de frete sem cupom`, async ({ page }) => {
    await page.goto('/');
    for (const [nome, quantidade] of caso.produtos) await adicionar(page, nome, quantidade);
    await page.getByRole('link', { name: /Carrinho/ }).click();
    await expect(page.locator('[data-valor="subtotal"]')).toHaveText(caso.subtotal);
    await expect.soft(page.locator('[data-valor="frete"]')).toHaveText(caso.frete);
    await expect.soft(page.locator('[data-valor="total"]')).toHaveText(caso.total);
    if (caso.faltante) await expect(page.getByText(caso.faltante, { exact: true })).toBeVisible();
  });
}

for (const quantidade of [1, 2]) {
  test(`CT14 — confirmar pedido de ${quantidade} mochila(s) com cupom`, async ({ page }, info) => {
    await page.goto('/');
    await adicionar(page, 'Mochila Urbana 20L', quantidade);
    await page.getByRole('link', { name: /Carrinho/ }).click();
    await aplicarCupom(page);
    await page.getByRole('link', { name: 'Finalizar compra', exact: true }).click();
    await page.getByLabel('Nome completo', { exact: true }).fill('Maria Silva');
    await page.getByLabel('E-mail', { exact: true }).fill('maria@example.com');
    await page.getByLabel('CEP', { exact: true }).fill('01310-100');
    const pedido = page.waitForResponse(r => new URL(r.url()).pathname === '/api/pedidos' && r.request().method() === 'POST');
    await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
    const resposta = await pedido;
    const corpo = await registrarResposta(resposta, { metodo: 'POST', payload: resposta.request().postDataJSON() }, info);
    expect(resposta.status()).toBe(201);
    expect(corpo.numero).toMatch(/^VZ-\d{6}$/);
    const esperado = quantidade === 1 ? { subtotal: 100, desconto: 10, frete: 19.9, total: 109.9 } : { subtotal: 200, desconto: 20, frete: 0, total: 180 };
    expect.soft(corpo).toMatchObject(esperado);
    await expect(page.getByText(corpo.numero, { exact: false })).toBeVisible();
    await expect.soft(page.locator('[data-valor="total"]')).toHaveText(quantidade === 1 ? 'R$ 109,90' : 'R$ 180,00');
  });
}

for (const caso of [
  { nome: 'nome sem sobrenome', cliente: { nome: 'Maria', email: 'maria@example.com', cep: '01310-100' }, campo: 'Nome completo' },
  { nome: 'email inválido', cliente: { nome: 'Maria Silva', email: 'invalido', cep: '01310-100' }, campo: 'E-mail' },
  { nome: 'CEP curto', cliente: { nome: 'Maria Silva', email: 'maria@example.com', cep: '0131010' }, campo: 'CEP' },
]) {
  test(`CT16 UI — ${caso.nome}`, async ({ page }) => {
    await page.goto('/');
    await adicionar(page, 'Mochila Urbana 20L');
    await page.getByRole('link', { name: /Carrinho/ }).click();
    await page.getByRole('link', { name: 'Finalizar compra', exact: true }).click();
    await page.getByLabel('Nome completo', { exact: true }).fill(caso.cliente.nome);
    await page.getByLabel('E-mail', { exact: true }).fill(caso.cliente.email);
    await page.getByLabel('CEP', { exact: true }).fill(caso.cliente.cep);
    await page.getByRole('button', { name: 'Confirmar pedido', exact: true }).click();
    await expect(page.getByLabel(caso.campo, { exact: true })).toHaveAttribute('aria-invalid', 'true');
    await expect(page).toHaveURL(/\/checkout$/);
  });
}
