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

## Avaliação (fase 2)
13 situações ilustradas, uma escolha por situação, opções embaralhadas (`PERM`) e pesos ocultos.

| Dimensão | Situações | Opções | Cálculo |
|---|---|---|---|
| DISC | fila, ideia, novato, caixa | uma letra D, I, S ou C por opção | % de escolhas de cada letra (ipsativo) |
| Inteligência emocional | grito, calado, crítica | níveis 1 a 4 | `(soma − N) / 3N × 100`; Alta > 66, Baixa < 33 |
| Locus de controle | meta, promoção, pedido | níveis 1 (externo) a 4 (interno) | `(soma − N) / 3N × 100`; Interno > 66, Externo < 33 |
| Motivadores | anima, dia perfeito, elogio | um motivador por opção; cada um dos 6 aparece 2 vezes | escolhas ÷ aparições × 100; ordena o principal e o secundário |

Código SELF (padrão SELF 4D): `[Primário][secundário] LC[int|mix|ext] IE[high|mid|low] M[motivador]`, ex.: `Is LCint IEhigh Msoc`.

## Código para o RH (entrada do próximo episódio)
`S4D1-<estilo>-<D><I><S><C>-<LC>-<IE>-<M1><M2>-<VAGA>-<V>`

| Parte | Exemplo | Significado |
|---|---|---|
| `S4D1` | S4D1 | versão do formato |
| estilo | Is | letra principal + secundária (minúscula) |
| D I S C | 25502500 | 4 pontuações de 2 dígitos (00–99; 100 vira 99), na ordem D, I, S, C |
| LC | 89 | locus de controle 00–99 |
| IE | 89 | inteligência emocional 00–99 |
| M1 M2 | SOCTRA | motivador principal e secundário (THE, UTI, AES, SOC, IND, TRA; XXX se não houver) |
| VAGA | ART | ART = Artista de Sanduíche, GER = Gerente (campo `code` em `POS`) |
| V | E | verificador: soma dos códigos de caractere do texto antes do último hífen, mod 36, em base 36 maiúscula |

Para validar: recalcular o verificador e comparar; separar por `-`.

## Analytics (GA4)
Eventos: `episode_start`, `position_selected` (position), `question_answered` (question), `phase_complete`, `trophy_reached` (position), `report_pdf`, `report_image`, `report_whatsapp`, `report_copy`, `voice_input`. `media_added` (type), `report_video`. Nenhum dado pessoal nem resposta vai para o GA4.

## Dados pessoais
Ficam só no aparelho: textos e foto no `localStorage` (`selfpararh-v1`), vídeo no IndexedDB (`selfpararh`). "Recomeçar do zero" apaga tudo. A foto entra no PDF e no cartão; o vídeo é compartilhado à parte pelo botão do troféu.
