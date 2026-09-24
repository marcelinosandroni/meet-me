import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exchangeCode, isRealMode } from '../_lib/google';

/** TASK-4.1: callback do OAuth — valida state, troca code por tokens. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isRealMode()) {
    return res.status(501).json({ demo: true, message: 'Modo demo: credenciais Google ausentes.' });
  }
  const { code, state } = req.query as { code?: string; state?: string };
  const cookieState = /oauth_state=([^;]+)/.exec(req.headers.cookie ?? '')?.[1];
  if (!code || !state || state !== cookieState) {
    return res.status(400).json({ error: 'Estado OAuth inválido.' });
  }
  try {
    const tokens = await exchangeCode(code, process.env.GOOGLE_REDIRECT_URI!);
    // Em MVP os tokens ficam apenas na resposta de debug/admin local.
    // Em produção: persistir refresh_token criptografado (ex: Upstash Redis / Vercel KV).
    return res
      .status(200)
      .json({ ok: true, expires_at: tokens.expires_at, hasRefreshToken: Boolean(tokens.refresh_token) });
  } catch (e) {
    return res.status(502).json({ error: String(e) });
  }
}
