# Design e identidade

## Princípios
Visual de jogo jovem e moderno, pensado primeiro para o celular. Tema escuro único, por escolha. Botões "3D" que afundam no toque, cartões arredondados, fundo com grade de pontos e confete nas cores da série.

## Cores
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#15122E` | fundo (azul da série) |
| `--surface` / `--surface2` | `#221D4A` / `#2D2762` | cartões, campos secundários |
| `--line` | `#3E3680` | bordas |
| `--fg` / `--muted` / `--dim` | `#F4F1FF` / `#ABA4D6` / `#7D75B2` | texto |
| `--ink` | `#1A1433` | texto sobre cores claras |
| `--f` | `#FFC93C` | amarelo (Foco, botões principais) |
| `--d` | `#3DD6F5` | ciano (Delegar) |
| `--e` | `#FF5C7A` | coral (Eliminar) |
| `--m` | `#8BE36A` | verde (Melhorar) |
| `--v`, `--o` | `#9B7BFF`, `#FF9A3C` | extras das capas do hub |
Cada cor de destaque tem uma sombra escura `-d` para o efeito 3D. WhatsApp: `#25D366`.

## Tipografia
- **Bungee:** títulos, números, letras F/D/E/M, selos.
- **Nunito** (500–900): textos e botões.
- Fallbacks: Arial Black e ui-rounded/system-ui.

## Abertura
Mesma sequência no hub e no episódio, sobre o fundo azul: símbolo Proselling girando → palavra "Proselling" → **APRESENTA** → "Canetinha Mágica" letra a letra → traço de caneta em gradiente F/D/E/M → selo do episódio (episódio) ou "Série original Proselling" (hub) → botão. Toque em qualquer lugar para entrar; sino ao entrar.

## Capas (hub)
Ilustrações vetoriais em SVG geradas por código (`SCENES` em `public/index.html`), formato 2:3 (viewBox 200×300). Pessoas desenhadas pela função `P()` (pose, cores, cabelo, boné, avental, capacete). Sem logotipos de marcas de terceiros. Capas "Em breve!" com faixa amarela. Animações SMIL desligadas quando o aparelho pede movimento reduzido.

| Episódio | Capa |
|---|---|
| Matriz FDEM | poste de direções num cruzamento; Foco e Melhorar à direita, Delegar e Eliminar à esquerda |
| R5 | pessoas em pé diante de uma TV com calendário e relógio |
| Venda de Combo | bandeja com sanduíche, refrigerante e batata rústica |
| Delivery | entregador comemorando ao lado da moto |
| Contratar Pessoas | nova funcionária chegando à loja ("BEM-VINDA!") |
| Liderança | gerente com prancheta no centro de uma roda de jogadores |
| Finanças Básico | DRE com as siglas DRE, CMV, MC, FC, PB em órbita |
| Marketing Digital | celular com curtidas subindo e ícones de apps genéricos |
| Teatro de Vendas | palco com professora de balé e vendedores aprendendo |

## Gamificação (episódios)
- **XP:** campo-chave 20–40, item de lista 15–20, classificação 30, ação do plano 25 (+10 com quem, +10 prazo), fase concluída +100.
- **Níveis:** a cada 300 XP. Títulos: Novato, Aprendiz, Estrategista, Tático, Mestre do Tempo, Lenda FDEM.
- **Retorno:** "+N XP" flutuante, toasts de fase e nível, confete, 6 conquistas.
- **Som (WebAudio, sem arquivos):** tick de XP, sim/não, um som por categoria, fase, nível, troféu, sino de abertura, aviso; botão ON/OFF salvo no aparelho.

## Acessibilidade
Foco visível, rótulos nos botões de ícone, respeito a `prefers-reduced-motion`, contraste alto no tema escuro, alvos de toque ≥ 36 px.
