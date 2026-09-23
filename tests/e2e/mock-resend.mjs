// Lažni Resend server za lokalni test: bilježi zahtjeve u datoteku i odgovara 200. Ne šalje e-mailove.
// Pokretanje: node tests/e2e/mock-resend.mjs /tmp/mock.log
import http from 'node:http';
import fs from 'node:fs';
const log = process.argv[2];
http.createServer((req, res) => {
  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    fs.appendFileSync(log, JSON.stringify({ method: req.method, url: req.url, auth: req.headers.authorization, body: JSON.parse(body || '{}') }) + '\n');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"id":"mock-1"}');
  });
}).listen(4999, '127.0.0.1', () => console.log('mock on 4999'));
