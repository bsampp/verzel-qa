# Issue tracker: GitHub

Tracker canônico: https://github.com/bsampp/verzel-qa/issues. O repositório é bsampp/verzel-qa; confirmar o remote antes de escrever. Usar `gh` no checkout para ler e atualizar issues. Firstmate é apenas acompanhamento operacional das tarefas e agentes; não substitui o estado das issues.

## Operações

- Ler contexto completo: `gh issue view <n> --comments`.
- Listar: `gh issue list --state all --json number,title,state,body,labels`.
- Criar: `gh issue create --title '...' --body-file <arquivo>`.
- Atualizar corpo: `gh issue edit <n> --body-file <arquivo>`.
- Progresso: `gh issue comment <n> --body-file <arquivo>`.
- Concluir tarefa de QA somente com entregáveis verificáveis; bugs do produto permanecem abertos até correção e reteste.

Usar arquivos temporários para textos multilinha; não interpolar conteúdo externo no shell. Não duplicar issues de tarefas ou bugs existentes. Associar critérios CA, cenários CT, execução e evidência. Status do Firstmate deve refletir trabalho real, sem inventar agentes ou execuções.

## Publicação e autorização

PRs as a request surface: no.

Esta configuração não autoriza mudança de visibilidade, envio de formulário, merge ou correção na aplicação avaliada. Preservar `.gitignore` e `docs/uso-de-ia.md` locais conforme orientação da pessoa candidata; já estão tracked no histórico, com skip-worktree para mudanças locais.

## Wayfinding e dependências

Manter as issues #1–#6 como histórico da entrega; #7 e #8 são defeitos. Novos slices devem representar um resultado verificável, com critérios de aceite e bloqueadores reais. Usar dependências nativas do GitHub quando disponíveis; caso contrário, registrar `Blocked by: #n`. Não criar labels de triage ou mapas sem uso concreto.
