# Arquitetura e rotas

## Visão geral
Site estático servido por `server.js` (Node 18+, apenas módulos nativos). Cada página é um arquivo HTML autocontido (CSS e JS inline). Bibliotecas externas vêm de CDN (cdnjs) e fontes do Google Fonts. Não há banco de dados: o progresso de cada pessoa fica no `localStorage` do próprio aparelho.

```
navegador ──HTTPS──> Railway (serviço "canetinha") ──> server.js ──> public/
                                             └─ injeta origem, versão e parâmetros do GA4 no HTML
navegador ──> googletagmanager.com / google-analytics.com (GA4)
navegador ──> cdnjs (jsPDF, jspdf-autotable, html2canvas) e Google Fonts (Bungee, Nunito)
```

## Rotas (`server.js`)
| Requisição | Resposta |
|---|---|
| `GET /healthz` | `ok` |
| `GET /version` | `{"name","version","episodes"}` |
| `GET /` | hub (`content_group=hub`) |
| `GET /<slug>` com pasta `public/<slug>/` | episódio publicado (`content_group=episodio`) |
| `GET /<slug>` sem pasta, mas no catálogo do hub | hub com a ficha aberta; título e prévia do episódio (`content_group=episodio_em_breve`) |
| Maiúsculas ou barra final (`/R5`, `/r5/`) | 301 para a forma canônica (`/r5`) |
| Endereços antigos (`LEGACY`) | 301 (ex.: `/matriz-fdem` → `/matrizfdem`) |
| Arquivos em `public/` (imagens, robots) | servidos com cache de 1 dia |
| Qualquer outro caminho ou acesso direto a `index.html` | 302 para `/` |

HTML sai com `Cache-Control: no-cache` (atualizações aparecem na hora); textos com gzip quando o navegador aceita.

## Catálogo de episódios
A fonte única é o objeto `EPISODES` em `public/index.html`. Cada entrada começa com `title:"…", slug:"…"`; o servidor lê esses pares ao iniciar (regex `title:"([^"]+)",\s*slug:"([a-z0-9]+)"`) para saber quais slugs existem. Campos:

| Campo | Uso |
|---|---|
| `title`, `slug` | nome e endereço (`/slug`) |
| `status` | `live` (publicado) ou `soon` (Em breve!) |
| `num`, `isNew`, `url`, `store` | só para `live`: número, selo NOVO, link, chave do `localStorage` do episódio (para mostrar progresso no hub) |
| `subject`, `phases`, `time`, `desc`, `gets` | textos da ficha e do destaque |
| `a`, `b`, `art` | gradiente da capa e ilustração (`scene:<nome>` em `SCENES`) |

`SHELVES` define as prateleiras (título + lista de ids); `FEATURED` define o destaque.

## Variáveis injetadas no HTML pelo servidor
| Marcador | Valor |
|---|---|
| `__ORIGIN__` | `https://<host>` (ou `PUBLIC_URL`) — usado nas tags Open Graph |
| `__CGROUP__` | `hub`, `episodio` ou `episodio_em_breve` |
| `__EPISODE__` | slug do episódio (vazio no hub) |
| `__VERSION__` | `version` do `package.json` |

## Armazenamento no aparelho
| Chave | Onde | Conteúdo |
|---|---|---|
| `matriz-fdem-v1` (localStorage) | episódio Matriz FDEM e hub (leitura) | estado completo do jogo |
| `fdem-sound` (localStorage) | episódio | som ligado/desligado |
| `cm-sound` (localStorage) | hub | som ligado/desligado |
| `cm-splash` (sessionStorage) | hub | abertura já exibida nesta sessão |

O progresso não sai do aparelho: limpar dados do navegador ou trocar de aparelho começa do zero.

## Variáveis de ambiente
| Variável | Padrão | Uso |
|---|---|---|
| `PORT` | 3000 | porta HTTP (o Railway define) |
| `PUBLIC_URL` | — | fixa a origem usada nas prévias de link |
