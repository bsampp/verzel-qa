# Verzel Store — Teste técnico QA Júnior

Validação da entrega **VZS-142: cupom de desconto e frete grátis**, documentação versão 2.3.0, publicada em 30/09/2026.

**Status: planejamento inicial. Nenhum cenário foi executado e nenhum bug foi confirmado.**

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
| Execução manual e exploratória | [Execução](docs/execucao.md) | Não iniciada |
| Bugs reproduzidos | [Bugs](docs/bugs/README.md) | Nenhum confirmado |
| Documento de evidências | [Evidências](docs/evidencias.md) | A preencher |
| Automação de pelo menos 3 cenários | `tests/` (a criar na tarefa 05) | Pendente |
| Tarefas no GitHub | [Backlog](docs/backlog.md) e [corpos das issues](docs/issues/) | 6 issues abertas |
| Uso de IA | [Registro](docs/uso-de-ia.md) | Inicial |

## Por onde começar

1. Execute a tarefa 01: reconfira a documentação e registre as ambiguidades.
2. Revise os cenários e execute os testes manuais, coletando evidências.
3. Registre os bugs reproduzidos; mantenha links entre critério, cenário, execução e bug.
4. Implemente pelo menos 3 testes Playwright e documente instalação e comandos reais.
5. Faça a revisão final e envie o link público no formulário do enunciado.

## Automação: estado atual

A automação ainda não foi implementada. Este commit contém somente documentação e templates; não há comando de teste disponível.

Decisão inicial: Playwright com TypeScript, testes independentes e execução conservadora com um worker. Após implementar a tarefa 05, atualizar esta seção com a versão de Node utilizada, instalação via lockfile, instalação do Chromium, comando de execução e abertura do relatório. Falhas reais da aplicação devem continuar visíveis nos testes.

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
- [ ] Pelo menos 3 cenários Playwright implementados e executados.
- [ ] README com instruções verificadas para rodar a automação.
- [ ] Repositório público acessível sem login.
- [ ] Uso de IA descrito no formulário de envio.

O prazo é de **5 dias corridos a partir do recebimento do enunciado**. Confirmar a data/hora de recebimento antes de fixar a entrega. Não há deploy a entregar.
