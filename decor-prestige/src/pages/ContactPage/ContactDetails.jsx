import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { site } from '../../data/site';
import styles from './ContactPage.module.css';

const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
  site.contact.address.street + ', ' + site.contact.address.city
)}`;

export default function ContactDetails() {
  const ref = useRef(null);

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

  return (
    <section className={styles.detailsSection} aria-label="Dane kontaktowe i mapa">
      <div className={styles.detailsGrid}>

        {/* ---- LEWA: dane kontaktowe ---- */}
        <div className={`${styles.detailsLeft} ${styles.fadeIn}`} ref={ref}>
          <p className={styles.eyebrow}>Dane Kontaktowe</p>
          <h2 className={styles.detailsHeading}>
            Skontaktuj się<br />z nami.
          </h2>

          <address className={styles.contactList}>

            <div className={styles.contactRow}>
              <span className={styles.contactIcon}><Phone size={16} strokeWidth={1.5} /></span>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Telefon</span>
                <a href={site.contact.phoneHref} className={styles.contactValue}>
                  {site.contact.phone}
                </a>
                <span className={styles.contactSub}>Pon. – Pt. 8:00 – 17:00</span>
              </div>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactIcon}><Mail size={16} strokeWidth={1.5} /></span>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Email</span>
                <a href={site.contact.emailHref} className={styles.contactValue}>
                  {site.contact.email}
                </a>
                <span className={styles.contactSub}>Odpowiadamy najszybciej jak to możliwe.</span>
              </div>
            </div>

            <div className={styles.contactRow}>
              <span className={styles.contactIcon}><MapPin size={16} strokeWidth={1.5} /></span>
              <div className={styles.contactInfo}>
                <span className={styles.contactLabel}>Adres</span>
                <span className={styles.contactValue}>
                  {site.contact.address.street}<br />
                  {site.contact.address.city}
                </span>
              </div>
            </div>

          </address>

          <a href={site.contact.phoneHref} className={styles.detailsBtn}>
            Umów bezpłatny pomiar →
          </a>
        </div>

        {/* ---- ŚRODEK: zdjęcie sklepu ---- */}
        <div className={styles.detailsMiddle}>
          <div className={styles.workshopWrap}>
            <img
              src="/deckor_prestige.png"
              alt="Salon DECOR-PRESTIGE — Tarnów"
              className={styles.workshopImage}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <div className={styles.workshopFallback} aria-hidden="true" />
          </div>
        </div>

        {/* ---- PRAWA: lokalizacja + mapa ---- */}
        <div className={styles.detailsRight}>
          <p className={styles.eyebrow}>Nasza Lokalizacja</p>
          <h2 className={styles.detailsHeading}>
            Odwiedź<br />naszą pracownię.
          </h2>
          <p className={styles.locationLead}>
            Znajdziesz u nas szeroki wybór tkanin,
            systemów osłon okiennych i dodatków.
            Zaplanuj wizytę – chętnie doradzimy na miejscu.
          </p>

          <div className={styles.mapWrap}>
            {/* Karta adresowa nad mapą */}
            <div className={styles.mapCard}>
              <strong className={styles.mapCardName}>Decor-Prestige</strong>
              <span className={styles.mapCardAddress}>{site.contact.address.street}</span>
              <span className={styles.mapCardAddress}>{site.contact.address.city}</span>
              <a
                href={mapsUrl}
                className={styles.mapCardLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Zobacz w Google Maps →
              </a>
            </div>

            <iframe
              title="DECOR-PRESTIGE — Tarnów"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.6!2d21.0072!3d50.0120!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d8773b2ecae97%3A0x1!2sul.%20Brama%20Pi%C5%BAne%C5%84ska%205%2C%2033-100%20Tarn%C3%B3w!5e0!3m2!1spl!2spl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
