# Episódio 01 · Matriz FDEM

Endereço: `/matrizfdem` · Arquivo: `public/matrizfdem/index.html` · `episode_id`: `matrizfdem`
Origem: "Ferramenta Proselling para Administração do Tempo" (documento MATRIZ_FDEM_Administracao_do_Tempo_v5).

## Fases
| # | Nome | Conteúdo | Para concluir |
|---|---|---|---|
| 0 | Missão | objetivo, prazo, "vou saber que cheguei lá quando…" (com exemplos) | os 3 campos |
| 1 | Arsenal | até 12 ações (a–l) | ≥ 3 ações |
| 2 | Rotina | atividades semanais (h/semana) e mensais (h/mês), totais automáticos | ≥ 3 atividades com horas |
| 3 | Juízo | cada atividade vira uma carta; perguntas em ordem, a primeira que fechar, fecha | todas classificadas |
| 4 | Plano | para cada D, E ou M: o que vou fazer, com quem, até quando | "o que vou fazer" de cada D/E/M |
| 5 | Tesouro | horas/mês recuperadas (D + E), onde investir, primeiro passo em 48 h, data da revisão, quem vai cobrar | investir, primeiro passo, revisão |
| 6 | Troféu | resumo, conquistas, nome do participante e relatórios | — |

**Perguntas do Juízo:** 1) Leva ao objetivo? Não → **E** (Eliminar). 2) Só eu posso fazer? Não → **D** (Delegar). 3) Faço bem e com satisfação? Não → **M** (Melhorar). Sim nas três → **F** (Foco).
**Conversão:** rotina semanal × 4,3 = horas/mês.
A fase seguinte só abre quando a atual está completa; o botão "Próxima fase" explica o que falta e leva ao campo.

## Relatórios (Troféu)
1. **Relatório na tela:** cartão do tamanho do celular para print; "Salvar imagem" gera PNG (html2canvas 1.4.1).
2. **PDF completo:** A4 com cabeçalho da marca, data/hora, participante, nível/XP/conquistas, missão, arsenal, rotina classificada, diagnóstico, plano, compromisso, assinaturas e rodapé paginado (jsPDF 2.5.1 + jspdf-autotable 3.8.2).
3. **Resumo pelo WhatsApp:** texto formatado via `wa.me`, com link para o episódio; botão "Copiar resumo".
No celular, PDF e imagem abrem o compartilhamento do aparelho (Web Share); no computador são baixados.

## Voz para texto
Botão de microfone em todo campo de texto. Usa o reconhecimento de voz do navegador (pt-BR); se indisponível ou negado, mostra como usar o ditado do teclado (iPhone/Android).

## Progresso vindo do link antigo
O link antigo no Claude (`claude.ai/artifact/GbyYJ8SorF3EinE3HevRBp`) virou uma página "Mudamos de endereço!" que envia o progresso salvo como `#p=<base64url do estado>`. O episódio importa esse estado se ele for mais avançado que o local, limpa o endereço e registra `progress_imported`.
