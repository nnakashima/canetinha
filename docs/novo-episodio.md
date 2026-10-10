# Como criar um novo episódio

Há também uma skill no Claude ("canetinha-magica-episodio") que segue este roteiro.

1. **Material:** leia o documento de origem e mapeie cada passo para uma fase; defina a mecânica central (equivalente ao Juízo) e o "número-tesouro" do resultado final.
2. **Página:** copie `public/matrizfdem/index.html` para `public/<slug>/index.html` (slug minúsculo, sem acentos/hífens, igual ao do catálogo). Troque `EPISODE`, `EP_ID`, a chave `KEY` do localStorage (`<slug>-v1`), títulos, meta tags (`og:url` `__ORIGIN__/<slug>`, `og:image`) e reescreva `blank()`, `complete()`, `missing()`, `xp()`, `achievements()`, telas, `summaryText()`, `cardHTML()` e `buildPDF()`. Mantenha abertura, HUD, som, voz, toasts e confete.
   - Cuidado: uma fase que depende de lista filtrada deve exigir `complete(i-1)` para não liberar XP no início.
3. **Hub (`public/index.html`):** no `EPISODES`, mude a entrada para `status:"live"` e preencha `num`, `isNew:true` (tire dos anteriores), `url:"/<slug>"`, `store:"<slug>-v1"`, `subject`, `phases`, `time`, `desc`, `gets`. Se for novo, crie a entrada com `title:"…", slug:"…"` no início e inclua o id em `SHELVES`. Opcional: `FEATURED`.
4. **Prévia do link:** gere `public/assets/og-<slug>.jpg` (1200×630) com a capa do episódio e as fontes da marca. Ao trocar uma imagem já divulgada, use um nome novo (ex.: `-v2`): o WhatsApp guarda a prévia pelo endereço da imagem.
5. **Testar local:** jogar até o Troféu, gerar PDF e imagem, conferir 390×780 e 360×640, conferir `/<slug>`.
6. **Versão:** subir o minor no `package.json`, registrar no `CHANGELOG.md`, commit, tag e push (ver [operacao.md](operacao.md)).
