# Execução manual e exploração assistida

Operador: Codex via ferramentas interativas do navegador Paseo, com decisões entre cada observação, sem runner Playwright. A pessoa candidata realizou a descoberta inicial de BUG-001; as sessões abaixo foram operadas pelo agente. Não alegam revisão humana do conjunto de resultados.

Ambiente: Windows 10 x64, Paseo 0.11.2, Electron 44.2.0 / Chromium 152.0.7977.76. Loja publicada; documentação VZS-142 2.3.0. Horários UTC; somar duas horas para Europe/Berlin nesta data. Somente dados sintéticos. Sessões curtas e dirigidas; os 20 minutos do plano eram sugestão, não duração executada.

## EXP01 — cupom, limite do frete e carrinho vazio

20/10/2026, 16:11:52 a 16:13:02 UTC, aproximadamente 70 segundos. Nova aba vazia ao iniciar. Objetivo: observar mensagens, normalização e recuperação após limpar o carrinho.

| Ação e referência | Esperado | Observado | Resultado |
| --- | --- | --- | --- |
| Adicionar uma mochila e abrir carrinho, CT01 sem cupom | Subtotal 100; desconto 0; frete 19,90; total 119,90 | Valores conferem | Passou |
| Digitar `  bemvindo10  ` e aplicar, CT02 | Código normalizado; desconto 10; total 109,90 | BEMVINDO10 aplicado, valores conferem | Passou |
| Aumentar para duas mochilas, CT09/10 | Subtotal 200; desconto 20; frete zero; total 180 | Frete 19,90 e total 199,90; mensagem “Faltam R$ 0,00” | Falhou, BUG-001 |
| Remover cupom e esvaziar carrinho | Carrinho vazio e retorno ao catálogo disponível | “Seu carrinho está vazio”, contador zero e link Ver produtos | Passou |

Observação de ferramenta: a primeira tentativa via `browser_fill` não foi incorporada ao estado do input React e exibiu “Informe um cupom.”. A repetição por digitação real (`browser_type`) funcionou. Como Playwright e digitação interativa passaram, isso não foi reportado como bug de normalização. Essa ocorrência está preservada no transcript para distinguir falha da ferramenta de falha do produto.

[Evidência bruta: snapshots e sequência](../evidencias/exploracao/EXP01-snapshots.json).

## EXP02 — validação e recuperação no checkout

20/10/2026, 16:13:09 a 16:14:38 UTC, aproximadamente 89 segundos. Mesma aba, depois de esvaziar o carrinho. Objetivo: testar recuperação de erros e consistência da confirmação.

| Ação e referência | Esperado | Observado | Resultado |
| --- | --- | --- | --- |
| Adicionar uma mochila, sem cupom, abrir checkout | Resumo 100 + 19,90 = 119,90 | Valores conferem | Passou |
| Confirmar sem preencher | Impedir pedido e orientar os três campos | Mensagens Informe o nome completo / e-mail / CEP | Passou |
| Preencher Maria, maria@example.com e CEP 01310100 | Impedir nome sem sobrenome; aceitar formatos dos outros dados | “Informe nome e sobrenome.”, permaneceu no checkout | Passou, CT16 |
| Completar Maria Silva e confirmar | Confirmar pedido fictício, total 119,90 e sem pagamento online | VZ-923461, total 119,90 e pagamento na entrega | Passou |
| Voltar ao carrinho | Carrinho limpo após confirmação | Contador zero e estado vazio | Passou |

[Evidência bruta: snapshots e sequência](../evidencias/exploracao/EXP02-snapshots.json).

## Conclusão e limites

Nenhum terceiro defeito confirmado. BUG-001 foi reproduzido e as recuperações acima funcionaram. Exploração não significa cobertura de todas as combinações: não houve avaliação ampla de acessibilidade, responsividade ou navegadores. Complementar com revisão humana antes de apresentar o trabalho. As simplificações documentadas (pedido fictício, sem e-mail, cobrança ou estoque) não foram classificadas como defeitos.
