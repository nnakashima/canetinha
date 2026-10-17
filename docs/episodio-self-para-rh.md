# Episódio: SELF para RH (protótipo)

"Quero Jogar no Time": jornada do candidato a uma vaga de loja, com o perfil SELF 4D resumido no fim. Página em `public/selfpararh/index.html`, chave local `selfpararh-v1`. O card do hub continua "Em breve!" enquanto o episódio é avaliado.

## Fases
| Fase | Rótulo | O que pede | Conclui quando |
|---|---|---|---|
| 0 | Posição | carrossel com as vagas abertas (`POS`) | uma vaga escolhida |
| 1 | Por quê | motivos em chips (`WHY`) + texto livre opcional | 1 motivo ou texto |
| 2 | Avaliação | 5 situações (`QS`), uma opção por situação | as 5 respondidas |
| 3 | Experiência | empresa, cargo, tempo (anos/meses); "primeiro emprego" | 1 experiência completa ou primeiro emprego |
| 4 | Formação | escola, curso, ano de conclusão (ou "cursando") | 1 formação completa |
| 5 | Dados | nome, WhatsApp, e-mail, CEP (ViaCEP preenche endereço, bairro e cidade), número; foto e vídeo opcionais; autorização LGPD | todos os campos (bairro opcional) + autorização |
| 6 | Troféu | perfil SELF, conquistas e exportações (tela, PDF, WhatsApp, vídeo) | — |

## Pontuação (modelo SELF 4D simplificado)
Cada opção carrega `d` (D/I/S/C), `lc` e `ie` (1–4) e `m` (motivador). DISC = % das situações em que a letra foi escolhida; código = letra principal + secundária (`Id`). Locus e IE = `(soma − N) / 3N × 100` (Interno/Misto/Externo; Alta/Moderada/Baixa com cortes 33/66). Motivador = o mais escolhido. Os pesos não aparecem para o candidato nem nos relatórios.

## Analytics (GA4)
Eventos: `episode_start`, `position_selected` (position), `question_answered` (question), `phase_complete`, `trophy_reached` (position), `report_pdf`, `report_image`, `report_whatsapp`, `report_copy`, `voice_input`. `media_added` (type), `report_video`. Nenhum dado pessoal nem resposta vai para o GA4.

## Dados pessoais
Ficam só no aparelho: textos e foto no `localStorage` (`selfpararh-v1`), vídeo no IndexedDB (`selfpararh`). "Recomeçar do zero" apaga tudo. A foto entra no PDF e no cartão; o vídeo é compartilhado à parte pelo botão do troféu.
