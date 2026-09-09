import { useState, useEffect, useRef } from 'react';
import styles from './ContactPage.module.css';

export default function ContactForm() {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
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

            <button type="submit" className={styles.formBtn}>
              Wyślij wiadomość →
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
