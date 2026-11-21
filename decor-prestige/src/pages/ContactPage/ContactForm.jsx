import { useState, useEffect, useRef } from 'react';
import { site } from '../../data/site';
import styles from './ContactPage.module.css';

/* Klucz Web3Forms (web3forms.com) — ustawiany w Vercel jako VITE_WEB3FORMS_KEY.
   Wiadomości trafiają na adres e-mail, na który klucz został wygenerowany. */
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function ContactForm() {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Uzupełnij imię, e-mail i treść wiadomości.');
      return;
    }

    if (!WEB3FORMS_KEY) {
      setError(`Formularz chwilowo nie działa — zadzwoń: ${site.contact.phone} lub napisz: ${site.contact.email}`);
      return;
    }

    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nowa wiadomość ze strony — ${form.name}`,
          from_name: 'Strona DECOR-PRESTIGE',
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          botcheck: form.botcheck || '',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
      } else {
        throw new Error(data.message);
      }
    } catch {
      setError(`Nie udało się wysłać wiadomości. Zadzwoń: ${site.contact.phone} lub napisz: ${site.contact.email}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.formSection} aria-label="Formularz kontaktowy">
      <div className={`${styles.formInner} ${styles.fadeIn}`} ref={ref}>

        <div className={styles.formHeader}>
          <p className={styles.eyebrow}>Napisz do nas</p>
          <h2 className={styles.formHeading}>
            Umów się lub zadaj<br />
            <em className={styles.heroAccent}>pytanie.</em>
          </h2>
          <p className={styles.formLead}>
            Odpowiemy najszybciej jak to możliwe — zazwyczaj tego samego dnia.
          </p>
        </div>

        {sent ? (
          <div className={styles.formSuccess}>
            <p className={styles.formSuccessText}>Dziękujemy! Odezwiemy się wkrótce.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="name">Imię i nazwisko</label>
                <input
                  id="name" name="name" type="text"
                  className={styles.formInput}
                  placeholder="Jan Kowalski"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="phone">Telefon</label>
                <input
                  id="phone" name="phone" type="tel"
                  className={styles.formInput}
                  placeholder="+48 600 000 000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email"
                className={styles.formInput}
                placeholder="jan@example.pl"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="message">Wiadomość</label>
              <textarea
                id="message" name="message"
                className={styles.formTextarea}
                placeholder="Opisz czego szukasz lub zadaj pytanie..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pułapka na boty — niewidoczne pole */}
            <input
              type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off"
              style={{ display: 'none' }}
              onChange={(e) => setForm(prev => ({ ...prev, botcheck: e.target.checked ? 'on' : '' }))}
            />

            {error && <p className={styles.formError} role="alert">{error}</p>}

            <button type="submit" className={styles.formBtn} disabled={sending}>
              {sending ? 'Wysyłanie…' : 'Wyślij wiadomość →'}
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
