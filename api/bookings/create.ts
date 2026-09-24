import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createGoogleEvent, isRealMode } from '../_lib/google';
import { sendConfirmationEmail } from '../_lib/email';

interface BookingPayload {
  meetingTypeId: string;
  guestName: string;
  guestEmail: string;
  subject: string;
  notes?: string;
  start: string;
  end: string;
}

/** TASK-4.3 + 4.4: cria booking com evento Google e email de confirmação (ou demo). */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido.' });
  const body = req.body as BookingPayload;
  if (!body?.guestEmail || !body?.start || !body?.end) {
    return res.status(400).json({ error: 'Payload inválido.' });
  }

  const booking = {
    id: crypto.randomUUID(),
    status: 'confirmed' as const,
    createdAt: new Date().toISOString(),
    ...body,
  };

  let eventCreated = false;
  let meetLink: string | undefined;
  if (isRealMode() && process.env.GOOGLE_ACCESS_TOKEN) {
    const evt = await createGoogleEvent(process.env.GOOGLE_ACCESS_TOKEN, {
      summary: `${body.subject} — ${body.guestName}`,
      description: body.notes ?? '',
      start: body.start,
      end: body.end,
      email: body.guestEmail,
      name: body.guestName,
    });
    eventCreated = evt.ok;
    meetLink = evt.hangoutLink;
  }

  const email = await sendConfirmationEmail({ ...booking } as never);

  return res.status(201).json({
    booking,
    integration: {
      demo: !isRealMode(),
      googleEventCreated: eventCreated,
      meetLink,
      emailSent: email.sent,
      emailDemo: email.demo,
    },
  });
}
