# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contratos.api.spec.ts >> CT12 API quantidade 6 em /api/pedidos
- Location: tests/contratos.api.spec.ts:34:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 422
Received: 201
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { registrarResposta } from './support';
  3   |
  4   | const cliente = { nome: 'Maria Silva', email: 'maria@example.com', cep: '01310-100' };
  5   | const itens = [{ produtoId: 'P005', quantidade: 1 }];
  6   | const rotas = ['/api/carrinho/calcular', '/api/pedidos'];
  7   |
  8   | for (const rota of rotas) {
  9   |   for (const caso of [
  10  |     { id: 'CT01', cupom: 'BEMVINDO10', valido: true },
  11  |     { id: 'CT02-minúsculas', cupom: 'bemvindo10', valido: true },
  12  |     { id: 'CT02-espaços', cupom: '  BeMvInDo10  ', valido: true },
  13  |     { id: 'CT03', cupom: 'INEXISTENTE', valido: false, codigo: 'CUPOM_INVALIDO', mensagem: 'Cupom inválido.' },
  14  |     { id: 'CT04', cupom: 'VERAO2026', valido: false, codigo: 'CUPOM_EXPIRADO', mensagem: 'Cupom expirado.' },
  15  |   ]) {
  16  |     test(`${caso.id} API cupom ${JSON.stringify(caso.cupom)} em ${rota}`, async ({ request }, info) => {
  17  |       const payload = { cliente, itens, cupom: caso.cupom };
  18  |       const resposta = await request.post(rota, { data: payload });
  19  |       const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
  20  |       if (!caso.valido && rota === '/api/pedidos') {
  21  |         expect(resposta.status()).toBe(422);
  22  |         expect(corpo.erro.codigo).toBe(caso.codigo);
  23  |       } else {
  24  |         expect(resposta.status()).toBe(rota === '/api/pedidos' ? 201 : 200);
  25  |         expect.soft(corpo).toMatchObject({ subtotal: 100, desconto: caso.valido ? 10 : 0, frete: 19.9, total: caso.valido ? 109.9 : 119.9, valorFaltanteFreteGratis: 100 });
  26  |         expect.soft(corpo.cupom.aplicado).toBe(caso.valido);
  27  |         if (!caso.valido) expect.soft(corpo.cupom.mensagem).toBe(caso.mensagem);
  28  |         if (rota === '/api/pedidos') expect(corpo.numero).toMatch(/^VZ-\d{6}$/);
  29  |       }
  30  |     });
  31  |   }
  32  |
  33  |   for (const quantidade of [5, 6]) {
  34  |     test(`CT12 API quantidade ${quantidade} em ${rota}`, async ({ request }, info) => {
  35  |       const payload = { cliente, itens: [{ produtoId: 'P006', quantidade }] };
  36  |       const resposta = await request.post(rota, { data: payload });
  37  |       const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
> 38  |       expect(resposta.status()).toBe(quantidade === 6 ? 422 : rota === '/api/pedidos' ? 201 : 200);
      |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  39  |       if (quantidade === 6) expect(corpo.erro.codigo).toBe('QUANTIDADE_MAXIMA_EXCEDIDA');
  40  |       else expect(corpo.itens[0].quantidade).toBe(5);
  41  |     });
  42  |   }
  43  |
  44  |   const invalidos = [
  45  |     { nome: 'ausentes', itens: undefined, codigo: 'ITENS_OBRIGATORIOS' },
  46  |     { nome: 'vazios', itens: [], codigo: 'ITENS_OBRIGATORIOS' },
  47  |     { nome: 'item não objeto', itens: [null], codigo: 'ITEM_INVALIDO' },
  48  |     { nome: 'produto desconhecido', itens: [{ produtoId: 'INEXISTENTE', quantidade: 1 }], codigo: 'PRODUTO_NAO_ENCONTRADO' },
  49  |     { nome: 'duplicado', itens: [...itens, ...itens], codigo: 'ITEM_DUPLICADO' },
  50  |     ...[0, -1, 1.5, '1'].map(quantidade => ({ nome: `quantidade ${JSON.stringify(quantidade)}`, itens: [{ produtoId: 'P005', quantidade }], codigo: 'QUANTIDADE_INVALIDA' })),
  51  |   ];
  52  |   for (const caso of invalidos) {
  53  |     test(`CT15 API ${caso.nome} em ${rota}`, async ({ request }, info) => {
  54  |       const payload = { cliente, itens: caso.itens };
  55  |       const resposta = await request.post(rota, { data: payload });
  56  |       const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
  57  |       expect(resposta.status()).toBe(422);
  58  |       expect(corpo.erro).toMatchObject({ codigo: caso.codigo, mensagem: expect.any(String) });
  59  |     });
  60  |   }
  61  | }
  62  |
  63  | for (const caso of [
  64  |   { nome: 'nome sem sobrenome', cliente: { ...cliente, nome: 'Maria' }, valido: false, campo: 'nome' },
  65  |   { nome: 'email inválido', cliente: { ...cliente, email: 'invalido' }, valido: false, campo: 'email' },
  66  |   { nome: 'CEP curto', cliente: { ...cliente, cep: '0131010' }, valido: false, campo: 'cep' },
  67  |   { nome: 'CEP com hífen', cliente, valido: true },
  68  |   { nome: 'CEP sem hífen', cliente: { ...cliente, cep: '01310100' }, valido: true },
  69  | ]) {
  70  |   test(`CT16 API ${caso.nome}`, async ({ request }, info) => {
  71  |     const payload = { cliente: caso.cliente, itens };
  72  |     const resposta = await request.post('/api/pedidos', { data: payload });
  73  |     const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
  74  |     expect(resposta.status()).toBe(caso.valido ? 201 : 422);
  75  |     if (caso.valido) expect(corpo.cliente.cep).toBe('01310100');
  76  |     else {
  77  |       expect(corpo.erro.codigo).toBe('DADOS_INVALIDOS');
  78  |       expect(JSON.stringify(corpo.erro.campos)).toContain(caso.campo!);
  79  |     }
  80  |   });
  81  | }
  82  |
  83  | for (const caso of [
  84  |   { nome: 'lista de produtos', metodo: 'GET', url: '/api/produtos', status: 200 },
  85  |   { nome: 'produto existente', metodo: 'GET', url: '/api/produtos/P005', status: 200 },
  86  |   { nome: 'produto inexistente', metodo: 'GET', url: '/api/produtos/INEXISTENTE', status: 404, codigo: 'PRODUTO_NAO_ENCONTRADO' },
  87  |   { nome: 'rota inexistente', metodo: 'GET', url: '/api/inexistente', status: 404, codigo: 'ROTA_NAO_ENCONTRADA' },
  88  |   { nome: 'método não permitido', metodo: 'POST', url: '/api/produtos', status: 405, codigo: 'METODO_NAO_PERMITIDO' },
  89  |   { nome: 'JSON malformado', metodo: 'POST', url: '/api/carrinho/calcular', status: 400, codigo: 'JSON_INVALIDO', data: '{' },
  90  | ]) {
  91  |   test(`CT17 API ${caso.nome}`, async ({ request }, info) => {
  92  |     const resposta = await request.fetch(caso.url, { method: caso.metodo, data: caso.data, headers: { 'Content-Type': 'application/json' } });
  93  |     const corpo = await registrarResposta(resposta, caso, info);
  94  |     expect(resposta.status()).toBe(caso.status);
  95  |     if (caso.codigo) expect(corpo.erro.codigo).toBe(caso.codigo);
  96  |     else if (Array.isArray(corpo)) {
  97  |       expect(corpo).toHaveLength(8);
  98  |       expect(corpo.find(p => p.id === 'P005')).toMatchObject({ nome: 'Mochila Urbana 20L', preco: 100 });
  99  |     } else expect(corpo).toMatchObject({ id: 'P005', preco: 100 });
  100 |   });
  101 | }
  102 |
  103 | test('CT13 API — valores em centavos', async ({ request }, info) => {
  104 |   const payload = { itens: [{ produtoId: 'P002', quantidade: 1 }, { produtoId: 'P004', quantidade: 2 }], cupom: 'BEMVINDO10' };
  105 |   const resposta = await request.post('/api/carrinho/calcular', { data: payload });
  106 |   const corpo = await registrarResposta(resposta, { metodo: 'POST', payload }, info);
  107 |   expect(resposta.status()).toBe(200);
  108 |   expect(corpo).toMatchObject({ subtotal: 239.7, desconto: 23.97, frete: 0, total: 215.73 });
  109 | });
  110 |
```
