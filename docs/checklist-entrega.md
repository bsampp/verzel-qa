# Checklist do enunciado — o que está pronto

Esta página responde ao checklist do PDF. Concluir a entrega de QA não significa aprovar a funcionalidade nem provar que não existem outros bugs. A rodada completa registrada executou 69 testes (61 passaram e oito falharam por dois defeitos), com reprodução em clone limpo.

## Os seis entregáveis técnicos

| Item do PDF | Entrega existente | Estado |
| --- | --- | --- |
| Cenários levantados da documentação; Gherkin como diferencial | [20 cenários e referências CA](cenarios.md), [Gherkin CT01–CT20](cenarios.feature) e [como usar Gherkin](gherkin.md) | Entregue, incluindo o diferencial Gherkin |
| Execução manual/exploratória com resultado por cenário | [69 resultados por variante](rodada-final.md), [histórico](execucao.md) e [exploração assistida](exploracao.md) | Entregue, com limites do operador e duração declarados |
| Report de todos os bugs encontrados | [BUG-001 e BUG-002](bugs/README.md), issues #7 e #8 | Entregue; defeitos continuam abertos |
| Documento de evidências | [Índice](evidencias.md), respostas/screenshot por teste e snapshots da exploração | Entregue |
| Automação de pelo menos três cenários com Playwright | 18 testes pelo navegador e 51 pela API, em `tests/` | Entregue; falhas de produto visíveis |
| README explicando instalação, execução e localização das entregas | [README](../README.md), [verificação em clone limpo](verificacao-entrega.md) | Entregue |

A execução manual adicional foi operada por agente via navegador, não por uma pessoa. As sessões de 70 e 89 segundos não equivalem a exploração extensiva. A descoberta inicial de frete foi feita pela pessoa candidata. O material descreve esses fatos; antes de apresentar o trabalho, a pessoa candidata deve entender e reproduzir os fluxos que pretende defender.

## O que significa “todos os cenários”

CT01–CT20 são o planejamento definido neste repositório. Todos têm variantes executadas e evidência, mas isso não cobre todas as combinações imagináveis. Os 11 critérios de aceite receberam verificações; CA06 e CA10 têm violações confirmadas. O critério de arredondamento foi exercitado nos valores do catálogo; política de meio centavo não especificada. Só há um cupom válido para avaliar a regra de cupom único.

Não estão incluídos testes de carga, estresse ou segurança, que o enunciado exclui. Também não alegamos avaliação ampla de acessibilidade, responsividade, falhas de rede ou múltiplos navegadores. Esses limites não invalidam os entregáveis acima, mas impedem afirmar que toda a loja está livre de bugs.

## Regras administrativas de envio

- Repositório público desde 21/10/2026, por autorização da pessoa candidata. Visibilidade PUBLIC e acesso HTTP 200 sem autenticação conferidos.
- Formulário ainda não enviado. Informar uso de IA no formulário, sem apresentar ações do agente como trabalho manual humano.
- Recebimento informado: 15/10/2026; último dia informado pela pessoa candidata: 20/10/2026. Esta revisão complementar ocorre em 21/10/2026; não afirmar que o envio foi feito no prazo.
- Não há deploy a entregar.

## Revisão independente

Em 21/10/2026, dois subagentes OpenCode/DeepSeek concluíram a [revisão independente](revisoes/README.md). A conferência encontrou os seis artefatos materiais; a reprodução independente confirmou 61/8 sem bloqueante nas expectativas. As ressalvas sobre manual humano e envio permanecem. O Gherkin CT01–CT20 foi concluído pelo pai a partir dos arquivos do terceiro worker e validado pelo parser oficial (20 cenários, idioma pt). O GitHub é o tracker canônico; o Firstmate mostra a operação da revisão.
