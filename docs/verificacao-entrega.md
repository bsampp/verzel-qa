# Verificação da entrega

## Reprodutibilidade

Clone limpo criado com `git clone --no-local` do commit **22c849d**, que contém a configuração e todos os testes finais. Nenhum `node_modules`, relatório ou estado do navegador do workspace foi reaproveitado. O cache de download do Chromium é da máquina; os contextos de teste são novos. Documentação e seleção de evidências foram consolidadas depois, sem modificar os testes.

| Comando | Resultado |
| --- | --- |
| `npm ci` | Código 0; instalação pelo lockfile |
| `npm run typecheck` | Código 0 |
| `npx playwright install chromium` | Código 0; navegador disponível |
| `npm test` | Código 1, 69 testes: 61 passaram e 8 falharam |

O conjunto de títulos e estados de todos os testes foi comparado ao da rodada final e é idêntico. Código 1 é esperado como resultado dos defeitos, sem mascará-los com retries, skips ou falhas esperadas. O relatório pode ser aberto com `npm run test:report` na máquina da execução.

[Estatísticas do clone limpo](../evidencias/verificacao/clone-limpo.json).

## Revisão dos artefatos

Resultados por variante e anexos selecionados preservados no Git, incluindo respostas de cálculo/pedido, screenshots de sucesso/falha e snapshots da exploração. Links Markdown locais e caminhos de anexos foram conferidos; `git diff --check` sem erros. Testes foram revisados junto às regras e aos resultados; não houve revisão independente por outra pessoa ou agente.

Dados de cliente são sintéticos. O conteúdo do projeto foi conferido antes da publicação; arquivos de ambiente e artefatos temporários não entram nos commits. `.gitignore` e `docs/uso-de-ia.md` já existiam no histórico anterior: por orientação da pessoa candidata, suas alterações locais não são commitadas (`skip-worktree`). Isso não remove as versões antigas do histórico.

## Pendências administrativas

- Repositório ainda privado; o PDF exige que seja público antes do envio.
- Prazo confirmado pela pessoa candidata: PDF recebido em 15/10/2026; último dia de envio em 20/10/2026. Horário limite não informado.
- Revisão humana e envio pelo formulário: https://elitedev.verzel.com.br/.
- Informar no formulário o uso de IA. O registro de apoio atualizado permanece local.

Não há deploy a entregar. O formulário não foi enviado automaticamente.
