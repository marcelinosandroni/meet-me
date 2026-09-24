/** Helpers compartilhados das serverless functions (Vercel, runtime Edge/Node). */

export interface GoogleTokens {
  access_token: string;
  refresh_token?: string;
  expires_at: number; // epoch ms
}

export const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
export const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/userinfo.email',
].join(' ');

export function isRealMode(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export async function exchangeCode(code: string, redirectUri: string): Promise<GoogleTokens> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status}`);
  const data = await res.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<string> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) throw new Error(`Google refresh failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

export async function createGoogleEvent(
  accessToken: string,
  event: { summary: string; description: string; start: string; end: string; email: string; name: string },
): Promise<{ ok: boolean; hangoutLink?: string }> {
  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        summary: event.summary,
        description: event.description,
        start: { dateTime: event.start },
        end: { dateTime: event.end },
        attendees: [{ email: event.email, displayName: event.name }],
        conferenceData: {
          version: 1,
          createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: 'hangoutsMeet' } },
        },
      }),
    },
  );
  if (!res.ok) return { ok: false };
  const data = await res.json();
  return { ok: true, hangoutLink: data.hangoutLink };
}
