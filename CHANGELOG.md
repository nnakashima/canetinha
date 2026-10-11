# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [SemVer](https://semver.org/lang/pt-BR/).
Para lançar uma versão: altere `version` em `package.json`, registre aqui, faça commit, crie a tag `vX.Y.Z` e faça push (ver [docs/operacao.md](docs/operacao.md)).

## [1.0.3] — 2026-10-11
### Alterado
- Imagem de prévia do link da Matriz FDEM sem número de episódio: o selo agora diz só "CANETINHA MÁGICA · EPISÓDIO", porque a ordem de apresentação futura não terá este como o primeiro. Novo arquivo `og-matrizfdem-v3.jpg`.

## [1.0.2] — 2026-10-10
### Corrigido
- Matriz FDEM, fases 4 e 5: no iPhone (Safari) o campo de data invadia o campo ao lado ("Até quando" / "Quem vai me cobrar"). O campo de data agora respeita a largura da coluna e, em telas de até 480 px, os pares de campos ficam um embaixo do outro.
- Fase 5: letras D e E dos quadros "Delegáveis/Elimináveis" desalinhadas; em telas de 320 px os quadros ficam empilhados.
- Relatório na tela cabe inteiro em celulares baixos (ex.: iPhone SE).
### Verificado
- Fases 0–6 e relatório em perfis de iPhone SE, iPhone 12, iPhone 14 Pro Max, Galaxy S8, Galaxy S9+ e Pixel 5 (320 a 430 px): sem sobreposição nem rolagem lateral.

## [1.0.1] — 2026-10-10
### Alterado
- Imagens de prévia do link (WhatsApp/redes) refeitas com a capa atual da Matriz FDEM (poste de direções) e as fontes da marca, para o hub e para o episódio. Novos arquivos `og-canetinha-v2.jpg` e `og-matrizfdem-v2.jpg` (nome novo força o WhatsApp a buscar a imagem nova).

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
