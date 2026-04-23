#!/usr/bin/env node
// Local proxy: adds ngrok-skip-browser-warning to every request
// Run: node proxy.js
// Then point ngrok at port 3001 instead of 3000

const http = require("http");

const TARGET_PORT = 3000;
const PROXY_PORT = 3001;

http
  .createServer((req, res) => {
    req.headers["ngrok-skip-browser-warning"] = "true";
    req.headers["host"] = `localhost:${TARGET_PORT}`;

    const options = {
      hostname: "localhost",
      port: TARGET_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on("error", (e) => {
      console.error("Proxy error:", e.message);
      res.writeHead(502);
      res.end("Bad Gateway");
    });

    req.pipe(proxyReq, { end: true });
  })
  .listen(PROXY_PORT, () => {
    console.log(`Proxy listening on :${PROXY_PORT} → Next.js :${TARGET_PORT}`);
    console.log(`Now run: ngrok http ${PROXY_PORT}`);
  });
