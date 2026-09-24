import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GOOGLE_OAUTH_URL, GOOGLE_SCOPES, isRealMode } from '../_lib/google';

/** TASK-4.1: inicia o fluxo OAuth2 do Google (login do host). */
export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!isRealMode()) {
    return res.status(501).json({
      demo: true,
      message: 'Modo demo: defina GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET para ativar o login real.',
    });
  }
  const state = crypto.randomUUID();
  const url = new URL(GOOGLE_OAUTH_URL);
  url.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!);
  url.searchParams.set('redirect_uri', process.env.GOOGLE_REDIRECT_URI!);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', GOOGLE_SCOPES);
  url.searchParams.set('access_type', 'offline');
  url.searchParams.set('prompt', 'consent');
  url.searchParams.set('state', state);
  res.setHeader(
    'Set-Cookie',
    `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
  );
  return res.redirect(url.toString());
}
