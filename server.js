// Canetinha Mágica — servidor estático sem dependências (Railway)
//
// Rotas:
//   /                  hub (vitrine)
//   /<slug>            episódio publicado em public/<slug>/index.html
//   /<slug> "em breve" hub com a ficha do episódio aberta (slug lido do catálogo do hub)
//   Maiúsculas, barra final e endereços antigos são redirecionados para o endereço oficial.
const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");
const HUB = path.join(ROOT, "index.html");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".txt": "text/plain; charset=utf-8"
};

// Endereços antigos que já foram compartilhados
const LEGACY = { "/matriz-fdem": "/matrizfdem" };

// Catálogo de episódios lido do hub: title:"…", slug:"…"
function catalog() {
  const src = fs.readFileSync(HUB, "utf8");
  const map = {};
  for (const m of src.matchAll(/title:"([^"]+)",\s*slug:"([a-z0-9]+)"/g)) map[m[2]] = m[1];
  return map;
}
const EPISODES = catalog();

function origin(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, "");
  const proto = (req.headers["x-forwarded-proto"] || "https").split(",")[0].trim();
  return `${proto}://${req.headers["x-forwarded-host"] || req.headers.host}`;
}

function staticFile(p) {
  if (p.includes("\0")) return null;
  let file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) return null;
  try {
    if (fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  } catch { return null; }
  return fs.existsSync(file) ? file : null;
}

function send(req, res, file, opts = {}) {
  const ext = path.extname(file);
  const headers = {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400"
  };
  let body = fs.readFileSync(file);
  if (ext === ".html") {
    let html = body.toString("utf8");
    if (opts.route) {
      // hub aberto pelo link de um episódio em breve: título e prévia do episódio
      const t = EPISODES[opts.route];
      html = html
        .replace(/<title>[^<]*<\/title>/, `<title>${t} · Canetinha Mágica</title>`)
        .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${t} · Canetinha Mágica (em breve)"`)
        .replace('<meta property="og:url" content="__ORIGIN__/"', `<meta property="og:url" content="__ORIGIN__/${opts.route}"`);
    }
    html = html
      .replace(/__ORIGIN__/g, origin(req))
      .replace(/__CGROUP__/g, opts.group || "hub")
      .replace(/__EPISODE__/g, opts.episode || "");
    body = Buffer.from(html);
  }
  if (/\bgzip\b/.test(req.headers["accept-encoding"] || "") && /html|javascript|css|json|svg/.test(headers["Content-Type"])) {
    body = zlib.gzipSync(body); headers["Content-Encoding"] = "gzip"; headers["Vary"] = "Accept-Encoding";
  }
  headers["Content-Length"] = body.length;
  res.writeHead(200, headers);
  res.end(req.method === "HEAD" ? undefined : body);
}

function redirect(res, to, code = 301) { res.writeHead(code, { Location: to }); res.end(); }

http.createServer((req, res) => {
  if (req.url === "/healthz") { res.writeHead(200, { "Content-Type": "text/plain" }); return res.end("ok"); }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }

  const [rawPath, query] = req.url.split("?");
  const qs = query ? "?" + query : "";
  let p;
  try { p = decodeURIComponent(rawPath); } catch { return redirect(res, "/", 302); }

  // normaliza: sem barra final e em minúsculas (/R5 -> /r5) — só para páginas, não para arquivos
  if (!path.extname(p)) {
    let clean = p.length > 1 ? p.replace(/\/+$/, "") : p;
    clean = clean.toLowerCase();
    if (LEGACY[clean]) return redirect(res, LEGACY[clean] + qs);
    if (clean !== p) return redirect(res, clean + qs);
  }

  if (p === "/") return send(req, res, HUB, { group: "hub" });

  const slug = p.slice(1);
  if (/^[a-z0-9]+$/.test(slug)) {
    const ep = staticFile("/" + slug + "/index.html");
    if (ep) return send(req, res, ep, { group: "episodio", episode: slug });
    if (EPISODES[slug]) return send(req, res, HUB, { group: "episodio_em_breve", episode: slug, route: slug });
    return redirect(res, "/", 302);
  }

  const file = staticFile(p);
  if (!file || path.basename(file) === "index.html") return redirect(res, "/", 302);
  send(req, res, file);
}).listen(PORT, () => console.log(`Canetinha Mágica no ar na porta ${PORT} — episódios: ${Object.keys(EPISODES).join(", ")}`));
