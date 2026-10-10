# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [SemVer](https://semver.org/lang/pt-BR/).
Para lançar uma versão: altere `version` em `package.json`, registre aqui, faça commit, crie a tag `vX.Y.Z` e faça push (ver [docs/operacao.md](docs/operacao.md)).

## [1.0.0] — 2026-10-10
Primeira versão em produção em https://canetinha.metamode.com.br.

### Hub
- Vitrine estilo streaming com abertura animada ("Proselling apresenta Canetinha Mágica · Série original Proselling"), exibida uma vez por sessão.
- Destaque do episódio em evidência; no celular, compacto, para mostrar a primeira prateleira sem rolar.
- Prateleiras **Gestão** (Matriz FDEM, R5, Venda de Combo, Delivery, Contratar Pessoas, Liderança) e **Lançamentos** (Finanças Básico, Marketing Digital, Teatro de Vendas).
- Capas ilustradas em SVG para todos os episódios; Matriz FDEM com poste de direções (Foco, Delegar, Eliminar, Melhorar) num cruzamento animado.
- Ficha do episódio, progresso por pessoa ("Fase N de 6", "Concluído ✓", "Continuar"), som ON/OFF.

### Episódio 01 · Matriz FDEM
- Jogo em 6 fases + Troféu: Missão, Arsenal, Rotina, Juízo (classificação F/D/E/M por perguntas), Plano, Tesouro.
- XP, níveis, títulos, conquistas, confete e som sintetizado; aviso do que falta para avançar.
- Voz para texto (reconhecimento do navegador, com ajuda para o ditado do teclado).
- Relatórios: na tela (com "Salvar imagem"), PDF completo e resumo para WhatsApp; no celular, compartilhar direto.
- Importação do progresso vindo do link antigo no Claude (`#p=`).

### Plataforma
- Servidor Node sem dependências no Railway; domínio `canetinha.metamode.com.br` com HTTPS.
- Endereços curtos por episódio, minúsculas/barra final normalizadas, `/matriz-fdem` → `/matrizfdem`.
- GA4 (G-7SWLQJ3ND5) com `content_group`, `episode_id` e `app_version`; eventos de uso por episódio.
- Prévias de link (Open Graph) por página e por episódio.
- Versão exposta em `/version`, no cabeçalho `X-App-Version` e no rodapé das páginas.
