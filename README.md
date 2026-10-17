# Canetinha Mágica

**Caixa de ferramentas da Consultoria Proselling para desenvolvimento de empresários.**

Série de mini web apps gamificados ("episódios"), pensados para o celular e divulgados por link no WhatsApp. Um hub no estilo streaming reúne os episódios em prateleiras.

- **Produção:** https://canetinha.metamode.com.br
- **Versão atual:** 1.9.0 (veja o [CHANGELOG](CHANGELOG.md)), disponível em `/version` e no rodapé das páginas
- **Repositório:** github.com/nnakashima/canetinha → deploy automático no Railway a cada push em `main`

| Endereço | O que abre |
|---|---|
| `/` | Hub (vitrine com prateleiras Gestão e Lançamentos) |
| `/matrizfdem` | Episódio 01 · Matriz FDEM (Administração do Tempo) |
| `/selfpararh`, `/r5`, `/vendadecombo`, `/delivery`, `/lideranca`, `/financasbasico`, `/marketingdigital`, `/teatrodevendas` | Hub com a ficha do episódio "Em breve!" aberta |
| `/version` | Versão em JSON |
| `/healthz` | Health check |

## Rodar local
```bash
npm start            # http://localhost:3000  (Node 18+, sem dependências)
PORT=4000 npm start  # outra porta
```

## Estrutura
```
server.js                    servidor HTTP sem dependências (rotas, redirecionamentos, injeção de variáveis)
package.json                 versão do sistema (fonte única)
public/index.html            hub (vitrine): catálogo EPISODES, capas ilustradas em SVG, abertura animada
public/matrizfdem/index.html episódio 01 (jogo, relatórios, PDF, voz, som)
public/assets/               favicon, ícone iOS e imagens de prévia de link (og-*.jpg, 1200×630)
public/robots.txt
docs/                        documentação detalhada
```

## Documentação
- [Arquitetura e rotas](docs/arquitetura.md): servidor, catálogo, variáveis injetadas, armazenamento local
- [Design e identidade](docs/design.md): cores, tipografia, abertura, capas, gamificação, som
- [Episódio Matriz FDEM](docs/episodio-matriz-fdem.md): fases, regras, relatórios, voz
- [Analytics (GA4)](docs/analytics.md): parâmetros, eventos, dimensões, relatórios
- [Operação](docs/operacao.md): deploy, domínio/DNS, versão, rollback, links antigos
- [Como criar um novo episódio](docs/novo-episodio.md)

## Créditos
Proselling · Ferramentas de uso interno em programas de aceleração comercial e desenvolvimento de lideranças.
