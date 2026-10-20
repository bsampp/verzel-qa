# Verzel Store — Teste técnico QA Júnior

Validação da entrega **VZS-142: cupom de desconto e frete grátis**, documentação versão 2.3.0, publicada em 30/09/2026.

**Status: CT01 e CT03 aprovados na UI, CT09 reprovado e investigação de sete variantes pela API concluída. BUG-001 confirmado no subtotal de R$ 200, com ou sem cupom. Demais cenários/camadas pendentes.**

## Aplicação e fontes

- [Loja](https://verzel-store.qa-test-verzel-store.workers.dev/)
- [Documentação oficial](https://verzel-store.qa-test-verzel-store.workers.dev/documentacao)
- [Base da API](https://verzel-store.qa-test-verzel-store.workers.dev/api)
- Enunciado: PDF “Teste tecnico QA Junior - Verzel(1).pdf”, recebido separadamente; não incluído neste repositório.

## Onde encontrar as entregas

| Entrega | Local | Estado |
| --- | --- | --- |
| Escopo, estratégia e cronograma | [Plano](docs/plano-de-testes.md) | Inicial |
| Regras, dados e decisões | [Requisitos](docs/requisitos.md) | Levantados; reconferir na página |
| Cenários e rastreabilidade | [Cenários](docs/cenarios.md) | Propostos |
| Execução manual e exploratória | [Execução](docs/execucao.md) | Captura manual recebida; exploração estruturada pendente |
| Bugs reproduzidos | [Bugs](docs/bugs/README.md) | BUG-001 confirmado |
| Documento de evidências | [Evidências](docs/evidencias.md) | Frete e cupons coletados |
| Automação de pelo menos 3 cenários | [Teste CT09](tests/carrinho.spec.ts) | 3 cenários UI implementados e executados, mais 7 casos API |
| Tarefas no GitHub | [Backlog](docs/backlog.md) e [corpos das issues](docs/issues/) | 6 issues abertas |
| Uso de IA | [Registro](docs/uso-de-ia.md) | Inicial |

## Por onde começar

1. Execute a tarefa 01: reconfira a documentação e registre as ambiguidades.
2. Revise os cenários e execute os testes manuais, coletando evidências.
3. Registre os bugs reproduzidos; mantenha links entre critério, cenário, execução e bug.
4. Implemente pelo menos 3 testes Playwright e documente instalação e comandos reais.
5. Faça a revisão final e envie o link público no formulário do enunciado.

## Automação: primeiro slice

Playwright 1.64.1 com TypeScript e Chromium, um worker, sem retries ou mocks. Cada teste recebe um contexto de navegador limpo. Ambiente validado: Node v26.8.1, npm 11.19.0, Linux x86_64. Em outra máquina, usar uma versão de Node suportada pelo Playwright.

```bash
npm ci
npx playwright install chromium
npm test
npm run test:report
```

Em Linux, se faltarem bibliotecas do sistema, executar `npx playwright install --with-deps chromium`.
Para acompanhar visualmente em uma máquina com interface gráfica: `npm run test:headed`.

Os testes pelo navegador são CT01, CT03 e CT09. CT01 e CT03 passaram na rodada de cupons. A última execução de CT09 terminou com **1 falha de produto**: frete R$ 19,90 e total R$ 199,90, quando deveriam ser zero e R$ 180,00. O comando retorna código 1 enquanto a divergência existir. Não marcar o teste como skip ou falha esperada para esconder o defeito.

O relatório HTML fica em `playwright-report/`; screenshot, trace e resultado JSON ficam em `test-results/`. Esses diretórios são temporários e ignorados pelo Git. A evidência selecionada foi preservada em [evidencias/CT09](evidencias/CT09). O JSON da chamada real aparece como anexo no relatório.

A [suíte API](tests/frete.api.spec.ts) compara sete variantes de subtotal e cupom. Para executar somente a investigação: `npx playwright test tests/frete.api.spec.ts`. Matriz inicial: **4 passaram e 2 falharam**, ambas no subtotal de R$ 200. Complemento CT20 executado separadamente: **passou**, mantendo frete grátis com subtotal R$ 209,80 e total após desconto R$ 188,82. CT18 e CT19 identificam novas variantes registradas em `docs/cenarios.md`. Os três cenários pelo navegador estão implementados; outras regras e exploração continuam pendentes.

Comece a leitura pelo [teste](tests/carrinho.spec.ts): preparar o carrinho, aplicar o cupom e verificar valores. A [configuração](playwright.config.ts) define ambiente e relatórios. Os valores esperados vêm dos critérios, sem reutilizar o cálculo da API como resultado correto.

## Trabalhar nas issues

Repositório: https://github.com/bsampp/verzel-qa

As seis tarefas estão em https://github.com/bsampp/verzel-qa/issues, na mesma ordem do [backlog](docs/backlog.md). Os arquivos em `docs/issues/` preservam a especificação inicial de cada tarefa.

Para começar localmente:

```bash
git clone https://github.com/bsampp/verzel-qa.git
cd verzel-qa
```

A entrega final exige repositório público. Conferir a visibilidade antes do envio.

## Checklist de entrega

- [ ] Critérios CA01–CA11 cobertos e cenários revisados.
- [ ] Execução manual e exploratória documentada com resultados por cenário.
- [ ] Todos os bugs encontrados reportados com reprodução e evidência.
- [ ] Documento de evidências completo e com links funcionando.
- [x] Pelo menos 3 cenários Playwright implementados e executados.
- [ ] README com instruções verificadas para rodar a automação.
- [ ] Repositório público acessível sem login.
- [ ] Uso de IA descrito no formulário de envio.

O prazo é de **5 dias corridos a partir do recebimento do enunciado**. Confirmar a data/hora de recebimento antes de fixar a entrega. Não há deploy a entregar.
