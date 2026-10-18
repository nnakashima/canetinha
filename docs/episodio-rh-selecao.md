# Episódio 03 · RH Seleção

Ferramenta do gestor que vai contratar. Sem gamificação: o gestor descreve o negócio e a vaga, carrega os resultados do SELF para RH dos candidatos e compara cada um com um **perfil-alvo** da vaga, em linguagem simples. A ferramenta orienta a escolha; não decide pelo gestor.

- Endereço: `/rhselecao` (no hub aparece como "Em breve!" até o lançamento; o link direto já funciona)
- Arquivo: `public/rhselecao/index.html` · regras: `lib/rhselecao.js` · rota: `POST /api/rhselecao` em `server.js`
- Armazenamento: `localStorage` com a chave `rhselecao-v1` (negócio, processos, candidatos, anotações, decisões)

## Etapas
| # | Etapa | Obrigatório para avançar |
|---|---|---|
| 1 | Seu negócio: segmento, formato, tempo de operação, colaboradores, clientes por dia, pico, metragem, mesas, delivery, faturamento (opcional, em faixa), principal dor (até 2), por que as pessoas saem, observações | segmento, clientes por dia, dor |
| 2 | A vaga: processos seletivos (vários), posição (Artista, Gerente ou outra com tipo), turno, quantidade, motivo, nome e código SELF do líder (opcionais) | posição; código do líder válido se preenchido |
| 3 | Candidatos: PDFs do SELF para RH (vários de uma vez, arrastar ou escolher), resumo do WhatsApp ou código; time atual (opcional) por PDF ou código | 1 candidato com código válido |
| 4 | Análise: "o que a vaga pede" (4 prioridades e o porquê) + Individual, Comparar e Time | análise concluída |
| 5 | Decisão: escolhido(s), motivos, texto livre, acompanhamento de 90 dias, PDF, WhatsApp, cópia | — |

O botão "Próximo" nunca fica desabilitado em silêncio: mostra o que falta, rola até o campo e faz o campo tremer. O menu **Arquivo** exporta e importa todos os processos (`.json`) e apaga os dados do aparelho.

## Leitura dos PDFs (no navegador)
1. **SELF para RH 1.11 ou mais novo:** as propriedades do PDF trazem `selfrh1:` + JSON codificado (código S4D1, nome, contato, cidade, vaga, motivos, experiência, formação, data). Leitura exata.
2. **PDFs anteriores:** extração do texto com pdf.js 3.11.174 (cdnjs). Os rótulos vêm com letras espaçadas, então a busca compara sem espaços (`CANDIDATO(A)`, `VAGA DESEJADA`); o código é achado pela expressão `S4D1-…`; a experiência sai da tabela pela posição das colunas do cabeçalho.
3. **Resumo do WhatsApp:** lê `*Nome:*`, `*WhatsApp:*`, `*E-mail:*`, `*Cidade:*`, `*Vaga:*`, `*Código para o RH:*` e a experiência. Texto com vários códigos vira um candidato por código.

Todo código passa pelo dígito verificador (soma dos caracteres mod 36) antes de ser aceito. Duplicados (mesmo código e nome) são ignorados.

## Análise (servidor)
A página envia **só** o contexto do negócio (sem nome da loja, faturamento e observações), a vaga (posição, tipo, turno, código do líder) e os códigos S4D1 com um id aleatório. Nome, telefone, currículo e anotações nunca saem do aparelho.

`lib/rhselecao.js`:
- **Perfil-alvo:** 7 prioridades possíveis (ritmo no pico, calma com clientes, dono do resultado, energia para vender, capricho e padrão, parceria e permanência, liderar pessoas). Pesos de base por tipo de vaga (operação ou liderança) + acréscimos por contexto (clientes por dia, pico, idade da loja, dor, formato, delivery, equipe, motivos de saída, turno, segmento). As 4 de maior peso formam o perfil-alvo, cada uma com até 3 razões.
- **Aderência:** cada prioridade tem um escore 0–100 calculado das 4 dimensões do código; a média ponderada pelas 4 prioridades vira faixa (Alta ≥ 68, Boa ≥ 50, Atenção abaixo). Nenhum número sai do servidor, só faixas e níveis (baixo/médio/alto por prioridade).
- **Saídas por candidato:** destaque, até 3 forças, 2 pontos a explorar, 4 perguntas de entrevista (pontos fracos, motivador principal, turnos especiais), notas (vaga diferente da que o candidato fez, encaixe com o estilo do líder, estilo que falta no time) e o perfil decodificado (estilo, % DISC, emoções, locus, motivadores).
- **Time:** cobertura dos estilos D/I/S/C do time atual e quais faltam.

Para ajustar as regras, edite `BASE`, `target()`, `scores()` e os textos em `lib/rhselecao.js` e teste com `node -e "console.log(require('./lib/rhselecao').run({...}))"`.

## Relatórios
- **PDF do processo** (jsPDF): negócio, vaga e perfil-alvo, tabela comparativa com faixa colorida, time, candidato a candidato (contato, código, destaque, forças, explorar, perguntas, notas, anotações da entrevista) e decisão com data de acompanhamento. Traz o aviso de dados pessoais (LGPD).
- **WhatsApp e cópia:** vaga, prioridades, faixa e destaque de cada candidato, escolhido(s), motivos e data de acompanhamento.

## Privacidade
Dados pessoais ficam no aparelho do gestor. O servidor recebe códigos anônimos e não guarda nada. O GA4 recebe só eventos agregados (ver [analytics](analytics.md)).

## Próximas versões
- Painel da rede para franqueadores e estudo de β (Psiconometria): exige conta na nuvem, consentimento e base pseudonimizada.
