# Operação

## Infraestrutura
| Item | Valor |
|---|---|
| Código | GitHub `nnakashima/canetinha`, branch `main` |
| Hospedagem | Railway · projeto **Canetinha** · serviço **canetinha** · ambiente production · região us-west (sfo) |
| Build | detecção automática Node, `npm start` (sem dependências) |
| Domínio | `canetinha.metamode.com.br` (HTTPS automático) + `canetinha-production.up.railway.app` |
| DNS | zona de `metamode.com.br` na **Hostinger** (nameservers `ns1/ns2.dns-parking.com`; domínio registrado no registro.br) |

Registros DNS na Hostinger:
| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| CNAME | `canetinha` | `9xoydzjd.up.railway.app` | 3600 |
| TXT | `_railway-verify.canetinha` | `railway-verify=2c7891ea094611b6fd2b465ef36f67db44c15348b119e9ecd82dc4d77f6f99f0` | 3600 |

## Publicar uma alteração
1. Alterar os arquivos e testar local (`npm start`).
2. `git commit` e `git push origin main`.
3. O Railway publica sozinho em ~1 minuto. Conferir em `/version` ou no rodapé.

## Lançar uma versão
1. Atualizar `version` em `package.json` (SemVer: correção → patch, novidade → minor, mudança incompatível → major).
2. Registrar as mudanças em `CHANGELOG.md`.
3. `git commit -m "Versão X.Y.Z"`, `git tag -a vX.Y.Z -m "…"`, `git push origin main --tags`.
4. Conferir `https://canetinha.metamode.com.br/version`.

## Rollback
Railway → serviço canetinha → Deployments → escolher um deploy anterior → Redeploy/Rollback. Ou `git revert` do commit e push.

## Links antigos (Claude)
| Link | Situação |
|---|---|
| `claude.ai/artifact/GbyYJ8SorF3EinE3HevRBp` (Matriz FDEM) | página "Mudamos de endereço!" que leva a `/matrizfdem` com o progresso |
| `claude.ai/artifact/L6ChExD3oGQcjMuu9oXJrw` (hub) | versão antiga do hub, sem GA4 — divulgar apenas o domínio próprio |

## Verificação rápida
- `/healthz` responde `ok`; `/version` mostra a versão.
- `/R5` redireciona para `/r5`; `/matriz-fdem` para `/matrizfdem`.
- GA4 → Tempo real mostra a visita ao abrir o site.
