# Verzel Store — Teste técnico QA Júnior

Avaliação da entrega **VZS-142: cupom de desconto e frete grátis**, documentação 2.3.0, publicada em 30/09/2026.

**Resultado funcional: não aprovar.** A rodada completa executou **69 testes: 61 passaram e 8 falharam**, associados a dois bugs confirmados. Há 18 testes pelo navegador e 51 pela API, sem mocks, retries ou testes ignorados. Falhas reais permanecem visíveis. Esta é a entrega de QA; não contém a implementação da loja.

## Entregas

| Entrega | Onde encontrar |
| --- | --- |
| Plano e escopo | [Plano de testes](docs/plano-de-testes.md) |
| Regras, dados e interpretações | [Requisitos](docs/requisitos.md) |
| 20 cenários e rastreabilidade | [Cenários](docs/cenarios.md) |
| Execução por variante | [Rodada final: 69 resultados](docs/rodada-final.md) |
| Execução manual e exploração | [Duas sessões dirigidas](docs/exploracao.md) |
| Bugs e evidências | [Índice dos dois bugs](docs/bugs/README.md), [evidências](docs/evidencias.md) |
| Conclusão e limites | [Relatório final](docs/relatorio-final.md) |
| Automação | [Testes Playwright](tests/) e [configuração](playwright.config.ts) |
| Histórico de execução | [Execuções incrementais](docs/execucao.md) |
| Organização e issues | [Backlog e slices](docs/backlog.md), [GitHub Issues](https://github.com/bsampp/verzel-qa/issues) |
| Material de estudo | [Guia comentado](docs/guia-estudo.md) |

## Executar

Ambiente validado: **Node 26.8.1**, npm 11.19.0, Playwright 1.64.1, TypeScript 7.0.2, Chromium 156.0.8078.4, Linux x86_64. A versão do Node está em `.nvmrc`; usar `nvm use` se tiver nvm. Dependências travadas no lockfile.

```bash
git clone https://github.com/bsampp/verzel-qa.git
cd verzel-qa
npm ci
npx playwright install chromium
npm run typecheck
npm test
```

Em Linux, se faltarem bibliotecas do sistema: `npx playwright install --with-deps chromium`.

```bash
# Relatório HTML da última execução
npm run test:report

# Navegador visível, em máquina com interface gráfica
npm run test:headed

# Somente cupons pela interface
npx playwright test tests/cupons.spec.ts

# Somente contratos da API
npx playwright test tests/contratos.api.spec.ts

# Reproduzir a falha de quantidade
npx playwright test tests/contratos.api.spec.ts --grep 'CT12 API quantidade 6'
```

`npm test` retorna **código 1** enquanto os defeitos permanecerem. Isso indica reprovação funcional; não é uma falha de instalação. `npm run typecheck` deve retornar zero. Os comandos foram verificados no workspace e em clone limpo do commit dos testes; [detalhes](docs/verificacao-entrega.md).

## Evidências e isolamento

Cada cenário de UI recebe um contexto de navegador novo; casos API enviam payloads explícitos. Dados de cliente são fictícios. O ambiente de pedidos é uma simulação: não há cobrança real nem persistência.

Relatório HTML em `playwright-report/`, screenshots/traces/JSON temporários em `test-results/`. Esses diretórios são ignorados e substituídos nas próximas execuções. A seleção versionada está em `evidencias/rodada-final/`, com resultados e anexos por teste; as primeiras descobertas estão em `evidencias/CTxx/`. A exploração preserva snapshots em `evidencias/exploracao/`.

## Fontes e limites

- [Loja](https://verzel-store.qa-test-verzel-store.workers.dev/)
- [Documentação oficial](https://verzel-store.qa-test-verzel-store.workers.dev/documentacao)
- [API](https://verzel-store.qa-test-verzel-store.workers.dev/api)
- Enunciado: PDF recebido separadamente; não incluído neste repositório.

Sem acesso ao código da loja, não foram implementados testes unitários da aplicação. A automação verifica comportamento pela API e pelo navegador. Não foram executados carga, estresse ou segurança. Sem avaliação ampla de responsividade, acessibilidade ou múltiplos navegadores. Arredondamento validado nos valores possíveis do catálogo, sem inventar regra para meio centavo.

## Envio

O enunciado exige **um repositório público** e envio pelo formulário https://elitedev.verzel.com.br/, sem deploy. A preparação técnica está concluída; a publicação pública e o envio são etapas finais a confirmar. O prazo formal é de cinco dias corridos após o recebimento do PDF; a data/hora de recebimento não foi fornecida, portanto não afirmamos cumprimento do prazo. Informar honestamente no formulário onde e como houve uso de IA. Revisão humana recomendada antes da apresentação.
