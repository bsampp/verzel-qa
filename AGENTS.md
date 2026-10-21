# Verzel QA — orientações para agentes

Este é um laboratório e uma entrega de QA, não a implementação da loja. Ler README e requisitos antes de alterar testes. Manter o escopo do enunciado: cenários, execução manual/exploratória, bugs, evidências, Playwright e instruções.

- Falhas reais devem continuar visíveis; não usar skip, retries ou expectativas erradas para obter verde.
- Não executar carga, estresse ou segurança. API compartilhada: usar um worker e dados sintéticos.
- Não sobrescrever a evidência versionada de uma rodada ao executar outra.
- Testes locais: `npm run typecheck`; Playwright focado antes de ampliar. Código 1 pode ser reprovação funcional; investigar o motivo.
- Delegação: leitura pode compartilhar checkout; alterações paralelas exigem arquivos exclusivos ou worktrees. Filhos não mudam visibilidade nem enviam formulários.
- `.gitignore` e `docs/uso-de-ia.md` têm mudanças locais que não devem entrar nos commits. Não reverter nem limpar esses arquivos.

## Agent skills

### Issue tracker

GitHub Issues de bsampp/verzel-qa é o tracker canônico; Firstmate acompanha a operação. Ver `docs/agents/issue-tracker.md`.

### Domain docs

Contexto único; regras e evidências de QA existentes orientam o trabalho. Ver `docs/agents/domain.md`.

## Skills de Matt Pocock

Setup realizado com `setup-matt-pocock-skills`: tracker GitHub e documentação de contexto único. Não há skill triage instalada; não criar configuração de labels sem consumidor.

Ao usar `to-tickets`, transformar necessidades em slices pequenos e verificáveis: regra → cenário → execução → evidência → conclusão. Reutilizar o backlog existente e explicitar os bloqueadores; não criar novas tarefas apenas para repetir trabalho concluído. Atualizações autorizadas pelo usuário devem registrar resultados reais nas issues e no board.
