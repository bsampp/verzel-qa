import { test, expect } from '@playwright/test';
import { registrarResposta } from './support';

const cliente = { nome: 'Maria Silva', email: 'maria@example.com', cep: '01310-100' };
const itens = [{ produtoId: 'P005', quantidade: 1 }];
const rotas = ['/api/carrinho/calcular', '/api/pedidos'];

for (const rota of rotas) {
  for (const caso of [
    { id: 'CT01', cupom: 'BEMVINDO10', valido: true },
    { id: 'CT02-minúsculas', cupom: 'bemvindo10', valido: true },
    { id: 'CT02-espaços', cupom: '  BeMvInDo10  ', valido: true },
    { id: 'CT03', cupom: 'INEXISTENTE', valido: false, codigo: 'CUPOM_INVALIDO', mensagem: 'Cupom inválido.' },
    { id: 'CT04', cupom: 'VERAO2026', valido: false, codigo: 'CUPOM_EXPIRADO', mensagem: 'Cupom expirado.' },
  ]) {
    test(`${caso.id} API cupom ${JSON.stringify(caso.cupom)} em ${rota}`, async ({ request }, info) => {
      const payload = { cliente, itens, cupom: caso.cupom };
      const resposta = await request.post(rota, { data: payload });
      const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
      if (!caso.valido && rota === '/api/pedidos') {
        expect(resposta.status()).toBe(422);
        expect(corpo.erro.codigo).toBe(caso.codigo);
      } else {
        expect(resposta.status()).toBe(rota === '/api/pedidos' ? 201 : 200);
        expect.soft(corpo).toMatchObject({ subtotal: 100, desconto: caso.valido ? 10 : 0, frete: 19.9, total: caso.valido ? 109.9 : 119.9, valorFaltanteFreteGratis: 100 });
        expect.soft(corpo.cupom.aplicado).toBe(caso.valido);
        if (!caso.valido) expect.soft(corpo.cupom.mensagem).toBe(caso.mensagem);
        if (rota === '/api/pedidos') expect(corpo.numero).toMatch(/^VZ-\d{6}$/);
      }
    });
  }

  for (const quantidade of [5, 6]) {
    test(`CT12 API quantidade ${quantidade} em ${rota}`, async ({ request }, info) => {
      const payload = { cliente, itens: [{ produtoId: 'P006', quantidade }] };
      const resposta = await request.post(rota, { data: payload });
      const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
      expect(resposta.status()).toBe(quantidade === 6 ? 422 : rota === '/api/pedidos' ? 201 : 200);
      if (quantidade === 6) expect(corpo.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
      else expect(corpo.itens[0].quantidade).toBe(5);
    });
  }

  const invalidos = [
    { nome: 'ausentes', itens: undefined, codigo: 'ITENS_OBRIGATORIOS' },
    { nome: 'vazios', itens: [], codigo: 'ITENS_OBRIGATORIOS' },
    { nome: 'item não objeto', itens: [null], codigo: 'ITEM_INVALIDO' },
    { nome: 'produto desconhecido', itens: [{ produtoId: 'INEXISTENTE', quantidade: 1 }], codigo: 'PRODUTO_NAO_ENCONTRADO' },
    { nome: 'duplicado', itens: [...itens, ...itens], codigo: 'ITEM_DUPLICADO' },
    ...[0, -1, 1.5, '1'].map(quantidade => ({ nome: `quantidade ${JSON.stringify(quantidade)}`, itens: [{ produtoId: 'P005', quantidade }], codigo: 'QUANTIDADE_INVALIDA' })),
  ];
  for (const caso of invalidos) {
    test(`CT15 API ${caso.nome} em ${rota}`, async ({ request }, info) => {
      const payload = { cliente, itens: caso.itens };
      const resposta = await request.post(rota, { data: payload });
      const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
      expect(resposta.status()).toBe(422);
      expect(corpo.erro).toMatchObject({ codigo: caso.codigo, mensagem: expect.any(String) });
    });
  }
}

for (const caso of [
  { nome: 'nome sem sobrenome', cliente: { ...cliente, nome: 'Maria' }, valido: false, campo: 'nome' },
  { nome: 'email inválido', cliente: { ...cliente, email: 'invalido' }, valido: false, campo: 'email' },
  { nome: 'CEP curto', cliente: { ...cliente, cep: '0131010' }, valido: false, campo: 'cep' },
  { nome: 'CEP com hífen', cliente, valido: true },
  { nome: 'CEP sem hífen', cliente: { ...cliente, cep: '01310100' }, valido: true },
]) {
  test(`CT16 API ${caso.nome}`, async ({ request }, info) => {
    const payload = { cliente: caso.cliente, itens };
    const resposta = await request.post('/api/pedidos', { data: payload });
    const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
    expect(resposta.status()).toBe(caso.valido ? 201 : 422);
    if (caso.valido) expect(corpo.cliente.cep).toBe('01310100');
    else {
      expect(corpo.erro.codigo).toBe('DADOS_INVALIDOS');
      expect(JSON.stringify(corpo.erro.campos)).toContain(caso.campo!);
    }
  });
}

for (const caso of [
  { nome: 'lista de produtos', metodo: 'GET', url: '/api/produtos', status: 200 },
  { nome: 'produto existente', metodo: 'GET', url: '/api/produtos/P005', status: 200 },
  { nome: 'produto inexistente', metodo: 'GET', url: '/api/produtos/INEXISTENTE', status: 404, codigo: 'PRODUTO_NAO_ENCONTRADO' },
  { nome: 'rota inexistente', metodo: 'GET', url: '/api/inexistente', status: 404, codigo: 'ROTA_NAO_ENCONTRADA' },
  { nome: 'método não permitido', metodo: 'POST', url: '/api/produtos', status: 405, codigo: 'METODO_NAO_PERMITIDO' },
  { nome: 'JSON malformado', metodo: 'POST', url: '/api/carrinho/calcular', status: 400, codigo: 'JSON_INVALIDO', data: '{' },
]) {
  test(`CT17 API ${caso.nome}`, async ({ request }, info) => {
    const resposta = await request.fetch(caso.url, { method: caso.metodo, data: caso.data, headers: { 'Content-Type': 'application/json' } });
    const corpo = await registrarResposta(resposta, caso, info);
    expect(resposta.status()).toBe(caso.status);
    if (caso.codigo) expect(corpo.erro.codigo).toBe(caso.codigo);
    else if (Array.isArray(corpo)) {
      expect(corpo).toHaveLength(8);
      expect(corpo.find(p => p.id === 'P005')).toMatchObject({ nome: 'Mochila Urbana 20L', preco: 100 });
    } else expect(corpo).toMatchObject({ id: 'P005', preco: 100 });
  });
}

test('CT13 API — valores em centavos', async ({ request }, info) => {
  const payload = { itens: [{ produtoId: 'P002', quantidade: 1 }, { produtoId: 'P004', quantidade: 2 }], cupom: 'BEMVINDO10' };
  const resposta = await request.post('/api/carrinho/calcular', { data: payload });
  const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
  expect(resposta.status()).toBe(200);
  expect(corpo).toMatchObject({ subtotal: 239.7, desconto: 23.97, frete: 0, total: 215.73 });
});
