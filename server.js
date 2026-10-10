// Canetinha Mágica — servidor estático sem dependências (Railway)
const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".webmanifest": "application/manifest+json", ".txt": "text/plain; charset=utf-8"
};

function origin(req) {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL.replace(/\/$/, "");
  const proto = (req.headers["x-forwarded-proto"] || "https").split(",")[0].trim();
  return `${proto}://${req.headers["x-forwarded-host"] || req.headers.host}`;
}

function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  if (p.includes("\0")) return null;
  let file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) return null;
  try {
    const st = fs.statSync(file);
    if (st.isDirectory()) file = path.join(file, "index.html");
  } catch { if (!path.extname(file)) file = file + "/index.html"; }
  return fs.existsSync(file) ? file : null;
}

http.createServer((req, res) => {
  if (req.url === "/healthz") { res.writeHead(200, { "Content-Type": "text/plain" }); return res.end("ok"); }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405); return res.end(); }

  // URL sem barra final para episódios: /matriz-fdem/ -> /matriz-fdem
  const clean = req.url.split("?")[0];
  if (clean.length > 1 && clean.endsWith("/")) {
    res.writeHead(301, { Location: clean.slice(0, -1) + (req.url.includes("?") ? "?" + req.url.split("?")[1] : "") });
    return res.end();
  }

  const file = resolve(req.url);
  if (!file) { res.writeHead(302, { Location: "/" }); return res.end(); }

  const ext = path.extname(file);
  const headers = {
    "Content-Type": TYPES[ext] || "application/octet-stream",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=86400"
  };
  let body = fs.readFileSync(file);
  if (ext === ".html") body = Buffer.from(body.toString("utf8").replace(/__ORIGIN__/g, origin(req)));
  if (/\bgzip\b/.test(req.headers["accept-encoding"] || "") && /html|javascript|css|json|svg/.test(headers["Content-Type"])) {
    body = zlib.gzipSync(body); headers["Content-Encoding"] = "gzip"; headers["Vary"] = "Accept-Encoding";
  }
  headers["Content-Length"] = body.length;
  res.writeHead(200, headers);
  res.end(req.method === "HEAD" ? undefined : body);
}).listen(PORT, () => console.log(`Canetinha Mágica no ar na porta ${PORT}`));
