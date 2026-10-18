// RH Seleção — motor de aderência (roda só no servidor; não é servido ao navegador)
//
// Entrada: contexto do negócio, vaga e códigos S4D1 anônimos (sem nome, telefone ou currículo).
// Saída: perfil-alvo da vaga em linguagem simples e, para cada código, faixa de aderência,
// forças, pontos a explorar e perguntas de entrevista. Nenhuma nota numérica sai daqui.
"use strict";

/* ---------- código S4D1 ---------- */
const CODE_RE = /^S4D1-([A-Za-z?]{1,2})-(\d{8})-(\d{2})-(\d{2})-([A-Z]{6})-([A-Z]{3})-([0-9A-Z])$/;
const MOTS = ["THE", "UTI", "AES", "SOC", "IND", "TRA"];
const LETTERS = ["D", "I", "S", "C"];

function checksum(body) {
  const sum = [...body].reduce((a, c) => a + c.charCodeAt(0), 0);
  return (sum % 36).toString(36).toUpperCase();
}

function decode(raw) {
  const m = String(raw || "").trim().match(CODE_RE);
  if (!m) return { ok: false, erro: "Código fora do formato S4D1." };
  const body = m[0].slice(0, -2);
  if (checksum(body) !== m[7]) return { ok: false, erro: "Código com dígito verificador inválido (confira a digitação)." };
  const d = m[2];
  const pct = { D: +d.slice(0, 2), I: +d.slice(2, 4), S: +d.slice(4, 6), C: +d.slice(6, 8) };
  const style = m[1];
  const p1 = style[0] && LETTERS.includes(style[0].toUpperCase()) ? style[0].toUpperCase() : null;
  const p2 = style[1] && LETTERS.includes(style[1].toUpperCase()) ? style[1].toUpperCase() : null;
  const lc = +m[3], ie = +m[4];
  const mot1 = MOTS.includes(m[5].slice(0, 3)) ? m[5].slice(0, 3) : null;
  const mot2 = MOTS.includes(m[5].slice(3)) ? m[5].slice(3) : null;
  const pos = { ART: "artista", GER: "gerente" }[m[6]] || null;
  return {
    ok: true, codigo: m[0], estilo: style, p1, p2, pct, lc, ie, mot1, mot2, pos,
    lcCat: lc > 66 ? "Interno" : lc < 33 ? "Externo" : "Misto",
    ieCat: ie > 66 ? "Alta" : ie < 33 ? "Baixa" : "Moderada"
  };
}

/* ---------- prioridades da vaga ---------- */
const PRIO = {
  ritmo:     { label: "Ritmo no pico",          desc: "Manter velocidade e qualidade quando a loja enche" },
  calma:     { label: "Calma com clientes",     desc: "Atender bem e manter o equilíbrio sob pressão" },
  dono:      { label: "Dono do resultado",      desc: "Assumir metas e erros e buscar o que pode melhorar" },
  vendas:    { label: "Energia para vender",    desc: "Puxar conversa, sugerir e encantar o cliente" },
  padrao:    { label: "Capricho e padrão",      desc: "Seguir o padrão e conferir cada detalhe" },
  time:      { label: "Parceria e permanência", desc: "Somar com o time, com constância, e ficar" },
  lideranca: { label: "Liderar pessoas",        desc: "Organizar, desenvolver e cobrar o time" }
};
const BASE = {
  operacao: { ritmo: 2, calma: 2, dono: 1, vendas: 1, padrao: 2, time: 2, lideranca: 0 },
  lideranca: { ritmo: 1, calma: 2, dono: 3, vendas: 1, padrao: 1, time: 1, lideranca: 3 }
};
const has = (arr, v) => Array.isArray(arr) && arr.includes(v);

function target(ctx = {}, vaga = {}) {
  const tipo = vaga.pos === "gerente" || (vaga.pos === "outra" && vaga.outraTipo === "lideranca") ? "lideranca" : "operacao";
  const w = Object.assign({}, BASE[tipo]);
  const why = {}; Object.keys(PRIO).forEach(k => (why[k] = []));
  const add = (k, n, r) => { w[k] += n; if (r && !why[k].includes(r)) why[k].push(r); };

  if (ctx.cli === "300a600") { add("ritmo", 1, "300 a 600 clientes por dia"); add("calma", 1, "300 a 600 clientes por dia"); }
  if (ctx.cli === "600mais") { add("ritmo", 2, "mais de 600 clientes por dia"); add("calma", 1, "mais de 600 clientes por dia"); }
  if (ctx.pico === "forte") { add("ritmo", 1, "horário de pico forte"); add("calma", 1, "horário de pico forte"); }
  if (ctx.idade === "novo") { add("dono", 1, "loja com menos de 1 ano"); add("vendas", 1, "loja com menos de 1 ano"); }
  if (has(ctx.dor, "fila")) add("ritmo", 2, "dor principal: fila e demora");
  if (has(ctx.dor, "erros")) { add("padrao", 2, "dor principal: erros"); add("dono", 1, "dor principal: erros"); }
  if (has(ctx.dor, "clima")) { add("calma", 1, "dor principal: clima da equipe"); add("time", 2, "dor principal: clima da equipe"); }
  if (has(ctx.dor, "vendas")) { add("vendas", 2, "dor principal: vendas"); add("dono", 1, "dor principal: vendas"); }
  if (has(ctx.dor, "rotatividade")) add("time", 2, "dor principal: rotatividade");
  if (has(ctx.dor, "atendimento")) { add("calma", 2, "dor principal: atendimento"); add("vendas", 1, "dor principal: atendimento"); }
  if (has(ctx.fmt, "salao") || ctx.mesas === "21a50" || ctx.mesas === "50mais") { add("vendas", 1, "atendimento no salão"); add("calma", 1, "atendimento no salão"); }
  if (has(ctx.fmt, "delivery") || ctx.deliv === "30a50" || ctx.deliv === "50mais") add("padrao", 1, "delivery relevante (conferência dos pedidos)");
  if (has(ctx.fmt, "drive")) add("ritmo", 1, "operação de drive");
  if (has(ctx.fmt, "quiosque")) add("dono", 1, "quiosque, muitas vezes com uma pessoa só");
  if (ctx.equipe === "ate5") add("dono", 1, "equipe pequena, todos fazem de tudo");
  if (ctx.equipe === "30mais" && tipo === "lideranca") add("lideranca", 1, "equipe com mais de 30 pessoas");
  if (has(ctx.saida, "adaptacao")) add("time", 1, "saídas por falta de adaptação");
  if (has(ctx.saida, "lideranca")) add("time", 1, "saídas por relação com a liderança");
  if (has(vaga.turno, "noite") || has(vaga.turno, "madrugada")) add("dono", 1, "turno da noite, com menos supervisão");
  if (ctx.seg === "saude") { add("calma", 1, "setor de saúde"); add("padrao", 1, "setor de saúde"); }
  if (ctx.seg === "servicos") add("calma", 1, "setor de serviços");
  if (ctx.seg === "varejo") add("vendas", 1, "varejo");

  const base = tipo === "lideranca" ? "vaga de liderança" : "vaga de operação";
  Object.keys(PRIO).forEach(k => { if (BASE[tipo][k] >= 2) why[k].unshift(base); });
  const order = Object.keys(w).filter(k => w[k] > 0).sort((a, b) => w[b] - w[a] || Object.keys(PRIO).indexOf(a) - Object.keys(PRIO).indexOf(b));
  const top = order.slice(0, 4);
  return { tipo, weights: w, top, alvo: top.map(k => ({ key: k, label: PRIO[k].label, desc: PRIO[k].desc, razoes: why[k].slice(0, 3) })) };
}

/* ---------- aderência de cada perfil ---------- */
const clamp = v => Math.max(0, Math.min(100, v));
function scores(p) {
  const one = k => clamp(p.pct[k] * 2);
  const two = (a, b) => clamp((p.pct[a] + p.pct[b]) * 1.4);
  const mot = set => (set.includes(p.mot1) ? 100 : set.includes(p.mot2) ? 60 : 20);
  return {
    ritmo: 0.6 * two("S", "C") + 0.4 * p.ie,
    calma: p.ie,
    dono: p.lc,
    vendas: 0.6 * two("D", "I") + 0.2 * p.lc + 0.2 * mot(["UTI", "IND", "SOC"]),
    padrao: 0.6 * one("C") + 0.4 * mot(["AES", "TRA"]),
    time: 0.5 * one("S") + 0.3 * p.ie + 0.2 * mot(["SOC", "TRA"]),
    lideranca: 0.35 * p.lc + 0.35 * p.ie + 0.15 * two("D", "I") + 0.15 * mot(["IND", "SOC"])
  };
}

const FORTE = {
  ritmo: "Tende a manter o ritmo e a organização quando a loja enche.",
  calma: "Tende a manter a calma e entender o lado do cliente sob pressão.",
  dono: "Tende a assumir resultados e erros e buscar o que pode fazer melhor.",
  vendas: "Tende a puxar conversa, sugerir e trazer energia ao atendimento.",
  padrao: "Tende a seguir o padrão e conferir os detalhes.",
  time: "Tende a somar com o time, com paciência e constância.",
  lideranca: "Reúne ingredientes de liderança: assume, mantém o equilíbrio e mobiliza."
};
const EXPLORAR = {
  ritmo: "Como lida com picos de movimento e tarefas repetitivas.",
  calma: "Como reage a cliente irritado e a momentos de pressão.",
  dono: "Como fala de metas não batidas e de erros passados.",
  vendas: "Disposição para abordar clientes e sugerir produtos.",
  padrao: "Atenção a procedimentos, higiene e conferência.",
  time: "Como colabora e o que a faria ficar na empresa.",
  lideranca: "Experiência real em organizar, treinar e cobrar pessoas."
};
const PERGUNTAS = {
  ritmo: ["Conte de um dia muito corrido, no trabalho ou fora dele. O que você fez para dar conta?", "Como você organiza as tarefas quando tudo chega ao mesmo tempo?"],
  calma: ["Conte de uma vez em que alguém foi grosseiro com você. Como reagiu e o que aconteceu depois?", "O que você faz quando percebe que está ficando nervoso?"],
  dono: ["Conte de um erro que você cometeu. O que fez depois?", "Fale de uma meta que você não alcançou. O que faria diferente hoje?"],
  vendas: ["Como você puxaria conversa com um cliente com pressa para oferecer algo a mais?", "Conte de uma vez em que convenceu alguém de uma ideia."],
  padrao: ["Como você garante que não esqueceu nada numa tarefa que repete todo dia?", "Conte de uma regra que achou chata mas seguiu. Por quê?"],
  time: ["Conte de uma vez em que ajudou um colega sem ninguém pedir.", "O que faria você ficar muitos anos num mesmo trabalho?"],
  lideranca: ["Conte de uma vez em que precisou cobrar alguém. Como fez?", "Como você treinaria um novato no primeiro dia?"]
};
const PERG_MOT = {
  THE: "O que você gostaria de aprender nos primeiros meses aqui?",
  UTI: "Como você gosta de ser reconhecido quando entrega um bom resultado?",
  AES: "Como é, para você, um ambiente de trabalho agradável?",
  SOC: "Conte de uma vez em que fez a diferença para um cliente ou colega.",
  IND: "Onde você quer estar daqui a dois anos? O que espera da empresa para chegar lá?",
  TRA: "Que atitude de uma empresa faz você confiar nela?"
};
const ESTILO = {
  D: "Estilo decidido: tende a agir rápido e resolver o que aparece.",
  I: "Estilo comunicativo: tende a aproximar as pessoas e animar o ambiente.",
  S: "Estilo parceiro: tende a ser constante, paciente e confiável.",
  C: "Estilo caprichoso: tende a cuidar da qualidade e do passo a passo."
};
const ESTILO_CURTO = { D: "estilo decidido", I: "estilo comunicativo", S: "estilo parceiro", C: "estilo caprichoso" };
const OPOSTO = { D: "S", S: "D", I: "C", C: "I" };
const TURNO = { manha: "manhã", tarde: "tarde", noite: "noite", madrugada: "madrugada", fds: "fins de semana", integral: "período integral" };

function analyze(p, T, vaga, lider, faltam) {
  const s = scores(p);
  const tw = T.top.reduce((a, k) => a + T.weights[k], 0) || 1;
  const fit = T.top.reduce((a, k) => a + s[k] * T.weights[k], 0) / tw;
  const faixa = fit >= 68 ? "Alta" : fit >= 50 ? "Boa" : "Atenção";
  const nivel = {}; T.top.forEach(k => (nivel[k] = s[k] >= 67 ? 2 : s[k] >= 45 ? 1 : 0));
  const byScore = T.top.slice().sort((a, b) => s[b] - s[a]);
  const fortes = byScore.filter(k => s[k] >= 55).slice(0, 3);
  const forcas = fortes.map(k => ({ key: k, texto: FORTE[k] }));
  if (forcas.length < 2 && p.p1) forcas.push({ key: "estilo", texto: ESTILO[p.p1] });
  const fracos = byScore.slice().reverse().filter(k => !fortes.includes(k)).slice(0, 2);
  const explorar = fracos.map(k => ({ key: k, texto: EXPLORAR[k] }));
  const perguntas = [];
  fracos.forEach(k => perguntas.push(PERGUNTAS[k][0]));
  if (perguntas.length < 2 && byScore[0]) perguntas.push(PERGUNTAS[byScore[0]][1]);
  if (p.mot1) perguntas.push(PERG_MOT[p.mot1]);
  const especiais = (vaga.turno || []).filter(t => ["noite", "madrugada", "fds"].includes(t));
  if (especiais.length) perguntas.push(`A vaga inclui ${especiais.map(t => TURNO[t]).join(" e ")}. Como isso se encaixa na sua rotina?`);
  else if (perguntas.length < 4 && fracos[0]) perguntas.push(PERGUNTAS[fracos[0]][1]);
  const notas = [];
  const vagaPos = vaga.pos === "gerente" ? "gerente" : vaga.pos === "artista" ? "artista" : null;
  if (vagaPos && p.pos && p.pos !== vagaPos) notas.push(p.pos === "gerente" ? "Respondeu o SELF para a vaga de Gerente." : "Respondeu o SELF para a vaga de Artista de Sanduíche.");
  if (lider && lider.p1 && p.p1) {
    if (lider.p1 === p.p1) notas.push("Mesmo estilo do líder: afinidade rápida. Combinem como evitar pontos cegos em comum.");
    else if (OPOSTO[lider.p1] === p.p1) notas.push("Estilo oposto ao do líder: complemento forte. Vale combinar ritmo e forma de feedback desde o primeiro dia.");
    else notas.push("Estilo vizinho ao do líder: compartilham um eixo, boa base de convivência.");
  }
  if (faltam.length && p.p1 && faltam.includes(p.p1)) notas.push(`Traz o estilo ${p.p1}, que hoje falta no time.`);
  const destaque = fortes.length ? "Destaque: " + fortes.slice(0, 2).map(k => PRIO[k].label.toLowerCase()).join(" · ") + "." : (p.p1 ? `Destaque: ${ESTILO_CURTO[p.p1]}.` : "");
  return { faixa, nivel, forcas, explorar, perguntas: perguntas.slice(0, 4), notas, destaque };
}

const NOME_LETRA = { D: "D (decisão e ritmo)", I: "I (comunicação)", S: "S (constância e parceria)", C: "C (capricho e padrão)" };
function team(codes) {
  const perfis = codes.map(decode).filter(x => x.ok);
  if (!perfis.length) return null;
  const cob = { D: 0, I: 0, S: 0, C: 0 };
  perfis.forEach(p => { if (p.p1) cob[p.p1]++; });
  const faltam = LETTERS.filter(k => !cob[k]);
  const ieBaixa = perfis.filter(p => p.ieCat === "Baixa").length;
  const texto = [
    `${perfis.length} pessoa${perfis.length > 1 ? "s" : ""} do time atual.`,
    faltam.length ? `Ninguém com estilo principal ${faltam.map(k => NOME_LETRA[k]).join(", ")}.` : "Os quatro estilos estão representados.",
    ieBaixa ? `${ieBaixa} com emoções na faixa Baixa: vale fortalecer a calma no atendimento.` : ""
  ].filter(Boolean).join(" ");
  return { pessoas: perfis.length, cobertura: cob, faltam, texto };
}

function run(input = {}) {
  const ctx = input.ctx || {}, vaga = input.vaga || {};
  const T = target(ctx, vaga);
  const lider = vaga.lider ? decode(vaga.lider) : null;
  const tm = Array.isArray(input.time) && input.time.length ? team(input.time.slice(0, 60)) : null;
  const faltam = tm ? tm.faltam : [];
  const candidatos = [], erros = [];
  (Array.isArray(input.candidatos) ? input.candidatos.slice(0, 40) : []).forEach(c => {
    const p = decode(c && c.codigo);
    if (!p.ok) { erros.push({ id: c && c.id, erro: p.erro }); return; }
    const perfil = { estilo: p.estilo, p1: p.p1, p2: p.p2, pct: p.pct, lcCat: p.lcCat, ieCat: p.ieCat, mot1: p.mot1, mot2: p.mot2, pos: p.pos };
    candidatos.push(Object.assign({ id: c.id, perfil }, analyze(p, T, vaga, lider && lider.ok ? lider : null, faltam)));
  });
  return {
    versao: 1, alvo: T.alvo, candidatos, erros,
    lider: lider ? (lider.ok ? { estilo: lider.estilo, p1: lider.p1 } : { erro: lider.erro }) : null,
    time: tm
  };
}

module.exports = { run, decode, checksum, target };
