# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e [SemVer](https://semver.org/lang/pt-BR/).
Para lançar uma versão: altere `version` em `package.json`, registre aqui, faça commit, crie a tag `vX.Y.Z` e faça push (ver [docs/operacao.md](docs/operacao.md)).

## [1.6.0] — 2026-10-17
### Alterado
- SELF para RH, troféu: os 6 cards de conquistas viraram o retrato do candidato: uma qualidade por dimensão (Estilo/DISC, Emoções/IE, Motivação, Locus), o status (sempre "APTO") e um elogio que junta as quatro (ex.: "Comunicativo e protagonista, movido a ajudar com muito equilíbrio."). Qualidades, elogio e status também entram no resumo do WhatsApp, no relatório na tela e no PDF (no lugar das conquistas).

## [1.5.1] — 2026-10-17
### Corrigido
- PDF, imagem e vídeo (Matriz FDEM e SELF para RH): no computador, o arquivo é baixado direto para a pasta de downloads. Antes, o Safari do Mac abria o menu de compartilhar, sem opção de salvar. No celular e no tablet continua abrindo o compartilhar (WhatsApp, e-mail, "Salvar em Arquivos").

## [1.5.0] — 2026-10-17
### Adicionado
- SELF para RH, fase Dados: câmera dentro da própria página (celular e computador). "Tirar foto" abre a câmera com moldura do rosto; "Gravar vídeo" grava até 30 segundos com contador, e dá para virar a câmera. Se o navegador não tiver câmera ou a permissão for negada, oferece enviar um arquivo.
- Opção "ou envie um arquivo" para foto e vídeo já gravados. Evento GA4 `camera_error` e campo `source` (camera/file) em `media_added`.

## [1.4.0] — 2026-10-17
### Alterado
- SELF para RH, fase 2 "Como você joga": avaliação refeita para medir as 4 dimensões do SELF 4D de forma separada: 13 situações (4 de DISC, 3 de inteligência emocional, 3 de locus de controle e 3 de motivadores, cada motivador aparecendo em 2 situações). Opções embaralhadas e pesos ocultos.
- Pontuação: DISC e motivadores ipsativos (% das escolhas, motivador normalizado pelas aparições); IE e locus em escala situacional de 1 a 4, `(soma − N) / 3N × 100`.
### Adicionado
- Ilustração de cada situação no estilo dos bonequinhos das capas.
- Código SELF no formato do SELF 4D (ex.: `Is LCint IEhigh Msoc`) e código para o RH (ex.: `S4D1-Is-25502500-89-89-SOCTRA-ART-E`), no troféu (com botão de copiar), no relatório na tela, no PDF e no resumo do WhatsApp. Formato documentado em `docs/episodio-self-para-rh.md` para o episódio do anunciante da vaga.

## [1.3.0] — 2026-10-17
### Adicionado
- SELF para RH: nova fase 5 **Seus dados** (antes do troféu): nome, WhatsApp, e-mail, CEP com endereço automático (ViaCEP), número, bairro e cidade, foto e vídeo de apresentação opcionais pela câmera do celular e autorização de uso dos dados (LGPD).
- Foto (recortada e reduzida para 480 px) no troféu, no relatório na tela e no PDF; vídeo guardado no próprio aparelho (IndexedDB) e compartilhado pelo botão "Vídeo de apresentação" no troféu.
- Nada é enviado a servidor: os dados só saem do celular quando a pessoa compartilha o relatório. Eventos GA4 novos: `media_added` (tipo) e `report_video`, sem dados pessoais.

## [1.2.0] — 2026-10-17
### Adicionado
- Protótipo do episódio **SELF para RH** em `/selfpararh` ("Quero Jogar no Time"): abertura com as letras S E L F, carrossel de vagas (Artista de Sanduíche, Gerente), motivos com chips, 5 situações no modelo SELF 4D, experiência (ou primeiro emprego), formação e troféu com perfil SELF, relatório na tela, PDF e resumo pelo WhatsApp. Voz em todos os campos e eventos GA4. Ver [docs/episodio-self-para-rh.md](docs/episodio-self-para-rh.md).
- O card do hub segue "Em breve!" durante a avaliação.

## [1.1.1] — 2026-10-17
### Alterado
- Prévia do link de episódios "Em breve!": quando existe `public/assets/og-<slug>.jpg`, o link `/<slug>` usa essa imagem no WhatsApp e redes (antes mostrava sempre a capa do hub, com a Matriz FDEM).
### Adicionado
- `og-selfpararh.jpg`: prévia do SELF para RH com a capa do camarim e a faixa "EM BREVE!".

## [1.1.0] — 2026-10-17
### Adicionado
- Episódio **SELF para RH** ("Em breve!") em `/selfpararh`, segundo card da prateleira Gestão, logo depois da Matriz FDEM. Capa ilustrada: camarim com moça e rapaz diante do espelho com lâmpadas.
### Removido
- Episódio "Contratar Pessoas" da vitrine, substituído por SELF para RH.

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
