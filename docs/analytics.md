# Analytics (GA4)

- **Propriedade:** Canetinha WebApp · conta NAKASHIMA PROJECTS (`a392840161` / `p558319345`)
- **Fluxo web:** canetinha · `https://canetinha.metamode.com.br` · ID de métricas **G-7SWLQJ3ND5**

## Parâmetros enviados em toda página (`gtag('config', …)`)
| Parâmetro | Valores |
|---|---|
| `content_group` | `hub`, `episodio`, `episodio_em_breve` |
| `episode_id` | slug do episódio (`matrizfdem`, `selfpararh`, `r5`…) ou vazio no hub |
| `app_version` | versão do sistema (ex.: `1.0.0`) |
Todo evento customizado também leva `episode_id` (no hub, `hub`; o episódio clicado vai em `episode`).

## Eventos
| Página | Evento | Parâmetros |
|---|---|---|
| Hub | `episode_details` | `episode`, `status` (live/soon) |
| Hub | `episode_play` | `episode` |
| Hub | `episode_link_open` | `episode`, `status` (chegada por /r5 etc.) |
| Hub/Episódio | `sound_toggle` | `on` |
| Episódio | `episode_start` / `episode_resume` | — |
| Episódio | `phase_complete` | `phase`, `phase_name` |
| Episódio | `level_up` | `level` |
| Episódio | `card_classified` | `category` (F/D/E/M) |
| Episódio | `trophy_reached` | `xp`, `hours_recovered` |
| Episódio | `report_screen` / `report_image` / `report_pdf` | `method` (shared/saved) nos dois últimos |
| Episódio | `report_whatsapp` / `report_copy` | — |
| Episódio | `voice_input` | `result` (speech/keyboard_help) |
| Episódio | `progress_imported` | `step` |
| SELF para RH | `position_selected` | `position` (artista/gerente) |
| SELF para RH | `question_answered` | `question` (1 a 13), sem a resposta |
| SELF para RH | `media_added` | `type` (photo/video), `source` (camera/file) |
| SELF para RH | `camera_error` | `error` |
| SELF para RH | `nps_answered` | `score` (0 a 10), `category` (promotor/neutro/detrator) |
| SELF para RH | `code_copy` / `report_video` | — / `method` |
| SELF para RH | `trophy_reached` | `xp`, `position` |
| RH Seleção | `rh_open` | `processos` |
| RH Seleção | `rh_step` | `step` (1 a 5) |
| RH Seleção | `rh_cand_add` | `method` (pdf/texto), `kind` (candidato/time), `n` |
| RH Seleção | `rh_analise` | `candidatos`, `time` (quantidades) |
| RH Seleção | `rh_compare` / `rh_decision` / `rh_follow` | — / `escolhidos` / `result` (ficou/saiu) |
| RH Seleção | `rh_pdf` / `rh_whatsapp` / `rh_copy` / `rh_export` / `rh_import` / `rh_new_process` / `rh_reset` | `method` no PDF |
Nenhum evento leva nome, contato, foto, vídeo, respostas da avaliação, códigos SELF, dados do negócio nem comentário do NPS.

## Definições personalizadas (Administrador → Definições personalizadas)
| Nome | Escopo | Parâmetro | Situação |
|---|---|---|---|
| ID do episódio | Evento | `episode_id` | em uso |
| Episódio | Evento | `episodio` | não enviado pelo site (pode ser arquivada) |
| Prateleira | Evento | `prateleira` | não enviado pelo site (pode ser arquivada) |
Sugestão: registrar também `app_version`, `phase`, `category` e `method` se forem usados em relatórios.

## Onde olhar
- **Acessos por episódio:** Relatórios → Engajamento → Páginas e telas (caminho da página: `/matrizfdem`, `/selfpararh`, `/r5`…) ou Grupo de conteúdo.
- **NPS do SELF para RH:** Relatórios → Engajamento → Eventos → `nps_answered` (registrar `score` e `category` como dimensões personalizadas para ver a distribuição).
- **Funil do episódio:** Explorar → Exploração de funil com `episode_start` → `phase_complete` (phase 0…5) → `trophy_reached` → `report_*`.
- **Interesse em episódios futuros:** evento `episode_link_open` e `episode_details` com `status = soon`.
- **Tempo real:** Relatórios → Tempo real (para testar).
Dimensões personalizadas valem a partir da criação e levam até 24–48 h para aparecer nos relatórios.

## Privacidade
O GA4 usa cookies. Para público externo, avaliar banner de consentimento (LGPD) — ainda não implementado.
