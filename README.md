# Canetinha Mágica

Caixa de ferramentas da Consultoria Proselling para desenvolvimento de empresários.
Hub estilo streaming + episódios gamificados, com Google Analytics 4 (G-7SWLQJ3ND5).

## Estrutura
- `server.js` — servidor Node sem dependências (porta `PORT`, health check em `/healthz`).
- `public/index.html` — hub (vitrine).
- `public/matriz-fdem/index.html` — episódio 01, Matriz FDEM.
- `public/assets/` — ícones e imagens de prévia do link (WhatsApp/redes).

## Rodar local
```
npm start   # http://localhost:3000
```

## Deploy no Railway
- Pelo painel: New Project → Deploy from GitHub repo (ou `railway up` na pasta). Railway detecta Node e roda `npm start`.
- Settings → Networking → Generate Domain (ou Custom Domain, ex.: canetinha.nakashima.com.br).
- Opcional: variável `PUBLIC_URL=https://seu-dominio` para fixar o endereço usado nas prévias de link.

## Eventos GA4
Hub: `episode_details`, `episode_play`, `sound_toggle`.
Episódio (com `episode_id`): `episode_start`, `episode_resume`, `phase_complete` (phase, phase_name), `level_up`,
`card_classified` (category), `trophy_reached` (xp, hours_recovered), `report_screen`, `report_image`, `report_pdf`
(method: shared/saved), `report_whatsapp`, `report_copy`, `voice_input` (speech/keyboard_help), `sound_toggle`.

## Novo episódio
1. Criar `public/<slug>/index.html` a partir do episódio Matriz FDEM.
2. No hub (`public/index.html`), no objeto `EPISODES`: `status:"live"`, `url:"/<slug>"`, `store:"<chave localStorage>"`, `num`, textos.
3. Gerar `public/assets/og-<slug>.jpg` (1200×630) e publicar.
