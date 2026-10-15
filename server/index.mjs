import http from "node:http";

const port = Number(process.env.API_PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  if (req.url !== "/api/chat" || req.method !== "POST") { res.writeHead(404).end(JSON.stringify({ error: "Not found" })); return; }
  if (req.headers.origin && req.headers.origin !== allowedOrigin) { res.writeHead(403).end(JSON.stringify({ error: "Origin not allowed" })); return; }
  if (!apiKey) { res.writeHead(503).end(JSON.stringify({ error: "Server AI key is not configured" })); return; }
  let body = "";
  try {
    for await (const chunk of req) { body += chunk; if (body.length > 64000) throw new Error("Payload too large"); }
    const { messages } = JSON.parse(body);
    if (!Array.isArray(messages) || !messages.length || messages.length > 21 || !messages.every(m => ["user", "assistant"].includes(m.role) && typeof m.content === "string" && m.content.length <= 8000)) throw new Error("Invalid messages");
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages, max_tokens: 1200 }), signal: AbortSignal.timeout(45000),
    });
    const data = await upstream.json();
    if (!upstream.ok) { res.writeHead(502).end(JSON.stringify({ error: "AI provider request failed" })); return; }
    res.end(JSON.stringify({ reply: data.choices?.[0]?.message?.content || "" }));
  } catch (err) { res.writeHead(err.message === "Payload too large" ? 413 : 400).end(JSON.stringify({ error: err.message === "Invalid messages" ? err.message : "Request could not be processed" })); }
}).listen(port, "127.0.0.1", () => console.log(`Ashkan AI API listening on http://127.0.0.1:${port}`));
