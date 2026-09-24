/**
 * Servidor de desenvolvimento para as serverless functions (/api) na máquina local.
 * Na Vercel, os arquivos em api/*..ts são publicados automaticamente como funções —
 * este servidor apenas replica esse comportamento no `npm run dev` (via proxy do Vite).
 * Uso: npm run dev:api  (porta 8787; o vite.config.js faz proxy de /api para cá)
 */
import http from 'node:http';

const demoHandler = (req, res) => {
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    const url = req.url ?? '';
    res.setHeader('Content-Type', 'application/json');
    if (url.startsWith('/api/auth/google')) {
      // Modo demo: não redireciona para Google; só informa que está simulado.
      return res.end(JSON.stringify({ demo: true, authorizeUrl: null }));
    }
    if (url.startsWith('/api/calendar/freebusy')) {
      return res.end(JSON.stringify({ busy: [], demo: true }));
    }
    if (url.startsWith('/api/bookings/create')) {
      const payload = JSON.parse(body || '{}');
      return res.end(JSON.stringify({
        booking: { id: crypto.randomUUID(), status: 'confirmed', createdAt: new Date().toISOString(), ...payload },
        integration: { demo: true, googleEventCreated: false, emailSent: false, emailDemo: true },
      }));
    }
    res.statusCode = 404;
    return res.end(JSON.stringify({ error: 'Rota não encontrada (demo).' }));
  });
};

http.createServer(demoHandler).listen(8787, () => {
  console.log('[dev:api] Mock das serverless functions rodando em http://localhost:8787/api');
});
