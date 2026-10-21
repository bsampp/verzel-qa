# Auditoria dos seis entregáveis — Verzel QA

Data da auditoria: 21/10/2026. Base versionada: `origin/main` em `1e2b64c`; o `HEAD` local `b995f0e` acrescenta apenas `AGENTS.md` e `docs/agents/`, sem alterar os seis entregáveis. As mudanças concorrentes do pai em `README.md`, `docs/backlog.md` e `docs/checklist-entrega.md`, bem como a integração Gherkin CT01–CT20, foram tratadas como estado transitório e **não** como lacuna final.

Método: leitura do PDF de 5 páginas, README, `docs/cenarios.md`, `docs/rodada-final.md`, `docs/exploracao.md`, `docs/execucao.md`, `docs/bugs/`, `docs/verificacao-entrega.md`, `docs/evidencias.md`, testes Playwright e amostras de evidências; conferência de links e contagens; `npx playwright test --list`; `npm run typecheck`; leitura somente de issues no GitHub. Não executei a suíte completa, não alterei o repositório e não enviei formulário.

## Veredito

Os **seis entregáveis materiais estão presentes e são verificáveis**. Não encontrei artefato obrigatório ausente. A recomendação funcional de **não aprovar** está correta e as falhas reais continuam visíveis: **69 testes, 61 aprovados, 8 reprovados**, todos mapeados em **dois bugs**.

As pendências reais são administrativas: repositório ainda **privado**, prazo informado vencido/em risco e formulário não enviado. Há também uma limitação material de qualificação: as sessões “manuais” foram **operadas por agente**, não por pessoa, e isso está corretamente declarado nos documentos detalhados.

## Matriz dos seis entregáveis

| # | Requisito do PDF | Arquivo principal | Prova verificada | Estado |
| --- | --- | --- | --- | --- |
| 1 | Cenários levantados da documentação; Gherkin como diferencial | `docs/cenarios.md`; `docs/requisitos.md` | 20 cenários CT01–CT20, rastreabilidade CA01–CA11, dados, ação e resultado esperado. Todos os 20 aparecem em resultados executados. Havia 1 exemplo Gherkin (CT09) no snapshot; a cobertura Gherkin CT01–CT20 está em integração pelo pai, então não foi contabilizada como lacuna. | **Atendido**; diferencial em integração |
| 2 | Execução dos testes, manuais e exploratórios, com resultado de cada cenário | `docs/rodada-final.md`; `docs/exploracao.md`; `docs/execucao.md` | 69 linhas RF, 69 links e 69 `resultado.json`; 61 `passed`, 8 `failed`, 0 `skipped`, 0 `flaky`. EXP01 e EXP02 registram horário, ação, esperado, observado e resultado, com snapshots. | **Atendido** para automação e exploração assistida; “manual humano” não evidenciado |
| 3 | Report de todos os bugs encontrados | `docs/bugs/README.md`; `docs/bugs/BUG-001.md`; `docs/bugs/BUG-002.md`; issues #7 e #8 | As 8 falhas estão mapeadas: 6 em BUG-001 (RF-001/052/056/059/065/066) e 2 em BUG-002 (RF-008/024), sem falha órfã. GitHub confirma #7 e #8 `OPEN`; #1–#5 `CLOSED`; #6 `OPEN`. | **Atendido** |
| 4 | Documento com evidências da execução | `docs/evidencias.md`; `docs/rodada-final.md`; `evidencias/` | 191 arquivos versionados em `evidencias/`, 69 diretórios RF, 69 `resultado.json` consistentes com o resumo, todos os anexos referenciados existentes e não vazios. Checagem local de links Markdown: 0 quebrados. | **Atendido** |
| 5 | Automação de pelo menos 3 cenários com Playwright | `tests/`; `playwright.config.ts` | `npx playwright test --list`: **69 testes em 5 arquivos**. Cobertura de todos os CT01–CT20; 18 testes de navegador e 51 de API. `retries: 0`, sem `skip`/`fixme`; falhas de produto preservadas. | **Atendido e excedido** |
| 6 | README explicando como rodar e onde encontrar cada entrega | `README.md`; `docs/verificacao-entrega.md` | Tabela “Entregas” cobre plano, requisitos, cenários, rodada, exploração, bugs, evidências, automação e histórico. Comandos de clone, `npm ci`, instalação do Chromium, typecheck e testes. `npm run typecheck` retornou 0. | **Atendido**; o `git clone` só funciona para terceiros após tornar o repositório público |

## Provas quantitativas

- `npx playwright test --list`: `Total: 69 tests in 5 files`.
- `evidencias/rodada-final/resultados.json`: `expected: 61`, `unexpected: 8`, `skipped: 0`, `flaky: 0`; 69 IDs `RF-001` a `RF-069` sequenciais.
- Distribuição das falhas: `BUG-001` = 6; `BUG-002` = 2; nenhuma falha sem bug associado.
- Cobertura por cenário: todos os CT01–CT20 têm ao menos uma variante (CT01: 3, CT02: 6, CT03: 3, CT04: 3, CT05: 1, CT06: 2, CT07: 2, CT08: 2, CT09: 2, CT10: 1, CT11: 1, CT12: 4, CT13: 2, CT14: 2, CT15: 18, CT16: 8, CT17: 6, CT18: 1, CT19: 1, CT20: 1).
- Conferência `docs/rodada-final.md` × JSON: 69 linhas, 69 links únicos, 0 divergências de estado ou bug.
- `npm run typecheck`: saída limpa, código 0.
- `git diff 22c849d..HEAD -- tests playwright.config.ts package.json package-lock.json tsconfig.json`: vazio; o clone limpo documentado usou o mesmo conjunto de testes.
- Issues: #7 e #8 abertas (bugs); #6 aberta (entrega/envio); #1–#5 fechadas.

## Sessões manuais: qualificação como assistidas

**Sim, estão corretamente qualificadas nos documentos detalhados**, com uma ressalva de rótulo no README.

- `docs/exploracao.md:1` chama o material de “Execução manual e exploração assistida”; `:3` informa “Operador: Codex via ferramentas interativas do navegador Paseo”, que a pessoa candidata fez a descoberta inicial e que as sessões “foram operadas pelo agente”, sem alegar revisão humana.
- `docs/relatorio-final.md:13` repete que são “sessões curtas de exploração dirigidas pelo agente” e “Não são sessões humanas”.
- `docs/uso-de-ia.md` e `docs/guia-estudo.md` mantêm a mesma qualificação e registram revisão humana pendente.
- `README.md:15` usa “Execução manual e exploração | Duas sessões dirigidas”, sem a palavra “assistidas”. O link leva à página que qualifica corretamente, mas o rótulo isolado pode sugerir operador humano. Correção mínima: “Execução manual assistida e exploração” ou “Duas sessões assistidas”.

Sob interpretação estrita de “manual = operador humano”, o item 2 fica **parcialmente atendido**: há exploração manual-like assistida, documentada e honesta, mas não há sessão humana registrada. Sob interpretação de “manual = interação não scriptada”, o item está atendido. Não há alegação falsa de revisão humana.

## Pendências administrativas (fora dos seis entregáveis)

1. **Repositório privado.** O PDF exige um único repositório público. `gh repo view` retorna `"visibility":"PRIVATE"`. Consequência concreta: o `git clone` do README não funciona para avaliador sem acesso. Correção mínima: o responsável tornar público, revalidar clone e links, e fechar a pendência da issue #6. Não alterei visibilidade.
2. **Prazo.** O material informa PDF recebido em 15/10/2026 e último dia em 20/10/2026. A data desta auditoria é 21/10/2026; não há confirmação de extensão nem horário limite. Correção mínima: confirmar prazo com o recrutador e enviar imediatamente; não declarar envio no prazo sem confirmação.
3. **Formulário e uso de IA.** O formulário `https://elitedev.verzel.com.br/` não foi enviado. O PDF pede declarar onde e como a IA foi usada. O material já contém texto de apoio e não apresenta o trabalho do agente como humano.
4. **Revisão humana.** O próprio material declara que não houve revisão independente por outra pessoa. Isso não é um dos seis entregáveis, mas é um risco de apresentação; a pessoa candidata deve entender e reproduzir os fluxos que pretende defender.

## Observações menores (não bloqueiam os seis)

- `docs/execucao.md:34` ainda tem o título “Resumo final (a preencher)”, embora o topo do arquivo declare que o histórico é superado pela rodada final. Pode confundir leitura rápida. Correção mínima: remover o placeholder ou substituí-lo por link para `rodada-final.md`/`relatorio-final.md`.
- Em `resultado.json`, os anexos usam caminhos como `RF-001/calculo-carrinho-0.json`, relativos a `evidencias/rodada-final/`; os links Markdown de `rodada-final.md` funcionam, mas o caminho não é relativo ao próprio `resultado.json`. Correção mínima: documentar a base ou usar apenas o nome do arquivo.
- O Gherkin do snapshot versionado cobria apenas CT09; conforme informado, a cobertura CT01–CT20 está sendo integrada pelo pai e não foi tratada como lacuna final.

## Limites desta auditoria

- Não reexecutei os 69 testes para não consumir a API compartilhada nem sobrescrever artefatos; validei a lista, as estatísticas preservadas e a consistência dos resultados.
- Não abri a loja ao vivo, não refiz as sessões exploratórias e não auditei a implementação da loja.
- Não afirmo ausência de outros bugs: afirmo que, no conjunto registrado, todas as 8 falhas estão reportadas e mapeadas.
- Não houve revisão humana independente; esta é uma auditoria de conformidade documental e de evidências, não uma reexecução completa nem cobertura exaustiva.
- Não alterei arquivos do repositório, issues, visibilidade ou formulário.
