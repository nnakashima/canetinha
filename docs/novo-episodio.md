# Como criar um novo episódio

**Padrão atual:** o episódio SELF para RH (`public/selfpararh/index.html`) é a referência de qualidade para os próximos (fase de dados com câmera e CEP, voz com reserva pelo teclado, retrato e auto-retrato, NPS, relatório na tela completo, PDF em 2 páginas, GA4 sem dados pessoais). A skill "canetinha-magica-episodio" descreve esse padrão passo a passo.

Há também uma skill no Claude ("canetinha-magica-episodio") que segue este roteiro.

1. **Material:** leia o documento de origem e mapeie cada passo para uma fase; defina a mecânica central (equivalente ao Juízo) e o "número-tesouro" do resultado final.
2. **Página:** copie `public/matrizfdem/index.html` para `public/<slug>/index.html` (slug minúsculo, sem acentos/hífens, igual ao do catálogo). Troque `EPISODE`, `EP_ID`, a chave `KEY` do localStorage (`<slug>-v1`), títulos, meta tags (`og:url` `__ORIGIN__/<slug>`, `og:image`) e reescreva `blank()`, `complete()`, `missing()`, `xp()`, `achievements()`, telas, `summaryText()`, `cardHTML()` e `buildPDF()`. Mantenha abertura, HUD, som, voz, toasts e confete.
   - Cuidado: uma fase que depende de lista filtrada deve exigir `complete(i-1)` para não liberar XP no início.
3. **Hub (`public/index.html`):** no `EPISODES`, mude a entrada para `status:"live"` e preencha `num`, `isNew:true` (tire dos anteriores), `url:"/<slug>"`, `store:"<slug>-v1"`, `subject`, `phases`, `time`, `desc`, `gets`. Se for novo, crie a entrada com `title:"…", slug:"…"` no início e inclua o id em `SHELVES`. Opcional: `FEATURED`.
4. **Prévia do link:** gere `public/assets/og-<slug>.jpg` (1200×630) com a capa do episódio e as fontes da marca. Ao trocar uma imagem já divulgada, use um nome novo (ex.: `-v2`): o WhatsApp guarda a prévia pelo endereço da imagem. Episódios ainda "Em breve!" também podem ter prévia própria: basta existir `og-<slug>.jpg`, que o servidor usa no link `/<slug>`.
5. **Testar local:** jogar até o Troféu, gerar PDF e imagem e conferir `/<slug>` em perfis de celular de 320 a 430 px (iPhone SE, iPhone 12, iPhone 14 Pro Max, Galaxy S8/S9+, Pixel 5). Atenção ao campo de data do Safari (largura mínima própria): use `min-width:0`, `appearance:none` e pares de campos empilhados em telas estreitas.
6. **Versão:** subir o minor no `package.json`, registrar no `CHANGELOG.md`, commit, tag e push (ver [operacao.md](operacao.md)).
