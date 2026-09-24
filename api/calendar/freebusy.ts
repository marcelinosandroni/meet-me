import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isRealMode } from '../_lib/google';

/** TASK-4.2: consulta FreeBusy no Google Calendar do host. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { timeMin, timeMax } = req.query as { timeMin?: string; timeMax?: string };
  if (!timeMin || !timeMax) return res.status(400).json({ error: 'timeMin e timeMax são obrigatórios.' });

  if (!isRealMode() || !process.env.GOOGLE_ACCESS_TOKEN) {
    // Modo demo: sem bloqueios externos.
    return res.status(200).json({ demo: true, busy: [] });
  }
  const apiRes = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      items: [{ id: 'primary' }],
    }),
  });
  if (!apiRes.ok) return res.status(502).json({ error: 'Falha ao consultar Google Calendar.' });
  const data = await apiRes.json();
  const busy = data.calendars?.primary?.busy ?? [];
  return res.status(200).json({ busy });
}
