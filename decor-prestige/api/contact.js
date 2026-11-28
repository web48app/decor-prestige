/* Wysyłka formularza kontaktowego przez skrzynkę na serwerze klienta (SMTP).
   Zmienne w Vercel:
   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (Secret), MAIL_TO */

import nodemailer from 'nodemailer';

const LIMITS = { name: 120, phone: 40, email: 160, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method' });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    return res.status(500).json({ ok: false, error: 'not-configured' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});

  /* pułapka na boty — prawdziwy użytkownik nie widzi tego pola */
  if (body.botcheck) return res.status(200).json({ ok: true });

  const name = clean(body.name, LIMITS.name);
  const phone = clean(body.phone, LIMITS.phone);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'validation' });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const text =
    `Nowa wiadomość z formularza na stronie decor-prestige.pl\n\n` +
    `Imię i nazwisko: ${name}\n` +
    `Telefon: ${phone || '—'}\n` +
    `E-mail: ${email}\n\n` +
    `Wiadomość:\n${message}\n`;

  const html =
    `<p><strong>Nowa wiadomość z formularza na stronie decor-prestige.pl</strong></p>` +
    `<p>Imię i nazwisko: ${escape(name)}<br>` +
    `Telefon: ${escape(phone || '—')}<br>` +
    `E-mail: <a href="mailto:${escape(email)}">${escape(email)}</a></p>` +
    `<p>Wiadomość:<br>${escape(message).replace(/\n/g, '<br>')}</p>` +
    `<p style="color:#888;font-size:12px">Aby odpowiedzieć klientowi, kliknij „Odpowiedz”.</p>`;

  try {
    await transporter.sendMail({
      from: `"Formularz DECOR-PRESTIGE" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Zapytanie ze strony — ${name}`,
      text,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('SMTP error:', e.message);
    return res.status(502).json({ ok: false, error: 'send' });
  }
}
