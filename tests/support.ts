import type { APIResponse, Page, TestInfo } from '@playwright/test';

export async function registrarResposta(resposta: Pick<APIResponse, 'url' | 'status' | 'text'>, requisicao: unknown, testInfo: TestInfo) {
  const texto = await resposta.text();
  let corpo: any;
  try { corpo = JSON.parse(texto); } catch { corpo = texto; }
  await testInfo.attach('resposta-api', {
    body: JSON.stringify({ coletadoEm: new Date().toISOString(), url: resposta.url(), status: resposta.status(), requisicao, resposta: corpo }, null, 2),
    contentType: 'application/json',
  });
  return corpo;
}

export async function registrarTela(page: Page, testInfo: TestInfo) {
  await testInfo.attach('tela', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
  await testInfo.attach('conteudo', {
    body: JSON.stringify({ coletadoEm: new Date().toISOString(), navegador: page.context().browser()?.version(), url: page.url(), texto: await page.locator('body').innerText() }, null, 2),
    contentType: 'application/json',
  });
}
