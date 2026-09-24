import type { Booking } from '../../src/core/types';

/** Envia email de confirmação via Resend. Sem RESEND_API_KEY, roda em modo demo (log). */
export async function sendConfirmationEmail(booking: Booking): Promise<{ sent: boolean; demo: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? 'MeetMe <onboarding@resend.dev>';
  if (!apiKey) {
    console.log('[demo-email] Confirmação para', booking.guestEmail, ':', booking.subject);
    return { sent: false, demo: true };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [booking.guestEmail],
      subject: `Reunião confirmada: ${booking.subject}`,
      html: `<h2>Reunião confirmada ✅</h2>
        <p><strong>${booking.subject}</strong><br>
        Quando: ${new Date(booking.start).toLocaleString('pt-BR')}<br>
        Onde: ${booking.location ?? 'Online'}</p>`,
    }),
  });
  return { sent: res.ok, demo: false };
}
